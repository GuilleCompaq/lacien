-- `listeners` pasa a reflejar cuántos usuarios guardaron cada emisora.
--
-- Por qué así y no contando reproducciones: la `anon key` está en el bundle del
-- cliente, así que un contador de plays expuesto a la API se infla con un bucle de
-- tres líneas, y cada UPDATE escribe una versión nueva de la fila en la tabla más
-- leída de la app. Contar favoritos elimina las dos cosas de raíz:
--
--   * Guardar exige cuenta, así que hay identidad detrás de cada punto.
--   * La clave primaria de `favorites` es (user_id, radio_id): **el esquema ya
--     deduplica**. Un usuario no puede contar dos veces la misma emisora, sin
--     necesidad de registrar IPs ni ventanas de tiempo.
--   * Las escrituras a `radios` pasan a ser tantas como favoritos reales haya.
--
-- Por qué se materializa en una columna en vez de contarse al leer: `favorites`
-- tiene RLS que limita cada usuario a sus propias filas, así que el cliente no
-- puede contar los favoritos de los demás. El total tiene que vivir en `radios`,
-- que sí es de lectura pública.

-- Por si quedó la versión anterior de esta migración aplicada en algún entorno.
drop function if exists public.increment_listeners(uuid);
drop table if exists public.play_log;

-- ---------------------------------------------------------------------------
-- Sincronización
-- ---------------------------------------------------------------------------

create or replace function public.sync_radio_listeners()
returns trigger
language plpgsql
-- `security definer` es necesario: quien guarda un favorito es un usuario
-- `authenticated`, y `radios` no tiene política de UPDATE. El trigger corre como
-- su dueño, que sí puede escribir esa columna.
security definer
-- `search_path` fijo: sin esto, alguien que pueda crear objetos en otro esquema
-- podría redefinir `radios` y secuestrar la escritura.
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    update public.radios
       set listeners = listeners + 1
     where id = new.radio_id;
    return new;
  end if;

  if tg_op = 'DELETE' then
    -- `greatest` evita negativos si el contador alguna vez quedara desfasado.
    update public.radios
       set listeners = greatest(listeners - 1, 0)
     where id = old.radio_id;
    return old;
  end if;

  return null;
end;
$$;

comment on function public.sync_radio_listeners() is
  'Mantiene radios.listeners igual a la cantidad de usuarios que guardaron la emisora.';

-- La app solo inserta y borra favoritos; no hay UPDATE que contemplar.
drop trigger if exists favorites_sync_listeners on public.favorites;

create trigger favorites_sync_listeners
after insert or delete on public.favorites
for each row execute function public.sync_radio_listeners();

-- ---------------------------------------------------------------------------
-- Carga inicial
-- ---------------------------------------------------------------------------
--
-- Deja el contador en su valor real para los favoritos que ya existen, y en 0
-- para las emisoras sin ninguno. De acá en adelante lo mantiene el trigger.

update public.radios r
   set listeners = (
     select count(*)
       from public.favorites f
      where f.radio_id = r.id
   );
