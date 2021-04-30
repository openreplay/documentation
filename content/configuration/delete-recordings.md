---
title: "Delete Recordings"
metaTitle: "Delete Recordings"
metaDescription: "Delete recordings in bulk from database."
---

Use the below SQL query if you wish to cleanup data from your database (PostgreSQL). Replace the `epoch timestamp (milliseconds)` with the date from which to keep recordings. It's a cascade delete, so all recordings as well as their corresponding events will be removed from the database.

> **Important:** This is done at your own risk, so be extremely careful when performing such actions in the database.

```plsql
--- Cascade delete all sessions and their related events captured before Jan 1st, 2021
DELETE FROM public.sessions WHERE start_ts < 1609459200000;
```
