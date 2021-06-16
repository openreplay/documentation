---
title: "Users"
metaTitle: "Users"
metaDescription: "How to manage and control user data."
---

## Get user stats

Get some high-level statistics and details about a particular user, who has been identified via the `tracker.setUserID` JavaScript function. This endpoint returns things like `firstSeen`, `lastSeen` and `numberSessions`.

###### Method: `GET`

###### URL: `/api/app/:projectKey/users/:userId`

##### Parameters

| Name | Type | Description |
|----------|-------------|-------------|
| projectKey | string | The ID of the project you're tracking (required) |
| userId | string | The ID of your user, set via `tracker.setUserID` (required) |

##### Request Headers

`Authorization: {YOUR_ORGANIZATION_API_KEY}`: The key can be found in 'Preferences' > 'Account' > 'Organization API Key'.

##### Status Codes

`200`: Response sent as JSON in body

##### Example Request

```curl
curl -X GET \
  https://openreplay.example.com/api/app/3sWXSsqHgSKnE87YkNJK/users/mickael@openreplay.com \
  -H 'content-type: application/json' \
  -H 'Authorization: {YOUR_ORGANIZATION_API_KEY}'
```

##### Example Response

```json
{

}
```

## Delete user

Delete a user (identified via the `tracker.setUserID` JavaScript function) and all its data captured by OpenReplay. This fires up a background (cron) job for removing all user related data, including sessions, events, metadata, custom events and recordings. The call returns a `jobID` that you can use later on to [check](/api/jobs#getjobdetails) the status of the delete operation.

This comes in handy for handling GDPR requests you may receive from your end users.

##### Method: `DELETE`

##### URL: `/api/app/:projectKey/users/:userId`

##### Parameters

| Name | Type | Description |
|----------|-------------|-------------|
| projectKey | string | The ID of the project you're tracking (required) |
| userId | string | The ID of your user, set via `tracker.setUserID` (required) |

##### Request Headers

`Authorization: {YOUR_ORGANIZATION_API_KEY}`: The key can be found in 'Preferences' > 'Account' > 'Organization API Key'.

##### Status Codes

`200`: Response sent as JSON in body

##### Example Request

```curl
curl -X DELETE \
  https://openreplay.example.com/api/app/3sWXSsqHgSKnE87YkNJK/users/mickael@openreplay.com \
  -H 'content-type: application/json' \
  -H 'Authorization: {YOUR_ORGANIZATION_API_KEY}'
```

##### Example Response

```json
{
  "jobId": "143500982356"
}
```
