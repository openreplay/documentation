---
title: "CloudWatch"
metaTitle: "CloudWatch Integration"
metaDescription: "How to integrate CloudWatch with OpenReplay and see backend errors alongside session replays."
---

How to integrate CloudWatch with OpenReplay and see backend errors alongside session replays.

## 1. Create a Service Account

1. Login to your [AWS](https//console.aws.amazon.com) account.
2. Go to [IAM](https://console.aws.amazon.com/iam/home) dashboard.
3. Click on *Users*.
4. Click on *Add user* button.
5. Set the name to "openreplay_cw".
6. In access type, select *Programmatic access*.
7. Click on *Next: Permissions* button.
8. Choose *Attach existing policies directly*
9. In the list of permissions, choose *CloudWatchReadOnlyAccess*.
10. Click *Next: Tags* button.
11. Click *Next: Review* button.
12. Click *Create user* button.
13. Copy the `Access key ID` and the `Secret access key`.

## 2. Enable CloudWatch in OpenReplay

Put your `Access key ID` and `Secret access key` in OpenReplay dashboard under 'Preferences > Integration', select the region and select the log group that you want to track from the dropdown list.

![CloudWatch Integration in OpenReplay](../static/cloudwatch-1.jpg#center)

## 3. Propagate openReplaySessionToken

To link a CloudWatch event with the recorded user session, a unique token has to be propagated from your frontend to your backend on each request you want to track. This can be done using a custom HTTP header. In the below example, we use the `fetch` function to send that header.

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

In order for OpenReplay to associate a Cloudwatch log entry with the recorded user session, a unique token has to be propagated as part of each backend error you wish to track.

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

If you encounter any issues, connect to our [Discord](https://discord.openreplay.com) and get help from our community.
