---
title: "Proxying"
metaTitle: "Proxying"
metaDescription: "How to proxy OpenReplay requests so they won't get blocked (SaaS)."
---

If you're not self-hosting OpenReplay but rather using our hosted solution, chances are that some sessions are not be recorded as requests to our servers may be blocked (adblockers, VPN, extensions, etc.).

You should be able to overcome this by:

1. Adding a `CNAME` record to your DNS:
- Name: `openreplay.mycompany.com` (this will be used in step 2)
- Value: `api.openreplay.com` (to point to our servers)

2. Now, assuming you’re using our NPM package, add `ingestPoint` to the tracker's constructor and set its value based on the previously added `CNAME` record, like below:

```js
//...
const tracker = new OpenReplay({
  projectKey: PROJECT_KEY,
  ingestPoint: "https://openreplay.mycompany.com/ingest"
});
tracker.start();
```

If you're relying on our JS snippet, then add `r.i="https://openreplay.mycompany.com/ingest";` like below:

```js
...
  r.getSessionToken=function(){};
  r.i="https://openreplay.mycompany.com/ingest";
})(0, PROJECT_KEY, "//static.openreplay.com/3.4.17/openreplay.js",1,29);
</script>
```