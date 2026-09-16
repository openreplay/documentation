/**
 * Integrations OpenReplay no longer supports, and whose current-version docs were
 * deleted. Consumed by `src/pages/[lang]/integrations/[integration].astro`, which
 * serves a `noindex` tombstone at each retired URL.
 *
 * This lives in its own module rather than in that page's frontmatter because the Astro
 * compiler emits `getStaticPaths` as a standalone top-level function while every other
 * frontmatter statement is compiled into a separate closure passed to `$$createComponent`.
 * The two land in disjoint, non-nested scopes, so a frontmatter `const` is unreachable
 * from `getStaticPaths` no matter where it is declared — it fails with a plain
 * `ReferenceError: REMOVED_INTEGRATIONS is not defined`. Declaration order is irrelevant;
 * moving the map above `getStaticPaths` will not work. It has to arrive via an import.
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
