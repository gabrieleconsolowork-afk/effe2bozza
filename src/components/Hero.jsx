import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { smoothScrollToId, syncHash } from '../utils/smoothScroll'
import { siteContact } from '../data/siteContact'
import heroBg from '../assets/hero-bg.png'
import imgCiContatti from '../assets/about/ci-contatti.png'

const MotionLink = motion.create(Link)
const MotionA = motion.create('a')

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const pillBase =
  'inline-flex cursor-pointer items-center justify-center gap-2 min-h-[3.25rem] px-7 py-4 text-sm font-medium rounded-full whitespace-nowrap transition-[color,background-color] duration-500 ease-[cubic-bezier(0.33,0.86,0.55,1)]'

const heroInsetBottom = 'bottom-6 sm:bottom-10'
const heroInsetLeft = 'left-6 sm:left-10'
const heroInsetRight = 'right-6 sm:right-10'

function scrollToComeFunziona() {
  smoothScrollToId('come-funziona')
  syncHash('/', 'come-funziona')
}

export default function Hero() {
  return (
    <section id="home" className="relative z-0 h-screen bg-white">
      <div className="h-full p-4 sm:p-5">
        <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-3xl">
          <img
            src={heroBg}
            alt="Laboratorio odontotecnico EFFE2 a Ponte nelle Alpi"
            className="absolute inset-0 h-full w-full object-cover object-center"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

          <div className="relative h-full min-h-0">
            <div className={`absolute ${heroInsetBottom} ${heroInsetLeft} ${heroInsetRight} z-10 max-w-2xl space-y-4 sm:space-y-7 text-left`}>
                <motion.div {...fadeUp(0.1)}>
                  <span className="inline-block rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                    Laboratorio Odontotecnico · dal 1998
                  </span>
                </motion.div>

                <motion.h1
                  {...fadeUp(0.2)}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight text-balance"
                >
                  Laboratorio odontotecnico
                  <br />
                  a Ponte nelle Alpi.
                </motion.h1>

                <motion.p {...fadeUp(0.3)} className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
                  Laboratorio odontotecnico per studi di Belluno e tutto il territorio nazionale. Corone, ponti,
                  zirconia e full arch con CAD/CAM e finitura artigianale dal 1998.
                </motion.p>

                <motion.div className="flex flex-wrap gap-2">
                  <MotionLink
                    to="/contattaci"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                    className={`${pillBase} group font-semibold bg-primary text-white hover:bg-effe-dark`}
                  >
                    Contattaci
                    <ArrowRight size={15} className="btn-arrow-icon" />
                  </MotionLink>
                  <motion.button
                    type="button"
                    onClick={scrollToComeFunziona}
                    {...fadeUp(0.4)}
                    className={`${pillBase} bg-white/15 backdrop-blur-md text-white hover:bg-white hover:text-primary-dark`}
                  >
                    Scopri di più
                  </motion.button>
                </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute ${heroInsetBottom} ${heroInsetRight} z-10 hidden lg:block w-[14rem] md:w-[16rem] rounded-2xl bg-white/20 backdrop-blur-md p-4`}
            >
              <div className="mb-3 aspect-[5/3] w-full overflow-hidden rounded-xl">
                <img
                  src={imgCiContatti}
                  alt=""
                  className="h-full w-full object-cover object-center scale-[2.25]"
                  draggable={false}
                />
              </div>
              <p className="text-center text-sm font-semibold text-white mb-3">Parla con Roberta</p>
              <MotionA
                href={siteContact.phoneTel}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full items-center justify-center gap-2 min-h-[2.75rem] px-4 py-3 text-sm font-semibold rounded-full bg-primary text-white hover:bg-effe-dark transition-colors"
              >
                Chiamaci?
                <Phone size={15} />
              </MotionA>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
