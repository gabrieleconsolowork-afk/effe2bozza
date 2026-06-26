import { siteContact } from './siteContact'

const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://effe2sas.com').replace(/\/$/, '')

export const siteConfig = {
  name: 'EFFE2',
  legalName: 'EFFE2 SAS di Fuso Davide & C.',
  tagline: 'Laboratorio odontotecnico dal 1998',
  description:
    'Laboratorio odontotecnico a Ponte nelle Alpi (BL). Corone, ponti, zirconia, full arch e protesi su impianti con CAD/CAM e finitura artigianale per studi di Belluno e tutto il territorio nazionale.',
  url: siteUrl,
  locale: 'it_IT',
  language: 'it',
  foundingYear: 1998,
  email: 'effe2snc@gmail.com',
  phone: siteContact.phoneDisplay,
  phoneTel: siteContact.phoneTel,
  whatsAppUrl: siteContact.whatsAppUrl,
  vatId: '00901610253',
  address: {
    street: 'Viale Cadore 56/G',
    locality: 'Ponte nelle Alpi',
    region: 'Veneto',
    province: 'BL',
    postalCode: '32014',
    country: 'IT',
    countryName: 'Italia',
  },
  geo: {
    latitude: 46.1763,
    longitude: 12.2874,
  },
  openingHours: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '18:00' },
  ],
  areaServed: [
    'Italia',
    'Ponte nelle Alpi',
    'Belluno',
    'Feltre',
    'Pieve di Cadore',
    'Longarone',
  ],
  social: {
    instagram: 'https://www.instagram.com/effe2dentallab/',
  },
  ogImage: `${siteUrl}/og-image.png`,
  logo: `${siteUrl}/icon-512.png`,
  icon: `${siteUrl}/favicon.svg`,
  appleTouchIcon: `${siteUrl}/apple-touch-icon.png`,
}

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return siteConfig.url
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}
