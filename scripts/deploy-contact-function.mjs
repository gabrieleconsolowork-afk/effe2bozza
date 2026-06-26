import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { spawnSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

function loadEnv() {
  const envPath = path.join(root, '.env')
  if (!fs.existsSync(envPath)) return {}
  const env = {}
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^([^#=\s]+)\s*=\s*(.*)$/)
    if (match) env[match[1]] = match[2].trim()
  }
  return env
}

const env = loadEnv()
const projectRef = (env.VITE_SUPABASE_URL || '').match(/https:\/\/([^.]+)\.supabase\.co/)?.[1]
const accessToken = process.env.SUPABASE_ACCESS_TOKEN || env.SUPABASE_ACCESS_TOKEN
const functionPath = path.join(root, 'supabase', 'functions', 'submit-contact', 'index.ts')
const configPath = path.join(root, 'supabase', 'config.toml')

if (!projectRef) {
  console.error('Impossibile ricavare il project ref da VITE_SUPABASE_URL nel .env')
  process.exit(1)
}

async function deployViaManagementApi() {
  if (!accessToken) return false

  const source = fs.readFileSync(functionPath, 'utf8')
  const verifyJwt = fs.existsSync(configPath) && !/verify_jwt\s*=\s*false/.test(fs.readFileSync(configPath, 'utf8').replace(/\s/g, ''))
    ? true
    : fs.readFileSync(configPath, 'utf8').includes('verify_jwt = false') === false

  const metadata = {
    entrypoint_path: 'index.ts',
    name: 'submit-contact',
    verify_jwt: false,
  }

  const form = new FormData()
  form.append('metadata', JSON.stringify(metadata))
  form.append('file', new Blob([source], { type: 'text/typescript' }), 'index.ts')

  const url = `https://api.supabase.com/v1/projects/${projectRef}/functions/deploy?slug=submit-contact`
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: form,
  })

  const body = await response.text()
  if (!response.ok) {
    console.error('Deploy via Management API fallito:', response.status, body)
    return false
  }

  console.log('✓ Function deployata via Management API')
  console.log(body)
  return true
}

async function main() {
  console.log(`Deploy Edge Function submit-contact → ${projectRef}`)

  if (await deployViaManagementApi()) return

  if (!accessToken) {
    console.log('\nManca SUPABASE_ACCESS_TOKEN nel .env')
    console.log('1. Vai su https://supabase.com/dashboard/account/tokens')
    console.log('2. Crea un token e aggiungilo al .env:')
    console.log('   SUPABASE_ACCESS_TOKEN=sbp_...')
    console.log('3. Rilancia: npm run deploy:contact-function')
    console.log('\nOppure esegui: npx supabase login && npm run deploy:contact-function')
  }

  const result = spawnSync(
    'npx',
    ['supabase', 'functions', 'deploy', 'submit-contact', '--project-ref', projectRef, '--use-api'],
    { cwd: root, stdio: 'inherit', shell: true, env: { ...process.env, SUPABASE_ACCESS_TOKEN: accessToken || '' } },
  )

  if (result.status !== 0) process.exit(result.status ?? 1)
  console.log('\n✓ Function deployata.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
