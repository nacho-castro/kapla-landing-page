// Editable site content. Components read from here; change text and links in this file.

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

/** Booking page for the free audit. */
const auditUrl = 'https://calendly.com/ignaciocastroplanas';

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
}

export const site = {
  name: 'KAPLA',
  // TODO-CONTENIDO: final meta description (step 5, SEO).
  description:
    'KAPLA diseña e implementa automatización de procesos e inteligencia artificial a medida para PyMEs.',
  email: 'ignaciocastroplanas@gmail.com' as string | null,
  // International format, digits only (used in https://wa.me/<number>).
  whatsapp: '5491126944636' as string | null,
  // TODO-CONTENIDO: own share image (1200x630 PNG/JPG in public/, e.g. '/og-image.png'). Until then no og:image is emitted.
  ogImage: null as string | null,
  ogImageAlt: 'KAPLA: automatización de procesos e inteligencia artificial para PyMEs',
  locale: 'es_AR',
};

export const navLinks: NavLink[] = [
  { label: 'Trabajo', href: '/#trabajo' },
  { label: 'Proceso', href: '/#proceso' },
  { label: 'Contacto', href: '/#contacto' },
];

export const navCta: CtaLink = { label: 'Auditoría gratis', href: auditUrl, external: true };

export const heroCtas = {
  primary: { label: 'Quiero una auditoría', href: auditUrl, external: true },
  secondary: { label: 'Ver trabajo', href: '/#trabajo' },
} satisfies Record<string, CtaLink>;

export const socialLinks: SocialLink[] = [
  { name: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/kapla.tech/' },
  { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/kaplatech' },
  { name: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@kapla.tech' },
];

export const sections = {
  hero: {
    id: 'inicio',
    title: 'Automatizamos los procesos de tu PyME e implementamos inteligencia artificial a medida',
    subtitle: 'Tu negocio, completamente ordenado.',
  },
  work: { id: 'trabajo', title: 'Trabajo' },
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

export type ProcessIcon = 'audit' | 'design' | 'build' | 'maintain';

export interface ProcessStep {
  icon: ProcessIcon;
  title: string;
  subtitle?: string;
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

export interface WorkCase {
  name: string;
  /** Honest status label, e.g. 'En desarrollo'. */
  status?: string;
  tagline: string;
  description?: string;
  features: string[];
  link?: CtaLink;
}

export const featuredCase: WorkCase = {
  name: 'MiClase',
  status: 'En desarrollo',
  tagline: 'Gestor completo para profesores particulares.',
  description:
    'Alumnos, calendario, asistencia y cobros en un solo lugar. Para profesores de idiomas, música, arte, matemática y más.',
  features: [
    'Alumnos organizados por grupo',
    'Clases únicas o recurrentes, en vista semanal o mensual',
    'Asistencia y pagos: sabé quién te debe',
    'Funciona desde el celular, con acceso por Google o email',
  ],
  // TODO-CONTENIDO: MiClase public URL when available.
};

export const otherCases: WorkCase[] = [
  {
    name: 'Jorgelina PMP',
    tagline: 'Sitio web profesional.',
    // TODO-CONTENIDO: one-line description of the Jorgelina PMP project (who it is for, what was done).
    features: [],
    link: { label: 'Ver sitio', href: 'https://jorgelinapmp.com.ar/', external: true },
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
