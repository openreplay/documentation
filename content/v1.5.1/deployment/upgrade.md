---
title: "Upgrade Deployment"
metaTitle: "Upgrade Deployment"
metaDescription: "How to upgrade your instance to the latest OpenReplay version."
---

Upgrading your OpenReplay deployment to the latest version requires updating both your backend (instance) and tracker.

## Upgrade Backend

1. Copy/backup the current openreplay folder to `_version-number` like below:
   
  ```bash 
  mv openreplay openreplay_v1.5.1
  ```

2. Clone the new OpenReplay version. In this example we're upgrading to the latest available version:
   
  ```bash 
  git clone https://github.com/openreplay/openreplay
  ```

3. Upgrade OpenReplay:

  ```bash
  cd openreplay/scripts/helmcharts

  # Merge previous vars.yaml with current var.yaml (using yq for yaml parsing)
  cp ~/openreplay_v1.4.0/scripts/helmcharts/vars.yaml old_vars.yaml
  wget https://github.com/mikefarah/yq/releases/download/v4.24.4/yq_linux_amd64 -O yq
  chmod +x ./yq
  ./yq '. *= load("old_vars.yaml")' vars.yaml > new_vars.yaml
  mv new_vars.yaml vars.yaml
  # Cleanup depricated resource
  kubectl delete ing -n db minio-frontend
  
  # Upgrade openreplay
  helm upgrade --install openreplay ./openreplay -n app --wait -f ./vars.yaml --atomic
  ```
  
4. If you're not using a load balancer and have generated your SSL certificate via the `certmanager.sh` script:

  ```
  cd openreplay/scripts/helmcharts && bash certmanager.sh
  ```

5. Update `fromVersion` variable in `/openreplay/scripts/helmcharts/vars.yaml` to reflect the new version. As an example if you're moving from `v1.5.1` to `v1.9.0` then update the `fromVersion` like below:
  
  ```yaml
  fromVersion: "v1.9.0"
  ```
 
## Upgrade Tracker

Ensure your tracker (and tracker-assist plugin if you do use the Assist plugin) is compatible with the new backend version by checking the below compatibility table:

| Backend Version | Minimum Tracker Version | Minimum Assist Version (NPM) |
|----------|-------------|-------------|
| 1.9.0 | 4.1.9 | 4.1.3 |
| 1.8.1 | 4.1.4 | 4.1.1 |
| 1.8.0 | 4.0.0 | 4.0.0 |
| 1.7.0 | 3.5.15 | 3.5.14 |
| 1.6.0 | 3.5.12 | 3.5.11 |
| 1.5.4 | 3.5.4 | 3.5.7 |
| 1.5.3 | 3.5.3 | 3.5.5 |
| 1.5.2 | 3.5.2 | 3.5.4 |
| 1.5.1 | 3.5.1 | 3.5.3 |
| 1.5.0 | 3.5.0 | 3.5.0 |
| 1.4.0 | 3.4.17 | 3.4.16 |
| 1.3.6 | 3.4.16 | 3.4.15 |
| 1.3.5 | 3.4.0 | 3.4.13 |
| 1.3.0 | 3.2.1 | 3.4.12 |
| 1.2.0 | 3.1.0 | N/A |
| 1.1.0 | 3.0.3 | N/A |

## Troubleshooting

If you encounter any issue during the upgrade process, reach out on [Slack](https://slack.openreplay.com) and get help from our community.