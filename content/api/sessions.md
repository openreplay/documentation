---
title: "Sessions"
metaTitle: "Sessions"
metaDescription: "How to retrieve all sessions for a particular user."
---

## Retrieve user sessions

Returns the list of sessions for a particular user, who has been identified via the `tracker.setUserID` JavaScript function.

**Method:** `GET`

**URL:** `/api/app/:projectKey/users/:userId/sessions`

#### Parameters

| Name | Type | Description |
|----------|-------------|-------------|
| projectKey | string | The ID of the project you're tracking (required) |
| userId | string | The ID of your user, set via `tracker.setUserID` (required) |
| start_date | epoch (ms) | Start date from which to filter sessions |
| end_date | epoch (ms) | End date until which to filter sessions |

#### Request Headers

`Authorization: {YOUR_ORGANIZATION_API_KEY}`: The key can be found in 'Preferences' > 'Account' > 'Organization API Key'.

#### Status Codes

`200`: Response sent as JSON in body

#### Example Request

```curl
curl -X GET \
  https://openreplay.example.com/api/app/3sWXSsqHgSKnE87YkNJK/users/mickael@openreplay.com/sessions \
  -H 'content-type: application/json' \
  -H 'Authorization: {YOUR_ORGANIZATION_API_KEY}'
```

#### Example Response

```json
{}
```
