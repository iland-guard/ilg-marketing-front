/** Production ILG backend — marketing leads land here (not localhost). */
export const ILG_API_BASE_URL =
  (import.meta.env.VITE_ILG_API_BASE_URL as string | undefined)?.replace(
    /\/$/,
    '',
  ) || 'https://backend.x-sentral.com'

export type MarketingLeadPayload = {
  name: string
  email: string
  phone: string
  message?: string
}

export async function submitMarketingLead(
  payload: MarketingLeadPayload,
): Promise<{ ok: true; inquiryId?: string }> {
  const phone = payload.phone.trim()
  const guestName = payload.name.trim()
  const guestEmail = payload.email.trim()
  const note = payload.message?.trim()

  const res = await fetch(`${ILG_API_BASE_URL}/wa-support-desk/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone,
      guestName,
      guestEmail,
      source: 'marketing',
      subject: 'ליד מאתר השיווק',
      message: note || undefined,
      notifyStaff: true,
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Lead submit failed (${res.status})`)
  }

  const data = (await res.json()) as {
    ok?: boolean
    lead?: { inquiryId?: string }
  }
  return { ok: true, inquiryId: data.lead?.inquiryId }
}
