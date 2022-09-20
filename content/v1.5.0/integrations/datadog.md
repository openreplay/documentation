---
title: "Datadog"
metaTitle: "Datadog Integration"
metaDescription: "How to integrate Datadog with OpenReplay and see backend errors alongside session replays."
---

How to integrate Datadog with OpenReplay and see backend errors alongside session recordings.

## 1. Generate Datadog API Key & Application Key

Go to [Datadog > Integrations > APIs](https://app.datadoghq.com/account/settings#api) and generate the API Key, or use the existing one.

![Datadog API Key](../static/datadog-1.png#center)

On the same page, click on Application Keys and generate a new application key.

![Datadog Application Key](../static/datadog-2.png#center)

## 2. Enable Integration in OpenReplay

Paste your `API Key` and `Application Key` in Datadog in OpenReplay dashboard under 'Preferences > Integration'.

![Datadog Integration in OpenReplay](../static/datadog-3.png#center)

## 3. Propagate openReplaySessionToken

To link a Datadog event with the recorded user session, a unique token has to be propagated from your frontend to your backend on each request you want to track. This can be done using a custom HTTP header. In the below example, we use the `fetch` function to send that header.

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

In order for OpenReplay to associate a Datadog log entry with the recorded user session, a unique token has to be propagated to each backend error you wish to track.

Below is an example in Python using Monkey Patching.

```Python
import sys
import traceback
#...
old_tb = traceback.print_exception
old_f = sys.stdout
old_e = sys.stderr
OPENREPLAY_SESSION_TOKEN = None

class F:
    def write(self, x):
        if OPENREPLAY_SESSION_TOKEN is not None and x != '\n':
            old_f.write(f"[openReplaySessionToken={OPENREPLAY_SESSION_TOKEN}] {x}")
        else:
            old_f.write(x)

    def flush(self):
        pass

def tb_print_exception(etype, value, tb, limit=None, file=None, chain=True):
    if OPENREPLAY_SESSION_TOKEN is not None:
        value = type(value)(f"[openReplaySessionToken={OPENREPLAY_SESSION_TOKEN}] " + str(value))
    old_tb(etype, value, tb, limit, file, chain)

traceback.print_exception = tb_print_exception

sys.stderr = F()
```

The name of the tag `openReplaySessionToken` is case sensitive.

## Troubleshooting

If you encounter any issues, connect to our [Slack](https://slack.openreplay.com) and get help from our community.
