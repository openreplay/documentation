import type { Root } from 'mdast';
import type { Plugin, Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import path from 'path';
import fs from 'fs';

/**
 * Prefixes internal, root-absolute links on translated pages with the page's
 * language code (e.g. on `/fr/sdk`, rewrites `/sdk/methods` -> `/fr/sdk/methods`)
 * so that navigating within a translated page keeps the reader in that language.
 *
 * English is served at the site root, so its links are left untouched. A link is
 * only rewritten when a translated source page actually exists for the target;
 * this leaves asset URLs (e.g. `/images/foo.png`), already-prefixed links, anchors,
 * external links, and English-only pages alone (they fall back to the root/English
 * version, which `remark-fallback-lang` then annotates with "(EN)").
 *
 * Operates on the mdast so it covers all three link forms in one pass:
 *   - markdown links            `[text](/sdk/methods)`
 *   - raw HTML anchors          `<a href="/sdk/methods">`
 *   - component url/href props   `<ORCard url="/sdk/methods" />`
 */

const pageSourceDir = path.resolve('./src/pages');
const LANG_DIR = /^[a-z]{2}(-[a-z]{2})?$/i;

// The actual language directories under src/pages (en, es, fr, ru, zh, ar-ae).
// Derived from the filesystem so that non-language path segments that happen to
// be two letters (e.g. `/ai`) are NOT mistaken for a language prefix.
const KNOWN_LANGS = new Set(
	fs
		.readdirSync(pageSourceDir, { withFileTypes: true })
		.filter((d) => d.isDirectory() && LANG_DIR.test(d.name))
		.map((d) => d.name)
);

function pageLangFromFilePath(filePath: string): string | undefined {
	const rel = path.relative(pageSourceDir, filePath).replace(/\\/g, '/');
	const first = rel.split('/')[0];
	return first && KNOWN_LANGS.has(first) ? first : undefined;
}

function translatedPageExists(lang: string, pathname: string): boolean {
	const rel = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
	if (!rel) return false;
	const base = path.join(pageSourceDir, lang, rel);
	return [base + '.mdx', base + '.md', path.join(base, 'index.mdx'), path.join(base, 'index.md')].some(
		(p) => fs.existsSync(p)
	);
}

export function remarkLocalizeLinks(): Plugin<[], Root> {
	const transformer: Transformer<Root> = (tree, file) => {
		const lang = pageLangFromFilePath(file.path);
		// Only rewrite on translated pages; English is served at the root.
		if (!lang || lang === 'en') return;

		const localize = (value: unknown): unknown => {
			if (typeof value !== 'string') return value;
			// Only internal, root-absolute links (skip relative, anchors, external, protocol-relative).
			if (!value.startsWith('/') || value.startsWith('//')) return value;
			// The site home for this language is served at `/<lang>`.
			if (value === '/') return `/${lang}`;
			// Skip links that already carry a language prefix.
			const firstSeg = value.split('/')[1] ?? '';
			if (KNOWN_LANGS.has(firstSeg)) return value;
			// Only prefix when a translated page actually exists for the target.
			// (Excludes asset URLs like `/images/foo.png` and English-only pages.)
			const pathnameOnly = value.split(/[?#]/)[0];
			if (!translatedPageExists(lang, pathnameOnly)) return value;
			return `/${lang}${value}`;
		};

		visit(tree, (node: any) => {
			if (node.type === 'link') {
				node.url = localize(node.url);
			} else if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
				for (const attr of node.attributes ?? []) {
					if (attr.type === 'mdxJsxAttribute' && (attr.name === 'href' || attr.name === 'url')) {
						attr.value = localize(attr.value);
					}
				}
			}
		});
	};

	return function attacher() {
		return transformer;
	};
}
