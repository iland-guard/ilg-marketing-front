/** Lightweight email check aligned with common HTML5 / marketing form needs. */
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

export function isValidEmail(value: string): boolean {
  const email = value.trim()
  if (!email || email.length > 254) return false
  return EMAIL_RE.test(email)
}

/** Digits-only E.164 for WhatsApp / ILG lead API (e.g. 972501234567). */
export function phoneToWhatsAppDigits(e164: string): string {
  return e164.replace(/\D/g, '')
}
