---
title: "Session Recordings Issues"
metaTitle: "Session Recording Issues"
metaDescription: "All sorts of issues preventing replays from being captured or properly displayed."
---

Recordings show up in the dashboard few minutes (~4min) after a session is completed. A session is considered finished when the user closes the tab or browser, gets disconnected (more than 2min) or exceeds 2 hours (in which case a new session starts). Each tab leads to a new recording while reloading an existing tab doesn't trigger a new one.

This section aims to help you troubleshoot common issues in session replays.

## Replays are not showing

Before you start debugging session recordings, ensure you're capturing all of the traffic. Click on the *Manage* button next in Sessions section and enable *Capture All*.

Another common mistake consists in starting the tracker twice, which prevents sessions from being recorded. This usually happens when developers are moving from the script-based setup to using the npm package, so make sure you have either ones.

### Verify installation

If you're not sure about the setup, open the browser's inspector and check the Network tab to see if there are XHR requests (look for "ingest") made to your IP/domain (or *.openreplay.com if you're on OpenReplay Cloud).

Another way would be to update the tracker's constructor and log a message on start.

```js
const tracker = new OpenReplay({
	projectKey: PROJECT_KEY,
	onStart: ({ sessionID }) => console.log("OpenReplay tracker started with session: ", sessionID),
});
```

### Testing in localhost

OpenReplay needs public access to copy some of your app's resources (CSS, fonts and icons) for properly rendering the recordings. Your site must also use SSL/HTTPS, otherwise the tracker won't start. For these reasons, sessions won't be captured in localhost, unless you apply this [workaround](/troubleshooting/localhost).

### Site is not on HTTPS

For security reasons, the tracker only runs on web apps that use SSL (HTTPS). If your site is on HTTP, the tracker will not start.

### Missing CSP

If you see an error similar to the below, then OpenReplay couldn't start due to a missing content security policy. See [here](/troubleshooting/csp) for the policy to add.

![CSP Error](./static/csp-error.jpg#center)

### OpenReplay is blocked

The recording script might be blocked by a browser extension like an adblocker. Use your browser's inspector to check if the requests are failing. If so, add an exception for the domain on which OpenReplay backend is installed (or openreplay.com if you're on the cloud offering).

### Due to an unsupported browser

OpenReplay throws an exception when it runs in an unsupported browser. See [here](/troubleshooting/supported-browsers) for the list of supported browsers.

## Replays are not rendering correctly

### Styles are missing

OpenReplay needs access to resources, such as your css, to make replays work. In fact, these files are copied then cached by our backend so you can see old recordings even if your web app has changed. That'w why you must ensure your styles (as well as icons and fonts) are publicly accessible.

If your assets are hosted on a restricted domain (private or protected) then OpenReplay won't be able to copy and use them in replays. If you're testing on localhost, then follow [this guide](/troubleshooting/localhost).

### Images are not showing

Contrary to styles, images are not cached by OpenReplay but retrieved during a session replay. They should therefore be publicly accessible. If they're on a CDN, ensure you keep old versions of your images so you can properly replay old session recordings.

### Iframes

If your web app includes iframes, then you won't be able to playback their content as part of your recordings. You can still start OpenReplay inside an iframe by including `tracker.start()`, but it will considered as a separate tab, which means it will be captured in a separate recording.

## Replays are broken across subdomains

Sites that spread across many subdomains will generate multiple sessions for the same visit. You can stitch them into a single recording by passing `sessionToken`to the tracker's constructor. `sessionToken` can be kept then retrieved from your cross-domain storage (e.g. cookies).

```js
const tracker = new OpenReplay({
  projectKey: PROJECT_KEY,
  sessionToken: getSessionToken("OpenReplay_SessionToken"), // from cookies
  onStart: ({ sessionToken: string }) => { setSessionToken("OpenReplay_SessionToken", sessionToken) }
})
```
In case it's not possible to continue the session (doesn't exist or is finished), the tracker will automatically start a new one.

## Replays are incomplete

This can be spotted in replays that have a single visited page, and that end as soon as a user navigates to another page. This usually happens in websites that are not single page applications (SPAs). To fix this, `tracker.start()` must be called on every page.
