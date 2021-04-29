---
title: "Identify a User"
metaTitle: "Identify a User"
metaDescription: "How to associate an internal-user id with the session recording."
---

Call `userID` to identify your users when recording a session. This method allows you to associate your internal-user-id with the session being recorded. The identity of the user can be changed anytime during the session by calling `userID`. However, OpenReplay will only keep the last communicated user ID.

```js
tracker.userID('john@doe.com');
```

You can also set the userID in the constructor and make sure it's called right after the tracker starts.

```js
const tracker = new OpenReplay({
  projectKey: PROJECT_KEY,
  onStart: () => { tracker.userID('john@doe.com'); }
});
```
