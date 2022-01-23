---
title: "Deploy to Scaleway"
metaTitle: "Deploy to Scaleway"
metaDescription: "Step-by-step guide for deploying OpenReplay on Scaleway Elements."
---

OpenReplay stack can be installed on a single instance and Scaleway Elements is an ideal candidate. Here's how to do it.

## Launch an instance

1. Go to Scaleway Dashboard
2. Navigate to 'Compute > Instances' then click 'Create an instance'
3. Choose your preferred Availability Zone
4. Select an Image. For this guide, we'll be using *Ubuntu Server 20.04 Focal Fossa*
5. Choose your instance type. The minimum specs are `2 vCPUs, 8 GB of RAM, 50 GB of storage`, otherwise OpenReplay backend services won't simply start. So, we recommend **at least** the `DEV1-L` (or an equivalent), which is enough for a low/moderate volume. If you're expecting high traffic, you should scale from here.
6. Add Volumes: Set the size to at least 50 GB (whether local or block storage)
7. Give your instance a sweet name (i.e. openreplay)
8. SSH Keys: Make sure you already have a key associated with your project so you can connect to your instance
9. Click 'Create a new instance'

> **Note:** The SMTP ports (25, 465, 587) are blocked by default by Scaleway. Your OpenReplay instance won't be able to send emails unless you enable SMTP from your security group configuration. To do so, check this [quick tutorial](https://www.scaleway.com/en/faq/why-can-i-not-send-any-email/).

## Deploy OpenReplay

1. Make sure your instance is `Started` then connect to it:

```bash
## From your terminal
SSH_KEY=~/Downloads/openreplay-key.pem #! wherever you've saved the SSH key
INSTANCE_IP=REPLACE_WITH_INSTANCE_PUBLIC_IP
chmod 400 $SSH_KEY
ssh -i $SSH_KEY root@$INSTANCE_IP
```

2. Install OpenReplay by providing the domain on which it will be running (e.g. DOMAIN_NAME=openreplay.mycompany.com):

```bash
git clone https://github.com/openreplay/openreplay.git
cd openreplay/scripts/helmcharts
DOMAIN_NAME=openreplay.mycompany.com bash init.sh
```

## Configure TLS/SSL

OpenReplay deals with sensitive user data and therefore requires HTTPS to run. This is mandatory, otherwise the tracker simply wouldn't start recording. Same thing for the dashboard, without HTTPS you won't be able to replay user sessions.

You must therefore bring (or generate) your own SSL certificate.

1. First, go to 'Network' > 'DNS' (or your other DNS service provider) and create an `A Record`. Use the domain you previously provided during the installation step and point it to the instance using its public IP (can be found in 'Compute' > 'Instances').

2. Rename (required) your private key to `site.key` and your certificate to `site.crt` then copy both files under `openreplay/scripts/helmcharts/openreplay/files/`. Now, simply uncomment the below block in `openreplay/scripts/helmcharts/vars.yaml`:
   
```yaml
nginx-ingress:
  sslKey: site.key
  sslCert: site.crt
```

> **Note:** If you don't have a certificate, generate one for your subdomain (the one provided during installation) using Let's Encrypt. Simply connect to OpenReplay instance, run `kubectl delete svc nginx-ingress -n app` then execute `bash openreplay/scripts/certbot.sh` and follow the steps.

3. If you wish to enable http to https redirection (recommended), then uncomment the below block, under the `nginx-ingress` section, in `openreplay/scripts/helmcharts/vars.yaml`:
   
```yaml
nginx-ingress:
  customServerConfigs: |
    return 301 https://$host$request_uri;
```

4. Finally reinstall OpenReplay NGINX:

```bash
cd openreplay/scripts/helmcharts && ./openreplay-cli -I
```

You're all set now, OpenReplay should be accessible on your subdomain. You can create an account by visiting the `/signup` page (i.e. openreplay.mycompany.com/signup).

## Troubleshooting

If you encounter any issues, connect to our [Slack](https://slack.openreplay.com) and get help from our community.
