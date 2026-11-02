# WhatsApp verification return links

Public return URL: `https://www.sentraai.ai/app/whatsapp/verified`.
This static marketing site hosts the landing page and platform association files;
the backend does not host or process the return link. Notification links are also
prepared at `/app/notifications?notificationId=<id>`; sending them is not enabled. The URL contains no phone, account or authentication token. It does not
verify a phone; the authenticated app reads verification state from the backend.

## Files and deployment

- `public/.well-known/apple-app-site-association` associates the WhatsApp return and notification
  paths with the existing Apple app/team identity.
- `public/.well-known/assetlinks.json` is empty until a release signing certificate
  is provided. During build, `scripts/generate-app-links.mjs` writes the configured
  Android association into `dist/.well-known/assetlinks.json`.
- `public/app/whatsapp/verified` is a standalone browser fallback. Its Open App
  button uses `sentraai://whatsapp/verified`, without automatically redirecting.
- The S3 deployment workflow sets explicit content types on extensionless files
  and invalidates the CloudFront cache after upload.

Configure the GitHub Actions secret `MOBILE_APP_ANDROID_SHA256_CERT_FINGERPRINTS`
using the SHA-256 Play App Signing certificate fingerprint(s), comma-separated.
For local builds, export the same environment variable; Vite does not load this
unprefixed build-script variable from .env automatically. Missing configuration
keeps the website build working but leaves Android verified links disabled.
Malformed configured fingerprints fail the build.

Enable Associated Domains for the existing Apple application identifier and
refresh the provisioning profile for the release. Confirm that the release's
application identifier matches the Apple association document.

Deploy the website first, distribute updated native apps, then deploy the updated
alert-center success reply. All three public URLs must return 200 over HTTPS on
`www.sentraai.ai`, without redirects, auth, locale rewrites or SPA fallback HTML
for association JSON. Confirm CloudFront does not rewrite these paths to `/he`
or `/index.html`. Only the `www` hostname is registered in the native apps.

After deployment, test WhatsApp links on both platforms with the app backgrounded,
terminated, signed out and already verifying a changed number. Active verification
keeps its existing screen and server checks; after process death the app opens
Settings after sign-in. Test the browser fallback and unrelated links as well.
No deployment, app-store release or device validation is performed by these local
file changes.

## Notification link groundwork (not sent yet)

Format: `https://www.sentraai.ai/app/notifications?notificationId=<notification-id>`.
The browser fallback offers `sentraai://notifications?notificationId=<notification-id>`.
Only one query parameter is accepted; the identifier contains letters, digits,
underscores or hyphens. No alert contents, phone or auth token are embedded.
The app retains the destination through startup/sign-in and opens its existing
Notification Detail screen under Alerts. That screen uses the authenticated API
and handles unavailable or inaccessible notifications through its existing UI.

The `alert-center/util/app_links.py` rollout switch
`ENABLE_WHATSAPP_NOTIFICATION_APP_LINKS` defaults to `False`. Event cards,
critical escalation notices and manual video captions are wired to append the
link only when this switch is enabled and the client's existing push-device
resolver finds at least one enabled device with a token. Device push preferences
do not control this app-presence check. Disabled mode performs no device lookup;
lookup failures keep the existing WhatsApp message without a link.

After validating the verification return link and deploying the website and
apps supporting notification links, change the switch to `True` and deploy
alert-center to begin appending links for eligible customers.
