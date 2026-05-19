import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Servizi', href: '#servizi' },
  { label: 'Smile Design', href: '#smile-design' },
  { label: 'Laboratorio', href: '#laboratorio' },
  { label: 'Per chi', href: '#per-chi' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-100' : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 font-bold text-lg text-slate-900">
          <span className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center text-white text-sm font-black">E2</span>
          <span>EFFE2</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a key={l.label} href={l.href}
              className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors">
              {l.label}
            </a>
          ))}
          <a href="mailto:effe2snc@gmail.com"
            className="ml-3 px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium">
            Ordina
          </a>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-md hover:bg-slate-100"
          onClick={() => setMenuOpen(!menuOpen)}>
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`block h-0.5 bg-slate-900 transition-all ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-0.5 bg-slate-900 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-slate-900 transition-all ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <a key={l.label} href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md">
                  {l.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <a href="mailto:effe2snc@gmail.com"
                  className="block w-full py-2 text-center text-sm bg-slate-900 text-white rounded-lg font-medium">
                  Ordina
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
