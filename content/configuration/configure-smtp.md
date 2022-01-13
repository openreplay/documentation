---
title: "Configure SMTP"
metaTitle: "Configure SMTP"
metaDescription: "Setup SMTP for receiving alerts, weekly reports, inviting new users to OpenReplay and resetting passwords."
---

Certain functionalities such as `alerts`, `weekly reports`, `password reset` and `inviting new users` **require** email messaging. So, unless you setup SMTP, these features won't work. We highly recommend using an Email Service Provider (ESP), like Mailgun or SendGrid, for maximum reliability and deliverability. Below we provide a step-by-step guide on how to configure Mailgun, but any other provider will do the job.

## SMTP configuration

To enable SMTP, edit `vars.yaml` in `openreplay/scripts/helm/` and update the below variables:

| Variable | Default | Description |
|----------|-------------|-------------|
| email_host |  | SMTP hostname (i.e. smtp.mailgun.org) |
| email_port | 587 | SMTP port |
| email_user |  | SMTP username|
| email_password |  | SMTP password |
| email_use_tls | true | For using TLS when connecting to the SMTP host |
| email_use_ssl | false | For using SSL when connecting to the SMTP host |
| email_ssl_key |  | Path to your SSL key (if applicable) |
| email_ssl_cert |  | Path to your SSL certificate (if applicable) |
| email_from | do-not-reply@openreplay.com | The sender email |

Then, reinstall the web server for the changes to take effect:

```bash
cd openreplay/scripts/helm && ./openreplay-cli -i chalice ; ./openreplay-cli -i alerts
```

You can test the setup by inviting yourself (using another email) as a new team member (in 'Preferences' > 'Users').

## Mailgun

1. Go to 'Sending' > 'Domains' then click 'Add New Domain'
2. Enter your subdomain (i.e. m.mycompany.com) in 'Domain name' and ensure 'Create DKIM Authority' is checked, with preferably a 2048 key length
3. Go to your DNS provider (specific instructions are provided by Mailgun) and add **all displayed records**
4. Once all records added, click 'Verify DNS Settings'
5. Now go to 'Sending' > 'Domains settings' > 'SMTP credentials' and click 'Add new SMTP user'. Enter 'Login' (i.e. openreplay) then click 'Create SMTP credentials'. A popup should appear, hit 'Copy' to copy the generated password.
6. Use the displayed SMTP settings and credentials to configure SMTP in OpenReplay. Edit `vars.yaml` in `openreplay/scripts/helm/` and update the below variables:

```yaml
email_host: smtp.eu.mailgun.org # from SMTP settings section
email_port: 587
email_user: openreplay@mycompany.com # from SMTP credentials section
email_password: password # the one copied when you created SMTP credentials
email_use_tls: true
email_use_ssl: false
email_ssl_key:
email_ssl_cert:
email_from: openreplay@mycompany.com # sender email, use your domain
```

7. Reinstall the web server for the changes to take effect:

```bash
cd openreplay/scripts/helm && ./openreplay-cli -i chalice ; ./openreplay-cli -i alerts
```

8. You can test the setup by inviting yourself (using another email) as a new team member (in 'Preferences' > 'Users').
