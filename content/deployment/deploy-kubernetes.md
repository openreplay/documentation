---
title: "Deploy to Kubernetes"
metaTitle: "Deploy to Kubernetes"
metaDescription: "Step-by-step guide for deploying OpenReplay on Kubernetes."
---

OpenReplay deployment is based on [Helm Charts](https://helm.sh) which makes it fully compatible with Kubernetes. We package PostgreSQL and Redis, which are required for OpenReplay. Here's how to do it.

## Prerequisites

All we need is Kubernetes **v1.18+**. OpenReplay **requires** `4 vCPUs, 8 GB of RAM, 50 GB of storage` to properly run, otherwise OpenReplay backend services won't simply start. These specs are enough for a moderate volume, but if you're expecting high traffic, you should scale from here.

The deployment has been tested on the below platforms:
- Local single-node Kube cluster
- Google Kubernetes Engine (GKE)
- Amazon Elastic Kubernetes Service (EKS)
- Microsoft Azure Kubernetes Service (AKS)
- Scaleway Elements Kubernetes (Kapsule)

## Deploy OpenReplay

Connect to your cluster and clone the OpenReplay repository:

```shellsession
git clone https://github.com/openreplay/openreplay.git
```

Then, open the `vars.yaml` file with the command `vi openreplay/scripts/helm/vars.yaml` then substitute:
- `domain_name`: this is where OpenReplay will be accessible (i.e. openreplay.mycompany.com)
- `kubeconfig_path`: the absolute path to your cluster's kubeconfig file (use the `readlink -f <file>` command to get the full path)

Now, install OpenReplay:

```shellsession
cd openreplay/scripts/helm && bash kube-install.sh
```

## Configure TLS/SSL

OpenReplay deals with sensitive user data and therefore requires HTTPS to run. This is mandatory, otherwise the tracker simply wouldn't start recording. Same thing for the dashboard, without HTTPS you won't be able to replay user sessions.

If your Kubernetes cluster is in the cloud (like EKS, AKS or GKE) then the easiest way to handle SSL is to setup a cloud load balancer and run your cluster behind it. Another option is to generate or use your own SSL certificate and point your subdomain (i.e. openreplay.mycompany.com) to your cluster. More on both options below.

### Setup a cloud load balancer (option 1)

On the main benefits of running OpenReplay behind a cloud load balancer is to have the certificate managed by the cloud provider. Below are step-by-step guides on how to create:
- [AWS - Elastic Load Balancing](/deployment/deploy-aws#setupawsloadbalancer(option1))
- [Google - Cloud Load Balancing](/deployment/deploy-gcp#setupgoogleloadbalancer(option1))
- [Azure - Load Balancer]([/deployment/deploy-azure#setupazurefrontdoor(option1)](https://docs.microsoft.com/en-us/azure/load-balancer/load-balancer-overview))
- [Digital Ocean - Configure TLS/SSL](/deployment/deploy-digitalocean#configuretls/ssl)

Then ensure your cluster provisions a [service type](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer) `LoadBalancer` so the traffic from the cloud load balancer  can be directed at OpenReplay backend.

Finally, go to your DNS service provider and create an `A Record` that points to the cluster using its public IP.

You're all set now, OpenReplay should be accessible on your subdomain. You can create an account by visiting the `/signup` page (i.e. openreplay.mycompany.com/signup).

### Bring/generate your SSL certificate (option 2)

Alternatively to creating a load balancer, you can bring (or generate) your own SSL certificate.

First, go to your DNS service provider and add an `A Record`. Use the domain you previously provided during the installation step and point it to the cluster using its public IP.

Open the `vars.yaml` file with the command `vi openreplay/scripts/helm/vars.yaml` then substitute:
- `domain_name`: this is where OpenReplay will be accessible (i.e. openreplay.mycompany.com)
- `nginx_ssl_cert_file_path`: the path to you .cert file (i.e. /home/openreplay/my-cert.crt)
- `nginx_ssl_key_file_path`: the path to your .pem file (i.e. /home/openreplay/my-key.pem)

> **Note:** If you don't have a certificate, generate one for your domain (the one provided during installation) using Let's Encrypt. Connect to your OpenReplay cluster, run `helm uninstall -n nginx-ingress nginx-ingress` then execute `bash openreplay/scripts/certbot.sh` and follow the steps.

Restart OpenReplay NGINX (and choose whether to enable the default HTTP to HTTPS redirection using the `NGINX_REDIRECT_HTTPS` variable):

```bash
cd openreplay/scripts/helm
NGINX_REDIRECT_HTTPS=1 ./install.sh --app nginx
```

You're all set now, OpenReplay should be accessible on your subdomain. You can create an account by visiting the `/signup` page (i.e. openreplay.mycompany.com/signup).

## Troubleshooting

Please let us know on Slack or with a Github Issue if you're having trouble on your platform. We'll be glad to help you get it running.
