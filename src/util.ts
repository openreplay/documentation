export function getLanguageFromURL(pathname: string) {
	const langCodeMatch = pathname.match(/\/([a-z]{2}-?[a-z]{0,2})\//);
	return langCodeMatch ? langCodeMatch[1] : 'en';
}

export const __LATEST__ = "_latest_"

export function getVersionFromURL(pathname: string) {
	const versionCodeMatch = pathname.match(/\/v([0-9].[0-9].[0-9])\//);
	return versionCodeMatch ? versionCodeMatch[1] : '';

}

/** Remove \ and / from beginning of string */
export function removeLeadingSlash(path: string) {
	return path.replace(/^[/\\]+/, '');
}

/** Remove \ and / from end of string */
export function removeTrailingSlash(path: string) {
	return path.replace(/[/\\]+$/, '');
}

/** Remove the subpage segment of a URL string */
export function removeSubpageSegment(path: string) {
	// Include new pages with subpages as part of this if statement.
	if (/(?:install|deploy|integrations-guide|tutorial)\//.test(path)) {
		return path.slice(0, path.lastIndexOf('/'));
	}
	return path;
}
