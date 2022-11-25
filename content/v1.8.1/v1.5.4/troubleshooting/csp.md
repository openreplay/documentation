---
title: "Content Security Policy (CSP)"
metaTitle: "CSP"
metaDescription: "Content Security Policy for allowing OpenReplay to record sessions."
---

Below is the policy (CSP) for allowing OpenReplay to record sessions. This is applicable to OpenReplay Cloud users, but it can be adapted for self-hosted installations:

```HTML
worker-src ‘self’ blob: https://*.openreplay.com; script-src ‘self’ https://*.openreplay.com;
```

Please note that the `worker-src` directive is not supported in Safari (and mobile Safari). Using it should not prevent OpenReplay from recording sessions.