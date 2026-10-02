import type { CtaLink } from '../data/site';

/** Extra attributes for links that leave the site: new tab and no referrer/opener. */
export function externalAttrs(link: CtaLink) {
  return link.external
    ? { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${link.label} (se abre en una pestaña nueva)` }
    : {};
}
