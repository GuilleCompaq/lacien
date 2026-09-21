-- Catálogo real de radios argentinas. Notas:
--   * stream_url: cargadas salvo 'Nacional Rock', que sigue en 'PENDIENTE'.
--     La app clasifica cada URL en runtime (src/lib/streamSupport.ts) y muestra
--     "Sin señal" en vez de ofrecer un play que va a fallar. Casos conocidos que
--     caen en ese estado: ESPN (apunta a una página, no a un stream), Vida
--     (archivo .m3u sobre http), Rosario 3 (http, bloqueado por contenido mixto)
--     y las 7 de HLS (.m3u8) en navegadores que no son Safari.
--   * Nacional Folklórica y Nuestra Radio comparten URL: una sirve el audio de
--     la otra. Falta la URL propia de una de las dos.
--   * frequency: las 43 tienen frecuencia real, así que la banda AM/FM es
--     derivable por completo (11 AM, 32 FM).
--   * genre: 'general' es el default para emisoras generalistas/de noticias o
--     cuyo formato musical exacto no se pudo confirmar (p. ej. varias regionales
--     de Córdoba/Rosario/Mendoza).
--   * listeners: en 0 para todas (no hay integración de analítica real todavía).
--   * current_track: null para todas (no hay integración de "sonando ahora" real).
insert into public.radios (name, genre, frequency, listeners, stream_url, cover_image, is_live, current_track)
values
  ('Aspen', 'pop', '102.3 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/ASPEN_SC', '/radios/aspen.webp', true, null),
  ('Cadena 3', 'general', 'AM 700', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO3_SC', '/radios/cadena-tres.webp', true, null),
  ('Radio Clásica', 'clasica', '96.7 FM', 0, 'https://sa.mp3.icecast.magma.edge-access.net/sc_rad37', '/radios/clasica.webp', true, null),
  ('Radio Continental', 'general', 'AM 590', 0, 'https://frontend.radiohdvivo.com/continental/live', '/radios/continental.webp', true, null),
  ('Radio del Plata', 'general', 'AM 1030', 0, 'https://streaming01.shockmedia.com.ar:10217/stream/1/', '/radios/del-plata.webp', true, null),
  ('Delta', 'general', '90.3 FM', 0, 'https://cdn.instream.audio/:9069/stream', '/radios/delta-capital-federal.webp', true, null),
  ('Radio El Mundo', 'general', 'AM 1070', 0, 'https://streaming.escuchanosonline.com:7118/stream/1/', '/radios/el-mundo.webp', true, null),
  ('ESPN Radio Argentina', 'deportiva', '100.3 FM', 0, 'https://www.espn.com.ar/radio/play/_/s/deportes', '/radios/espn-radio-argentina.png', true, null),
  ('FM Con Vos', 'general', '89.9 FM', 0, 'https://server1.stweb.tv/rcvos/live/playlist.m3u8', '/radios/fm-89-9.webp', true, null),
  ('FM Córdoba', 'general', '91.9 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/CADENAHEAT_SC', '/radios/fm-cordoba.webp', true, null),
  ('Fónica', 'general', '100.7 FM', 0, 'https://edge03.radiohdvivo.com/radiofonica', '/radios/fonica-rosario.webp', true, null),
  ('La Gamba', 'deportiva', '106.3 FM', 0, 'https://servidor1.hostradios.com:8132/stream', '/radios/gamba-cordoba.webp', true, null),
  ('La 2x4', 'tango', '92.7 FM', 0, 'https://media.radios.ar:9270/stream', '/radios/la-2x4.webp', true, null),
  ('La Red', 'deportiva', 'AM 910', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/LA_RED_AM910AAC_SC', '/radios/la-red.webp', true, null),
  ('La 100', 'pop', '99.9 FM', 0, 'https://26573.live.streamtheworld.com/FM999_56.mp3', '/radios/la-100.webp', true, null),
  ('Radio Latina', 'pop', '101.1 FM', 0, 'https://stream-gtlc.telecentro.net.ar/hls/latinatvhls/main.m3u8', '/radios/latina.webp', true, null),
  ('Los 40 Principales', 'pop', '105.5 FM', 0, 'https://frontend.radiohdvivo.com/los40/live', '/radios/los-40-principales.webp', true, null),
  ('Mega', 'general', '98.3 FM', 0, 'https://mega.stweb.tv/mega983/live/playlist.m3u8', '/radios/mega-98-3.png', true, null),
  ('Milenium', 'general', '106.7 FM', 0, 'https://sonicpanel.hostradios.com/8002/stream', '/radios/milenium.png', true, null),
  ('Mucha Radio', 'general', '94.7 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/MUCHA_RADIO_SC', '/radios/mucha-radio-fm.webp', true, null),
  ('Nacional Folklórica', 'folklore', '98.7 FM', 0, 'https://sa.mp3.icecast.magma.edge-access.net/sc_rad38', '/radios/nacional-folklorica.webp', true, null),
  ('Nacional Rock', 'rock', '93.7 FM', 0, 'PENDIENTE', '/radios/nacional-rock.webp', true, null),
  ('Nuestra Radio', 'general', '102.3 FM', 0, 'https://sa.mp3.icecast.magma.edge-access.net/sc_rad38', '/radios/nuestra-cordoba.webp', true, null),
  ('Oktubre FM', 'general', '89.1 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/OKTUBRE_SC', '/radios/oktubre-fm.webp', true, null),
  ('Radio Popular', 'general', '92.3 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/LAPOPU_SC', '/radios/popular-cordoba.webp', true, null),
  ('Radio 10', 'general', 'AM 710', 0, 'https://radio10.stweb.tv/radio10/live/playlist.m3u8', '/radios/radio-10.webp', true, null),
  ('Radio 770', 'general', 'AM 770', 0, 'https://server.radiostreaming.com.ar/8200/stream/1/', '/radios/radio-770.webp', true, null),
  ('AM 750', 'general', 'AM 750', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/AM750AAC_SC', '/radios/radio-am-750-buenos-aires.webp', true, null),
  ('Radio Disney', 'pop', '94.7 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/DISNEY_ARG_BA_SC', '/radios/radio-disney.webp', true, null),
  ('Radio Metro', 'pop', '95.1 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/METRO_SC', '/radios/radio-metro.webp', true, null),
  ('Radio Nacional Argentina', 'general', 'AM 870', 0, 'https://sa.mp3.icecast.magma.edge-access.net/sc_rad1', '/radios/radio-nacional-argentina.webp', true, null),
  ('Radio Pop', 'pop', '101.5 FM', 0, 'https://popradio.stweb.tv/popradio/live/playlist.m3u8', '/radios/radio-pop.png', true, null),
  ('Vale', 'general', '97.5 FM', 0, 'https://vale.stweb.tv/vale/live/playlist.m3u8', '/radios/radio-vale.webp', true, null),
  ('Radio Rivadavia', 'general', 'AM 630', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/RIVADAVIA_SC', '/radios/rivadavia.webp', true, null),
  ('Rock & Pop', 'rock', '95.9 FM', 0, 'https://playerservices.streamtheworld.com/api/livestream-redirect/ROCKANDPOP_SC', '/radios/rock-and-pop.webp', true, null),
  ('Rosario 3', 'general', 'AM 1230', 0, 'http://streaming320tb.locucionar.com:8000/stream/1/', '/radios/rosario-3.webp', true, null),
  ('FM Sol', 'general', '100.9 FM', 0, 'https://estaciondelsolonline.com.ar:8000/radio.aac', '/radios/sol-mendoza.webp', true, null),
  ('Sonic', 'general', '103.3 FM', 0, 'https://streams.cloudcast.media/radio/8000/listen.mp3', '/radios/sonic.webp', true, null),
  ('Sucesos', 'general', '104.7 FM', 0, 'https://streaming.dainusradio.com:2341/stream/1/', '/radios/sucesos-cordoba.png', true, null),
  ('Suquía', 'general', '96.5 FM', 0, 'https://streaming01.shockmedia.com.ar:10945/stream/1/', '/radios/suquia-cordoba.webp', true, null),
  ('TKM Radio', 'pop', '103.7 FM', 0, 'https://one.stweb.tv/one/live/playlist.m3u8', '/radios/tkm-radio.webp', true, null),
  ('Vida', 'general', '97.9 FM', 0, 'http://69.61.116.26:8000/stream.m3u', '/radios/vida-rosario.webp', true, null),
  ('Vorterix', 'rock', '92.9 FM', 0, 'https://ice2.edge-apps.net/radio1_high-20057.audio', '/radios/vorterix.webp', true, null);
