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

## Pendiente (próximos pasos)
- Paso 2: Hero final y sección Trabajo con MiClase.
- Paso 3: Por qué KAPLA (opcional) y Proceso.
- Paso 4: Contacto con formulario seguro (definir el servicio antes).
- Paso 5: SEO completo (Open Graph, sitemap, robots, canonical, datos estructurados), headers de seguridad, Lighthouse.

## TODO-CONTENIDO (datos que faltan)
| Dónde | Qué falta |
|---|---|
| `astro.config.mjs` | Dominio final (`site`) |
| `src/data/site.ts` | Email de contacto |
| `src/data/site.ts` | Número de WhatsApp |
| `src/data/site.ts` | URLs de Instagram, LinkedIn y TikTok |
| `src/data/site.ts` | Meta description final |
| `src/components/Logo.astro` | Logo definitivo (hoy es texto "KAPLA") |
| `public/favicon.svg` | Favicon definitivo |
| `src/components/Hero.astro` | Título, subtítulo y botones |
| `src/components/Work.astro` | Caso MiClase: descripción, capturas, enlace, estado |
| `src/components/Why.astro` | Problemas y soluciones (sección opcional) |
| `src/components/Process.astro` | Pasos del proceso |
| `src/components/Contact.astro` | Formulario, WhatsApp y aviso de privacidad |
