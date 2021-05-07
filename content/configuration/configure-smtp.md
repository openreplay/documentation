---
title: "Configure SMTP"
metaTitle: "Configure SMTP"
metaDescription: "Setup SMTP for receiving alerts, weekly reports, inviting new users to OpenReplay and resetting passwords."
---

Certain functionalities such as `alerts`, `weekly reports`, `password reset` and `inviting new users` **require** email messaging. So, unless you setup SMTP, these features won't work. We highly recommend using an Email Service Provider (ESP), like Mailgun or SendGrid, for maximum reliability and deliverability. Below we provide a step-by-step guide on how to configure Mailgun, but any other provider will do the job.

## SMTP configuration

To enable SMTP, edit `chalice.yaml` in `openreplay/scripts/helm/app/` and update the below variables in `env` section.

| Variable | Default | Description |
|----------|-------------|-------------|
| EMAIL_HOST |  | SMTP hostname (i.e. smtp.mailgun.org) |
| EMAIL_PORT | 587 | SMTP port |
| EMAIL_USER |  | SMTP username|
| EMAIL_PASSWORD |  | SMTP password |
| EMAIL_USE_TLS | true | For using TLS when connecting to the SMTP host |
| EMAIL_USE_SSL | false | For using SSL when connecting to the SMTP host |
| EMAIL_SSL_KEY |  | Path to your SSL key (if applicable) |
| EMAIL_SSL_CERT |  | Path to your SSL certificate (if applicable) |
| EMAIL_FROM | do-not-reply@openreplay.com | The sender email |
| SITE_URL | https://app.openreplay.com | The URL of your OpenReplay instance |

Then, restart the web server:

```bash
cd openreplay/scripts/helm && ./openreplay-cli --restart chalice
```

You can test the setup by inviting yourself (using another email) as a new team member (in 'Preferences' > 'Users').

## Mailgun

1. Go to 'Sending' > 'Domains' then click 'Add New Domain'
2. Enter your subdomain (i.e. m.mycompany.com) in 'Domain name' and ensure 'Create DKIM Authority' is checked, with preferably a 2048 key length
3. Go to your DNS provider (specific instructions are provided by Mailgun) and add **all displayed records**
4. Once all records added, click 'Verify DNS Settings'
5. Now go to 'Sending' > 'Domains settings' > 'SMTP credentials' and click 'Add new SMTP user'. Enter 'Login' (i.e. openreplay) then click 'Create SMTP credentials'. A popup should appear, hit 'Copy' to copy the generated password.
6. Use the displayed SMTP settings and credentials to configure SMTP in OpenReplay. Edit `chalice.yaml` in `openreplay/scripts/helm/app/` and update the below variables in `env` section:

```yaml
EMAIL_HOST: smtp.eu.mailgun.org # from SMTP settings section
EMAIL_PORT: 587
EMAIL_USER: openreplay@m.mycompany.com # from SMTP credentials section
EMAIL_PASSWORD: password # the one copied when you created SMTP credentials
EMAIL_USE_TLS: true
EMAIL_USE_SSL: false
EMAIL_SSL_KEY:
EMAIL_SSL_CERT:
EMAIL_FROM: openreplay@mycompany.com # sender email, use your domain
SITE_URL: https://openreplay.mycompany.com
```

7. Restart the web server:

```shellsession
cd openreplay/scripts/helm && ./openreplay-cli --restart chalice
```

8. You can test the setup by inviting yourself (using another email) as a new team member (in 'Preferences' > 'Users').
