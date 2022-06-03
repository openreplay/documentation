---
title: "Using the Tracker with Next.js"
metaTitle: "Adding the OpenReplay Tracker to your Next.js application"
metaDescription: "Learn how to get the tracker working on your Next.js application"
---
Getting the tracker to work on a Next.js application is quite straightforward. Since Next.js works on top of React, the process is quite similar, the main difficulty comes from the Server Side Rendering capabilities of Next.js.

But once you understand how they work and how to structure your client-only code, you’ll be tracking your users in no time.

## Adding the tracking code

While you can get a copy&paste version of the code directly from the platform when you create a new project, that code is too barebone and might not follow the best practices expected by your team or company.

So instead, you can create a Context Provider that allows all components wrapped by it, to start the tracking process:

```jsx
import { createContext } from "react"
import Tracker from '@openreplay/tracker';
import {v4 as uuidV4} from 'uuid'
import { useReducer } from "react"

export const TrackerContext = createContext()

function defaultGetUserId() {
   return uuidV4() 
}

function newTracker(config) {
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
    return tracker

}

function reducer(state, action) {
        switch(action.type) {
            case 'init': {
                if(!state.tracker) {
                    console.log("Instantiaing the tracker for the first time...")
                    return {...state, tracker: newTracker(state.config)}
                }
                return state
            }
            case 'start': {
                console.log("Starting tracker...")
                state.tracker.start()
                return state
            }
        }
    }

export default function TrackerProvider({children, config}) {
    let [state, dispatch] = useReducer(reducer, {tracker: null, config})
    let value = {
        startTracking: () => dispatch({type: 'start'}),
        initTracker: () => dispatch({type: 'init'})
    }

    return <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>
}
```

This provider makes 2 methods available to the user:

- `initTracker`: which instantiates the tracker with the provided configuration.
- `startTracking`: which triggers the start of the tracking process.

This provider also takes on a “configuration” object that you can extend for future features. This example shows you how to enable, optionally, the ability to uniquely identify users. You can use a default UUID which would be unique for every user every time they visit the page. You can alternatively provide a custom `getUserId` function as part of the configuration. 

With your custom function, you could be providing the customer ID of your store, or the user’s email addressa or anything that uniquely identifies the user within your app. This way you can track their session replays across time in case they have a particular problem that others aren’t reporting.

💡**A note for self-hosted users**: if you’re using the self-hosted version of OpenReplay, you’ll also have to specify the `ingestPoint` configuration property. This property specifies the ingestion endpoint for the tracker’s data. Cloud users don’t need this, because by default the tracker will now where the SaaS version of this endpoint is, but if you’re self-hosting it, you’ll need to specify it (it should be something like `https://openreplay.mydomain.com/ingest`) 

### Handling the `projectKey` in your code

As a note, the `projectKey` that you configure is the one provided by OpenReplay’s platform. This value should not be stored hardcoded in your code for security reasons, but rather on some kind of configuration file/sytem.

For this example, I’m taking advantage of Next’s `.env` files. What you have to understand is that if you do not prefix the environmental variable with `NEXT_PUBLIC` your client-code (the tracker) will not have access to it. 

If this is not acceptable, you can use `getStaticProps` from within the first page that your users visit to get that value prior to instantiating the tracker. You can see both examples below.

## Using the tracker context

Import and wrap your application with the `TrackerProvider` we created before, like this:

```jsx
import '../styles/globals.css'
import TrackerProvider from '../context/trackerContext'

function MyApp({ Component, pageProps }) {

  return <TrackerProvider>
        <Component {...pageProps} />
    </TrackerProvider>
}

export default MyApp
```

This is the `_app.js` file, which acts as the entrypoint for the entire application.  

And then, you can trigger the tracking from whatever component you wish, like so:

```jsx
import { useContext, useEffect } from 'react'
import { TrackerContext } from '../context/trackerContext'
import styles from '../styles/Home.module.css'

export default function YourComponent({projectKey}) {
    
    const {initTracker, startTracking} = useContext(TrackerContext)
    
    useEffect( () => {
       initTracker()
       startTracking()
    }, [])
//.... rest of your code
}
```

If you don’t need as much control, you can join both, the “init message” and the “start tracking message”, so that you only need to call a single function to get the tracking going.

If you have any issues setting up the tracker on your Next-based project, please reach out to us on our [Slack community](https://slack.openreplay.com/) and ask our devs directly!
