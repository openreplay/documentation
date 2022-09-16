---
title: "Pinia"
metaTitle: "Pinia"
metaDescription: "Pinia plugin for OpenReplay."
---

This plugin allows you to capture `Pinia` mutations/state and inspect them later on while replaying session recordings. This is very useful for understanding and fixing issues.

## Installation

```bash
npm i @openreplay/tracker-vuex
```

## Usage

Initialize the `@openreplay/tracker` package as usual and load the plugin into it. Call the plugin and to set up the store name, this will return a named store tracker instance which you can call with your store exemplar as an argument to enable tracking of this store.

### If your website is a Single Page Application (SPA)

```js
import OpenReplay from '@openreplay/tracker';
import trackerVuex from '@openreplay/tracker-vuex';
```

### If your web app is Server-Side-Rendered (SSR)

```js
import OpenReplay from '@openreplay/tracker/cjs';
import trackerVuex from '@openreplay/tracker-vuex/cjs';
```

### Tracking the Pinia Store

```js

//...

const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
  // ... options
});

// ...

const examplePiniaStore = useExamplePiniaStore()
const vuexPlugin = tracker.use(trackerVuex(<options>)) // check list of available options below

const piniaStorePlugin = vuexPlugin('STORE NAME') // add a name to your store, 
                                                  // optional (will be randomly generated otherwise)
piniaStorePlugin(examplePiniaStore) // start tracking state updates

// now you can use examplePiniaStore as usual pinia store (destructure values or return it as a whole etc)
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

Having trouble setting up this plugin? Please connect to our [Slack](https://slack.openreplay.com) and get help from our community.
