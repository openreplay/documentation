---
title: "NewRelic"
metaTitle: "NewRelic Integration"
metaDescription: "How to integrate NewRelic with OpenReplay and see backend errors alongside session replays."
---

How to integrate NewRelic with OpenReplay and see backend errors alongside session recordings.

## 1. Create Query Key

1. Login to your [NewRelic](https://newrelic.com) account.
2. In the top left, select the *INSIGHTS* dashboard.
3. In the *INSIGHTS* dashboard, go to "Manage Data" then select *API Keys*.
4. Click on the *+* button of *Query Keys*.

![NewRelic API Keys](../static/newrelic-1.png#center)

5. In the Notes put `openreplay`.
6. Copy the `Account ID` and the `Key`.
7. Click on *Save your notes*.

![NewRelic Query Key](../static/newrelic-2.png#center)

## 2. Enable NewRelic in OpenReplay

Paste your `Application ID` and `Key` in OpenReplay dashboard under 'Preferences > Integration'.

![NewRelic Integration in OpenReplay](../static/newrelic-3.jpg#center)

## 3. Propagate openReplaySessionToken

To link a NewRelic event with the recorded user session, a unique token has to be propagated from your frontend to your backend on each request you want to track. This can be done using a custom HTTP header. In the below example, we use the `fetch` function to send that header.

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

In order for OpenReplay to associate a NewRelic log entry with the recorded user session, a unique token has to be propagated as a `custom_parameter` to each backend error you wish to track.

Below is an example in NewRelic's Python API.

```Python
newrelic.agent.add_custom_parameter("openReplaySessionToken", OPENREPLAY_SESSION_TOKEN)
```

The name of the tag `openReplaySessionToken` is case sensitive.

## Troubleshooting

If you encounter any issues, connect to our [Slack](https://slack.openreplay.com) and get help from our community.
