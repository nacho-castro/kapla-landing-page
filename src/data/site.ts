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
};

export const navLinks: NavLink[] = [
  { label: 'Trabajo', href: '#trabajo' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
];

export const navCta: NavLink = { label: 'Auditoría gratis', href: '#contacto' };

// TODO-CONTENIDO: real profile URLs.
export const socialLinks: SocialLink[] = [
  { name: 'instagram', label: 'Instagram', href: null },
  { name: 'linkedin', label: 'LinkedIn', href: null },
  { name: 'tiktok', label: 'TikTok', href: null },
];

export const sections = {
  // TODO-CONTENIDO: final hero title (step 2).
  hero: { id: 'inicio', title: 'KAPLA' },
  work: { id: 'trabajo', title: 'Trabajo' },
  why: { id: 'por-que', title: 'Por qué KAPLA' },
  process: { id: 'proceso', title: 'Proceso' },
  contact: { id: 'contacto', title: 'Contacto' },
} satisfies Record<string, SectionInfo>;

export const privacyAnchor = '#privacidad';
