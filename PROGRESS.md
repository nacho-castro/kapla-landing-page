# Progreso — Landing de KAPLA

## Paso 1: Esqueleto — HECHO (2026-09-30)

### Hecho
- Proyecto Astro 7 (salida estática) + Tailwind CSS 4 + TypeScript `strictest`.
- Tokens de diseño en un solo lugar: `src/styles/global.css` (bloque `@theme`). La paleta por defecto de Tailwind está desactivada: solo se pueden usar los colores de marca.
- Fuente Inter autoalojada (`@fontsource-variable/inter`). No se hacen pedidos a servidores externos.
- `BaseLayout` con `lang="es"`, title y description básicos, favicon y enlace "Saltar al contenido".
- `Navbar` fija con menú móvil accesible (botón con `aria-expanded`/`aria-controls`, cierra con Escape devolviendo el foco, al elegir un enlace y al pasar a escritorio).
- `Footer` con logo, email, íconos SVG de Instagram/LinkedIn/TikTok, enlace al aviso de privacidad y año automático.
- Página con secciones vacías y anclas: `#inicio`, `#trabajo`, `#por-que`, `#proceso`, `#contacto` (y `#privacidad` dentro de Contacto).
- Textos y enlaces editables en `src/data/site.ts`.
- `TodoContent`: los textos de ejemplo se ven solo en desarrollo; no aparecen en el build.

### Verificado
- `npx astro check`: 0 errores, 0 advertencias.
- `npm run build`: OK. HTML 5,7 KB, CSS 12 KB, fuente latin 48 KB, JS del menú inline (menos de 1 KB). Sin textos "Pendiente" en `dist/`.
- Capturas en 360, 768 y 1280 px: sin scroll horizontal; hamburguesa en móvil, enlaces en escritorio.
- Menú móvil probado con teclado: Enter abre, Tab entra al menú, Escape cierra y devuelve el foco; tocar un enlace cierra y navega.

### Decisiones
- Tipografía: Inter (elegida por el dueño).
- Tailwind 4 vía `@tailwindcss/vite` (la integración oficial actual).
- Un componente `Section` común para anclas, fondos alternados (claro/oscuro) y ancho.
- Color de foco: azul de marca sobre fondos claros, azul claro sobre fondos oscuros.
- Redes/email sin valor real: en desarrollo se muestran punteados como pendientes; en producción no se muestran.

### Contraste de los tokens (WCAG AA texto normal: 4,5:1)
| Texto / fondo | Contraste |
|---|---|
| `brand #001178` sobre blanco (y blanco sobre brand) | 15,5:1 |
| `ink #0B0B0F` sobre blanco | 19,5:1 |
| `muted #5B6170` sobre blanco / sobre `surface` | 6,2:1 / 5,7:1 |
| `brand-light #8C9BFF` sobre `ink` | 7,7:1 |
| `muted-dark #A1A6B3` sobre `ink` | 8,0:1 |
| `brand` sobre `ink` | 1,3:1 — **no usar** |

### Revisión web-reviewer
- Corregido: lista de redes vacía en producción, contorno de foco sobre todo el `main`, marca TODO en el título del hero en `site.ts`.
- **Condición para publicar:** el enlace "Aviso de privacidad" apunta a `#privacidad`, que hoy está vacío en producción. Se completa en el paso 4.
- Para el paso 5: cargar solo el subset latin de Inter y precargarlo (hoy el CSS declara 7 subsets; el navegador descarga solo el latin).
- Aceptado: el menú móvil necesita JavaScript (sin JS se sigue navegando con el hero y el footer).

## Dominio y SEO base — HECHO (2026-10-01)

### Hecho
- Dominio definitivo: **https://kaplatech.com.ar** (sin www). Definido una sola vez en `astro.config.mjs` (`SITE_URL`, usado como `site`).
- URL canónica (`<link rel="canonical">`) generada a partir del dominio.
- `sitemap.xml` y `robots.txt` generados en el build desde el dominio (`src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`), sin dependencias nuevas. `robots.txt` permite todo y apunta al sitemap.
- Open Graph (`og:type`, `og:site_name`, `og:locale es_AR`, `og:url`, `og:title`, `og:description`) y `twitter:card`.
- La imagen para compartir queda preparada en `site.ts` (`ogImage`): mientras sea `null` no se emite `og:image` y la tarjeta es `summary`; al cargarla pasa a `summary_large_image` con su URL absoluta.

### Verificado
- `npx astro check`: 0 errores. `npm run build`: OK; `dist/` contiene `robots.txt` y `sitemap.xml` con `https://kaplatech.com.ar/`.

### Decisiones
- Sitemap y robots como endpoints estáticos propios en vez de `@astrojs/sitemap` (evita una dependencia; el sitio es de una sola página).
- Sin deploy todavía. Al publicar: configurar en el hosting la redirección permanente de `www.kaplatech.com.ar` al dominio sin www, para que coincida con la canónica.

## Paso 3: Por qué KAPLA y Proceso — HECHO (2026-10-02)

### Hecho
- Título del hero: "Automatizamos los procesos de tu PyME e implementamos inteligencia artificial a medida".
- `Why.astro`: texto del dueño (en `site.ts` > `why`) con un único botón "Quiero una auditoría".
- `Process.astro`: 4 pasos numerados con ícono (Auditoría, Diseño, Implementación, Mantenimiento), en `site.ts` > `processSteps`.
- Footer: enlaces reales de Instagram y LinkedIn.

### Verificado
- `npx astro check`: 0 errores. `npm run build`: OK, sin textos "Pendiente" en `dist/`.
- Capturas en 768 y 1280 px: OK. 360 px sin confirmar (la captura sin interfaz salió recortada).

### Decisiones
- Íconos como SVG inline en `Icon.astro` (estilo de trazo uniforme, inspirados en Lucide) en lugar de `lucide-react`: el proyecto no usa React y no se suman dependencias.
- Revisión web-reviewer aplicada: el cierre de Why pasa a lenguaje de objetivo, se quitan "Consultá sin compromiso..." y el paso Capacitación, y "Optimización continua" pasa a "Mantenimiento". Nuevo ícono de TikTok con estilo de línea.
- Por pedido del dueño se suavizaron "nuestros clientes", "todos los rubros" y "Latinoamérica" (no confirmados).
- Hero: subtítulo "Tu negocio, completamente ordenado.". Email y WhatsApp cargados; botón flotante chico de WhatsApp (`WhatsAppButton.astro`, abre wa.me).

## Paso 4: Contacto y privacidad — EN CURSO (2026-10-02)

### Hecho
- Servicio de formulario: **Formspree** (elegido por el dueño). El id va en `PUBLIC_FORMSPREE_ID` (`.env.example`); es público por diseño, no es un secreto.
- `Contact.astro`: nombre, email y mensaje opcional, con etiquetas visibles, `maxlength`, campo trampa `_gotcha`, nota de privacidad y enlace a WhatsApp. Envío con `fetch` y mensajes fijos (no se muestra texto del usuario ni detalles del servidor). Sin JS el formulario igual se envía. Sin id configurado, el formulario no se muestra.
- Página aparte `/privacidad` (Ley 25.326), enlazada desde el footer y el formulario, incluida en el sitemap.
- Enlaces del menú pasan a `/#seccion` para que funcionen desde `/privacidad`.

### Verificado
- `astro check` 0 errores, build OK. Con un id de prueba el formulario se genera con `action` de Formspree, honeypot y zona `role="status"`.
- Falta: probar un envío real (con el id), vista en móvil y web-reviewer.

### Para el paso 5
- CSP: permitir `form-action` y `connect-src` hacia `https://formspree.io`.
- En Formspree: activar la protección anti-spam y validación del email del lado del servicio.

## Pendiente (próximos pasos)
- Paso 2: subtítulo del hero y sección Trabajo con MiClase. Botones del hero hechos: "Quiero una auditoría" (Calendly, pestaña nueva) y "Ver trabajo" (#trabajo). Todos los botones de auditoría van a Calendly.
- Paso 4: Contacto con formulario seguro (definir el servicio antes).
- Paso 5: datos estructurados `Organization`, imagen Open Graph, headers de seguridad, redirección www, Lighthouse.

## Sección Opiniones — HECHO (2026-10-02)
- `Testimonials.astro` (`#opiniones`), entre Proceso y Contacto, fondo gris claro (`tone="surface"`) para no juntar dos secciones blancas.
- Fila deslizable con CSS (scroll-snap), sin JavaScript: 1 tarjeta y la siguiente asomando en móvil, 2 en tablet, 3 en escritorio. Navegable con teclado (región con foco).
- Datos en `testimonials` de `site.ts`. Mientras esté vacío, la sección **no aparece en producción**; en desarrollo muestra tarjetas de ejemplo marcadas como pendientes.
- Verificado: `astro check` 0 errores, build OK sin la sección, capturas en 360 y 1280 px.

## Renovación — Pasos 0 y 1 (2026-10-22)

### Decisiones del dueño
- MiClase tiene usuarios reales: estado "En producción".
- Fundador: Ignacio Castro, Founder.
- Paleta aprobada: `accent #2A3FFF` y `accent-light #8F9BFF`.

### Hecho
- Paso 0: CLAUDE.md actualizado (navbar píldora, contacto solo WhatsApp, secciones nuevas, paleta y tipografía; sin formulario, Calendly ni Formspree).
- Paso 1: tokens nuevos en `@theme` de `src/styles/global.css` (`ink`, `navy`, `blue-deep`, `brand`, `accent`, `accent-light`, `soft`, `muted`, `muted-dark`, `whatsapp`, más `surface`, `line`, `line-dark`). `brand-light` pasa a `accent-light`.
- Tipografía General Sans autoalojada en `public/fonts/` (400, 500, 600; woff2 de Fontshare, ~23 KB c/u, `unicode-range` latin). Precarga del peso 400. Se quitó `@fontsource-variable/inter`.
- `soft`: `#DDE1F5`. Se mantuvo el valor sugerido porque da 15,1:1 con `ink` y 13,1:1 con `navy`.

### Contraste de los tokens (WCAG AA texto normal: 4,5:1)
| Texto / fondo | Contraste |
|---|---|
| `ink` sobre blanco / sobre `soft` | 19,7:1 / 15,1:1 |
| `brand` sobre blanco (y blanco sobre `brand`) | 10,6:1 |
| blanco sobre `accent` (y `accent` sobre blanco) | 6,5:1 |
| `accent` sobre `soft` | 5,0:1 |
| blanco sobre `blue-deep` | 13,9:1 |
| `muted` sobre blanco / `surface` / `soft` | 7,3:1 / 6,7:1 / 5,7:1 |
| `soft` sobre `ink` / `navy` | 15,1:1 / 13,1:1 |
| `accent-light` sobre `ink` / `navy` | 7,8:1 / 6,7:1 |
| `muted-dark` sobre `ink` / `navy` | 9,2:1 / 8,0:1 |
| `ink` sobre `whatsapp` | 9,9:1 |
| blanco sobre `whatsapp` | 2,0:1 — **no usar** (texto de botón WhatsApp en `ink`) |
| `brand` sobre `ink` | 1,9:1 — **no usar** como texto sobre oscuro |

### Licencia de la fuente
- General Sans es de Fontshare (Indian Type Foundry, licencia "Free Font License"). No pude leer el texto de la licencia desde la web (la página se carga con JS). Verificala vos en https://www.fontshare.com/terms antes de publicar; según mi conocimiento permite uso comercial y autoalojado, pero no está confirmado.
- No se pudo hacer subset propio (falta una herramienta); se usan los archivos web de Fontshare tal cual.

### Verificado
- `npx astro check`: 0 errores. `npm run build`: OK.

## Renovación — Pasos 2 y 3: Navbar y Hero (2026-10-22)

### Hecho
- `Navbar.astro`: píldora flotante oscura (ink semitransparente, blur, borde y sombra; fallback sin blur más opaco). Móvil: píldora con logo y hamburguesa, panel debajo con el mismo estilo. Escritorio: logo a la izquierda, píldora con Servicios/Proyectos/Fundador/FAQ al centro y "Auditoría gratis" a la derecha. Menú accesible (aria-expanded, aria-controls, Escape, cierra al elegir y al pasar a escritorio).
- Animación de entrada `nav-drop` (600 ms, una vez, solo CSS, desactivada con reduced-motion).
- Resaltado de sección activa con IntersectionObserver (JS mínimo): píldora clara que se desliza (transición suave, sin transición con reduced-motion) y `aria-current="true"`. Sin JS los enlaces funcionan igual.
- `scroll-margin-top` de las secciones: 6,5 rem (`--spacing-nav`).
- WhatsApp: `whatsappUrl` definido una sola vez en `site.ts` (con `?text=` codificado). Lo usan header, hero y Por qué. Se eliminó Calendly de `site.ts`. Pendiente: botón flotante y Contacto (paso 9).
- Hero oscuro con degradé sutil `ink` a `navy`: H1 "Automatizamos tus sistemas.", subtítulo, línea de apoyo y botones (WhatsApp verde con texto `ink`, y "Ver trabajo").
- Los pesos `font-bold`/`font-extrabold` pasan a `font-semibold` (solo se cargan 400, 500 y 600).

### Verificado
- `astro check` 0 errores, build OK. Capturas con Edge headless y emulación de dispositivo en 360, 768 y 1280 px: sin scroll horizontal (360: 360/360), menú móvil abierto OK, resaltado de "Proyectos" al hacer scroll OK.
- La extensión de Chrome no estaba conectada; se usó Edge headless por DevTools.

### Para aprobar
- Línea de apoyo del hero (propuesta): "Inteligencia artificial, páginas web, CRMs y redes sociales, para que tu negocio funcione sin tareas repetitivas." (`sections.hero.support` en `site.ts`).
- Los enlaces Servicios, Fundador y FAQ apuntan a secciones que se crean en los pasos 4, 7 y 8.

## Renovación — Pasos 4 a 10 (2026-10-22)

### Hecho
- Servicios (`Services.astro`, `#servicios`): 4 tarjetas con ícono SVG inline, sin precios, un CTA a WhatsApp. Datos en `services` (`site.ts`).
- Proyectos (`Projects.astro`, `#proyectos`, reemplaza a Work): pestañas con roles ARIA y flechas/Home/End; marco tipo navegador con alto fijo y scroll propio (región con `tabindex=0`, `aria-label`, foco visible; el scroll encadena a la página al llegar al final); sin iframes; sin JS se listan apilados; toggle Computadora/Celular solo si hay ambas capturas. Datos en `projects` (`site.ts`); las capturas se detectan por nombre en `src/assets/projects/<id>-desktop|mobile.*`.
- Por qué KAPLA: estilos nuevos y CTA a WhatsApp. Proceso sin cambios (ya usa los tokens).
- Fundador (`#fundador`) y FAQ (`#faq`, `<details>`, sin JS). Los datos pendientes no se muestran en producción: Fundador y su enlace del menú aparecen solo cuando `founder.bio` tenga texto; la FAQ muestra solo las preguntas con respuesta real (2 de 6) y emite JSON-LD `FAQPage` solo con esas.
- Contacto solo WhatsApp: título, línea, botón verde grande y email. Eliminados el formulario, el JS de envío, el honeypot, Formspree, `PUBLIC_FORMSPREE_ID` (`.env.example` y `env.d.ts`) y todo Calendly. Botón flotante usa el mismo `whatsappUrl`. `/privacidad` actualizada (sin formulario).
- SEO: meta description nueva (propuesta), datos estructurados `Organization` en `BaseLayout`. El sitemap lista páginas (`/` y `/privacidad`): los sitemaps no admiten anclas (#), por eso no se agregan.
- Seguridad: CSP como `<meta>` generada por Astro con hashes de los scripts inline (`security.csp` en `astro.config.mjs`), sin `formspree.io` ni orígenes externos (`default-src 'self'`, `form-action 'none'`). `vercel.json` con `frame-ancestors 'none'`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, HSTS, `Permissions-Policy` y caché larga para `/fonts` y `/_astro`.
- `SETUP.md` escrito (sin Formspree; con WhatsApp y capturas).

### Verificado
- `astro check` 0 errores, build OK, sin textos "Pendiente", Calendly ni Formspree en `dist/` ni en `src/`.
- Lighthouse móvil (build servido con `astro preview`): Rendimiento 100, Accesibilidad 100, Buenas prácticas 100, SEO 100. LCP 1,4 s, CLS 0, TBT 0 ms, peso total 104 KiB.
- Capturas en 360, 768 y 1280 px (Edge headless con emulación): sin scroll horizontal (scrollWidth igual al ancho).
- Pendiente: probar con un celular real y con lectores de pantalla.

## TODO-CONTENIDO (datos que faltan)
| Dónde | Qué falta |
|---|---|
| `src/assets/projects/` | Capturas de página completa de MiClase y Jorgelina PMP (hoy hay imágenes provisorias, no son de página completa). Opcional: `-mobile` |
| `src/data/site.ts` (`founder.bio`) | Texto en primera persona del fundador (nombre y cargo ya cargados: Ignacio Castro, Founder) |
| `src/assets/founder.jpg` | Foto del fundador |
| `src/data/site.ts` (`faq`) | Respuestas reales: tecnología, costo, plazos, después de la implementación (hoy `null`, no se muestran) |
| `src/data/site.ts` (`services`) | Alcance exacto de la gestión de redes; aprobar los textos propuestos |
| `src/data/site.ts` (`sections.hero.support`) | Aprobar la línea de apoyo |
| `src/data/site.ts` (`site.description`) | Aprobar la meta description propuesta |
| `src/data/site.ts` + `public/` | Imagen para compartir (Open Graph, 1200x630) |
| `src/components/Logo.astro` | Logo definitivo (hoy es texto "KAPLA") |
| `public/favicon.svg` | Favicon definitivo |
| `src/data/site.ts` (`processSteps`) | Alcance del paso Mantenimiento |
| `src/pages/privacidad.astro` | Revisión legal del aviso de privacidad |
| `src/data/site.ts` (`testimonials`) | Opiniones reales de clientes, con permiso (la sección no aparece hasta que haya) |

## Decisiones [SUPUESTO] a confirmar
- `soft` queda en `#DDE1F5`; `accent` `#2A3FFF`; `accent-light` `#8F9BFF`.
- General Sans: licencia de Fontshare sin verificar (la página requiere JS). Revisarla antes de publicar. Sin subset propio: se usan los archivos web de Fontshare (~23 KB c/u).
- Header: Proceso y Por qué KAPLA no están en el menú. El enlace Fundador aparece solo cuando hay texto del fundador.
- Sin precios visibles; se consulta por WhatsApp.
- `/privacidad` se conserva simplificada.
- Se mantiene la sección Opiniones (oculta mientras no haya opiniones reales).
- CSP vía `<meta>` (Astro) más cabeceras en `vercel.json`; HSTS con `preload`.
- Si usás otro hosting que no sea Vercel, `vercel.json` hay que traducirlo a ese hosting.

### Revisión web-reviewer (2026-10-22) y correcciones
- Sin hallazgos críticos ni altos. Corregido: foco visible dentro del marco de capturas; CLS de las pestañas (clase `js`/`no-js` en `<html>`, paneles secundarios ya ocultos desde el servidor); `<title>` descriptivo de la home; marcadores `TODO-CONTENIDO:` unificados; "PyMEs de cualquier rubro" suavizado a "PyMEs"; indicador del navbar se recalcula al cargar la fuente; `aria-label` del botón de menú; HSTS sin `preload`; caché de fuentes de 30 días.
- Lighthouse móvil tras las correcciones: 100 / 100 / 100 / 100, CLS 0, LCP 1,4 s.
- Pendiente (aceptado): redirección www a dominio sin www en el hosting; `og:image`; `apple-touch-icon` (falta el logo definitivo); sin JS no hay menú móvil.

## FAQ y Fundador con textos del dueño (2026-10-22)
- FAQ: 4 respuestas reales (auditoría, tecnología, herramientas, después de la implementación) y 2 pendientes (costo, plazo), que no se muestran en producción. `FAQPage` incluye solo las 4 publicadas.
- Mantenimiento (Proceso) y la FAQ usan el mismo texto, definido una sola vez en `site.ts` (`afterImplementation`): "Hasta 2 revisiones gratis. Después, cualquier consulta extra tiene un costo."
- Fundador: texto del dueño cargado; la sección y su enlace del menú ya aparecen en producción. La foto se toma de `src/assets/founder.*` (ya cargada).
- Pendiente: costo y plazo (FAQ). Se quitan de la lista de TODO-CONTENIDO: texto y foto del fundador, respuestas de tecnología y de después de la implementación, y el alcance de Mantenimiento.
- Aclaración para el dueño: el pedido decía "el mes gratis" pero la respuesta dice "hasta 2 revisiones gratis". Usé la respuesta; si es un mes, hay que cambiar `afterImplementation`.

## Capturas por pantalla, ícono de WhatsApp y fondos animados (2026-10-22)
- Proyectos: las capturas nuevas son tomas de pantalla por sección (no páginas completas), así que la sección pasa de marco con scroll a **galería con selector**: botones por pantalla (Inicio, Funciones, Cómo funciona, Pantallas, Obras) con fundido entre capturas, marco de navegador para computadora y marco de teléfono para celular, y toggle Computadora/Celular. Archivos: `src/assets/projects/<id>-desktop-<pantalla>.jpg` y `<id>-celular-<pantalla>.jpg`; se detectan solos (`site.ts`). Se borraron las imágenes provisorias. El id de Jorgelina pasa a `jorgelinapmp` (coincide con los archivos). Sin JS se ve la primera captura de cada vista.
- Ícono de WhatsApp: reemplazado por el logo conocido (burbuja con teléfono), relleno.
- Fondos con movimiento (solo CSS, sin librerías): hero con luces que se desplazan lento, grilla de puntos y una red de "automatización" (líneas que fluyen y nodo central que pulsa); luces suaves en Proyectos, Proceso y Contacto. Animación de entrada del hero y aparición suave al hacer scroll (JS mínimo con IntersectionObserver). Tarjetas de Servicios se elevan al pasar el mouse. Todo se desactiva con `prefers-reduced-motion`.
- Verificado: `astro check` 0 errores, build OK, capturas en 360 y 1280 px sin scroll horizontal. Lighthouse móvil 100/100/100/100, LCP 1,6 s, CLS 0, peso 161 KiB.
- Quitar de TODO-CONTENIDO: capturas de proyectos (ya cargadas; si querés páginas completas, reemplazarlas).

## Logos de proyectos y grafo interactivo (2026-10-22)
- MiClase: se quitó la etiqueta de estado (ya no muestra "En producción"). El campo `status` sigue disponible en `site.ts` por si se quiere marcar otro proyecto.
- Logos de proyectos junto al nombre (pestaña y título del panel), dentro de un cuadro oscuro para que funcione el logo blanco de Jorgelina. Se usan `miclase-logo-512.png` y `logo_jpmp_blanco.png` (`logo` en `site.ts`). `miclase-logo-120.png` queda sin usar.
- Grafo del hero: los nodos "vuelan" a su lugar al cargar y son atraídos por el mouse (o el dedo al tocar); las líneas los siguen y vuelven con efecto resorte. Un solo `requestAnimationFrame` que se detiene cuando todo está quieto. Sin movimiento con `prefers-reduced-motion`.
- Verificado: `astro check` 0 errores, build OK, Lighthouse móvil 100/100/100/100 (LCP 1,7 s, CLS 0). Prueba del grafo con Edge y movimiento emulado: los nodos se desplazan hacia el puntero y vuelven.

## Imagen para compartir y favicon con el isotipo de KAPLA (2026-10-22)
- `public/og-image.png` (1200x630): logo blanco sobre degradé `ink`/`navy` con luces azules. Conectada en `site.ogImage` (se emiten `og:image` y `twitter:card` grande).
- Favicon: `favicon-48.png` y `apple-touch-icon.png` (180 px) generados desde `kapla-icon-1024.png`; se reemplazó `favicon.svg`.
- Los logos fuente quedan en `src/assets/` (`kapla-dark-bg.png`, `kapla-light-bg.png`, `kapla-icon-1024.png`).
- Pendiente: el logo del navbar y del footer sigue siendo el texto "KAPLA" (`Logo.astro`). Se puede reemplazar por el logo real cuando lo indiques.
- Quitados de TODO-CONTENIDO: imagen para compartir y favicon.

## Título rotativo y navegación de Proyectos (2026-10-22)
- Hero: "Automatizamos tus [sistemas | redes | consultas | procesos | tareas]." La última palabra rota cada 2,4 s (solo CSS: sube con desenfoque, en azul claro con brillo). Lector de pantalla y visitantes sin movimiento ven el título fijo "Automatizamos tus sistemas." (`sections.hero.titleWords` en `site.ts`). "ordenado" del subtítulo se agranda y achica suave.
- Proyectos: contador "Proyecto 1 de 2" con flechas anterior/siguiente (dan la vuelta), swipe horizontal en pantallas táctiles y transición de deslizamiento entre proyectos. Se muestran solo si hay más de un proyecto y con JS.
- Para videos en el futuro: cada captura vive dentro de un marco (navegador o teléfono); reemplazar la imagen por un `<video muted loop playsinline>` local es compatible con la CSP actual (`default-src 'self'`). Cuando estén listos hay que sumar un campo `video` en `site.ts` y mantener el peso bajo.
- Verificado: `astro check` 0 errores, build OK. Lighthouse móvil: ver mensaje final.

## Logo real en navbar y footer, hero centrado (2026-10-22)
- `Logo.astro` ahora usa el logo provisto (versión blanca, recortada: `src/assets/kapla-logo-white.png`, generado desde `kapla-dark-bg.png`). Navbar: alto 36 px (antes texto de 20 px); footer: 40 px. Se dimensiona con una clase de alto.
- Hero centrado horizontal y verticalmente (alto mínimo de pantalla). El grafo pasa a ser fondo centrado, con el nodo central grande abajo para que no tape el texto.
- Corregido un error mío: al cargar, la página saltaba hasta Proyectos (`scrollIntoView` de la pestaña activa). Ahora solo se desplaza la fila de pestañas, y no al iniciar.
- Quitado de TODO-CONTENIDO: logo definitivo. Falta aún el favicon con el logo completo si se prefiere (hoy usa el isotipo).

## Todas las secciones sobre el mismo fondo azul (2026-10-22)
- Servicios, Por qué, Fundador, FAQ y Opiniones pasan de fondo blanco/gris a `ink` con luces animadas, igual que el resto. Hero y Contacto pierden su degradé: fondo plano `ink`. Las luces se desvanecen arriba y abajo de cada sección, así se leen como un solo fondo continuo.
- Textos y tarjetas adaptados (`muted-dark`, `accent-light`, tarjetas translúcidas con borde fino). Contraste dentro de la tabla ya documentada.
- `/privacidad` conserva su fondo claro (es una página de lectura aparte).
- Lighthouse móvil 100/100/100/100.

## Botones de auditoría en violeta (2026-10-22)
- "Auditoría gratis" (navbar, escritorio y menú móvil) y "Quiero una auditoría" (hero) pasan a `violet #6C1ABA` (antes #9D00FF), hover `violet-deep #55148F`, texto blanco y borde fino claro. Contraste: blanco sobre `violet` 8,4:1; sobre `violet-deep` 11,2:1; `violet` sobre `ink` 2,3:1 (por eso el borde). Los demás botones de WhatsApp (Servicios, Por qué, Contacto, flotante) siguen en verde.
- Hero: el título queda en dos líneas: "Automatizamos" fijo y, debajo, la frase completa rota junta ("tus sistemas.", "tus redes.", "tus consultas.", "tus procesos.", "tus tareas."). Frases en `sections.hero.titleWords` (`site.ts`).

## Navbar: "Nosotros" en lugar de "Fundador" (2026-10-22)
- El enlace del menú pasa a "Nosotros" y apunta a Por qué KAPLA (`#por-que`, "Somos KAPLA."). Sigue resaltado también mientras se ve la sección del fundador (`also` en `navLinks`). La sección Fundador se mueve justo después de Por qué para que "Nosotros" sea un bloque continuo; Proceso va después.
