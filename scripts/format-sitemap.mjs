/**
 * Pretty-print all sitemap XML files emitted to `dist/` so `view-source:` in a
 * browser shows a readable, indented tree instead of one long line.
 *
 * Search engines ignore whitespace, so formatting is cosmetic. Runs as part of
 * `postbuild`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.resolve(fileURLToPath(new URL('../dist', import.meta.url)));

/** Minimal XML pretty-printer. Sitemap output is well-formed and has no mixed
 *  content or CDATA, so a tag-level tokenizer is sufficient. */
function formatXml(xml) {
	// Preserve the XML prolog (`<?xml ...?>`) on its own line.
	const prologMatch = xml.match(/^\s*<\?xml[^?]*\?>\s*/);
	const prolog = prologMatch ? prologMatch[0].trim() : '';
	const body = prologMatch ? xml.slice(prologMatch[0].length) : xml;

	const out = prolog ? [prolog] : [];
	const INDENT = '\t';
	let depth = 0;
	let lastWasText = false;

	// Split on tags, keeping them. Each token is either a tag (<...>) or text.
	const tokens = body.split(/(<[^>]+>)/).filter((t) => t !== '');

	for (const token of tokens) {
		if (!token.startsWith('<')) {
			// Text content — attach to previous line; ignore pure whitespace.
			const text = token.trim();
			if (text) {
				out[out.length - 1] += text;
				lastWasText = true;
			}
			continue;
		}

		const isClosing = token.startsWith('</');
		const isSelfClosing = token.endsWith('/>') || token.startsWith('<?') || token.startsWith('<!');

		if (isClosing) depth = Math.max(0, depth - 1);
		if (isClosing && lastWasText) {
			// Keep `<tag>text</tag>` on a single line.
			out[out.length - 1] += token;
		} else {
			out.push(INDENT.repeat(depth) + token);
		}
		if (!isClosing && !isSelfClosing) depth += 1;
		lastWasText = false;
	}

	return out.join('\n') + '\n';
}

function main() {
	if (!fs.existsSync(DIST)) {
		console.warn(`[format-sitemap] ${DIST} does not exist, skipping.`);
		return;
	}

	const files = fs.readdirSync(DIST).filter((f) => /^sitemap.*\.xml$/i.test(f));
	if (files.length === 0) {
		console.warn('[format-sitemap] No sitemap XML files found in dist/, skipping.');
		return;
	}

	for (const file of files) {
		const full = path.join(DIST, file);
		const before = fs.statSync(full).size;
		const formatted = formatXml(fs.readFileSync(full, 'utf8'));
		fs.writeFileSync(full, formatted);
		const after = fs.statSync(full).size;
		console.log(`[format-sitemap] ${file}: ${before} → ${after} bytes`);
	}
}

main();
