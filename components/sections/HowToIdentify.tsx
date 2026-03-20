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

const SIGNS = [
  {
    title: 'Gap in Breaking Waves',
    desc:  'Look for a section where waves do not break consistently — this is often a deeper channel where water is escaping seaward.',
    color: '#F97316',
  },
  {
    title: 'Discoloured Water',
    desc:  'A dark, greenish, or murky streak extending from shore out through the surf zone. The churning disrupts sediment and sand.',
    color: '#EF4444',
  },
  {
    title: 'Choppy, Churning Surface',
    desc:  'An agitated, confused-looking patch of water that looks rougher than the surrounding surf, often with small choppy waves in multiple directions.',
    color: '#F59E0B',
  },
  {
    title: 'Foam or Debris Moving Seaward',
    desc:  'A visible line of foam, seaweed, or floating debris moving steadily away from shore in a narrow corridor.',
    color: '#0096C7',
  },
  {
    title: 'Near Structures',
    desc:  'Rip currents frequently form adjacent to piers, jetties, groins, breakwaters, or rock outcroppings where water funnels.',
    color: '#00B4D8',
  },
  {
    title: 'Cusp Formations',
    desc:  'Concave, scalloped shapes in the shoreline (beach cusps) indicate where water is consistently returning seaward.',
    color: '#48CAE4',
  },
]

export default function HowToIdentify() {
  const { ref, visible } = useInView()

  return (
    <section id="identify" className="relative py-28 bg-ocean-deep overflow-hidden">
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #0077B6, transparent)' }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-3 mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="w-8 h-px bg-ocean-teal" />
            <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">
              Recognition
            </span>
            <div className="w-8 h-px bg-ocean-teal" />
          </div>

          <h2
            className={`text-display-lg text-white mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '100ms' }}
          >
            HOW TO{' '}
            <span style={{ WebkitTextStroke: '2px #00B4D8', color: 'transparent' }}>
              IDENTIFY
            </span>{' '}
            A RIP CURRENT
          </h2>

          <p
            className={`max-w-2xl mx-auto text-ocean-foam/70 font-body text-base leading-relaxed transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '200ms' }}
          >
            Rip currents are difficult to identify from water level. Always scout the beach from
            an elevated position — a dune, pier, or boardwalk — before entering the water. Look
            for these warning signs:
          </p>
        </div>

        {/* Signs grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SIGNS.map((sign, i) => (
            <div
              key={sign.title}
              className={`glass-card p-6 group cursor-default transition-all duration-700
                          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 80 + 300}ms`, borderColor: `${sign.color}25` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${sign.color}15`, border: `1px solid ${sign.color}30` }}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: sign.color }} />
              </div>
              <h3 className="font-body font-semibold text-white text-base mb-2">{sign.title}</h3>
              <p className="text-sm text-ocean-foam/60 font-body leading-relaxed">{sign.desc}</p>
            </div>
          ))}
        </div>

        {/* Pro tip */}
        <div
          className={`max-w-3xl mx-auto glass-card p-8 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="font-display text-ocean-teal text-3xl mb-4">PRO TIP</div>
          <p className="text-ocean-foam/80 font-body leading-relaxed text-base">
            The best way to learn to spot rip currents is through <strong className="text-white">hands-on
            education</strong>. Fluorescein dye — used in our field demonstrations — creates a vivid
            visual of current flow, revealing the exact channel and helping people recognize these
            patterns in real water. Ask your municipality or beach authority to arrange a demonstration.
          </p>
          <a
            href="#contact"
            className="inline-block mt-6 px-6 py-3 rounded-full border border-ocean-teal/40 text-ocean-teal text-sm
                       font-semibold font-body hover:bg-ocean-teal/10 hover:border-ocean-teal transition-all duration-200"
          >
            Book a Demonstration
          </a>
        </div>
      </div>
    </section>
  )
}
