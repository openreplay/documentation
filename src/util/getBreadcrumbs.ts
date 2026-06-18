import type { AstroGlobal } from 'astro';
import { getNav } from '~/i18n/util';
import {
	getLanguageFromURL,
	getVersionFromURL,
	removeLeadingSlash,
	removeTrailingSlash,
} from '~/util';
import type { NavItem } from '~/i18n/en/nav';

export interface Crumb {
	text: string;
	href?: string;
}

const asText = (text: NavItem['text']): string =>
	typeof text === 'string' ? text : text.en;

/**
 * Build the breadcrumb trail for the current page by walking the localized nav
 * tree (src/i18n/en/nav.ts) and collecting the chain of ancestor labels that
 * lead to the node whose slug matches the current page. Always prefixed by
 * "Docs". Used by the glow hero — derived from nav position, not hardcoded.
 */
export async function getBreadcrumbs(Astro: Readonly<AstroGlobal>): Promise<Crumb[]> {
	const lang = getLanguageFromURL(Astro.url.pathname) || 'en';
	const version = getVersionFromURL(Astro.url.pathname);
	const urlVersion = version ? `v${version}/` : '';
	const prefix = `/${lang}/${urlVersion}`;

	// Current page slug with lang + version prefix stripped.
	let current = removeTrailingSlash(removeLeadingSlash(Astro.url.pathname));
	current = current.replace(new RegExp(`^${lang}/`), '').replace(urlVersion, '');
	current = removeTrailingSlash(current);

	const nav = await getNav(Astro);
	const roots = nav?.children ?? [];

	const normalize = (slug: string) => removeTrailingSlash(removeLeadingSlash(slug));

	const find = (nodes: NavItem[], trail: NavItem[]): NavItem[] | null => {
		for (const node of nodes) {
			const nextTrail = [...trail, node];
			if (node.slug && normalize(node.slug) === current) return nextTrail;
			if (node.children?.length) {
				const found = find(node.children, nextTrail);
				if (found) return found;
			}
		}
		return null;
	};

	const path = find(roots, []) ?? [];

	const crumbs: Crumb[] = [{ text: 'Docs', href: `${prefix}home` }];
	for (const node of path) {
		// Skip pure section titles that carry no destination and duplicate the trail.
		if (node.isSectionTitle && !node.slug) continue;
		crumbs.push({
			text: asText(node.text),
			href: node.slug ? `${prefix}${node.slug}` : undefined,
		});
	}
	return crumbs;
}
