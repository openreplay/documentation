---
title: "Jobs"
metaTitle: "Jobs"
metaDescription: "How to manage user data deletion jobs."
---

## List all jobs

Retrieve all jobs, including those that are completed or canceled.

#### Method: `GET`

#### URL: `/api/app/:projectKey/jobs`

#### Request Headers

`Authorization: {YOUR_ORGANIZATION_API_KEY}`: The key can be found in 'Preferences' > 'Account' > 'Organization API Key'.

#### Status Codes

`200`: Response sent as JSON in body

#### Example Request

```curl
curl -X GET \
  https://openreplay.example.com/api/app/3sWXSsqHgSKnE87YkNJK/jobs \
  -H 'content-type: application/json' \
  -H 'Authorization: {YOUR_ORGANIZATION_API_KEY}'
```

#### Example Response

```json
{

}
```

## Get job details

Return the job's `status` and other details such as `createdAt`, `createdBy` and `errors`.

#### Method: `GET`

#### URL: `/api/app/:projectKey/jobs/:jobId`

#### Parameters

| Name | Type | Description |
|----------|-------------|-------------|
| jobId | string | The ID returned by the user deletion call (required) |

#### Request Headers

`Authorization: {YOUR_ORGANIZATION_API_KEY}`: The key can be found in 'Preferences' > 'Account' > 'Organization API Key'.

#### Status Codes

`200`: Response sent as JSON in body

#### Example Request

```curl
curl -X GET \
  https://openreplay.example.com/api/app/3sWXSsqHgSKnE87YkNJK/jobs/143500982356\
  -H 'content-type: application/json' \
  -H 'Authorization: {YOUR_ORGANIZATION_API_KEY}'
```

#### Example Response

```json
{
  "jobId": "143500982356",
  "status": "running",
  "errors": null,
  "createdAt": 1623440919928,
  "finishedAt": null,
  "createdBy": "mehdi@openreplay.com"
}
```

## Cancel job

Cancel a job if it hasn't yet started or still in progress.

#### Method: `DELETE`

#### URL: `/api/app/:projectKey/jobs/:jobId`

#### Parameters

| Name | Type | Description |
|----------|-------------|-------------|
| jobId | string | The ID returned by the user deletion call (required) |

#### Request Headers

`Authorization: {YOUR_ORGANIZATION_API_KEY}`: The key can be found in 'Preferences' > 'Account' > 'Organization API Key'.

#### Status Codes

`200`: Response sent as JSON in body

#### Example Request

```curl
curl -X DELETE \
  https://openreplay.example.com/api/app/3sWXSsqHgSKnE87YkNJK/jobs/143500982356 \
  -H 'content-type: application/json' \
  -H 'Authorization: {YOUR_ORGANIZATION_API_KEY}'
```

#### Example Response

```json
{
  "jobId": "143500982356",
  "status": "canceled"
}
```
