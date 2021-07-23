---
title: "Tech Stack"
metaTitle: "Tech Stack"
metaDescription: "Open Replay Tech Stack"
---

Open Replay is primary implemented in python and go. With python we take a severless approach so that we don't have to worry about allocation of resources. We use Go to run a set of backend services (workers) which read data from webpages through a data pipeline and to storage. 