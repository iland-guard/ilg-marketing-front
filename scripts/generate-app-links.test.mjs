import assert from 'node:assert/strict'
import test from 'node:test'
import { androidAssociation } from './generate-app-links.mjs'

test('does not invent a release signing certificate when none is configured', () => {
  assert.deepEqual(androidAssociation(), [])
})
test('normalizes and deduplicates configured release certificates', () => {
  const fingerprint = Array(32).fill('ab').join(':')
  const result = androidAssociation(` ${fingerprint},${fingerprint.toUpperCase()} `)
  assert.equal(result[0].target.package_name, 'com.bizz.sentraai')
  assert.deepEqual(result[0].target.sha256_cert_fingerprints, [fingerprint.toUpperCase()])
})
test('fails the build for a malformed configured certificate', () => {
  assert.throws(() => androidAssociation('not-a-fingerprint'), /invalid SHA-256/)
})
