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
import { supabase } from '@/lib/supabase'

async function getSiteContent(): Promise<Record<string, string>> {
  try {
    const { data } = await supabase.from('site_content').select('key, value')
    const content: Record<string, string> = {}
    for (const row of data || []) content[row.key] = row.value
    return content
  } catch {
    return {}
  }
}

export default async function Home() {
  const content = await getSiteContent()

  return (
    <>
      <Nav />
      <main>
        <HeroSection
          subtitle={content.hero_subtitle}
          ctaPrimary={content.hero_cta_primary}
          ctaSecondary={content.hero_cta_secondary}
          headline1={content.hero_headline_1}
          headline2={content.hero_headline_2}
          headline3={content.hero_headline_3}
        />
        <StatsBar tickerText={content.marquee_text} />
        <WhatIs bodyOfWater={content.whatis_body_of_water} />
        <SurvivalGuide callout={content.survival_callout} />
        <HowToIdentify />
        <Research
          instagramHandle={content.research_instagram_handle}
          instagramUrl={content.research_instagram_url}
          quoteText={content.research_quote_text}
          quoteAttribution={content.research_quote_attribution}
        />
        <Services />
        <Contact
          instagramHandle={content.contact_instagram_handle}
          instagramUrl={content.contact_instagram_url}
          location={content.contact_location}
          locationSub={content.contact_location_sub}
        />
      </main>
      <Footer
        tagline={content.footer_tagline}
        instagramUrl={content.contact_instagram_url}
        copyrightExtra={content.footer_copyright_extra}
      />
    </>
  )
}
