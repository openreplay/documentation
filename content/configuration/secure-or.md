---
title: "Secure OpenReplay"
metaTitle: "Secure OpenReplay"
metaDescription: "Secure OpenReplay by configuring SSL and reCaptcha."
---

## Configure SSL

Open the `vars.yaml` file with the command `nano openreplay/scripts/helm/vars.yaml` then substitute:
- `domain_name`: this is where OpenReplay will be accessible (i.e. openreplay.mycompany.com)
- `nginx_ssl_cert_file_path`: the path to you .cert file (i.e. /home/openreplay/my-cert.crt)
- `nginx_ssl_key_file_path`: the path to your .pem file (i.e. /home/openreplay/my-key.pem)

Restart nginx:

```bash
cd openreplay/scripts/helm && ./install.sh --app nginx
```

If you don't have a certificate, generate one for your domain (i.e. openreplay.mycompany.com) using Let's Encrypt. Connect to OpenReplay instance, run `helm uninstall -n nginx-ingress` then execute `bash openreplay/scripts/certbot.sh` and follow the steps.

## Set reCaptcha

OpenReplay supports reCaptcha (v2) for additional security. To enable this protection, edit `chalice.yaml` in `openreplay/scripts/helm/app/` and update the below variables in `env`:
- `CAPTCHA_SERVER`: The URL to your reCaptcha service (e.g. https://www.google.com/recaptcha/api/siteverify)
- `CAPTCHA_KEY`: You reCaptcha secret key

Then, edit `env.js` in `openreplay/frontend/` and substitute the `CAPTCHA_SITE_KEY` variable with your reCaptcha site key.

Finally, restart the web server and rebuild the frontend:

```bash
cd openreplay/scripts/helm && ./openreplay-cli --restart chalice
cd openreplay/frontend && ./build.sh
```
