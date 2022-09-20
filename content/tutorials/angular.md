---
title: "Intercept HTTP Requests in Angular"
metaTitle: "Tracking HTTP requests in your Angular application with the OpenReplay"
metaDescription: "Learn how to get the tracker working on your Angular application"
---
If you’re trying to track the requests sent with your Angular application, OpenReplay does not provide a plugin as it does for Fetch or Axios.

That said, you can still configure it to track your requests with the information you want using an [HTTPInterceptor](https://angular.io/api/common/http/HttpInterceptor).

In this tutorial I’m going to show you how to create an HTTPInterceptor capable of recording both, the requests and responses sent by your HTTPClient.

## Creating the interceptor

The interceptor is a particular type of object you can inject into your App’s code to capture every single request sent with Angular’s default HTTP client and capture the response.

Through this logic, we’ll take advantage of OpenReplay’s custom events, which allow you to send any event you want to be captured inside your session, so we’ll mimic what the Fetch or Axios plugin would do for other setups.

The code for the interceptor is as follows:

```tsx
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ReplaySessionService } from '../replay-session.service';

@Injectable({providedIn: 'root'})
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private replaySessionService: ReplaySessionService,
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
		//This function will be called with the response a few lines below
		const handleResponse = (request: HttpRequest<any>, response: HttpResponse<any>, event: string) => {
	     //we forward our data to the service, which will create the custom event and send it
			this.replaySessionService.sendEventToReplaySession(event, { request, response })
    }
    return next.handle(request).pipe(
      //filter out events that aren't http reponses
      filter( (event: any) => event instanceof HttpResponse),
      map( (resp: HttpResponse<any>) => { //for each response, call handleResponse
        handleResponse(request, resp, `${request.url}`)
        return resp
      }),
      map((event: HttpEvent<any>) => {
        return event;
      })
    );
  }
}
```

We’ll look at the replay service in a second, but just assume it’s there right now. Save this file inside your `app` folder.

Then edit the `app.module` file to add the following inside the @ngModule directive :

```tsx
providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true}
  ]
```

So `app.module` file should look something like this:

```tsx
import { NgModule } from '@angular/core';

/*
imports...
*/
import { HttpConfigInterceptor } from './interceptor/index';

@NgModule({
  imports: [
   /*...*/
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true}
  ],
  declarations: [
    /*...*/
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

With this out of the way, your application now knows to inject your interceptor on every HTTP request performed.

Now let’s take a look at the actual session replay service.

## Creating the SessionReplayService

First add your new service with the following command:

```tsx
$ ng generate service replay-session
```

This will create a new Angular service at the root of your app called `replay-session.service.ts`

The content of that file should look like this:

```tsx
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import OpenReplay from '@openreplay/tracker'

type ReqRespType = {
  request: HttpRequest<any>,
  response: HttpResponse<any>
}

@Injectable({
  providedIn: 'root'
})
export class ReplaySessionService {
  tracker: OpenReplay|null = null

  constructor() {

    this.tracker = new OpenReplay({
        projectKey: "<YOUR PROJECT KEY>",
    })
		//you can set up any other OR plugins here as well

    this.tracker.start()
   }

  sendEventToReplaySession(event: string, params: ReqRespType): void {
    const {request, response} = params

    this.tracker?.event(event + "[request]", {
      method: request.method,
      url: request.url,
      params: request.params
    })
    this.tracker?.event(event + "[response]", {
      body: response.body,
      status: response.status,
      headers: response.headers
    })
  }
}
```

The constructor for the class, which because this is a service, we know will only be called once, takes care of instantiating the tracker and getting it started.

Then in our `sendEventToReplaySession` method, we use the `event` method to send two custom events.

If you go back to the interceptor class, you’ll notice that the “event” (the first parameter we get in this method) is actually the URL, so I’m attaching the words “[response]” and “[request]” to them to identify what gets recorded where.

Then I create the payloads for each event saving only the information I want to save.

With this working, here is what you get to see inside the Events tab in your replay:

![List of events](images/list-of-events.png)

And if you click on the details of one of these rows, you get the payload we saved:

![Event details](images/event-details.png)

In fact, you can even take that code and sanitize any field from the request or the response you don’t want visible inside the replay before calling the `event` method.

You can [check out this repository](https://github.com/deleteman/openreplay-angular-example) for the **complete source code** of a working Angular-based application with the Tracker.

## Do you have questions?

If you have any issues setting up the Tracker on your Angular project, please contact us on our [Slack community](https://slack.openreplay.com/) and ask our devs directly!