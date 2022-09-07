---
title: "VueX"
metaTitle: "VueX"
metaDescription: "VueX plugin for OpenReplay."
---

This plugin allows you to capture `VueX` **and** `Pinia` mutations/state and inspect them later on while replaying session recordings. This is very useful for understanding and fixing issues.

## Installation
```bash
npm i @openreplay/tracker-vuex
```

## Usage
Initialize the `@openreplay/tracker` package as usual and load the plugin into it. Then put the generated plugin into your `plugins` field of your store.

### If your website is a Single Page Application (SPA)

```js
import Vuex from 'vuex'
import OpenReplay from '@openreplay/tracker';
import trackerVuex from '@openreplay/tracker-vuex';
//...
const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
```
**tracker-vuex version 4.0.0:**

```js
const vuexPlugin = tracker.use(trackerVuex(<options>));  // check list of available options below
const storeTracker = vuexPlugin('STORE NAME') // add a name to your store, optional (will be randomly generated otherwise)

const store = createStore({
  state,
  mutations,
  plugins: [storeTracker]
})
```

**tracker-vuex version 3.0.0:**

```js
const vuexPlugin = tracker.use(trackerVuex(<options>));  // check list of available options below

tracker.start();

const store = new Vuex.Store({
  //...
  plugins: [vuexPlugin],
});
```

### If your web app is Server-Side-Rendered (SSR)

Follow the below example if your app is SSR. Ensure `tracker.start()` is called once the app is started (in `useEffect` or `componentDidMount`).

```js
import Vuex from 'vuex'
import OpenReplay from '@openreplay/tracker/cjs';
import trackerVuex from '@openreplay/tracker-vuex/cjs';
//...
const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
```
**tracker-vuex version 4.0.0:**

```js
const vuexPlugin = tracker.use(trackerVuex(<options>));  // check list of available options below
const storeTracker = vuexPlugin('STORE NAME') // add a name to your store, optional (will be randomly generated otherwise)

const store = createStore({
  state,
  mutations,
  plugins: [storeTracker]
})
```

**tracker-vuex version 3.0.0:**

```js
const vuexPlugin = tracker.use(trackerVuex(<options>));  // check list of available options below

tracker.start();

const store = new Vuex.Store({
  //...
  plugins: [vuexPlugin],
});
```

## Pinia support

SPA
```js
import OpenReplay from '@openreplay/tracker';
import trackerVuex from '@openreplay/tracker-vuex';
```

SSR App
```js
import OpenReplay from '@openreplay/tracker/cjs';
import trackerVuex from '@openreplay/tracker-vuex/cjs';
```

```js
//...

const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
  // ... options
});

// ...

const examplePiniaStore = useExamplePiniaStore()
const vuexPlugin = tracker.use(trackerVuex(<options>))

const piniaStorePlugin = vuexPlugin('STORE NAME') // add a name to your store, optional (will be randomly generated otherwise)
piniaStorePlugin(examplePiniaStore)

// ... use examplePiniaStore as usual (destructure values or return it as a whole etc)

```

## Options

You can customize the plugin behavior with options to sanitize your data. They are similar to the ones from the standard `createLogger` plugin.

```js
trackerVuex({
  filter (mutation, state) {
    // returns `true` if a mutation should be logged
    // `mutation` is a `{ type, payload }`
    return mutation.type !== "aBlacklistedMutation";
  },
  transformer (state) {
    // transforms the state before logging it.
    // for example return only a specific sub-tree
    return state.subTree;
  },
  mutationTransformer (mutation) {
    // mutations are logged in the format of `{ type, payload }`
    // we can format it any way we want.
    return mutation.type;
  },
})
```
## Tutorial
If you're looking for a practical example of how to use this plugin to capture state changes in your session replays, check out [our detailed tutorial over here](/tutorials/vuex).

## Troubleshooting

Having trouble setting up this plugin? please connect to our [Slack](https://slack.openreplay.com) and get help from our community.
