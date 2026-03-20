import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Rip Currents | RIP Currents Info',
  description: 'Resources, research links, and external references for rip current safety and education.',
}

const RESOURCE_GROUPS = [
  {
    title: 'Government & Official Sources',
    color: '#0096C7',
    resources: [
      {
        name: 'NOAA Rip Current Safety',
        desc: 'National Oceanic and Atmospheric Administration — official U.S. rip current science and safety information.',
        href: 'https://oceanservice.noaa.gov/hazards/ripcurrents/',
      },
      {
        name: 'National Weather Service — Rip Currents',
        desc: 'NOAA NWS forecasts and rip current science for U.S. coastal and Great Lakes beaches.',
        href: 'https://www.weather.gov/safety/ripcurrent',
      },
      {
        name: 'Environment and Climate Change Canada',
        desc: 'Canadian weather, water, and climate information including Great Lakes conditions.',
        href: 'https://www.canada.ca/en/environment-climate-change.html',
      },
    ],
  },
  {
    title: 'Water Safety Organizations',
    color: '#00B4D8',
    resources: [
      {
        name: 'United States Lifesaving Association (USLA)',
        desc: 'Beach safety statistics, rescue data, and rip current education for American beaches.',
        href: 'https://www.usla.org/page/BEACHSAFETY',
      },
      {
        name: 'Lifesaving Society Canada',
        desc: 'Canadian national drowning prevention and water safety training organization.',
        href: 'https://www.lifesaving.org',
      },
      {
        name: 'Swim Drink Fish Canada',
        desc: 'Advocates for clean, safe, and accessible water across Canada.',
        href: 'https://swimdrinkfish.ca',
      },
      {
        name: 'Royal Life Saving Society Australia',
        desc: 'Australian water safety — extensive rip current research and beach flag education.',
        href: 'https://www.royallifesaving.com.au',
      },
    ],
  },
  {
    title: 'Research & Academia',
    color: '#48CAE4',
    resources: [
      {
        name: 'Rip Current Research — University of Waterloo',
        desc: 'Prof. Chris Houser\'s lab — 20+ years of rip current formation and Great Lakes research.',
        href: 'https://uwaterloo.ca',
      },
      {
        name: 'NOAA Great Lakes Environmental Research Laboratory',
        desc: 'Coastal hazards, wave dynamics, and rip current formation in the Great Lakes system.',
        href: 'https://www.glerl.noaa.gov',
      },
      {
        name: 'The Conversation — Great Lakes Rip Currents',
        desc: 'Accessible research article: "The Great Lakes are powerful — learning about rip currents can help prevent drowning."',
        href: 'https://theconversation.com',
      },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-ocean-deep">
        {/* Page hero */}
        <section className="relative pt-40 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,119,182,0.1) 0%, transparent 70%)' }}
          />
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-ocean-teal" />
              <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">
                About Rip Currents
              </span>
              <div className="w-8 h-px bg-ocean-teal" />
            </div>
            <h1 className="text-display-lg text-white mb-6">
              RESOURCES &amp;{' '}
              <span style={{ WebkitTextStroke: '2px #00B4D8', color: 'transparent' }}>
                REFERENCES
              </span>
            </h1>
            <p className="text-ocean-foam/70 font-body text-base leading-relaxed max-w-2xl mx-auto">
              A curated collection of rip current safety resources, research links, and water safety
              organizations to help you learn more and stay safe.
            </p>
          </div>
        </section>

        {/* Resources */}
        <section className="pb-28">
          <div className="max-w-5xl mx-auto px-6 space-y-16">
            {RESOURCE_GROUPS.map((group) => (
              <div key={group.title}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1 h-10 rounded-full" style={{ background: group.color }} />
                  <h2 className="font-display text-2xl text-white">{group.title}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  {group.resources.map((r) => (
                    <a
                      key={r.name}
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card p-6 group block"
                      style={{ borderColor: `${group.color}20` }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-body font-semibold text-white text-sm group-hover:text-ocean-teal transition-colors duration-200">
                          {r.name}
                        </h3>
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                          className="w-4 h-4 flex-shrink-0 text-ocean-foam/30 group-hover:text-ocean-teal transition-colors duration-200 mt-0.5">
                          <path d="M 5 2 L 14 2 L 14 11 M 14 2 L 2 14" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-xs text-ocean-foam/50 font-body leading-relaxed mt-2">{r.desc}</p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back to home */}
        <div className="pb-20 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-body font-semibold text-ocean-teal
                       hover:text-ocean-light transition-colors duration-200"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M 13 8 L 3 8 M 7 12 L 3 8 L 7 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
