---
title: "MobX"
metaTitle: "MobX"
metaDescription: "MobX plugin for OpenReplay."
---

This plugin allows you to capture `MobX` mutations and inspect them later on while replaying session recordings. This is useful for understanding and fixing issues. 


## Installation

```bash
npm i @openreplay/tracker-mobx
```

## Usage

Initialize the `@openreplay/tracker` package as usual and load the plugin into it.
Then use returned value to track MobX obervables.

```js
import { observable } from 'mobx';
import Tracker from '@openreplay/tracker';
import trackerMobX from '@openreplay/tracker-mobx';

const tracker = new Tracker({
  projectKey: YOUR_PROJECT_KEY,
});

const observe = tracker.plugin(trackerMobX());

const myArray = observable(['foo', 'bar', 42]);
observe(myArray);


myArray.push("Hello world"); // This mutation will be tracked
```

## Troubleshooting

Having trouble setting up this plugin? Please connect to our [Slack](https://slack.openreplay.com) and get help from our community.