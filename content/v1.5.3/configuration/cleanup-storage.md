---
title: "Cleanup Storage"
metaTitle: "Cleanup Storage"
metaDescription: "Delete recordings in bulk from database and cleanup your storage."
---

## Recording storage

Each recording exists in the form of a file and an entry in the database. OpenReplay dumps what's necessary to replay a session (DOM mutations, mouse coordinates, console logs, network activity and much more) into a single file. These files are by default stored on your instance, so they make up most of its storage.

Session metadata will be stored in the PostgreSQL database forever, but after 180 days the file containing the recording will be expired/deleted through a minio lifecycle policy.

### Change default lifecycle policy

You can change the default lifecycle policy this way:

1. Run `k9s -n db`
2. Use the keyboard arrows to navigate the list and get to the `minio-*` container
3. Press `s` to have shell access the Minio (object storage) container
4. Run `mc alias set minio http://localhost:9000 $MINIO_ACCESS_KEY $MINIO_SECRET_KEY`
5. Run `mc ilm set --id mobs --expiry-days 14 minio/mobs` (i.e. automatically clean recordings 14 days after creation)
6. Use `exit` to exit the Minio container
7. Run `:quit` to exit the Kubernetes CLI

## Manual cleanup

### Database (PostgeSQL)

Use the below SQL query if you wish to cleanup data from your database (PostgreSQL). Replace the `epoch timestamp (milliseconds)` with the date from which to keep recordings. It's a cascade delete, so all recordings as well as their corresponding events will be removed from the database.

> **Important:** This is done at your own risk, so be extremely careful when performing such actions in the database.

```plsql
--- Cascade delete all sessions and their related events captured before Jan 1st, 2021
DELETE FROM public.sessions WHERE start_ts < 1609459200000;
```

#### How to connect to PostgreSQL

Login to your OpenReplay instance, then:

1. Run `k9s -n db`
2. Use the keyboard arrows to navigate the list and get to the `postgresql-*` container
3. Press `s` to have shell access the the Postgres container
4. Run `PGPASSWORD=MY_PG_PASSWORD psql -U postgres` (replace `MY_PG_PASSWORD` with the value of the `postgresqlPassword` variable from `/openreplay/scripts/helmcharts/vars.yaml` file)
5. Execute your delete (or any other) query
6. Type `exit` to exit the postgresql-client
7. Use `exit` to exit the Postgres container
8. Run `:quit` to exit the Kubernetes CLI


### Recordings
 
#### Remove recordings

If you ever need to free up some space, then login to your OpenReplay instance and follow the below steps:

1. Run `k9s -n db`
2. Use the keyboard arrows to navigate the list and get to the `minio-*` container
3. Press `s` to have shell access the Minio (object storage) container
4. Run `mc alias set minio http://localhost:9000 $MINIO_ACCESS_KEY $MINIO_SECRET_KEY`
5. Run `mc rm --recursive --dangerous --force --older-than 7d minio/mobs` (i.e. delete files that are older than 7 days)
6. Use `exit` to exit the Minio container
7. Run `:quit` to exit the Kubernetes CLI
