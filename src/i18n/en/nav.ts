/**
 * This configures the navigation sidebar.
 * All other languages follow this ordering/structure and will fall back to
 * English for any entries they haven’t translated.
 *
 * - All entries MUST include `text` and `key`
 * - Heading entries MUST include `header: true` and `type`
 * - Link entries MUST include `slug` (which excludes the language code)
 */
export default [
	//{ text: 'Getting started', header: true, type: 'learn', key: 'startHere', icon: 'start' },
	//{ text: 'Introduction', slug: 'getting-started', key: 'introduction' },
	//{ text: 'Layouts', slug: 'layout-elements', key: 'layouts' },

	{ text: 'Deployment', header: true, type: 'learn', slug: 'deployment/', key: 'deployment', icon: 'deployment'},
	{ text: 'Overview', slug: 'deployment', key: 'deploy-aws' },
	{ text: 'Deploy to AWS', slug: 'deployment/deploy-aws', key: 'deploy-aws' },
	{ text: 'Deploy to Azure', slug: 'deployment/deploy-azure', key: 'deploy-aws' },
	{ text: 'Deploy to GCP', slug: 'deployment/deploy-gcp', key: 'deploy-aws' },
	{ text: 'Deploy to Digital Ocean', slug: 'deployment/deploy-digitalocean', key: 'deploy-aws' },
	{ text: 'Deploy to Kubernetes', slug: 'deployment/deploy-kubernetes', key: 'deploy-aws' },
	{ text: 'Deploy to OVHCloud', slug: 'deployment/deploy-ovhcloud', key: 'deploy-aws' },
	{ text: 'Deploy to Scaleway', slug: 'deployment/deploy-scaleway', key: 'deploy-aws' },
	{ text: 'Deploy from Source', slug: 'deployment/deploy-source', key: 'deploy-aws' },
	{ text: 'Deploy to Ubuntu', slug: 'deployment/deploy-ubuntu', key: 'deploy-aws' },
	{ text: 'OpenReplay Administration', slug: 'deployment/openreplay-admin', key: 'deploy-aws' },
	{ text: 'Upgrade Deployment', slug: 'deployment/upgrade', key: 'migrate' },

	{ text: 'Using OpenReplay with...', slug: 'using-or/', header: true, type: 'learn', key: 'installation', icon: 'installation' },
	{ text: 'Overview', slug: 'using-or', key: 'tutorials/' },
	{ text: '... Next.js', slug: 'using-or/next', key: 'using-or/' },
	{ text: '... Nuxt', slug: 'using-or/nuxt', key: 'using-or/' },
	{ text: '... Remix', slug: 'using-or/remix', key: 'using-or/' },
	{ text: '... Svelte', slug: 'using-or/svelte', key: 'using-or/' },
	{ text: '... Angular', slug: 'using-or/angular', key: 'using-or/' },
	{ text: '... Gatsby', slug: 'using-or/gatsby', key: 'using-or/' },

	{ text: 'Configuration', slug: 'configuration/', header: true, type: 'learn', key: 'configuration', icon: 'configure' },
	{ text: 'Overview', slug: 'configuration', key: 'concepts/why-astro' },
	{ text: 'Cleanup Storage', slug: 'configuration/cleanup-storage', key: 'concepts/why-astro' },
	{ text: 'Configure SMTP', slug: 'configuration/configure-smtp', key: 'concepts/mpa-vs-spa' },
	{ text: 'External Database (Postgres)', slug: 'configuration/external-db', key: 'concepts/islands' },
	{ text: 'External Storage', slug: 'configuration/external-storage', key: 'concepts/islands' },
	{ text: 'Proxy Settings', slug: 'configuration/proxy-settings', key: 'concepts/islands' },
	{ text: 'Secure OpenReplay', slug: 'configuration/secure-or', key: 'concepts/islands' },
	{ text: 'Single Sign-On (SSO)', slug: 'configuration/sso', key: 'concepts/islands' },


	{ text: 'Features', slug: 'installation/', header: true, type: 'learn', key: 'installation', icon: 'installation' },
	{ text: 'Overview', slug: 'installation', key: 'blog-tutorial' },
	{ text: 'Custom Events', slug: 'installation/custom-events', key: 'blog-tutorial' },
	{ text: 'Error reporting', slug: 'installation/error-reporting', key: 'blog-installation' },
	{ text: 'Identify a User', slug: 'installation/identify-user', key: 'blog-installation' },
	{ text: 'JavaScript SDK', slug: 'installation/javascript-sdk', key: 'blog-installation' }, 
	{ text: 'Metadata', slug: 'installation/metadata', key: 'blog-installation' },
	{ text: 'Sanitize Data', slug: 'installation/sanitize-data', key: 'blog-installation' },
	{ text: 'Setup OpenReplay', slug: 'installation/setup-or', key: 'blog-installation' },
	{ text: 'Upload Source maps', slug: 'installation/upload-sourcemaps', key: 'blog-installation' },

	//plugins
	{ text: 'Plugins', header:true, type: 'learn', slug: 'plugins/', key: 'guides/troubleshooting', icon: 'plugins' },
	{ text: 'Overview', slug: 'plugins', key: 'plugins/troubleshooting' },
	{ text: 'Assist', slug: 'plugins/assist', key: 'plugins/troubleshooting' },
	{ text: 'Axios', slug: 'plugins/axios', key: 'plugins/troubleshooting' },
	{ text: 'Fetch', slug: 'plugins/fetch', key: 'plugins/troubleshooting' },
	{ text: 'GraphQL', slug: 'plugins/graphql', key: 'plugins/troubleshooting' },
	{ text: 'MobX', slug: 'plugins/mobx', key: 'plugins/troubleshooting' },
	{ text: 'NgRx', slug: 'plugins/ngrx', key: 'plugins/troubleshooting' },
	{ text: 'Pinia', slug: 'plugins/pinia', key: 'plugins/troubleshooting' },
	{ text: 'VueX', slug: 'plugins/vuex', key: 'plugins/troubleshooting' },
	{ text: 'Profiler', slug: 'plugins/profiler', key: 'plugins/troubleshooting' },
	{ text: 'Redux', slug: 'plugins/redux', key: 'plugins/troubleshooting' },
	{ text: 'Zustand', slug: 'plugins/zustand', key: 'plugins/troubleshooting' },

	// //tutorials
	// { text: 'Tutorials', slug: 'tutorials/', header: true, type: 'learn', key: 'tutorials', icon: 'tutorials' },
	// //about plugins
	// { text: 'Overview', slug: 'tutorials', key: 'core-concepts/layouts' },
	// { text: 'Plugins: Assist', slug: 'tutorials/assist', key: 'core-concepts/layouts' },
	// { text: 'Plugins: Fetch', slug: 'tutorials/fetch', key: 'tutorials/layouts' },
	// { text: 'Plugins: Axios', slug: 'tutorials/axios', key: 'tutorials/layouts' },
	// { text: 'Plugins: Redux', slug: 'tutorials/redux', key: 'tutorials/layouts' },
	// { text: 'Plugins: VueX', slug: 'tutorials/vuex', key: 'core-concepts/layouts' },
	// { text: 'Plugins: Pinia', slug: 'tutorials/pinia', key: 'guides/imports' },
	// { text: 'Plugins: GraphQL', slug: 'tutorials/graphql', key: 'guides/markdown-content' },
	// { text: 'Plugins: Zustand', slug: 'tutorials/zustand', key: 'core-concepts/routing' },
	// //features
	// { text: 'Feature: Omnisearch', slug: 'tutorials/omnisearch', key: 'core-concepts/endpoints' },
	// { text: 'Feature: Adding users', slug: 'tutorials/adding-users', key: 'tutorials/-fetching' },
	// { text: 'Feature: Issue types', slug: 'tutorials/issues', key: 'tutorials/' },
	// { text: 'Feature: Custom events', slug: 'tutorials/custom-events', key: 'tutorials/' },
	// { text: 'Feature: Metadata', slug: 'tutorials/metadata', key: 'tutorials/' },
	// { text: 'Feature: Custom dashboards', slug: 'tutorials/custom-dashboard', key: 'tutorials/' },
	// { text: 'Feature: Custom funnels', slug: 'tutorials/funnels', key: 'tutorials/' },
	// { text: 'Feature: Custom Metrics - JS errors', slug: 'tutorials/js-errors-dashboard', key: 'tutorials/' },
	// //integrations with frameworks (using openreplay with...)
	// // { text: 'Using OR with Next.js', slug: 'tutorials/next', key: 'tutorials/' },
	// // { text: 'Using OR with Nuxt', slug: 'tutorials/nuxt', key: 'tutorials/' },
	// // { text: 'Using OR with Remix', slug: 'tutorials/remix', key: 'tutorials/' },
	// // { text: 'Using OR with Svelte', slug: 'tutorials/svelte', key: 'tutorials/' },
	// // { text: 'Using OR with Angular', slug: 'tutorials/angular', key: 'tutorials/' },
	// // { text: 'Using OR with Gatsby', slug: 'tutorials/gatsby', key: 'tutorials/' },
	// //extending OpenReplay
	// { text: 'Creating your first plugin', slug: 'tutorials/build-plugins', key: 'tutorials/troubleshooting' },
	// { text: 'Creating your first heuristic', slug: 'tutorials/custom-heuristics', key: 'tutorials/troubleshooting' },

	

	
	//integrations
	{ text: 'Integrations', header:true,type: 'learn', slug: 'integrations/', key: 'guides/troubleshooting', icon: 'integration' },
	{ text: 'Overview', slug: 'integrations', key: 'integrations/troubleshooting' },
	{ text: 'Bugsnag', slug: 'integrations/bugsnag', key: 'integrations/troubleshooting' },
	{ text: 'CloudWatch', slug: 'integrations/cloudwatch', key: 'integrations/troubleshooting' },
	{ text: 'Datadog', slug: 'integrations/datadog', key: 'integrations/troubleshooting' },
	{ text: 'Elastic', slug: 'integrations/elastic', key: 'integrations/troubleshooting' },
	{ text: 'GitHub', slug: 'integrations/github', key: 'integrations/troubleshooting' },
	{ text: 'Google Tag Manager', slug: 'integrations/google-tag-manager', key: 'integrations/troubleshooting' },
	{ text: 'Jira Cloud', slug: 'integrations/jira', key: 'integrations/troubleshooting' },
	{ text: 'MSTeams', slug: 'integrations/msteams', key: 'integrations/troubleshooting' },
	{ text: 'NewRelic', slug: 'integrations/newrelic', key: 'integrations/troubleshooting' },
	{ text: 'Rollbar', slug: 'integrations/rollbar', key: 'integrations/troubleshooting' },
	{ text: 'Segment', slug: 'integrations/segment', key: 'integrations/troubleshooting' },
	{ text: 'Sentry', slug: 'integrations/sentry', key: 'integrations/troubleshooting' },
	{ text: 'Slack', slug: 'integrations/slack', key: 'integrations/troubleshooting' },
	{ text: 'Stackdriver', slug: 'integrations/stackdriver', key: 'integrations/troubleshooting' },
	{ text: 'SumoLogic', slug: 'integrations/sumo', key: 'integrations/troubleshooting' },

	//troubleshooting
	{ text: 'Troubleshooting', header:true,type: 'learn', slug: 'troubleshooting/', key: 'guides/troubleshooting', icon: 'troubleshoot' },
	{ text: 'Overview', slug: 'troubleshooting', key: 'troubleshooting/' },
	{ text: 'Clear Cache', slug: 'troubleshooting/cache', key: 'troubleshooting/' },
	{ text: 'Content Security Policy (CSP)', slug: 'troubleshooting/csp', key: 'troubleshooting/' },
	{ text: 'JS Errors', slug: 'troubleshooting/js-errors', key: 'troubleshooting/' },
	{ text: 'Localhost Testing', slug: 'troubleshooting/localhost', key: 'troubleshooting/' },
	{ text: 'Session Recording Issues', slug: 'troubleshooting/session-recordings', key: 'troubleshooting/' },
	{ text: 'Sourcemaps issues', slug: 'troubleshooting/sourcemaps', key: 'troubleshooting/' },
	{ text: 'Supported Browsers', slug: 'troubleshooting/supported-browsers', key: 'troubleshooting/' },
	{ text: 'Deployment issues', slug: 'troubleshooting/deployment-faq', key: 'troubleshooting/' },

// structure
	{ text: 'Exporting data', header:true,type: 'learn', slug: 'structure/', key: 'structure/troubleshooting', icon: 'structure' },
	{ text: 'Overview', slug: 'structure', key: 'structure/troubleshooting' },
	{ text: 'Exported Data', slug: 'structure/exported-data', key: 'structure/troubleshooting' },
	


//API
{ text: 'API (BETA)', header:true,type: 'learn', slug: 'api/', key: 'guides/troubleshooting', icon: 'api' },
{ text: 'Overview', slug: 'api', key: 'api/troubleshooting' },
{ text: 'Assist', slug: 'api/assist', key: 'api/troubleshooting' },
{ text: 'Events', slug: 'api/events', key: 'api/troubleshooting' },
{ text: 'Jobs', slug: 'api/jobs', key: 'api/troubleshooting' },
{ text: 'Projects', slug: 'api/projects', key: 'api/troubleshooting' },
{ text: 'Sessions', slug: 'api/sessions', key: 'api/troubleshooting' },
{ text: 'Users', slug: 'api/users', key: 'api/troubleshooting' },

		
] as const;
