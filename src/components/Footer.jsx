import { Link } from 'react-router-dom'
import SmoothHashLink from './SmoothHashLink'
import { siteConfig } from '../data/siteConfig'

function SocialIcon({ children, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary-dark/70 transition-colors hover:border-primary/30 hover:text-primary-dark"
    >
      {children}
    </a>
  )
}

const socialLinks = [
  {
    label: 'Instagram',
    href: siteConfig.social.instagram,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

const companyLinks = [
  { label: 'Home', to: '/#home' },
  { label: 'Servizi', to: '/servizi' },
  { label: 'Chi siamo', to: '/chi-siamo' },
]

const resourceLinks = [
  { label: 'Contattaci', to: '/contattaci' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Assistenza', to: '/assistenza' },
]

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: "Condizioni d'ordine", to: '/condizioni' },
]

const linkClass =
  'text-sm text-primary-dark/70 hover:text-primary-dark transition-colors duration-300'

function FooterLink({ to, children }) {
  if (to.includes('#')) {
    return (
      <SmoothHashLink to={to} className={linkClass}>
        {children}
      </SmoothHashLink>
    )
  }
  return (
    <Link to={to} className={linkClass}>
      {children}
    </Link>
  )
}

function FooterColumn({ title, links }) {
  return (
    <div className="space-y-5">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-muted">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <FooterLink to={l.to}>{l.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const { address, email, legalName, vatId, phone, phoneTel } = siteConfig
  const addressLine = `${address.street}, ${address.postalCode} ${address.locality} (${address.province})`

  return (
    <footer className="relative overflow-hidden bg-surface text-primary-dark" itemScope itemType="https://schema.org/LocalBusiness">
      <meta itemProp="name" content={`${siteConfig.name} — Laboratorio Odontotecnico`} />
      <meta itemProp="telephone" content={phoneTel.replace('tel:', '')} />
      <link itemProp="url" href={siteConfig.url} />
      <div className="site-container pt-12 pb-6 sm:pt-16 lg:pt-20">
        <p className="text-2xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
          Il laboratorio
          <br />
          che ti segue davvero
        </p>

        <div className="my-10 h-px bg-border sm:my-12 lg:my-14" />

        {/* Nav columns */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
          <FooterColumn title="Azienda" links={companyLinks} />
          <FooterColumn title="Risorse" links={resourceLinks} />
          <FooterColumn title="Legale" links={legalLinks} />

          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Siamo qui per aiutarti
            </p>
            <a
              href={`mailto:${email}`}
              className="block break-all text-lg font-bold text-primary-dark transition-colors hover:text-primary sm:break-normal sm:text-2xl"
              itemProp="email"
            >
              {email}
            </a>
            <a
              href={phoneTel}
              className="block text-sm text-muted hover:text-primary-dark transition-colors"
              itemProp="telephone"
            >
              {phone}
            </a>
            <p className="text-sm text-muted leading-relaxed" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="streetAddress">{address.street}</span>
              <br />
              <span itemProp="postalCode">{address.postalCode}</span>{' '}
              <span itemProp="addressLocality">{address.locality}</span>{' '}
              (<span itemProp="addressRegion">{address.province}</span>)
            </p>
            <div className="space-y-3 pt-2">
              <p className="text-sm text-muted">Seguici</p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ label, icon, href }) => (
                  <SocialIcon key={label} label={label} href={href}>
                    {icon}
                  </SocialIcon>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center lg:mt-14">
          <div className="w-full space-y-1 sm:w-auto">
            <p>© 2026 {legalName} — {addressLine}</p>
            <p>P.IVA / C.F.: {vatId}</p>
          </div>
          <div className="flex w-full flex-wrap items-center gap-x-6 gap-y-2 sm:w-auto">
            <Link to="/condizioni" className="hover:text-primary-dark transition-colors">
              Termini e condizioni
            </Link>
            <Link to="/privacy" className="hover:text-primary-dark transition-colors">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
