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
4. Choose your instance type. The minimum specs are `2 vCPUs, 8 GB of RAM, 50 GB of storage`. So, we recommend the `t3.large` (or an equivalent) for a low/moderate volume. If you're expecting high traffic, you should scale from here.
5. Configure Instance Details: Tune the Network/Subnet parameters if needed or simply keep the defaults
6. Add Storage: Set the size to 50 GB (General Purpose SSD (gp2))
7. Add Tags: Tune the parameters or keep the defaults
8. Security Groups: Keep the existing SSH rule and add a new one for HTTPS (443) (source: 0.0.0.0/0)
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

2. Install OpenReplay:

```shellsession
git clone https://github.com/openreplay/openreplay.git
cd openreplay/scripts/helm && bash install.sh
```

## Configure TLS/SSL

OpenReplay deals with sensitive user data and therefore requires HTTPS to run. This is mandatory, otherwise the tracker simply wouldn't start recording. Same thing for the dashboard, without HTTPS you won't be able to replay user sessions.

The easiest way to handle SSL in AWS is to setup a load balancer (ELB) and run OpenReplay behind it. Another option is to generate or use your own SSL certificate and point your subdomain (i.e. openreplay.mycompany.com) to the OpenReplay instance. More on both options below.

### Setup AWS load balancer

1. Go to 'EC2' > 'Load Balancers'
2. 'Create Load Balancer' and pick *Application Load Balancer*
3. Add a listener to HTTPS (keep this one only)
4. Choose an existing certificate (i.e. *.mycompany.com) or generate a new one from AWS Certificate Manager (ACM). You can also import yours.
5. Configure Security Groups: Select the security group previously created for the OpenReplay instance
6. Configure Routing: Define a name and select `IP` in *Target Type*. Keep the other default parameters
7. Register Targets: Add the instance's private IP (port 80) click 'Add to list' (the private IP can be found in EC2 dashboard)
8. Review then 'Create'

Once created, go to Route 53 (or other external DNS service) and create an `A Record` that points to the load balancer using its DNS name (can be found in ELB dashboard).

You're all set now, OpenReplay should be securely accessible on the subdomain you just set up.

### Or bring/generate your SSL certificate

If you don't have a certificate, generate one for your domain (i.e. openreplay.mycompany.com) using Let's Encrypt. Connect to OpenReplay EC2 instance, run `helm uninstall -n nginx-ingress` then execute `bash openreplay/scripts/certbot.sh` and follow the steps.

Open the `vars.yaml` file with the command `nano openreplay/scripts/helm/vars.yaml` then substitute:
- `domain_name`: this is where OpenReplay will be accessible (i.e. openreplay.mycompany.com)
- `nginx_ssl_cert_file_path`: the path to you .cert file (i.e. /home/openreplay/my-cert.crt)
- `nginx_ssl_key_file_path`: the path to your .pem file (i.e. /home/openreplay/my-key.pem)

Restart OpenReplay NGINX:

```bash
cd openreplay/scripts/helm && ./install.sh --app nginx
```

Finally, go to Route 53 (or other external DNS service) and create an `A Record` that points to the load balancer using its public IP (can be found in EC2 dashboard)

You're all set now, OpenReplay should be accessible on your subdomain.

## Troubleshooting

If you encounter any issues, connect to our Slack and get help from our community.
