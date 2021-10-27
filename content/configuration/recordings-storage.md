---
title: "Recordings Storage"
metaTitle: "Recordings Storage"
metaDescription: "How to change the default storage destination of your recordings."
---

Each session recording takes the form of a file. In fact, OpenReplay dumps what's necessary to replay a session (DOM mutations, mouse coordinates, console logs, network activity and much more) into a single file. These objects are by default stored on your instance, but the destination can be changed to any S3 object storage service which allows for greater scalability and lower your deployment costs.

## Change recordings' storage destination

Recordings can be persisted in any object storage destination as long as it's S3 compatible, which makes OpenReplay compatible with the major public cloud services. Below are the steps to configure a different destination for your recordings:

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

2. Enable public access to the `openreplay-assets` bucket **only**. This latter contains only stylesheets, icons and fonts that are required for proper session replay. If you're on AWS, that would be under 'Permissions > Bucket policy' using the following configuration:

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

3. Finally, make sure to generate the appropriate access keys so OpenReplay backend can programmatically access these buckets. 

### Update backend services

1. Login to your OpenReplay instance and go to `openreplay/scripts/helm/` then update the below variables in the `env` section of `vars.yaml` file:

| Variable | Description |
|----------|-------------|
| minio_access_key | Your object storage key |
| minio_secret_key | Your object storage secret |

Then go to `openreplay/scripts/helm/app` then update the variables in the `env` section of each of the below files:

2. `http.yaml`:

| Variable | Description |
|----------|-------------|
| ASSETS_ORIGIN | The absolute path to your assets' bucket (i.e. `https://openreplay-assets.s3.eu-central-1.amazonaws.com`) |
| AWS_REGION | The region (if applicable) of your buckets (i.e. if you're using AWS S3, this would be something like `us-east-1`) |

3. `storage.yaml`:

| Variable | Description |
|----------|-------------|
| AWS_ENDPOINT | The URL (starting with `https`) of your object storage service (i.e. check the list of [S3 endpoints](https://docs.aws.amazon.com/general/latest/gr/s3.html) if you're on AWS, on Google Cloud Storage this would be `https://storage.googleapis.com`) |
| AWS_REGION_WEB | The region (if applicable) of your buckets (i.e. if you're using AWS S3, this would be something like `us-east-1`) |
| S3_BUCKET_WEB | The recordings' bucket name (i.e. `openreplay-recordings`) |

4. `assets.yaml`:

| Variable | Description |
|----------|-------------|
| AWS_ENDPOINT | The URL (starting with `https`) of your object storage service (i.e. check the list of [S3 endpoints](https://docs.aws.amazon.com/general/latest/gr/s3.html) if you're on AWS, on Google Cloud Storage this would be `https://storage.googleapis.com`) |
| AWS_REGION | The region (if applicable) of your buckets (i.e. if you're using AWS S3, this would be something like `us-east-1`) |
| S3_BUCKET_ASSETS | The assets' bucket name (i.e. `openreplay-assets`) |
| ASSETS_ORIGIN | The absolute path to your assets' bucket (i.e. `https://openreplay-assets.s3.eu-central-1.amazonaws.com` |

5. `chalice.yaml`:

| Variable | Description |
|----------|-------------|
| AWS_DEFAULT_REGION | The region (if applicable) of your buckets (i.e. if you're using AWS S3, this would be something like `us-east-1`) |
| sessions_bucket | The recordings' bucket name (i.e. `openreplay-recordings`) |
| sessions_region | The region (if applicable) of your buckets (i.e. if you're using AWS S3, this would be something like `us-east-1`) |
| sourcemaps_bucket | The sourcemaps' bucket name (i.e. `openreplay-sourcemaps`) |
| js_cache_bucket | The assets' bucket name (i.e. `openreplay-assets`)  |
| S3_HOST | The URL (starting with `https`) of your object storage service (i.e. check the list of [S3 endpoints](https://docs.aws.amazon.com/general/latest/gr/s3.html) if you're on AWS, on Google Cloud Storage this would be `https://storage.googleapis.com`) |

6. Now go to `scripts/helm/roles/openreplay/templates/chalice.yaml` and comment the below line:

```yaml
...
#S3_HOST: "https://{{ domain_name }}"
...
 ```

7. Reinstall the above backend services for the changes to take effect:

```bash
cd openreplay/scripts/helm
./openreplay-cli -i http
./openreplay-cli -i storage
./openreplay-cli -i assets
./openreplay-cli -i chalice
```

Newly recorded sessions should now be stored and retrieved (when replayed) from your new destination/object storage service.

## Troubleshooting

Can this procedure be simplified in the future? Yes and we're already working on that. In the meantime, if you encounter any issues, please connect to our [Slack](https://slack.openreplay.com) and get help from our community.