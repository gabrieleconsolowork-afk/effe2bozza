import { siteConfig, absoluteUrl } from './siteConfig'
import { faqs } from './faqs'

const defaultKeywords = [
  'odontotecnico',
  'odontotecnico ponte nelle alpi',
  'laboratorio odontotecnico',
  'laboratorio odontotecnico belluno',
  'laboratorio odontotecnico veneto',
  'protesi dentale',
  'corone zirconia',
  'CAD CAM dentale',
  'EFFE2',
].join(', ')

export const seoPages = {
  '/': {
    title: 'Laboratorio Odontotecnico Ponte nelle Alpi | EFFE2 — Belluno e Italia',
    description:
      'EFFE2: laboratorio odontotecnico a Ponte nelle Alpi (BL) dal 1998. Corone, ponti, zirconia e full arch per studi di Belluno e tutto il territorio nazionale. CAD/CAM e finitura artigianale.',
    keywords: defaultKeywords,
    jsonLd: ['organization', 'localBusiness', 'website', 'faq'],
  },
  '/chi-siamo': {
    title: 'Chi siamo | Laboratorio odontotecnico EFFE2 — Ponte nelle Alpi',
    description:
      'Dal 1998 EFFE2 è un laboratorio odontotecnico a Ponte nelle Alpi: team specializzato, workflow digitale e finitura artigianale per studi di Belluno e tutto il territorio nazionale.',
    keywords: 'odontotecnico ponte nelle alpi, laboratorio odontotecnico belluno, chi siamo EFFE2, laboratorio odontotecnico veneto',
    jsonLd: ['organization', 'localBusiness', 'breadcrumb'],
  },
  '/servizi': {
    title: 'Servizi odontotecnici | Corone, ponti e zirconia — EFFE2',
    description:
      'Servizi odontotecnici completi: corone e ponti in zirconia, full arch, faccette, provvisori fresati e stampati, mock-up e chirurgia guidata. Laboratorio per studi di Belluno e tutto il territorio nazionale.',
    keywords: 'odontotecnico servizi, corone zirconia, full arch, protesi impianti, laboratorio odontotecnico belluno',
    jsonLd: ['organization', 'localBusiness', 'breadcrumb', 'services'],
  },
  '/lavori': {
    title: 'Portfolio odontotecnico | I nostri lavori — EFFE2',
    description:
      'Portfolio del laboratorio odontotecnico EFFE2: protesi fisse, estetica, implantologia e smile design realizzati a Ponte nelle Alpi per studi dentistici.',
    keywords: 'odontotecnico portfolio, lavori odontotecnici, protesi dentale belluno',
    jsonLd: ['organization', 'breadcrumb'],
  },
  '/contattaci': {
    title: 'Contatti odontotecnico Ponte nelle Alpi | EFFE2',
    description:
      'Contatta EFFE2, laboratorio odontotecnico a Ponte nelle Alpi (BL). Telefono, WhatsApp ed email per preventivi e collaborazioni con studi di Belluno e tutto il territorio nazionale.',
    keywords: 'odontotecnico ponte nelle alpi contatti, laboratorio odontotecnico belluno, laboratorio odontotecnico telefono',
    jsonLd: ['organization', 'localBusiness', 'breadcrumb'],
  },
  '/assistenza': {
    title: 'Assistenza | Laboratorio odontotecnico EFFE2',
    description:
      'Supporto diretto dal laboratorio odontotecnico EFFE2 a Ponte nelle Alpi. WhatsApp, telefono ed email per ordini, scansioni e informazioni tecniche.',
    keywords: 'assistenza odontotecnico, supporto laboratorio dentale',
    jsonLd: ['organization', 'breadcrumb'],
  },
  '/privacy': {
    title: 'Privacy Policy | EFFE2',
    description: 'Informativa privacy del laboratorio odontotecnico EFFE2. Trattamento dati conforme GDPR.',
    robots: 'noindex, follow',
    jsonLd: ['breadcrumb'],
  },
  '/condizioni': {
    title: 'Condizioni d\'ordine | EFFE2',
    description: 'Condizioni d\'ordine del laboratorio odontotecnico EFFE2: preventivi, lavorazioni, consegne e garanzie.',
    robots: 'noindex, follow',
    jsonLd: ['breadcrumb'],
  },
  '/admin': {
    title: 'Admin | EFFE2',
    description: '',
    robots: 'noindex, nofollow',
    jsonLd: [],
  },
}

const knownPaths = new Set(Object.keys(seoPages))

export function getSeoForPath(pathname) {
  const path = pathname.split('?')[0].split('#')[0] || '/'
  if (seoPages[path]) return seoPages[path]

  return {
    title: 'Pagina non trovata | EFFE2',
    description: 'La pagina richiesta non esiste o non è più disponibile.',
    robots: 'noindex, nofollow',
    jsonLd: ['organization'],
  }
}

export function isKnownPath(pathname) {
  const path = pathname.split('?')[0].split('#')[0] || '/'
  return knownPaths.has(path)
}

function openingHoursSpecification() {
  return siteConfig.openingHours.map(({ dayOfWeek, opens, closes }) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek,
    opens,
    closes,
  }))
}

function postalAddress() {
  const { street, locality, region, postalCode, country } = siteConfig.address
  return {
    '@type': 'PostalAddress',
    streetAddress: street,
    addressLocality: locality,
    addressRegion: region,
    postalCode,
    addressCountry: country,
  }
}

export function buildJsonLd(pathname, types = []) {
  const path = pathname.split('?')[0].split('#')[0] || '/'
  const pageUrl = absoluteUrl(path === '/' ? '' : path)
  const graphs = []

  const logoObject = {
    '@type': 'ImageObject',
    url: siteConfig.logo,
    width: 512,
    height: 512,
  }

  if (types.includes('organization')) {
    graphs.push({
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
      logo: logoObject,
      email: siteConfig.email,
      telephone: siteConfig.phoneTel.replace('tel:', ''),
      foundingDate: String(siteConfig.foundingYear),
      sameAs: [siteConfig.social.instagram],
    })
  }

  if (types.includes('localBusiness')) {
    graphs.push({
      '@type': 'LocalBusiness',
      '@id': `${siteConfig.url}/#localbusiness`,
      name: `${siteConfig.name} — Laboratorio Odontotecnico`,
      description: siteConfig.description,
      url: siteConfig.url,
      image: siteConfig.ogImage,
      logo: logoObject,
      telephone: siteConfig.phoneTel.replace('tel:', ''),
      email: siteConfig.email,
      address: postalAddress(),
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
      openingHoursSpecification: openingHoursSpecification(),
      areaServed: siteConfig.areaServed.map((name) =>
        name === 'Italia'
          ? { '@type': 'Country', name: 'Italia' }
          : { '@type': 'AdministrativeArea', name },
      ),
      priceRange: '€€',
      parentOrganization: { '@id': `${siteConfig.url}/#organization` },
    })
  }

  if (types.includes('website')) {
    graphs.push({
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      publisher: { '@id': `${siteConfig.url}/#organization` },
    })
  }

  if (types.includes('faq')) {
    graphs.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: a,
        },
      })),
    })
  }

  if (types.includes('breadcrumb') && path !== '/') {
    const slugLabels = {
      'chi-siamo': 'Chi siamo',
      'servizi': 'Servizi',
      'lavori': 'I nostri lavori',
      'contattaci': 'Contattaci',
      'assistenza': 'Assistenza',
      'privacy': 'Privacy Policy',
      'condizioni': "Condizioni d'ordine",
    }
    const segments = path.split('/').filter(Boolean)
    graphs.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteConfig.url,
        },
        ...segments.map((segment, i) => ({
          '@type': 'ListItem',
          position: i + 2,
          name: slugLabels[segment] ?? segment.replace(/-/g, ' '),
          item: absoluteUrl(`/${segments.slice(0, i + 1).join('/')}`),
        })),
      ],
    })
  }

  if (types.includes('services')) {
    graphs.push({
      '@type': 'ItemList',
      name: 'Servizi odontotecnici EFFE2',
      itemListElement: [
        'Corone e ponti in zirconia',
        'Full arch e protesi su impianti',
        'Estetica e faccette',
        'Provvisori fresati e stampati',
        'Mock-up diagnostico',
        'Chirurgia guidata',
      ].map((name, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name,
      })),
    })
  }

  if (graphs.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@graph': graphs,
  }
}

export const publicRoutes = [
  '/',
  '/chi-siamo',
  '/servizi',
  '/lavori',
  '/assistenza',
  '/contattaci',
]
