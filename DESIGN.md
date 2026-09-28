---
name: LaCienRadios
description: Radio argentina en el teléfono, con el chasis de Instagram y la identidad de un dial.
colors:
  bg-base: "#0A0A0F"
  bg-surface: "#16121F"
  bg-surface-alt: "#1A1625"
  text-primary: "#FFFFFF"
  text-secondary: "#B8B8C4"
  text-muted: "#8E8E9A"
  accent: "#E4318C"
  accent-hover: "#F0459C"
  accent-active: "#C71F76"
  state-live: "#FF4D6D"
  state-success: "#3DDC97"
  gradient-from: "#FEDA75"
  gradient-via1: "#FA7E1E"
  gradient-via2: "#D62976"
  gradient-to: "#962FBF"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: "1.75rem"
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: "2rem"
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: "1.75rem"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.5rem"
  body-sm:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: "1.25rem"
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: "1rem"
  dial:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: "1.25rem"
    fontFeature: "tabular-nums"
rounded:
  lg: "0.5rem"
  xl: "0.75rem"
  2xl: "1rem"
  inner-featured: "1.35rem"
  3xl: "1.5rem"
  full: "9999px"
spacing:
  hairline: "0.25rem"
  tight: "0.5rem"
  snug: "0.75rem"
  gutter: "1rem"
  section: "1.5rem"
  empty-block: "3rem"
components:
  pill-filter-active:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg-base}"
    rounded: "{rounded.full}"
    padding: "0.5rem 1rem"
    typography: "{typography.body-sm}"
  pill-filter-idle:
    backgroundColor: "{colors.bg-surface-alt}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: "0.5rem 1rem"
    typography: "{typography.body-sm}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg-base}"
    rounded: "{rounded.xl}"
    padding: "0.625rem 1rem"
    typography: "{typography.body-sm}"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.bg-base}"
  button-secondary:
    backgroundColor: "{colors.bg-surface-alt}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "0.5rem 1rem"
    typography: "{typography.body-sm}"
  play-disc-sm:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    size: "2.25rem"
  play-disc-lg:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    size: "3.5rem"
  input-field:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "0.5rem 0.75rem"
    typography: "{typography.body}"
  card-list:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.2xl}"
    padding: "0.75rem"
  card-featured-inner:
    backgroundColor: "{colors.bg-base}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.inner-featured}"
    padding: "1rem"
  sheet-auth:
    backgroundColor: "{colors.bg-surface-alt}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.3xl}"
    padding: "1.25rem"
  chip-no-signal:
    backgroundColor: "rgba(255,255,255,0.05)"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.full}"
    size: "2.25rem"
  nav-item-active:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.accent}"
    typography: "{typography.label}"
    height: "3.25rem"
  nav-item-idle:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-muted}"
    typography: "{typography.label}"
    height: "3.25rem"
---

# Design System: LaCienRadios

> Derivado del artefacto construido (`src/`, rama `v2.0.2`), no de planes. Cada valor sale de un
> archivo y se cita. El sistema de color vive en `src/theme/colors.ts` y está descripto en
> [docs/color-system.md](docs/color-system.md); acá no se duplica, se completa con lo que falta
> (tipografía, forma, layout, componentes, estados, movimiento, voz) y se corrige donde ese
> documento ya no describe al build.

## Overview

**Creative North Star: "El dial en el bolsillo"**

LaCienRadios toma prestado el chasis de Instagram —fondo casi negro, aros de historias, tarjetas
redondeadas, barra inferior de cuatro ítems, gradiente cálido→magenta→púrpura como firma— y lo pone
al servicio de algo que Instagram no tiene: un **dial**. La frecuencia no es metadato al final de la
fila; es el segundo nombre de cada emisora, impresa en cifras tabulares para que al escanear la
lista las columnas se alineen (`src/components/home/RadioCard.tsx:46-51`). El chasis es reconocible;
la identidad es radial.

La densidad es de app de teléfono, no de sitio responsive: una sola columna de **28rem** máximo
(`--shell-w`, `src/index.css`), encuadrada y centrada en desktop en vez de estirar una fila de 48px
a 1800px. Todo el cromo fijo —barra inferior, mini player, avisos— comparte ese ancho vía
`.app-bar`, y sus alturas viven en variables CSS que el relleno de `<main>` consume
(`src/lib/playerLayout.ts`). El layout no tiene números mágicos: tiene una fuente única.

La superficie es **plana y tonal**. No hay escala de sombras: la profundidad se construye con tres
niveles de fondo (`#0A0A0F` → `#16121F` → `#1A1625`) y bordes de un píxel a `white/5` o `white/10`.
La única sombra del producto está en el aviso flotante, porque es lo único que de verdad flota. El
acento es escaso y casi siempre significa "esto se puede tocar".

**Key Characteristics:**
- Oscuro tonal de tres pisos, sin sombras salvo en lo que flota de verdad.
- Gradiente de marca reservado a cuatro lugares: logo, aro de historia, marco de la tarjeta destacada y avatar de perfil.
- El dial en cifras tabulares como segundo nombre de cada emisora.
- Radios generosos y consistentes: 0.75rem para controles, 1rem para tarjetas, círculo completo para todo lo que reproduce.
- Nada se dibuja vacío y nada de feedback fabricado.
- Área táctil mínima de 44px declarada en la clase `.tap-target`, con margen negativo para no mover el layout.

## Colors

Paleta oscura de matiz violáceo con un único acento rosa y dos colores de estado; el gradiente de
marca aporta todo el calor que la paleta base no tiene. Los valores normativos están en el
frontmatter y en `src/theme/colors.ts`.

### Primary
- **Rosa Dial** (`accent`): el color de lo tocable. Disco de reproducir, píldora de filtro activa, botón primario, ítem activo de la barra inferior, anillo de foco, enlaces de auth. `accent-hover` y `accent-active` solo como respuesta a puntero o pulsación (`src/components/player/PlayButton.tsx:63,75`).
- **Gradiente de marca** (`gradient-from` → `gradient-via1` 35% → `gradient-via2` 70% → `gradient-to` 100%, a 135°): declarado como `bg-brand-gradient` en `tailwind.config.ts`. Cuatro usos en todo el build: el logotipo recortado en texto (`Header.tsx:21`), el aro de la historia (`StoryCircle.tsx:19`), el marco de la tarjeta destacada (`FeaturedCard.tsx:22`) y el avatar de iniciales en Perfil (`Profile.tsx:47`).

### Secondary
No hay. El producto tiene un solo acento; los colores de estado no son acento y no se usan para acciones.

### Neutral
- **Noche Violácea** (`bg-base`): lienzo de la app y de todo panel que necesite contraste máximo, incluido el panel interior de la tarjeta destacada.
- **Superficie** (`bg-surface`): header, barra inferior, tarjeta de lista, campos de formulario, interior del aro de historia.
- **Superficie Elevada** (`bg-surface-alt`): mini player, hoja de auth, aviso, tapas de emisora, píldora inactiva, botón secundario.
- **Blanco** / **Gris Perla** / **Gris Ceniza** (`text-primary` / `text-secondary` / `text-muted`): nombre de emisora, texto de apoyo y metadato respectivamente. Los bordes no son un token de color: son `white/5` (divisorias y tarjetas en reposo) y `white/10` (campos, hoja, aviso).

### State
- **Rojo Señal** (`state-live`): reservado a **fallas de señal y de formulario**, no a "en vivo". Línea de error del mini player, icono de alerta, error de `AuthForm`, errores de carga de página.
- **Verde Aire** (`state-success`): un solo uso en la interfaz de audio, el punto de 6px que indica que el sonido está efectivamente saliendo (`MiniPlayer.tsx:90`), más el corazón del aviso de éxito.

### Named Rules
**La Regla del Único Hex.** Ningún valor hexadecimal nuevo fuera de `src/theme/colors.ts`. Si hace falta un color, se agrega como token primero. (Ya incumplida en un lugar: las cuatro paradas del gradiente están escritas literales en `tailwind.config.ts` en vez de leerse de `colors.gradient`.)

**La Regla del Panel Sólido.** Nada de texto de apoyo directamente sobre el gradiente de marca. El gradiente es **marco**, no fondo de lectura: la tarjeta destacada dibuja un panel sólido `bg-base` adentro del marco porque con un velo translúcido el texto secundario se apoyaba en las paradas claras y caía a 1.5:1 (`FeaturedCard.tsx:23-26`).

**La Regla del Texto Oscuro sobre Rosa.** Sobre `accent` el texto es `bg-base`, nunca blanco: en blanco el contraste daba 4.1:1 y no llegaba a AA (`FilterPills.tsx:34`). Vale para píldora activa, botón primario, avatar de gradiente y el enlace de salto al contenido.

**La Regla del Rojo Reservado.** `state-live` significa "esto no suena", no "esto está al aire". El estado en vivo se comunica con el aro de gradiente y el punto verde, nunca con rojo.

## Typography

**Familia única:** la pila `sans` por defecto de Tailwind (`ui-sans-serif, system-ui, -apple-system,
Segoe UI, Roboto, …`). El build **no declara ninguna fuente**: no hay `fontFamily` en
`tailwind.config.ts`, ni `@font-face`, ni `<link>` de fuente en `index.html`. Es una herencia, no una
elección; está registrada como brecha al final.

**Carácter:** todo el peso expresivo lo cargan el peso y el color, no la forma de la letra. El único
gesto tipográfico propio es la cifra tabular del dial.

### Hierarchy
- **Display** (800, 20px): exclusivamente el logotipo `LaCienRadios`, recortado sobre el gradiente (`Header.tsx:21`).
- **Headline** (700, 24px): `h1` de las pantallas de auth ("Iniciar sesión", "Revisá tu correo").
- **Title** (700, 18px): título de sección o de página con contenido debajo — "Mis favoritas", "Todas las radios", y los encabezados de los estados vacíos y de error.
- **Body** (400, 16px): tamaño heredado; lo usan el nombre de emisora en la tarjeta de lista (a 600) y el valor de los campos de texto.
- **Body-sm** (400, 14px): el caballo de batalla del producto, 51 usos. Texto de apoyo, dial, mensajes, etiquetas de botón, encabezados de carrusel (a 600).
- **Label** (400, 12px): el piso real del producto. Etiquetas de la barra inferior, nombre bajo el aro de historia, línea de estado del mini player, hint de contraseña, metadato de Perfil.
- **Dial** (500, 14px, `tabular-nums`): la frecuencia. Cinco componentes la imprimen y los cinco usan cifras tabulares.

### Named Rules
**La Regla de las Cifras Tabulares.** Toda frecuencia y todo conteo se imprime con `tabular-nums`. Un dial que baila al scrollear deja de ser una columna legible (`RadioCard`, `FeaturedCard`, `RadioGrid`, `AuthIntent`, `SaveFavoriteSheet`).

**La Regla del Piso de 12px.** Nada de texto por debajo de 12px (`text-xs`). Es el tamaño más chico que el build renderiza y el mínimo para metadato; el cuerpo mínimo real es 14px.

**La Regla del Peso Acompaña al Color.** Cuando un estado se señala con color, el peso lo acompaña: el ítem activo de la barra inferior pasa a 600 además de tomar el acento, para que la señal no dependa solo del matiz (`BottomNav.tsx:32-35`).

## Layout

**Columna única de 28rem.** `--shell-w: 28rem` en `:root` (`src/index.css`). `.app-shell` centra el
contenido con ese máximo; `.app-bar` da a las barras fijas exactamente el mismo ancho y las centra
con `left: 50%; transform: translateX(-50%)`. En ≥`md` la columna gana bordes laterales `white/5`
para que el encuadre se lea como marco. No hay grillas ni breakpoints más allá de ese único `md`.

**Canaleta de 16px.** Todo el contenido respira a `px-4`. Es la única canaleta del producto: header,
carruseles, listas, filtros, formularios y estados vacíos la comparten. La tarjeta destacada la
consigue con `mx-4` para poder llevar su propio marco.

**Ritmo vertical.** Las páginas son columnas flex: `gap-4` (16px) entre bloques de página, `gap-3`
(12px) entre título de sección y su contenido, `gap-2` (8px) entre tarjetas de lista,
`gap-1`/`gap-1.5` (4/6px) dentro de una línea. El relleno vertical de página es `py-4`; los estados
vacíos y de error usan `py-8`/`py-12` para no pegarse al cromo.

**El chasis y el área segura.** Tres alturas declaradas en `:root` gobiernan todo lo fijo:
`--nav-h: 3.25rem`, `--player-h: 3.75rem`, `--player-h-error: 4.75rem`, más
`--safe-bottom: env(safe-area-inset-bottom, 0px)`. `src/lib/playerLayout.ts` es la fuente única que
las combina: `aboveNav()` para lo que se apoya sobre la navegación, `abovePlayer(status)` para lo
que se apoya sobre todo el cromo. La barra inferior agrega `--safe-bottom` como relleno propio; el
mini player se posiciona en `aboveNav()`; `<main>` recibe como `paddingBottom` el valor que
corresponda según haya o no emisora en curso (`App.tsx:30`); el aviso se apoya 0.5rem por encima de
todo eso. La hoja de auth resuelve su propio piso con
`pb-[calc(1.5rem+env(safe-area-inset-bottom))]` porque flota fuera del chasis.

### Named Rules
**La Regla de la Altura Derivada.** Ninguna posición ni relleno del chasis se escribe como número suelto. Barra, reproductor y relleno de contenido leen las mismas variables desde `playerLayout.ts`. El antecedente que la justifica: con `bottom-16` y `pb-36` fijos quedaba una franja de ~12px por la que se veía pasar el contenido.

**La Regla del Mensaje Antes del Recorte.** Cuando el texto no entra, la barra crece; no se trunca. El reproductor en error pasa de 3.75rem a 4.75rem porque el único canal que explica por qué no sonó no puede quedar cortado a media palabra (`playerLayout.ts`).

**La Regla del Encuadre.** En pantallas anchas la app se encuadra, no se estira. El contenido y las barras fijas comparten el mismo máximo; una barra que cruza la pantalla entera mientras el contenido queda centrado es un error, no una variante.

## Elevation & Depth

El sistema es **plano y tonal**. No existe una escala de sombras: la profundidad se construye
apilando los tres fondos (`bg-base` → `bg-surface` → `bg-surface-alt`) y separando con bordes de un
píxel translúcidos (`white/5` para divisorias y tarjetas en reposo, `white/10` para campos, hoja y
aviso). El header se fija con `sticky` sin sombra; las barras inferiores se separan del contenido
con `border-t border-white/5`, no con una sombra ascendente.

### Shadow Vocabulary
- **Aviso flotante** (`box-shadow: 0 10px 15px -3px rgba(0,0,0,.4), 0 4px 6px -4px rgba(0,0,0,.4)`, o sea `shadow-lg shadow-black/40`): el único uso de sombra del producto, en `Notice.tsx:44`. Está ahí porque el aviso es lo único que de verdad se superpone a la página y a las barras.
- **Velo de hoja** (`background: rgba(0,0,0,0.7)`): el fondo modal de `SaveFavoriteSheet`. Profundidad por oscurecimiento, no por sombra.

### Named Rules
**La Regla del Plano.** Las superficies son planas. Si una pieza necesita separarse, sube un piso tonal y agrega un borde de un píxel; la sombra se reserva para lo que literalmente flota sobre el resto (un solo caso hoy).

## Shapes

Lenguaje de esquinas generosas y consistentes, con una regla clara según la función:

- **Círculo completo** (`rounded-full`) para todo lo que reproduce o descarta: disco de play (36px en fila, 56px en destacada), chip "Sin señal", aro de historia (64px), avatar de Perfil (80px), botones de cerrar y de corazón, avatares de estado vacío (64/80px).
- **0.75rem** (`rounded-xl`) para controles y contenedores chicos: campos de texto, botones rectangulares, tapa de emisora de 40/48px, aviso.
- **1rem** (`rounded-2xl`) para tarjetas de lista y filas navegables (tarjeta de emisora, tarjeta de intención de auth, fila de Perfil).
- **1.5rem** (`rounded-3xl`) para las dos piezas grandes: el marco de la tarjeta destacada y el borde superior de la hoja de auth (`rounded-t-3xl`).
- **1.35rem** (`rounded-[1.35rem]`) es el único valor a medida: el panel interior de la tarjeta destacada, para que el marco del gradiente quede de grosor parejo dentro de la esquina de 1.5rem.
- **0.5rem** (`rounded-lg`) solo para la superficie de foco de elementos sin fondo propio (enlace de salto al contenido, botón de historia, enlace "Volver").

La tapa de emisora es cuadrada-redondeada en la lista y en la hoja (`rounded-xl`) y circular en el
carrusel y en la tarjeta destacada. Todos los contenedores de tapa llevan `overflow-hidden` y la
imagen entra con `object-contain p-0.5` para no recortar logotipos ajenos.

### Named Rules
**La Regla del Círculo que Suena.** Si el control inicia, pausa, reintenta o representa audio, es un círculo. Si solo contiene o navega, es una esquina redondeada.

## Components

### Buttons
- **Shape:** 0.75rem (`rounded-xl`) para los rectangulares; círculo para los de icono.
- **Primary:** `accent` con texto `bg-base` a 600. Ancho completo en formularios y hoja (`py-2.5` / `py-3`), o `px-4 py-2` cuando conviven dos acciones en una fila. Hover `accent-hover`, activo `accent-active`, `disabled:opacity-60` con la etiqueta cambiada a "Un momento…".
- **Secondary:** `bg-surface-alt` con texto `text-primary` a 600, mismo radio y relleno. Es la salida, nunca la acción principal. En la hoja de auth la variante secundaria usa `bg-surface` sobre el panel elevado, con `hover:bg-white/5`.
- **Ghost:** solo texto de acento sobre transparente, con `hover:bg-white/5`. Único caso: "Reintentar" en el aviso, donde usa `accent-hover` porque `accent` puro sobre `bg-surface-alt` no sostiene bien el texto chico.
- **Icon buttons:** icono de 16-20px con `tap-target` y `-m-1.5` de compensación. La clase fija el área tocable en 44px sin importar el tamaño del icono, y el margen negativo la devuelve al layout sin correr nada de lugar.
- **Focus:** `outline` de 2px en `accent` con `outline-offset-2`, siempre por `focus-visible`. La barra inferior usa `-outline-offset-2` para que el anillo no se coma el borde de la pantalla. Ningún control del build usa `outline-none`.

### Chips (píldoras de filtro)
- **Eje:** banda (`Todas` / `AM` / `FM`), tres opciones en una fila con `gap-2` a la canaleta.
- **Activa:** `accent` con texto `bg-base` a 600, `rounded-full`, `px-4 py-2` (36px de alto).
- **Inactiva:** `bg-surface-alt` con `text-secondary`, hover a `text-primary`.
- **Semántica:** el grupo es `role="group"` con `aria-label`, y cada píldora lleva `aria-pressed`. No es una navegación con tabs: es un filtro con estado.

### Cards / Containers
- **Tarjeta de lista** (`RadioCard`): tapa de 48px `rounded-xl`, nombre a 16px/600, dial a 14px/500 tabular, corazón, y disco de play o chip sin señal. Radio 1rem, fondo `bg-surface`, borde `white/5` que pasa a `accent/40` cuando esa emisora está sonando o conectando. Relleno 0.75rem, `gap-3`. Sin señal: la tapa baja a `opacity-40 grayscale`, el nombre baja a `text-secondary` y el motivo se imprime como texto junto al dial (`· Señal no cargada`), porque en táctil el `title` no existe.
- **Tarjeta destacada** (`FeaturedCard`): marco de gradiente con 1.25rem de relleno y radio 1.5rem, con panel `bg-base` de radio 1.35rem adentro. Fila de encabezado con el rótulo a 14px/600 (`Seguir escuchando` / `Sonando ahora`), el dial tabular al lado y el corazón empujado al extremo con `ml-auto`; debajo, tapa circular de 40px, nombre a 18px/700, línea de estado a 14px y disco de play de 56px. El slot es la última emisora escuchada que todavía puede sonar, no una fila cero arbitraria.
- **Fila navegable** (Perfil → Mis favoritas): `bg-surface`, radio 1rem, relleno 1rem, chevron de 20px en `text-muted` a la derecha.

### Inputs / Fields
- **Estilo:** `bg-surface`, borde `white/10`, radio 0.75rem, relleno `px-3 py-2` (el buscador, `px-4 py-2.5`), texto `text-primary`, placeholder `text-muted`.
- **Etiqueta:** encima, a 14px `text-secondary`, dentro del propio `<label>` con `gap-1`.
- **Foco:** el borde pasa a `accent` y además aparece el anillo de 2px con offset. Las dos señales juntas, no una.
- **Error:** el campo toma `aria-invalid` y el mensaje se imprime debajo del formulario a 14px `state-live` con `role="alert"`.
- **Ayuda:** la regla se lee antes de enviar (el hint de 6 caracteres cuelga del campo vía `aria-describedby`), no después de que el navegador rechace.

### Navigation
- **Barra inferior:** cuatro ítems de ancho igual (Inicio, Buscar, Mis favoritas, Perfil), `bg-surface`, `border-t white/5`, alto `--nav-h` (52px) más `--safe-bottom` de relleno. Icono SVG de 20px sobre etiqueta de 12px, `gap-1`.
- **Estados:** activo `accent` más peso 600; inactivo `text-muted` con hover a `text-secondary`. Transición solo de color.
- **Header:** `sticky top-0`, `bg-surface`, `px-4 py-3`, y nada más que el logotipo. No hay campana ni controles decorativos: un control sin handler enseña que acá los controles son de adorno.
- **Salto al contenido:** primer elemento enfocable de la app, invisible hasta recibir foco, y entonces píldora `accent` con texto `bg-base` sobre el header. Existe porque en Inicio hay decenas de botones antes del contenido.

### Mini player
Barra fija de ancho de columna apoyada sobre la navegación: `bg-surface-alt`, `border-t white/5`,
`px-4`, alto `--player-h` y `--player-h-error` en error. Anatomía: tapa de 40px `rounded-lg`
(atenuada a `opacity-50 grayscale` en error), nombre a 14px/600 truncado, línea de estado, disco de
play de 36px y cerrar de 20px. Es `role="region"` con `aria-label="Reproductor"`.

La **línea de estado** es la única fuente visible de qué pasa con el audio, y tiene cuatro formas:
error (12px `state-live`, icono de alerta, `role="alert"`, hasta dos renglones por `line-clamp-2`),
conectando (12px `text-secondary` con el arco girando y `aria-live="polite"`), sonando (punto verde
de 6px más el dial o el track) e inactivo (solo el dial).

### Story circle
Botón de 64px de ancho: aro de 64px con 2px de relleno (`p-0.5`) en gradiente de marca cuando la
emisora está al aire o en `white/10` cuando no, interior circular `bg-surface` con la tapa, y nombre
de 12px `text-secondary` truncado y centrado debajo. El carrusel (`StoriesBar`) es `overflow-x-auto`
con la barra oculta (`.scrollbar-none`), `gap-3` y encabezado propio a 14px/600. **No se dibuja
vacío:** sin contenido la sección entera no existe.

### Chip "Sin señal"
Reemplaza al disco de play cuando la señal no puede sonar: círculo del mismo diámetro que el botón
(36 o 56px) en `white/5` con icono de alerta en `text-muted`. Ocupa la misma ranura para no romper
el ritmo de la fila. Es `role="img"` con `aria-label="Sin señal. <motivo>"` y `title`; el motivo
corto además se imprime como texto junto al dial. No se ofrece una acción que el sistema ya sabe que
falla.

### Aviso (Notice)
Barra flotante de ancho de columna que se apoya 0.5rem por encima de todo el cromo fijo, usando las
mismas variables de alto. `bg-surface-alt`, borde `white/10`, radio 0.75rem, `px-3 py-2.5`, la única
sombra del sistema, y entrada animada con `animate-sheet-in`. Icono de 16px (`state-live` para
error, corazón lleno `state-success` para éxito), mensaje a 14px, "Reintentar" opcional y cerrar.
`role` alterna entre `alert` y `status`. Se autocierra a 4s (éxito) u 8s (error), **salvo que haya
reintento**: cerrar solo la salida sería esconderla.

### Hoja de auth (SaveFavoriteSheet)
El muro de autenticación es una hoja sobre la página, no un salto a `/login`. Panel `bg-surface-alt`
anclado abajo, `rounded-t-3xl`, `border-t white/10`, `px-5 pt-5`, sobre velo negro al 70%.
Encabezado: tapa de 48px, "Guardá <emisora>" a 16px/700 y el dial tabular. Una línea de valor a 14px
`text-secondary`, y dos acciones apiladas: "Crear cuenta" primaria, "Ya tengo cuenta" secundaria.
`role="dialog"` más `aria-modal`, foco inicial en la primaria, trampa de foco con Tab/Shift+Tab,
Escape cierra, y el foco vuelve al elemento que la abrió. El velo es atajo de mouse (`aria-hidden`),
no un control.

### Estados vacíos, de carga y de error
Tres formas, ninguna de ellas inventada:
- **Cargando:** una línea centrada, 16px `text-muted`, `py-8`, que nombra qué se está cargando ("Cargando radios…", "Cargando tu cuenta…", "Cargando tus radios…"). No hay esqueletos ni spinners de página.
- **Vacío:** dentro de la lista, una línea centrada a 14px `text-muted` con `py-8` que dice qué falta y qué hacer ("Todavía no guardaste ninguna radio. Tocá el corazón en cualquier emisora."). Para pantallas enteras (sesión cerrada, 404), bloque centrado con `py-12`: círculo de 64-80px `bg-surface-alt` con icono de 32-36px en `text-muted`, título a 18px/700, explicación a 14px `text-muted`, y una o dos salidas.
- **Error:** mismo bloque pero con `role="alert"`, y siempre con una salida (Reintentar, Ir al inicio, Buscar una radio). Un error de red nunca se muestra como lista vacía, y un estado vacío nunca se muestra antes de que la consulta resuelva.

### Motion
El producto anima tres cosas y nada más: la entrada de la hoja desde abajo (`sheet-in`, 320ms,
`cubic-bezier(0.16, 1, 0.3, 1)`), la aparición del velo (`backdrop-in`, 200ms, `ease-out`) y el arco
del spinner. Las dos primeras viven dentro de `@media (prefers-reduced-motion: no-preference)`, así
que bajo movimiento reducido la hoja aparece en su lugar final; el spinner usa `motion-safe:` y
queda estático, con el texto "Conectando…" cargando el sentido. Toda otra respuesta de estado es
`transition-colors` (16 usos) sin duración declarada: los 150ms por defecto de Tailwind.

### Named Rules
**La Regla de la Sección que No Existe.** Ninguna sección se dibuja vacía. El Top 10 espera puntajes cargados y la tarjeta destacada espera historial; sin eso, Inicio arranca directo en los filtros y la lista. Un título sobre la nada es peor que la ausencia.

**La Regla del Dato Verdadero.** Nada de feedback ni de métricas fabricadas. El conteo de favoritas es el conteo real, el Top 10 se ordena por un puntaje editorial (`score > 0`) y no por una columna derivada, y las iniciales del avatar salen del email porque es el único dato verdadero disponible.

**La Regla de la Misma Ranura.** Un estado no reacomoda la fila. El chip sin señal mide igual que el botón que reemplaza, y el área táctil se expande con relleno más margen negativo para no correr nada.

**La Regla del 44.** Todo blanco tocable mide al menos 44×44px, y lo declara la clase `.tap-target` — no la aritmética del relleno. Se falló tres veces calculándolo a mano, siempre por la misma causa: un icono más chico que el default encogía el botón sin que nada lo señalara. Los botones de icono llevan `tap-target -m-1.5`; el disco de 36px de `PlayButton` lleva `p-1 -m-1`; el de 56px ya cumple solo.

**La Regla del Un Solo Momento.** Hay exactamente un movimiento autorado —la hoja que entra desde abajo— y siempre detrás de `prefers-reduced-motion`. Todo lo demás cambia de color y nada más.

## Do's and Don'ts

### Do:
- **Do** derivar toda medida del chasis de `src/lib/playerLayout.ts` y de las variables de `:root` (`--nav-h`, `--player-h`, `--player-h-error`, `--safe-bottom`, `--shell-w`). Test: si escribís un `bottom-` o un `pb-` numérico para esquivar una barra fija, está mal.
- **Do** usar texto `bg-base` sobre cualquier fondo `accent` o de gradiente.
- **Do** imprimir frecuencias y conteos con `tabular-nums`.
- **Do** dar 44×44px de área tocable con `tap-target -m-1.5` (o `p-1 -m-1` sobre un disco de 36px) en vez de agrandar el elemento visible.
- **Don't** calcular el piso de 44 a mano con relleno e icono. Funciona hasta que alguien pasa un icono más chico, y entonces falla en silencio.
- **Do** anillo de foco `focus-visible:outline outline-2 outline-accent outline-offset-2` en todo control, y el doble aviso (borde más anillo) en los campos.
- **Do** anunciar el cambio de estado: `role="alert"` para errores, `aria-live="polite"` para progreso, `aria-pressed` en corazones y píldoras, `role="status"` para resúmenes de resultado.
- **Do** un `h1` por ruta, aunque sea `sr-only` cuando la página arranca con secciones `h2`.
- **Do** escribir todo el copy en castellano rioplatense con voseo ("Guardá", "Revisá tu conexión", "Tocá el corazón", "Probá de nuevo"), nombrar el síntoma sin adivinar la causa, y ofrecer salida. Test: un error que no dice qué pasó, o que no ofrece qué hacer, no se muestra.
- **Do** traducir todo error de backend a través de `src/lib/authErrors.ts`; un string crudo de Supabase en inglés rompe la ilusión del producto.
- **Do** ocultar la sección completa cuando no hay datos, en vez de dibujar su título.
- **Do** iconos SVG de `viewBox 24` con `currentColor` y `aria-hidden`: transporte sólido, utilitarios con trazo 2 y remates redondos (`src/components/icons.tsx`).

### Don't:
- **Don't** poner texto de apoyo directamente sobre el gradiente de marca; el gradiente es marco y el texto va sobre un panel sólido.
- **Don't** usar texto blanco sobre `accent`: da 4.1:1 y no llega a AA.
- **Don't** agregar valores hexadecimales fuera de `src/theme/colors.ts`.
- **Don't** usar `state-live` (rojo) para decir "en vivo"; es el color de la falla.
- **Don't** agregar sombras a superficies en reposo. La profundidad se construye con los tres pisos tonales y bordes `white/5` / `white/10`; hay una sola sombra en todo el producto y es la del aviso flotante.
- **Don't** truncar el mensaje que explica una falla; que crezca el contenedor.
- **Don't** usar emoji ni glifos del sistema como iconografía. Además de la forma y el peso variables por plataforma, un emoji no se puede teñir: el estado activo de la navegación es de color y con glifos el icono nunca cambiaba al seleccionar la pestaña.
- **Don't** mostrar un fallo de red como estado vacío, ni un estado vacío antes de que la consulta resuelva.
- **Don't** dibujar un control sin handler ni una estadística que no salga de un dato real.
- **Don't** estirar el layout más allá de `--shell-w`; en desktop se encuadra.
- **Don't** animar por fuera de los tres momentos del build, y nunca sin `prefers-reduced-motion` o `motion-safe`.

## Brechas entre lo declarado y lo construido

Registradas acá, **no canonizadas como reglas ni reparadas** en esta pasada.

1. **Sin fuente declarada.** No hay `fontFamily` en `tailwind.config.ts`, ni `@font-face`, ni fuente en `index.html`: toda la tipografía cae en la pila `system-ui` de Tailwind y por lo tanto cambia de forma entre Android, iOS y Windows. Es el estado del build, no una decisión de diseño: la pila del frontmatter documenta lo que hoy se renderiza y **no debe leerse como elección de familia display** para superficies nuevas.
2. ~~**El emoji sigue vivo en la tapa.**~~ **Resuelto en [fix015](fixs/fix015.md).** `RadioCover` cae a `RadioDeviceIcon`, un SVG del sistema que hereda `currentColor`. Se eliminó `coverEmoji` del tipo `Radio` —era un campo cuyo único propósito era renderizar un glifo— y las cinco clases `text-xl`/`text-2xl` que solo lo dimensionaban. **El producto ya no tiene ningún emoji.**
3. ~~**Tokens muertos.**~~ **Resuelto en [fix016](fixs/fix016.md).** Se eliminó `colors.category` (7 entradas sin ningún consumidor). `colors.gradient` dejó de ser token muerto y de duplicar los hexes: `tailwind.config.ts` ahora **construye** el `brand-gradient` a partir de él, así que las cuatro paradas viven en un solo lugar. El CSS compilado quedó byte por byte idéntico.
4. ~~**`docs/color-system.md` quedó atrás.**~~ **Resuelto en [fix016](fixs/fix016.md).** Reescrito contra el build real: sin `CategoryCard`, sin `jazz`/`lofi`, sin badge "LIVE", con `tailwind.config.ts` y el dial en `text-primary`/`text-muted`. Ahora apunta a este documento para el sistema completo en vez de duplicarlo.
5. **El piso de 11px es una cita, no un token.** fix001 lo nombra como piso de legibilidad, pero nada en el build renderiza a 11px: el mínimo real es 12px (`text-xs`). Por eso la regla declarada arriba dice 12px.
6. ~~**El 44 no está declarado en código.**~~ **Resuelto en [fix015](fixs/fix015.md).** El piso dejó de ser aritmética (`p-3` + icono de 20px = 44, que se rompía en silencio al pasar un icono más chico: pasó tres veces) y pasó a ser una clase declarada en `src/index.css`:

   ```css
   .tap-target {
     display: inline-flex;
     align-items: center;
     justify-content: center;
     min-width: 44px;
     min-height: 44px;
   }
   ```

   **Regla del 44 (vigente):** todo control accionable por el dedo lleva `tap-target`. El tamaño del icono deja de decidir el del objetivo. La llevan los corazones de `RadioCard` y `FeaturedCard`, el cerrar del mini player, el cerrar del aviso, "Reintentar" y el cerrar de la hoja de favoritos. `PlayButton` resuelve lo suyo con `p-1 -m-1` sobre un disco de 36px, que da 44 exactos.
7. ~~**El botón primario del formulario no tiene tono de pulsación propio.**~~ **Resuelto en [fix016](fixs/fix016.md).** `AuthForm` y los dos botones de `ResetPassword` pasaron de `active:bg-accent-hover` a `active:bg-accent-active`. Ahora los tres tonos de `accent` cumplen su función: reposo, apuntar, pulsar.
8. **El aro de gradiente y el estado en vivo no pueden ser falsos.** `is_live` es `true` en las 45 emisoras, así que la rama `bg-white/10` de `StoryCircle` nunca se renderiza y el aro no distingue nada. `current_track` es `null` en las 45, así que la línea de track de `FeaturedCard` y del mini player nunca aparece y siempre cae al dial o a "Señal en directo". Las dos ramas están implementadas y sin verificar contra datos reales: son diseño sobre datos que todavía no existen. **No es resoluble en código: depende de datos que cargás vos.**
9. **Ausencias que conviene no asumir.** No hay estado `disabled` de campo, no hay variante de tarjeta seleccionada más allá del borde `accent/40`, no hay tema claro (`color-scheme: dark` fijo) y no hay más breakpoint que `md`.
