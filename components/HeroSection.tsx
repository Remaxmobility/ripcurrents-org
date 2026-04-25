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

interface Props {
  subtitle?: string
  ctaPrimary?: string
  ctaSecondary?: string
  headline1?: string
  headline2?: string
  headline3?: string
}

export default function HeroSection({
  subtitle,
  ctaPrimary,
  ctaSecondary,
  headline1,
  headline2,
  headline3,
}: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  const line1 = headline1 || 'KNOW THE'
  const line2 = headline2 || 'CURRENT.'
  const line3 = headline3 || 'SAVE YOUR LIFE.'
  const sub   = subtitle   || 'Rip current education and awareness for the Great Lakes region and beyond — evidence-based research, public education, and advocacy to end preventable drowning.'
  const cta1  = ctaPrimary   || 'Learn to Survive'
  const cta2  = ctaSecondary || 'What Is a Rip Current?'

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

      {/* Content — absolutely centred in the space below the 80px nav */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        style={{ top: 80 }}
      >
        {/* Main heading */}
        <h1
          className={`text-display-xl text-white glow-text mb-4
                      transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '150ms' }}
        >
          <span className="block">{line1}</span>
          <span
            className="block"
            style={{ WebkitTextStroke: '2px #00B4D8', color: 'transparent', textShadow: 'none' }}
          >
            {line2}
          </span>
          <span className="block text-white" style={{ textShadow: '0 0 40px rgba(0,180,216,0.4)' }}>
            {line3}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`max-w-xl text-lg md:text-xl text-ocean-foam/80 font-body leading-relaxed mb-10
                      transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '300ms' }}
        >
          {sub}
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
            {cta1}
          </Link>
          <Link
            href="#what-is"
            className="px-8 py-4 rounded-full border border-ocean-teal/50 text-ocean-teal font-semibold font-body text-base
                       hover:bg-ocean-teal/10 hover:border-ocean-teal hover:scale-105
                       active:scale-100 transition-all duration-200 cursor-pointer"
          >
            {cta2}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-10 bg-gradient-to-b from-ocean-teal/60 to-transparent animate-scroll-hint" />
      </div>
    </section>
  )
}
