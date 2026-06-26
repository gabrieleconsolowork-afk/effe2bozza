import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env')
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq)
    const value = trimmed.slice(eq + 1)
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnv()

const projectUrl = process.env.VITE_SUPABASE_URL
const publishableKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY
const secretKey = process.env.SUPABASE_SECRET_KEY

if (!projectUrl || !publishableKey) {
  console.error('Mancano VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY nel .env')
  process.exit(1)
}

const adminHeaders = secretKey
  ? {
      apikey: secretKey,
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    }
  : null

async function ensureAdminUser() {
  if (!adminHeaders) {
    console.log('⚠ SUPABASE_SECRET_KEY assente: salta creazione utente admin')
    return
  }

  const res = await fetch(`${projectUrl}/auth/v1/admin/users`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      email: 'effe2social@gmail.com',
      password: 'Social2026!',
      email_confirm: true,
    }),
  })

  const body = await res.json()
  if (res.ok) {
    console.log('✓ Utente admin pronto:', body.email)
    return
  }

  const msg = body.msg || body.message || ''
  if (msg.toLowerCase().includes('already')) {
    console.log('✓ Utente admin già esistente')
    return
  }

  console.warn('⚠ Creazione admin:', res.status, body)
}

async function checkTable() {
  const res = await fetch(`${projectUrl}/rest/v1/contact_requests?select=id&limit=1`, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
  })

  if (res.ok) {
    console.log('✓ Tabella contact_requests pronta')
    return true
  }

  const err = await res.json().catch(() => ({}))
  console.log('✗ Tabella contact_requests mancante:', err.message || res.statusText)
  return false
}

async function main() {
  console.log('Setup Supabase →', projectUrl)
  await ensureAdminUser()
  const ready = await checkTable()

  if (!ready) {
    console.log('\nEsegui supabase/schema.sql in SQL Editor:')
    console.log('https://supabase.com/dashboard/project/mvzcyotutkhzfmsplulg/sql/new')
    process.exit(1)
  }

  console.log('\nTutto pronto. Avvia con npm run dev')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
