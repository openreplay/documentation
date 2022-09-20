---
title: "GitHub"
metaTitle: "GitHub Integration"
metaDescription: "How to integrate GitHub with OpenReplay."
---

Integrate GitHub with OpenReplay and create issues directly from the recording page.

## With OpenReplay OpenSource

### 1. Create a personal access token

1. Login to Github then go to [Settings > Developers Settings > Personal access tokens](https://github.com/settings/tokens)
2. Click 'Generate a new token'
3. Select `repo:status`, `repo_deployment`,`public_repo`, `read:user`, and `user:email` scopes
4. Hit 'Generate token' then copy the token

### 2. Enable GitHub in OpenReplay

1. Go to OpenReplay dashboard then 'Preferences > Integration'
2. Select GitHub. If you don't see it, then you must have enabled Jira (you cannot use both at the same time so make sure to disable Jira integration first).
3. Paste the previously generated `token`

A 'Create Issue' button would then appear in all recordings so you can quickly create and assign issues in GitHub.

## With OpenReplay Cloud

Go to 'Preferences > Integration' and click on GitHub. You will be redirected to GitHub for authentication. That's all you have to do. A 'Create Issue' button would then appear in all recordings so you can quickly create and assign issues in GitHub.

## Troubleshooting

If you encounter any issues, connect to our [Slack](https://slack.openreplay.com) and get help from our community.
