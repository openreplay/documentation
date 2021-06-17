---
title: "Users"
metaTitle: "Users"
metaDescription: "How to manage and control user data."
---

## Get user stats

Get some high-level statistics and details about a particular user, who has been identified via the `tracker.setUserID` JavaScript function. This endpoint returns things like `firstSeen`, `lastSeen` and `numberSessions`.

### Method
`GET`

### URL
`/api/v1/:projectKey/users/:userId`

### Parameters

| Name | Type | Description |
|----------|-------------|-------------|
| projectKey | string | The ID of the project you're tracking (required) |
| userId | string | The ID of your user, set via `tracker.setUserID` (required) |

### Request Headers

`Authorization: {YOUR_ORGANIZATION_API_KEY}`: The key can be found in 'Preferences' > 'Account' > 'Organization API Key'.

### Status Codes

`200`: Response sent as JSON in body

### Example Request

```curl
curl -X GET \
  https://openreplay.example.com/api/v1/3sWXSsqHgSKnE87YkNJK/users/mickael@openreplay.com \
  -H 'content-type: application/json' \
  -H 'Authorization: {YOUR_ORGANIZATION_API_KEY}'
```

### Example Response

```json
{
  "data": {
    "userId": "mickael@openreplay.com",
    "sessionCount": 3,
    "lastSeen": 1623689478617,
    "firstSeen": 1623440822825
  }
}
```

## Delete user

Delete a user (identified via the `tracker.setUserID` JavaScript function) and all its data captured by OpenReplay. This fires up a background (cron) job for removing all user related data, including sessions, events, metadata, custom events and recordings. The call returns a `jobID` that you can use later on to [check](/api/jobs#getjobdetails) the status of the delete operation.

This comes in handy for handling GDPR requests you may receive from your end users.

### Method
`DELETE`

### URL
`/api/v1/:projectKey/users/:userId`

### Parameters

| Name | Type | Description |
|----------|-------------|-------------|
| projectKey | string | The ID of the project you're tracking (required) |
| userId | string | The ID of your user, set via `tracker.setUserID` (required) |

### Request Headers

`Authorization: {YOUR_ORGANIZATION_API_KEY}`: The key can be found in 'Preferences' > 'Account' > 'Organization API Key'.

### Status Codes

`200`: Response sent as JSON in body

### Example Request

```curl
curl -X DELETE \
  https://openreplay.example.com/api/v1/3sWXSsqHgSKnE87YkNJK/users/mickael@example.com \
  -H 'content-type: application/json' \
  -H 'Authorization: {YOUR_ORGANIZATION_API_KEY}'
```

### Example Response

```json
{
  "data": {
    "jobId": 22345,
    "description": "Delete user sessions of userId = mickael@example.com",
    "status": "scheduled",
    "projectId": 1,
    "action": "delete_user_data",
    "referenceId": "mehdi@openreplay.com",
    "createdAt": 1623912962910,
    "updatedAt": 1623912962910,
    "startAt": 1623954600000,
    "errors": null
  }
}
```
