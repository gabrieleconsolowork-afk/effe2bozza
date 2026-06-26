import Hero from '../components/Hero'
import HeroStats from '../components/HeroStats'
import HowItWorks from '../components/HowItWorks'
import AboutHighlight from '../components/AboutHighlight'
import Features from '../components/Features'
import Communication from '../components/Communication'
import SmileDesign from '../components/SmileDesign'
import Laboratory from '../components/Laboratory'
import ForWho from '../components/ForWho'
import Portal from '../components/Portal'
import Privacy from '../components/Privacy'
import CTA from '../components/CTA'
import Faq from '../components/Faq'

export default function Home() {
  return (
    <>
      <Hero />
      <HeroStats />
      <AboutHighlight />
      <HowItWorks />
      <Features />
      <Communication />
      <SmileDesign />
      <Laboratory />
      <ForWho />
      <Portal />
      <Privacy />
      <CTA />
      <Faq />
    </>
  )
}
