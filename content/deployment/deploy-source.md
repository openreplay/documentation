---
title: "Deploy from Source"
metaTitle: "Deploy from Source"
metaDescription: "Step-by-step guide for deploying OpenReplay from source code."
---

OpenReplay can be deployed from source. Its main components (Backend, API and Frontend) need to be built and pushed to your own container registry, before doing the installation.

The minimum specs for the machine running OpenReplay are `2 vCPUs, 8 GB of RAM, 50 GB of storage`, otherwise OpenReplay backend services won't simply start. This should be enough for a low/moderate volume. If you're expecting high traffic, you should scale from here.

## 1. Prerequisites

1. Install docker:

```bash
sudo apt update
sudo apt install docker.io -y
user=`whoami`
sudo chown $user /var/run/docker.sock
```

2. Clone OpenReplay repo:

```bash
git clone https://github.com/openreplay/openreplay
```

## 2. Build Backend and API

1. Login to your container registry using `docker login <registry_url>`. If you have a docker hub account, then simply run `docker login`.

2. Build API and Backend components then push them to your container registry:

```bash
cd openreplay/scripts/helm
sudo IMAGE_TAG=<my_tag_number> PUSH=1 DOCKER_REPO=<docker_hub_user_name> or <docker registry url> bash build_deploy.sh
```
## 3. Install OpenReplay

1. To use the components you just built and pushed to your container registry, open the `vars.yaml` file with the command `vi openreplay/scripts/helm/vars.yaml` then uncomment and substitute the below variables:
- `docker_registry_username`: your registry username
- `docker_registry_password`: your registry password
- `docker_registry_url`: in case of docker hub, give your username, else the registry url
- `image_tag`: the value of IMAGE_TAG used when building Backend and API

2. Setup OpenReplay:

```bash
cd openreplay/scripts/helm
sudo bash install.sh
```
> **Note:** You'll be prompted to provide the domain on which OpenReplay will be running (e.g. openreplay.mycompany.com). This is required to continue the installation.

3. Configure TLS/SSL

OpenReplay deals with sensitive user data and therefore requires HTTPS to run. This is mandatory, otherwise the tracker simply wouldn't start recording. Same thing for the dashboard, without HTTPS you won't be able to replay user sessions.

You must therefore bring (or generate) your own SSL certificate.

First, go to DNS service provider and create an `A Record`. Use the domain you previously provided during the installation step and point it to your machine using its public IP.

Open the `vars.yaml` file with the command `vi openreplay/scripts/helm/vars.yaml` then substitute:
- `domain_name`: this is where OpenReplay will be accessible (i.e. openreplay.mycompany.com)
- `nginx_ssl_cert_file_path`: the path to you .cert file (i.e. /root/openreplay/my-cert.crt)
- `nginx_ssl_key_file_path`: the path to your .pem file (i.e. /root/openreplay/my-key.pem)

> **Note:** If you don't have a certificate, generate one for your subdomain (the one provided during installation) using Let's Encrypt. Connect to OpenReplay instance, run `helm uninstall -n nginx-ingress nginx-ingress` then execute `bash openreplay/scripts/certbot.sh` and follow the steps.

Restart OpenReplay NGINX (and choose whether to enable the default HTTP to HTTPS redirection using the `NGINX_REDIRECT_HTTPS` variable):

```bash
cd openreplay/scripts/helm
NGINX_REDIRECT_HTTPS=1 ./openreplay-cli -i nginx
```

## 4. Build and deploy Frontend

Finally, run the below comamnds to build and deploy the frontend from source:

```bash
cd openreplay/frontend
sudo bash build.sh
cp -arl public frontend
minio_pod=$(kubectl get po -n db -l app.kubernetes.io/name=minio -n db --output custom-columns=name:.metadata.name | tail -n+2)
sudo kubectl -n db cp frontend $minio_pod:/data/
```

You're all set now, OpenReplay should be accessible on your subdomain. You can create an account by visiting the `/signup` page (i.e. openreplay.mycompany.com/signup).

## Troubleshooting

If you encounter any issues, connect to our [Slack](https://slack.openreplay.com) and get help from our community.