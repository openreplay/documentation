---
title: "Identify a User"
metaTitle: "Identify a User"
metaDescription: "How to associate an internal-user id with the session recording."
---

Associate your internal-user-id with the session being recorded by passing the userID in the tracker's constructor:

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

If that's not possible (userID is known later in the navigation flow, so way after the tracker starts), then call the `setUserID` method to identify your users. The identity of the user can be changed anytime during the session by calling `setUserID`. However, OpenReplay will only keep the last communicated user ID.

```js
tracker.setUserID('john@doe.com');
```
