---
title: "Sessions"
metaTitle: "Sessions"
metaDescription: "How to retrieve all sessions for a particular user."
---

## Retrieve user sessions

Returns the list of sessions for a particular user, who has been identified via the `tracker.setUserID` JavaScript function.

### Method
`GET`

### URL
`/api/v1/:projectKey/users/:userId/sessions`

### Parameters

| Name | Type | Description |
|----------|-------------|-------------|
| projectKey | string | The ID of the project you're tracking (required) |
| userId | string | The ID of your user, set via `tracker.setUserID` (required) |
| start_date | epoch (ms) | Start date from which to filter sessions |
| end_date | epoch (ms) | End date until which to filter sessions |

### Request Headers

`Authorization: {YOUR_ORGANIZATION_API_KEY}`: The key can be found in 'Preferences' > 'Account' > 'Organization API Key'.

### Status Codes

`200`: Response sent as JSON in body

### Example Request

```curl
curl -X GET \
  https://openreplay.example.com/api/v1/3sWXSsqHgSKnE87YkNJK/users/mickael@openreplay.com/sessions \
  -H 'content-type: application/json' \
  -H 'Authorization: {YOUR_ORGANIZATION_API_KEY}'
```

### Example Response

```json
{
  "data": [
    {
      "projectId": 1,
      "sessionId": "4813018042986240",
      "userUuid": "15bd70f6-aedf-4544-8ae6-57eb66398e94",
      "userId": "mickael@openreplay.com",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36",
      "userOs": "Mac OS X",
      "userBrowser": "Chrome",
      "userDevice": "",
      "userCountry": "IN",
      "startTs": 1623440822825,
      "duration": 12779,
      "eventsCount": 1,
      "pagesCount": 1,
      "errorsCount": 0
    },
    {
      "projectId": 1,
      "sessionId": "4813023023591169",
      "userUuid": "15bd70f6-aedf-4544-8ae6-57eb66398e94",
      "userId": "mickael@openreplay.com",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36",
      "userOs": "Mac OS X",
      "userBrowser": "Chrome",
      "userDevice": "",
      "userCountry": "IN",
      "startTs": 1623440902620,
      "duration": 18226,
      "eventsCount": 6,
      "pagesCount": 5,
      "errorsCount": 0
    }
  ]
}
```
