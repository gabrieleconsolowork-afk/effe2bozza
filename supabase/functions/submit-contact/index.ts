import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function buildEmailHtml(nome: string, email: string, messaggio: string) {
  const safeNome = escapeHtml(nome)
  const safeEmail = escapeHtml(email)
  const safeMessaggio = escapeHtml(messaggio).replaceAll('\n', '<br />')

  return `<!doctype html>
<html lang="it">
  <body style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#1d1d1b;max-width:640px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 16px">Nuova richiesta dal sito EFFE2</h1>
    <p style="margin:0 0 8px"><strong>Nome:</strong> ${safeNome}</p>
    <p style="margin:0 0 8px"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
    <p style="margin:0 0 8px"><strong>Messaggio:</strong></p>
    <p style="margin:0;padding:16px;background:#f5f5f4;border-radius:12px">${safeMessaggio}</p>
    <p style="margin:24px 0 0;font-size:13px;color:#666">Rispondi direttamente a ${safeEmail} per contattare il cliente.</p>
  </body>
</html>`
}

function validatePayload(body: Record<string, unknown>) {
  const nome = String(body.nome ?? '').trim()
  const email = String(body.email ?? '').trim()
  const messaggio = String(body.messaggio ?? '').trim()

  if (nome.length < 2) throw new Error('Inserisci un nome valido.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Inserisci un indirizzo email valido.')
  if (messaggio.length < 10) throw new Error('Il messaggio deve contenere almeno 10 caratteri.')

  return { nome, email, messaggio }
}

async function sendNotificationEmail(
  resendKey: string,
  fromEmail: string,
  notifyEmail: string,
  payload: { nome: string; email: string; messaggio: string },
) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notifyEmail],
      reply_to: payload.email,
      subject: `[EFFE2] Nuova richiesta da ${payload.nome}`,
      html: buildEmailHtml(payload.nome, payload.email, payload.messaggio),
    }),
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Invio email fallito: ${details}`)
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Metodo non consentito.' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json()
    const payload = validatePayload(body)

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const resendKey = Deno.env.get('RESEND_API_KEY')
    const notifyEmail = Deno.env.get('CONTACT_NOTIFY_EMAIL') ?? 'effe2social@gmail.com'
    const fromEmail = Deno.env.get('CONTACT_FROM_EMAIL') ?? 'EFFE2 Contatti <onboarding@resend.dev>'

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('Configurazione server incompleta.')
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)
    const { error: insertError } = await supabase.from('contact_requests').insert(payload)

    if (insertError) {
      throw new Error(insertError.message)
    }

    if (!resendKey) {
      console.warn('RESEND_API_KEY mancante: richiesta salvata senza email.')
    } else {
      await sendNotificationEmail(resendKey, fromEmail, notifyEmail, payload)
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Errore imprevisto.'
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
