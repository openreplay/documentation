---
title: "SumoLogic"
metaTitle: "SumoLogic Integration"
metaDescription: "How to integrate SumoLogic with OpenReplay and see backend errors alongside session replays."
---

How to integrate SumoLogic with OpenReplay and see backend errors alongside session recordings.

## 1. Create a new Access ID and Access Key

1. Login to your [SumoLogic](https://service.eu.sumologic.com/ui/#/login) account.
2. Go to the [Access Keys](https://service.eu.sumologic.com/ui/#/security/access-keys) page.
3. Click on *+ Add Access Key*.
4. In the name put "openreplay" and click on *Create Key*.
5. Copy the new `Access ID` and `Access Key` as we need them for our integration.
6. Click on *Done*.

For more information about creating an Access ID and Access Key, please refer to this [documentation](https://help.sumologic.com/Manage/Security/Access-Keys).

## 2. Enable SumoLogic in OpenReplay

Put your `Access ID` and `Access Key` in OpenReplay dashboard under 'Preferences > Integration'.

![SumoLogic Integration in OpenReplay](../static/sumo-1.png#center)

## 3. Propagate openReplaySessionToken

To link a SumoLogic event with the recorded user session, a unique token has to be propagated from your frontend to your backend on each request you want to track. This can be done using a custom HTTP header. In the below example, we use the `fetch` function to send that header.

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

In order for OpenReplay to associate a SumoLogic message with the recorded user session, a unique token has to be propagated as part of each backend error you wish to track.

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
