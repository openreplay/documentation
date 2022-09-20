---
title: "Secure OpenReplay"
metaTitle: "Secure OpenReplay"
metaDescription: "Secure OpenReplay by configuring SSL and reCaptcha."
---

## Configure SSL

If you're bringing your own certificate, create an SSL secret using the following command: `kubectl create secret tls openreplay-ssl -n app --key="private_key_file.pem" --cert="certificate.crt"`.

> **Note:** If you don't have a certificate, generate one, that auto-renews, for your subdomain (the one provided during installation) using Let's Encrypt. Simply connect to OpenReplay instance, run `cd openreplay/scripts/helmcharts && bash certmanager.sh` and follow the steps.

If you wish to enable http to https redirection (recommended), then uncomment the below block, under the `ingress-nginx` section, in `openreplay/scripts/helmcharts/vars.yaml`:
   
```yaml
ingress-nginx: &ingress-nginx
  controller:
    config:
      ssl-redirect: true
      force-ssl-redirect: true
```

> **Note:** Our `ingress-nginx` runs by default on ports `80|443`, but this can be easily changed, if needed, in `vars.yaml`:

```yaml
ingress-nginx: &ingress-nginx
  controller:
    service:
      ports:
        http: 80
        https: 443
```

Finally reinstall NGINX:

```bash
cd openreplay/scripts/helmcharts && ./openreplay-cli -I
```

## Set reCaptcha

OpenReplay supports reCaptcha (v2) for additional security. To enable this protection:

1. Open `openreplay/scripts/helmcharts/vars.yaml` then uncomment and update the below env variables in `chalice` section:
- `captcha_server`: The URL to your reCaptcha service (e.g. https://www.google.com/recaptcha/api/siteverify)
- `captcha_key`: You reCaptcha secret key

2. Edit `env.js` in `openreplay/frontend/` and substitute the `CAPTCHA_SITE_KEY` variable with your reCaptcha site key.
3. Rebuild the frontend:

```bash
cd openreplay/frontend
IMAGE_TAG=my-custom-image PUSH_IMAGE=1 DOCKER_REPO=my-docker-user-name bash -x build.sh
```

4. Open `openreplay/scripts/helmcharts/vars.yaml` and specify your newly built frontend image in the `frontend` block:

```yaml
frontend:
  image:
    repository: "my-docker-username/frontend"
    tag: "my-custom-image"
```

5. Restart the frontend and web server services for the changes to take effect:

```bash
cd openreplay/scripts/helmcharts && ./openreplay-cli -I
```

## Content Security Policy (CSP)

Here is an example of a policy (CSP) for allowing OpenReplay to record sessions. This has to be adapted depending on your domain and security requirements:

```HTML
worker-src ‘self’ blob: https://openreplay.mycompany.com https://*.openreplay.com; script-src ‘self’ https://openreplay.mycompany.com https://*.openreplay.com;
```

To apply your CSP to NGINX, connect to your OpenReplay instance and follow the below steps:

1. Open `openreplay/scripts/helmcharts/vars.yaml` and add your CSP in the `frontend` block. Make sure to update 

```yaml
frontend:
  ingress:
    cspSnippet: |
      add_header Content-Security-Policy "worker-src 'self' blob: https://openreplay.mycompany.com https://*.openreplay.com; script-src 'self' https://openreplay.mycompany.com https://*.openreplay.com;";
```

> **Note:** Make sure to replace `https://openreplay.mycompany.com` occurences in the above CSP with your OpenReplay domain name. The value should be the same as `DOMAIN_NAME` in `openreplay/scripts/helmcharts/vars.yaml` file. 

2. Reinstall NGINX to apply your newly added CSP:

```bash
cd openreplay/scripts/helmcharts && ./openreplay-cli -I
```

## Enabling CORS

Cross-domain requests are allowed, by default, from all origins (`Access-Control-Allow-Origin: *`). If you wish to restrict recordings from few domains only, then open `openreplay/scripts/helmcharts/vars.yaml` and update the `http` block as below:

```yaml
http:
  ingress:
    annotations:
      nginx.ingress.kubernetes.io/enable-cors: "true"
      nginx.ingress.kubernetes.io/cors-allow-origin: "https://origin-site1.com:443, http://origin-site2.com"
```

Then, reinstall NGINX:

```bash
cd openreplay/scripts/helmcharts && ./openreplay-cli -I
```
