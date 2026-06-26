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
const secretKey = process.env.SUPABASE_SECRET_KEY
const publishableKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!projectUrl || !secretKey) {
  console.error('Mancano VITE_SUPABASE_URL o SUPABASE_SECRET_KEY nel .env')
  process.exit(1)
}

const sql = fs.readFileSync(path.join(__dirname, '..', 'supabase', 'fix-rls.sql'), 'utf8')

// Supabase Management API — richiede Personal Access Token, non la secret key del progetto.
const ref = projectUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1]
const pat = process.env.SUPABASE_ACCESS_TOKEN

if (pat && ref) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${pat}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  })
  const body = await res.text()
  console.log('Management API:', res.status, body.slice(0, 200))
  if (res.ok) process.exit(0)
}

console.log('Non posso applicare SQL da remoto senza SUPABASE_ACCESS_TOKEN o password DB.')
console.log('Esegui supabase/fix-rls.sql nel SQL Editor:')
console.log(`https://supabase.com/dashboard/project/${ref}/sql/new`)

// Test insert pubblico
if (publishableKey) {
  const { createClient } = await import('@supabase/supabase-js')
  const sb = createClient(projectUrl, publishableKey)
  const test = await sb.from('contact_requests').insert({
    nome: 'Test RLS',
    email: 'test@test.it',
    messaggio: 'Verifica policy insert',
  }).select('id').single()
  console.log('\nTest insert pubblico:', test.error?.message || `ok (${test.data?.id})`)
}
