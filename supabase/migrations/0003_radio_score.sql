-- El Top 10 pasa a ser una decisión editorial, no un derivado de los favoritos.
--
-- Hasta ahora el carrusel se ordenaba por `listeners`, la misma columna con la
-- que `useRadios` ordenaba el catálogo completo. El resultado era redundante:
-- las diez emisoras del carrusel eran, en el mismo orden, las diez primeras de
-- la lista de abajo. Dos secciones distintas mostrando lo mismo.
--
-- `score` lo asigna el administrador. Eso es una propiedad de seguridad, no solo
-- de producto: `radios` tiene RLS con **una sola política, de SELECT**, así que
-- ningún cliente —anónimo o autenticado— puede escribir esta columna a través de
-- la API. Se edita desde el dashboard o con la `service_role key`, que salta RLS.
-- Un ranking que el público no puede tocar no se puede inflar.

alter table public.radios
  add column if not exists score smallint not null default 0
    -- 0 significa "fuera del Top 10". Sin tope superior a propósito: la escala
    -- la fija quien cura, y un límite arbitrario solo produciría rechazos
    -- sorpresivos al cargar datos. Sugerencia: 1–100.
    check (score >= 0);

comment on column public.radios.score is
  'Puntaje editorial asignado por el administrador. Ordena el Top 10 de mayor a menor; 0 lo excluye.';

-- Índice parcial: solo indexa las filas que el carrusel realmente consulta, así
-- que ocupa tanto como emisoras haya destacadas, no como emisoras haya.
create index if not exists radios_score_idx
  on public.radios (score desc)
  where score > 0;

-- ---------------------------------------------------------------------------
-- Cómo cargar los puntajes
-- ---------------------------------------------------------------------------
--
-- Con el default en 0 el carrusel no aparece hasta que se asigne al menos uno,
-- que es el comportamiento buscado: no hay "Top 10" antes de que alguien decida
-- cuál es. Los puntajes no se cargan acá porque son una decisión editorial, no
-- parte del esquema: cambian sin que cambie la estructura de la tabla.
--
-- Estos son los que hay cargados en producción al 2026-09-26. Sirven para dejar
-- un entorno nuevo igual al actual; desde el SQL Editor del dashboard:
--
--   update public.radios r
--      set score = v.score
--     from (values
--       ('La 100',             100),
--       ('Aspen',               99),
--       ('Vida',                98),
--       ('Los 40 Principales',  95),
--       ('TKM Radio',           90)
--     ) as v(name, score)
--    where r.name = v.name;
--
-- Para sacar una del Top 10 alcanza con volverla a 0.
