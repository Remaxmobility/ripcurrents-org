'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

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

const SERVICES = [
  {
    title: 'Municipal Consulting',
    desc:  'We consult with your municipality or beach authority to identify lapses in current policy, signage, and rescue procedures around rip current risk — and help build a professional response.',
    cta:   'Reach Out',
    color: '#0096C7',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <rect x="2" y="18" width="28" height="12" rx="2" stroke="#0096C7" strokeWidth="1.5" />
        <path d="M 6 18 L 6 10 Q 6 2 16 2 Q 26 2 26 10 L 26 18" stroke="#0096C7" strokeWidth="1.5" />
        <rect x="13" y="22" width="6" height="8" rx="1" stroke="#0096C7" strokeWidth="1.5" />
        <line x1="10" y1="12" x2="22" y2="12" stroke="#0096C7" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Organization Education',
    desc:  'We work with beach management organizations, lifeguard services, and water safety groups to implement evidence-based rip current safety programs and save lives through education.',
    cta:   'Partner With Us',
    color: '#00B4D8',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <circle cx="10" cy="8" r="5" stroke="#00B4D8" strokeWidth="1.5" />
        <circle cx="22" cy="8" r="5" stroke="#00B4D8" strokeWidth="1.5" />
        <path d="M 1 28 Q 4 18 10 18 Q 16 18 16 22" stroke="#00B4D8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M 16 22 Q 17 18 22 18 Q 28 18 31 28" stroke="#00B4D8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    title: 'Stakeholder Presentations',
    desc:  'We present to government committees, conservation authorities, tourism boards, and community groups — educating stakeholders on current research, rip current formation, and best safety practices.',
    cta:   'Book a Presentation',
    color: '#48CAE4',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <rect x="2" y="4" width="28" height="20" rx="3" stroke="#48CAE4" strokeWidth="1.5" />
        <line x1="16" y1="24" x2="16" y2="29" stroke="#48CAE4" strokeWidth="1.5" />
        <line x1="10" y1="29" x2="22" y2="29" stroke="#48CAE4" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 8 12 L 14 8 L 14 16 Z" fill="#48CAE4" opacity="0.7" />
        <line x1="16" y1="10" x2="24" y2="10" stroke="#48CAE4" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="14" x2="22" y2="14" stroke="#48CAE4" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Field Demonstrations',
    desc:  'Using fluorescein dye — an environmentally safe tracer — we create vivid visual demonstrations of rip current flow patterns at your beach, building intuitive recognition skills in participants.',
    cta:   'Schedule a Demo',
    color: '#F97316',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M 16 3 Q 22 10 22 18 A 6 6 0 0 1 10 18 Q 10 10 16 3 Z" stroke="#F97316" strokeWidth="1.5" fill="none" />
        <path d="M 12 20 Q 16 16 20 20" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="16" cy="21" r="2" fill="#F97316" opacity="0.7" />
      </svg>
    ),
  },
]

export default function Services() {
  const { ref, visible } = useInView()

  return (
    <section className="relative py-28 bg-ocean-deep overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(0,119,182,0.06) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-3 mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="w-8 h-px bg-ocean-teal" />
            <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">
              How We Help
            </span>
            <div className="w-8 h-px bg-ocean-teal" />
          </div>

          <h2
            className={`text-display-lg text-white mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '100ms' }}
          >
            CONSULTING &amp;{' '}
            <span style={{ WebkitTextStroke: '2px #00B4D8', color: 'transparent' }}>
              PARTNERSHIP
            </span>
          </h2>

          <p
            className={`max-w-2xl mx-auto text-ocean-foam/70 font-body text-base leading-relaxed transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '200ms' }}
          >
            We&apos;ll consult with your team or organization to help find ways to protect lives —
            working with municipalities and governments to pinpoint lapses in policy and procedure around water safety.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.title}
              className={`glass-card p-8 group transition-all duration-700
                          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 100 + 300}ms`, borderColor: `${svc.color}20` }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6
                           transition-all duration-300 group-hover:scale-110"
                style={{ background: `${svc.color}10`, border: `1px solid ${svc.color}25` }}
              >
                {svc.icon}
              </div>

              <h3 className="font-body font-semibold text-white text-lg mb-3">{svc.title}</h3>
              <p className="text-sm text-ocean-foam/60 font-body leading-relaxed mb-6">{svc.desc}</p>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold font-body transition-colors duration-200"
                style={{ color: svc.color }}
              >
                {svc.cta}
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                  <path d="M 3 8 L 13 8 M 9 4 L 13 8 L 9 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Partnership banner */}
        <div
          className={`relative overflow-hidden rounded-3xl p-10 md:p-14 text-center transition-all duration-700
                      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{
            transitionDelay: '600ms',
            background: 'linear-gradient(135deg, rgba(0,96,199,0.15) 0%, rgba(0,36,73,0.8) 100%)',
            border: '1px solid rgba(0,180,216,0.2)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 50% 80% at 50% 50%, rgba(0,150,199,0.08) 0%, transparent 70%)' }}
          />
          <div className="relative z-10">
            <div className="font-display text-3xl md:text-4xl text-white mb-4 glow-text">
              MAKING ACCESS TO RIP CURRENT INFORMATION EASY
            </div>
            <p className="text-ocean-foam/70 font-body text-base leading-relaxed max-w-2xl mx-auto mb-8">
              Reach out to learn more about partnership opportunities. Whether you&apos;re a municipality,
              conservation authority, lifeguard service, or community organization — let&apos;s work together.
            </p>
            <Link
              href="#contact"
              className="inline-block px-10 py-4 rounded-full bg-danger-gradient text-white font-semibold font-body text-base
                         shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105
                         active:scale-100 transition-all duration-200"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
