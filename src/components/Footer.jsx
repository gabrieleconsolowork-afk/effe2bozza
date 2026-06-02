import { Link } from 'react-router-dom'
import Logo from './Logo'

const nav = {
  Pagine: [
    { label: 'Servizi', to: '/servizi' },
    { label: 'Perché Noi', to: '/servizi' },
    { label: 'Contattaci', to: '/contattaci' },
    { label: 'I Nostri Lavori', to: '/lavori' },
  ],
  Azienda: [
    { label: 'Chi Siamo', to: '/chi-siamo' },
    { label: 'Dentisti', to: '/#per-chi' },
    { label: 'Per Collaboratori', to: '/#per-chi' },
  ],
  Risorse: [
    { label: 'Centro Assistenza', to: '/assistenza' },
    { label: 'Blog', to: '/blog' },
    { label: 'Carriere', to: '/carriere' },
  ],
  Legale: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: "Condizioni d'Ordine", to: '/condizioni' },
    { label: 'FAQ', to: '/#faq' },
  ],
}

const linkClass = 'text-sm text-white/60 hover:text-white transition-colors duration-300 ease-in-out'

export default function Footer() {
  return (
    <footer className="bg-effe-darker text-white/60">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Logo light showText size="sm" />
            <p className="text-sm text-white/60 leading-relaxed">Laboratorio Odontotecnico</p>
            <a href="mailto:effe2snc@gmail.com" className="block text-sm text-white/60 hover:text-white transition-colors duration-300 ease-in-out">
              effe2snc@gmail.com
            </a>
          </div>

          {/* Nav columns */}
          {Object.entries(nav).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    {l.href ? (
                      <a href={l.href} className={linkClass}>{l.label}</a>
                    ) : (
                      <Link to={l.to} className={linkClass}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 space-y-2">
          <p className="text-xs text-white/40">
            © 2026 EFFE2 SAS di Fuso Davide & C. — Viale Cadore 56/G, 32014 Ponte nelle Alpi (BL)
          </p>
          <p className="text-xs text-white/40">P.IVA / C.F.: 00901610253</p>
          <div className="flex items-center gap-2 pt-2">
            <button className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors duration-300 ease-in-out">
              🌐 Italiano
            </button>
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div className="mt-8 h-1 rounded-full bg-gradient-to-r from-effe-dark via-primary to-logo-lime opacity-60" />
      </div>
    </footer>
  )
}
