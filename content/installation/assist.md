---
title: "Assist"
metaTitle: "Assist"
metaDescription: "How to setup OpenReplay Assist and support your end users through live screen and WebRTC."
---

OpenReplay Assist allows you to support your users by seeing their live screen and instantly hopping on call (WebRTC) with them without requiring any 3rd-party screen sharing software.

## Installation

```bash
npm i @openreplay/tracker-assist
```

## Usage

Initialize the tracker then load the `@openreplay/tracker-assist` plugin.

### If your website is a Single Page Application (SPA)

```js
import Tracker from '@openreplay/tracker';
import trackerAssist from '@openreplay/tracker-assist';

const tracker = new Tracker({
  projectKey: PROJECT_KEY,
});
tracker.start();

tracker.use(trackerAssist(options)); // check the list of available options below
```

### If your web app is Server-Side-Rendered (SSR)

Follow the below example if your app is SSR. Ensure `tracker.start()` is called once the app is started (in `useEffect` or `componentDidMount`).

```js
import OpenReplay from '@openreplay/tracker/cjs';
import trackerFetch from '@openreplay/tracker-assist/cjs';

const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
const trackerAssist = tracker.use(trackerAssist(options)); // check the list of available options below

//...
function MyApp() {
  useEffect(() => { // use componentDidMount in case of React Class Component
    tracker.start();
  }, [])
//...
}
```

## Options

```js
trackerAssist({
  confirmText: string;
})
```

- `confirmText`: Customize the text that gets displayed in the calling popup.
