---
title: "Sentry"
metaTitle: "Sentry Integration"
metaDescription: "How to integrate Sentry with OpenReplay and see backend errors alongside session replays."
---

How to integrate Sentry with OpenReplay and see backend errors alongside session recordings.

## 1. Generate Sentry Auth Token

Go to [Sentry > Account > API > Auth Tokens](https://sentry.io/settings/account/api/auth-tokens/) and generate the token with `event:read`, `org:read` and `project:read` permissions. This latter will be used in the next step when enabling your Sentry integration in OpenReplay dashboard.

![Create Token in Sentry](../static/sentry-1.png#center)

## 2. Enable Integration in OpenReplay

Copy your `organization_slug` and `project_slug` from the **Projects** page in your Sentry dashboard.

![Projects Page in Sentry](../static/sentry-2.png#center)

![Sentry Integration Form in OpenReplay](../static/sentry-3.png#center)

Then paste them in OpenReplay dashboard under 'Preferences > Integration' alongside the Token you previously generated in step 1.

## 3. Propagate openReplaySessionToken


In order for OpenReplay to associate a Sentry event with the recorded user session, Sentry event should be tagged with unique token.  

### Frontend
If you're relying on Sentry on your frontend, you can follow the below example.

```javascript
import OpenReplay from "@openreplay/tracker";
import * as Sentry from "@sentry/browser";


const tracker = new OpenReplay({
	projectKey: MY_PROJECT_KEY,
	onStart: ({ sessionToken }) => {
	  Sentry.setTag("openReplaySessionToken", sessionToken);
	},
})
```
Or in case of snippet: 
```javascript
if (window.OpenReplay.getSessionToken()) {
	Sentry.setTag("openReplaySessionToken", window.OpenReplay.getSessionToken());
}
```

### Backend

Otherwise, if you use Sentry sdk for backend, session token has to be propagated from your frontend on each request you want to track.
This can be done using a custom HTTP header. In the below example, we use the `fetch` API to send that header.

```javascript
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
if (tracker.getSessionToken()) { // or window.OpenReplay instead of tracker if you're using the snippet
  headers['X-OpenReplay-SessionToken'] = tracker.getSessionToken(); // Inject openReplaySessionToken
}
fetch('www.your-backend.com', {
  'GET',
  headers,
});
```
You can also use OpenReplay [Fetch Plugin](/plugins/fetch) to set the header automatically for each tracking request.


Then you can extract the `openReplaySessionToken` from the header and add it to your Sentry scope (ideally using a middleware or decorator).

```python
with configure_scope() as scope:
  scope.set_tag('openReplaySessionToken', app.current_request.headers.get('X-OpenReplay-SessionToken'))
```

The name of the tag should be exactly `openReplaySessionToken`.

## Troubleshooting

If you encounter any issues, connect to our [Slack](https://slack.openreplay.com) and get help from our community.
