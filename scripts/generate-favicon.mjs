import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const logoPath = path.join(root, 'src/assets/logo.png')
const publicDir = path.join(root, 'public')

const pngOutputs = [
  ['apple-touch-icon.png', 180],
  ['favicon-32.png', 32],
  ['favicon-16.png', 16],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]

function buildIconSvg(size = 512) {
  const padding = size * 0.22
  const logoSize = size - padding * 2
  const logoB64 = fs.readFileSync(logoPath).toString('base64')
  const logoDataUri = `data:image/png;base64,${logoB64}`

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${size} ${size}" role="img" aria-label="EFFE2">
  <rect width="${size}" height="${size}" fill="#ffffff"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#ffffff"/>
  <image href="${logoDataUri}" x="${padding}" y="${padding}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid meet"/>
</svg>`
}

function hasPngFavicons() {
  return pngOutputs.every(([filename]) => fs.existsSync(path.join(publicDir, filename)))
}

async function generatePngFavicons() {
  const { chromium } = await import('playwright')
  const browser = await chromium.launch()
  const page = await browser.newPage()

  for (const [filename, size] of pngOutputs) {
    const svg = buildIconSvg(size)
    await page.setViewportSize({ width: size, height: size })
    await page.setContent(
      `<!DOCTYPE html><html><body style="margin:0;background:transparent">${svg}</body></html>`,
      { waitUntil: 'load' },
    )
    await page.locator('svg').screenshot({
      path: path.join(publicDir, filename),
    })
  }

  await browser.close()
}

export async function generateFavicons({ forcePng = false } = {}) {
  if (!fs.existsSync(logoPath)) {
    console.warn('Logo non trovato, salto generazione favicon.')
    return
  }

  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), buildIconSvg(512))
  console.log('favicon.svg aggiornato')

  const shouldGeneratePng = forcePng || process.argv.includes('--png')
  if (!shouldGeneratePng) {
    if (hasPngFavicons()) {
      console.log('Favicon PNG già presenti in public/, skip Playwright.')
    } else {
      console.warn('Favicon PNG mancanti. Esegui: node scripts/generate-favicon.mjs --png')
    }
    return
  }

  try {
    await generatePngFavicons()
    console.log('Favicon PNG generate in public/')
  } catch (err) {
    if (hasPngFavicons()) {
      console.warn('Playwright non disponibile, uso favicon PNG già presenti in public/.')
      return
    }
    throw err
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateFavicons({ forcePng: process.argv.includes('--png') }).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
