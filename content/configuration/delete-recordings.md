---
title: "Delete Recordings"
metaTitle: "Delete Recordings"
metaDescription: "Delete recordings in bulk from database and cleanup your storage."
---

## Database cleanup

Use the below SQL query if you wish to cleanup data from your database (PostgreSQL). Replace the `epoch timestamp (milliseconds)` with the date from which to keep recordings. It's a cascade delete, so all recordings as well as their corresponding events will be removed from the database.

> **Important:** This is done at your own risk, so be extremely careful when performing such actions in the database.

```plsql
--- Cascade delete all sessions and their related events captured before Jan 1st, 2021
DELETE FROM public.sessions WHERE start_ts < 1609459200000;
```

### How to connect to PostgreSQL

Login to your OpenReplay instance, then:

1. Run `k9s -n db`
2. Use the keyboard arrows to navigate the list and get to the `postgresql-*` container
3. Press `s` to have shell access the the Postgres container
4. Run `PGPASSWORD=asayerPostgres psql -U postgres`
5. Execute your delete (or any other) query
6. Type `exit` to exit the postgresql-client
7. Use `exit` to exit the Postgres container
8. Run `:quit` to exit the Kubernetes CLI


## Storage cleanup

Each recording takes the form of a file. In fact, OpenReplay dumps what's necessary to replay a session (DOM mutations, mouse coordinates, console logs, network activity and much more) into a single file. These files are by default stored on your instance, so they make up most of its storage. 

### Remove recordings

If you ever need to free up some space, then login to your OpenReplay instance and follow the below steps:

1. Run `k9s -n db`
2. Use the keyboard arrows to navigate the list and get to the `minio-*` container
3. Press `s` to have shell access the the Minio (object storage) container
4. Run `mc alias set minio http://localhost:9000 "{{ minio_access_key }}" "{{ minio_secret_key }}"`
5. Run `mc rm --recursive --dangerous --force --older-than 7d minio/mobs` (i.e. delete files that are older than 7 days)
6. Use `exit` to exit the Minio container
7. Run `:quit` to exit the Kubernetes CLI
   
### Change default lifecycle policy

Recordings are automatically cleaned 180 days after they get created. You can change the default lifecycle policy this way:

1. Run `k9s -n db`
2. Use the keyboard arrows to navigate the list and get to the `minio-*` container
3. Press `s` to have shell access the the Minio (object storage) container
4. Run `mc ilm set --id mobs --expiry-days 14 minio/mobs` (i.e. automatically clean recordings 14 days after creation)
5. Use `exit` to exit the Minio container
6. Run `:quit` to exit the Kubernetes CLI
