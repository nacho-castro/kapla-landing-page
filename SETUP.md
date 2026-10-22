# SETUP: cómo manejar la landing de KAPLA

Guía para vos, dueño del proyecto. No hace falta ser experto. Seguí los pasos en orden.

## 1. Requisitos previos

1. Instalá **Node.js** (versión LTS) desde https://nodejs.org. Verificá en una terminal: `node -v` (tiene que mostrar un número de versión).
2. Instalá **Git** desde https://git-scm.com. Verificá: `git --version`.
3. En la carpeta del proyecto, corré una sola vez: `npm install`.

## 2. Correr el sitio en tu computadora y verlo en el celular

1. En la carpeta del proyecto: `npm run dev`.
2. Abrí http://localhost:4321 en el navegador.
3. Para verlo en el celular: conectá el celular a la misma red WiFi, corré `npm run dev -- --host` y abrí en el celular la dirección "Network" que muestra la terminal (algo como `http://192.168.x.x:4321`).
4. En desarrollo ves cuadros punteados que dicen "Pendiente": son el contenido que falta. En el sitio publicado no aparecen.

## 3. Contenido pendiente (TODO-CONTENIDO)

Buscá `TODO-CONTENIDO` en el código para ver todos. Resumen:

| Qué | Dónde | Qué hacer |
|---|---|---|
| Capturas de proyectos | `src/assets/projects/` | Reemplazar `miclase-desktop.png` y `jorgelina-pmp-desktop.png` por capturas de **página completa** (mismo nombre). Opcional: sumar `miclase-mobile.png` y `jorgelina-pmp-mobile.png` y aparece el botón Computadora/Celular. |
| Texto del fundador | `src/data/site.ts` > `founder.bio` | Escribir 2 o 3 párrafos en primera persona. Mientras esté vacío, la sección Fundador y su enlace del menú no aparecen. |
| Foto del fundador | `src/assets/founder.jpg` | Foto cuadrada, de al menos 640 px (jpg, png o webp). |
| Respuestas de FAQ | `src/data/site.ts` > `faq` | Reemplazar los `answer: null` por la respuesta real. No poner precios ni plazos si no son reales. |
| Alcance de la gestión de redes | `src/data/site.ts` > `services` | Definir qué incluye (plataformas, frecuencia). |
| Línea de apoyo del hero | `src/data/site.ts` > `sections.hero.support` | Aprobar o cambiar el texto propuesto. |
| Textos de Servicios | `src/data/site.ts` > `services` | Aprobar o cambiar las descripciones propuestas. |
| Meta description | `src/data/site.ts` > `site.description` | Aprobar o cambiar el texto propuesto. |
| Imagen para compartir | `public/` y `site.ogImage` en `site.ts` | Imagen de 1200x630 px; poner la ruta, por ejemplo `'/og-image.png'`. |
| Logo | `src/components/Logo.astro` | Hoy es el texto "KAPLA". |
| Favicon | `public/favicon.svg` | Reemplazar por el definitivo. |
| Opiniones de clientes | `src/data/site.ts` > `testimonials` | Solo opiniones reales y con permiso. Mientras esté vacío, la sección no aparece. |
| Alcance del Mantenimiento | `src/data/site.ts` > `processSteps` | Confirmar qué incluye. |
| Revisión legal | `src/pages/privacidad.astro` | Que un abogado revise el aviso de privacidad. |

Para agregar un proyecto nuevo: sumá un bloque en `projects` (`src/data/site.ts`) y la captura en `src/assets/projects/<id>-desktop.png`. No hay que tocar componentes.

## 4. WhatsApp (contacto)

El sitio no tiene formulario: el contacto es por WhatsApp y email.

1. El número está en `src/data/site.ts` > `site.whatsapp` (formato internacional, solo dígitos, por ejemplo `5491126944636`).
2. El mensaje precargado está en `whatsappUrl` (mismo archivo). Se define una sola vez y lo usan todos los botones.
3. Probá: abrí el sitio, tocá "Quiero una auditoría" y verificá que se abra WhatsApp con el mensaje escrito.
4. Si tenés un archivo `.env` de la versión anterior con `PUBLIC_FORMSPREE_ID`, ya no se usa: podés borrar esa línea.

## 5. Variables de entorno

Hoy el sitio **no necesita ninguna**. Si en el futuro se suma alguna, se documenta acá (nombre, para qué sirve, dónde se obtiene), sin valores reales.

| Nombre | Para qué sirve | Dónde se obtiene |
|---|---|---|
| (ninguna) | | |

## 6. Build y Lighthouse

1. `npm run build` genera el sitio en la carpeta `dist/`.
2. `npm run preview` lo sirve en http://localhost:4321.
3. Abrí esa dirección en Chrome, abrí las herramientas de desarrollo (F12), pestaña **Lighthouse**, elegí **Mobile** y tocá "Analyze". Objetivo: 95 o más en las cuatro categorías.
4. Chequeo de tipos: `npx astro check` (tiene que decir 0 errores).

## 7. Publicar en Vercel y conectar el dominio

1. Subí el proyecto a un repositorio de GitHub.
2. En https://vercel.com creá una cuenta, elegí "Add New Project" e importá el repositorio. Vercel detecta Astro solo; no cambies nada y tocá "Deploy".
3. Los headers de seguridad ya están en `vercel.json`; Vercel los aplica solo.
4. Dominio: en Vercel, Project > Settings > Domains, agregá `kaplatech.com.ar` y `www.kaplatech.com.ar`. Marcá `www` para que redirija al dominio sin www (coincide con la URL canónica).
5. En tu proveedor del dominio (NIC Argentina o donde lo tengas), configurá los DNS que te indica Vercel (registro A para el dominio y CNAME para `www`). Puede tardar hasta 24 horas.
6. Verificá que `https://kaplatech.com.ar` cargue con candado (HTTPS).

## 8. Checklist antes de lanzar

- [ ] Todos los botones de WhatsApp abren el chat con el mensaje.
- [ ] El email del footer y del contacto es el correcto.
- [ ] Los enlaces de Instagram, LinkedIn y TikTok abren los perfiles.
- [ ] "Ver en vivo" de cada proyecto abre el sitio correcto en pestaña nueva.
- [ ] Capturas de proyectos de página completa cargadas.
- [ ] Textos pendientes resueltos (sección 3).
- [ ] Se ve bien en el celular (menú, pestañas de proyectos, FAQ).
- [ ] Lighthouse móvil de 95 o más.
- [ ] Imagen para compartir cargada. Probá el enlace en WhatsApp y LinkedIn.
- [ ] Aviso de privacidad revisado.
- [ ] Verificaste la licencia de General Sans en https://www.fontshare.com/terms.

## 9. Problemas comunes

- **`npm` no se reconoce:** reinstalá Node.js y abrí una terminal nueva.
- **El puerto 4321 está ocupado:** cerrá la otra terminal con `npm run dev` o corré `npm run dev -- --port 4322`.
- **Cambié un texto y no se ve:** guardá el archivo y recargá. Si sigue igual, frená el servidor (Ctrl+C) y volvé a correr `npm run dev`.
- **Una captura de proyecto no aparece:** revisá que el nombre sea exacto (`<id>-desktop.png`) y esté en `src/assets/projects/`.
- **El build falla:** corré `npx astro check` y leé el primer error; suele indicar el archivo y la línea.
- **El menú no resalta la sección:** solo funciona con JavaScript activado; sin JavaScript los enlaces igual navegan.

## 10. Reglas de seguridad para vos

- No compartas ni subas a GitHub archivos `.env`. Si algún día hay claves, van en las variables de entorno de Vercel.
- No pegues contraseñas, tokens ni claves en el código ni en chats.
- Si una clave se filtra: generá una nueva en el servicio que la emitió, reemplazala en Vercel (Settings > Environment Variables), volvé a desplegar y revocá la anterior.
- Activá la verificación en dos pasos en GitHub, Vercel y tu proveedor de dominio.
- No agregues scripts de terceros (analítica, chats, pixels) sin revisarlo: rompen la política de seguridad y la privacidad del sitio.
