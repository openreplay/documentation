---
title: "Assist"
metaTitle: "Assist"
metaDescription: "How to setup OpenReplay Assist and support your end users through live screen and WebRTC."
---

OpenReplay Assist allows you to support your users by seeing their live screen and instantly hopping on call (WebRTC) with them without requiring any 3rd-party screen sharing software.

## Installation

```bash
npm i @openreplay/tracker-assist
```

## Usage

### With JavaScript snippet

If your OpenReplay tracker is set up using the JS snippet, then simply replace the `.../openreplay.js` occurrence with `.../openreplay-assist.js`. Below is an example of how the script should like after the change:

```js
<!-- OpenReplay Tracking Code -->
<script>
(function(A,s,a,y,e,r){
  r=window.OpenReplay=[s,r,e,[y-1]];
  s=document.createElement('script');s.src=a;s.async=!A;
  document.getElementsByTagName('head')[0].appendChild(s);
  r.start=function(v){r.push([0])};
  r.stop=function(v){r.push([1])};
  r.setUserID=function(id){r.push([2,id])};
  r.setUserAnonymousID=function(id){r.push([3,id])};
  r.setMetadata=function(k,v){r.push([4,k,v])};
  r.event=function(k,p,i){r.push([5,k,p,i])};
  r.issue=function(k,p){r.push([6,k,p])};
  r.isActive=function(){return false};
  r.getSessionToken=function(){};
})(0, "PROJECT_KEY", "//static.openreplay.com/3.3.1/openreplay-assist.js",1,28);
</script>
```

### With NPM

Initialize the tracker then load the `@openreplay/tracker-assist` plugin.

#### If your website is a Single Page Application (SPA)

```js
import Tracker from '@openreplay/tracker';
import trackerAssist from '@openreplay/tracker-assist';

const tracker = new Tracker({
  projectKey: PROJECT_KEY,
});
tracker.use(trackerAssist(options)); // check the list of available options below

tracker.start();

```

#### If your web app is Server-Side-Rendered (SSR)

Follow the below example if your app is SSR. Ensure `tracker.start()` is called once the app is started (in `useEffect` or `componentDidMount`).

```js
import OpenReplay from '@openreplay/tracker/cjs';
import trackerFetch from '@openreplay/tracker-assist/cjs';

const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
tracker.use(trackerAssist(options)); // check the list of available options below

//...
function MyApp() {
  useEffect(() => { // use componentDidMount in case of React Class Component
    tracker.start();
  }, [])
//...
}
```

#### Options

```js
trackerAssist({
  confirmText?: string;
  config?: object;
  onAgentConnect?: () => (()=>void | void)
})
```

- `confirmText`: Customize the text that gets displayed in the calling popup.
- `config`: Contains any custom ICE/TURN server configuration. Defaults to `{ 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }], 'sdpSemantics': 'unified-plan' }`.
- `onAgentConnect: () => (()=>void | void)`: This callback function is fired as soon as a live session starts. It can also return `onAgentDisconnect` which will be called when the session is disconnected. In case of an unstable connection, this may be called several times. Below is an example:

```js
onAgentConnect = () => {
    console.log("Live session started")
    const onAgentDisconnect =  () => console.log("Live session stopped")
    return onAgentDisconnect
}
```


## Troubleshooting

### Critical dependency: the request of a dependency is an expression

Please apply this [workaround](https://github.com/peers/peerjs/issues/630#issuecomment-910028230) if you face the below error when compiling:

```log
Failed to compile.

./node_modules/peerjs/dist/peerjs.min.js
Critical dependency: the request of a dependency is an expression
```

If you encounter any other issue, please connect to our [Slack](https://slack.openreplay.com) and get help from our community.