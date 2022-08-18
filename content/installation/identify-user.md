---
title: "Identify a User"
metaTitle: "Identify a User"
metaDescription: "How to associate an internal-user id with the session recording."
---

Associate your internal-user-id with the session being recorded by following the below steps.

If you're looking for a quick how-to on associating your users to their replays, check out [this video we made for you](https://youtu.be/xfotXkeyXZM). Otherwise, keep reading!

### With NPM

Inject the userID on tracker' start:

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

If that's not possible (userID is known later in the navigation flow, so way after the tracker starts), then call the `setUserID` method to identify your users. The identity of the user can be changed anytime during the session by calling `setUserID`. However, OpenReplay will only keep the last injected user ID.

```js
tracker.setUserID('john@doe.com'); // after tracker.start()
```

### With JavaScript snippet

Below is an example on how to inject the userID using the snippet. Note the `startOpts` variable/line to inject the userID.

```js
<!-- OpenReplay Tracking Code -->
<script>
var initOpts = { projectKey: "GxPpaDARdn2345fgt321" };
var startOpts = { userID: getUserID() }; // use startOpts variable to inject userID
(function(A,s,a,y,e,r){
  r=window.OpenReplay=[e,r,y,[s-1, e]];
  s=document.createElement('script');s.src=A;s.async=!a;
  ...
})("//static.openreplay.com/latest/openreplay.js", 1, 0, initOpts, startOpts);
</script>
```

If that's not possible (userID is known later in the navigation flow, so way after the tracker starts), then instead call the `setUserID` method to identify your users. The identity of the user can be changed anytime during the session by calling `setUserID`. However, OpenReplay will only keep the last injected user ID.

```js
<!-- OpenReplay Tracking Code -->
<script>
var initOpts = { projectKey: "GxPpaDARdn2345fgt321" };
var startOpts = { userID: "" };
(function(A,s,a,y,e,r){
  r=window.OpenReplay=[e,r,y,[s-1, e]];
  s=document.createElement('script');s.src=A;s.async=!a;
  ...
})("//static.openreplay.com/latest/openreplay.js", 1, 0, initOpts, startOpts);
</script>
  ...
  OpenReplay.setUserID("john@doe.com"); // set the userID later in your code
  ...
```