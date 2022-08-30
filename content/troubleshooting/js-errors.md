---
title: "JS Errors"
metaTitle: "JS Errors"
metaDescription: "All sorts of Javascript errors."
---

## ReferenceError: Navigator is not defined

Sometimes this errors occurs when you try to import `tracker-assist` or `tracker-fetch` plugins, this happens because node is trying to build the page without `window` API in the env.

The fix is fairly simple. You have to change the regular import of the trouble-causing plugin:

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

 /* keep other code same */
```

This way all window API dependant plugins will be imported when the component gets rendered.

## My problem is not listed

If you encounter any errors that are not listed in this page, feel free to [raise an issue](https://github.com/openreplay/openreplay/issues) or simply reach out to our [Slack](https://slack.openreplay.com) to get help from our community.
