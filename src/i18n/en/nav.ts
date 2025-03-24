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
      text: 'Intro',
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
      children: [
        // { text: 'OpenReplay Serverless', slug: 'getting-started/serverless', children: [] },
        // { text: 'OpenReplay Dedicated', slug: 'getting-started/dedicated', children: [] },
        // { text: 'OpenReplay Self-Host', slug: 'getting-started/self-host', children: [] },
      ]
    },
    {
      text: 'Deployment',
      slug: null,
      icon: 'null',
      hideChevron: true,
      children: [],
      isSectionTitle: true
    },
    {
      text: 'Deployment',
      slug: 'deployment/',
      icon: 'deployment',
      children: [
        { text: 'Overview', slug: 'deployment/', children: [] },
        { text: 'Cloud Providers', slug: null, children: [
          { text: 'Deploy to AWS', slug: 'deployment/deploy-aws', children: [] },
          { text: 'Deploy to Azure', slug: 'deployment/deploy-azure', children: [] },
          { text: 'Deploy to GCP', slug: 'deployment/deploy-gcp', children: [] },
          { text: 'Deploy to Digital Ocean', slug: 'deployment/deploy-digitalocean', children: [] },
          { text: 'Deploy to OVHCloud', slug: 'deployment/deploy-ovhcloud', children: [] },
          { text: 'Deploy to Scaleway', slug: 'deployment/deploy-scaleway', children: [] }
        ] },
        { text: 'Self-Hosting', slug: null, children: [
          { text: 'Deploy to Kubernetes', slug: 'deployment/deploy-kubernetes', children: [] },
          { text: 'Deploy to Docker', slug: 'deployment/deploy-docker', children: [] },
          { text: 'Deploy to Ubuntu', slug: 'deployment/deploy-ubuntu', children: [] }
        ] },
        { text: 'Deploy from Source', slug: 'deployment/deploy-source', children: [] },
        { text: 'Maintenance', slug: null, children: [
          { text: 'OpenReplay CLI', slug: 'deployment/openreplay-admin', children: []},
          { text: 'Upgrade Deployment', slug: 'deployment/upgrade', children: [] }
        ] },
        { text: 'Installation', slug: null, children: [
          { text: 'Setup OpenReplay', slug: 'deployment/setup-or', children: [] },
          { text: 'Upload Source Maps', slug: 'deployment/upload-sourcemaps', children: [] },
        ] },
        { text: 'Administration', slug: null, children: [
          { text: 'Team Management', slug: 'deployment/invite-team-members', children: [] },
          { text: 'Roles and Access', slug: 'deployment/roles-and-access', children: [] }
        ] },
        { text: 'Tracker Compatibility', slug: 'deployment/compatibility', children: [] },
        
      ]
    },
    {
      text: 'Configuration',
      slug: 'configuration/',
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
      text: 'SDKs',
      slug: null,
      icon: 'null',
      hideChevron: true,
      children: [],
      isSectionTitle: true
    },
    {
      text: 'JavaScript',
      slug: 'sdk',
      icon: 'sdk',
      children: [
        { text: 'Overview', slug: 'sdk', children: [] },
        { text: 'Initialization', slug: 'sdk/constructor', children: [] },
        { text: 'Methods', slug: 'sdk/methods', children: [
          { text: 'event', slug: 'sdk/methods/event' },
          { text: 'getSessionToken', slug: 'sdk/methods/get-session-token', children: [] },
          { text: 'getSessionID', slug: 'sdk/methods/get-session-id', children: [] },
          { text: 'getSessionURL', slug: 'sdk/methods/get-session-url', children: [] },
          { text: 'handleError', slug: 'sdk/methods/handle-error', children: [] },
          { text: 'isActive', slug: 'sdk/methods/is-active', children: [] },
          { text: 'issue', slug: 'sdk/methods/issue', children: [] },
          { text: 'setUserID', slug: 'sdk/methods/set-user-id', children: [] },
          { text: 'setUserAnonymousID', slug: 'sdk/methods/set-user-anonymous-id', children: [] },
          { text: 'setMetadata', slug: 'sdk/methods/set-metadata', children: [] },
          { text: 'isFlagEnabled', slug: 'sdk/methods/is-flag-enabled', children: [] },
          { text: 'reloadFags', slug: 'sdk/methods/reload-flags', children: [] },
          { text: 'getFeatureFlag', slug: 'sdk/methods/get-feature-flag', children: [] },
          { text: 'getAllFeatureFlags', slug: 'sdk/methods/get-all-feature-flags', children: [] },
          { text: 'clearPersistFlag', slug: 'sdk/methods/clear-persist-flag', children: [] },
          { text: 'start', slug: 'sdk/methods/start', children: [] },
          { text: 'stop', slug: 'sdk/methods/stop', children: [] },
          { text: 'coldStart', slug: 'sdk/methods/cold-start', children: [] },
          { text: 'startOfflineRecording', slug: 'sdk/methods/start-offline-recording', children: [] },
          { text: 'uploadOfflineRecording', slug: 'sdk/methods/upload-offline-recording', children: [] },
          { text: 'forceFlushBatch', slug: 'sdk/methods/force-flush-batch', children: [] },
          { text: 'trackWs', slug: 'sdk/methods/track-ws', children: [] }, 
        ] },
        { text: 'Network Options', slug: 'sdk/network-options', children: [] },
        { text: 'Sanitize Data', slug: 'sdk/sanitize-data', children: [] },
        { text: 'Private Mode', slug: 'sdk/private-mode', children: [] },
        { text: 'Frameworks', slug: 'sdk/using-or/', children: [
          { text: 'Overview', slug: 'sdk/using-or/', children: [] },
          { text: 'React', slug: 'sdk/using-or/react', children: [] },
          { text: 'Vue', slug: 'sdk/using-or/vue', children: [] },
          { text: 'Next.js', slug: 'sdk/using-or/next', children: [] },
          { text: 'Nuxt', slug: 'sdk/using-or/nuxt', children: [] },
          { text: 'Remix', slug: 'sdk/using-or/remix', children: [] },
          { text: 'Svelte', slug: 'sdk/using-or/svelte', children: [] },
          { text: 'Angular', slug: 'sdk/using-or/angular', children: [] },
          { text: 'Gatsby', slug: 'sdk/using-or/gatsby', children: [] },  
        ] },
      ]
    },
    {
      text: 'iOS (beta)',
      slug: 'ios-sdk',
      icon: 'ios_app',
      children: [
        { text: 'Initialization', slug: 'ios-sdk/init', children: [] },
        { text: 'Modules', slug: 'ios-sdk/modules', children: [] },
        { text: 'Methods', slug: 'ios-sdk/methods', children: [
          { text: 'event', slug: 'ios-sdk/methods/event' , children: []},
          { text: 'setUserID', slug: 'ios-sdk/methods/set-user-id', children: [] },
          { text: 'userAnonymousID', slug: 'ios-sdk/methods/user-anonymous-id', children: [] },
          { text: 'setMetadata', slug: 'ios-sdk/methods/set-metadata', children: [] },
          { text: 'start', slug: 'ios-sdk/methods/start', children: [] },
          { text: 'stop', slug: 'ios-sdk/methods/stop', children: [] },
        ] },
        { text: 'Inputs', slug: 'ios-sdk/inputs', children: [] },     
        { text: 'Network Options', slug: 'ios-sdk/network', children: [] },
        { text: 'Sanitize Data', slug: 'ios-sdk/sanitization', children: [] },
      ]
    },
    {
      text: 'Android (beta)',
      slug: 'android-sdk',
      icon: 'android_app',
      children: [
        { text: 'Initialization', slug: 'android-sdk/init', children: [] },
        { text: 'Modules', slug: 'android-sdk/modules', children: [] },
        { text: 'Methods', slug: 'android-sdk/methods', children: [
          { text: 'event', slug: 'android-sdk/methods/event' , children: []},
          { text: 'setUserID', slug: 'android-sdk/methods/set-user-id', children: [] },
          { text: 'userAnonymousID', slug: 'android-sdk/methods/user-anonymous-id', children: [] },
          { text: 'setMetadata', slug: 'android-sdk/methods/set-metadata', children: [] },
          { text: 'start', slug: 'android-sdk/methods/start', children: [] },
        ] },
        { text: 'Inputs', slug: 'android-sdk/inputs', children: [] },        
        { text: 'Network Options', slug: 'android-sdk/network', children: [] },
        { text: 'Sanitize Data', slug: 'android-sdk/sanitization', children: [] },
      ]
    },
    {
      text: 'React Native (beta)',
      slug: 'rn-sdk',
      icon: 'react-native_ios_app',
      children: [
        { text: 'Initialization', slug: 'rn-sdk/init', children: [] },
        { text: 'Modules', slug: 'rn-sdk/modules', children: [] },
        { text: 'Methods', slug: 'rn-sdk/methods', children: [
          { text: 'event', slug: 'rn-sdk/methods/event' , children: []},
          { text: 'setUserID', slug: 'rn-sdk/methods/set-user-id', children: [] },
          { text: 'userAnonymousID', slug: 'rn-sdk/methods/user-anonymous-id', children: [] },
          { text: 'setMetadata', slug: 'rn-sdk/methods/set-metadata', children: [] },
          { text: 'start', slug: 'rn-sdk/methods/start', children: [] },
          { text: 'patchNetwork', slug: 'rn-sdk/methods/patch-network', children: [] },
        ] },
        { text: 'Inputs', slug: 'rn-sdk/inputs', children: [] },        
        { text: 'Network Options', slug: 'rn-sdk/network', children: [] },
        { text: 'Sanitize Data', slug: 'rn-sdk/sanitization', children: [] },
      ]
    },
    {
      text: 'Products',
      slug: null,
      icon: 'null',
      hideChevron: true,
      children: [],
      isSectionTitle: true
    },
    {
      text: 'Session Replay',
      slug: 'session-replay',
      icon: 'session-replay',
      children: [
        { text: 'Overview', slug: 'session-replay', children: [] },
        { text: 'Guides', slug: null, children: [ 
          { text: 'Omnisearch', slug: 'session-replay/omnisearch', children: [] },
          { text: 'Highlights', slug: 'session-replay/highlights', children: [] },
          { text: 'Session to E2E Test', slug: 'session-replay/generate-e2e-test', children: [] },
        ] 
        },
        { text: 'Advanced Setup', slug: null, children: [
          { text: 'Identify a User', slug: 'session-replay/identify-user', children: [] },
          { text: 'Send Metadata', slug: 'session-replay/metadata', children: [] },
          { text: 'Canvas and WebGL', slug: 'session-replay/canvas', children: [] },
          { text: 'Cross-domain iFrames', slug: 'session-replay/crossdomain-iframe', children: [] },
          { text: 'WebSockets', slug: 'session-replay/websockets', children: [] },
          { text: 'Error Tracking', slug: 'session-replay/error-reporting', children: [] },
        ] 
        },
      ]
    },
    {
      text: 'Product Analytics',
      slug: 'product-analytics',
      icon: 'product-analytics',
      children: [
        { text: 'Overview', slug: 'product-analytics', children: [] },
        { text: 'Guides', slug: null, children: [
          { text: 'Trends', slug: 'product-analytics/trends', children: [] },
          { text: 'Funnels', slug: 'product-analytics/funnels', children: [] },
          { text: 'Journeys', slug: 'product-analytics/journeys', children: [] },
          { text: 'Heatmaps', slug: 'product-analytics/heatmaps', children: [] },
          { text: 'Dashboards', slug: 'product-analytics/dashboards', children: [] },
          { text: 'Web Analytics', slug: 'product-analytics/web-analytics', children: [] },
          { text: 'Monitors', slug: 'product-analytics/monitors', children: [] },
        ]
        },
        { text: 'Advanced Setup', slug: null, children: [
          { text: 'Custom Events', slug: 'product-analytics/custom-events', children: [] }
        ] 
        },
      ]
    },
    {
      text: 'Co-browsing', slug: 'co-browsing', icon: 'co-browsing', children: []
    },
    {
      text: 'Platform',
      slug: null,
      icon: 'null',
      hideChevron: true,
      children: [],
      isSectionTitle: true
    },
    {
      text: 'AI',
      slug: 'ai',
      icon: 'ai',
      children: [
        { text: 'Overview', slug: 'ai', children: [] },
        { text: 'Summary AI ', slug: 'ai/summary-ai', children: [] },
        { text: 'Similar Sessions', slug: 'ai/similar-sessions', children: [] },
        { text: 'Explain AI', slug: 'ai/explain-ai', children: [] },
        { text: 'Smart Search', slug: 'ai/smart-search', children: [] },
        { text: 'Clips', slug: 'ai/clips', children: [] },
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
      text: 'Spot (Chrome Extension)', 
      slug: 'spot',
      icon: 'chrome_extension:_openreplay_spot',
      hideChevron: true,
      children: [] 
    },
    {
      text: 'Materials',
      slug: null,
      icon: 'null',
      hideChevron: true,
      children: [],
      isSectionTitle: true
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
      text: 'Tutorials',
      slug: null,
      icon: 'tutorials',
      children: [
        { text: 'Assist', slug: 'tutorials/assist', children: [] },
        { text: 'Build Plugins', slug: 'tutorials/build-plugins', children: [] },
        { text: 'Custom Events', slug: 'tutorials/custom-events', children: [] },
        { text: 'Capture and Sanitize', slug: 'tutorials/capture-request', children: [] },
        { text: 'GraphQL', slug: 'tutorials/graphql', children: [] },
        { text: 'Metadata', slug: 'tutorials/metadata', children: [] },
        { text: 'Redux', slug: 'tutorials/redux', children: [] },
        { text: 'VueX', slug: 'tutorials/vuex', children: [] },
        { text: 'Zustand', slug: 'tutorials/zustand', children: [] },
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
