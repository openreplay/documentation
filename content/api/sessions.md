---
title: "Sessions"
metaTitle: "Sessions"
metaDescription: "How to retrieve all sessions for a particular user."
---

## Retrieve user sessions

Returns the list of sessions for a particular user, who has been identified via the `tracker.setUserID` JavaScript function.

**Method:** `GET`

**URL:** `/api/app/:projectKey/users/:userId/sessions`

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
  https://openreplay.example.com/api/app/3sWXSsqHgSKnE87YkNJK/users/mickael@openreplay.com/sessions \
  -H 'content-type: application/json' \
  -H 'Authorization: {YOUR_ORGANIZATION_API_KEY}'
```

### Example Response

```json
{
    "data": [{
        "sessionId": 4813023023591169,
        "messageId": 4294969053,
        "timestamp": 1623440905732,
        "host": "testsite.openreplay.com",
        "path": "/my-account/",
        "basePath": "/my-account/",
        "referrer": "https://testsite.openreplay.com/",
        "baseReferrer": "https://testsite.openreplay.com/",
        "domBuildingTime": null,
        "domContentLoadedTime": null,
        "loadTime": null,
        "firstPaintTime": null,
        "firstContentfulPaintTime": null,
        "speedIndex": null,
        "visuallyComplete": null,
        "timeToInteractive": null,
        "responseTime": null,
        "responseEnd": null,
        "ttfb": null,
        "value": "/my-account/",
        "url": "/my-account/",
        "type": "LOCATION"
    }, {
        "sessionId": 4813023023591169,
        "messageId": 8589934775,
        "timestamp": 1623440907762,
        "host": "testsite.openreplay.com",
        "path": "/sample-page/",
        "basePath": "/sample-page/",
        "referrer": "https://testsite.openreplay.com/my-account/",
        "baseReferrer": "https://testsite.openreplay.com/my-account/",
        "domBuildingTime": null,
        "domContentLoadedTime": null,
        "loadTime": null,
        "firstPaintTime": null,
        "firstContentfulPaintTime": null,
        "speedIndex": null,
        "visuallyComplete": null,
        "timeToInteractive": null,
        "responseTime": null,
        "responseEnd": null,
        "ttfb": null,
        "value": "/sample-page/",
        "url": "/sample-page/",
        "type": "LOCATION"
    }, {
        "sessionId": 4813023023591169,
        "messageId": 12884903334,
        "timestamp": 1623440910655,
        "host": "testsite.openreplay.com",
        "path": "/",
        "basePath": "/",
        "referrer": "https://testsite.openreplay.com/sample-page/",
        "baseReferrer": "https://testsite.openreplay.com/sample-page/",
        "domBuildingTime": 720,
        "domContentLoadedTime": 901,
        "loadTime": 1705,
        "firstPaintTime": 781,
        "firstContentfulPaintTime": 781,
        "speedIndex": null,
        "visuallyComplete": null,
        "timeToInteractive": null,
        "responseTime": 6,
        "responseEnd": 178,
        "ttfb": null,
        "value": "/",
        "url": "/",
        "type": "LOCATION"
    }, {
        "sessionId": 4813023023591169,
        "messageId": 17179870988,
        "timestamp": 1623440914730,
        "host": "testsite.openreplay.com",
        "path": "/my-account/",
        "basePath": "/my-account/",
        "referrer": "https://testsite.openreplay.com/",
        "baseReferrer": "https://testsite.openreplay.com/",
        "domBuildingTime": 855,
        "domContentLoadedTime": 1065,
        "loadTime": 1545,
        "firstPaintTime": 979,
        "firstContentfulPaintTime": 979,
        "speedIndex": null,
        "visuallyComplete": null,
        "timeToInteractive": null,
        "responseTime": 26,
        "responseEnd": 207,
        "ttfb": null,
        "value": "/my-account/",
        "url": "/my-account/",
        "type": "LOCATION"
    }, {
        "sessionId": 4813023023591169,
        "messageId": 17179871001,
        "timestamp": 1623440915126,
        "label": "Shop",
        "type": "CLICK"
    }, {
        "sessionId": 4813023023591169,
        "messageId": 25769806952,
        "timestamp": 1623440919928,
        "host": "testsite.openreplay.com",
        "path": "/product/beanie-with-logo/",
        "basePath": "/product/beanie-with-logo/",
        "referrer": "https://testsite.openreplay.com/shop/",
        "baseReferrer": "https://testsite.openreplay.com/shop/",
        "domBuildingTime": null,
        "domContentLoadedTime": null,
        "loadTime": null,
        "firstPaintTime": null,
        "firstContentfulPaintTime": null,
        "speedIndex": null,
        "visuallyComplete": null,
        "timeToInteractive": null,
        "responseTime": null,
        "responseEnd": null,
        "ttfb": null,
        "value": "/product/beanie-with-logo/",
        "url": "/product/beanie-with-logo/",
        "type": "LOCATION"
    }]
}
```
