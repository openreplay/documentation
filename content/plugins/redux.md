---
title: "Redux"
metaTitle: "Redux"
metaDescription: "Redux plugin for OpenReplay."
---

This plugin allows you to capture `Redux` actions/state and inspect them later on while replaying session recordings. This is very useful for understanding and fixing issues.

## Installation

```bash
npm i @openreplay/tracker-redux --save
```

## Usage

Initialize the tracker then put the generated middleware into your Redux chain.

### If your website is a Single Page Application (SPA)

```js
import { applyMiddleware, createStore } from 'redux';
import OpenReplay from '@openreplay/tracker';
import trackerRedux from '@openreplay/tracker-redux';

const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
tracker.start();
const openReplayMiddleware = tracker.use(trackerRedux(<options>)); // check list of available options below

//...
const store = createStore(
  reducer,
  applyMiddleware(openReplayMiddleware) 
);
```

### If your web app is Server-Side-Rendered (SSR)

Follow the below example if your app is SSR. Ensure `tracker.start()` is called once the app is started (in `useEffect` or `componentDidMount`).

```js
import { applyMiddleware, createStore } from 'redux';
import OpenReplay from '@openreplay/tracker/cjs';
import trackerRedux from '@openreplay/tracker-redux/cjs';

const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
const openReplayMiddleware = tracker.use(trackerRedux(<options>)); // check list of available options below


const store = createStore( // You can define/use it anywhere in response handlers
  reducer,
  applyMiddleware(openReplayMiddleware)
);

//...
function MyApp() {
  useEffect(() => { // use componentDidMount in case of React Class Component
    tracker.start();
  }, []);
  //... Use store here
}

```

## Options

You can customize the middleware behavior with options to sanitize your data.

```js
trackerRedux({
  actionFilter: action => action.type !== 'DRAW', // only actions which pass this test will be recorded
  actionTransformer: action => action.type === 'LOGIN' ? null : action,
  actionType: action => action.type // action type for search, that's the default one
  stateTransformer: state => {
    const { jwt, ..._state } = state;
    return _state;
  },
})
```

## Troubleshooting

Having trouble setting up this plugin? please connect to our [Slack](https://slack.openreplay.com) and get help from our community.