---
title: "GraphQL"
metaTitle: "GraphQL"
metaDescription: "GraphQL plugin for OpenReplay."
---

This plugin allows you to capture `GraphQL` requests and inspect them later on while replaying session recordings. This is very useful for understanding and fixing issues.

`GraphQL` plugin is compatible with Apollo and Relay implementations.

## Installation

```bash
npm i @openreplay/tracker-graphql
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

export const recordGraphQL = tracker.use(trackerGraphQL());

tracker.start();
```

### If your web app is Server-Side-Rendered (SSR)

Follow the below example if your app is SSR. Ensure `tracker.start()` is called once the app is started on the client side (in `useEffect` or `componentDidMount`).

```js
// openreplay.js
import OpenReplay from '@openreplay/tracker/cjs';
import trackerGraphQL from '@openreplay/tracker-graphql/cjs';

export const tracker = new OpenReplay({
  projectKey: PROJECT_KEY
});
export const recordGraphQL = tracker.use(trackerGraphQL());

// MyApp.js
import { tracker } from './openreplay';

function MyApp() {
  useEffect(() => { // use componentDidMount in case of React Class Component
    tracker.start();
  }, [])
}
//...
```

### Relay

For [Relay](https://relay.dev/) you should manually put `recordGraphQL` call to the `NetworkLayer` implementation. If you have standard `Network.create` way to implement it, then you should follow the below example.

```js
import { Environment } from 'relay-runtime';
import { recordGraphQL } from './openreplay'; // see above for recordGraphQL definition

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
import { ApolloLink } from '@apollo/client';
import { recordGraphQL } from './openreplay'; // see above for recordGraphQL definition

const trackerApolloLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(result) => {
    const operationDefinition = operation.query.definitions[0];
    return recordGraphQL(
      operationDefinition.kind === 'OperationDefinition' ? operationDefinition.operation : 'unknown?',
      operation.operationName,
      operation.variables,
      result
    );
  });
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

## Troubleshooting

Having trouble setting up this plugin? please connect to our [Slack](https://slack.openreplay.com) and get help from our community.