<p align="center">
  <a href="https://docs.openreplay.com">
    <img src="static/media/logo.png" height="70">
  </a>
</p>

OpenReplay is an open-source session replay stack that let's you see what users do on your web app, helping you troubleshoot issues faster.

## Getting Started
- [Deployment](https://docs.openreplay.com/deployment): OpenReplay can be deployed anywhere. Follow our step-by-step guides for deploying it on major public clouds and platforms.
- [Installation](https://docs.openreplay.com/installation/setup-or): Setup OpenReplay in minutes and start recording user sessions.
- [Configuration](https://docs.openreplay.com/configuration.md): Configure and secure your OpenReplay instance.

## Go Further
- [Plugins](https://docs.openreplay.com/plugins): Learn about the different plugins to better debug your application's store and queries.
- [Integrations](https://docs.openreplay.com/integrations): Get the best out of OpenReplay by integrating it with your favorite tools: Sync your backend logs with session replays, report issues to your ticketing system and more.
- [Troubleshooting](https://docs.openreplay.com/troubleshooting/session-recording-issues): Dig into our guide for troubleshooting common issues.
- [Structure](https://docs.openreplay.com/structure/exported-data): Understand OpenReplay structure, data model and technical stack.

## Adding a page to the documentation

All Markdown pages must go inside the `content` folder, and in there, use the folder structure to determine where to add them. 
For each folder, you'll also have an equally named Markdown file listing all the content inside it.

### Handling multiple versions of the same page
Inside the `content` folder you'll find version folders starting with `vX.Y.Z` those folder will have a copy of the root of the `content` folder (minus themselves, of course).

For every new page that is added, it needs to be duplicated into every version folder to make sure the user is able to switch versions with the navigation dropdown and still land on the desired page.

#### Handling incompatible versions
If you're adding a page about a feature that is not compatible with all versions, you'll have to:

1. Add a frontmatter element inside the pages store in the compatible version-folder called `minVersion` and use a string to signal the minimum version of OpenReplay that is compatible (i.e "1.6.0").
2. Add the `<IncompatibleVersionWarning>` component at the top of the document. Signal the minimum compatible version through the use of the `minVersion` property. 

This will take the page out of the left-side navigation tree and at the same time, it'll add a warning on the top of the page, making sure the user sees it and knows they're reading something that won't work for their chosen version of OpenReplay.

Example:

```JavaScript
<IncompatibleVersionWarning minVersion="1.6.0" />
```

