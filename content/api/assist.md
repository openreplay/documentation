---
title: "Assist"
metaTitle: "Assist"
metaDescription: "How to search all live sessions for a particular project."
---

## Retrieve live sessions

Only available for EE edition.
Returns the list of live sessions for a particular project.

### Method

`GET`

### URL

`/api/v1/:projectKey/assist/sessions`

### Parameters

| Name | Type | Description |
|----------|-------------|-------------|
| projectKey | string | The ID of the project you're tracking (required) |

### Request Headers

`Authorization: {YOUR_ORGANIZATION_API_KEY}`: The key can be found in 'Preferences' > 'Account' > 'Organization API
Key'.

### Status Codes

`200`: Response sent as JSON in body

### Example Request

```curl
curl -X GET \
  https://openreplay.example.com/api/v1/aYYaFHiagqdXKEmVlmvJ/assist/sessions \
  -H 'content-type: application/json' \
  -H 'Authorization: {YOUR_ORGANIZATION_API_KEY}'
```

### Example Response

```json
{
  "data": {
    "total": 1,
    "sessions": [
      {
        "pageTitle": "OpenReplay Blog",
        "sessionID": "6975518573799938",
        "metadata": {},
        "userID": "",
        "userUUID": "8998545b-553c-4f41-a39d-d7cba7fac2d1",
        "projectKey": "aYYaFHiagqdXKEmVlmvJ",
        "revID": "",
        "timestamp": 1656437966459,
        "trackerVersion": "3.5.11",
        "isSnippet": true,
        "userOs": "Mac OS",
        "userBrowser": "Chrome",
        "userBrowserVersion": "103.0.0.0",
        "userDevice": null,
        "userDeviceType": "desktop",
        "userCountry": "FR",
        "active": false,
        "live": true,
        "projectId": 3
      }
    ]
  }
}
```

## Search live sessions

Search in the list of live sessions for a particular project.

### Method

`POST`

### URL

`/api/v1/:projectKey/assist/sessions`

### Parameters

| Name | Type | Description |
|----------|-------------|-------------|
| projectKey | string | The ID of the project you're tracking (required) |

### Payload

| Name    | Type            | Description                                          |
|---------|-----------------|------------------------------------------------------|
| sort    | string          | The sort attribute (default:timestamp)               |
| order   | string          | The sort order, can be "DESC" or "ASC" (default:DESC) |
| page    | integer         | The page number for pagination (default:1)           |
| limit   | integer         | The number of sessions per page (default:200)        |
| filters | array of filter | The list of filters, check next table (default:[])   |

filter object:

| Name | Type | Description |
|---------|-----------------|------------------------------------------------------|
| value | array of strings | The list of values (default:[])         |
| type | case insensitive string | The filter attribute (required) |
| source | string | The metadata attribue name for type=metadata (default:"")           |

PS: if `values=[]`; the search will look for the live-sessions that have a given attribute.

### Request Headers

`Authorization: {YOUR_ORGANIZATION_API_KEY}`: The key can be found in 'Preferences' > 'Account' > 'Organization API
Key'.

### Status Codes

`200`: Response sent as JSON in body

### Example Request

The following example will look for the first 10 live-sessions (reverse sort by timestamp) that have
a `userId contains openreplay` and `metadata.plan contains trial or free`

```curl
curl -X POST \
  https://openreplay.example.com/api/v1/aYYaFHiagqdXKEmVlmvJ/assist/sessions \
  -H 'content-type: application/json' \
  -H 'Authorization: {YOUR_ORGANIZATION_API_KEY}'
  --data-raw '{
    "filters": [
        {
            "value": [
                "trial", "free"
            ],
            "type": "METADATA",
            "source": "plan"
        },
        {
            "value": [
                "openreplay"
            ],
            "type": "USERID"
        }
    ],
    "sort": "timestamp",
    "order": "DESC",
    "limit": 10,
    "page": 1
   }'
```

### Example Response

```json
{
  "data": {
    "total": 1,
    "sessions": [
      {
        "pageTitle": "OpenReplay Blog",
        "sessionID": "6975518573799185",
        "metadata": {
          "plan": "trial"
        },
        "userID": "dev@openreplay.com",
        "userUUID": "8998545b-553c-4f41-a39d-d7cba7fac2d1",
        "projectKey": "aYYaFHiagqdXKEmVlmvJ",
        "revID": "",
        "timestamp": 1656437966459,
        "trackerVersion": "3.5.11",
        "isSnippet": true,
        "userOs": "Mac OS",
        "userBrowser": "Chrome",
        "userBrowserVersion": "103.0.0.0",
        "userDevice": null,
        "userDeviceType": "desktop",
        "userCountry": "FR",
        "active": false,
        "live": true,
        "projectId": 3
      }
    ]
  }
}
```

