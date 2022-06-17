---
title: "Using the Axios plugin to sanitize request data"
metaTitle: "Learn how to use the Axios plugin to sanitize request information"
metaDescription: "Learn how to use the Axios plugin to capture and sanitize request information inside your session replays"
---


# Sanitizing data with the Axios plugin

If you’re using Axios on your front-end and want to capture the request data inside a replay, you can use the [Axios plugin](https://docs.openreplay.com/plugins/axios).

However, when that happens, you’ll also expose potential personal information that your front-end might be sending in those requests from your users (like email addresses, bank account information, etc). 

That is why you can provide a sanitizer function with the Fetch and the Axios plugins, which would allow you to keep that information from being captured.

Let’s look at how you’d implement a sanitizer for the Axios plugin inside a Next.js project.

## The project

For this tutorial, we’ll use [this repository](https://github.com/deleteman/nextjs-commerce-example) for a sample e-commerce site.

The site looks like this:

![The e-commerce site used for this tutorial](images/Captura_de_pantalla_2022-06-17_a_las_10.40.45.png)

Notice the red rectangle in that screenshot, for this example, we will replace those products with others, taken from an external API. That request will be done using Axios and the Axios plugin will be used to capture the request data in our replay.

## The project setup

This Next.js project will define a Context provider which will enable the rest of the components to access the OpenReplay tracker. You can see more details on how that implementation is done following this [OpenReplay + Next.js tutorial](https://docs.openreplay.com/tutorials/next).

The context provider, able to use plugins and providing two methods looks like this:

```tsx
import { createContext } from 'react'
import Tracker from '@openreplay/tracker'
import { v4 as uuidV4 } from 'uuid'
import { useReducer } from 'react'

export const TrackerContext = createContext()
function defaultGetUserId() {
  return uuidV4()
}
function newTracker(config) {
  const getUserId =
    config?.userIdEnabled && config?.getUserId
      ? config.getUserId
      : defaultGetUserId
  let userId = null
  const trackerConfig = {
    projectKey:
      config?.projectKey || process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY,
  }

  console.log('Tracker configuration: ')
  console.log(trackerConfig)
  const tracker = new Tracker(trackerConfig)
  if (config?.userIdEnabled) {
    userId = getUserId()
    tracker.setUserID(userId)
  }
  return tracker
}
function reducer(state, action) {
  switch (action.type) {
    case 'init': {
      if (!state.tracker) {
        console.log('Instantiaing the tracker for the first time...')
        let t = newTracker(state.config)
        if (state.config.plugins) {
          state.config.plugins.forEach((p) => {
            console.log('Using plugin...')
            t.use(p.fn(p.config))
          })
        }
        return { ...state, tracker: t }
      }
      return state
    }
    case 'start': {
      console.log('Starting tracker...')
      state.tracker.start()
      return state
    }
  }
}
export default function TrackerProvider({ children, config = {} }) {
  let [state, dispatch] = useReducer(reducer, { tracker: null, config })
  let value = {
    startTracking: () => dispatch({ type: 'start' }),
    initTracker: () => dispatch({ type: 'init' }),
  }
  return (
    <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>
  )
}
```

The key to this context provider, is the 2 functions it provides, the `startTracking` and the `initTracker` function. The latter will be called to get the tracker started and it will, in turn, call the `use` method if plugins are part of the configuration object received by the provider.

### Using the Provider

We will be using the above context provider to inject the tracker into all components, so we’ll edit the _app.tsx file like so:

```tsx
import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'
import TrackerProvider from '../context/trackerProvider'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import trackerAxios from '@openreplay/tracker-axios/cjs'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  let plugins = [
    {
      fn: trackerAxios,
      config: {
        failuresOnly: false,
      },
    },
  ]

  return (
    <TrackerProvider config={{ plugins }}>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </TrackerProvider>
  )
}
```

Currently, the plugin is configured to capture every single request (thus, the `failuresOnly` property set to `false`).

### Adding the Axios request and getting the Tracker started

For this to work, we’ll get the tracker going from the `index.js` file and add the function to request the new products inside this file.

The `Home` component, will now look like this:

```tsx
export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { initTracker, startTracking } = useContext(TrackerContext)
  const [makeUpProducts, setMakeUpProducts] = useState<Product[]>([])

  useEffect(() => {
    initTracker()

    async function getProds() {
      await startTracking()
      const prods: Product[] = await getMakeUpProducts()
      setMakeUpProducts(prods)
    }

    getProds()
  }, [])

  return (/*...*/)
}
```

We’ll use the `useEffect` hook to trigger this once the page finishes loading. The other important detail to notice here, is the timing  between the `startTracking` function call and the request to the external API. 

We would typically have the external request done from the `getStaticProps` function, but we need this to happen after the Tracker is started, which can only happen from the front-end.

**Notice** that if you perform the requests with Axios before the tracker calls the start method, they won’t be captured by OpenReplay.

The `getMakeUpProducts` function does nothing interesting more than a simple Axios request to a public API. 

```tsx
async function getMakeUpProducts(): Promise<Product[]> {
  console.log('Getting the makeup products')
  let { data } = await axios.get(
    'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline&apiKey=123fff132'
  )
  const products: MakeUpProduct[] = data

  let newProds: Product[] = products.map((p) => {
    return {
      id: '' + p.id,
      slug: slugify(p.name),
      name: p.name,
      description: '',
      images: [{ url: p.image_link }],
      variants: [],
      price: {
        value: +p.price,
      },
      options: [],
    }
  })

  return newProds
}
```

The only thing of note here is the  apiKey parameter. For this tutorial, we’ll assume we want to protect the API Key to ensure this information is protected.

## **Sanitizing** the request data

The sanitizer function will be defined as part of the plugin's configuration, so we’ll go back to the `_app.tsx` file, and add to the `plugins` variable.

```tsx
let plugins = [
    {
      fn: trackerAxios,
      config: {
        failuresOnly: false,
        sanitiser: (data: RequestResponseData) => {
          data.url = data.url.replace(/apiKey=([0-9a-z]+)/, 'apiKey=XXXXXX')
          return data
        },
      },
    },
  ]
```

The sanitizer simply replaces the URL parameter with a string that hides the actual value. The request itself is sent correctly, but the captured version looks like this:

![Request data sanitized](images/Captura_de_pantalla_2022-06-17_a_las_12.16.42.png)

Thus we’ve successfully hidden the piece of personal information we wanted to hide.

If you’d like to test the code, you can clone this [Github](https://github.com/deleteman/nextjs-commerce-example) repo.

## Do you have questions?

If you have any issues setting up the tracker on your Remix-based project, please reach out to us on our [Slack community](https://slack.openreplay.com/) and ask our devs directly!