# WhatsApp verification return links

Public return URL: `https://www.sentraai.ai/app/whatsapp/verified`.
This static marketing site hosts the landing page and platform association files;
the backend does not host or process the return link. No notification routes are
enabled. The URL contains no phone, account or authentication token. It does not
verify a phone; the authenticated app reads verification state from the backend.

## Files and deployment

- `public/.well-known/apple-app-site-association` associates only the WhatsApp
  return path with the existing Apple app/team identity.
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
