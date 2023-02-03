---
title: "JS Errors"
metaTitle: "JS Errors"
metaDescription: "All sorts of Javascript errors."
---

This section lists the most encountered Javascript errors and reported by our community.

## ReferenceError: Navigator is not defined

Sometimes this error occurs when you try to import `tracker-assist` or `tracker-fetch` plugins, this happens because node is trying to build the page without `window` API in the env.

The fix is fairly simple. All you have to do is to change the regular import of the trouble-causing plugin:

```js
import trackerAssist from '@openreplay/tracker-assist/cjs';
```

To dynamically import inside `componendDidMount` or `useEffect` alternative:

```js
import Tracker, { Options } from "@openreplay/tracker";
const tracker = new Tracker({ /* your options */ });

class TrackerComponent extends React.Component {

  componentDidMount = () => {
    import(‘@openreplay/tracker-assist/cjs’).then(({ default: trackerAssist }) => {
      tracker.start(/* your options */)
      tracker.use(trackerAssist(/* your assist options */))
    })
   }

 /* Other code */
```

This way all window API dependant plugins will be imported when the component gets rendered.

## Critical dependency: the request of a dependency is an expression

This may happen with old versions of `tracker-assist` plugin. You should apply this [workaround](https://github.com/peers/peerjs/issues/630#issuecomment-910028230) if you face the below error when compiling:

```log
Failed to compile.

./node_modules/peerjs/dist/peerjs.min.js
Critical dependency: the request of a dependency is an expression
```

## Uncaught DOMException: Blocked a frame with origin "X" from accessing a cross-origin frame

OpenReplay tracker captures **same-domain** iFrames by default. However, it throws an error when it tries to capture an iFrame that's NOT from the same-domain as your website. You can either:

- Disable the entire functionality using the `captureIFrames` property as in the example below: 

```js
const tracker = new OpenReplay({
      projectKey: PROJECT_KEY,
      captureIFrames: false
});
```

- Keep capturing iFrames (default behavior) by adding the `data-openreplay-capture` HTML attribute to the same-domain `<iframe>` tags **only**. This way, cross-origin iFrames won't be tracked by OpenReplay.

## My problem is not listed

If you encounter any errors that are not listed in this page, feel free to [raise an issue](https://github.com/openreplay/openreplay/issues/new/choose) or simply reach out to our [Slack](https://slack.openreplay.com) to get help from our community.
