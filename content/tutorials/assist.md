---
title: "Enabling Assist"
metaTitle: "How to assist your users with live session replay"
metaDescription: "How to setup OpenReplay Assist and support your end users through live screen and WebRTC."
---

Session replay is a tool that every product and dev team needs once their application is in production. 
These tools allow them to understand how their final users interact with the product without the potential bias of a controlled user test group. With that information, they can understand things like user experience gaps, problems in the business logic due to incorrect interactions from the user, edge cases that need complex sequences of actions to be triggered, and many other options.

However, there is one use case that traditional session replay tools can't really handle: live session support.

Having the ability to see _live_ what your users are doing and respond to it directly, even taking control over their mouse or jumping on a quick call to _show_ them the problem, is priceless. And that is why OpenReplay implemented the [Assist feature](https://openreplay.com/feature-assist.html).

## What can OpenReplay Assist do for you?

In a normal scenario where you set up your application to record a user session, you'd get the usual events, errors and problems with your app delivered to your instance of OpenReplay (or to the SaaS version) after a few minutes of closing the tab (the app needs to make sure you didn't close it by accident after all). You'll be able to analyze step by step what the user did, but if you _do_ find a problem, you won't be able to review it directly with said user.

However, thanks to Assist, you'll now be able to:

+ Directly inspect what the user is doing, live, **from the moment they open up the page**. 
+ Thanks to the use of WebRTC, there is a 1 to 1 channel created between client and operator. This allows you to **open a call directly from the application**, without the need to have a 3rd party communication software installed in either of the computers involved.
+ **Take control of the user's mouse** (with their permission of course) and show them exactly where to click. 

Take a look at the UI of the assist feature as seen from the operator looking at what the user is doing at any given moment:

![](https://i.imgur.com/4vxXpHn.png)

Given this is a feature showing updates live, the key highlights would be the "email" and "mobile number" fields. The first one is being obfuscated to maintain the privacy of the user, and the latter is literarily ignored by the tracker to keep personal data from being collected.
And considering the transformation of the data is done on the client-side, there is no way for you, as an operator, to see these values.

This in turn, allows you to perfectly provide support for any type of system with the assurance to your users that there will be no treatment whatsoever of their personal data.

## Adding the Assist plugin to your setup

This feature is already available on all the latest versions of OpenReplay, so all we have to do, is to enable it.
If you're working with the package version of OpenReplay, all you have to do, is to install the following plugin directly from your command line:

```bash 
npm install @openreplay/tracker-assist
```

And then, use the following code to enable it:

```javascript 
//...
import OpenReplay from '@openreplay/tracker';
import trackerAssist from '@openreplay/tracker-assist';
//...
const tracker = new OpenReplay({
  projectKey: "your project key"
});
tracker.use(trackerAssist({})); //add this line
tracker.start();
```

If on the other hand, you're using the JS snippet that you got from the platform when you set it up for the first time, all you have to do, is to update a path.
Your original snippet should've been similar to this one:

```javascript 
<!-- OpenReplay Tracking Code for HOST -->
<script>
  var initOpts = {
    projectKey: "your project key",
    defaultInputMode: 0,
    obscureTextNumbers: false,
    obscureTextEmails: true,
  };
  var startOpts = { userID: "" };
  (function(A,s,a,y,e,r){
    r=window.OpenReplay=[e,r,y,[s-1, e]];
    s=document.createElement('script');s.src=A;s.async=!a;
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
  })("//static.openreplay.com/latest/openreplay.js",1,0,initOpts,startOpts);
</script>
```

Notice the path to the `openreplay.js` file at the bottom. We need to change that and instead put`openreplay-assist.js`, so make it look something like this:

```javascript 
<!-- OpenReplay Tracking Code for HOST -->
<script>
  var initOpts = {
    projectKey: "your project key",
    defaultInputMode: 0,
    obscureTextNumbers: false,
    obscureTextEmails: true,
  };
  var startOpts = { userID: "" };
  (function(A,s,a,y,e,r){
    r=window.OpenReplay=[e,r,y,[s-1, e]];
    s=document.createElement('script');s.src=A;s.async=!a;
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
  })("//static.openreplay.com/latest/openreplay-assist.js",1,0,initOpts,startOpts);
</script>
```

And that should be all you need to change on your basic setup to get access to the features of Assist. 

How cool is that?!

Note that if you happen to run into the following error message (like I did), you should follow [these steps](https://github.com/peers/peerjs/issues/630#issuecomment-910028230) to fix them.

**"Critical dependency: the request of a dependency is an expression"**

The fix from the issue should be enough to get you going.

Now you can begin to take full advantage of OpenReplay's Assist, so let's take a look at that.

## Watching a session live

Since the client doesn't have to do anything else from now on, it's time for you to look at the operator's side.

Directly on the platform click on the Assist option on the navigation menu, as shown below:

![](https://i.imgur.com/3LG9hcc.png)

Once you click there, you'll get a list of active Assist sessions. Once your user opens up the application, the session will pop up here automatically and you'll see it listed like so:

![](https://i.imgur.com/pp86irQ.png)

In there, you see the following information:

- The user ID, that email in there? You set it up using the `setUserID`  method on the tracker. 
- The start time and date of each session.
- The duration of the session (shown as "14 seconds" in the screenshot).
- Finally, the geoinformation about the user. You can see there I'm located in Spain, and additionally that I'm using Firefox on my Desktop macOS. 

There is a lot of info just here, and this is important for you to identify the session you want to watch live. After all, in this example I'm only showing you a single session, but there could be hundreds (or more) active at the same time.
On top of that, you could use the search bar to help you perform complex queries to find the right session. 

### Entering a specific session

Once you've located the session you were looking for, click on the "Play" icon of the session. This will take you to the live view of the client application.

You can see on the below side-by-side comparison how the Assist screen shows the session of the current user being observed.

![](https://i.imgur.com/G7xAxTZ.png)

Now, as you can appreciate, there are a few differences between what the user sees and what the operator sees. And for good measure.
The private information is automatically obfuscated or completely ignored. This is to protect the user being observed, after all as an operator you don't necessarily need to see a phone number or an email address. 
It's important to note that this is the default behavior, the tracker installed on the client application is detecting the type of data your entering and its format (like on the email field) and deciding on the spot to protect it.

However, if you wanted to change this behavior and make the tracker either ignore or obfuscate other fields, you can sanitize the data through different levels of granularity. The official docs have all the information you need if that's what you're looking for, so [check them out.](https://docs.openreplay.com/installation/sanitize-data)

### Taking control of your user's mouse

An extra feature (a very interesting one I may add), is the ability to take control over your client's mouse pointer. Through this functionality, you'll be able to control the mouse and click on different places of the application.
You won't be able to send any other type of input signals, but that should be enough to help you help your users.

And to access this feature, all you have to do, is to click on the "Remote Control" link on the top right section of your screen.
When you do that, your client will see a modal window requesting permission.

![](https://i.imgur.com/5HtwYtb.png)

Once confirmed, you'll gain control over their mouse, or rather, your pointer will show up on their screen and you'll be able to click and interact with the application as if you were using their mouse directly.
You can see that on the following screenshot, the red dot is your assist mouse, while the black pointer is the user's.

![](https://i.imgur.com/L9K20q2.png)

This is a fantastic feature when your users are unable to figure out how to interact with your app or where exactly to click.
You can even support them by initiating a live call with your user and using your red pointer to show them where to click.
The following screenshot shows me, having a live call with... well, me from two different computers with different OS. Voice and video are both transmitted over WebRTC.

![](https://i.imgur.com/Ob7QTzH.png)


## Do you have questions?

If you have any issues setting up the Assist plugin on your project, please contact us on our [Slack community](https://slack.openreplay.com/) and ask our devs directly!
