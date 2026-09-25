# Configuración de Supabase

Todo lo que hay que dejar configurado en el dashboard para que la app funcione en producción.
El orden importa: cada paso desbloquea algo distinto.

Dominio de producción: `https://lacien.vercel.app`

---

## 1. Migraciones y catálogo

**SQL Editor → New query**, en este orden:

| Archivo | Qué hace |
|---|---|
| [`supabase/migrations/0001_init.sql`](../supabase/migrations/0001_init.sql) | Tablas `radios` y `favorites`, con RLS |
| [`supabase/seed.sql`](../supabase/seed.sql) | Las 43 emisoras del catálogo |
| [`supabase/migrations/0002_listeners_from_favorites.sql`](../supabase/migrations/0002_listeners_from_favorites.sql) | Trigger que mantiene `listeners` |

### Sobre la 0002

`listeners` no cuenta reproducciones: cuenta **cuántos usuarios guardaron cada emisora**. Un trigger
sobre `favorites` lo mantiene, y la carga inicial lo deja en su valor real.

Se eligió así por seguridad. Un contador de reproducciones expuesto a la API se infla con un bucle
de tres líneas —la `anon key` está en el bundle del cliente por diseño— y cada `UPDATE` deja tuplas
muertas en la tabla más leída de la app. Con favoritos, la deduplicación la da el esquema: la clave
primaria de `favorites` es `(user_id, radio_id)`, así que un usuario no puede contar dos veces.

> **La carga inicial sobrescribe** lo que `listeners` tenga en ese momento.

**Comprobar:** guardá una radio desde la app y verificá que su `listeners` subió a 1.

---

## 2. URL Configuration

**Authentication → URL Configuration**

| Campo | Valor |
|---|---|
| Site URL | `https://lacien.vercel.app` |
| Redirect URLs | `https://lacien.vercel.app/**` |
| Redirect URLs | `http://localhost:5173/**` |

**El comodín `/**` no es opcional.** La app manda al usuario de vuelta a donde estaba, así que los
destinos son variables (`/`, `/mi-musica`, `/recuperar`). Una URL que no esté en la lista **se
ignora sin avisar** y Supabase cae al Site URL.

Sin este paso, el `emailRedirectTo` del código no tiene efecto y las confirmaciones aterrizan en
`localhost`.

---

## 3. SMTP propio

**Authentication → Emails → SMTP Settings**

El servicio de correo incorporado es para desarrollo: pocos envíos por hora, reputación compartida
y casi siempre carpeta de spam. Para registros reales hace falta un proveedor propio — Resend,
Postmark o SES. Se crea la cuenta, se verifica el dominio y se cargan host, puerto, usuario y clave.

Es el paso que **más silenciosamente rompe registros**: no da error, el mail simplemente no llega.

---

## 4. Plantillas de correo en castellano

**Authentication → Emails → Templates**

Vienen en inglés. En una app íntegramente en es-AR, el primer mensaje que recibe un usuario estaría
en otro idioma.

La variable del enlace es `{{ .ConfirmationURL }}` en ambas.

**Confirm signup**

```html
<h2>Confirmá tu cuenta</h2>
<p>Gracias por crear tu cuenta en LaCienRadios.</p>
<p>Tocá el enlace para confirmarla y volver a la app:</p>
<p><a href="{{ .ConfirmationURL }}">Confirmar mi cuenta</a></p>
<p>Si no fuiste vos, ignorá este mensaje.</p>
```

**Reset password**

```html
<h2>Elegí una contraseña nueva</h2>
<p>Pediste cambiar la contraseña de tu cuenta en LaCienRadios.</p>
<p><a href="{{ .ConfirmationURL }}">Cambiar mi contraseña</a></p>
<p>Si no fuiste vos, ignorá este mensaje: tu contraseña no cambia.</p>
```

---

## 5. Política de contraseñas

**Authentication → Policies** (según la versión del dashboard puede estar en Providers → Email)

- **Mínimo de caracteres:** está en 6, el default. Si lo subís, hay que actualizar `minLength` y el
  texto de ayuda en [`src/components/auth/AuthForm.tsx`](../src/components/auth/AuthForm.tsx) y en
  [`src/pages/ResetPassword.tsx`](../src/pages/ResetPassword.tsx), que hoy dicen 6.
- **Protección contra contraseñas filtradas:** contrasta contra HaveIBeenPwned. Es un toggle.

---

## 6. Verificación en producción

No sirve probarlo en local: varias de estas cosas solo fallan con el dominio real.

1. Registrate con una dirección real → el mail llega, **en castellano**, desde tu dominio.
2. Tocá el enlace → aterrizás en `lacien.vercel.app` **con sesión**, no en localhost.
3. Probá **"No me llegó, reenviar"** en la pantalla de confirmación.
4. Pedí recuperar contraseña → el enlace abre `/recuperar` **sin 404**. Depende del `rewrites` de
   [`vercel.json`](../vercel.json), así que hay que desplegarlo antes.
5. Registrate **dos veces con el mismo email**. Si la segunda vez dice "Revisá tu correo" en lugar
   de avisar que la cuenta existe, Supabase está ofuscando duplicados — es el comportamiento
   correcto contra enumeración de usuarios.

---

## Estado conocido

`mailer_autoconfirm: false` — la confirmación por email está activa. Eso implica que
`signUp` no devuelve sesión y la app muestra la pantalla de "Revisá tu correo"; el favorito que el
usuario quería guardar sobrevive en `sessionStorage` **solo si confirma en el mismo navegador**.

Emisoras que la app marca "Sin señal" por datos, no por código:

| Emisora | Problema |
|---|---|
| Rosario 3 | `http://` — bloqueado por contenido mixto en producción |
| ESPN Radio Argentina | La URL apunta a una página web, no a un stream |
