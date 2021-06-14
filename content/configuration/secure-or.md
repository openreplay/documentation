---
title: "Secure OpenReplay"
metaTitle: "Secure OpenReplay"
metaDescription: "Secure OpenReplay by configuring SSL and reCaptcha."
---

## Configure SSL

Open the `vars.yaml` file with `nano openreplay/scripts/helm/vars.yaml` then substitute:
- `domain_name`: this is where OpenReplay will be accessible (i.e. openreplay.mycompany.com)
- `nginx_ssl_cert_file_path`: the path to you .cert file (i.e. /home/openreplay/my-cert.crt)
- `nginx_ssl_key_file_path`: the path to your .pem file (i.e. /home/openreplay/my-key.pem)

Restart NGINX (and choose whether to enable the default HTTP to HTTPS redirection using the `NGINX_REDIRECT_HTTPS` variable):

```bash
cd openreplay/scripts/helm
NGINX_REDIRECT_HTTPS=1 ./install.sh --app nginx
```

If you don't have a certificate, generate one for your domain (i.e. openreplay.mycompany.com) using Let's Encrypt. Connect to OpenReplay instance, run `helm uninstall -n nginx-ingress nginx-ingress` then execute `bash openreplay/scripts/certbot.sh` and follow the steps.

## Set reCaptcha

OpenReplay supports reCaptcha (v2) for additional security. To enable this protection, edit `chalice.yaml` in `openreplay/scripts/helm/app/` and update the below variables in `env`:
- `CAPTCHA_SERVER`: The URL to your reCaptcha service (e.g. https://www.google.com/recaptcha/api/siteverify)
- `CAPTCHA_KEY`: You reCaptcha secret key

Now reinstall the web server for the changes to take effect:

```bash
cd openreplay/scripts/helm
./openreplay-cli -i chalice
```

Then, edit `env.js` in `openreplay/frontend/` and substitute the `CAPTCHA_SITE_KEY` variable with your reCaptcha site key. Finally, rebuild the frontend:

```bash
cd openreplay/frontend
sudo bash build.sh
sudo cp -arl public frontend
minio_pod=$(sudo kubectl get po -n db -l app.kubernetes.io/name=minio -n db --output custom-columns=name:.metadata.name | tail -n+2)
sudo kubectl -n db cp frontend $minio_pod:/data/
```
