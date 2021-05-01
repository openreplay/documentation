---
title: "Bugsnag"
metaTitle: "Bugsnag Integration"
metaDescription: "How to integrate Bugsnag with OpenReplay and see backend errors alongside session replays."
---

How to integrate Bugsnag with OpenReplay and see backend errors alongside session recordings.

## 1. Create Authorization Token

1. Login to your [Bugsnag](https://app.bugsnag.com) account.
2. Go to *Settings > My account > Personal auth tokens*.
3. Click on the *Generate new token +* button.
4. In the description put `openreplay`.
5. Click the *Generate* button.
6. Copy the token then hit the *Done* button.

![Bugsnag Personal Auth Tokens](../static/bugsnag-1.jpg#center)

## 2. Enable Bugsnag in OpenReplay

Put your `Authorization token` in OpenReplay dashboard under 'Preferences > Integration' and select the project that you want to track from the dropdown list.

![Bugsnag Integration in OpenReplay](../static/bugsnag-2.jpg#center)

## 3. Propagate openReplaySessionToken

To link a Bugsnag event with the recorded user session, a unique token has to be propagated from your frontend to your backend on each request you want to track. This can be done using a custom HTTP header. In the below example, we use the `fetch` function to send that header.

```javascript
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
if (tracker.getSessionToken()) { // use window.OpenReplay instead of tracker if you're using the snippet
  headers['X-OpenReplay-SessionToken'] = tracker.getSessionToken(); // Inject openReplaySessionToken
}
fetch('www.your-backend.com', {
  'GET',
  headers,
});
```

In order for OpenReplay to associate a Bugsnag log entry with the recorded user session, a unique token has to be propagated as a `meta_data > special_info` to each backend error you wish to track.

Below is an example in Bugsnag's Python API.

```Python
bugsnag.notify(EXCEPTION_OBJECT,  meta_data={"special_info":{"openReplaySessionToken": OPENREPLAY_SESSION_TOKEN}})
```

The name of the tag `openReplaySessionToken` is case sensitive.

## Troubleshooting

If you encounter any issues, connect to our [Slack](https://slack.openreplay.com) and get help from our community.
