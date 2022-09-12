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

### Input Field

Using the `data-openreplay-obscured` (mask the value) or `data-openreplay-hidden` (completely ignore) HTML attributes on any input tag.

```HTML
<form action="/action_page.php">
  First name: <input type="text" name="fname" data-openreplay-obscured><br>
  Last name: <input type="text" name="lname" data-openreplay-hidden><br>
  <input type="submit" value="Submit">
</form>
```

### UI Component

Obscuring any UI component/part using the `data-openreplay-masked` HTML attribute (see example below).

```HTML
<div style="background-color:lightblue" data-openreplay-masked>
  <h3>This is a sensitive information</h3>
  <p>This is an important paragraph.</p>
</div>
```

Excluded DOM elements, as well as their children, will be sanitized at the tracker level and therefore won't be visible in the session replays. In the below example, we masked user events so they won't appear in our session recordings.

> **Note:** Even if your excluded DOM elements contain `input` fields, these fields will not be sanitized. If you're looking to sanitize the content of these fields, either use the `data-openreplay-hidden` if you have access to the inputs, or the `data-openreplay-htmlmasked` attribute (see below) to remove the entire HTML element container (and children) from the recording.

![Obscured UI Components in Session Replay](../static/gdpr-2.png#center)

### Entire Containers

You can hide an entire piece of html using the `data-openreplay-htmlmasked` HTML attribute when you need to remove sensitive data like charts.

```HTML
<div style="background-color:lightblue" data-openreplay-htmlmasked>
  <div> sensitive information </div>
  <svg> important chart </svg>
</div>
```

This will result in the following DOM being recorded by the tracker (keep in mind that parent container's size should be constant):

```HTML
<div style="background-color:lightblue" data-openreplay-htmlmasked/>
```