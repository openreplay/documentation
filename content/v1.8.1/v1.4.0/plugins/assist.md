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
var initOpts = { projectKey: "GxPpaDARdn2345fgt321" };
var startOpts = { userID: "" };
(function(A,s,a,y,e,r){
  r=window.OpenReplay=[e,r,y,[s-1, e]];
  s=document.createElement('script');s.src=A;s.async=!a;
  ...
})("//static.openreplay.com/latest/openreplay-assist.js", 1, 0, initOpts, startOpts);
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
  callConfirm?: string|ConfirmOptions;
  controlConfirm?: string|ConfirmOptions;
  config?: object;
  onAgentConnect?: () => (()=>void | void);
  onCallStart?: () => (()=>void | void);
  onRemoteControlStart?: () => (()=>void | void);
})
```

```js
type ConfirmOptions = {
  text?:string,
  style?: StyleObject, // style object (i.e {color: 'red', borderRadius: '10px'})
  confirmBtn?: ButtonOptions, 
  declineBtn?: ButtonOptions
}

type ButtonOptions = HTMLButtonElement | string | {
  innerHTML?: string, // to pass an svg string or text
  style?: StyleObject, // style object (i.e {color: 'red', borderRadius: '10px'})
}
```

- `callConfirm`: Customize the text and/or layout of the call request popup. 
- `controlConfirm`: Customize the text and/or layout of the remote control request popup.
- `config`: Contains any custom ICE/TURN server configuration. Defaults to `{ 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }], 'sdpSemantics': 'unified-plan' }`.
- `onAgentConnect: () => (()=>void | void)`: This callback function is fired as soon as a live session starts. It can also return `onAgentDisconnect` which will be called when the session is disconnected. In case of an unstable connection, this may be called several times. Below is an example:

```js
onAgentConnect = () => {
  console.log("Live session started")
  const onAgentDisconnect =  () => console.log("Live session stopped")
  return onAgentDisconnect
}
```

- `onCallStart: () => (()=>void | void)`: This callback function is fired as soon as a call (webRTC) starts. It can also return `onCallEnd` which will be called when the call ends. In case of an unstable connection, this may be called several times. Below is an example:

```js
onCallStart: () => {
  console.log("Call started")
  const onCallEnd = () => console.log("Call ended")
  return onCallEnd
}
```

- `onRemoteControlStart: () => (()=>void | void)`: This callback function is fired as soon as a remote control session starts. It can also return `onRemoteControlEnd` which will be called when the remote control permissions are revoked. Below is an example:

```js
onCallStart: () => {
  console.log("Remote control started")
  const onCallEnd = () => console.log("Remote control ended")
  return onCallEnd
}
```

## Troubleshooting

### Critical dependency: the request of a dependency is an expression

If you're running tracker-assist `v3.5.14 or prior` and you're getting the below error when compiling, apply this [workaround](https://github.com/peers/peerjs/issues/630#issuecomment-910028230).

```log
Failed to compile.

./node_modules/peerjs/dist/peerjs.min.js
Critical dependency: the request of a dependency is an expression
```

### My issue is not listed

Having trouble setting up this plugin? Please connect to our [Slack](https://slack.openreplay.com) and get help from our community.