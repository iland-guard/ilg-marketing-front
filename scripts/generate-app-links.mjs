import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** A release app must be associated with its installed signing certificate, not its upload key. */
export function androidAssociation(raw = '') {
  const fingerprints = [...new Set(raw.split(',').map(value => value.trim().toUpperCase()).filter(Boolean))]
  if (fingerprints.some(value => !/^(?:[0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(value))) {
    throw new Error('MOBILE_APP_ANDROID_SHA256_CERT_FINGERPRINTS contains an invalid SHA-256 fingerprint')
  }
  return fingerprints.length ? [{
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'com.bizz.sentraai',
      sha256_cert_fingerprints: fingerprints,
    },
  }] : []
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const associations = androidAssociation(process.env.MOBILE_APP_ANDROID_SHA256_CERT_FINGERPRINTS)
  if (!associations.length) {
    console.warn('Android App Links remain disabled: configure MOBILE_APP_ANDROID_SHA256_CERT_FINGERPRINTS for release builds.')
  }
  await writeFile(new URL('../dist/.well-known/assetlinks.json', import.meta.url), JSON.stringify(associations, null, 2) + '\n')
}
