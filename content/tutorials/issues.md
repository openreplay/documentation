---
title: "Issue types in OpenReplay"
metaTitle: "Understaning issue types in OpenReplay"
metaDescription: "Learn how to get the most out of the different issues auto-detected by OpenReplay"
---

Other than providing great tools to help you debug your application, OpenReplay automatically categorizes different types of events inside the replay and lets you know what kind of issues are in them.

This is a great way to quickly filter problematic sessions out of the potentially thousands that your product could be generating daily.

## Understanding the different issue types

To make things simple, all issue types are listed on the left side of your screen whenever you're looking at the list of sessions.

![](https://i.imgur.com/2Rygjwf.png)

You don't have to do anything special for OpenReplay to pick up on them and identify them. That's the best part, as long as you start recording sessions, you can then open the list of replays and filter by the detected set of issues.

### Issues detected by OpenReplay

There are 8 total different issue types detected by OpenReplay that you can use as filters on your main list of replays.

1. **Errors**: Any unheld exception that gets thrown from your application will be picked up by OpenReplay and highlighted on your timeline during the production.
2. **Bad Requests**: Whenever your code sends a request that receives a 4XX status code, then it'll be flagged on your timeline.
3. **Missing images**: Any image you incorrectly reference or for any other reason fails to load, will flag the replay so you can understand what's missing.
4. **Click rage**: This is triggered whenever your user clicks multiple times on the same element. Regardless of whether those clicks produce some results or not, whenever a user clicks many times on the same element is a sign that something might be wrong with your UX. So OpenReplay flags the session so you can review where and when this happens.
5. **Dead clicks**: These are clicks that produce no results. Essentially whenever your users click either a button, a link or any element on their screen, we'll pick it up and flag the session. Dead clicks are a clear indicator that there is a problem with your design because it's confusing your users into thinking that they can click somewhere they actually can't. So explore those sessions.
6. **High Memory**: OpenReplay monitors the resource consumption of your application to provide analytics about it. But as an added bonus, we also flag sessions that have high memory consumption compared to the average of your recorded sessions.
7. **High CPU**: Same as with memory, if the CPU utilization of a particular session goes over the computed average of all other sessions, then we'll flag it for you to look at.
8. **Crashes**: Any session in which the application crashes (is rendered useless) will be flagged for you to review.

## Visualizing the issues during the replay of a session

The good thing about the replay mechanics is that sessions don't just get flagged with these errors, you can also review them to understand exactly _when_ they happen and by looking at your user's actions, you can also find out the _why_ behind them.

The following screenshot shows you these issues displayed in different parts of the player's UI:



![](https://i.imgur.com/byIiNZO.png)

As you can appreciate, right on the timeline you have all the issues found during the recording of the session. Each issue will be identified by a different icon.
But in cases like in the screenshot where there are too many all clamped together, the list of User Events on the right can help you identify the order in which they happen (granted, these are only _user_ events, meaning that not everything is registered here).

By clicking on both, the icons on the timelines, or the elements on the list of events, you'll jump to the point in time, within the replay, where that event takes place.

If on top of this, you're using plugins to enhance the type of data being captured, like [the fetch plugin](https://docs.openreplay.com/tutorials/fetch) to capture the request information, you'll be able to inspect these issues even further.
Take a look at the following screenshot showing the details of a failed request:


![](https://i.imgur.com/97bREgW.png)

Notice the **404 status** code on the top right corner of the screen. And the rest of the request information that is below it.

---

Learn to take advantage of the issue types and the filters on the list of replays to help you find the most problematic ones.
    
If you have further questions about this topic, please reach out to us on our [Discord community](https://discord.openreplay.com/) and ask our devs directly!