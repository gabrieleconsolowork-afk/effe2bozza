import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateFavicons } from './generate-favicon.mjs'

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

const siteUrl = (loadEnv().VITE_SITE_URL || 'https://effe2sas.com').replace(/\/$/, '')

const routes = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/chi-siamo', changefreq: 'monthly', priority: '0.9' },
  { loc: '/servizi', changefreq: 'monthly', priority: '0.9' },
  { loc: '/lavori', changefreq: 'monthly', priority: '0.8' },
  { loc: '/contattaci', changefreq: 'monthly', priority: '0.9' },
  { loc: '/assistenza', changefreq: 'monthly', priority: '0.7' },
]

const lastmod = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ({ loc, changefreq, priority }) => `  <url>
    <loc>${siteUrl}${loc === '/' ? '' : loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const outPath = path.join(root, 'public', 'sitemap.xml')
fs.writeFileSync(outPath, xml)

const robots = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${siteUrl}/sitemap.xml
`
fs.writeFileSync(path.join(root, 'public', 'robots.txt'), robots)

const staticAssets = [
  ['src/assets/logo.png', 'public/logo.png'],
  ['src/assets/hero-bg.png', 'public/og-image.png'],
]

for (const [from, to] of staticAssets) {
  const src = path.join(root, from)
  const dest = path.join(root, to)
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest)
  }
}

await generateFavicons()

console.log(`Sitemap generata: ${outPath} (${siteUrl})`)
