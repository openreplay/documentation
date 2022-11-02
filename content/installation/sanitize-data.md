---
title: "Sanitize Data"
metaTitle: "Sanitize Data"
metaDescription: "How to sanitize data and ensure privacy for your users."
---

You can sanitize what OpenReplay captures at both a global and/or granular level. Any obscured or ignored data will not be captured at the source. In other words, that data will never leave the user's browser.

We are constantly improving our privacy related features, so let us know if you need something that which we don't yet support.

If you'd like to watch a quick tutorial on how to sanitize data, use [this YouTube video](https://youtu.be/22-UCoocy6s), otherwise keep reading for more details.

## Global Level

Data can be sanitized at the tracker level, when setting up OpenReplay.

### I'm using OpenReplay Script

![Project Configuration in OpenReplay](../static/gdpr-1.png#center)

1) Click on the *Tracking Code* of your Project under 'Preferences > Projects'.
2) The data recording options should appear right before the code snippet:
- **Inputs**: To ignore, obscure or record all your users' input values.
- **Do not record any numeric text**: To ignore numeric values contained in text elements.
- **Do not record email addresses**: By default, all emails contained in text elements are obscured and won't appear in the replays. You can disable that by unticking the box.
3) Changing data recording options impacts the code snippet. Make sure to copy/paste the updated script in your web app.

### I'm using OpenReplay NPM

There are a set of privacy related options you can pass to the constructor:
- `obscureTextEmails?: boolean` Obscure emails in text elements. Emails will be converted to a random chain of asterisks. Default: true.
- `obscureTextNumbers?: boolean` Obscure numbers in text elements. Numbers will be converted to a random chain of asterisks. Default: false.
- `obscureInputEmails?: boolean` Obscure emails in input fields. Email values will be converted to a random chain of asterisks. Default: true.
- `obscureInputDates?: boolean` Obscure dates in input fields. Date values will be converted to a random chain of asterisks. Default: false.
- `defaultInputMode?: 0 | 1 | 2` Default capture mode for input values. Respectively: plain, obscured or ignored. Default: 0 (plain).

Sanitized text, email and numbers are obscured or suppressed before sending the data to OpenReplay servers. Therefore, changes applied to the above options cannot be retroactive and will only apply to newly collected data.

## Granular Level

You can also sanitize your data at the code level for better granularity. This is useful for obscuring or ignoring DOM elements and input fields.

### Using HTML attributes

- `data-openreplay-obscured` to mask text content of `<input>` tags, `<img>` and other HTML elements (i.e. `<div>`) with the exception of `<svg>` and `<canvas>`.

```HTML
<!--Obscuring input fields-->
<form action="/action_page.php">
  Name: <input type="text" name="fname" data-openreplay-obscured><br>
  <input type="submit" value="Submit">
</form>
<!--Obscuring a div element-->
<div style="background-color:lightblue" data-openreplay-obscured>
  <h3>This is a sensitive information</h3>
  <p>This is an important paragraph</p>
  <img src="important_image.jpg">
</div>
```

- `data-openreplay-hidden` to redact the content of `<input>` tags, `<img>`, `<svg>` and other HTML elements (i.e. `<div>`) with the exception of `<canvas>`. The element's content (including its children components) is removed, but it's props and arguments are kept, like in this example:

```HTML
<div style="background-color:lightblue" data-openreplay-hidden>
  <div>This is a sensitive information</div>
  <svg>An important chart</svg>
</div>
```

This will result in the following DOM being recorded by the tracker:

```HTML
<div style="background-color:lightblue" data-openreplay-hidden>
</div>
```

### Using the domSanitizer function

- `domSanitizer: (node: Element) => SanitizeLevel` function to avoid having to instrument each HTML component that needs to be sanitized. `SanitizeLevel` can be `Plain` (0), `Obscured` (1) or `Hidden` (2). This function is passed to the tracker's constructor. Below is an example of redacting all HTML elements having a specific CSS class name:

```js
// Import SanitizeLevel enum
import Tracker, { SanitizeLevel } from "@openreplay/tracker";

const tracker = new Tracker({
  projectKey: PROJECT_KEY,
  domSanitizer: (node: Element) => {
    const elementClassNames = node.classList

    if (elementClassNames.contains('to_be_redacted_class')) {
      return SanitizeLevel.Hidden
    }

    if (node.id === 'sensitiveData') {
      return SanitizeLevel.Obscured
    }

    return SanitizeLevel.Plain
  }
})
tracker.start()
```

> **Note:** All sanitized elements are masked/redacted at the source (tracker) level so that sensitive data never reaches the OpenReplay instance.

## Troubleshooting

Having trouble sanitizing data? Please reach out to our [Slack](https://slack.openreplay.com) and get help from our community.