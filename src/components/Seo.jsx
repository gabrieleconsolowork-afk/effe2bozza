import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteConfig, absoluteUrl } from '../data/siteConfig'
import { buildJsonLd, getSeoForPath } from '../data/seo'

const JSON_LD_ID = 'seo-jsonld'

function upsertMeta(attr, key, content) {
  if (content == null || content === '') return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href, extra = {}) {
  if (!href) return
  const selector = extra.sizes
    ? `link[rel="${rel}"][sizes="${extra.sizes}"]`
    : extra.type
      ? `link[rel="${rel}"][type="${extra.type}"]`
      : `link[rel="${rel}"]`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  if (extra.type) el.setAttribute('type', extra.type)
  if (extra.sizes) el.setAttribute('sizes', extra.sizes)
}

export default function Seo() {
  const { pathname } = useLocation()
  const seo = getSeoForPath(pathname)
  const canonical = absoluteUrl(pathname === '/' ? '' : pathname)
  const robots = seo.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  const title = seo.title || `${siteConfig.name} — ${siteConfig.tagline}`

  useEffect(() => {
    document.title = title
    document.documentElement.lang = siteConfig.language

    upsertMeta('name', 'description', seo.description || siteConfig.description)
    upsertMeta('name', 'keywords', seo.keywords)
    upsertMeta('name', 'robots', robots)
    upsertMeta('name', 'author', siteConfig.legalName)
    upsertMeta('name', 'geo.region', `IT-${siteConfig.address.province}`)
    upsertMeta('name', 'geo.placename', siteConfig.address.locality)
    upsertMeta('name', 'geo.position', `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`)
    upsertMeta('name', 'ICBM', `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', siteConfig.name)
    upsertMeta('property', 'og:locale', siteConfig.locale)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', seo.description || siteConfig.description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', siteConfig.ogImage)
    upsertMeta('property', 'og:image:type', 'image/png')
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta('property', 'og:image:alt', `${siteConfig.name} — Laboratorio odontotecnico a Ponte nelle Alpi`)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', seo.description || siteConfig.description)
    upsertMeta('name', 'twitter:image', siteConfig.ogImage)
    upsertMeta('name', 'twitter:image:alt', `${siteConfig.name} — Laboratorio odontotecnico a Ponte nelle Alpi`)

    upsertLink('canonical', canonical)

    upsertLink('icon', absoluteUrl('/favicon.svg'), { type: 'image/svg+xml' })
    upsertLink('icon', absoluteUrl('/favicon-32.png'), { type: 'image/png', sizes: '32x32' })
    upsertLink('icon', absoluteUrl('/favicon-16.png'), { type: 'image/png', sizes: '16x16' })
    upsertLink('apple-touch-icon', absoluteUrl('/apple-touch-icon.png'), { sizes: '180x180' })
    upsertLink('manifest', absoluteUrl('/manifest.webmanifest'))

    const jsonLd = buildJsonLd(pathname, seo.jsonLd || [])
    let script = document.getElementById(JSON_LD_ID)
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script')
        script.id = JSON_LD_ID
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(jsonLd)
    } else if (script) {
      script.remove()
    }
  }, [pathname, title, seo.description, seo.keywords, seo.jsonLd, robots, canonical])

  return null
}
