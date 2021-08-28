---
title: "Error Reporting"
metaTitle: "Error Reporting"
metaDescription: "How error reporting works, what gets sent to the 'Errors' tab and how to report errors and exceptions manually"
---

Error reporting is very important for monitoring your app's stability, spotting regressions ahead of time, and knowing which issues occur the most to your users.

By default, any uncaught exception is logged under the 'Errors' tab:

![Errors Tab](../static/errors-tab.jpg#center)

Additionally, logged errors will also appear in the session recording under the 'Exceptions' tab in DevTools:

![Exceptions Tab](../static/exceptions-tab-in-recording.jpg#center)

## Manually Logging Exceptions

The OpenReplay tracker supports logging 3 types of errors:
* Caught Exceptions - [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
* Rejected Promises - [PromiseRejectionEvent](https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent)
* Error Events (onError) - [ErrorEvent](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent)

As of version 3.2.5 of the @openreplay/tracker package, all of the above can be reported using a single method:

```js
tracker.handleError(err);
```

Let's review an example for each type of error:

### Caught Exceptions (Error)

By default, caught exceptions are not logged to the 'Errors' tab. In order to report an error, we can do as following:

```js
try {
    // application code
}
catch(err) {
    // application code that handles the error
    tracker.handlerError(err);
}
```
### Rejected Promises (PromiseRejectionEvent)

If a Promise is rejected and we want to report the error to OpenReplay, we can do as following:

```js
function myFunc() {
    doSomeAsyncStuff()
    .then((result) => {
        // application code
    })
    .catch(promiseRejectionErr => {
        // application code to handle the error
        tracker.handleError(promiseRejectionErr);      
    })
}
```

### onError (ErrorEvent)

This example will show how to report an error in case an ```<img>``` element did not load:  

```html
<img id="myImg" src="image.gif">
<p id="demo"></p>
```

```js
document.getElementById("myImg").addEventListener("error", myFunction);

function myFunction(errorEvent) {
  document.getElementById("demo").innerHTML = "The image could not be loaded.";
  tracker.handleError(errorEvent);
}
```
