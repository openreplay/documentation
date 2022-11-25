---
title: "Zustand"
metaTitle: "Zustand"
metaDescription: "Zustand plugin for OpenReplay."
---

This plugin allows you to capture `Zustand` mutations/state and inspect them later on while replaying session recordings. This is very useful for understanding and fixing issues.

## Installation

```bash
npm i @openreplay/tracker-zustand
```

## Usage

Initialize the `@openreplay/tracker` package as usual and load the plugin into it. Call the plugin and to set up the store name, this will return a named store tracker instance which you can call with your store exemplar as an argument to enable tracking of this store.

### If your website is a Single Page Application (SPA)

```js
import Tracker from '@openreplay/tracker';
import trackerZustand from '@openreplay/tracker-zustand';
```

### If your web app is Server-Side-Rendered (SSR)

```js
import Tracker from '@openreplay/tracker/cjs';
import trackerZustand from '@openreplay/tracker-zustand/cjs';
```

### Tracking the Zustand Store

```js
import create from "zustand";

const tracker = new Tracker({
  projectKey: YOUR_PROJECT_KEY,
});

const zustandPlugin = tracker.use(trackerZustand())
// name is optional, randomly generated 
// string if its undefined
const bearStoreLogger = zustandPlugin('bear_store')


const useBearStore = create(
  bearStoreLogger((set: any) => ({
    bears: 0,
    increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
  }))
)
```

## Options

You can customize the plugin behavior with options to sanitize your data. They are similar to the ones from the standard `createLogger` plugin.

```js
trackerZustand({
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

## Troubleshooting

Having trouble setting up this plugin? please connect to our [Slack](https://slack.openreplay.com) and get help from our community.
