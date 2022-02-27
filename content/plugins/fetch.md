---
title: "Fetch"
metaTitle: "Fetch"
metaDescription: "Fetch plugin for OpenReplay."
---

This plugin allows you to capture `fetch` payloads and inspect them later on while replaying session recordings. This is very useful for understanding and fixing issues.

## Installation

```bash
npm i @openreplay/tracker-fetch
```

## Usage

Use the provided `fetch` method from the plugin instead of the one built-in.

### If your website is a Single Page Application (SPA)

```js
import tracker from '@openreplay/tracker';
import trackerFetch from '@openreplay/tracker-fetch';

const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
const fetch = tracker.use(trackerFetch(options)); // check list of available options below

tracker.start();

fetch('https://myapi.com/').then(response => console.log(response.json()));
```

### If your web app is Server-Side-Rendered (SSR)

Follow the below example if your app is SSR. Ensure `tracker.start()` is called once the app is started (in `useEffect` or `componentDidMount`).

```js
import OpenReplay from '@openreplay/tracker/cjs';
import trackerFetch from '@openreplay/tracker-fetch/cjs';

const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
const fetch = tracker.use(trackerFetch(options)); // check list of available options below

//...
function MyApp() {
  useEffect(() => { // use componentDidMount in case of React Class Component
    tracker.start();

    fetch('https://myapi.com/').then(response => console.log(response.json()));
  }, [])
//...
}

```

## Options

```js
trackerFetch({
  replaceDefault: boolean;
  failuresOnly: boolean;
  sessionTokenHeader: string;
  ignoreHeaders: Array<string> | boolean;
  requestSanitizer: (Request) => Request | null;
  responseSanitizer: (Response) => Response | null;
})
```

- `replaceDefault`: Replaces the default `window.fetch`. Default: `false`.
- `failuresOnly`: Captures requests having 4xx-5xx HTTP status code. Default: `false`.
- `sessionTokenHeader`: In case you have enabled some of our backend [integrations](/integrations) (i.e. Sentry), you can use this option to specify the header name (i.e. 'X-OpenReplay-SessionToken'). This latter gets appended automatically to each fetch request to contain the OpenReplay sessionToken's value. Default: `undefined`.
- `ignoreHeaders`: Helps define a list of headers you don't wish to capture. Set its value to `false` to capture all of them (`true` if none). Default: `['Cookie', 'Set-Cookie', 'Authorization']` so sensitive headers won't be captured.
- `requestSanitizer`: Sanitize sensitive data from fetch requests or ignore request. You can redact fields on the request object by modifying then returning it from the function:

```js
interface Request {
  url: string,
  body: string | Object,
  headers: Record<string, string>
}

requestSanitizer: request => { // sanitize the body or headers
  if (request.url === "/auth") {
    request.body = null
  }

  if (request.headers['x-auth-token']) { // can also use ignoreHeaders option instead
      request.headers['x-auth-token'] = 'SANITIZED';
  }

  return request
}

requestSanitizer: request => { // ignore the request that starts with /secure
  if (request.url.startsWith("/secure")) {
    return null
  }
  return request
}
```

- `responseSanitizer`: Sanitize sensitive data from fetch responses or ignore response. You can redact fields on the response object by modifying then returning it from the function:

```js
interface Response {
  url: string,
  body: string,
  headers: Record<string, string>,
  status: number
}

responseSanitizer: response => { // sanitize the body
  if (response.url === "/auth") {
    response.body = null
  }
  return response
}

responseSanitizer: response => { // ignore the response when status equals 200
  if (response.status === 200) {
    response.body = null
  }
  return response
}
```

## Troubleshooting

Having trouble setting up this plugin? please connect to our [Slack](https://slack.openreplay.com) and get help from our community.