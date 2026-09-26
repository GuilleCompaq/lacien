-- Catálogo real de radios argentinas — 45 emisoras (11 AM, 34 FM).
--
-- Regenerado desde la base el 2026-09-26, porque había divergido: tres señales
-- se habían corregido a mano en el dashboard y nunca volvieron acá, así que una
-- instalación nueva reproducía el catálogo roto que el proyecto ya había dejado
-- atrás. El seed es la única definición del catálogo que está en el repositorio;
-- si no refleja la base, no sirve para reconstruir nada.
--
-- Notas:
--   * stream_url: las 45 tienen señal cargada. Ya no queda ninguna en
--     'PENDIENTE'. La app clasifica cada URL en runtime
--     (src/lib/streamSupport.ts) y muestra "Sin señal" en vez de ofrecer un play
--     que va a fallar.
--   * 8 de las 45 son HLS (.m3u8): en Safari suenan nativas y en el resto de los
--     navegadores las levanta hls.js, que se importa de forma dinámica solo al
--     reproducirlas.
--   * Casos conocidos que fallan en runtime, comprobados el 2026-09-26:
--       - ESPN Radio Argentina: la URL apunta a una página, no a un stream.
--       - Radio Continental: el servidor devuelve 503 con una página de error.
--       - Rosario 3: devuelve 403; parece protección contra enlazado externo,
--         así que podría funcionar desde el navegador aunque falle fuera de él.
--     Las tres caen en el mensaje "Esta señal no responde. Puede estar caída."
--   * Nacional Folklórica y Nuestra Radio comparten URL (sc_rad38): una sirve el
--     audio de la otra. Falta la URL propia de una de las dos.
--   * frequency: las 45 tienen frecuencia real, así que la banda AM/FM es
--     derivable por completo. Hay diales repetidos entre emisoras de ciudades
--     distintas (93.7, 92.9, 94.7, 102.3), que es normal en radio; sin columna
--     de ciudad no hay forma de distinguirlas en la UI.
--   * genre: 'general' es el default para emisoras generalistas/de noticias o
--     cuyo formato musical exacto no se pudo confirmar (p. ej. varias regionales
--     de Córdoba/Rosario/Mendoza).
--   * listeners: en 0 para todas. Lo recalcula la migración 0002 a partir de
--     `favorites`, así que cualquier valor que se pusiera acá se sobrescribe.
--   * current_track: null para todas (no hay integración de "sonando ahora").
--   * score: no se carga acá. La columna la agrega la migración 0003, que corre
--     después de este archivo, y los puntajes los asigna el administrador.
--
-- Pensado para una base recién creada: no hay restricción de unicidad sobre
-- `name`, así que correrlo dos veces duplica las filas.

insert into public.radios (name, genre, frequency, listeners, stream_url, cover_image, is_live, current_track)
values
  ('Actualidad', 'general', '93.7 FM', 0, 'https://server4.hostradios.com/8174/stream', '/radios/actualidad.png', true, null),
  ('AM 750', 'general', 'AM 750', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/AM750AAC_SC', '/radios/radio-am-750-buenos-aires.webp', true, null),
  ('Aspen', 'pop', '102.3 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/ASPEN_SC', '/radios/aspen.webp', true, null),
  ('Cadena 3', 'general', 'AM 700', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO3_SC', '/radios/cadena-tres.webp', true, null),
  ('Delta', 'general', '90.3 FM', 0, 'https://cdn.instream.audio/:9069/stream', '/radios/delta-capital-federal.webp', true, null),
  ('ESPN Radio Argentina', 'deportiva', '107.9 FM', 0, 'https://www.espn.com.ar/radio/play/_/s/deportes', '/radios/espn-radio-argentina.png', true, null),
  ('FM Con Vos', 'general', '89.9 FM', 0, 'https://server1.stweb.tv/rcvos/live/playlist.m3u8', '/radios/fm-89-9.webp', true, null),
  ('FM Córdoba', 'general', '91.9 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/CADENAHEAT_SC', '/radios/fm-cordoba.webp', true, null),
  ('FM Sol', 'general', '100.9 FM', 0, 'https://estaciondelsolonline.com.ar:8000/radio.aac', '/radios/sol-mendoza.webp', true, null),
  ('Fónica', 'general', '100.7 FM', 0, 'https://edge03.radiohdvivo.com/radiofonica', '/radios/fonica-rosario.webp', true, null),
  ('La 100', 'pop', '99.9 FM', 0, 'https://26573.live.streamtheworld.com/FM999_56.mp3', '/radios/la-100.webp', true, null),
  ('La 2x4', 'tango', '92.7 FM', 0, 'https://media.radios.ar:9270/stream', '/radios/la-2x4.webp', true, null),
  ('La Gamba', 'deportiva', '106.3 FM', 0, 'https://servidor1.hostradios.com:8132/stream', '/radios/gamba-cordoba.webp', true, null),
  ('La Popu', 'general', '92.3 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/LAPOPU_SC', '/radios/popular-cordoba.webp', true, null),
  ('La Red', 'deportiva', 'AM 910', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/LA_RED_AM910AAC_SC', '/radios/la-red.webp', true, null),
  ('Los 40 Principales', 'pop', '105.5 FM', 0, 'https://frontend.radiohdvivo.com/los40/live', '/radios/los-40-principales.webp', true, null),
  ('Mega', 'general', '98.3 FM', 0, 'https://mega.stweb.tv/mega983/live/playlist.m3u8', '/radios/mega-98-3.png', true, null),
  ('Milenium', 'general', '106.7 FM', 0, 'https://sonicpanel.hostradios.com/8002/stream', '/radios/milenium.png', true, null),
  ('Mucha Radio', 'general', '94.7 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/MUCHA_RADIO_SC', '/radios/mucha-radio-fm.webp', true, null),
  ('Nacional Folklórica', 'folklore', '98.7 FM', 0, 'https://sa.mp3.icecast.magma.edge-access.net/sc_rad38', '/radios/nacional-folklorica.webp', true, null),
  ('Nacional Rock', 'rock', '93.7 FM', 0, 'https://sa.mp3.icecast.magma.edge-access.net/sc_rad39', '/radios/nacional-rock.webp', true, null),
  ('Nuestra Radio', 'general', '102.3 FM', 0, 'https://sa.mp3.icecast.magma.edge-access.net/sc_rad38', '/radios/nuestra-cordoba.webp', true, null),
  ('Oktubre FM', 'general', '89.1 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/OKTUBRE_SC', '/radios/oktubre-fm.webp', true, null),
  ('Peregrina', 'general', '92.9 FM', 0, 'https://srv1.streamingradio.ar/8106/stream', '/radios/peregrina.png', true, null),
  ('Radio 10', 'general', 'AM 710', 0, 'https://radio10.stweb.tv/radio10/live/playlist.m3u8', '/radios/radio-10.webp', true, null),
  ('Radio 770', 'general', 'AM 770', 0, 'https://server.radiostreaming.com.ar/8200/stream/1/', '/radios/radio-770.webp', true, null),
  ('Radio Clásica', 'clasica', '96.7 FM', 0, 'https://sa.mp3.icecast.magma.edge-access.net/sc_rad37', '/radios/clasica.webp', true, null),
  ('Radio Continental', 'general', 'AM 590', 0, 'https://frontend.radiohdvivo.com/continental/live', '/radios/continental.webp', true, null),
  ('Radio del Plata', 'general', 'AM 1030', 0, 'https://streaming01.shockmedia.com.ar:10217/stream/1/', '/radios/del-plata.webp', true, null),
  ('Radio Disney', 'pop', '94.7 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/DISNEY_ARG_BA_SC', '/radios/radio-disney.webp', true, null),
  ('Radio El Mundo', 'general', 'AM 1070', 0, 'https://streaming.escuchanosonline.com:7118/stream/1/', '/radios/el-mundo.webp', true, null),
  ('Radio Latina', 'pop', '101.1 FM', 0, 'https://stream-gtlc.telecentro.net.ar/hls/latinatvhls/main.m3u8', '/radios/latina.webp', true, null),
  ('Radio Metro', 'pop', '95.1 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/METRO_SC', '/radios/radio-metro.webp', true, null),
  ('Radio Nacional Argentina', 'general', 'AM 870', 0, 'https://sa.mp3.icecast.magma.edge-access.net/sc_rad1', '/radios/radio-nacional-argentina.webp', true, null),
  ('Radio Pop', 'pop', '101.5 FM', 0, 'https://popradio.stweb.tv/popradio/live/playlist.m3u8', '/radios/radio-pop.png', true, null),
  ('Radio Rivadavia', 'general', 'AM 630', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/RIVADAVIA_SC', '/radios/rivadavia.webp', true, null),
  ('Rock & Pop', 'rock', '95.9 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/ROCKANDPOP_SC', '/radios/rock-and-pop.webp', true, null),
  ('Rosario 3', 'general', 'AM 1230', 0, 'https://ice3.edge-apps.net/ros3-radio2/live/playlist.m3u8', '/radios/rosario-3.webp', true, null),
  ('Sonic', 'general', '103.3 FM', 0, 'https://streams.cloudcast.media/radio/8000/listen.mp3', '/radios/sonic.webp', true, null),
  ('Sucesos', 'general', '104.7 FM', 0, 'https://streaming.dainusradio.com:2341/stream/1/', '/radios/sucesos-cordoba.png', true, null),
  ('Suquía', 'general', '96.5 FM', 0, 'https://streaming01.shockmedia.com.ar:10945/stream/1/', '/radios/suquia-cordoba.webp', true, null),
  ('TKM Radio', 'pop', '103.7 FM', 0, 'https://one.stweb.tv/one/live/playlist.m3u8', '/radios/tkm-radio.webp', true, null),
  ('Vale', 'general', '97.5 FM', 0, 'https://vale.stweb.tv/vale/live/playlist.m3u8', '/radios/radio-vale.webp', true, null),
  ('Vida', 'general', '97.9 FM', 0, 'https://streaming450tb.locucionar.com/proxy/fmvida979?mp=/stream', '/radios/vida-rosario.webp', true, null),
  ('Vorterix', 'rock', '92.9 FM', 0, 'https://ice2.edge-apps.net/radio1_high-20057.audio', '/radios/vorterix.webp', true, null);
