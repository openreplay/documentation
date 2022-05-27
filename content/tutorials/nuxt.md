---
title: "Using the Tracker with Nuxt"
metaTitle: "Adding the OpenReplay Tracker into your Next.js app"
metaDescription: "Learn how to get the tracker working on your Nuxt application"
---

Getting the tracker to work on a Next.js application is quite straightforward. Since Next.js works on top of React, the process is quite similar, the main difficulty comes from the Server Side Rendering capabilities of Next.js.

But once you understand how they work and how to structure your client-only code, you’ll be tracking your users in no time.

## Adding the tracking code

While you can get a copy&paste version of the code directly from the platform when you create a new project, that code is too barebone and might not follow the best practices expected by your team or company.

So instead, you can try to modularize the code provided like this:

```javascript
import Tracker from '@openreplay/tracker';
import {v4 as uuidV4} from 'uuid'

function defaultGetUserId() {
   return uuidV4() 
}

export function startTracker(config) {

    console.log("Starting tracker...")

    const getUserId = (config?.userIdEnabled && config?.getUserId) ? config.getUserId : defaultGetUserId
    let userId = null;

    const trackerConfig = {
        projectKey: config?.projectKey || process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY
    }

    const tracker = new Tracker(trackerConfig);

    if(config?.userIdEnabled) {
        userId = getUserId()
        tracker.setUserID(userId)
    }

    tracker.start();
    return {
        tracker,
        userId
    }
}
```

This function takes care of instantiating the Tracker and calling the `start` method, which is what get things going.

This function also takes on a “configuration” object that you can extend for future features. This example shows you how to enable, optionally, the ability to uniquely identify users. You can use a default UUID which would be unique for every user every time they visit the page. You can alternatively provide a custom `getUserId` function as part of the configuration. 

With your custom function, you could be providing the customer ID of your store, or the user’s email addressa or anything that uniquely identifies the user within your app. This way you can track their session replays across time in case they have a particular problem that others aren’t reporting.

### Handling the `projectKey` in your code

As a note, the `projectKey` that you configure is the one provided by OpenReplay’s platform. This value should not be stored hardcoded in your code for security reasons, but rather on some kind of configuration file/sytem.

For this example, I’m taking advantage of Next’s `.env` files. What you have to understand is that if you do not prefix the environmental variable with `NEXT_PUBLIC` your client-code (the tracker) will not have access to it. 

If this is not acceptable, you can use `getStaticProps` from within the first page that your users visit to get that value prior to instantiating the tracker. You can see both examples below.

## Using the tracker

With the code saved into a file, you can then use it like this:

```javascript
import { useEffect } from 'react'
import '../styles/globals.css'
import { startTracker } from '../utils/tracker'

function MyApp({ Component, pageProps }) {
  useEffect( () => {
    startTracker({
      userIdEnabled: true
    })
  }, [])
  
  return <Component {...pageProps} />
}
```

This is the `_app.js` file, which acts as the entrypoint for the entire application. The downside of doing this, is that Next doesn’t use `getStaticProps` for this file, thus you can’t access the env variable through that function. The only option you have is to use the prefix as shown above, or to [dynamically load the tracker](https://nextjs.org/docs/advanced-features/dynamic-import).

That said, you can also add the tracking code into the first page every user you want to track will visit (for example, your site’s home page). If you’re certain all your users will have to go through it, then you can do something like this:

```javascript
import { useEffect } from 'react'
import { startTracker } from '../utils/tracker'

export default function Page({projectKey}) {
    
    useEffect( () => {
        startTracker({
            userIdEnabled: true,
            projectKey: projectKey
        })
    }, [])
    
    
    return (
        <div >
          <!-- your HTML here -->
        </div>
        )
    }
    
    export function getStaticProps() {

        return {
            props: {
                projectKey: process.env.OPENREPLAY_PROJECT_KEY
            }
        }
    }
```

This time around, you’re using a server-side variable through the `getStaticProps`call. Once the tracker has started working, then the rest of your user’s session will be recorded.

This is a safer approach, since you’re not sharing secure data (the project’s key) with the client.

If you have any issues setting up the tracker on your Next-based project, please reach out to us on our [Slack community](https://slack.openreplay.com/) and ask our devs directly!