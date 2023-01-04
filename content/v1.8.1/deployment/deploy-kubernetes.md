---
title: "Deploy to Kubernetes"
metaTitle: "Deploy to Kubernetes"
metaDescription: "Step-by-step guide for deploying OpenReplay on Kubernetes."
---

OpenReplay deployment is based on [Helm Charts](https://helm.sh) which makes it fully compatible with Kubernetes. We package PostgreSQL and Redis, which are required for OpenReplay. Here's how to do it.

## Prerequisites

All we need is Kubernetes **v1.18+** and helm **3.10+**. OpenReplay **requires** `2 vCPUs, 8 GB of RAM, 50 GB of storage` to properly run, otherwise OpenReplay backend services won't simply start. These specs are enough for a moderate volume, but if you're expecting high traffic, you should scale from here.

The deployment has been tested on the below platforms:
- Local single-node Kube cluster
- Google Kubernetes Engine (GKE)
- Amazon Elastic Kubernetes Service (EKS)
- Microsoft Azure Kubernetes Service (AKS)
- Scaleway Elements Kubernetes (Kapsule)

## Deploy OpenReplay

Connect to your cluster and clone the OpenReplay repository:

```bash
git clone https://github.com/openreplay/openreplay.git
```

Then, open the `vars.yaml` file with the command `vi openreplay/scripts/helmcharts/vars.yaml` then substitute:
- `domainName`: this is where OpenReplay will be accessible (i.e. openreplay.mycompany.com)
- `postgresqlPassword`: Postgres password (set it or generate a random one)
- `accessKey`: required for the object storage service (use a randomly generated string)
- `secretKey`: required for the object storage service(use a randomly generated string)
- `jwt_secret`: required for the API (use a randomly generated string)

Ensure you have [helm](https://helm.sh/docs/intro/install/) installed then setup OpenReplay:

```bash
cd openreplay/scripts/helmcharts
helm upgrade --install databases ./databases -n db --create-namespace --wait -f ./vars.yaml --atomic
helm upgrade --install openreplay ./openreplay -n app --create-namespace --wait -f ./vars.yaml --atomic
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

Then ensure your cluster provisions a [service type](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer) `LoadBalancer` so the traffic from the cloud load balancer can be directed at OpenReplay backend. Now, go to your DNS service provider and create an `A Record` that points to the cluster using its public IP.

Finally, enable the `use-forwarded-headers`, by uncommenting the below line under the `ingress-nginx` section, in `openreplay/scripts/helmcharts/vars.yaml`:
   
```yaml
ingress-nginx: &ingress-nginx
  controller:
    config:
      use-forwarded-headers: true
```

You're all set now, OpenReplay should be accessible on your subdomain. You can create an account by visiting the `/signup` page (i.e. openreplay.mycompany.com/signup).

### Bring/generate your SSL certificate (option 2)

Alternatively to creating a load balancer, you can bring (or generate) your own SSL certificate.

1. First, go to your DNS service provider and add an `A Record`. Use the domain you previously provided during the installation step and point it to the cluster using its public IP.

2. If you're bringing your own certificate, create an SSL secret using the following command: `kubectl create secret tls openreplay-ssl -n app --key="private_key_file.pem" --cert="certificate.crt"`.

> **Note:** If you don't have a certificate, generate one, that auto-renews, for your subdomain (the one provided during installation) using Let's Encrypt. Simply connect to OpenReplay instance, run `cd openreplay/scripts/helmcharts && bash certmanager.sh` and follow the steps.

3. If you wish to enable http to https redirection (recommended), then uncomment the below block, under the `ingress-nginx` section, in `openreplay/scripts/helmcharts/vars.yaml`:
   
```yaml
ingress-nginx: &ingress-nginx
  controller:
    config:
      ssl-redirect: true
      force-ssl-redirect: true
```

It's worth mentioning that our `ingress-nginx` runs by default on ports `80|443`, but this can be easily changed, if needed, in `vars.yaml`:

```yaml
ingress-nginx: &ingress-nginx
  controller:
    service:
      ports:
        http: 80
        https: 443
```

4. Finally reinstall OpenReplay NGINX:

```bash
cd openreplay/scripts/helmcharts && ./openreplay-cli -I
```

You're all set now, OpenReplay should be accessible on your subdomain. You can create an account by visiting the `/signup` page (i.e. openreplay.mycompany.com/signup).

## Troubleshooting

Please let us know on Slack or with a Github Issue if you're having trouble on your platform. We'll be glad to help you get it running.
