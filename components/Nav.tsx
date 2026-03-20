'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const links = [
  { label: 'What Is It',  href: '#what-is' },
  { label: 'Survive',     href: '#survive' },
  { label: 'Identify',    href: '#identify' },
  { label: 'Research',    href: '#research' },
  { label: 'Resources',   href: '/resources' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ocean-deep/90 backdrop-blur-md border-b border-ocean-blue/20 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            {/* Wave icon SVG */}
            <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
              <circle cx="18" cy="18" r="17" stroke="#00B4D8" strokeWidth="1.5" />
              <path
                d="M4 20 Q9 14 14 20 Q19 26 24 20 Q29 14 32 20"
                stroke="#00B4D8"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                className="group-hover:stroke-ocean-foam transition-colors duration-300"
              />
              <path
                d="M4 24 Q9 18 14 24 Q19 30 24 24 Q29 18 32 24"
                stroke="#0077B6"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>
          <div>
            <span className="font-display text-xl text-white tracking-widest">
              RIP CURRENTS
            </span>
            <span className="block text-xs text-ocean-teal/70 font-body tracking-wider -mt-1">
              ripcurrents.org
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-body font-medium text-ocean-foam/70 hover:text-white transition-colors duration-200 animated-underline"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://www.instagram.com/ripcurrent_information_project"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-ocean-teal/60 hover:text-ocean-teal transition-colors duration-200"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4.5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <Link
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-danger-gradient text-white text-sm font-semibold font-body
                       hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-100
                       transition-all duration-200 cursor-pointer"
          >
            Get Involved
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-ocean-foam/80 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-ocean-deep/95 backdrop-blur-md border-t border-ocean-blue/20 px-6 py-6">
          <ul className="flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-body text-ocean-foam/80 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-6 block text-center px-6 py-3 rounded-full bg-danger-gradient text-white font-semibold font-body"
          >
            Get Involved
          </Link>
        </div>
      )}
    </header>
  )
}
