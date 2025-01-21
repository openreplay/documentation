export interface NavItem {
  text: string
  slug: string | null
  icon?: string
  hideChevron?: boolean
  children?: NavItem[]
  isSectionTitle?: boolean
}

const nav: NavItem = {
  text: 'root',
  slug: '',
  children: [
    {
      text: 'Test Section Title',
      slug: null,
      icon: 'home',
      hideChevron: true,
      children: [],
      isSectionTitle: true
    },
    {
      text: 'Home',
      slug: 'home',
      icon: 'home',
      hideChevron: true,
      children: []
    },
    {
      text: 'Getting started',
      slug: 'getting-started',
      icon: 'start',
      hideChevron: true,
      children: []
    },
    {
      text: 'Deployment',
      slug: 'deployment/',
      icon: 'deployment',
      children: [
        { text: 'Overview', slug: 'deployment/', children: [] },
        { text: 'Test List', slug: null, children: [
          { text: 'Deploy to AWS', slug: 'deployment/deploy-aws', children: [] },
        { text: 'Deploy to Azure', slug: 'deployment/deploy-azure', children: [] },
        { text: 'Deploy to GCP', slug: 'deployment/deploy-gcp', children: [] },
        ] },
        { text: 'Deploy to AWS', slug: 'deployment/deploy-aws', children: [] },
        { text: 'Deploy to Azure', slug: 'deployment/deploy-azure', children: [] },
        { text: 'Deploy to GCP', slug: 'deployment/deploy-gcp', children: [] },
        { text: 'Deploy to Digital Ocean', slug: 'deployment/deploy-digitalocean', children: [] },
        { text: 'Deploy to Kubernetes', slug: 'deployment/deploy-kubernetes', children: [] },
        { text: 'Deploy to Docker', slug: 'deployment/deploy-docker', children: [] },
        { text: 'Deploy to OVHCloud', slug: 'deployment/deploy-ovhcloud', children: [] },
        { text: 'Deploy to Scaleway', slug: 'deployment/deploy-scaleway', children: [] },
        { text: 'Deploy from Source', slug: 'deployment/deploy-source', children: [] },
        { text: 'Deploy to Ubuntu', slug: 'deployment/deploy-ubuntu', children: [] },
        { text: 'OpenReplay Administration', slug: 'deployment/openreplay-admin', children: [] },
        { text: 'Upgrade Deployment', slug: 'deployment/upgrade', children: [] },
      ]
    },
    {
      text: 'Tracker Setup',
      slug: 'using-or',
      icon: 'tracker-setup',
      children: [
        { text: 'Overview', slug: 'using-or', children: [] },
        { text: 'JS Snippet', slug: 'using-or/snippet', children: [] },
        { text: 'React', slug: 'using-or/react', children: [] },
        { text: 'Vue', slug: 'using-or/vue', children: [] },
        { text: 'Next.js', slug: 'using-or/next', children: [] },
        { text: 'Nuxt', slug: 'using-or/nuxt', children: [] },
        { text: 'Remix', slug: 'using-or/remix', children: [] },
        { text: 'Svelte', slug: 'using-or/svelte', children: [] },
        { text: 'Angular', slug: 'using-or/angular', children: [] },
        { text: 'Gatsby', slug: 'using-or/gatsby', children: [] },
        { text: 'iOS (beta)', slug: 'ios-sdk/init', children: [] },
        { text: 'Android (beta)', slug: 'android-sdk/init', children: [] },
        { text: 'React Native', slug: 'rn-sdk/init', children: [] },
      ]
    },
    {
      text: 'Administration',
      slug: 'configuration',
      icon: 'configure',
      children: [
        { text: 'Overview', slug: 'configuration', children: [] },
        { text: 'Cleanup Storage', slug: 'configuration/cleanup-storage', children: [] },
        { text: 'Configure SMTP', slug: 'configuration/configure-smtp', children: [] },
        { text: 'External Database (Postgres)', slug: 'configuration/external-db', children: [] },
        { text: 'External Storage', slug: 'configuration/external-storage', children: [] },
        { text: 'Proxy Settings', slug: 'configuration/proxy-settings', children: [] },
        { text: 'Secure OpenReplay', slug: 'configuration/secure-or', children: [] },
        { text: 'Single Sign-On (SSO)', slug: 'configuration/sso', children: [] },
      ]
    },
    {
      text: 'How-tos',
      slug: 'installation',
      icon: 'features',
      children: [
        { text: 'Overview', slug: 'installation', children: [] },
        { text: 'Identify a User', slug: 'installation/identify-user', children: [] },
        { text: 'Send Metadata', slug: 'installation/metadata', children: [] },
        { text: 'Custom Events', slug: 'installation/custom-events', children: [] },
        { text: 'Canvas and WebGL', slug: 'installation/canvas', children: [] },
        { text: 'Cross-domain iFrames', slug: 'installation/crossdomain-iframe', children: [] },
        { text: 'WebSockets', slug: 'installation/websockets', children: [] },
        { text: 'Network Options (Web)', slug: 'installation/network-options', children: [] },
        { text: 'Network Options (Mobile)', slug: 'installation/network-options-mobile', children: [] },
        { text: 'Sanitize Data (Web)', slug: 'installation/sanitize-data', children: [] },
        { text: 'Sanitize Data (Mobile)', slug: 'installation/sanitize-data-mobile', children: [] },
        { text: 'Error tracking', slug: 'installation/error-reporting', children: [] },
        { text: 'Upload Source maps', slug: 'installation/upload-sourcemaps', children: [] },
      ]
    },
    {
      text: 'Guides',
      slug: 'tutorials',
      icon: 'tutorials',
      children: [
        { text: 'Overview', slug: 'tutorials', children: [] },
        { text: 'Team Management', slug: 'tutorials/invite-team-members', children: [] },
        { text: 'Roles and Access', slug: 'tutorials/roles-and-access', children: [] },
        { text: 'Spot (Chrome Extension)', slug: 'tutorials/spot', children: [] },
        { text: 'OmniSearch', slug: 'tutorials/omnisearch', children: [] },
        { text: 'Dashboards', slug: 'tutorials/custom-dashboard', children: [] },
      ]
    },
    {
      text: 'Plugins',
      slug: 'plugins',
      icon: 'plugins',
      children: [
        { text: 'Overview', slug: 'plugins', children: [] },
        { text: 'Assist', slug: 'plugins/assist', children: [] },
        { text: 'Axios', slug: 'plugins/axios', children: [] },
        { text: 'Fetch', slug: 'plugins/fetch', children: [] },
        { text: 'GraphQL', slug: 'plugins/graphql', children: [] },
        { text: 'MobX', slug: 'plugins/mobx', children: [] },
        { text: 'NgRx', slug: 'plugins/ngrx', children: [] },
        { text: 'Pinia', slug: 'plugins/pinia', children: [] },
        { text: 'VueX', slug: 'plugins/vuex', children: [] },
        { text: 'Profiler', slug: 'plugins/profiler', children: [] },
        { text: 'Redux', slug: 'plugins/redux', children: [] },
        { text: 'Zustand', slug: 'plugins/zustand', children: [] },
      ]
    },
    {
      text: 'Integrations',
      slug: 'integrations',
      icon: 'integration',
      children: [
        { text: 'Overview', slug: 'integrations', children: [] },
        { text: 'Datadog', slug: 'integrations/datadog', children: [] },
        { text: 'Elastic', slug: 'integrations/elastic', children: [] },
        { text: 'Dynatrace', slug: 'integrations/dynatrace', children: [] },
        { text: 'Sentry', slug: 'integrations/sentry', children: [] },
        { text: 'GitHub', slug: 'integrations/github', children: [] },
        { text: 'Slack', slug: 'integrations/slack', children: [] },
        { text: 'MSTeams', slug: 'integrations/msteams', children: [] },
        { text: 'Jira Cloud', slug: 'integrations/jira', children: [] },
        { text: 'Zendesk', slug: 'integrations/zendesk', children: [] },
      ]
    },
    {
      text: 'Troubleshooting',
      slug: 'troubleshooting',
      icon: 'troubleshoot',
      children: [
        { text: 'Overview', slug: 'troubleshooting', children: [] },
        { text: 'Clear Cache', slug: 'troubleshooting/cache', children: [] },
        { text: 'Content Security Policy (CSP)', slug: 'troubleshooting/csp', children: [] },
        { text: 'JS Errors', slug: 'troubleshooting/js-errors', children: [] },
        { text: 'Localhost Testing', slug: 'troubleshooting/localhost', children: [] },
        { text: 'Session Recording Issues', slug: 'troubleshooting/session-recordings', children: [] },
        { text: 'Sourcemaps Issues', slug: 'troubleshooting/sourcemaps', children: [] },
        { text: 'Supported Browsers', slug: 'troubleshooting/supported-browsers', children: [] },
        { text: 'Deployment Issues', slug: 'troubleshooting/deployment-issues', children: [] },
      ]
    },
    {
      text: 'Exporting data',
      slug: 'structure',
      icon: 'structure',
      children: [
        { text: 'Overview', slug: 'structure', children: [] },
        { text: 'Exported Data', slug: 'structure/exported-data', children: [] },
      ]
    },
    {
      text: 'API',
      slug: 'api',
      icon: 'api',
      children: [
        { text: 'Overview', slug: 'api', children: [] },
        { text: 'Assist', slug: 'api/assist', children: [] },
        { text: 'Events', slug: 'api/events', children: [] },
        { text: 'Jobs', slug: 'api/jobs', children: [] },
        { text: 'Projects', slug: 'api/projects', children: [] },
        { text: 'Sessions', slug: 'api/sessions', children: [] },
        { text: 'Users', slug: 'api/users', children: [] },
      ]
    },
    {
      text: 'JavaScript SDK',
      slug: 'sdk',
      icon: 'sdk',
      children: [
        { text: 'Overview', slug: 'sdk', children: [] },
        { text: 'Initialization', slug: 'sdk/constructor', children: [] },
        { text: 'Methods', slug: 'sdk/methods', children: [] },
        { text: 'event', slug: 'sdk/event', children: [] },
        { text: 'getSessionToken', slug: 'sdk/get-session-token', children: [] },
        { text: 'getSessionID', slug: 'sdk/get-session-id', children: [] },
        { text: 'getSessionURL', slug: 'sdk/get-session-url', children: [] },
        { text: 'handleError', slug: 'sdk/handle-error', children: [] },
        { text: 'isActive', slug: 'sdk/is-active', children: [] },
        { text: 'issue', slug: 'sdk/issue', children: [] },
        { text: 'setUserID', slug: 'sdk/set-user-id', children: [] },
        { text: 'setUserAnonymousID', slug: 'sdk/set-user-anonymous-id', children: [] },
        { text: 'setMetadata', slug: 'sdk/set-metadata', children: [] },
        { text: 'isFlagEnabled', slug: 'sdk/is-flag-enabled', children: [] },
        { text: 'onFlagLoads', slug: 'sdk/on-flag-loads', children: [] },
        { text: 'reloadFags', slug: 'sdk/reload-flags', children: [] },
        { text: 'getFeatureFlag', slug: 'sdk/get-feature-flag', children: [] },
        { text: 'getAllFeatureFlags', slug: 'sdk/get-all-feature-flags', children: [] },
        { text: 'clearPersistFlag', slug: 'sdk/clear-persist-flag', children: [] },
        { text: 'start', slug: 'sdk/start', children: [] },
        { text: 'stop', slug: 'sdk/stop', children: [] },
        { text: 'coldStart', slug: 'sdk/cold-start', children: [] },
        { text: 'startOfflineRecording', slug: 'sdk/start-offline-recording', children: [] },
        { text: 'uploadOfflineRecording', slug: 'sdk/upload-offline-recording', children: [] },
        { text: 'forceFlushBatch', slug: 'sdk/force-flush-batch', children: [] },
        { text: 'trackWs', slug: 'sdk/track-ws', children: [] },
      ]
    },
    {
      text: 'iOS SDK (beta)',
      slug: 'ios-sdk',
      icon: 'ios_app',
      children: [
        { text: 'Initialization', slug: 'ios-sdk/init', children: [] },
        { text: 'Modules', slug: 'ios-sdk/modules', children: [] },
        { text: 'Start', slug: 'ios-sdk/start', children: [] },
        { text: 'Capturing Inputs', slug: 'ios-sdk/inputs', children: [] },
        { text: 'Network', slug: 'ios-sdk/network', children: [] },
        { text: 'Events', slug: 'ios-sdk/event', children: [] },
        { text: 'Analytics', slug: 'ios-sdk/analytics', children: [] },
        { text: 'Sanitization', slug: 'ios-sdk/sanitization', children: [] },
        { text: 'setUserID', slug: 'ios-sdk/set-user-id', children: [] },
        { text: 'setMetadata', slug: 'ios-sdk/set-metadata', children: [] },
        { text: 'userAnonymousId', slug: 'ios-sdk/user-anonymous-id', children: [] },
      ]
    },
    {
      text: 'Android SDK (beta)',
      slug: 'android-sdk',
      icon: 'android_app',
      children: [
        { text: 'Initialization', slug: 'android-sdk/init', children: [] },
        { text: 'Modules', slug: 'android-sdk/modules', children: [] },
        { text: 'Start', slug: 'android-sdk/start', children: [] },
        { text: 'Capturing Inputs', slug: 'android-sdk/inputs', children: [] },
        { text: 'Network', slug: 'android-sdk/network', children: [] },
        { text: 'Events', slug: 'android-sdk/event', children: [] },
        { text: 'Analytics', slug: 'android-sdk/analytics', children: [] },
        { text: 'Sanitization', slug: 'android-sdk/sanitization', children: [] },
        { text: 'setUserID', slug: 'android-sdk/set-user-id', children: [] },
        { text: 'setMetadata', slug: 'android-sdk/set-metadata', children: [] },
        { text: 'userAnonymousId', slug: 'android-sdk/user-anonymous-id', children: [] },
      ]
    },
    {
      text: 'React Native SDK (beta)',
      slug: 'rn-sdk',
      icon: 'react-native_ios_app',
      children: [
        { text: 'Initialization', slug: 'rn-sdk/init', children: [] },
        { text: 'Modules', slug: 'rn-sdk/modules', children: [] },
        { text: 'startSession', slug: 'rn-sdk/start', children: [] },
        { text: 'Capturing Inputs', slug: 'rn-sdk/inputs', children: [] },
        { text: 'Events', slug: 'rn-sdk/event', children: [] },
        { text: 'Analytics', slug: 'rn-sdk/analytics', children: [] },
        { text: 'Sanitization', slug: 'rn-sdk/sanitization', children: [] },
        { text: 'setUserID', slug: 'rn-sdk/set-user-id', children: [] },
        { text: 'setMetadata', slug: 'rn-sdk/set-metadata', children: [] },
      ]
    },
    {
      text: 'OpenReplay CLI',
      slug: 'cli',
      icon: 'cli',
      hideChevron: true,
      children: []
    }
  ]
}

export default nav
