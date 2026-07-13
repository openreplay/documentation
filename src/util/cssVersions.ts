import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Content-hash version tokens for the global stylesheets in /public, appended
 * as `?v=` by HeadCommon.astro. deploy.yml serves these files with a 5-minute
 * max-age (they used to ship with NO Cache-Control header, and iOS Safari's
 * heuristic caching served stale /redesign.css for days after deploys); the
 * hash makes CSS changes propagate the moment the page HTML does, instead of
 * after the TTL. Hashing file contents (rather than stamping the build time)
 * busts a file's cache only when its bytes actually change, and keeps builds
 * of identical source byte-identical.
 */
const version = (file: string): string => {
	try {
		return createHash('md5')
			.update(readFileSync(resolve(process.cwd(), 'public', file)))
			.digest('hex')
			.slice(0, 8);
	} catch {
		// Unexpected cwd (file not found): fall back to a per-build stamp —
		// busts more than needed, but never serves stale CSS.
		return Date.now().toString(36);
	}
};

export const cssVersions = {
	theme: version('theme.css'),
	index: version('index.css'),
	redesign: version('redesign.css'),
};
