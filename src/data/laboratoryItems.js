import { Drill, Printer, Gem, Hand, Wind, Home } from 'lucide-react'
import imgFresatura from '../assets/laboratory/fresatura.webp'
import imgStampa3d from '../assets/laboratory/stampa-3d.webp'
import imgCeramizzazione from '../assets/laboratory/ceramizzazione.webp'
import imgLucidatura from '../assets/laboratory/lucidatura.webp'
import imgSabbiatura from '../assets/laboratory/sabbiatura.webp'
import imgInHouse from '../assets/laboratory/in-house.webp'

export const laboratoryItems = [
  {
    icon: Drill,
    title: 'Fresatura 5 assi',
    desc: 'Fresatore Zirkonzahn M2 a secco e umido, utilizzo di materiali certificati Zirkonzahn.',
    image: imgFresatura,
  },
  {
    icon: Printer,
    title: 'Stampa 3D medicale',
    desc: 'Stampanti SprintRay e materiali certificati a livello EU per permanenza intraorale.',
    image: imgStampa3d,
  },
  {
    icon: Gem,
    title: 'Ceramizzazione',
    desc: 'CZR / Noritake, Ivoclar. Colorazioni Shofu Super Colors.',
    image: imgCeramizzazione,
  },
  {
    icon: Hand,
    title: 'Provvisori',
    desc: 'Provvisori a breve e lunga durata sia fresati che stampati, rifiniti e finalizzati a mano.',
    image: imgLucidatura,
  },
  {
    icon: Wind,
    title: 'Sabbiatura',
    desc: 'Ossido di alluminio a 50 e 25 micron per preparazione superfici e adesione ottimale.',
    image: imgSabbiatura,
  },
  {
    icon: Home,
    title: 'Tutto in house',
    desc: 'Scanner S600, forni di sinterizzazione, post-processing completo. Dalla scansione alla consegna.',
    image: imgInHouse,
  },
]
