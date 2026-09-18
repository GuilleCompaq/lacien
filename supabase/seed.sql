-- Catálogo real de radios argentinas. Notas:
--   * stream_url: TODAS son placeholders ('PENDIENTE'). Reemplazalas por la URL
--     de streaming real de cada emisora antes de producción (usePlayer intentará
--     reproducirlas tal cual y fallará silenciosamente mientras sigan así).
--   * frequency: se completó solo para emisoras nacionales muy conocidas de las
--     que hay certeza razonable; el resto queda como 'Frecuencia pendiente' para
--     no afirmar un dato posiblemente incorrecto de una marca real.
--   * genre: 'general' es el default para emisoras generalistas/de noticias o
--     cuyo formato musical exacto no se pudo confirmar (p. ej. varias regionales
--     de Córdoba/Rosario/Mendoza).
--   * listeners: en 0 para todas (no hay integración de analítica real todavía).
--   * current_track: null para todas (no hay integración de "sonando ahora" real).
insert into public.radios (name, genre, frequency, listeners, stream_url, cover_image, is_live, current_track)
values
  ('Aspen', 'pop', '102.3 FM', 0, 'https://26573.live.streamtheworld.com/FM999_56.mp3', '/radios/aspen.webp', true, null),
  ('Cadena 3', 'general', 'AM 700', 0, 'PENDIENTE', '/radios/cadena-tres.webp', true, null),
  ('Radio Clásica', 'clasica', '96.7 FM', 0, 'PENDIENTE', '/radios/clasica.webp', true, null),
  ('Radio Continental', 'general', 'AM 590', 0, 'PENDIENTE', '/radios/continental.webp', true, null),
  ('Radio del Plata', 'general', 'AM 1030', 0, 'PENDIENTE', '/radios/del-plata.webp', true, null),
  ('Delta', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/delta-capital-federal.webp', true, null),
  ('Radio El Mundo', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/el-mundo.webp', true, null),
  ('ESPN Radio Argentina', 'deportiva', '100.3 FM', 0, 'PENDIENTE', '/radios/espn-radio-argentina.png', true, null),
  ('FM 89.9', 'general', '89.9 FM', 0, 'PENDIENTE', '/radios/fm-89-9.webp', true, null),
  ('FM Córdoba', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/fm-cordoba.webp', true, null),
  ('Fónica', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/fonica-rosario.webp', true, null),
  ('La Gamba', 'deportiva', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/gamba-cordoba.webp', true, null),
  ('La 2x4', 'tango', '92.7 FM', 0, 'PENDIENTE', '/radios/la-2x4.webp', true, null),
  ('La Red', 'deportiva', 'AM 910', 0, 'PENDIENTE', '/radios/la-red.webp', true, null),
  ('La 100', 'pop', '99.9 FM', 0, 'PENDIENTE', '/radios/la-100.webp', true, null),
  ('Radio Latina', 'pop', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/latina.webp', true, null),
  ('Los 40 Principales', 'pop', '105.5 FM', 0, 'PENDIENTE', '/radios/los-40-principales.webp', true, null),
  ('Mega', 'general', '98.3 FM', 0, 'PENDIENTE', '/radios/mega-98-3.png', true, null),
  ('Milenium', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/milenium.png', true, null),
  ('Mucha Radio', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/mucha-radio-fm.webp', true, null),
  ('Nacional Folklórica', 'folklore', '98.7 FM', 0, 'PENDIENTE', '/radios/nacional-folklorica.webp', true, null),
  ('Nacional Rock', 'rock', '93.7 FM', 0, 'PENDIENTE', '/radios/nacional-rock.webp', true, null),
  ('Nuestra Radio', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/nuestra-cordoba.webp', true, null),
  ('Oktubre FM', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/oktubre-fm.webp', true, null),
  ('Radio Popular', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/popular-cordoba.webp', true, null),
  ('Radio 10', 'general', 'AM 710', 0, 'PENDIENTE', '/radios/radio-10.webp', true, null),
  ('Radio 770', 'general', 'AM 770', 0, 'PENDIENTE', '/radios/radio-770.webp', true, null),
  ('AM 750', 'general', 'AM 750', 0, 'PENDIENTE', '/radios/radio-am-750-buenos-aires.webp', true, null),
  ('Radio Disney', 'pop', '94.7 FM', 0, 'PENDIENTE', '/radios/radio-disney.webp', true, null),
  ('Radio Metro', 'pop', '95.1 FM', 0, 'PENDIENTE', '/radios/radio-metro.webp', true, null),
  ('Radio Nacional Argentina', 'general', 'AM 870', 0, 'PENDIENTE', '/radios/radio-nacional-argentina.webp', true, null),
  ('Radio Pop', 'pop', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/radio-pop.png', true, null),
  ('Vale', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/radio-vale.webp', true, null),
  ('Radio Rivadavia', 'general', 'AM 630', 0, 'PENDIENTE', '/radios/rivadavia.webp', true, null),
  ('Rock & Pop', 'rock', '95.9 FM', 0, 'PENDIENTE', '/radios/rock-and-pop.webp', true, null),
  ('Rosario 3', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/rosario-3.webp', true, null),
  ('FM Sol', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/sol-mendoza.webp', true, null),
  ('Sonic', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/sonic.webp', true, null),
  ('Sucesos', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/sucesos-cordoba.png', true, null),
  ('Suquía', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/suquia-cordoba.webp', true, null),
  ('TKM Radio', 'pop', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/tkm-radio.webp', true, null),
  ('Vida', 'general', 'Frecuencia pendiente', 0, 'PENDIENTE', '/radios/vida-rosario.webp', true, null),
  ('Vorterix', 'rock', '92.9 FM', 0, 'PENDIENTE', '/radios/vorterix.webp', true, null);
