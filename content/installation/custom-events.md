---
title: "Custom Events"
metaTitle: "Custom Events"
metaDescription: "How to send domain-specific events and add additional intelligence to session recordings."
---

Custom events are great for adding more intelligence by recording domain-specific events alongside session replays. OpenReplay makes use of 2 types of events: functional (`event`) and technical (`issue`). All events are indexed for easy search, and sync'ed with session recordings.

## Functional Events

Functional events are indexed and makes looking for specific session recordings easier. If they were successfully received by OpenReplay, they will be available as filters in the omnisearch bar.

![Functional Event](../static/custom-events-1.png#center)

### With NPM

Use the `event` method to signal functional events such as *order completed* or *product added*. It takes 2 parameters: *name* (string) and *payload* (non-recursive JS object).

```js
tracker.event('product_added', 'shoes'); // after tracker.start()
```

### With JavaScript snippet

Below is an example on how to send a functional event using the snippet.

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
  OpenReplay.event('product_added', 'shoes'); // send a functional event later in your code
  ...
```

## Technical Events

Technical events are shown in session replay under the *Events* tab in DevTools, and as annotations on the playback. They're also taken into account in Funnels for correlating conversion drops with technical issues.

![Technical Event](../static/custom-events-2.png#center)

### With NPM

`issue` is used to send technical events, like errors, that may occur in your stack or other downstream systems. `issue` takes 2 parameters: *name* (string) and *payload* (non-recursive JS object).

```js
tracker.issue('payment_error', {code: 500, context: 42}); // after tracker.start()
```

### With JavaScript snippet

Below is an example on how to send a technical event using the snippet.

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
  OpenReplay.issue('payment_error', {code: 500, context: 42}); // send a technical event (issue) later in your code
  ...
```
