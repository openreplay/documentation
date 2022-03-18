---
title: "Axios"
metaTitle: "Axios"
metaDescription: "Axios plugin for OpenReplay."
---

This plugin allows you to capture `axios` requests and inspect them later on while replaying session recordings. This is very useful for understanding and fixing issues.

## Installation

```bash
npm i @openreplay/tracker-axios
```

## Usage

Initialize the `@openreplay/tracker` package as usual then load the `axios` plugin. Note that OpenReplay `axios` plugin requires `axios@^0.21.2` as a peer dependency.

### If your website is a Single Page Application (SPA)

```js
import tracker from '@openreplay/tracker';
import trackerAxios from '@openreplay/tracker-axios';

const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
tracker.use(trackerAxios(options)); // check list of available options below
tracker.start();
```

### If your web app is Server-Side-Rendered (SSR)

Follow the below example if your app is SSR. Ensure `tracker.start()` is called once the app is started (in `useEffect` or `componentDidMount`).

```js
import OpenReplay from '@openreplay/tracker/cjs';
import trackerAxios from '@openreplay/tracker-axios/cjs';

const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
tracker.use(trackerAxios(options)); // check list of available options below

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
trackerAxios({
  instance: AxiosInstance;
  failuresOnly: boolean;
  captureWhen: (AxiosRequestConfig) => boolean;
  sessionTokenHeader: string;
  ignoreHeaders: Array<string> | boolean;
})
```

- `instance`: By default plugin connects to the static axios instance, but you can specify a different one with this option. Default: `axios`.
- `failuresOnly`: Set it to `false` if you want to record every single request regardless of the status code. By default only failed requests are captured (when the axios promise is rejected). You can also [change](https://github.com/axios/axios#request-config) this behavior with the `validateStatus` option. Default: `false`.
- `captureWhen`: Allows you to set a filter on what should be captured. The function will be called with the axios config object and expected to return `true|false`. Default: `() => true`.
- `sessionTokenHeader`: In case you have enabled some of our backend [integrations](/integrations) (i.e. Sentry), you can use this option to specify the header name (i.e. 'X-OpenReplay-SessionToken'). This latter gets appended automatically to each axios request to contain the OpenReplay sessionToken's value. Default: `undefined`.
- `ignoreHeaders`: Helps define a list of headers you don't wish to capture. Set its value to `false` to capture all of them (`true` if none). Default: `[ 'Cookie', 'Set-Cookie', 'Authorization' ]` so sensitive headers won't be captured.

## Troubleshooting

Having trouble setting up this plugin? please connect to our [Discord](https://discord.openreplay.com) and get help from our community.