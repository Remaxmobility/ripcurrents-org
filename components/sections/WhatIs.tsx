'use client'

import { useRef, useEffect, useState } from 'react'

function useInView(threshold = 0.15) {
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

// Animated rip-current diagram (pure CSS/SVG)
function RipCurrentDiagram() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] select-none">
      <svg viewBox="0 0 480 360" className="w-full h-full" role="img" aria-label="Diagram showing how a rip current forms">
        {/* Ocean body */}
        <defs>
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0096C7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#002A4A" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="ripGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#001529" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#000C1A" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#00B4D8" />
          </marker>
          <marker id="arrowRip" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#F97316" />
          </marker>
        </defs>

        {/* Ocean fill */}
        <rect x="0" y="60" width="480" height="240" fill="url(#oceanGrad)" rx="4" />

        {/* Shore */}
        <rect x="0" y="285" width="480" height="75" fill="#1A3A2A" rx="0" />
        <rect x="0" y="280" width="480" height="12" fill="#2D5A3D" />
        <text x="240" y="330" textAnchor="middle" fill="#6EE7A0" fontSize="13" fontFamily="Source Sans 3,sans-serif" fontWeight="600">
          SHORELINE / BEACH
        </text>

        {/* Rip current channel */}
        <rect x="200" y="60" width="80" height="230" fill="url(#ripGrad)" opacity="0.85" />
        <text x="240" y="52" textAnchor="middle" fill="#F97316" fontSize="11" fontFamily="Source Sans 3,sans-serif" fontWeight="700" filter="url(#glow)">
          RIP CURRENT CHANNEL
        </text>

        {/* Breaking waves on sides */}
        {[1, 2, 3].map((i) => (
          <g key={i} opacity={0.4 + i * 0.1}>
            <path
              d={`M 30 ${90 + i * 30} Q 80 ${80 + i * 30} 130 ${90 + i * 30} Q 170 ${100 + i * 30} 200 ${90 + i * 30}`}
              stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"
            />
            <path
              d={`M 280 ${90 + i * 30} Q 320 ${80 + i * 30} 370 ${90 + i * 30} Q 420 ${100 + i * 30} 470 ${90 + i * 30}`}
              stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"
            />
          </g>
        ))}

        {/* Wave labels */}
        <text x="100" y="78" textAnchor="middle" fill="white" fontSize="10" fontFamily="Source Sans 3,sans-serif" opacity="0.7">
          BREAKING WAVES
        </text>
        <text x="370" y="78" textAnchor="middle" fill="white" fontSize="10" fontFamily="Source Sans 3,sans-serif" opacity="0.7">
          BREAKING WAVES
        </text>

        {/* Longshore current arrows (feeding the rip) */}
        <line x1="60" y1="230" x2="185" y2="230" stroke="#00B4D8" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrow)" />
        <line x1="420" y1="230" x2="295" y2="230" stroke="#00B4D8" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrow)" />
        <text x="110" y="248" fill="#48CAE4" fontSize="9" fontFamily="Source Sans 3,sans-serif">
          LONGSHORE CURRENT
        </text>
        <text x="300" y="248" fill="#48CAE4" fontSize="9" fontFamily="Source Sans 3,sans-serif">
          LONGSHORE CURRENT
        </text>

        {/* Rip current flow arrows (seaward) */}
        <line x1="240" y1="265" x2="240" y2="110" stroke="#F97316" strokeWidth="3" markerEnd="url(#arrowRip)" filter="url(#glow)" />
        <line x1="220" y1="220" x2="220" y2="130" stroke="#F97316" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arrowRip)" />
        <line x1="260" y1="220" x2="260" y2="130" stroke="#F97316" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arrowRip)" />

        {/* Swimmer icon */}
        <g transform="translate(310, 180)">
          <circle cx="0" cy="-20" r="8" fill="#F97316" opacity="0.9" />
          <path d="M 0 -12 L 0 8 M -10 -4 L 10 -4 M 0 8 L -8 22 M 0 8 L 8 22"
            stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
          <path d="M -18 50 Q -5 38 8 50" stroke="#F97316" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
          <text x="16" y="-16" fill="#FED7AA" fontSize="9" fontFamily="Source Sans 3,sans-serif">DANGER</text>
        </g>

        {/* Head above the rip */}
        <g transform="translate(240, 170)">
          <circle cx="0" cy="0" r="7" fill="#FBBF24" opacity="0.8" />
          <text x="14" y="4" fill="#FEF08A" fontSize="9" fontFamily="Source Sans 3,sans-serif">YOU →</text>
        </g>
      </svg>
    </div>
  )
}

export default function WhatIs() {
  const { ref, visible } = useInView()

  return (
    <section id="what-is" className="relative py-28 bg-ocean-deep overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,119,182,0.08) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div className={`flex items-center gap-3 mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="w-8 h-px bg-ocean-teal" />
          <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">
            The Hazard
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h2
              className={`text-display-lg text-white mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '100ms' }}
            >
              WHAT IS A{' '}
              <span style={{ WebkitTextStroke: '2px #00B4D8', color: 'transparent' }}>
                RIP CURRENT?
              </span>
            </h2>

            <div
              className={`space-y-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <p className="text-lg text-ocean-foam/80 font-body leading-relaxed">
                A rip current is a <strong className="text-ocean-teal">powerful, concentrated channel
                of water</strong> — a focused current that flows from the shore through the breaking
                waves and out past them.
              </p>
              <p className="text-base text-ocean-foam/70 font-body leading-relaxed">
                They form when water pushed toward shore by waves escapes through a gap or channel,
                often near sandbars, piers, jetties, or natural gaps. The water rushes outward in a
                narrow stream at speeds reaching <strong className="text-white">8 feet per second</strong> —
                faster than any Olympic swimmer can sprint.
              </p>
              <p className="text-base text-ocean-foam/70 font-body leading-relaxed">
                They are <strong className="text-danger-orange">not undertows</strong>. A rip current
                moves parallel to the surface, outward from shore — it will not pull you underwater.
                But it will exhaust you if you fight it.
              </p>
            </div>

            {/* Key facts */}
            <div
              className={`mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '350ms' }}
            >
              {[
                { icon: '⚡', title: 'Up to 8 ft/sec', desc: 'Speed of a rip current — faster than elite swimmers' },
                { icon: '👁', title: 'Hard to see', desc: 'Invisible from water level; must be spotted from elevated ground' },
                { icon: '🌊', title: 'All coasts', desc: 'Occurs on ocean beaches, but also Great Lakes, bays, and inlets' },
                { icon: '📅', title: 'Year-round', desc: 'Not just summer — any wave-influenced body of water, any season' },
              ].map((f) => (
                <div key={f.title} className="glass-card p-4 flex gap-4 items-start">
                  <span className="text-2xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-white font-body">{f.title}</div>
                    <div className="text-xs text-ocean-foam/60 font-body mt-0.5 leading-snug">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diagram */}
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <RipCurrentDiagram />
            <p className="text-center text-xs text-ocean-foam/40 font-body mt-3">
              Diagram: How a rip current forms between breaking waves
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
