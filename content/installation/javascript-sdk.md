---
title: "JavaScript SDK"
metaTitle: "JavaScript SDK"
metaDescription: "How to use and configure OpenReplay JavaScript SDK."
---

Getting started with OpenReplay JavaScript SDK.

## Installation

```bash
npm i @openreplay/tracker
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
      onStart: () => { tracker.setUserID('MY_USER_ID'); } // optional
});
//...
function MyApp() {
  useEffect(() => { // use componentDidMount in case of React Class Component
    tracker.start();
  }, [])
}
```

## Options

There are a set of options you can pass to the constructor. Only `projectKey` is required.

### General Purpose

- `projectKey: string` The ID of the project you're tracking.
- `sessionToken?: string` The token of the initial session. This is useful when sessions traverse different subdomains on your web app but you want to stitch them into a single recording. In case it's not possible to continue the session (doesn't exist or is finished), the tracker will automatically start a new one. Session token is also useful for many [integrations](/integrations).
- `ingestPoint?: string` Your OpenReplay domain (i.e. https://openreplay.mydomain.com/ingest), to which the tracker will be sending events. Default: `https://ingest.openreplay.com` (which points to OpenReplay SaaS).
- `revID?: string` The revision ID of your web app. Useful when searching for issues happening on a specific release version.
- `onStart?: (info: { sessionToken: string, userUUID: string }) => void` This event is fired when the tracker is started. Useful for logging/debugging purposes.

### Privacy

- `respectDoNotTrack?: boolean` Do not start tracker if the do-not-track flag is enabled in the user's browser. Default: `false`.
- `obscureTextEmails?: boolean` Obscures emails in text elements. Emails will be converted to a random chain of asterisks. Default: `true`.
- `obscureTextNumbers?: boolean` Obscures numbers in text elements. Numbers will be converted to a random chain of asterisks. Default: `false`.
- `obscureInputEmails?: boolean` Obscures emails in input fields. Email values will be converted to a random chain of asterisks. Default: `true`.
- `defaultInputMode?: 0 | 1 | 2` Default capture mode for input values. Respectively: plain, obscured or ignored. Default: `0` (plain).

Note that excluded data is obscured or suppressed before sending the data to OpenReplay servers. Changes applied to the above options cannot be retroactive and will only apply to newly collected data.

See [Sanitize Data](/installation/sanitize-data) for more details.

### Console

- `consoleMethods?: Array<'log' | 'info' | 'warn' | 'error'  'debug' | 'assert'> | null` Specifies the list of console methods to capture. Default: `['log', 'info', 'warn', 'error', 'debug', 'assert']`
- `consoleThrottling?: number` Max number of captured console entries per second. Default: `30`.

### Exceptions

- `captureExceptions?: boolean` Captures JavaScript exceptions and stacktraces. Default: `true`.

### Timings

- `captureResourceTimings?: boolean` Logs resource timings. Default: `true`.
- `capturePageLoadTimings?: boolean` Logs page load timings. Default: `true`.
- `capturePageRenderTimings?: boolean` Computes page rendering metrics such as Speed Index, Visually Complete or Time To Interactive. Requires `captureResourceTimings = true`. Default: `true`.

### Performance

- `capturePerformance?: boolean` For capturing performance metrics such as framerate, CPU and memory consumption. Default: `true`.

### Network

- `connAttemptCount?: number` Max number of retries when tracker's HTTP requests fail to reach the backend. Default: `10`.
- `connAttemptGap?: number` Duration between each retry attempt (expressed in ms). Default: `8000`.

### Security

- `__DISABLE_SECURE_MODE?: boolean` For disabling secure connection (SSL) between tracker and backend. This should be used for **development purposes only**. Default: `false`.
