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
  sanitiser: (RequestResponseData) => RequestResponseData | null;
})
```

- `instance`: By default plugin connects to the static axios instance, but you can specify a different one with this option. If you have more multiple instances, then can use `tracker.use(trackerAxios(myinstance)` for each one of them. Default: `axios`.
- `failuresOnly`: Set it to `false` if you want to record every single request regardless of the status code. By default only failed requests are captured (when the axios promise is rejected). You can also [change](https://github.com/axios/axios#request-config) this behavior with the `validateStatus` option. Default: `false`.
- `captureWhen`: Allows you to set a filter on what should be captured. The function will be called with the axios config object and expected to return `true|false`. Default: `() => true`.
- `sessionTokenHeader`: In case you have enabled some of our backend [integrations](/integrations) (i.e. Sentry), you can use this option to specify the header name (i.e. 'X-OpenReplay-SessionToken'). This latter gets appended automatically to each axios request to contain the OpenReplay sessionToken's value. Default: `undefined`.
- `ignoreHeaders`: Helps define a list of headers you don't wish to capture. Set its value to `false` to capture all of them (`true` if none). Default: `[ 'Cookie', 'Set-Cookie', 'Authorization' ]` so sensitive headers won't be captured.
- `sanitiser`: Sanitise sensitive data from fetch request/response or ignore request comletely. You can redact fields on the request object by modifying then returning it from the function:

```typescript
interface RequestData {
  body: BodyInit | null | undefined; // whatewer you've put in the init.body in fetch(url, init)
  headers: Record<string, string>;
}

interface ResponseData {
  body: string | Object | null;  // Object if response is of JSON type
  headers: Record<string, string>;
}

interface RequestResponseData {
  readonly status: number;
  readonly method: string;
  url: string;
  request: RequestData;
  response: ResponseData;
}

sanitiser: (data: RequestResponseData) => { // sanitise the body or headers
  if (data.url === "/auth") {
    data.request.body = null
  }

  if (data.request.headers['x-auth-token']) { // can also use ignoreHeaders option instead
    data.request.headers['x-auth-token'] = 'SANITISED';
  }

  // Sanitise response
  if (data.status < 400 && data.response.body.token) {
    data.response.body.token = "<TOKEN>"  
  }

  return data
}

// OR

sanitiser: data => { // ignore requests that start with /secure
  if (data.url.startsWith("/secure")) {
    return null
  }
  return data
}

// OR

sanitiser: data => { // sanitise request url: replace all numbers
  data.url = data.url.replace(/\d/g, "*")
  return data
}
```

## Tutorial
If you're looking for a practical example of how to use this plugin to capture and sanitize request data, check out [our detailed tutorial over here](/tutorials/axios).


## Troubleshooting

Having trouble setting up this plugin? please connect to our [Slack](https://slack.openreplay.com) and get help from our community.