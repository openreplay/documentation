---
title: "Upload Source Maps"
metaTitle: "Upload Source Maps"
metaDescription: "Upload source maps to OpenReplay."
---

OpenReplay supports un-minifying JavaScript via source maps. By uploading them to OpenReplay, you will be able to see the source code context obtained from stack traces in their original form, which is very useful for debugging minified code (UglifyJS), or transpiled code (TypeScript, ES6).

## Setup

Install the sourcemaps NPM module:

```bash
npm i @openreplay/sourcemaps-uploader
```

## Upload Source Maps to OpenReplay

Then, you need to set up your build process to create the various source files. Source maps can be uploaded for a **single file**:

```bash
sourcemaps-uploader -k API_KEY -i PROJECT_KEY file -m ./dist/app.js.map -u https://mywebsite.com/app.min.js
```

Or a **directory** including many files:

```bash
sourcemaps-uploader -k API_KEY -i PROJECT_KEY dir -m ./dist -u https://mywebsite.com/
```

- `-k`: API Key ([Preferences > Account](https://app.openreplay.com/client/account)).
- `-i`: Project Key 'Preferences > Projects'.
- `-m`: Path to source maps file(s) (can also be a directory).
- `-u`: URL to the JavaScript asset (if single file) or base URL (in case of a directory).
