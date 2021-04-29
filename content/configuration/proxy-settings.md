---
title: "Proxy Settings"
metaTitle: "Proxy Settings"
metaDescription: "Settings for running OpenReplay behind a proxy like NGINX or Apache2."
---

If you're running OpenReplay behind a proxy, adapt your config so it looks like the below settings.

## NGINX settings

Make sure your proxy is sending the `X-Forwarded-For` and `X-Forwarded-Proto` headers. SSL must also be enabled for OpenReplay to work. The rest of the config should look like this:

```yaml
location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_pass http://1.2.3.4; # replace with instance IP
    }
```

## Apache2 settings

Ensure `proxy`, `proxy_http` and `proxy_html` modules are enabled. SSL too should be configured, the rest of the settings should be similar to this:

```xml
<VirtualHost *:443>
    ProxyPass / http://1.2.3.4 <!-- replace with instance IP -->
    RequestHeader set X-Forwarded-Proto expr=%{REQUEST_SCHEME}
    # SSL + other config here
</VirtualHost>
```

## Public endpoints

In case you're protecting your OpenReplay instance with a proxy, ensure the below endpoints are publicly accessible for OpenReplay to work properly.

| Endpoint | Description |
|----------|-------------|
| /ingest | For capturing events and recordings |
| /static/openreplay.js | JavaScript code that loads OpenReplay |
