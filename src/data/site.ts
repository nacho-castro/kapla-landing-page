// Editable site content. Components read from here; change text and links in this file.

export interface NavLink {
  label: string;
  href: `#${string}`;
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
}

export const site = {
  name: 'KAPLA',
  // TODO-CONTENIDO: final meta description (step 5, SEO).
  description:
    'KAPLA diseña e implementa automatización de procesos e inteligencia artificial a medida para PyMEs.',
  // TODO-CONTENIDO: contact email.
  email: null as string | null,
  // TODO-CONTENIDO: WhatsApp number in international format, e.g. 5491100000000.
  whatsapp: null as string | null,
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

export const navCta: NavLink = { label: 'Auditoría gratis', href: '#contacto' };

// TODO-CONTENIDO: TikTok profile URL.
export const socialLinks: SocialLink[] = [
  { name: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/kapla.tech/' },
  { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/kaplatech' },
  { name: 'tiktok', label: 'TikTok', href: null },
];

export const sections = {
  hero: {
    id: 'inicio',
    title: 'Automatizamos los procesos de tu PyME e implementamos inteligencia artificial a medida',
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
    'Diseñamos e implementamos sistemas de automatización de procesos e inteligencia artificial a medida para pequeñas y medianas empresas de Latinoamérica.',
    'Transformamos la forma en que trabajan nuestros clientes: automatizamos lo repetitivo, optimizamos lo complejo y liberamos tiempo valioso para que se enfoquen en crecer.',
    'Trabajamos con PyMEs de todos los rubros: comercio, servicios, manufactura, consultoría. Cada solución es única, diseñada para los desafíos específicos de tu negocio.',
    'El objetivo: menos tareas repetitivas, menos errores y más tiempo para tu negocio.',
  ],
  cta: { label: 'Quiero una auditoría', href: '#contacto' } satisfies NavLink,
};

export type ProcessIcon = 'audit' | 'design' | 'build' | 'maintain';

export interface ProcessStep {
  icon: ProcessIcon;
  title: string;
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
