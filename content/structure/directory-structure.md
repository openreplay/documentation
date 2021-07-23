---
title: "Directory Structure"
metaTitle: "Directory Structure"
metaDescription: "Directory Structure for potential contributors"
---

The page documents the OpenReplay directory structure, were you find things, and decide where to make a change.

## Core Python Chalice API 
We have a python api built with chalice. Chalice is a severless framework which allows us to only pay for resources that we use. All the files can be found in the `api/` folders. The following routes serve data for our application. Similar to Flask, chalice allows you to define a set of url routes seperately from the main application. URL routes are defined in routes and following apps serve routes in our application. 

* `api/chalicelib/blueprints/bp_authorizers.py` This app serves urls used for authorization of users.
* `api/chalicelib/blueprints/bp_core.py`
* `api/chalicelib/blueprints/bp_core_crons.py` This app runs schedules cron jobs.
* `api/chalicelib/blueprints/bp_core_dynamic.py` This app serves core openreplay endpoints 
* `api/chalicelib/blueprints/bp_core_dynamic_crons.py`
* `api/chalicelib/blueprints/bp_dashboard.py` Serves data 
* `api/chalicelib/blueprints/bp_app_api.py` 

##  Backend Written in Go 
We also have a data persistence layer written in Go and it houses backend serivces which run in the background to make OpenReplay fault tolerant.

* `backend/alerts` Used for capturing error messages and performance metrics.
* `backend/assets` Used to cache properties of a website like css, font, icons etc. The cache lasts for 90 days.
* `backend/db` Used to read data from data pipelines to the database.
* `backend/ender` Used to end user session that haven't been used in the past two hours.
* `backend/http` Used as an entrypoint which receives information from the trackers and sends to the data pipelines.
* `backend/integrations` Used to integrate with external sources like sentry, cloudwatch, datadog e.t.c.
* `backend/sink` Used to read data from the redis stream and stores in a file.
* `backend/stream` Read data from file in previous section and stores for long term persistence.