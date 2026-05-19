import { motion } from 'framer-motion'

const nav = {
  Pagine: ['Servizi', 'Perché Noi', 'Contattaci', 'I Nostri Lavori'],
  Azienda: ['Chi Siamo', 'Dentisti', 'Per Collaboratori'],
  Risorse: ['Centro Assistenza', 'Blog', 'Carriere'],
  Legale: ['Privacy Policy', "Condizioni d'Ordine", 'Gestisci cookie'],
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <a href="#" className="flex items-center gap-2 font-bold text-base text-white">
              <span className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center text-white text-sm font-black">E2</span>
              EFFE2
            </a>
            <p className="text-sm text-slate-500 leading-relaxed">Laboratorio Odontotecnico</p>
            <a href="mailto:effe2snc@gmail.com"
              className="block text-sm text-slate-400 hover:text-white transition-colors">
              effe2snc@gmail.com
            </a>
          </div>

          {/* Nav columns */}
          {Object.entries(nav).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 space-y-2">
          <p className="text-xs text-slate-600">
            © 2026 EFFE2 SAS di Fuso Davide & C. — Viale Cadore 56/G, 32014 Ponte nelle Alpi (BL)
          </p>
          <p className="text-xs text-slate-600">P.IVA / C.F.: 00901610253</p>
          <div className="flex items-center gap-2 pt-2">
            <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors">
              🌐 Italiano
            </button>
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div className="mt-8 h-1 rounded-full bg-gradient-to-r from-green-800 via-green-600 to-lime-400 opacity-60" />
      </div>
    </footer>
  )
}
