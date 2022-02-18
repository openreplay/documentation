---
title: "Identify a User"
metaTitle: "Identify a User"
metaDescription: "How to associate an internal-user id with the session recording."
---

Associate your internal-user-id with the session being recorded by following the below steps.

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

Below is an example on how to inject the userID using the snippet. Note the `startOpts` variable/line added, also the parameters change in the second line.

```js
<!-- OpenReplay Tracking Code -->
<script>
(function(A,s,a,y,e,r){
  var startOpts = { userID: getUserID() } // use startOpts variable to inject userID
  r=window.OpenReplay=[s,r,e,[y-1,startOpts]]; // pass startOpts on tracker's start
  ...
})(0, "GxPpaDARdn2345fgt321", "//static.openreplay.com/3.5.0/openreplay.js",1,29);
</script>
```

If that's not possible (userID is known later in the navigation flow, so way after the tracker starts), then instead call the `setUserID` method to identify your users. The identity of the user can be changed anytime during the session by calling `setUserID`. However, OpenReplay will only keep the last injected user ID.

```js
<!-- OpenReplay Tracking Code -->
<script>
(function(A,s,a,y,e,r){
  r=window.OpenReplay=[s,r,e,[y-1]];
  s=document.createElement('script');s.src=a;s.async=!A;
  document.getElementsByTagName('head')[0].appendChild(s);
  ...
})(0, "GxPpaDARdn2345fgt321", "//static.openreplay.com/3.5.2/openreplay.js",1,29);
</script>
  ...
  OpenReplay.setUserID("john@doe.com"); // set the userID later in your code
  ...
```