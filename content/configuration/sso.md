---
title: "SSO"
metaTitle: "SSO"
metaDescription: "How to setup Single-Sign-On (SSO) via SAML."
---

Single-Sign-On (via SAML) is available on OpenReplay Enterprise Edition only.  

## SSO (SAML) configuration

To enable SSO, edit `chalice.yaml` in `openreplay/scripts/helm/app/` and update the below variables in `env` section.

| Variable | Description |
|----------|-------------|
| idp_entityId | The `entityId` of your identity provider, also referred to as `Issuer URL` (required) |
| idp_sso_url | The `singleSignOnService` of your identity provider, also referred to as `SAML 2.0 Endpoint (HTTP)` (required)|
| idp_x509cert | The `x509cert` (required) |
| idp_sls_url | The `singleLogoutService` of your identity provider, also referred to as `SLO Endpoint (HTTP)` (optional) |

Then, reinstall the web server for the changes to take effect:

```bash
cd openreplay/scripts/helm && ./openreplay-cli -i chalice
```

## Identity Provider (IDP) configuration

Make sure your Identity Provider's response includes the OpenReplay `tenantKey`. Its value can be found in the Dashboard, under 'Preferences' > 'Account'.
