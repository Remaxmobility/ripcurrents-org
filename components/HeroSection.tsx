'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse at 50% 70%, #0A2540 0%, #010D1B 60%, #010810 100%)',
      }}
    />
  ),
})

const STATS = [
  { value: '71', label: 'avg. U.S. rip current deaths per year' },
  { value: '80%', label: 'of all beach rescue operations' },
  { value: '60K+', label: 'people rescued annually' },
]

export default function HeroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative w-full h-screen min-h-[640px] overflow-hidden">
      {/* 3D Ocean Canvas */}
      <HeroScene />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-hero-overlay pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, rgba(1,8,16,0.5) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Alert badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-danger-orange/40
                      bg-danger-orange/10 text-danger-orange text-xs font-semibold tracking-wider uppercase
                      mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0ms' }}
        >
          <span className="w-2 h-2 rounded-full bg-danger-orange animate-pulse-slow inline-block" />
          Great Lakes Rip Current Awareness
        </div>

        {/* Main heading */}
        <h1
          className={`text-display-xl text-white glow-text mb-4
                      transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '150ms' }}
        >
          <span className="block">KNOW THE</span>
          <span
            className="block"
            style={{
              WebkitTextStroke: '2px #00B4D8',
              color: 'transparent',
              textShadow: 'none',
            }}
          >
            CURRENT.
          </span>
          <span className="block text-white" style={{ textShadow: '0 0 40px rgba(0,180,216,0.4)' }}>
            SAVE YOUR LIFE.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`max-w-xl text-lg md:text-xl text-ocean-foam/80 font-body leading-relaxed mb-10
                      transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '300ms' }}
        >
          Rip current education and awareness for the Great Lakes and beyond —
          evidence-based research, public education, and advocacy to end preventable drowning.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-700
                      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '450ms' }}
        >
          <Link
            href="#survive"
            className="px-8 py-4 rounded-full bg-danger-gradient text-white font-semibold font-body text-base
                       shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105
                       active:scale-100 transition-all duration-200 cursor-pointer"
          >
            Learn to Survive
          </Link>
          <Link
            href="#what-is"
            className="px-8 py-4 rounded-full border border-ocean-teal/50 text-ocean-teal font-semibold font-body text-base
                       hover:bg-ocean-teal/10 hover:border-ocean-teal hover:scale-105
                       active:scale-100 transition-all duration-200 cursor-pointer"
          >
            What Is a Rip Current?
          </Link>
        </div>

        {/* Quick stats row */}
        <div
          className={`mt-16 flex flex-col sm:flex-row gap-8 sm:gap-16 transition-all duration-700
                      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '600ms' }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl text-danger-orange danger-glow">
                {s.value}
              </div>
              <div className="text-xs text-ocean-foam/50 font-body max-w-[140px] mx-auto leading-tight mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs text-ocean-foam/40 font-body tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-ocean-teal/60 to-transparent animate-scroll-hint" />
      </div>
    </section>
  )
}
