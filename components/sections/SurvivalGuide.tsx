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

const STEPS = [
  {
    number: '01',
    word:   'FLIP',
    color:  '#0096C7',
    glow:   'rgba(0,150,199,0.4)',
    title:  'Flip onto your back',
    body:   `The moment you feel a rip current pulling you, flip onto your back immediately.
             Fighting it head-on wastes energy. On your back, the current does not pose an
             immediate drowning risk — you can breathe, float, and think.`,
    sub:    'Do NOT fight the current. Do NOT swim directly to shore.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 mx-auto">
        <circle cx="32" cy="10" r="7" stroke="#0096C7" strokeWidth="2" />
        <path d="M 18 32 Q 32 18 46 32" stroke="#0096C7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 10 40 Q 20 30 32 38 Q 44 46 54 36" stroke="#0096C7" strokeWidth="2" strokeDasharray="4,3" strokeLinecap="round" fill="none" />
        <circle cx="32" cy="45" r="3" fill="#0096C7" opacity="0.5" />
      </svg>
    ),
  },
  {
    number: '02',
    word:   'FLOAT',
    color:  '#00B4D8',
    glow:   'rgba(0,180,216,0.4)',
    title:  'Float calmly — conserve energy',
    body:   `Allow the current to carry you. Rip currents are typically narrow and will release
             you within 50–100 metres of shore. Floating conserves energy, keeps your head above
             water, and gives you time to signal for help. Raise one arm to alert lifeguards or
             beachgoers.`,
    sub:    'Shout and wave ONE arm high to signal for help.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 mx-auto">
        <ellipse cx="32" cy="36" rx="20" ry="8" stroke="#00B4D8" strokeWidth="2" strokeDasharray="5,3" />
        <circle cx="32" cy="22" r="7" stroke="#00B4D8" strokeWidth="2" />
        <path d="M 12 38 Q 22 32 32 36 Q 42 40 52 34" stroke="#00B4D8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 46 20 L 50 10" stroke="#00B4D8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="9" r="2" fill="#00B4D8" opacity="0.6" />
      </svg>
    ),
  },
  {
    number: '03',
    word:   'FOLLOW',
    color:  '#48CAE4',
    glow:   'rgba(72,202,228,0.4)',
    title:  'Follow the waves back to shore',
    body:   `Once the current weakens (outside the surf zone), swim at an angle — parallel to
             shore first to exit the channel, then follow the breaking waves diagonally back to
             the beach. If you cannot make it back, keep floating and call for help until a
             lifeguard or rescuer reaches you.`,
    sub:    'Swim parallel to shore first, then diagonally toward beach.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 mx-auto">
        <path d="M 8 40 Q 20 30 32 38 Q 44 46 56 36" stroke="#48CAE4" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 32 38 L 20 52" stroke="#48CAE4" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#a3)" />
        <path d="M 48 52 L 16 52" stroke="#48CAE4" strokeWidth="2" strokeLinecap="round" strokeDasharray="4,3" />
        <circle cx="32" cy="24" r="7" stroke="#48CAE4" strokeWidth="2" />
        <path d="M 48 52 L 42 46 M 48 52 L 42 58" stroke="#48CAE4" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function SurvivalGuide() {
  const { ref, visible } = useInView()

  return (
    <section
      id="survive"
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #010D1B 0%, #020F20 50%, #010D1B 100%)' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,119,182,0.06) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-3 mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="w-8 h-px bg-danger-orange" />
            <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-danger-orange">
              Survival Protocol
            </span>
            <div className="w-8 h-px bg-danger-orange" />
          </div>

          <h2
            className={`text-display-lg text-white mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '100ms' }}
          >
            IF YOU&apos;RE CAUGHT IN A{' '}
            <span style={{ WebkitTextStroke: '2px #F97316', color: 'transparent' }}>
              RIP CURRENT
            </span>
          </h2>

          <div
            className={`inline-block px-8 py-4 rounded-2xl danger-card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <p className="text-4xl md:text-5xl font-display tracking-[0.15em] text-danger-orange danger-glow">
              FLIP · FLOAT · FOLLOW
            </p>
            <p className="text-sm text-ocean-foam/60 font-body mt-2">
              Three steps that save lives — remember them before you enter the water
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px"
            style={{ background: 'linear-gradient(90deg, #0096C7, #00B4D8, #48CAE4)' }}
          />

          {STEPS.map((step, i) => (
            <div
              key={step.word}
              className={`relative glass-card p-8 text-center transition-all duration-700
                          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 150 + 300}ms`, borderColor: `${step.color}30` }}
            >
              {/* Number badge */}
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center
                           text-xs font-display border"
                style={{ background: '#010D1B', borderColor: step.color, color: step.color }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-6 mt-2">{step.icon}</div>

              {/* Word */}
              <div
                className="font-display text-5xl mb-3"
                style={{ color: step.color, textShadow: `0 0 30px ${step.glow}` }}
              >
                {step.word}
              </div>

              <h3 className="font-body font-semibold text-white text-base mb-3">{step.title}</h3>
              <p className="text-sm text-ocean-foam/65 font-body leading-relaxed mb-4">{step.body}</p>

              <div
                className="inline-block px-4 py-2 rounded-lg text-xs font-semibold font-body"
                style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}
              >
                {step.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Warning callout */}
        <div
          className={`mt-16 max-w-3xl mx-auto p-6 rounded-2xl border border-danger-orange/30
                      bg-danger-orange/5 text-center transition-all duration-700
                      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <p className="text-danger-orange font-display text-2xl mb-2">⚠ NEVER PANIC</p>
          <p className="text-ocean-foam/70 font-body text-sm leading-relaxed">
            Most rip current fatalities are caused by exhaustion from fighting the current — not
            from being pulled underwater. Stay calm. Float. Signal. Let the current carry you clear,
            then swim diagonally to shore.
          </p>
        </div>
      </div>
    </section>
  )
}
