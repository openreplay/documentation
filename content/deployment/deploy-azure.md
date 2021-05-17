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
4. Pick your VM specifications. The minimum resources are `2 vCPUs, 8 GB of RAM, 50 GB of storage` for a low/moderate volume. If you're expecting high traffic, you should scale from here.
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

## Configure TLS/SSL

OpenReplay deals with sensitive user data and therefore requires HTTPS to run. This is mandatory, otherwise the tracker simply wouldn't start recording. Same thing for the dashboard, without HTTPS you won't be able to replay user sessions.

One way to handle SSL in Azure is to setup Front Door and run OpenReplay behind it. Another option is to generate or use your own SSL certificate and point your subdomain (i.e. openreplay.mycompany.com) to the OpenReplay instance. More on both options below.

### Setup Azure Front Door (option 1)

1. Select 'Create a resource' > 'Select Networking' > 'See All' > Front Door
2. Select 'Subscription' and create new 'Resource group' in 'Basics' tab
3. Open 'Add a frontend host' in 'Frontend/domains', then specify a hostname and click 'Add'
4. Click 'Add a backend' in 'Backend pools' and point it to OpenReplay VM (using Backend host type and host name)
5. Click 'Add' then switch 'Protocol' to HTTP
6. In 'Routing rules', select '+' to configure a routing rule. Enter 'Name' and keep all default values then hit the 'Add' button.
7. 'Review + create'

To enable HTTPS on a custom domain, follow these steps:
1. Go to your Front Door profile
2. In the list of frontend hosts, select the custom domain you want to enable HTTPS for
3. Under 'Custom domain HTTPS' section, select 'Enabled', then 'Front Door managed' as the certificate source
4. 'Save' then continue to Validate the domain.

Once created, go to Azure DNS (or other external domain registrar) and create an `CNAME Record` that points to the Front Door's hostname.

You're all set now, OpenReplay should be securely accessible on the subdomain you just set up. You can create an account by visiting the `/signup` page (i.e. openreplay.mycompany.com/signup).

### Bring/generate your SSL certificate (option 2)

Alternatively to creating a load balancer, you can bring (or generate) your own SSL certificate.

If you don't have a certificate, generate one for your domain (i.e. openreplay.mycompany.com) using Let's Encrypt. Connect to OpenReplay VM, run `helm uninstall -n nginx-ingress nginx-ingress` then execute `bash openreplay/scripts/certbot.sh` and follow the steps (but first make sure your subdomain points to the VM using its public IP).

Open the `vars.yaml` file with the command `vi openreplay/scripts/helm/vars.yaml` then substitute:
- `domain_name`: this is where OpenReplay will be accessible (i.e. openreplay.mycompany.com)
- `nginx_ssl_cert_file_path`: the path to you .cert file (i.e. /home/openreplay/my-cert.crt)
- `nginx_ssl_key_file_path`: the path to your .pem file (i.e. /home/openreplay/my-key.pem)

Restart OpenReplay NGINX (and choose whether to enable the default HTTP to HTTPS redirection using the `NGINX_REDIRECT_HTTPS` variable):

```bash
cd openreplay/scripts/helm
NGINX_REDIRECT_HTTPS=1 ./install.sh --app nginx
```

Finally, go to Azure DNS (or other external DNS service) and create an `A Record` that points to the VM using its public IP.

If you haven't yet done that, OpenReplay should be accessible on your subdomain. You can create an account by visiting the `/signup` page (i.e. openreplay.mycompany.com/signup).

## Troubleshooting

If you encounter any issues, connect to our [Slack](https://slack.openreplay.com) and get help from our community.
