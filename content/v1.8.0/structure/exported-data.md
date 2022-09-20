---
title: "Exported Data"
metaTitle: "Exported Data"
metaDescription: "Export data to your data warehouses using OpenReplay connectors (Enterprise Edition)."
---

OpenReplay Enterprise Edition comes with different connectors for exporting captured data (user behavior and technical issues) to your data warehouse. We support:
- Amazon Redshift
- Google BigQuery
- PostgreSQL
- Snowflake
- ClickHouse

## Sessions

|﻿Column name|Type|Category|Description|
|-----------|----|--------|-----------|
sessionid|text|session metadata|Unique session identifier
user_agent|text|session metadata|Example: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0
user_browser|text|session metadata|User browser
user_browser_version|text|session metadata|User browser version
user_country|text|session metadata|User country
user_device|text|session metadata|User device
user_device_heap_size|biginteger|session metadata|User device heap size
user_device_memory_size|biginteger|session metadata|The approximate amount of device memory in gigabytes
user_device_type|text|session metadata|User device type
user_os|text|session metadata|User OS
user_os_version|text|session metadata|User OS version
user_uuid|text|session metadata|User unique identifier
connection_effective_bandwidth|biginteger|session metadata|The effective bandwidth estimate in megabits per second
connection_type|text|session metadata|Connection type. One of the following: bluetooth, cellular, ethernet, none, wifi, other, unknown
metadata_key|text|session metadata|Additional information about users (also known as traits or user variables). Learn more about [metadata](https://docs.openreplay.com/installation/metadata)
metadata_value|text|session metadata|Additional information about users (also known as traits or user variables). Learn more about [metadata](https://docs.openreplay.com/installation/metadata)
referrer|text|session metadata|the URI of the page that linked to this page
user_anonymous_id|text|session metadata|Optional user identifier
user_id|text|session metadata|An identifier of a user within a session, that can be set manually with setUserID() [tracker method](https://docs.openreplay.com/installation/identify-user)
session_start_timestamp|biginteger|session metadata|Timestamp when the first message from the session was generated on the user side
session_end_timestamp|biginteger|session metadata|Timestamp when the last message from a session arrived followed by 2 minutes and 30 seconds of inactivity
session_duration|biginteger|session metadata|The difference between session_end_timestamp and session_start_timestamp in milliseconds
first_contentful_paint|biginteger|loading speed|Time when the browser first rendered any text, image
speed_index|biginteger|loading speed|Speed Index is a page load performance metric that shows you how quickly the contents of a page are visibly populated. It is the average time at which visible parts of the page are displayed. Expressed in milliseconds, and dependent on the size of the viewport, the lower the score, the better.
visually_complete|biginteger|loading speed|The time necessary to the zone above the foldline to be rendered under its final form
timing_time_to_interactive|biginteger|loading speed|Time to Interactive is a non-standardized web performance 'progress' metric defined as the point in time when the last Long Task finished and was followed by 5 seconds of network and main thread inactivity.
avg_cpu|biginteger|performance|Average estimated CPU on a user side
avg_fps|biginteger|performance|Maximum number of frames per second on a user side
max_cpu|biginteger|performance|Maximum estimated CPU on a user side
max_fps|biginteger|performance|Maximum number of frames per second on a user  side
max_total_js_heap_size|biginteger|performance|Maximum total heap size
max_used_js_heap_size|biginteger|performance|Maximum used heap size
js_exceptions_count|biginteger|issues and events|A count of JavaScript exceptions events within a session
long_tasks_total_duration|biginteger|issues and events|Total duration of tasks that block the main thread for 50 ms or more
long_tasks_max_duration|biginteger|issues and events|Maximum duration of a single task that block the main thread for 50 ms or more
long_tasks_count|biginteger|issues and events|Total number of tasks that block the main thread for 50 ms or more
inputs_count|biginteger|issues and events|A count of Input events within a session
clicks_count|biginteger|issues and events|A count of Click events within a session
issues_count|biginteger|issues and events|A count of Issue events within a session
issues|array[text]|issues and events|A list of issue names
urls_count|biginteger|issues and events|A count of different URL visited during a session
urls|array[text]|issues and events|A list of URLs visited during a session

## Events

|Column name|Type|Category|Description|
|----------|----|--------|-----------|
sessionid|biginteger|technical|Unique session identifier
connectioninformation_downlink|biginteger|technical|The effective bandwidth estimate in megabits per second, rounded to the nearest multiple of 25 kilobits per seconds
connectioninformation_type|text|technical|The type of connection a device is using to communicate with the network. One of the following: bluetooth, cellular, ethernet, none, wifi, other, unknown.
consolelog_level|text|technical|Verbose, Info, Warning or Error
consolelog_value|text|technical|Console log message content
customevent_messageid|biginteger|technical|Unique identifier
customevent_name|text|technical|Name of the custom event
customevent_payload|text|technical|custom event's payload
customevent_timestamp|biginteger|technical|Timestamp of the event
errorevent_message|text|technical|Error event message content
errorevent_messageid|biginteger|technical|Unique identifier
errorevent_name|text|technical|Name of the error event
errorevent_payload|text|technical|Error's payload
errorevent_source|text|technical|Source of the error
errorevent_timestamp|biginteger|technical|Timestamp of the event
jsexception_message|text|technical|JS exception message content
jsexception_name|text|technical|Exception's name
jsexception_payload|text|technical|Exception's payload
metadata_key|text|technical|Additional information about users (also known as traits or user variables). Learn more about [metadata](https://docs.openreplay.com/installation/metadata)
metadata_value|text|technical|Additional information about users (also known as traits or user variables). Learn more about [metadata](https://docs.openreplay.com/installation/metadata)
mouseclick_id|biginteger|behavioral|A unique identifier of a DOM element
mouseclick_hesitationtime|biginteger|behavioral|Time between hovering on element and clicking it
mouseclick_label|text|behavioral|Element text if present
pageevent_firstcontentfulpaint|biginteger|technical|Timestamp when the browser first rendered any text, image
pageevent_firstpaint|biginteger|technical|Is the time between navigation and when the browser renders the first pixels to the screen, rendering anything that is visually different from what was on the screen prior to navigation. It answers the question Is it happening?
pageevent_messageid|biginteger|technical|Unique identifier
pageevent_referrer|text|technical|the URI of the page that linked to this page
pageevent_speedindex|biginteger|technical|The average time at which visible parts of the page are displayed. Expressed in milliseconds
pageevent_timestamp|biginteger|technical|Timestamp of the event
pageevent_url|text|behavioral|URL
pagerendertiming_timetointeractive|biginteger|technical|A non-standardized web performance 'progress' metric defined as the point in time when the last Long Task finished and was followed by 5 seconds of network and main thread inactivity
pagerendertiming_visuallycomplete|biginteger|technical|The time necessary to the zone above the foldline to be rendered under its final form
rawcustomevent_name|text|technical|Custom event name
rawcustomevent_payload|text|technical|Payload
setviewportsize_height|biginteger|behavioral|Height of the user's visible area of a web page
setviewportsize_width|biginteger|behavioral|Width of the user's visible area of a web page
timestamp_timestamp|biginteger|technical|Timestamp message (related to v.2)
user_anonymous_id|text|technical|Optional user identifier
user_id|text|technical|An identifier of a user within a session, that can be set manually with setUserID() [tracker method](https://docs.openreplay.com/installation/identify-user)
issueevent_messageid|biginteger|behavioral, technical|Unique identifier
issueevent_timestamp|biginteger|behavioral, technical|Timestamp of the event
issueevent_type|text|behavioral, technical|Type of the issue (see Issue Type documentation for more)
issueevent_contextstring|text|behavioral, technical|Issue message with explanation
issueevent_context|text|behavioral, technical|Relevant information on the issue
issueevent_payload|text|behavioral, technical|Payload
customissue_name|text|technical|Custom issue name
customissue_payload|text|technical|Custom issue payload
received_at|biginteger|technical|Timestamp when the event is received by connector
batch_order_number|biginteger|technical|Order number in a batch. To reconstruct the order of messages, sort by received_at and batch_order_number
