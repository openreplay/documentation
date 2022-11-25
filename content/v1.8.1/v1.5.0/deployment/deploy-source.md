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
sudo IMAGE_TAG=<my_tag_number> PUSH=1 DOCKER_REPO=index.docker.io/<username> or <docker registry url> bash build_deploy.sh
```

*Note* that the tag name can be any string you want, it'll be created on your Docker Registry and it'll be used to identify this particular version of the code (useful if you're also modifying the code).

## 3. Updates Images

1. Create your container registry secret:

```bash
kubectl create secret -n app docker-registry my-registry-secret \
        --docker-server=MY_CONTAINER_REGISTRY_URL \ # not required if docker hub
        --docker-username=MY_CONTAINER_REGISTRY_USERNAME \
        --docker-password=MY_CONTAINER_REGISTRY_PASSWORD \
        --docker-email=no@email.local 
```

2. To use the components you just built and pushed to your container registry, update the `vars.yaml` file, located inside the `openreplay/scripts/helmcharts` folder. Just add a section for each image you have on your docker registry with the following information:

- `repository`: should point to MY_CONTAINER_REGISTRY_URL/COMPONENT_NAME (if you're using Docker Hub, use the `<username>/<component name>` format instead)
- `pullPolicy`: set to "Always"
- `tag`: the value of IMAGE_TAG used when building Backend and API
- `imagePullSecrets`: the container registry secret

Below is an example for the `alerts` service:

```yaml
alerts:
  image:
    repository: rg.fr-par.scw.cloud/foss/alerts
    pullPolicy: Always
    tag: "v1.4.2"
  imagePullSecrets: 
    - name: my-registry-secret
```

### Install OpenReplay

1. Open `openreplay/scripts/helmcharts/vars.yaml` then edit:
- `domainName`: this is where OpenReplay will be accessible (i.e. openreplay.mycompany.com)

2. Install OpenReplay:

```bash
cd openreplay/scripts/helmcharts
helm upgrade --install databases ./databases -n db --create-namespace --wait -f ./vars.yaml --atomic
helm upgrade --install openreplay ./openreplay -n app --create-namespace --wait -f ./vars.yaml --atomic
```

### Configure TLS/SSL

OpenReplay deals with sensitive user data and therefore requires HTTPS to run. This is mandatory, otherwise the tracker simply wouldn't start recording. Same thing for the dashboard, without HTTPS you won't be able to replay user sessions.

You must therefore bring (or generate) your own SSL certificate.

1. First, go to DNS service provider and create an `A Record`. Use the domain you previously provided during the installation step and point it to your machine using its public IP.

2. If you're bringing your own certificate, create Kubernetes SSL secret using the following command: `kubectl create secret tls openreplay-ssl -n app --key="private_key_file.pem" --cert="certificate.crt"`.

> **Note:** If you don't have a certificate, generate one, that auto-renews, for your subdomain (the one provided during installation) using Let's Encrypt. Run `cd openreplay/scripts/helmcharts && bash certmanager.sh` and follow the steps.

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

## 4. Build and deploy Frontend

Finally, if you're also looking to build the front-end, you'll have to build the image with the following line:

```bash
cd openreplay/frontend
IMAGE_TAG=<your tag> PUSH_IMAGE=1 DOCKER_REPO=myDockerHubID bash build.sh
```

Once this is done, go back to the `scripts/helmcharts/vars.yaml` file and add a section specific for the front-end, it should look similar to the ones you added before for `alerts` and `chalice`:

```yaml
frontend:
  image:
    repository: <YOUR DOCKER REGISTRY>/frontend
    pullPolicy: Always
    tag: <YOUR TAG>
  imagePullSecrets: 
    - name: <YOUR SECRET>
```

With the new section added on the file, execute the `./openreplay-cli -I` command and your new front-end should be running.

You're all set now, OpenReplay should be accessible on your subdomain. You can create an account by visiting the `/signup` page (i.e. openreplay.mycompany.com/signup).

## Troubleshooting

If you encounter any issues, connect to our [Slack](https://slack.openreplay.com) and get help from our community.
