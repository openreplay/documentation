---
title: "Clear Cache"
metaTitle: "Clear Cache"
metaDescription: "How to clear and reset the cache (CSS, fonts and incons) in OpenReplay."
---

OpenReplay needs access to resources, such as your stylesheets, icons and fonts, to make replays work. In fact, these files are copied then cached by our backend so you can see old recordings even if your web app has changed. Follow the below steps to clear your cache:

1. Run `k9s -n db`
2. Use the keyboard arrows to navigate the list and get to the `minio-*` container
3. Press s to have shell access the Minio (object storage) container
4. Run `mc alias set minio http://localhost:9000 $MINIO_ACCESS_KEY $MINIO_SECRET_KEY`
5. Run `mc rm --recursive --dangerous --force minio/sessions-assets` to remove all cached files (CSS, fonts and icons)
6. Use `exit` to exit the Minio container
7. Run `:quit` to exit the Kubernetes CLI
8. Restart `assets` service by running `cd openreplay/scripts/helmcharts && ./openreplay-cli -I`