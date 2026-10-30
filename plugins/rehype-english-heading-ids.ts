import type { Element, Root } from 'hast';
import rehypeSlug from 'rehype-slug';
import type { Processor, Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import path from 'path';
import fs from 'fs';

/**
 * Gives headings on translated pages the same `id` as the matching heading on the
 * English page, so `#anchor` links keep working in every language.
 *
 * Translations keep link targets verbatim from English (`[texto](#reserved-keys)`,
 * `/sdk/sanitize-data#granular-level`), but `rehype-slug` derives ids from the heading
 * text, which is translated (`## 予約済みキー`). This plugin runs before `rehype-slug`
 * and assigns the n-th heading of `src/pages/<lang>/<path>.mdx` the id of the n-th
 * heading of `src/pages/en/<path>.mdx`. `rehype-slug` and Astro's heading collection
 * (the right-hand table of contents) both keep an existing `id`, so they follow suit.
 *
 * Only applied when the two pages have the same sequence of heading levels; a
 * translation that has drifted from English keeps its own text-derived ids.
 */

const pageSourceDir = path.resolve('./src/pages');
const HEADING = /^h([1-6])$/;

interface EnglishHeadings {
	mtimeMs: number;
	depths: number[];
	ids: string[];
}
const cache = new Map<string, EnglishHeadings>();

/** Text of an mdast node, matching what `hast-util-to-string` sees once it is hast. */
function mdastText(node: any): string {
	if (node.type === 'image' || node.type === 'imageReference') return '';
	if (typeof node.value === 'string') return node.value;
	return Array.isArray(node.children) ? node.children.map(mdastText).join('') : '';
}

/** Blank out frontmatter but keep its lines, so the rest of the file parses as MDX. */
function stripFrontmatter(source: string): string {
	const match = source.match(/^---\r?\n[\s\S]*?\r?\n---(?=\r?\n|$)/);
	return match ? match[0].replace(/[^\n]/g, '') + source.slice(match[0].length) : source;
}

function getEnglishHeadings(processor: Processor, enPath: string): EnglishHeadings | undefined {
	let stat: fs.Stats;
	try {
		stat = fs.statSync(enPath);
	} catch {
		return undefined;
	}
	const cached = cache.get(enPath);
	if (cached && cached.mtimeMs === stat.mtimeMs) return cached;

	let mdast: any;
	try {
		// Parse with this page's own MDX parser (MDX + GFM + directives), so headings
		// are found exactly as they are when the English page itself is compiled.
		mdast = processor.parse(stripFrontmatter(fs.readFileSync(enPath, 'utf-8')));
	} catch {
		return undefined;
	}

	// Run the real `rehype-slug` over the English heading texts, so the ids (including
	// `-1`, `-2` suffixes for repeated headings) are the ones the English page gets.
	const headings: Element[] = [];
	visit(mdast, 'heading', (node: any) => {
		headings.push({
			type: 'element',
			tagName: `h${node.depth}`,
			properties: {},
			children: [{ type: 'text', value: mdastText(node) }],
		});
	});
	(rehypeSlug as any)()({ type: 'root', children: headings });

	const result = {
		mtimeMs: stat.mtimeMs,
		depths: headings.map((h) => Number(h.tagName[1])),
		ids: headings.map((h) => String(h.properties!.id)),
	};
	cache.set(enPath, result);
	return result;
}

export function rehypeEnglishHeadingIds() {
	return function attacher(this: Processor): Transformer<Root> {
		const processor = this;
		return (tree, file) => {
			const rel = path.relative(pageSourceDir, file.path).replace(/\\/g, '/');
			const [lang, ...rest] = rel.split('/');
			if (!lang || lang === 'en' || rel.startsWith('..') || rest.length === 0) return;

			const english = getEnglishHeadings(processor, path.join(pageSourceDir, 'en', ...rest));
			if (!english) return;

			const headings: Element[] = [];
			visit(tree, 'element', (node) => {
				if (HEADING.test(node.tagName)) headings.push(node);
			});
			const depths = headings.map((h) => Number(h.tagName[1]));
			if (depths.length !== english.depths.length || depths.some((d, i) => d !== english.depths[i])) return;

			headings.forEach((heading, i) => {
				heading.properties = { ...heading.properties, id: english.ids[i] };
			});
		};
	};
}
