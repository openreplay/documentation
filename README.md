<p align="center">
  <a href="https://docs.openreplay.com">
    <img src="/public/static/OpenReplay150x150.png" height="70">
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

All MDX pages must go inside the `src/pages` folder, and in there, use the folder structure to determine where to add them. 

### Handling multiple versions of the same page
Inside the `src/pages` folder you'll find language folders and version folders inside them. The version folders start with `vX.Y.Z`, those folder will have a copy of the root of the `src/pages` folder (minus themselves, of course).

For every new page that is added, it needs to be duplicated into every version folder to make sure the user is able to switch versions with the version navigation dropdown and still land on the desired page.

#### Handling incompatible versions
If you're adding a page about a feature that is not compatible with all versions, you'll have to:

1. Add a frontmatter element inside the pages to signal the compatible version-folder. The element is called `minVersion` and uses a string to signal the minimum version of OpenReplay that is compatible (i.e "1.6.0").
2. Add the `<IncompatibleVersionWarning>` component at the top of the document. Signal the minimum compatible version through the use of the `minVersion` property. This component is located inside the `src/components/incompatibleVersionWarning.astro` file.

## Adding an entire new version to the documentation
To add an entire new version to the documentation, use the script at `script/add-new-version.mjs`.
This script will assume the new version is the latest version, so **don't use it to add past versions**.

Note that the script will generate the new version for all active languages.

To run the script:

```
node script/add-new-version.mjs <major>.<minor>.<patch>
```


## Translating the documentation

If you're looking to add a brand new language to the repo or translate a part of it, check out our detailed [guide here](./TRANSLATING.md).
