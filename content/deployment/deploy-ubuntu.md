---
title: "Deploy to Ubuntu"
metaTitle: "Deploy to Ubuntu"
metaDescription: "Step-by-step guide for deploying OpenReplay on any Ubuntu machine."
---

OpenReplay stack can be installed on a single machine running Ubuntu. Here's how to do it.

## Pre-requisites

- Operating system must be *Ubuntu Server 20.04 Focal Fossa*.
- The minimum specs for the machine running OpenReplay are `2 vCPUs, 8 GB of RAM, 50 GB of storage`, otherwise OpenReplay backend services won't simply start. This should be enough for a low/moderate volume. If you're expecting high traffic, you should scale from here.
- A public IP address pointing to your machine.

## Deploy OpenReplay

1. Make sure your machine is started then connect to it through SSH as root

2. Install OpenReplay by providing the domain on which it will be running (e.g. DOMAIN_NAME=openreplay.mycompany.com):

```bash
git clone https://github.com/openreplay/openreplay.git
cd openreplay/scripts/helmcharts
DOMAIN_NAME=openreplay.mycompany.com bash init.sh
```

## Configure TLS/SSL

OpenReplay deals with sensitive user data and therefore requires HTTPS to run. This is mandatory, otherwise the tracker simply wouldn't start recording. Same thing for the dashboard, without HTTPS you won't be able to replay user sessions.

You must therefore bring (or generate) your own SSL certificate.

1. First, go to your DNS service provider, edit your DNS zone and create an `A Record`. Use the domain you previously provided during the installation step and point it to the machine using its public IP.

2. If you're bringing your own certificate, create an SSL secret using the following command: `kubectl create secret tls openreplay-ssl -n app --key="private_key_file.pem" --cert="certificate.crt`.

> **Note:** If you don't have a certificate, generate one, that auto-renews, for your subdomain (the one provided during installation) using Let's Encrypt. Simply connect to OpenReplay machine, run `cd openreplay/scripts/helmcharts && bash certmanager.sh` and follow the steps.

3. If you wish to enable http to https redirection (recommended), then uncomment the below block, under the `ingress-nginx` section, in `openreplay/scripts/helmcharts/vars.yaml`:
   
```yaml
ingress-nginx: &ingress-nginx
  controller:
    config:
      ssl-redirect: true
      force-ssl-redirect: true
```

4. Finally reinstall OpenReplay NGINX:

```bash
cd openreplay/scripts/helmcharts && ./openreplay-cli -I
```

You're all set now, OpenReplay should be accessible on your subdomain. You can create an account by visiting the `/signup` page (i.e. openreplay.mycompany.com/signup).

## Troubleshooting

If you encounter any issues, connect to our [Discord](https://discord.openreplay.com) and get help from our community.
