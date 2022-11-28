---
title: "MSTeams"
metaTitle: "MSTeams Integration"
metaDescription: "How to integrate MSTeams with OpenReplay."
---

Integrate MSTeams with OpenReplay and share insights with the rest of the team, directly from the recording page.

### 1. Create a personal access token

1. Login to your MSTeams workspace then go to Teams tab > your specific channel
2. Press the ... next to your channel name then select Connectors
3. In the list of connectors, look for 'Incoming Webhook' and select configure 
3. Go to 'Incoming Webhooks' page for your newly created app then 'Activate Incoming Webhooks'
4. Set the name to OpenReplay (you can upload this [icon](../static/favicon.png) )
5. Press 'Create' then copy the Webhook URL

### 2. Enable MSTeams in OpenReplay

1. Go to OpenReplay dashboard then 'Preferences > Integration'
2. Select MSTeams and paste the previously copied Webhook URL before clicking 'Add'
3. If all went fine, you should receive a welcome message on MSteams

You can now also use the share button in any recording and communicate your insights to the rest of the team.

## Troubleshooting

If you encounter any issues, connect to our [Slack](https://slack.openreplay.com) and get help from our community.
