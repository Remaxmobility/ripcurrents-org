'use client'

import { useRef, useEffect, useState } from 'react'

function useInView(threshold = 0.1) {
  const ref  = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

const RESEARCH_AREAS = [
  {
    title: 'General Physical Processes',
    desc:  'Studying the physical mechanisms that create hazards — water movement, wave energy, and coastal topography — through both field studies and numerical modelling at various bodies of water.',
    tag:   'Field Research',
    color: '#0096C7',
  },
  {
    title: 'Climate Change Impact',
    desc:  'Investigating how rising water temperatures, lake level fluctuations, and increasing storm frequency affect the formation frequency and intensity of hazards in vulnerable coastal areas.',
    tag:   'Climate Science',
    color: '#00B4D8',
  },
  {
    title: 'Public Education Efficacy',
    desc:  'Researching the effectiveness of various public education campaigns on hazard safety — examining how different communication strategies influence beachgoer behaviour and understanding of risk.',
    tag:   'Behavioural Research',
    color: '#48CAE4',
  },
]

export default function Research() {
  const { ref, visible } = useInView()

  return (
    <section
      id="research"
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #010D1B 0%, #020F22 100%)' }}
    >
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,150,199,0.05) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Mission */}
          <div>
            <div className={`flex items-center gap-3 mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="w-8 h-px bg-ocean-teal" />
              <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">
                Our Mission
              </span>
            </div>

            <h2
              className={`text-display-lg text-white mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '150ms' }}
            >
              Evidence-based advocacy for safer coastal communities
            </h2>
            <p className="text-sm text-ocean-foam/70 font-body leading-relaxed">
              Join us in our mission to reduce the impact of hazards on people and the environment.
            </p>

            {/* Instagram CTA */}
            <div
              className={`mt-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '450ms' }}
            >
              <a
                href="https://www.instagram.com/coastal_hazard_info"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-ocean-blue/30 text-ocean-foam/70
                           hover:text-white hover:border-ocean-teal/50 transition-all duration-200 text-sm font-body"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                @coastal_hazard_info
              </a>
            </div>
          </div>

          {/* Right: Research areas */}
          <div>
            <div
              className={`flex items-center gap-3 mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '150ms' }}
            >
              <div className="w-8 h-px bg-ocean-teal" />
              <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">
                Active Research
              </span>
            </div>

            <div className="space-y-5">
              {RESEARCH_AREAS.map((area, i) => (
                <div
                  key={area.title}
                  className={`glass-card p-6 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                  style={{ transitionDelay: `${i * 120 + 300}ms`, borderColor: `${area.color}20` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-body font-semibold text-white text-base">{area.title}</h3>
                    <span
                      className="text-xs font-body font-medium px-3 py-1 rounded-full"
                      style={{ background: `${area.color}15`, color: area.color, border: `1px solid ${area.color}25` }}
                    >
                      {area.tag}
                    </span>
                  </div>
                  <p className="text-sm text-ocean-foam/60 font-body leading-relaxed">{area.desc}</p>
                </div>
              ))}
            </div>

            {/* Quote from advisor */}
            <div
              className={`mt-8 p-6 rounded-2xl border-l-4 border-ocean-teal transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
              style={{ transitionDelay: '600ms', background: 'rgba(0,119,182,0.05)' }}
            >
              <p className="text-ocean-foam/70 font-body text-sm leading-relaxed italic">
                &ldquo;Root-based advocacy that&apos;s very much needed.&rdquo;
              </p>
              <p className="text-xs text-ocean-teal font-body font-semibold mt-3">
                — [Advisor Name], Professor, [University Name]
                <span className="text-ocean-foam/40 font-normal"> · 20+ years hazard research</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
