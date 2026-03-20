import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import StatsBar from '@/components/StatsBar'
import WhatIs from '@/components/sections/WhatIs'
import SurvivalGuide from '@/components/sections/SurvivalGuide'
import HowToIdentify from '@/components/sections/HowToIdentify'
import Research from '@/components/sections/Research'
import Services from '@/components/sections/Services'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <StatsBar />
        <WhatIs />
        <SurvivalGuide />
        <HowToIdentify />
        <Research />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
