---
title: "Deploy to AWS"
metaTitle: "Deploy to AWS"
metaDescription: "Step-by-step guide for deploying OpenReplay on Amazon AWS."
---

OpenReplay stack can be installed on a single machine and AWS EC2 is an ideal candidate. Here's how to do it.

## Launch an EC2 instance

1. Go to AWS EC2 Dashboard
2. 'Launch a new instance'
3. Select your AMI. For this guide, we'll be using *Ubuntu Server 20.04 LTS*
4. Choose your instance type. The minimum specs are `2 vCPUs, 8 GB of RAM, 50 GB of storage`, otherwise OpenReplay backend services won't simply start. So, we recommend **at least** the `t3.large` (or an equivalent), which is enough for a low/moderate volume. If you're expecting high traffic, you should scale from here.
5. Configure Instance Details: Tune the Network/Subnet parameters if needed or simply keep the defaults
6. Add Storage: Set the size to 50 GB (General Purpose SSD (gp2))
7. Add Tags: Tune the parameters or keep the defaults
8. Security Groups: Keep the existing SSH rule and add 2 more for HTTP (80) and HTTPS (443) (source: 0.0.0.0/0)
9. Click 'Review and Launch'
10. Create/download the SSH key then hit 'Launch instances'

## Deploy OpenReplay

1. Make sure your instance is `Running` then connect to it:

```bash
## From your terminal
SSH_KEY=~/Downloads/openreplay-key.pem #! wherever you've saved the SSH key
INSTANCE_IP=REPLACE_WITH_INSTANCE_PUBLIC_IP
chmod 400 $SSH_KEY
ssh -i $SSH_KEY ubuntu@$INSTANCE_IP
```

2. Install OpenReplay by providing the domain on which it will be running (e.g. DOMAIN_NAME=openreplay.mycompany.com):

```bash
git clone https://github.com/openreplay/openreplay.git
cd openreplay/scripts/helmcharts
DOMAIN_NAME=openreplay.mycompany.com bash init.sh
```

## Configure TLS/SSL

OpenReplay deals with sensitive user data and therefore requires HTTPS to run. This is mandatory, otherwise the tracker simply wouldn't start recording. Same thing for the dashboard, without HTTPS you won't be able to replay user sessions.

The easiest way to handle SSL in AWS is to setup a load balancer (ELB) and run OpenReplay behind it. Another option is to generate or use your own SSL certificate and point your subdomain (i.e. openreplay.mycompany.com) to the OpenReplay instance. More on both options below.

### Setup AWS load balancer (option 1)

1. Go to 'EC2' > 'Load Balancers'
2. 'Create Load Balancer' and pick *Application Load Balancer*
3. Add a listener to HTTPS (keep this one only) and make sure to select the same subnet(s) in which your OpenReplay instance is running.
4. Choose an existing certificate (i.e. *.mycompany.com) or generate a new one from AWS Certificate Manager (ACM). You can also import yours.
5. Configure Security Groups: Select the security group previously created for the OpenReplay instance (you can find it 'EC2 Dashboard' under the 'Security' tab)
6. Configure Routing: Define a name and select `IP` in *Target Type*. Keep the other default parameters
7. Register Targets: Add the instance's private IP (port 80) click 'Add to list' (the private IP can be found in EC2 dashboard)
8. Review then 'Create'

Once created, go to Route 53 (or your DNS service provider) and create an `A Record` that points to the load balancer using its DNS name (can be found in ELB dashboard).

You're all set now, OpenReplay should be securely accessible on the subdomain you just set up. You can create an account by visiting the `/signup` page (i.e. openreplay.mycompany.com/signup).

### Bring/generate your SSL certificate (option 2)

Alternatively to creating a load balancer, you can bring (or generate) your own SSL certificate.

1. First, go to Route 53 (or your other DNS service provider) and create an `A Record`. Use the domain you previously provided during the installation step and point it to the instance using its public IP (can be found in EC2 dashboard).

2. If you're bringing your own certificate, create an SSL secret using the following command: `kubectl create secret tls openreplay-ssl -n app --key="private_key_file.pem" --cert="certificate.crt`.

> **Note:** If you don't have a certificate, generate one, that auto-renews, for your subdomain (the one provided during installation) using Let's Encrypt. Simply connect to OpenReplay EC2 instance, run `cd openreplay/scripts/helmcharts && bash certmanager.sh` and follow the steps.

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
