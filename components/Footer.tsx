import Link from 'next/link'
import Image from 'next/image'

const NAV = [
  { label: 'What Is a Rip Current', href: '#what-is' },
  { label: 'Survive: Flip Float Follow', href: '#survive' },
  { label: 'How to Identify One', href: '#identify' },
  { label: 'Our Research', href: '#research' },
  { label: 'Consulting & Services', href: '#contact' },
  { label: 'Resources', href: '/resources' },
]

const EXTERNAL = [
  { label: 'NOAA Rip Current Safety', href: 'https://oceanservice.noaa.gov/hazards/ripcurrents/' },
  { label: 'USLA Beach Safety', href: 'https://www.usla.org/page/BEACHSAFETY' },
  { label: 'Swim Drink Fish Canada', href: 'https://swimdrinkfish.ca' },
  { label: 'Lifesaving Society Canada', href: 'https://www.lifesaving.org' },
]

export default function Footer() {
  return (
    <footer className="relative bg-ocean-abyss border-t border-ocean-blue/15 overflow-hidden">
      {/* Top wave */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #0077B6 30%, #00B4D8 50%, #0077B6 70%, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <Image
                src="/favicon.ico"
                alt="RIP Currents logo"
                width={36}
                height={36}
                className="object-contain group-hover:brightness-125 transition-all duration-300"
                unoptimized
              />
              <div>
                <span className="font-display text-xl text-white tracking-widest">RIP CURRENTS</span>
                <span className="block text-xs text-ocean-teal/60 font-body tracking-wider -mt-1">
                  ripcurrents.org
                </span>
              </div>
            </Link>

            <p className="text-sm text-ocean-foam/50 font-body leading-relaxed max-w-sm mb-6">
              Endeavouring to create understanding of Great Lakes rip currents and end
              rip current-related drowning through evidence-based research, education, and advocacy.
            </p>

            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/ripcurrent_information_project"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-ocean-teal/50 hover:text-ocean-teal transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/ripcurrents.org"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-ocean-teal/50 hover:text-ocean-teal transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/ripcurrents-org"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-ocean-teal/50 hover:text-ocean-teal transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="2" y="9" width="4" height="12" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Site links */}
          <div>
            <h4 className="text-xs font-semibold font-body text-ocean-foam/40 uppercase tracking-widest mb-5">
              Learn
            </h4>
            <ul className="space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-body text-ocean-foam/55 hover:text-white transition-colors duration-200 animated-underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External resources */}
          <div>
            <h4 className="text-xs font-semibold font-body text-ocean-foam/40 uppercase tracking-widest mb-5">
              External Resources
            </h4>
            <ul className="space-y-3">
              {EXTERNAL.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-body text-ocean-foam/55 hover:text-white transition-colors duration-200
                               inline-flex items-center gap-1.5"
                  >
                    {l.label}
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3 opacity-50">
                      <path d="M 5 2 L 10 2 L 10 7 M 10 2 L 2 10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Safety reminder */}
        <div className="border border-danger-orange/20 rounded-2xl p-5 bg-danger-orange/5 mb-10">
          <p className="text-center text-sm font-body text-danger-orange/80 leading-relaxed">
            <strong className="text-danger-orange">⚠ ALWAYS CHECK BEACH CONDITIONS</strong> before entering the water.
            Obey all lifeguard instructions and posted warning flags. When in doubt, stay out.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-ocean-blue/10">
          <p className="text-xs text-ocean-foam/35 font-body">
            © {new Date().getFullYear()} Rip Current Information Project (RIP) · Port Stanley, Ontario, Canada
          </p>
          <p className="text-xs text-ocean-foam/25 font-body">
            Making access to rip current information easy.
          </p>
        </div>
      </div>
    </footer>
  )
}
