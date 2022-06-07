---
title: "Deploy to Google Cloud"
metaTitle: "Deploy to Google Cloud"
metaDescription: "Step-by-step guide for deploying OpenReplay on Google Cloud."
---

OpenReplay stack can be installed on a single machine and Google Cloud is an ideal candidate. Here's how to do it.

## Launch a VM

1. Go to 'Compute Engine' Dashboard and select 'VM Instances' from the left-side menu bar
2. Click 'Create Instance'
3. Select your preferred 'region' and 'zone'
4. Choose your machine type. The minimum specs are `2 vCPUs, 8 GB of RAM, 50 GB of storage`, otherwise OpenReplay backend services won't simply start. So, we recommend **at least** the `e2-standard-2` (or an equivalent) which is enough for a low/moderate volume. If you're expecting high traffic, you should scale from here.
4. Change your boot disk to *Ubuntu 20.04 LTS*, then pick *SSD persistent disk* for the boot disk type and set the size to 50 GB.
5. Check both 'Allow HTTP traffic' and 'Allow HTTPS traffic' in Firewall
9. Click 'Create'

## Deploy OpenReplay

Once your instance is `Running`, connect to it by hitting the `SSH` button then install OpenReplay by providing the domain on which it will be running (e.g. DOMAIN_NAME=openreplay.mycompany.com):

```bash
git clone https://github.com/openreplay/openreplay.git
cd openreplay/scripts/helmcharts
DOMAIN_NAME=openreplay.mycompany.com bash init.sh
```

## Configure TLS/SSL

OpenReplay deals with sensitive user data and therefore requires HTTPS to run. This is mandatory, otherwise the tracker simply wouldn't start recording. Same thing for the dashboard, without HTTPS you won't be able to replay user sessions.

The easiest way to handle SSL in Google Cloud is to setup a load balancer (Google Load Balancing) and run OpenReplay behind it. Another option is to generate or use your own SSL certificate and point your subdomain (i.e. openreplay.mycompany.com) to the OpenReplay instance. More on both options below.

### Setup Google load balancer (option 1)

First step is to add an instance group which is required later for the load balancer:

1. Go to 'Compute Engine' > 'Instance Groups'
2. 'Create Instance Group' and select *New unmanaged instance group*
3. Pick your preferred 'Location' then select the 'Network' and choose the OpenReplay VM instance
4. Click 'Create'

Now it's time to create the load balancer:

1. Go to 'Network Services' > 'Load Balancing'
2. 'Create Load Balancer' and pick *HTTP(S) Load Balancing*
3. Choose 'From Internet to my VMs' then click 'Continue'
4. Start with 'Backend configuration' and click on 'Backend services' > 'Create a backend service'
5. Select *Instance group* for 'Backend type'. In 'Backends' > 'New backend', choose the instance group you previously created, set the port to `80` then hit 'Done'.
6. Scroll down to 'Health Check' and 'Create a health check'. Choose HTTP for the 'Protocol' and set the 'Port' to `80` while keeping the other default values. Hit 'Save'.
7. In 'Advanced Options', check 'Enable Cloud CDN', set 'Session Affinity' to `Client IP` then add `Access-Control-Allow-Origin` in 'Custom Response Headers'.
8. Click 'Create'
9.  In 'Frontend configuration', choose HTTPS for 'Protocol' then in 'Certificate' create a new certificate (managed by Google) or bring yours. Hit 'Done'.
10. Review then click 'Create'

Once created, go to Cloud DNS (or your DNS service provider) and create an `A Record` that points to the load balancer using its IP (can be found in Load Balancing dashboard).

Finally, enable the `use-forwarded-headers`, by uncommenting the below line under the `ingress-nginx` section, in `openreplay/scripts/helmcharts/vars.yaml`:
   
```yaml
ingress-nginx: &ingress-nginx
  controller:
    config:
      use-forwarded-headers: true
```

You're all set now, OpenReplay should be securely accessible on the subdomain you just set up. You can create an account by visiting the `/signup` page (i.e. openreplay.mycompany.com/signup).

### Bring/generate your SSL certificate (option 2)

Alternatively to creating a load balancer, you can bring (or generate) your own SSL certificate.

1. First, go to Cloud DNS (or your other DNS service provider) and create an `A Record`. Use the domain you previously provided during the installation step and point it to the VM using its public IP (can be found in Compute Engine dashboard).

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

4. Finally reinstall OpenReplay NGINX:

```bash
cd openreplay/scripts/helmcharts && ./openreplay-cli -I
```

You're all set now, OpenReplay should be accessible on your subdomain. You can create an account by visiting the `/signup` page (i.e. openreplay.mycompany.com/signup).

## Troubleshooting

If you encounter any issues, connect to our [Slack](https://slack.openreplay.com) and get help from our community.
