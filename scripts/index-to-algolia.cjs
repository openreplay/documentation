const algoliasearch = require('algoliasearch')
const {readFile} = require('fs')
const dotenv = require('dotenv')

dotenv.config()

console.log(process.env)

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
            console.log("Trying to index ", page.slug)
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
        const chunkSize = 500;
        for (let i = 0; i < objects.length; i += chunkSize) {
            const chunk = objects.slice(i, i + chunkSize);
            // do wher
            index.saveObjects(chunk)
            .then( ({objectIDs}) => {
                console.log(objectIDs.length, " elements indexed")
            }).catch( err => {
                console.log(err)
                console.log(err.transporterStackTrace)
            })
        }    
            
            

        console.log("Process done")

    } catch (e) {
        console.error("Error parsing index JSON data")
        console.error(e)
    }
})