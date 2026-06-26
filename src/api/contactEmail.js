import { adminEmail } from '../data/adminConfig'

async function sendViaEmailJs(payload) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) return false

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: adminEmail,
        from_name: payload.nome,
        from_email: payload.email,
        reply_to: payload.email,
        message: payload.messaggio,
      },
    }),
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(details || 'Invio email fallito.')
  }

  return true
}

export async function notifyContactEmail(payload) {
  try {
    return await sendViaEmailJs(payload)
  } catch (error) {
    console.error('notifyContactEmail:', error)
    return false
  }
}
