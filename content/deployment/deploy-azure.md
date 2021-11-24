---
title: "Deploy to Azure"
metaTitle: "Deploy to Azure"
metaDescription: "Step-by-step guide for deploying OpenReplay on Azure."
---

OpenReplay stack can be installed on a single machine and Microsoft Azure is an ideal candidate. Here's how to do it.

## Launch a VM

1. Sign in to your portal
2. Click 'Virtual Machine' if it is available on the main screen. Otherwise, click 'Create a Resource' > 'Compute' > 'Virtual Machine'
3. On the 'Virtual Machine' page, click 'Add' in case you're not automatically redirected to the creation page
4. Pick *Ubuntu Server 20.04 LTS* for the 'Image'
4. Pick your VM specifications. The **minimum** resources are `2 vCPUs, 8 GB of RAM, 50 GB of storage`, otherwise OpenReplay backend services won't simply start. The minimum specs are enough for a low/moderate volume. If you're expecting high traffic, you should scale from here.
5. Enable HTTP (80), HTTPS (443) and SSH (22) ports and take note of the `username`
6. Click 'Review + create'

## Deploy OpenReplay

1. Make sure your VM is `Running` then connect to it:

```bash
## From your terminal
SSH_KEY=~/Downloads/openreplay-key.pem ## only if you've previously created an SSH key
chmod 400 $SSH_KEY
INSTANCE_IP=REPLACE_WITH_INSTANCE_PUBLIC_IP
ssh <username>@$INSTANCE_IP ## or ssh -i $SSH_KEY <username>@$INSTANCE_IP if you have a key
```

2. Install OpenReplay:

```shell-sessio
git clone https://github.com/openreplay/openreplay.git
cd openreplay/scripts/helm && bash install.sh
```

> **Note:** You'll be prompted to provide the domain on which OpenReplay will be running (e.g. openreplay.mycompany.com). This is required to continue the installation.

## Configure TLS/SSL

OpenReplay deals with sensitive user data and therefore requires HTTPS to run. This is mandatory, otherwise the tracker simply wouldn't start recording. Same thing for the dashboard, without HTTPS you won't be able to replay user sessions.

You must therefore generate (or bring) your own SSL certificate.

First, go to Azure DNS (or your other DNS service provider) and create an `A Record`. Use the domain you previously provided during the installation step and point it to the VM using its public IP.

Open the `vars.yaml` file with the command `vi openreplay/scripts/helm/vars.yaml` then substitute:
- `domain_name`: this is where OpenReplay will be accessible (i.e. openreplay.mycompany.com)
- `nginx_ssl_cert_file_path`: the path to you .cert file (i.e. /home/openreplay/my-cert.crt)
- `nginx_ssl_key_file_path`: the path to your .pem file (i.e. /home/openreplay/my-key.pem)

> **Note:** If you don't have a certificate, generate one for your domain (the one provided during installation) using Let's Encrypt. Connect to OpenReplay VM, run `helm uninstall -n nginx-ingress nginx-ingress` then execute `bash openreplay/scripts/certbot.sh` and follow the steps.

Restart OpenReplay NGINX (and choose whether to enable the default HTTP to HTTPS redirection using the `NGINX_REDIRECT_HTTPS` variable):

```bash
cd openreplay/scripts/helm
NGINX_REDIRECT_HTTPS=1 ./openreplay-cli -i nginx
```

If you haven't yet done that, OpenReplay should be accessible on your subdomain. You can create an account by visiting the `/signup` page (i.e. openreplay.mycompany.com/signup).

> **Note:** For additional security, you can also run OpenReplay instance behind an Azure Load Balancer. Check the [Azure LB docs](https://docs.microsoft.com/en-us/azure/load-balancer/load-balancer-overview) for more details.

## Troubleshooting

If you encounter any issues, connect to our [Slack](https://slack.openreplay.com) and get help from our community.
