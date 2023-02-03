---
title: "Using OpenReplay with Nuxt"
metaTitle: "Adding the OpenReplay Tracker into your Nuxt.js app"
metaDescription: "Learn how to get the tracker working on your Nuxt application"
---
Getting the tracker to work on a Nuxt application is quite straightforward. 

## Adding the tracking code

While you can get a copy&paste version of the code directly from the platform when you create a new project, that code is too barebone and might not follow the best practices expected by your team or company.

So instead, you can try to modularize the code provided like this:

```jsx
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
        projectKey: config?.projectKey
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

This function takes care of instantiating the Tracker and calling the `start` method, which gets things going.

This function also takes on a “configuration” object that you can extend for future features. This example shows you how to enable, optionally, the ability to identify users uniquely. You can use a default UUID which would be unique for every user every time they visit the page. You can alternatively provide a custom `getUserId` function as part of the configuration. 

With your custom function, you could provide the customer ID of your store, the user’s email address, or anything that uniquely identifies the user within your app. This way, you can track their session replays across time in case they have a particular problem that others aren’t reporting.

In this example, the project’s key, which you can get from OpenReplay’s project UI, it’s expected to be passed inside the `config` object on the `projectKey` key.

## Writing a client-only plugin

To use this `startTracker` function, you’ll want to create a client-only plugin inside the `plugins` directory of your Nuxt project.

Make sure you add the `.client` suffix to the name of your plugin’s file. That is to make sure that Nuxt only loads it on the client.

The plugin’s code could look like this:

```jsx
import {startTracker} from '../utils/tracker'

export default defineNuxtPlugin( (nuxtApp) => {
    
    return {
        provide: {
            startTracking: () => {
                let config = useRuntimeConfig().public
                
                let {userId} = startTracker({
                    userIdEnabled: true,
                    projectKey: config.openreplayProjectKey
                })
                //Optional if you need it
                let uid = useUserId()
                uid.value = userId
            }
        }
    }
})
```

If you’d like to read more about creating Nuxt plugins, you can check out [their documentation](https://v3.nuxtjs.org/guide/directory-structure/plugins).

Now, this plugin provides a function called `startTracking`, which takes care of calling the `startTracker` function we defined before. But most importantly, inside the plugin’s code, you can get the environment variable where you’ve stored the project’s key. Remember, this information should not be hard-coded inside your project for security reasons.

Through the `useRuntimeConfig` function, you can access the public env variables. In this example, I’m accessing `openreplayProjectKey`which is defined as `NUXT_PUBLIC_OPENREPLAY_PROJECT_KEY`. 

💡 **Notice** the `NUXT_PUBLIC` prefix, this makes sure that Nuxt shares the variable with the front-end; otherwise, it’ll only be accessible to your back-end only code.

The above example also shows you how to use the returned user ID value with a composable to share the value between components. Those two lines are entirely optional.

## Using the tracker

With the plugin saved into a file, you can then use it like this from your `app.vue` file.

```jsx
<script setup>
onMounted( () => {
  const {$startTracking} = useNuxtApp()
  $startTracking()
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
```

Make sure you call the tracker after the mounted event has been triggered. You can do this with the `onMounted` composable.

After this, the tracker should start sending data to the platform once deployed.
## Do you have questions?

For the **full code** of a working Nuxt-based application, you can check out [this repository](https://github.com/deleteman/openreplay-nuxt-example).

If you have any issues setting up the tracker on your Nuxt-based project, please reach out to us on our [Slack community](https://slack.openreplay.com/) and ask our devs directly!