---
title: "Deploy to Digital Ocean"
metaTitle: "Deploy to Digital Ocean"
metaDescription: "Step-by-step guide for deploying OpenReplay on Digital Ocean."
---

OpenReplay stack can be installed on a single machine (droplet) and Digital Ocean is an ideal candidate. Here's how to do it.

## Create a droplet

1. Create a new project (if you haven't done so) then navigate to it and click on 'Create' droplet
2. Choose the *Ubuntu Server 20.04 LTS* image
4. Go for the 'Shared CPU' and pick the `Regular Intel | 4 CPUs | 8GB` plan. These are the minimum specs for a moderate volume. If you're expecting high traffic, you should scale from here.
5. Click 'New SSH key' in 'Authentication' and follow the instructions to generate a key
6. Give your machine a name then hit 'Create droplet'

## Deploy OpenReplay

1. Make sure your droplet is `active` then connect to it:

```bash
## From your terminal
SSH_KEY=~/Downloads/openreplay-key.pem ## wherever you've saved the SSH key
INSTANCE_IP=REPLACE_WITH_DROPLET_PUBLIC_IP
chmod 400 $SSH_KEY
ssh -i $SSH_KEY root@$INSTANCE_IP
```

2. Install OpenReplay:

```shellsession
git clone https://github.com/openreplay/openreplay.git
cd openreplay/scripts/helm && bash install.sh
```

## Configure TLS/SSL

OpenReplay deals with sensitive user data and therefore requires HTTPS to run. This is mandatory, otherwise the tracker simply wouldn't start recording. Same thing for the dashboard, without HTTPS you won't be able to replay user sessions.

The easiest way to handle SSL in AWS is to setup a load balancer and run OpenReplay behind it. Another option is to generate or use your own SSL certificate and point your subdomain (i.e. openreplay.mycompany.com) to the OpenReplay instance. More on both options below.

### Setup Digital Ocean load balancer

1. Go to your project and click 'Create' Load Balancers
2. 'Create Load Balancer' and pick *HTTP(S) Load Balancing*
3. Choose the small 'Size' and pick the 'Datacenter region' where the OpenReplay droplet is running
4. Search for your droplet in 'Add Droplets' then add it
5. Forwarding rules (Load Balancer): Select `HTTPS (443)` in Load Balancer section then click on 'Certificate' > 'Add a new certificate. If your domain is managed by Digital Ocean then you can follow the instructions in the Let's Encrypt option. Otherwise you must import your own certificate. If you don't have one, log in to your droplet then simply run `bash openreplay/scripts/certbot.sh`.
6. Forwarding rules (Droplet): Select `HTTP (80)` in Droplet section.
7. Give your load balancer a name then hit 'Create Load Balancer'

Once created, go to 'Manage' > 'Networking' > 'Domains' (or other external DNS service) and create an `A Record` that points to the load balancer using its IP (can be found in Load Balancers tab).

You're all set now, OpenReplay should be securely accessible on the subdomain you just set up.

### Or bring/generate your SSL certificate

If you don't have a certificate, generate one for your domain (i.e. openreplay.mycompany.com) using Let's Encrypt. Connect to OpenReplay droplet, run `helm uninstall -n nginx-ingress nginx-ingress` then execute `bash openreplay/scripts/certbot.sh` and follow the steps.

Open the `vars.yaml` file with the command `vi openreplay/scripts/helm/vars.yaml` then substitute:
- `domain_name`: this is where OpenReplay will be accessible (i.e. openreplay.mycompany.com)
- `nginx_ssl_cert_file_path`: the path to you .cert file (i.e. /home/openreplay/my-cert.crt)
- `nginx_ssl_key_file_path`: the path to your .pem file (i.e. /home/openreplay/my-key.pem)

Restart OpenReplay NGINX:

```bash
cd openreplay/scripts/helm && ./install.sh --app nginx
```

Finally, go to 'Manage' > 'Networking' > 'Domains' (or other external DNS service) and create an `A Record` that points to the droplet using its public IP (can be found in Droplets tab).

You're all set now, OpenReplay should be accessible on your subdomain.

## Troubleshooting

If you encounter any issues, connect to our Slack and get help from our community.
