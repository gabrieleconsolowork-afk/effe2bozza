import { supabase } from '../lib/supabase'
import { notifyContactEmail } from './contactEmail'

const CONTACT_FUNCTION = 'submit-contact'

function mapContact(row) {
  return {
    id: row.id,
    nome: row.nome,
    email: row.email,
    messaggio: row.messaggio,
    createdAt: row.created_at,
  }
}

function toError(error, fallback) {
  throw new Error(error?.message || fallback)
}

export async function submitContact(payload) {
  const body = {
    nome: payload.nome.trim(),
    email: payload.email.trim(),
    messaggio: payload.messaggio.trim(),
  }

  const { data, error } = await supabase.functions.invoke(CONTACT_FUNCTION, { body })

  if (data?.ok) return { ok: true }

  const functionError = data?.error || error?.message || ''
  const functionMissing = /function not found|404|failed to fetch/i.test(functionError)

  if (functionError && !functionMissing) {
    toError({ message: functionError }, 'Impossibile inviare la richiesta. Riprova più tardi.')
  }

  const { error: insertError } = await supabase.from('contact_requests').insert(body)
  if (insertError) toError(insertError, 'Impossibile inviare la richiesta. Riprova più tardi.')

  await notifyContactEmail(body)

  return { ok: true }
}

export async function adminLogin(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error('Credenziali non valide.')
  return { ok: true }
}

export async function adminLogout() {
  const { error } = await supabase.auth.signOut()
  if (error) toError(error, 'Impossibile uscire.')
  return { ok: true }
}

export async function getAdminSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) toError(error, 'Impossibile verificare la sessione.')
  if (!session) return null
  return { ok: true, email: session.user.email }
}

export async function getContactRequests() {
  const { data, error } = await supabase
    .from('contact_requests')
    .select('id, nome, email, messaggio, created_at')
    .order('created_at', { ascending: false })

  if (error) toError(error, 'Impossibile caricare le richieste.')
  return { contacts: (data ?? []).map(mapContact) }
}
