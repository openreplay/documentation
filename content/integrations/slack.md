---
title: "Slack"
metaTitle: "Slack Integration"
metaDescription: "How to integrate Slack with OpenReplay."
---

Integrate Slack with OpenReplay and share insights with the rest of the team, directly from the recording page.

## With OpenReplay OpenSource

### 1. Create a personal access token

1. Login to your Slack workspace then go to [app creation page](https://api.slack.com/apps?new_app=1)
2. Name it "OpenReplay" and connect it to your workspace
3. Go to 'Incoming Webhooks' page for your newly created app then 'Activate Incoming Webhooks'
4. Click on 'Add New Webhook to Workspace' and select the channel to which you'll be sharing insights
5. Hit 'Allow' then copy the Webhook URL

### 2. Enable Slack in OpenReplay

1. Go to OpenReplay dashboard then 'Preferences > Integration'
2. Select Slack and paste the previously copied Webhook URL before clicking 'Add'
3. If all went fine, you should receive a welcome message on Slack

You can now also use the share button in any recording and communicate your insights to the rest of the team.

## With OpenReplay Cloud

Go to 'Preferences > Integration' and click on Slack. You will be redirected to Slack for authentication and configuration. That's all you have to do. You can then use the share button in any recording and communicate your insights to the rest of the team.

## Troubleshooting

If you encounter any issues, connect to our [Discord](https://discord.openreplay.com) and get help from our community.
