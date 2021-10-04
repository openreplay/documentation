---
title: "MobX"
metaTitle: "MobX"
metaDescription: "MobX plugin for OpenReplay."
---

This plugin allows you to capture `MobX` events and inspect them later on while replaying session recordings. This is very useful for understanding and fixing issues. At this moment, we support `MobX` up to v4.

## Installation

```bash
npm i @openreplay/tracker-mobx
```

## Usage

Initialize the `@openreplay/tracker` package as usual and load the plugin into it. Then put the generated middleware into your Redux chain.

### If your website is a Single Page Application (SPA)

```js
import OpenReplay from '@openreplay/tracker';
import trackerMobX from '@openreplay/tracker-mobx';
//...
const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
tracker.use(trackerMobX(<options>)); // check list of available options below
tracker.start();
```

### If your web app is Server-Side-Rendered (SSR)

Follow the below example if your app is SSR. Ensure `tracker.start()` is called once the app is started (in `useEffect` or `componentDidMount`).

```js
import OpenReplay from '@openreplay/tracker/cjs';
import trackerMobX from '@openreplay/tracker-mobx/cjs';
//...
const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
tracker.use(trackerMobX(<options>)); // check list of available options below
//...
function MyApp() {
  useEffect(() => { // use componentDidMount in case of React Class Component
    tracker.start();
  }, [])
}
```

## Options

This plugin is inspired by [mobx-logger](https://github.com/winterbe/mobx-logger), hence it has a similar configuration. The default configuration is as follows:

```js
trackerMobX({
  action: true,
  reaction: true,
  transaction: true,
  compute: true
})
```

You can disable logging for actions and computed properties by providing a static `trackerMobXConfig`. This is useful to protect the private user data and keep your logs clean. Here's an example of how to disable logging for all actions and computed properties for a given class.

```js
class MyModel {
  static trackerMobXConfig: {
    enabled: false
  };

  //...
}
```

Alternatively you can disable logging for particular class methods.

```js
class MyStore {
  static trackerMobXConfig: {
    methods: {
      myAction: false
    }
  };

  @action myAction() {
  // calls to this method won't be logged
  }
}
```

You can combine the above examples to whitelist certain actions for being logged.

```js
class MyStore {
  static trackerMobXConfig: {
    enabled: false,
    methods: {
      myAction: true
    }
  };

  @action myAction() {
    // only calls to this method are being logged
  }
  //...
  // other methods won't be logged...
}
```

**Note:** At this point `trackerMobXConfig` is only available for actions (`@action`) and computed properties (`@computed`).

## Troubleshooting

Having trouble setting up this plugin? please connect to our [Slack](https://slack.openreplay.com) and get help from our community.