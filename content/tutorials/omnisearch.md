---
title: "OmniSearch"
metaTitle: "Taking advantage of the OmniSearch"
metaDescription: "Take advantage of the powerful search feature of OpenReplay"
---

The top search bar you see on the UI of OpenReplay is much more than a simple search bar, it allows you to craft very complex search queries with very little effort.

For the purpose of the examples shown here, we're going to be discussing the test application called "I'm bored", which suggests activities for you and your group of friends based on different search parameters.

Here is a screenshot of the UI our fake users would have the interact with:

![](https://i.imgur.com/6BtPzTs.png)

## Performing a simple search 
The most basic use case for the search bar, is to search sessions of a particular user. Either because that's your testing user or because you're looking for the session of a client who's complaining about your product.
If you're setting the user ID when you instantiate the tracker, you'll be able to see the different IDs on the session list.

To do that, when you click on the search bar, select the "User Id" option, as shown below:

![](https://i.imgur.com/jZU6hwG.png)

When you do that, you'll see the option to specify the user id as part of the filters. 

![](https://i.imgur.com/6Ac5cDB.png)

By default, the filter with try to match the exact word you put in there, that's because of the "is" modifier next to the input field. You can change that to other behaviors, such as:

- is any
- is not
- starts with
- ends with
- contains
- not contains
- is undefined

For our example, we're going to leave it at "is" since we know the exact email address of our user.
As you can see in the following image, when we filter by id "thisisatest@gmail.com" we get only those results:

![](https://i.imgur.com/kAjALWs.png)

But what if we want more?

## Adding multiple steps to our search
What if we want to search for sessions where the user clicks a particular link, and then the app sends a request to a particular endpoint and finally we get a specific response code back from the server?

Individually each condition is not that complex, but we're looking for all of them together.
That's not a problem for our Omnisearch 
On the left bottom corner of the filter section, you have the "+ADD STEP" option to add multiple factors to the filters.

When you click on it, you'll see the same options you see when clicking on the search bar.
Here you'll be able to pick all options however you think you should construct the search.

In our case, we want to search for:

- A particular user id.
- All sessions with a click on a specific link.
- All sessions with requests to one particular URL.
- Finally, all sessions sharing the same family of status codes.

When you tie all these filters together, you get a complex search filter that matches your particular sessions.
Let's take a look at what that would look like in the UI:

![](https://i.imgur.com/RX9PeH3.png)

There are several things to note here:

1. The user id is treated as a normal filter while the rest of the parameters are treated as events. This is because you can also specify the order in which these events take place (and the user id will always be there).
2. The click event is specifying the text on the button we're clicking (notice the "Get me something!" string). This will **autocomplete** once you start typing.
3. The modifier on the URL is changed from "is" to "contains". This is important because the autocomplete will not take into account URL parameters, but as part of this request, we're sending all attributes from the form as URL parameters (i.e it's a GET request). That way we can encompass all requests, no matter the combination used.
4. We've changed the modifier for the "status code" value from "=" to "<" because I'm looking for all success response codes (2XX).
5. Notice the "AND" highlighted on the top right corner next to "OR" and "THEN". That modifier makes it so all steps and filters are evaluated with an AND. We could change them to an OR (for example), if we wanted them all to be evaluated individually.

You can change filters around, or even boolean conditions to make your filter exactly how you need it.
And if you're happy with the result, just to make sure you don't have to set it up every time you need it, you can save your filter.

## Saving your filters
This functionality makes sure you're not having to re-create your complex filters every time you want to use them.
And doing so it's extremely easy.

Say we have a filter that only shows sessions with dead clicks (clicks that don't do anything) on the home page. We want to keep that search so we can constantly check whether new issues like this appear in the future.
All we need to do, is set it up, and click on the "SAVE SEARCH" link in the lower right corner of the search box.
As seen in the following image:

![](https://i.imgur.com/b3GP8xh.png)

Give it a name and click on the "Create" button. 

![](https://i.imgur.com/TONFroV.png)

After that, your saved search will appear next to the search bar, like so:

![](https://i.imgur.com/n1GsndD.png)

---

The Omnisearch provides you with search superpowers, but to take advantage of them, you have to pick the right options.

If you still have questions, make sure to reach out to our devs on our [Discord community](https://discord.openreplay.com/).