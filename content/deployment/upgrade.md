---
title: "Upgrade Deployment"
metaTitle: "Upgrade Deployment"
metaDescription: "How to upgrade your instance to the latest OpenReplay version."
---

## Upgrade Version

1. Copy/backup the current openreplay folder to `_version-number`:
   
  ```bash 
  mv openreplay openreplay-v1.1.0
  ```

2. Clone the new OpenReplay version. In this example we're upgrading to the latest available version:
   
  ```bash 
  git clone https://github.com/openreplay/openreplay
  ```

3. Upgrade OpenReplay:

  ```bash
  cd openreplay/scripts/helm
  # bash upgrade.sh <old openreplay path>
  bash upgrade.sh ~/openreplay-v1.1.0
  ```

> **Note:** 
Manual overrides made to any app's configuration file (i.e. `openreplay/scripts/helm/app/<app>.yaml`) will be reset. So if you have any custom overrides, make sure to apply them to the new version prior to running the upgrade script.