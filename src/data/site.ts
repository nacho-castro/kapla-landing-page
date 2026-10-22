// Editable site content. Components read from here; change text and links in this file.
import type { ImageMetadata } from 'astro';

export interface NavLink {
  label: string;
  /** Starts with '/#' so it also works from other pages (e.g. /privacidad). */
  href: `/#${string}`;
}

/** Call to action; external links open in a new tab. */
export interface CtaLink {
  label: string;
  href: string;
  external?: boolean;
}

export type SocialName = 'instagram' | 'linkedin' | 'tiktok';

export interface SocialLink {
  name: SocialName;
  label: string;
  /** null until the real profile exists. */
  href: string | null;
}

export interface SectionInfo {
  id: string;
  title: string;
  subtitle?: string;
  /** Short supporting line (hero only). */
  support?: string;
}

export const site = {
  name: 'KAPLA',
  // TODO-CONTENIDO: final meta description (step 5, SEO).
  description:
    'KAPLA diseña e implementa automatización de procesos e inteligencia artificial a medida para PyMEs.',
  email: 'kaplatech.ar@gmail.com' as string | null,
  // International format, digits only (used in https://wa.me/<number>).
  whatsapp: '5491126944636',
  // TODO-CONTENIDO: own share image (1200x630 PNG/JPG in public/, e.g. '/og-image.png'). Until then no og:image is emitted.
  ogImage: null as string | null,
  ogImageAlt: 'KAPLA: automatización de procesos e inteligencia artificial para PyMEs',
  locale: 'es_AR',
};

/** The only WhatsApp link of the site: every audit call to action uses it. */
export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  'Hola, quiero una auditoría gratis para mi negocio.',
)}`;

export const navLinks: NavLink[] = [
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Proyectos', href: '/#proyectos' },
  { label: 'Fundador', href: '/#fundador' },
  { label: 'FAQ', href: '/#faq' },
];

export const navCta: CtaLink = { label: 'Auditoría gratis', href: whatsappUrl, external: true };

export const heroCtas = {
  primary: { label: 'Quiero una auditoría', href: whatsappUrl, external: true },
  secondary: { label: 'Ver trabajo', href: '/#proyectos' },
} satisfies Record<string, CtaLink>;

export const socialLinks: SocialLink[] = [
  { name: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/kapla.tech/' },
  { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/kaplatech' },
  { name: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@kapla.tech' },
];

export const sections = {
  hero: {
    id: 'inicio',
    title: 'Automatizamos tus sistemas.',
    subtitle: 'Tu negocio, completamente ordenado.',
    // Proposed copy, pending owner approval.
    support: 'Inteligencia artificial, páginas web, CRMs y redes sociales, para que tu negocio funcione sin tareas repetitivas.',
  },
  services: { id: 'servicios', title: 'Servicios', subtitle: 'Cuatro formas de ordenar y automatizar tu negocio.' },
  projects: { id: 'proyectos', title: 'Proyectos', subtitle: 'Sistemas y sitios que ya están funcionando.' },
  why: { id: 'por-que', title: 'Por qué KAPLA' },
  process: { id: 'proceso', title: 'Proceso' },
  testimonials: { id: 'opiniones', title: 'Lo que dicen nuestros clientes' },
  contact: { id: 'contacto', title: 'Contacto' },
} satisfies Record<string, SectionInfo>;

export const privacyUrl = '/privacidad';

/** Formspree form id: public by design (set PUBLIC_FORMSPREE_ID, see .env.example). */
// Accepts the bare id or the full endpoint URL (https://formspree.io/f/<id>).
const rawFormspree = (import.meta.env.PUBLIC_FORMSPREE_ID ?? '').trim();
export const formspreeId: string | null =
  rawFormspree.split('/').filter(Boolean).pop()?.replace(/[^A-Za-z0-9]/g, '') || null;

export const contact = {
  intro: 'Contanos en pocas líneas qué querés mejorar en tu negocio. Te respondemos por email.',
  whatsappLabel: 'Escribinos por WhatsApp',
  submitLabel: 'Enviar',
  sendingLabel: 'Enviando...',
  successMessage: 'Gracias, recibimos tu mensaje. Te respondemos pronto.',
  errorMessage: 'No pudimos enviar el mensaje. Probá de nuevo o escribinos por WhatsApp.',
  privacyNote: 'Usamos tus datos solo para responder tu consulta.',
};

export const why = {
  lead: 'Somos KAPLA.',
  paragraphs: [
    'Diseñamos e implementamos sistemas de automatización de procesos e inteligencia artificial a medida para pequeñas y medianas empresas.',
    'Te ayudamos a cambiar la forma en que trabaja tu equipo: automatizamos lo repetitivo, ordenamos lo complejo y liberamos tiempo para que te enfoques en crecer.',
    'Trabajamos con PyMEs de cualquier rubro. Cada solución se diseña para los desafíos específicos de tu negocio.',
    'El objetivo: menos tareas repetitivas, menos errores y más tiempo para tu negocio.',
  ],
  cta: heroCtas.primary satisfies CtaLink,
};

export type ServiceIcon = 'ai' | 'web' | 'crm' | 'social';

export interface Service {
  icon: ServiceIcon;
  title: string;
  text: string;
  /** Dev-only note shown while some detail is pending. */
  todo?: string;
}

// Proposed copy, pending owner approval. No prices: they are discussed on WhatsApp.
export const services: Service[] = [
  {
    icon: 'ai',
    title: 'Automatización con IA',
    text: 'Dejamos que la inteligencia artificial se ocupe de lo repetitivo: responder consultas, ordenar datos y armar informes.',
  },
  {
    icon: 'web',
    title: 'Páginas web',
    text: 'Sitios claros y rápidos que explican qué hacés y hacen fácil que te contacten.',
  },
  {
    icon: 'crm',
    title: 'CRM a medida',
    text: 'Un sistema para seguir a tus clientes y consultas en un solo lugar, armado según cómo trabajás.',
  },
  {
    icon: 'social',
    title: 'Gestión de redes',
    text: 'Nos encargamos de gestionar y publicar tus redes. No grabamos ni producimos el contenido.',
    todo: 'Alcance exacto de la gestión de redes (qué incluye, frecuencia, plataformas).',
  },
];

export type ProcessIcon = 'audit' | 'design' | 'build' | 'maintain';

export interface ProcessStep {
  icon: ProcessIcon;
  title: string;
  subtitle?: string;
  /** Short supporting line (hero only). */
  support?: string;
  text: string;
}

export const processSteps: ProcessStep[] = [
  {
    icon: 'audit',
    title: 'Auditoría',
    text: 'Revisamos cómo trabaja hoy tu equipo y detectamos qué tareas consumen más tiempo o generan errores.',
  },
  {
    icon: 'design',
    title: 'Diseño',
    text: 'Definimos juntos qué se automatiza, con qué herramientas y dónde suma la inteligencia artificial.',
  },
  {
    icon: 'build',
    title: 'Implementación',
    text: 'Ponemos el sistema en marcha y lo conectamos con lo que ya usás, sin frenar tu operación.',
  },
  {
    icon: 'maintain',
    title: 'Mantenimiento',
    // TODO-CONTENIDO: confirm maintenance scope (included period, paid plan, etc.).
    text: 'Revisamos que todo siga funcionando bien y hacemos los ajustes que hagan falta.',
  },
];

export interface ProjectShot {
  src: ImageMetadata;
  alt: string;
}

export interface Project {
  id: string;
  name: string;
  /** Industry or kind of project, shown in the tab. */
  sector: string;
  /** Honest status label, e.g. 'En producción'. */
  status?: string;
  description: string;
  features: string[];
  url: string;
  /** Domain shown in the browser frame. */
  domain: string;
  /** Full-page screenshots. Drop files named `<id>-desktop` / `<id>-mobile` in src/assets/projects/. */
  desktop?: ProjectShot | undefined;
  mobile?: ProjectShot | undefined;
}

const shotFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/projects/*.{png,jpg,jpeg,webp}', {
  eager: true,
});

function shot(id: string, kind: 'desktop' | 'mobile', alt: string): ProjectShot | undefined {
  const pattern = new RegExp(`/${id}-${kind}\\.(png|jpe?g|webp)$`);
  const match = Object.entries(shotFiles).find(([path]) => pattern.test(path));
  return match ? { src: match[1].default, alt } : undefined;
}

// TODO-CONTENIDO: replace the files in src/assets/projects/ with full-page screenshots
// (desktop, and optionally `-mobile`). The current desktop files are provisional, not full-page.
// To add a project, add an entry here: no component changes needed.
export const projects: Project[] = [
  {
    id: 'miclase',
    name: 'MiClase',
    sector: 'Gestor para profesores particulares',
    status: 'En producción',
    description:
      'Alumnos, calendario, asistencia y cobros en un solo lugar. Para profesores de idiomas, música, arte, matemática y más.',
    features: [
      'Alumnos organizados por grupo',
      'Clases únicas o recurrentes, en vista semanal o mensual',
      'Asistencia y pagos: sabé quién te debe',
      'Funciona desde el celular, con acceso por Google o email',
    ],
    url: 'https://miclase.net.ar/',
    domain: 'miclase.net.ar',
    desktop: shot('miclase', 'desktop', 'Página de MiClase: qué es, para quién y cómo se usa.'),
    mobile: shot('miclase', 'mobile', 'Página de MiClase en el celular.'),
  },
  {
    id: 'jorgelina-pmp',
    name: 'Jorgelina PMP',
    sector: 'Sitio web de artista',
    description: 'Sitio web para mostrar obras y presentar a la artista.',
    features: [],
    url: 'https://jorgelinapmp.com.ar/',
    domain: 'jorgelinapmp.com.ar',
    desktop: shot('jorgelina-pmp', 'desktop', 'Página de Jorgelina PMP: obras y retrato de la artista.'),
    mobile: shot('jorgelina-pmp', 'mobile', 'Sitio de Jorgelina PMP en el celular.'),
  },
];

export interface Testimonial {
  /** Person's name, and company if any (e.g. 'Ana López, Estudio López'). */
  name: string;
  /** Industry or profession (e.g. 'Contadora'). */
  role: string;
  quote: string;
}

// Only real testimonials, published with the person's permission.
// While this list is empty the section is not shown in production.
// TODO-CONTENIDO: add real testimonials (name/company, industry/profession, comment).
export const testimonials: Testimonial[] = [];

/** Dev-only placeholders to preview the layout. Never rendered in production. */
export const sampleTestimonials: Testimonial[] = [
  { name: 'Nombre Apellido, Empresa', role: 'Rubro o profesión', quote: 'Comentario de ejemplo. Acá va la opinión real del cliente, en dos o tres líneas.' },
  { name: 'Nombre Apellido, Empresa', role: 'Rubro o profesión', quote: 'Comentario de ejemplo un poco más largo, para ver cómo se acomoda la tarjeta cuando el texto ocupa varias líneas en el celular.' },
  { name: 'Nombre Apellido', role: 'Rubro o profesión', quote: 'Comentario de ejemplo corto.' },
  { name: 'Nombre Apellido, Empresa', role: 'Rubro o profesión', quote: 'Comentario de ejemplo. Con cuatro o más opiniones la fila se desliza hacia el costado.' },
];
