// Editable site content. Components read from here; change text and links in this file.

export interface NavLink {
  label: string;
  href: `#${string}`;
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
  { label: 'Trabajo', href: '#trabajo' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
];

export const navCta: CtaLink = { label: 'Auditoría gratis', href: auditUrl, external: true };

export const heroCtas = {
  primary: { label: 'Quiero una auditoría', href: auditUrl, external: true },
  secondary: { label: 'Ver trabajo', href: '#trabajo' },
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
  contact: { id: 'contacto', title: 'Contacto' },
} satisfies Record<string, SectionInfo>;

export const privacyAnchor = '#privacidad';

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
