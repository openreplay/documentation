---
title: "External Storage"
metaTitle: "External Storage"
metaDescription: "How to change the default storage destination of your recordings."
---

OpenReplay [session recordings](/configuration/recording-storage) are by default stored on your instance, but the destination can be changed to any S3 object storage service, which allows for greater scalability and lower deployment costs.

## Change recordings' storage destination

Recordings can be persisted in any object storage destination as long as it's S3 compatible, which makes OpenReplay compatible with all major public cloud services. Below are the steps to configure a different destination for your recordings:

### Create the necessary buckets

You must create the below buckets in your object storage service. Their names can be different, but we'll use the below references in the remainder of this section:
- `openreplay-recordings`: where recordings will be persisted
- `openreplay-assets`: where assets (such as css and fonts) will be copied
- `openreplay-sourcemaps`: for storing source maps (see [how to upload them](/installation/upload-sourcemaps))

Once the bucket created: 

1. Enable CORS for each of the above buckets. If you're on AWS, that would be under 'Permissions > Cross-origin resource sharing (CORS)' using the following configuration:

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

2. Enable public access to the `openreplay-assets` bucket **only**. This latter contains only stylesheets, icons and fonts that are required for proper session replay. If you're on AWS, first navigate to 'Permissions > Block public access (bucket settings)' and turn it off, then go to 'Permissions > Bucket policy' and use the following configuration:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::openreplay-assets/*"
        }
    ]
}
```

3. Finally, make sure to generate the appropriate access keys to **these 3 buckets only** so OpenReplay backend can programmatically access them to upload files. The required S3 permissions are:

```json
"s3:PutObject",
"s3:GetObjectAcl",
"s3:GetObject",
"s3:GetObjectTagging",
"s3:ListBucket",
"s3:PutObjectTagging",
"s3:GetBucketLocation"
```

### Update backend services

1. Login to your OpenReplay instance and go to `openreplay/scripts/helmcharts/vars.yaml` then update the below env variables in `s3` section:

| Variable | Description |
|----------|-------------|
| accessKey | Your object storage key |
| secretKey | Your object storage secret |
| endpoint | The URL (starting with `https`) of your object storage service (i.e. check the list of [S3 endpoints](https://docs.aws.amazon.com/general/latest/gr/s3.html) if you're on AWS, on Google Cloud Storage this would be `https://storage.googleapis.com`) |
| region | The region (if applicable) of your buckets (i.e. if you're using AWS S3, this would be something like `us-east-1`) |
| assetsBucket | The assets' bucket name (i.e. `openreplay-assets`)  |
| recordingsBucket | The recordings' bucket name (i.e. `openreplay-recordings`) |
| sourcemapsBucket | The sourcemaps' bucket name (i.e. `openreplay-sourcemaps`) |

2. Reinstall the above backend services for the changes to take effect:

```bash
cd openreplay/scripts/helmcharts && ./openreplay-cli -I
```

Newly recorded sessions should now be stored and retrieved (when replayed) from your new destination/object storage service.

## Troubleshooting

If you encounter any issues, please connect to our [Slack](https://slack.openreplay.com) and get help from our community.