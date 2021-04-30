---
title: "NgRx"
metaTitle: "NgRx"
metaDescription: "NgRx plugin for OpenReplay."
---

This plugin allows you to capture `NgRx` actions/state and inspect them later on while replaying session recordings. This is very useful for understanding and fixing issues.

## Installation

```bash
npm i @openreplay/tracker-ngrx --save
```

## Usage

Add the generated meta-reducer into your `imports`. See [NgRx documentation](https://ngrx.io/guide/store/metareducers) for more details.

## If your website is a Single Page Application (SPA)

```js
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import OpenReplay from '@openreplay/tracker';
import trackerNgRx from '@openreplay/tracker-ngrx';
//...
const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
const metaReducers = [tracker.use(trackerNgRx(<options>))]; // check list of available options below

tracker.start();

//...
@NgModule({
  imports: [StoreModule.forRoot(reducers, { metaReducers })]
})
export class AppModule {}
```

### If your web app is Server-Side-Rendered (SSR)

Follow the below example if your app is SSR. Ensure `tracker.start()` is called once the app is started (in `useEffect` or `componentDidMount`).

```js
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import OpenReplay from '@openreplay/tracker/cjs';
import trackerNgRx from '@openreplay/tracker-ngrx/cjs';
//...
const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
const metaReducers = [tracker.use(trackerNgRx(<options>))]; // check list of available options below
//...
  @NgModule({
    imports: [StoreModule.forRoot(reducers, { metaReducers })]
  })
  export class AppModule {}
}

```

## Options

You can customize the middleware behavior to sanitize your data.

```js
trackerNgRx({
  actionFilter: action => action.type !== 'DRAW', // only actions which pass this test will be recorded
  actionTransformer: action => action.type === 'LOGIN' ? null : action,
  actionType: action => action.type // action type for search, that's the default one
  stateTransformer: state => {
    const { jwt, ..._state } = state;
    return _state;
  },
})
```
