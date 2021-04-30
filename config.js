const config = {
	"gatsby": {
		"pathPrefix": "",
		"siteUrl": "https://docs.openreplay.com",
		"gaTrackingId": process.env.GA_TRACKING_ID,
		"trailingSlash": false
	},
	"header": {
		"logo": "",
		"logoLink": "https://openreplay.com",
		"title": "OpenReplay Docs",
		"githubUrl": "https://github.com/openreplay/documentation",
		"helpUrl": "https://github.com/openreplay/documentation",
		"tweetText": "",
		"links": [{ link:  "", text: "" }],
		"social": {
			"github": "https://github.com/openreplay/openreplay",
			"twitter": "https://twitter.com/OpenReplayHQ",
			"linkedin": "https://www.linkedin.com/company/18257552",
		},
		"search": {
			"enabled": true,
			"indexName": "docs",
			"algoliaAppId": process.env.ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/index",
			"/deployment",
			"/installation",
			"/configuration", // add trailing slash if enabled above
    	"/plugins",
			"/integrations",
			"/troubleshooting"
		],
    "collapsedNav": [
			"/deployment",
			"/installation",
			"/configuration",
			"/plugins",
			"/integrations",
			"/troubleshooting"
    ],
		"frontLine": false,
		"ignoreIndex": false,
	},
	"siteMetadata": {
		"title": "OpenReplay Documentation",
		"description": "The one stop location for tutorials, guides, and information about OpenReplay.",
		"ogImage": "https://docs.openreplay.com/static/og_image.png",
		"ogSiteName": "OpenReplay",
		"docsLocation": "https://github.com/openreplay/documentation",
		"favicon": "https://docs.openreplay.com/static/favicon.png"
	},
	"pwa": {
		"enabled": false, // disabling this will also remove the existing service worker.
		"manifest": {
			"name": "OpenReplay Documentation",
			"short_name": "OpenReplay Docs",
			"start_url": "/",
			"background_color": "#6b37bf",
			"theme_color": "#6b37bf",
			"display": "standalone",
			"crossOrigin": "use-credentials",
			icons: [
				{
					src: "static/favicon.png",
					sizes: `512x512`,
					type: `image/png`,
				},
			],
		},
	}
};

module.exports = config;
