---
title: "Elastic"
metaTitle: "Elasticsearch Integration"
metaDescription: "How to integrate Elasticsearch with OpenReplay and see backend errors alongside session replays."
---

How to integrate Elasticsearch with OpenReplay and see backend errors alongside session recordings.

## 1. Create a new API key

If you are using Kibana dashboard:
1. Login to your Kibana dashboard.
2. Go to Dev *Tools > Console*.
3. Copy the following console code to your console and run it.

If you are using CURL commands:
1. Execute the following cURL command in your terminal.

**Note:** by default, this integration will search for logs inside any index that matches `*log*`, if you have a specific index for logs that doesn't match this pattern, please change the name of the index in line 12 in the following command. If you want to specify more than 1 index, you can separate the names with `,`.

```cURL
POST /_security/api_key
{
  "name": "openreplay-api-key",
  "role_descriptors": {
    "openreplay-role": {
      "cluster": [
        "all"
      ],
      "index": [
        {
          "names": [
            "*log*"
          ],
          "privileges": [
            "read"
          ]
        }
      ]
    }
  }
}
```

If you used any of the previous methods to generate an API key, you will get a result as the following:

```json
{
  "id" : "eQWAIG0Bo0VqB8HXFH9-",
  "name" : "openreplay-api-key",
  "api_key" : "dZ5ycVRJTU-5UW_RYfi1_w"
}
```

Make sure to copy the `id` and the `api_key` as we need them for our integration. For more information about creating an API key, please refer to this [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/master/security-api-create-api-key.html).

## 2. Enable Elasticsearch in OpenReplay

Put your `host` address, `port`, `id` and `api_key` in OpenReplay dashboard under 'Preferences > Integration'.
If you changed the index when generating the `api_key`, please specify the name in `indexes`.

![Elasticsearch Integration in OpenReplay](../static/elastic-1.png#center)

## 3. Propagate openReplaySessionToken

To link a Elasticsearch event with the recorded user session, a unique token has to be propagated from your frontend to your backend on each request you want to track. This can be done using a custom HTTP header. In the below example, we use the `fetch` function to send that header.

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

In order for OpenReplay to associate a Elasticsearch log entry with the recorded user session, a unique token has to be propagated as part of each backend error you wish to track.

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

## Special Considerations

By default, we look for each log associated to an OpenReplay session using the attributes `message` and `utc_time`, we are only interested in error logs, to identify error logs we check the attribute `tags` to contain the value `error`.

## Troubleshooting

If you encounter any issues, connect to our [Slack](https://slack.openreplay.com) and get help from our community.
