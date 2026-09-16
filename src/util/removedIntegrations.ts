/**
 * Integrations OpenReplay no longer supports, and whose current-version docs were
 * deleted. Consumed by `src/pages/[lang]/integrations/[integration].astro`, which
 * serves a `noindex` tombstone at each retired URL.
 *
 * This lives in its own module rather than in that page's frontmatter because Astro
 * hoists `getStaticPaths` above the component body: frontmatter `const`s are still in
 * their temporal dead zone when it runs, so the map has to arrive via an import.
 */
export const REMOVED_INTEGRATIONS: Record<string, string> = {
	bugsnag: 'Bugsnag',
	cloudwatch: 'CloudWatch',
	newrelic: 'New Relic',
	rollbar: 'Rollbar',
	segment: 'Segment',
	stackdriver: 'Stackdriver',
	sumo: 'Sumo Logic',
};

/** Newest version folder that still carries the original pages. */
export const ARCHIVE_VERSION = 'v1.26.0';
