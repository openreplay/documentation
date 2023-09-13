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

	{ text: 'Home', header: true, type: 'learn', slug: 'home', key: 'home', icon: 'home', hideChevron: true },
	{ text: 'Getting started', header: true, type: 'learn', slug: 'getting-started', key: 'getting-started', icon: 'start', hideChevron: true},

	{ text: 'Deployment', header: true, type: 'learn', slug: 'deployment/', key: 'deployment', icon: 'deployment', extraCSSClasses: "pt-5 border-t"},
	{ text: 'Overview', slug: 'deployment', key: 'deploy-overview' },
	{ text: 'Deploy to AWS', slug: 'deployment/deploy-aws', key: 'deploy-aws' },
	{ text: 'Deploy to Azure', slug: 'deployment/deploy-azure', key: 'deploy-azure' },
	{ text: 'Deploy to GCP', slug: 'deployment/deploy-gcp', key: 'deploy-gcp' },
	{ text: 'Deploy to Digital Ocean', slug: 'deployment/deploy-digitalocean', key: 'deploy-do' },
	{ text: 'Deploy to Kubernetes', slug: 'deployment/deploy-kubernetes', key: 'deploy-kub' },
	{ text: 'Deploy to OVHCloud', slug: 'deployment/deploy-ovhcloud', key: 'deploy-ovh' },
	{ text: 'Deploy to Scaleway', slug: 'deployment/deploy-scaleway', key: 'deploy-scaleway' },
	{ text: 'Deploy from Source', slug: 'deployment/deploy-source', key: 'deploy-source' },
	{ text: 'Deploy to Ubuntu', slug: 'deployment/deploy-ubuntu', key: 'deploy-ubuntu' },
	{ text: 'OpenReplay Administration', slug: 'deployment/openreplay-admin', key: 'deploy-admin' },
	{ text: 'Upgrade Deployment', slug: 'deployment/upgrade', key: 'migrate' },

	{ text: 'Tracker Setup', slug: 'using-or/', header: true, type: 'learn', key: 'tracker-setup', icon: 'tracker-setup' },
	{ text: 'Overview', slug: 'using-or', key: 'tutorials/' },
	{ text: 'JS Snippet', slug: 'using-or/snippet', key: 'using-or/' },
	{ text: 'React', slug: 'using-or/react', key: 'using-or/' },
	{ text: 'Vue', slug: 'using-or/vue', key: 'using-or/' },
	{ text: 'Next.js', slug: 'using-or/next', key: 'using-or/' },
	{ text: 'Nuxt', slug: 'using-or/nuxt', key: 'using-or/' },
	{ text: 'Remix', slug: 'using-or/remix', key: 'using-or/' },
	{ text: 'Svelte', slug: 'using-or/svelte', key: 'using-or/' },
	{ text: 'Angular', slug: 'using-or/angular', key: 'using-or/' },
	{ text: 'Gatsby', slug: 'using-or/gatsby', key: 'using-or/' },
	{ text: 'iOS (beta)', slug: 'using-or/ios', key: 'using-or/' },

	{ text: 'Administration', slug: 'configuration/', header: true, type: 'learn', key: 'admin', icon: 'configure' },
	{ text: 'Overview', slug: 'configuration', key: 'concepts/why-astro' },
	{ text: 'Cleanup Storage', slug: 'configuration/cleanup-storage', key: 'concepts/why-astro' },
	{ text: 'Configure SMTP', slug: 'configuration/configure-smtp', key: 'concepts/mpa-vs-spa' },
	{ text: 'External Database (Postgres)', slug: 'configuration/external-db', key: 'concepts/islands' },
	{ text: 'External Storage', slug: 'configuration/external-storage', key: 'concepts/islands' },
	{ text: 'Proxy Settings', slug: 'configuration/proxy-settings', key: 'concepts/islands' },
	{ text: 'Secure OpenReplay', slug: 'configuration/secure-or', key: 'concepts/islands' },
	{ text: 'Single Sign-On (SSO)', slug: 'configuration/sso', key: 'concepts/islands' },


	{ text: 'How-tos', slug: 'installation/', header: true, type: 'learn', key: 'how-tos', icon: 'features' },
	{ text: 'Overview', slug: 'installation', key: 'blog-tutorial' },
	{ text: 'Identify a User', slug: 'installation/identify-user', key: 'blog-installation' },
	{ text: 'Add users to your team', slug: 'tutorials/adding-users', key: 'blog-installation' },
	{ text: 'Metadata', slug: 'installation/metadata', key: 'blog-installation' },
	{ text: 'Custom Events', slug: 'installation/custom-events', key: 'blog-tutorial' },
	{ text: 'Error reporting', slug: 'installation/error-reporting', key: 'blog-installation' },
	{ text: 'Upload Source maps', slug: 'installation/upload-sourcemaps', key: 'blog-installation' },
	{ text: 'Sanitize Data', slug: 'installation/sanitize-data', key: 'blog-installation' },
	{ text: 'Custom Heuristics', slug: 'tutorials/custom-heuristics', key: 'blog-installation' },
	{ text: 'OmniSearch', slug: 'tutorials/omnisearch', key: 'blog-installation' },
	{ text: 'Custom Dashboards', slug: 'tutorials/custom-dashboard', key: 'blog-installation' },
	{ text: 'Network options', slug: 'installation/network-options', key: 'blog-installation' },
	//{ text: 'JavaScript SDK', slug: 'installation/javascript-sdk', key: 'blog-installation' }, 
	//{ text: 'Setup OpenReplay', slug: 'installation/setup-or', key: 'blog-installation' },

	//plugins
	{ text: 'Plugins', header:true, type: 'learn', slug: 'plugins/', key: 'plugins', icon: 'plugins' },
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

	
	//integrations
	{ text: 'Integrations', header:true,type: 'learn', slug: 'integrations/', key: 'integrations', icon: 'integration' },
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
	{ text: 'Troubleshooting', header:true,type: 'learn', slug: 'troubleshooting/', key: 'troubleshooting', icon: 'troubleshoot' },
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
	{ text: 'Exporting data', header:true,type: 'learn', slug: 'structure/', key: 'data-export', icon: 'structure' },
	{ text: 'Overview', slug: 'structure', key: 'structure/troubleshooting' },
	{ text: 'Exported Data', slug: 'structure/exported-data', key: 'structure/troubleshooting' },

] as const;


export const subMenus = [
//API
{ text: 'API (BETA)', header:true,type: 'learn', slug: 'api/', key: 'guides/troubleshooting', icon: 'api' },
{ text: 'Overview', slug: 'api', key: 'api/troubleshooting' },
{ text: 'Assist', slug: 'api/assist', key: 'api/troubleshooting' },
{ text: 'Events', slug: 'api/events', key: 'api/troubleshooting' },
{ text: 'Jobs', slug: 'api/jobs', key: 'api/troubleshooting' },
{ text: 'Projects', slug: 'api/projects', key: 'api/troubleshooting' },
{ text: 'Sessions', slug: 'api/sessions', key: 'api/troubleshooting' },
{ text: 'Users', slug: 'api/users', key: 'api/troubleshooting' },

 { text: 'JavaScript SDK', header:true,type: 'learn', slug: 'sdk/', key: 'guides/troubleshooting', icon: 'sdk' },
 { text: 'Overview', slug: 'sdk', key: 'sdk' },
 { text: 'Initialization', slug: 'sdk/constructor', key: 'sdk' },
 { text: 'Methods', slug: 'sdk/methods', key: 'sdk' },
 { text: 'event', slug: 'sdk/event', key: 'sdk/troubleshooting' },
 { text: 'getSessionToken', slug: 'sdk/get-session-token', key: 'sdk/troubleshooting' },
 { text: 'getSessionID', slug: 'sdk/get-session-id', key: 'sdk/troubleshooting' },
 { text: 'getSessionURL', slug: 'sdk/get-session-url', key: 'sdk/troubleshooting' },
 { text: 'handleError', slug: 'sdk/handle-error', key: 'sdk/troubleshooting' },
 { text: 'isActive', slug: 'sdk/is-active', key: 'api/troubleshooting' },
 { text: 'issue', slug: 'sdk/issue', key: 'sdk/troubleshooting' },
 { text: 'setUserID', slug: 'sdk/set-user-id', key: 'sdk/troubleshooting' },
 { text: 'setMetadata', slug: 'sdk/set-metadata', key: 'sdk/troubleshooting' },
 { text: 'start', slug: 'sdk/start', key: 'sdk/troubleshooting' },
 { text: 'stop', slug: 'sdk/stop', key: 'sdk/troubleshooting' },

 { text: 'iOS SDK (beta)', header:true,type: 'learn', slug: 'ios-sdk/', key: 'ios-sdk', icon: 'sdk' },
 { text: 'Initialization', slug: 'ios-sdk/init', key: 'ios-sdk' },
 { text: 'Modules', slug: 'ios-sdk/modules', key: 'ios-sdk' },
 { text: 'Start', slug: 'ios-sdk/start', key: 'ios-sdk/start' },
 { text: 'Capturing Inputs', slug: 'ios-sdk/inputs', key: 'ios-sdk/inputs' },
 { text: 'Network', slug: 'ios-sdk/network', key: 'ios-sdk/network' },
 { text: 'Events', slug: 'ios-sdk/event', key: 'ios-sdk/event' },
 { text: 'Analytics', slug: 'ios-sdk/analytics', key: 'ios-sdk/analytics' },
 { text: 'Sanitazation', slug: 'ios-sdk/sanitazation', key: 'ios-sdk/sanitazation' },
 { text: 'setUserID', slug: 'ios-sdk/set-user-id', key: 'ios-sdk/setuserid' },
 { text: 'setMetadata', slug: 'ios-sdk/set-metadata', key: 'ios-sdk/metadata' },
 { text: 'userAnonymousId', slug: 'ios-sdk/user-anonymous-id', key: 'ios-sdk/anonid' },
 

 { text: 'OpenReplay CLI', header:true,type: 'learn', slug: 'cli/', key: 'guides/troubleshooting', icon: 'cli', hideChevron: true },
] 
