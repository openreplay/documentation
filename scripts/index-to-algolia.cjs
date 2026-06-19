const algoliasearch = require('algoliasearch')
const {readFile} = require('fs')
const dotenv = require('dotenv')

dotenv.config()

// API keys below contain actual values tied to your Algolia account
const client = algoliasearch(process.env.PUBLIC_ALGOLIA_KEY, process.env.ALGOLIA_ADMIN_SECRET);
const index = client.initIndex(process.env.PUBLIC_ALGOLIA_INDEX);

readFile(__dirname + '/../public/search-index.json', (err, data) => {
    if(err) {
        console.error("Error reading JSON index file: ")
        console.error(err)
        return 1;
    }
    try {
        const jsonData = JSON.parse(data.toString())
        let objects = []

        jsonData.forEach( page => {
            objects.push({
                objectID: page.slug,
                title: page.title,
                hierarchy: { lvl0: page.title, lvl1: page.title},
                version: page.version,
                lang: page.lang,
                excerpt: page.excerpt,
                slug: page.slug,
                body: page.body
            })
        })
        // replaceAllObjects atomically replaces the ENTIRE index with the current
        // build's objects (temp index + atomic move, batching handled internally).
        // Records for pages that no longer exist — e.g. old slug formats left over
        // from earlier deploys — are dropped instead of lingering forever.
        // saveObjects() only added/updated and never deleted, which is what left
        // stale duplicates in the index.
        index.replaceAllObjects(objects, { safe: true })
            .then( ({objectIDs}) => {
                console.log(objectIDs.length, " elements indexed (index fully replaced)")
                console.log("Process done")
            }).catch( err => {
                console.log(err)
                console.log(err.transporterStackTrace)
            })
    } catch (e) {
        console.error("Error parsing index JSON data")
        console.error(e)
    }
})