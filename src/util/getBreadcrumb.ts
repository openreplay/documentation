import { getLanguageFromURL, getVersionFromURL, removeLeadingSlash, removeTrailingSlash } from '../util';
import { localizeNav, type NavItem } from '../i18n/en/nav';

const norm = (s: string | null | undefined) => (s || '').replace(/\/$/, '');

/**
 * Derive the breadcrumb trail (e.g. ["Docs", "JavaScript", "Methods", "getSessionToken"])
 * for the current page by walking the localized nav tree. Navigable ancestors
 * (those with a real slug) are included; pure toggle groups (slug === null) are skipped,
 * matching the design.
 */
export function getBreadcrumb(pathname: string): string[] {
	const lang = getLanguageFromURL(pathname) || 'en';
	const version = getVersionFromURL(pathname);

	let slug = removeTrailingSlash(removeLeadingSlash(pathname));
	slug = slug.replace(new RegExp(`^${lang}(/|$)`), '');
	if (version) slug = slug.replace(`v${version}/`, '');
	const target = norm(slug);

	const nav = localizeNav(lang);
	const chain: string[] = [];

	const walk = (items: NavItem[] | undefined, acc: string[]): boolean => {
		if (!items) return false;
		for (const it of items) {
			if (it.isSectionTitle) continue;
			const label = typeof it.text === 'string' ? it.text : String(it.text);
			if (it.slug != null && norm(it.slug) === target) {
				chain.push(...acc, label);
				return true;
			}
			if (it.children && it.children.length) {
				const nextAcc = it.slug != null ? [...acc, label] : acc;
				if (walk(it.children, nextAcc)) return true;
			}
		}
		return false;
	};

	walk(nav.children, []);
	return ['Docs', ...chain];
}
