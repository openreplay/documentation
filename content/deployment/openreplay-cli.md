---
title: "OpenReplay CLI"
metaTitle: "OpenReplay CLI"
metaDescription: "How to use the CLI to easily manage your OpenReplay instance."
---

## Options

The CLI is helpful for managing basic aspects of your OpenReplay instance, things such as restarting or reinstalling a service, accessing a component's logs or simply checking the status of your backend services.

Run the CLI with the `-h` option:

```bash
cd openreplay/scripts/helm
./openreplay-cli -h
```

And see the list of all available options:

```shellsession
___                   ____            _
/ _ \ _ __   ___ _ __ |  _ \ ___ _ __ | | __ _ _   _
| | | | '_ \ / _ \ '_ \| |_) / _ \ '_ \| |/ _` | | | |
| |_| | |_) |  __/ | | |  _ <  __/ |_) | | (_| | |_| |
\___/| .__/ \___|_| |_|_| \_\___| .__/|_|\__,_|\__, |
    |_|                        |_|            |___/
Usage: openreplay-cli [ -h | --help ]
                [ -d | --status ]
                [ -v | --verbose ]
                [ -l | --logs SERVICE ]
                [ -i | --install SERVICE ]
                [ -s | --stop SERVICE|all ]
                [ -S | --start SERVICE|all ]
                [ -r | --restart SERVICE|all ]
```

## Backend Services

OpenReplay backend relies on the below components/services:

| Service | Description |
|---------|-------------|
| http | Ingests events and session recordings |
| sink | Reads data from the streaming pipeline (Redis or Kafka for enterprise edition) and inserts into a temp storage (NFS) |
| storage | Moves the temp session recording files to the object storage service |
| assets | For caching assets (CSS, fonts and icons) to properly render the recordings |
| db | Reads and writes into various databases (Postgres + ClickHouse for enterprise edition) |
| ender | Terminates user sessions if inactive or disconnected |
| chalice | API for serving the frontend |
| alerts | Sends notifications (email, slack, in-app, webhook) when a user set threshold is reached on any of the performance metrics |
| integrations |  Pushes and pulls data from the supported third-party APIs (Sentry, Elastic, GitHub, Jira, etc.) |
