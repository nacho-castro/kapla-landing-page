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
3. **Seguridad y privacidad**: formulario protegido, sin secretos expuestos, sin trackers innecesarios.

Menos secciones y más claras. No agregar nada fuera del alcance.

## Stack [DECISIÓN]
- **Astro** (salida 100% estática) + **Tailwind CSS** + TypeScript estricto.
- JavaScript mínimo: solo para el menú móvil y el envío del formulario. Sin frameworks de UI (React, Vue) salvo que lo apruebe.
- Fuente: **una sola familia sans-serif, autoalojada** (sin pedir fuentes a servidores externos).
- Íconos de interfaz: **SVG inline** (estilo de trazo uniforme). Íconos de redes (Instagram, LinkedIn, TikTok): SVG inline.
- Imágenes: formatos modernos (WebP/AVIF), con `width` y `height`, `loading="lazy"` excepto la del hero. Usar el componente de imágenes de Astro.
- Hosting: Vercel (o Cloudflare Pages / Netlify). Sitio estático.
- Formulario de contacto: **servicio de formularios de terceros** (ej. Formspree) o una función serverless. Decidir con el dueño antes de implementar.

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
1. **Navbar**: horizontal y fija. Logo a la izquierda; a la derecha: *Trabajo*, *Proceso*,
   *Contacto* y un botón destacado **"Auditoría gratis"**. En móvil, menú hamburguesa accesible.
2. **Home (hero)**: título grande que describe el negocio, subtítulo de una o dos líneas y
   dos botones: principal ("Quiero una auditoría") y secundario ("Ver trabajo").
3. **Trabajo**: caso destacado **MiClase** (SaaS propio): qué es, para quién, capturas,
   enlace y estado real (ver reglas de contenido). Los casos extra se agregan acá
   **cuando existan**; no se muestran secciones vacías.
4. **Por qué KAPLA** (opcional, corta): 3 o 4 problemas del cliente y cómo se resuelven.
5. **Proceso**: 3 o 4 pasos numerados (ej. Auditoría, Propuesta, Implementación, Soporte).
6. **Contacto / Auditoría**: formulario corto (nombre, email, mensaje opcional) y botón de WhatsApp.
7. **Footer**: logo, email, redes (Instagram, LinkedIn, TikTok) con íconos, aviso de privacidad y © año.

## Reglas de contenido (honestidad)
- **Nunca inventar** testimonios, métricas, clientes, logos, casos ni números de usuarios.
- Todo dato pendiente se marca en el código con el comentario `TODO-CONTENIDO:` y un
  texto de ejemplo visible solo en desarrollo. Al final, listar todos los pendientes.
- Estados honestos: MiClase se muestra como **"En desarrollo"** o **"Próximamente"** hasta que
  esté en producción con usuarios reales.
- Los testimonios solo se publican si son reales y hay permiso de la persona.

## Diseño visual
Estilo: **minimalista, ordenado y profesional.**
- Mucho espacio en blanco, jerarquía tipográfica clara, secciones que alternan fondo claro y oscuro.
- Paleta (definir como variables CSS / tokens de Tailwind en un solo lugar):
  - Azul de marca: `#001178`
  - Negro / casi negro para secciones oscuras
  - Blanco
  - Gris neutro para textos secundarios
  - Una versión **más clara** del azul de marca para acentos y enlaces sobre fondo oscuro
- **Contraste**: `#001178` funciona con texto blanco y sobre fondo blanco, pero **no se usa sobre
  negro** (contraste insuficiente). Verificar contraste mínimo WCAG AA en todos los textos.
- Un solo botón primario por bloque. Sin gradientes llamativos, sombras fuertes ni animaciones
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
- Formulario: validación **en el servidor o servicio** (no solo en el cliente), campo trampa
  (honeypot) anti-spam, límite de envíos, mensajes de error sin detalles internos, y no mostrar
  en pantalla texto del usuario sin escaparlo. Considerar un captcha sin fricción (ej. Cloudflare Turnstile) si hay spam.
- Headers de seguridad configurados en el hosting: `Content-Security-Policy`, `X-Content-Type-Options`,
  `Referrer-Policy`, `X-Frame-Options` (o `frame-ancestors`) y HTTPS obligatorio.
- Datos personales de contacto (Ley 25.326, Argentina): incluir un **aviso de privacidad** simple
  junto al formulario y enlazado en el footer; informar para qué se usan los datos.
- Sin cookies ni rastreadores por defecto (evita banners de consentimiento). Si se suma analítica,
  que sea sin cookies y previa consulta.
- Nunca ejecutar comandos destructivos (`rm -rf`, `git push --force`, etc.) sin mi confirmación.

## Fuera de alcance
Blog, CMS, múltiples idiomas, login, carrito o pagos, chatbot, animaciones pesadas,
banners de cookies, panel de administración.

## Convenciones de código
- TypeScript estricto, sin `any`. Componentes pequeños y reutilizables (una sección = un componente).
- Contenido (textos, pasos, enlaces) separado de los componentes, en un archivo de datos, para editarlo fácil.
- **Sin dependencias nuevas sin consultarme antes.**
- Commits pequeños y descriptivos, en inglés.

## Estructura
- `src/pages/index.astro`: la página
- `src/components/`: Navbar, Hero, Work, Why, Process, Contact, Footer
- `src/content/` o `src/data/`: textos y datos editables
- `src/styles/`: tokens y estilos globales
- `public/`: favicon, imágenes de Open Graph, `robots.txt`

## Orden de construcción
1. Esqueleto: proyecto Astro + Tailwind + tokens de diseño + layout + navbar y footer.
2. Hero y sección Trabajo (con MiClase).
3. Por qué / Proceso.
4. Contacto con formulario seguro (definir antes el servicio con el dueño).
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
4. Cómo configurar el **formulario** (crear cuenta en el servicio, dónde pegar el identificador, probar el envío).
5. Tabla de variables de entorno (nombre, para qué sirve, dónde se obtiene). **Sin valores reales.**
6. Cómo hacer el build y medir con Lighthouse.
7. Cómo publicar (Vercel), conectar el dominio propio y configurar los DNS.
8. Checklist previo al lanzamiento (enlaces, formulario, móvil, SEO, imagen al compartir en WhatsApp/LinkedIn).
9. Solución de problemas comunes.
10. Reglas de seguridad para mí (qué claves no compartir y cómo rotarlas).

## Cómo trabajar conmigo
- Antes de tareas grandes, proponé un plan y esperá mi aprobación.
- Trabajá por pasos pequeños y verificá (build, tipos, vista en móvil) antes de seguir.
- Si algo es ambiguo o falta información del negocio, preguntá en vez de inventar.
- Explicá las decisiones importantes en términos simples.
- Ante un conflicto entre un adorno visual y las prioridades (claridad, performance, seguridad), ganan las prioridades.
