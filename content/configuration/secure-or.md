---
title: "Secure OpenReplay"
metaTitle: "Secure OpenReplay"
metaDescription: "Secure OpenReplay by configuring SSL and reCaptcha."
---

## Configure SSL

Rename (required) your private key to `site.key` and your certificate to `site.crt` then copy both files under `openreplay/scripts/helmcharts/openreplay/files/`. Now, simply uncomment the below block in `openreplay/scripts/helmcharts/vars.yaml`:
   
```yaml
nginx-ingress:
  sslKey: site.key
  sslCert: site.crt
```

> **Note:** If you don't have a certificate, generate one for your subdomain (the one provided during installation) using Let's Encrypt. Simply connect to OpenReplay instance, run `kubectl delete svc nginx-ingress -n app` then execute `bash openreplay/scripts/certbot.sh` and follow the steps.

If you wish to enable http to https redirection (recommended), then uncomment the below block, under the `nginx-ingress` section, in `openreplay/scripts/helmcharts/vars.yaml`:
   
```yaml
nginx-ingress:
  customServerConfigs: |
    return 301 https://$host$request_uri;
```

Finally, reinstall OpenReplay NGINX:

```bash
cd openreplay/scripts/helmcharts && ./openreplay-cli -I
```

## Set reCaptcha

OpenReplay supports reCaptcha (v2) for additional security. To enable this protection, edit `openreplay/scripts/helmcharts/vars.yaml` then uncomment and update the below env variables in `chalice` section:
- `captcha_server`: The URL to your reCaptcha service (e.g. https://www.google.com/recaptcha/api/siteverify)
- `captcha_key`: You reCaptcha secret key

Now reinstall the web server for the changes to take effect:

```bash
cd openreplay/scripts/helmcharts && ./openreplay-cli -I
```

Then, edit `env.js` in `openreplay/frontend/` and substitute the `CAPTCHA_SITE_KEY` variable with your reCaptcha site key. Finally, rebuild and deploy the frontend:

```bash
cd openreplay/frontend
sudo bash build.sh
sudo cp -arl public frontend
minio_pod=$(sudo kubectl get po -n db -l app.kubernetes.io/name=minio -n db --output custom-columns=name:.metadata.name | tail -n+2)
sudo kubectl -n db cp frontend $minio_pod:/data/
```

## Content Security Policy (CSP)

Here is an example of a policy (CSP) for allowing OpenReplay to record sessions. This has to be adapted depending on your domain and security requirements:

```HTML
worker-src ‘self’ blob: https://openreplay.mycompany.com https://*.openreplay.com; script-src ‘self’ https://openreplay.mycompany.com https://*.openreplay.com;
```

To apply your CSP to NGINX, connect to your OpenReplay instance and follow the below steps:

1. Open `openreplay/scripts/helmcharts/openreplay/charts/nginx-ingress/templates/configMap.yaml` and add your CSP in the `location / {` block:

```yaml
location / {
add_header Content-Security-Policy "worker-src ‘self’ blob: https://openreplay.mycompany.com https://*.openreplay.com; script-src ‘self’ https://openreplay.mycompany.com https://*.openreplay.com;";
...
}
```

1. Reinstall NGINX to apply your newly added CSP:

```bash
cd openreplay/scripts/helmcharts && ./openreplay-cli -I
```