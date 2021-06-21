---
title: "Delete Recordings"
metaTitle: "Delete Recordings"
metaDescription: "Delete recordings in bulk from database."
---

## Database cleanup

Use the below SQL query if you wish to cleanup data from your database (PostgreSQL). Replace the `epoch timestamp (milliseconds)` with the date from which to keep recordings. It's a cascade delete, so all recordings as well as their corresponding events will be removed from the database.

> **Important:** This is done at your own risk, so be extremely careful when performing such actions in the database.

```plsql
--- Cascade delete all sessions and their related events captured before Jan 1st, 2021
DELETE FROM public.sessions WHERE start_ts < 1609459200000;
```

## Connect to PostgreSQL

Login to your OpenReplay instance, then:

1. Run `k9s -n app`
2. Press `0`
3. Use the keyboard arrows to navigate the list and get to the `postgresql-*` container
4. Press `s` to have shell access the the Postgres container
5. Run `PGPASSWORD=asayerPostgres psql -U postgres`
6. Execute your delete (or any other) query
7. Type `exit` to exit the postgresql-client
8. Use `exit` to exit the Postgres container
9. Run `:quit` to exit the Kubernetes CLI
