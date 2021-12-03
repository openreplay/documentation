---
title: "SSO"
metaTitle: "SSO"
metaDescription: "How to setup Single-Sign-On (SSO) via SAML2."
---

Single-Sign-On (via SAML2) is available on OpenReplay Enterprise Edition only.

## Identity Provider (IDP) configuration

In you Identity Provider's dashboard, create a new app called `openreplay` (you can give it this [icon](../static/favicon.png){:target="_blank"} if needed), In the configuration page, make sure to set the following value (please make sure to replace `YOUR_DOMAIN` with the correct value, example `https://openreplay.mycompany.com`):

| Variable | Value |
|----------|-------------|
| Audience (also called EntityID) | `YOUR_DOMAIN/api/sso/saml2/metadata/`|
| Single Sign On URL (also called ACS URL or Consumer URL) | `YOUR_DOMAIN/api/sso/saml2/acs` |
| Single Logout URL (also called SLO URL, optional) | `YOUR_DOMAIN/api/sso/saml2/sls` |
| Name ID (sometimes it is configurable in the **Attribute Statements** section or the **Parameters** section) | `Email` or `EmailAddress` or `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`, depending on your Identity Provider |
| SAML initiator (optional) | Set it to `Service Provider` |

In the **Attribute Statements** section or the **Parameters** section, please make sure to define the following fields:

| Field | Value |
|----------|-------------|
| tenantKey | Its value can be found in the Dashboard, under 'Preferences' > 'Account' |
| firstName | `user.firstName` |
| lastName |  `user.lastName` |
| internalId (optional) | internal ID or user.email (the user's ID in your identity management system) |

You should now have all the required values for the next step/section.

## SSO (SAML2) configuration

To enable SSO, edit `chalice.yaml` in `openreplay/scripts/helm/app/` and update the below variables in `env` section:

| Variable | Description |
|----------|-------------|
| idp_entityId | The `entityId` of your identity provider, also referred to as `Issuer URL` (required) |
| idp_sso_url | The `singleSignOnService` of your identity provider, also referred to as `SAML 2.0 Endpoint (HTTP)` (required)|
| idp_x509cert | The `x509cert`, must be a one-line string, without line breaks. You can use the [FORMAT A X509 CERTIFICATE tool](https://www.samltool.com/format_x509cert.php) to format your value (required) |
| idp_name | The identity provider's name (optional) |
| idp_sls_url | The `singleLogoutService` of your identity provider, also referred to as `SLO Endpoint (HTTP)` (optional) |

Then, reinstall chalice for the changes to take effect:

```bash
cd openreplay/scripts/helm
./openreplay-cli -i chalice
```

## Example using [Okta](https://okta.com)

1. Login to you Okta administration dashboard and go to 'Applications' > 'Applications'
2. Press Create new app integration, then select SAML 2.0 and press 'Next'
3. Set the App Name to openreplay (you can upload this [icon](../static/favicon.png) for your application) then press 'Next'
4. Set:
    - **Single sign on URL** to `YOUR_DOMAIN/api/sso/saml2/acs`
    - **Audience URI (SP Entity ID)** to `YOUR_DOMAIN/api/sso/saml2/metadata/`
    - **Name ID format** to `EmailAddress`
5. Define the below fields in **Attribute Statements**:
    - **tenantKey** format **Basic** and set the value to the one you got from OpenReplay dashboard under 'Preferences' > 'Account'
    - **firstName** format **Basic** and set the value to **user.firstName**
    - **lastName** format **Basic** and set the value to **user.lastName**
    - **internalId** format **Basic** and set the value to **user.email**
6. Press Next, Select **I'm a software vendor. I'd like to integrate my app with Okta** and then press Finish
7. In the Sign On tab, scroll down and press **View Setup Instructions** to see you SAML2 configuration
8. In your server, go to `openreplay/scripts/helm/app` and edit `chalice.yaml`
9. Under the `env` section, set the following attributes:
   - **idp_entityId**: Identity Provider Issuer
   - **idp_sso_url**: Identity Provider Single Sign-On URL
   - **idp_x509cert**: X.509 Certificate, must be a one-line string, without line breaks. You can use the [FORMAT A X509 CERTIFICATE tool](https://www.samltool.com/format_x509cert.php) to format your value.
   - **idp_name**: okta
10. Save your changes and reinstall chalice: 
    ```bash
    cd openreplay/scripts/helm
    ./openreplay-cli -i chalice
    ```