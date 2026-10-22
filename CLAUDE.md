# Proyecto: Landing web de KAPLA

Sitio web **estático de una sola página** para **KAPLA**, una empresa que diseña e
implementa **sistemas de automatización de procesos y soluciones de inteligencia artificial
a medida para PyMEs** (pequeñas y medianas empresas).

Logo: todavía no existe. Usar temporalmente un **logotipo de texto "KAPLA"** (tipografía de la
marca, en un componente `Logo` único y reemplazable) hasta que haya un logo definitivo.
Objetivo único: que un visitante entienda en segundos qué hace KAPLA, vea prueba real
de su trabajo y **pida una auditoría** (contacto).

Inspiración de estructura: sitios de consultoras de automatización. Se toma la
**estructura**, no el texto ni el diseño: todo el contenido, las imágenes y la
identidad visual deben ser **propios y originales**. No copiar frases de otras webs.

## Prioridades (en este orden, ante cualquier duda)
1. **Claridad del mensaje y usabilidad**: se entiende en 5 segundos, se navega sin pensar.
2. **Performance**: carga casi instantánea, también en celular con datos móviles.
3. **Seguridad y privacidad**: sin secretos expuestos, sin trackers innecesarios.

Menos secciones y más claras. No agregar nada fuera del alcance.

## Stack [DECISIÓN]
- **Astro** (salida 100% estática) + **Tailwind CSS** + TypeScript estricto.
- JavaScript mínimo: solo para el menú móvil, las pestañas de proyectos y el resaltado de sección activa. Sin frameworks de UI (React, Vue) salvo que lo apruebe.
- Fuente: **General Sans** (Fontshare), una sola familia, **autoalojada** en `public/fonts/` (Regular, Medium, Semibold; precarga del archivo principal; sin pedir fuentes a servidores externos).
- Íconos de interfaz: **SVG inline** (estilo de trazo uniforme). Íconos de redes (Instagram, LinkedIn, TikTok): SVG inline.
- Imágenes: formatos modernos (WebP/AVIF), con `width` y `height`, `loading="lazy"` excepto la del hero. Usar el componente de imágenes de Astro.
- Hosting: Vercel (o Cloudflare Pages / Netlify). Sitio estático.
- Contacto: **solo WhatsApp** (enlace único `wa.me` con mensaje precargado, definido una vez en `src/data/site.ts`). No hay formulario ni servicio de formularios.

## Comandos
- Instalar: `npm install`
- Desarrollo: `npm run dev`
- Build: `npm run build`
- Vista previa del build: `npm run preview`
- Chequeo de tipos: `npx astro check`

## Idioma y tono
- Español, tono **cercano y directo, con voseo argentino** ("Escribinos", "Probá") [DECISIÓN].
- Frases cortas, sin jerga técnica, sin promesas exageradas ni superlativos vacíos.
- Texto del código y commits en inglés. `<html lang="es">`.
- **Sin emojis** en ningún lado: ni en la página, ni en el código, ni en los commits.

## Estructura de la página (una sola página con anclas)
1. **Navbar**: **píldora flotante** (no barra fija horizontal). Móvil: píldora a casi todo el ancho con logo y hamburguesa; el menú se despliega como panel debajo. Escritorio: logo a la izquierda, píldora centrada con *Servicios*, *Proyectos*, *Fundador*, *FAQ* y botón destacado **"Auditoría gratis"** (WhatsApp) a la derecha. Fondo oscuro semitransparente con blur, siempre legible. Se permite la animación de entrada (caída desde arriba, una vez, solo CSS) y el resaltado de la sección activa (IntersectionObserver, JS inline mínimo, `aria-current`).
2. **Home (hero)**: "Automatizamos tus sistemas." + subtítulo + una línea de apoyo, y dos botones: principal ("Quiero una auditoría", WhatsApp) y secundario ("Ver trabajo", `#proyectos`).
3. **Servicios** (`#servicios`): 4 tarjetas (Automatización con IA, Páginas web, CRM a medida, Gestión de redes). Sin precios.
4. **Proyectos** (`#proyectos`, antes "Trabajo"): selector tipo pestañas (MiClase, Jorgelina PMP, más a futuro) con captura de página completa dentro de un marco tipo navegador con scroll propio. Sin iframes. Datos en `site.ts`.
5. **Por qué KAPLA**: texto "Somos KAPLA." y CTA a WhatsApp.
6. **Proceso**: 4 pasos numerados.
7. **Fundador** (`#fundador`): foto, nombre, cargo y texto corto en primera persona.
8. **Opiniones**: solo se muestra si hay testimonios reales.
9. **FAQ** (`#faq`): acordeón nativo `<details>/<summary>`, sin JS.
10. **Contacto** (`#contacto`): título, una línea, botón verde "Escribinos por WhatsApp" y email como enlace secundario.
11. **Footer**: logo, email, redes (Instagram, LinkedIn, TikTok) con íconos, aviso de privacidad y © año. Botón flotante de WhatsApp en toda la página.

## Reglas de contenido (honestidad)
- **Nunca inventar** testimonios, métricas, clientes, logos, casos ni números de usuarios.
- Todo dato pendiente se marca en el código con el comentario `TODO-CONTENIDO:` y un
  texto de ejemplo visible solo en desarrollo. Al final, listar todos los pendientes.
- Estados honestos: Un proyecto se muestra como **"En desarrollo"** o **"Próximamente"** hasta que
  esté en producción con usuarios reales. MiClase: el dueño pidió no mostrar estado.
- Los testimonios solo se publican si son reales y hay permiso de la persona.

## Diseño visual
Estilo: **minimalista, ordenado y profesional.**
- Mucho espacio en blanco, jerarquía tipográfica clara. Todas las secciones van sobre el mismo fondo azul oscuro (`ink` con luces animadas); el dueño pidió no alternar con fondos blancos.
- Paleta (tokens en el bloque `@theme` de `src/styles/global.css`, un solo lugar):
  - `ink #00072D` (fondos más oscuros), `navy #051650`, `blue-deep #0A2472`, `brand #123499`
  - `soft #DDE1F5` (lavanda claro: fondos claros y texto sobre oscuro)
  - `accent #2A3FFF` (azul vivo, sobre fondo claro) y `accent-light #8F9BFF` (texto y enlaces sobre fondo oscuro)
  - `muted` y `muted-dark`: grises azulados para texto secundario
  - `whatsapp`: verde de WhatsApp, **solo** en los botones de WhatsApp (con texto `ink`, no blanco). Excepción pedida por el dueño: los botones de auditoría del navbar y del hero van en `violet #9D00FF` (hover `violet-deep #7A00C8`) con texto blanco.
- **Contraste**: verificar WCAG AA en todos los pares texto/fondo y documentarlos en `PROGRESS.md`. `brand` no se usa como texto sobre `ink` (1,85:1).
- Un solo botón primario por bloque. Sin gradientes llamativos (se permite un degradé sutil en header y hero), sombras fuertes ni animaciones
  que distraigan. Respetar `prefers-reduced-motion`.
- Responsive **mobile-first**; revisar en 360, 768 y 1280 px de ancho.
- Definir los tokens de diseño antes de construir las secciones y respetarlos siempre.

## Performance (objetivos)
- Lighthouse en móvil: **95 o más** en Rendimiento, Accesibilidad, Buenas prácticas y SEO.
- LCP menor a 2,5 s; CLS cercano a 0. Sin librerías pesadas, sin videos de fondo, sin carruseles.
- Cero scripts de terceros (analítica, chats, pixels) sin consultarme antes.
- Peso total de la página inicial lo más bajo posible; imágenes optimizadas.

## SEO y accesibilidad
- `<title>` y meta description claros, Open Graph y Twitter card con imagen propia,
  favicon, `sitemap.xml`, `robots.txt`, URL canónica y datos estructurados `Organization`.
- HTML semántico (`header`, `nav`, `main`, `section`, `footer`), un solo `h1`, jerarquía de títulos correcta.
- Texto alternativo en imágenes, foco visible, navegación completa por teclado, enlace "saltar al contenido".
- Enlaces externos con `rel="noopener noreferrer"`.

## Seguridad y privacidad (innegociable)
- **Ningún secreto en el código del navegador.** Claves y endpoints privados solo en variables de
  entorno del servidor o del servicio; mantener `.env.example` sin valores reales.
- Nunca leer, editar ni imprimir `.env` o `.env.local` (un hook lo bloquea).
- Sin formulario: el contacto es por WhatsApp y email, así no se reciben ni guardan datos en el sitio. Sin iframes ni pedidos a servidores externos.
- Headers de seguridad configurados en el hosting: `Content-Security-Policy`, `X-Content-Type-Options`,
  `Referrer-Policy`, `X-Frame-Options` (o `frame-ancestors`) y HTTPS obligatorio.
- Datos personales (Ley 25.326, Argentina): mantener un **aviso de privacidad** simple (`/privacidad`) enlazado en el footer; informar para qué se usan los datos.
- Sin cookies ni rastreadores por defecto (evita banners de consentimiento). Si se suma analítica,
  que sea sin cookies y previa consulta.
- Nunca ejecutar comandos destructivos (`rm -rf`, `git push --force`, etc.) sin mi confirmación.

## Fuera de alcance
Blog, CMS, múltiples idiomas, login, carrito o pagos, chatbot, animaciones pesadas,
banners de cookies, panel de administración, formulario de contacto, Calendly, precios visibles.

## Convenciones de código
- TypeScript estricto, sin `any`. Componentes pequeños y reutilizables (una sección = un componente).
- Contenido (textos, pasos, enlaces) separado de los componentes, en un archivo de datos, para editarlo fácil.
- **Sin dependencias nuevas sin consultarme antes.**
- Commits pequeños y descriptivos, en inglés.

## Estructura
- `src/pages/index.astro`: la página
- `src/components/`: Navbar, Hero, Services, Projects, Why, Process, Founder, FAQ, Contact, Footer
- `src/content/` o `src/data/`: textos y datos editables
- `src/styles/`: tokens y estilos globales
- `public/`: favicon, imágenes de Open Graph, `robots.txt`

## Orden de construcción
1. Esqueleto: proyecto Astro + Tailwind + tokens de diseño + layout + navbar y footer.
2. Hero, Servicios y sección Proyectos.
3. Por qué / Proceso.
4. Fundador, FAQ y Contacto por WhatsApp.
5. SEO, accesibilidad, headers de seguridad y performance (medir con Lighthouse).
6. Revisión final con el subagente `web-reviewer` y limpieza de pendientes.
7. Entregable final: `SETUP.md`.

Al cerrar cada paso: actualizar `PROGRESS.md` (hecho, pendiente, decisiones) y, si existe,
usar el subagente `web-reviewer`. Verificar visualmente en ancho móvil y de escritorio.

## Entregable final: SETUP.md
Al terminar, generar en la raíz un `SETUP.md` **solo para mí** (dueño del proyecto, no experto),
en español, con pasos numerados y verificables:
1. Requisitos previos (Node, Git) y cómo instalarlos.
2. Cómo correr el sitio en local y cómo ver el resultado en el celular.
3. **Lista de contenido pendiente**: dónde está cada `TODO-CONTENIDO` (archivo y qué reemplazar):
   título, textos, capturas, enlaces, redes, email, WhatsApp, logo, imagen para compartir.
4. Cómo cambiar el número de **WhatsApp** y el mensaje precargado, y cómo agregar las **capturas de proyectos**.
5. Variables de entorno (hoy no hay ninguna obligatoria). **Sin valores reales.**
6. Cómo hacer el build y medir con Lighthouse.
7. Cómo publicar (Vercel), conectar el dominio propio y configurar los DNS.
8. Checklist previo al lanzamiento (enlaces, WhatsApp, móvil, SEO, imagen al compartir en WhatsApp/LinkedIn).
9. Solución de problemas comunes.
10. Reglas de seguridad para mí (qué claves no compartir y cómo rotarlas).

## Cómo trabajar conmigo
- Antes de tareas grandes, proponé un plan y esperá mi aprobación.
- Trabajá por pasos pequeños y verificá (build, tipos, vista en móvil) antes de seguir.
- Si algo es ambiguo o falta información del negocio, preguntá en vez de inventar.
- Explicá las decisiones importantes en términos simples.
- Ante un conflicto entre un adorno visual y las prioridades (claridad, performance, seguridad), ganan las prioridades.
