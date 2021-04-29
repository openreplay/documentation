---
title: "JavaScript SDK"
metaTitle: "JavaScript SDK"
metaDescription: "How to use and configure OpenReplay JavaScript SDK."
---

Getting started with OpenReplay JavaScript SDK.

## Installation

```bash
npm i @openreplay/tracker --save
```

## Usage

Initialize the package from your codebase entry point and start the tracker. You must set the `projectKey` option in the constructor. Its value can be found in your OpenReplay dashboard under 'Preferences > Projects'.

If your website is a **Single Page Application (SPA)** use the below code:

```js
import OpenReplay from '@openreplay/tracker';
//...
const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
tracker.start();
```

Otherwise, if your web app is **Server-Side-Rendered (SSR)** (i.e. NextJS, NuxtJS) use the below snippet. Ensure `tracker.start()` is called once the app is started (in `useEffect` or `componentDidMount`).

```js
import OpenReplay from '@openreplay/tracker/cjs';
//...
const tracker = new OpenReplay({
      projectKey: PROJECT_KEY,
      onStart: () => { tracker.userID('MY_USER_ID'); } // optional
});
//...
  useEffect(() => { // or componentDidMount
    tracker.start();
  }, [])
```

## Options

There are a set of options you can pass to the constructor. Only `projectKey` is required.

### General Purpose

- `projectKey: string` The ID of the project you're tracking.
- `sessionToken?: string` The token of the initial session. This is useful when sessions traverse different subdomains on your web app but you want to stitch them into a single recording. In case it's not possible to continue the session (doesn't exist or is finished), the tracker will automatically start a new one. Session token is also useful for many [integrations](/integrations).
- `revID?: string` The revision ID of your web app. Useful when searching for issues happening on a specific release version.
- `consoleMethods: Array<'log' | 'info' | 'warn' | 'error'> | null` The list of console methods to capture. Default: `['log', 'info', 'warn', 'error']`
- `consoleThrottling?: number` Max number of console entries per second. Default: `30`.
- `captureExceptions?: boolean` Capture JavaScript exceptions and stacktraces. Default: `true`.
- `captureResourceTimings?: boolean` Log resource timings. Default: `true`.
- `capturePageRenderTimings?: boolean` Compute page rendering metrics such as Speed Index, Visually Complete or Time To Interactive. Requires `captureResourceTimings = true`. Default: `true`.

### Privacy

- `respectDoNotTrack?: boolean` Do not start tracker if the do-not-track flag is enabled in the user's browser. Default: `false`.
- `obscureTextEmails?: boolean` Obscure emails in text elements. Emails will be converted to a random chain of asterisks. Default: `true`.
- `obscureTextNumbers?: boolean` Obscure numbers in text elements. Numbers will be converted to a random chain of asterisks. Default: `false`.
- `obscureInputEmails?: boolean` Obscure emails in input fields. Email values will be converted to a random chain of asterisks. Default: `true`.
- `defaultInputMode?: 0 | 1 | 2` Default capture mode for input values. Respectively: plain, obscured or ignored. Default: `0` (plain).

Note that excluded data is obscured or suppressed before sending the data to OpenReplay servers. Changes applied to the above options cannot be retroactive and will only apply to newly collected data.

See [Sanitize Data](/installation/sanitize-data) for more details.

### Misc

See `d.ts` files inside the package for the list of available options and functions.
