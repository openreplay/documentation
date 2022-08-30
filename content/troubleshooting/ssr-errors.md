## ReferenceError: Navigator is not defined ## 

Sometimes this errors occurs when you try to import `tracker-assist` or `tracker-fetch` plugins, this happens because node is trying to build the 
page without `window` API in the env.

Fix is fairly simple:

Change the regular import of the trouble-causing plugin:

```js
import trackerAssist from '@openreplay/tracker-assist/cjs';
```

To dynamic import inside `componendDidMount` or `useEffect` alternative:

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

If error will persist, don't hesitate to [start a new issue](https://github.com/openreplay/openreplay/issues)
