---
title: "GraphQL"
metaTitle: "GraphQL"
metaDescription: "GraphQL plugin for OpenReplay."
---

This plugin allows you to capture `GraphQL` requests and inspect them later on while replaying session recordings. This is very useful for understanding and fixing issues.

`GraphQL` plugin is compatible with Apollo and Relay implementations.

## Installation

```bash
npm i @openreplay/tracker-graphql --save
```

## Usage

The `plugin` call will return the function, which receives four variables `operationKind`, `operationName`, `variables` and `result`. It returns `result` without changes.

### If your website is a Single Page Application (SPA)

```js
import OpenReplay from '@openreplay/tracker';
import trackerGraphQL from '@openreplay/tracker-graphql';
//...
const tracker = new OpenReplay({
  projectKey: PROJECT_KEY,
});
tracker.start();
//...
export const recordGraphQL = tracker.use(trackerGraphQL());
```

### If your web app is Server-Side-Rendered (SSR)

Follow the below example if your app is SSR. Ensure `tracker.start()` is called once the app is started (in `useEffect` or `componentDidMount`).

```js
import OpenReplay from '@openreplay/tracker/cjs';
import trackerGraphQL from '@openreplay/tracker-graphql/cjs';
//...
const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
//...
function SomeFunctionalComponent() {
  useEffect(() => { // or componentDidMount in case of Class approach
    tracker.start();
  }, [])
}
//...
export const recordGraphQL = tracker.use(trackerGraphQL());
```

### Relay

For [Relay](https://relay.dev/) you should manually put `recordGraphQL` call to the `NetworkLayer` implementation. If you have standard `Network.create` way to implement it, then you should follow the below example.

```js
import { recordGraphQL } from 'tracker'; // see above for recordGraphQL definition
import { Environment } from 'relay-runtime';
//...
function fetchQuery(operation, variables, cacheConfig, uploadables) {
  return fetch('ENDPOINT', {
  //...
  })
    .then(response => response.json())
    .then(result =>
      recordGraphQL(operation.operationKind, operation.name, variables, result)
    );
}
//...
const network = Network.create(fetchQuery);
```

See [Relay Network Layer](https://relay.dev/docs/en/network-layer) for details.

### Apollo

For [Apollo](https://www.apollographql.com/) you should create a new `ApolloLink` with `recordGraphQL` call and put it to your chain. Here is an example on how to do it.

```js
import { recordGraphQL } from 'tracker'; // see above for recordGraphQL definition
import { ApolloLink } from 'apollo-link';
//...
const trackerApolloLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(result =>
    recordGraphQL(
      operation.query.definitions[0].operation,
      operation.operationName,
      operation.variables,
      result
    ),
  );
});
//...
const link = ApolloLink.from([
  trackerApolloLink,
  //...
]);
```

See [Apollo Link](https://www.apollographql.com/docs/link/) and
[Apollo Networking](https://www.apollographql.com/docs/react/networking/network-layer/)
for details.
