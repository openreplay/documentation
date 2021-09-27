---
title: "Upgrade Deployment"
metaTitle: "Upgrade Deployment"
metaDescription: "How to upgrade your instance to the latest OpenReplay version."
---

## Upgrade Deployment

Upgrading your OpenReplay deployment to the latest version requires updating both your backend (instance) and tracker.

### Upgrade Backend

1. Copy/backup the current openreplay folder to `_version-number`:
   
  ```bash 
  mv openreplay openreplay-v1.3.0
  ```

2. Clone the new OpenReplay version. In this example we're upgrading to the latest available version:
   
  ```bash 
  git clone https://github.com/openreplay/openreplay
  ```

3. Upgrade OpenReplay:

  ```bash
  cd openreplay/scripts/helm
  # bash upgrade.sh <old openreplay path>
  bash upgrade.sh ~/openreplay-v1.3.0
  ```

> **Note:** 
Manual overrides made to any app's configuration file (i.e. `openreplay/scripts/helm/app/<app>.yaml`) will be reset. So if you have any custom overrides, make sure to apply them to the new version prior to running the upgrade script.

### Upgrade Tracker

Ensure your tracker is compatible with the new backend version by checking the below compatibility table:

| Backend Version | Tracker Version |
|----------|-------------|
| v1.3.5 | 3.4.0 (or higher) |
| v1.3.0 | 3.2.1 (or higher) |
| v1.2.0 | 3.1.0 (or higher) |
| v1.1.0 | 3.0.3 (or higher) |