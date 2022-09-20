---
title: "SSO"
metaTitle: "SSO"
metaDescription: "How to setup Single-Sign-On (SSO) via SAML2."
---

Single-Sign-On (via SAML2) is available on OpenReplay Enterprise Edition only.

## Identity Provider (IDP) configuration

In you Identity Provider's dashboard, create a new app called `openreplay` (you can use this [icon](../static/favicon.png)), In the configuration page, make sure to set the following value (please make sure to replace `YOUR_DOMAIN` with the correct value, example `https://openreplay.mycompany.com`):

| Variable | Value |
|----------|-------------|
| ACS URL (also called Single Sign On URL or Consumer URL) | `YOUR_DOMAIN/api/sso/saml2/acs/` |
| Entity ID (also called Audience) | `YOUR_DOMAIN/api/sso/saml2/metadata/`|
| Single Logout URL (also called SLO URL) | `YOUR_DOMAIN/api/sso/saml2/sls/` (optional) |
| Name ID (sometimes it is configurable in the 'Attribute Statements' or the 'Parameters' section) | `Email` or `EmailAddress` or `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`, depending on your Identity Provider |
| SAML initiator | Set it to `Service Provider` (optional) |

In the 'Attribute Statements', or the 'Parameters' section, please make sure to define the following fields:

| Field | Value |
|----------|-------------|
| tenantKey | Its value can be found in the Dashboard, under 'Preferences' > 'Account' |
| firstName | `user.firstName` |
| lastName |  `user.lastName` |
| internalId | Internal ID or `user.email` (the user's ID in your identity management system) (optional) |
| role | The user's role, depending on you Identity Provider it can be `user.role` or `group`, etc. (optional, default = `member`) |
| adminPrivileges | If the user have admin privileges or not, if this field contains any value different from `false`, it will be considered as `true`. (optional, default = `false`) |

You should now have all the required values for the next step/section.

## SSO (SAML2) configuration

To enable SSO, edit `openreplay/scripts/helmcharts/vars.yaml` and uncomment then update the below env variables in `chalice` section:

| Variable | Description |
|----------|-------------|
| idp_entityId | The `entityId` of your identity provider, also referred to as `Issuer URL` |
| idp_sso_url | The `singleSignOnService` of your identity provider, also referred to as `SAML 2.0 Endpoint (HTTP)` |
| idp_x509cert | The `x509cert`, must be a one-line string, without line breaks. You can use the [FORMAT A X509 CERTIFICATE tool](https://www.samltool.com/format_x509cert.php) to format your value |
| idp_name | The identity provider's name (optional) |
| idp_sls_url | The `singleLogoutService` of your identity provider, also referred to as `SLO Endpoint (HTTP)` (optional) |

Then, reinstall the web server for the changes to take effect:

```bash
cd openreplay/scripts/helmcharts && ./openreplay-cli -I
```

## Example using Okta

1. Login to your Okta administration dashboard and go to 'Applications' > 'Applications'
2. Press 'Create new app integration', then select SAML 2.0 and press 'Next'
3. Set the 'App Name' to OpenReplay (you can upload this [icon](../static/favicon.png) for your application) then press 'Next'
4. Set:
    - **Single sign on URL** to `YOUR_DOMAIN/api/sso/saml2/acs/`
    - **Audience URI (SP Entity ID)** to `YOUR_DOMAIN/api/sso/saml2/metadata/`
    - **Name ID format** to `EmailAddress`
5. Define the below fields in 'Attribute Statements':
    - **tenantKey**: format `Basic` and set the value to the one you got from OpenReplay dashboard under 'Preferences' > 'Account'
    - **firstName**: format `Basic` and set the value to `user.firstName`
    - **lastName**: format `Basic` and set the value to `user.lastName`
    - **internalId**: format `Basic` and set the value to `user.email`
6. Define the below field in 'Group Attribute Statements':
    - **role**: format `Basic` filter `Match Regex` value `.*` (or you can specify a different filter and regex according to your needs)
    - **adminPrivileges**: format `Basic` filter `Match Regex` value `admin` (the current user will have `admin privileges` if he is part of the **admin** group)
7. Press Next, Select 'I'm a software vendor. I'd like to integrate my app with Okta' then press 'Finish'
8. In the Sign On tab, scroll down and press 'View Setup Instructions' to see you SAML2 configuration
9. In your server, edit your `openreplay/scripts/helmcharts/vars.yaml`
10. Under the `chalice` section, uncomment then set the following env variables:
   - **idp_entityId**: Identity Provider Issuer
   - **idp_sso_url**: Identity Provider Single Sign-On URL
   - **idp_x509cert**: X.509 Certificate, must be a one-line string, without line breaks (ou can use the [FORMAT A X509 CERTIFICATE tool](https://www.samltool.com/format_x509cert.php) to format your value)
   - **idp_name**: okta
12. Finally, save your changes and reinstall the web server: 

```bash
cd openreplay/scripts/helmcharts && ./openreplay-cli -I
```

## Example using Google Workspace (formerly G Suite)

### Add Custom Attributes:

1. In the Google Admin console, go to 'Directory' > 'Users' > 'More options' > 'Manage custom attributes'.
2. Click 'Add Custom Attribute'.
3. Set the following fields:
    - **Category**: 'OpenReplay'
    - **Custom fields**:
      - **Name**: 'role'
      - **Info type**: 'Text'
      - **Visibility**: 'Visible to user and admin'
      - **No. of values**: 'Single-value'
    - **Custom fields**:
      - **Name**: 'adminPrivileges'
      - **Info type**: 'Yes or No'
      - **Visibility**: 'Visible to user and admin'
      - **No. of values**: 'Single-value'
4. Click 'Add'
5. To add values to the new custom attributes, go to 'Users'
6. Select the desired user(s)
7. Click on 'User information' then edit the 'OpenReplay' section
8. Change the value of **role** to the desired role in 'OpenReplay' (the role should match the one created in OpenReplay dashboard under 'Preferences' > 'Roles')
9. Change the value of **adminPrivileges** to 'Yes' if the user is allowed to have Admin Privileges in OpenReplay
10. Click 'Save'

### Configuration:

1. Login to your Google Admin Console and go to 'Apps'
2. Press 'Web and mobile apps' then click 'Add app' > 'Add custom SAML app'
3. Set the 'App name' to OpenReplay (you can upload this [icon](../static/favicon.png) for 'App icon'') then press 'Continue'
4. Copy 'SSO URL', 'Entity ID' and 'Certificate' then click 'Continue' (we will use these values in step 11)
5. Set:
    - **ACS URL** to `YOUR_DOMAIN/api/sso/saml2/acs/TENANT_KEY/` (`TENANT_KEY` is found in OpenReplay dashboard under 'Preferences' > 'Account')
    - **Entity ID** to `YOUR_DOMAIN/api/sso/saml2/metadata/`
    - **Name ID format** to `Email`
    - **Name ID** to `Basic information > Primary Email` 
6. Click 'Continue' then hit 'Add Mapping' to add the below attributes:
    - `Basic information > First Name` -> **firstName**
    - `Basic information > Last Name` -> **lastName**
    - `Basic information > Primary Email` -> **internalId**
    - `OpenReplay > role` -> **role**
    - `OpenReplay > adminPrivileges` -> **adminPrivileges**
7. Click 'Finish'
8.  In the Google Admin Console, go to 'Apps' > 'Web and mobile apps' and select 'OpenReplay'
9.  Click 'User access', select 'ON for everyone' then hit 'Save'
10. In your server, go to `openreplay/scripts/helmcharts` and edit `vars.yaml`
11. Under the `chalice > env` section, uncomment and set the following attributes using the values from step 4:
   - **idp_sso_url**: paste the value of 'SSO URL'
   - **idp_entityId**: paste the value of 'Entity ID'
   - **idp_x509cert**: use the [FORMAT A X509 CERTIFICATE tool](https://www.samltool.com/format_x509cert.php) to format the copied/downloaded certificate
   - **idp_name**: set the value to `G-Suite`
   - **idp_tenantKey**: the `TENANT_KEY` value you got from the OpenReplay dashboard
15. Finally, save your changes and reinstall the web server: 

```bash
cd openreplay/scripts/helmcharts && ./openreplay-cli -I
```