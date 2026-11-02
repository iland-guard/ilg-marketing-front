import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'

const html = readFileSync(new URL('../public/app/notifications', import.meta.url), 'utf8')
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1]
function render(search, hash = '') {
  const elements = { 'open-app': { hidden: true }, hint: {} }
  vm.runInNewContext(script, {
    URLSearchParams, encodeURIComponent,
    window: { location: { search, hash } },
    document: { getElementById: id => elements[id] },
  })
  return elements
}
test('the browser fallback opens the same notification with a user-initiated link', () => {
  const elements = render('?notificationId=alert-123')
  assert.equal(elements['open-app'].href, 'sentraai://notifications?notificationId=alert-123')
  assert.equal(elements['open-app'].hidden, false)
})
test('invalid or ambiguous identifiers do not create an app link', () => {
  for (const query of ['', '?notificationId=', '?notificationId=../x', '?notificationId=%3Cscript%3E', '?notificationId=a&notificationId=b', '?id=a', '?notificationId=a&token=b']) {
    assert.equal(render(query)['open-app'].hidden, true, query)
  }
  assert.equal(render('?notificationId=a', '#fragment')['open-app'].hidden, true)
})
test('Apple association includes both verification and notification routes', () => {
  const apple = JSON.parse(readFileSync(new URL('../public/.well-known/apple-app-site-association', import.meta.url), 'utf8'))
  assert.deepEqual(apple.applinks.details[0].paths, ['/app/whatsapp/verified', '/app/notifications'])
})
