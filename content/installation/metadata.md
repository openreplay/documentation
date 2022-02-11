---
title: "Metadata"
metaTitle: "Metadata"
metaDescription: "How to pass user metadata to OpenReplay. Also known as traits or user variables in other platforms."
---

Additional information about users can be provided with metadata (also known as traits or user variables). They take the form of key/value pairs, and are useful for filtering and searching for specific session replays.

## 1. Explicitly specify the Metadata

Metadata must be explicitly specified from the dashboard from 'Preferences > Metadata'. You can add up to 10 keys. In the below example, we use `plan`.

![Add Metadata](../static/metadata-1.png#center)

## 2. Inject Metadata when recording sessions

Once the key(s) added (in this example `plan`) then you can inject the metadata on tracker's start in the form of a key/value pair (`string`):

```js
const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});

tracker.start({
  userID: "john@doe.com",
  metadata: {
    balance: "10M",
    plan: "free"
  }
});
```

If that's not possible (some or all metadata may be set/known only later in the navigation flow, so way after the tracker starts), then call the `setMetadata` method to do so: 

```js
tracker.setMetadata('plan', 'free');
```

## 3. Search for Sessions Recordings using Metadata

Clicking on the omni-search bar will show you the list of available filters, including the metadata key(s) you added. You can now filter sessions recordings by any key/value.

![Search using Metadata](../static/metadata-2.png#center)

## 4. See Metadata in Session Replay

Metadata key/value pairs are displayed in the session replay page, in the user identification card. Sessions with similar metadata values can be found by clicking on the *loop* icon.

![Metadata in Session Replay](../static/metadata-3.png#center)
