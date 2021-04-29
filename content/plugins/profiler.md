---
title: "Profiler"
metaTitle: "Profiler"
metaDescription: "Profiler plugin for OpenReplay."
---

The profiler plugin allows you to measure your JS functions' performance and capture both arguments and result for each function call.

## Installation

```bash
npm i @openreplay/tracker-profiler --save
```

## Usage

Initialize the tracker and load the plugin into it. Then decorate any function inside your code with the generated function.

### If your website is a Single Page Application (SPA)

```js
import OpenReplay from '@openreplay/tracker';
import trackerProfiler from '@openreplay/tracker-profiler';
//...
const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
tracker.start();
//...
export const profiler = tracker.use(trackerProfiler());
//...
const fn = profiler('call_name')(() => {
//...
}, thisArg); // thisArg is optional
```

### If your web app is Server-Side-Rendered (SSR)

Follow the below example if your app is SSR. Ensure `tracker.start()` is called once the app is started (in `useEffect` or `componentDidMount`).

```js
import OpenReplay from '@openreplay/tracker/cjs';
import trackerProfiler from '@openreplay/tracker-profiler/cjs';
//...
const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
//...
function SomeFunctionalComponent() {
  useEffect(() => { // or componentDidMount in case of Class approach
    tracker.start();
  }, [])
//...
export const profiler = tracker.use(trackerProfiler());
//...
const fn = profiler('call_name')(() => {
  //...
  }, thisArg); // thisArg is optional
}
```
