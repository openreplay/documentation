const config = {
	"gatsby": {
		"pathPrefix": "",
		"siteUrl": "https://docs.openreplay.com",
		"gaTrackingId": "UA-173932112-2",
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
			"algoliaAppId": "U4QCXPQXGS",
			"algoliaSearchKey": "2a3ef939829cab2c44515086f080f879",
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/",
			"/deployment",
			"/installation",
			"/configuration",
			"/tutorials", // add trailing slash if enabled above
    		"/plugins",
			"/api",
			"/integrations",
			"/troubleshooting",
			"/structure"
		],
		"versionedNavOrder": [
			"/<VERSION>/index",
			"/<VERSION>/deployment",
			"/<VERSION>/installation",
			"/<VERSION>/configuration",
			"/<VERSION>/tutorials", // add trailing slash if enabled above
    		"/<VERSION>/plugins",
			"/<VERSION>/api",
			"/<VERSION>/integrations",
			"/<VERSION>/troubleshooting",
			"/<VERSION>/structure"
		],
		"collapsedNav": [
				"/deployment",
				"/installation",
				"/configuration",
				"/tutorials",
				"/plugins",
				"/api",
				"/integrations",
				"/troubleshooting",
				"/structure"
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
					src: "static/media/favicon.png",
					sizes: `512x512`,
					type: `image/png`,
				},
			],
		},
	}
};

module.exports = config;
