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

## TODO-CONTENIDO (datos que faltan)
| Dónde | Qué falta |
|---|---|
| `src/data/site.ts` | Meta description final |
| `src/data/site.ts` + `public/` | Imagen para compartir (Open Graph, 1200x630) |
| `src/components/Logo.astro` | Logo definitivo (hoy es texto "KAPLA") |
| `public/favicon.svg` | Favicon definitivo |
| `src/components/Work.astro` | Caso MiClase: descripción, capturas, enlace, estado |
| `src/data/site.ts` | Alcance del paso Mantenimiento |
| `.env` / Vercel | `PUBLIC_FORMSPREE_ID` (id del formulario de Formspree) |
| `src/pages/privacidad.astro` | Revisión legal del aviso de privacidad |
| `src/data/site.ts` (`testimonials`) | Opiniones reales de clientes (nombre/empresa, rubro/profesión, comentario), con permiso |

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
