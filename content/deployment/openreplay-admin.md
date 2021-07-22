---
title: "OpenReplay Administration"
metaTitle: "OpenReplay Administration"
metaDescription: "How to easily administer and manage your OpenReplay instance."
---

## CLI

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

## Increase service capacity

It's possible to increase the capacity of some services such as Postgres and Redis by overriding the default cpu/memory allocation values. These latter are determined during the setup process based on your instance capacity and should fit the needs of most installations.

 If you have a high volume and a big fat machine, simply open the `vars.yaml` file with the command `vi openreplay/scripts/helm/vars.yaml` and uncomment then substitute the below lines:

```yaml
db_resource_override:
  postgresql:
    resources:
      limits:
        cpu: 4096m
        memory: 8192Mi
      requests:
        cpu: 1024m
        memory: 2056Mi
  redis: {}
```

Then, reinstall the service (postgres|redis) for the new limits to take effect (your data won't be lost):

```bash
cd openreplay/scripts/helm
openreplay-cli -i postgresql # or redis
```

## Uninstall OpenReplay

Run the below commands to uninstall OpenReplay:

```bash
sudo systemctl stop k3s
sudo systemctl disable k3s

#sudo reboot # For restarting the machine

sudo k3s-uninstall.sh
sudo rm -rf /var/lib/rancher
```