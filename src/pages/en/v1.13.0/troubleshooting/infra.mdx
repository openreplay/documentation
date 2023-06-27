---
title: "Infrastructure FAQ"
metaTitle: "Infrastructure FAQ"
metaDescription: "Frequently asked questions on Infrastructure"
---

1. My installation suddenly not working anymore.
   
   There might be multiple reasons for that. For example, disk is full or network issue. Following steps can help to debug.

   - Check for the disk usage in the machine, If the disk usage is more than 80%, the application won't run.
     
     `df -h`

2. Installation/Upgrade failed without any particular error.
   
   1. helm another operation (install/upgrade/rollback) is in progress:
      Means you retried failed installation/upgrade multiple times. To resolve this issue 

      `helm rollback -n app openreplay`
   2. No error log, just installation failed.
      ```bash
      # check for failed pods
      kubectl get pods -n app \
        --field-selector="status.phase!=Succeeded,status.phase!=Running" \
        -o custom-columns="POD:metadata.name"
        
      # Check for the err logs
      stern -n app `pod name from above`
      ```

