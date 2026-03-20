import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ComedySpotlights from '@/components/ComedySpotlights'
import ComedyReserveForm from '@/components/ComedyReserveForm'

export const metadata: Metadata = {
  title: 'RiP Roaring Comedy Night – Fundraiser | RIP Currents Info',
  description:
    "Join us April 11, 2026 for a Yuk Yuk's comedy show fundraiser at Masonic Hall, Elgin. $50/ticket. 50/50 draw, cash bar. All proceeds support the Rip Current Information Project.",
  openGraph: {
    title: 'RiP Roaring Comedy Night – Making Waves in Elgin!',
    description: "April 11, 2026 · Masonic Hall · Yuk Yuk's Comedians · $50/ticket",
    url: 'https://www.ripcurrents.org/comedy-night',
    type: 'website',
  },
}

// ── Update names below once confirmed ───────────────────────────────────────
const COMEDIANS = [
  { name: 'DK Phan',     img: '/comedy/comedian-1.jpg', bio: "Yuk Yuk's featured comedian" },
  { name: 'Andrew Barr', img: '/comedy/comedian-2.jpg', bio: "Yuk Yuk's featured comedian" },
  { name: 'Chuck Byrn',  img: '/comedy/comedian-3.jpg', bio: "Yuk Yuk's featured comedian" },
]

const TICKET_URL = 'https://www.zeffy.com/en-CA/ticketing/rip-roaring-comedy-night'

export default function ComedyNightPage() {
  return (
    <>
      <Nav />
      <main className="bg-ocean-deep min-h-screen overflow-x-hidden">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

          {/* Static dark stage background */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 30%, #3D0A0A 0%, #1A0505 50%, #010810 100%)',
          }} />

          {/* Left curtain */}
          <div className="absolute top-0 left-0 w-2/5 h-full pointer-events-none" style={{
            background: 'linear-gradient(to right, #6B0000 0%, #4A0000 50%, transparent 100%)',
            clipPath: 'polygon(0 0, 85% 0, 55% 100%, 0 100%)',
            opacity: 0.6,
          }} />
          {/* Right curtain */}
          <div className="absolute top-0 right-0 w-2/5 h-full pointer-events-none" style={{
            background: 'linear-gradient(to left, #6B0000 0%, #4A0000 50%, transparent 100%)',
            clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 45% 100%)',
            opacity: 0.6,
          }} />

          {/* Animated spotlights */}
          <ComedySpotlights />

          {/* Curtain top valance */}
          <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" style={{
            background: 'linear-gradient(180deg, #4A0000 0%, #3D0000 60%, transparent 100%)',
            zIndex: 1,
          }} />

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-16">

            {/* Org badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-ocean-teal/30
                            bg-ocean-teal/10 text-ocean-teal text-xs font-semibold tracking-wider uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-ocean-teal animate-pulse-slow inline-block" />
              Rip Current Information Project · Fundraiser
            </div>

            {/* Title */}
            <h1 className="font-display leading-none mb-6">
              <span className="block text-white" style={{ fontSize: 'clamp(1.8rem,5vw,3.5rem)', letterSpacing: '0.1em' }}>
                RiP ROARING
              </span>
              <span className="block" style={{
                fontSize: 'clamp(4.5rem,15vw,11rem)',
                letterSpacing: '0.02em',
                background: 'linear-gradient(135deg, #FFE566 0%, #FFB800 40%, #FF6B00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 0.88,
                filter: 'drop-shadow(0 0 40px rgba(255,180,0,0.6))',
              }}>
                COMEDY
              </span>
              <span className="block text-white" style={{
                fontSize: 'clamp(2.5rem,9vw,6.5rem)',
                letterSpacing: '0.06em',
                lineHeight: 1,
                textShadow: '0 0 60px rgba(255,140,0,0.3)',
              }}>
                NIGHT
              </span>
            </h1>

            <p className="text-yellow-200/80 font-body text-lg md:text-xl italic mb-10 max-w-2xl mx-auto">
              "Making Waves in Elgin — Because the only thing that should take your breath away… is the comedy."
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <a
                href={TICKET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold font-body text-lg
                           transition-all duration-200 hover:scale-105 active:scale-100 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FFE566 0%, #FF8C00 100%)',
                  color: '#1A0505',
                  boxShadow: '0 0 50px rgba(255,165,0,0.45)',
                }}
              >
                🎟️ Get Tickets — $50
              </a>
              <a
                href="#reserve"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full border-2
                           font-bold font-body text-lg transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{ borderColor: 'rgba(255,200,0,0.5)', color: '#FFE566' }}
              >
                🪑 Reserve a Table of 8
              </a>
            </div>

            {/* Event quick-facts */}
            <div className="inline-grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden"
                 style={{ border: '1px solid rgba(255,200,0,0.15)', background: 'rgba(255,200,0,0.05)' }}>
              {[
                { icon: '📅', label: 'Date',  value: 'Saturday, April 11' },
                { icon: '🕗', label: 'Show',  value: '8:00 – 9:30 PM' },
                { icon: '🚪', label: 'Doors', value: 'Open at 7:30 PM' },
                { icon: '📍', label: 'Venue', value: 'Masonic Hall, Elgin' },
              ].map((f) => (
                <div key={f.label} className="px-6 py-4 text-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
                  <div className="text-2xl mb-1">{f.icon}</div>
                  <div className="text-xs text-yellow-200/40 font-body uppercase tracking-wider mb-0.5">{f.label}</div>
                  <div className="text-sm font-semibold text-white font-body">{f.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
               style={{ background: 'linear-gradient(to bottom, transparent, #010D1B)' }} />
        </section>

        {/* ── YUK YUK'S + DETAILS ───────────────────────────────────── */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(100,0,0,0.07) 0%, transparent 70%)',
          }} />

          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* Left: details */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-yellow-500" />
                  <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-yellow-500">
                    Event Details
                  </span>
                </div>
                <h2 className="font-display text-white mb-6" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
                  A RiP ROARING NIGHT{' '}
                  <span style={{ WebkitTextStroke: '2px #FFD700', color: 'transparent' }}>OF LAUGHTER</span>
                </h2>
                <p className="text-ocean-foam/75 font-body text-base leading-relaxed mb-8">
                  We're trading rip currents for punchlines! Join us for a night of professional stand-up comedy
                  from Yuk Yuk's Comics — Canada's premier comedy club. Come out, have a laugh, and help us
                  keep Great Lakes beaches safer this season.
                </p>

                <ul className="space-y-4 mb-10">
                  {[
                    { icon: '🎤', text: "Live stand-up from Yuk Yuk's professional comedians" },
                    { icon: '🍺', text: 'Cash bar available all evening' },
                    { icon: '🎰', text: '50/50 draw — you could win big!' },
                    { icon: '🪑', text: 'Tables of 8 available for group reservations' },
                    { icon: '🔞', text: 'Must be 19+ to attend' },
                    { icon: '💙', text: 'All proceeds support rip current safety education' },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-4">
                      <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                      <span className="text-ocean-foam/70 font-body text-base">{item.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="glass-card p-6" style={{ borderColor: 'rgba(255,200,0,0.15)' }}>
                  <div className="text-xs font-body font-semibold text-yellow-500 uppercase tracking-widest mb-3">Venue</div>
                  <div className="text-white font-semibold font-body text-lg">Masonic Hall</div>
                  <div className="text-ocean-foam/60 font-body text-sm">42703 Fruit Ridge Line, Elgin, Ontario</div>
                  <a
                    href="https://maps.google.com/?q=42703+Fruit+Ridge+Line+Elgin+Ontario"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-xs font-body font-semibold text-ocean-teal hover:text-ocean-light transition-colors"
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                      <path d="M8 1.5A4.5 4.5 0 0 0 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6A4.5 4.5 0 0 0 8 1.5z" />
                      <circle cx="8" cy="6" r="1.5" />
                    </svg>
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Right: Yuk Yuk's + ticket card */}
              <div className="flex flex-col items-center gap-8">
                {/* Yuk Yuk's logo */}
                <div className="relative w-52 h-52 rounded-full overflow-hidden flex-shrink-0"
                     style={{ border: '4px solid rgba(255,200,0,0.4)', boxShadow: '0 0 60px rgba(255,165,0,0.25)', background: '#1A0000' }}>
                  <Image
                    src="/comedy/yukyuks-logo.jpg"
                    alt="Yuk Yuk's International Stand-Up Comedy"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Ticket card */}
                <div className="w-full max-w-sm rounded-3xl overflow-hidden"
                     style={{ border: '1px solid rgba(255,200,0,0.2)', background: 'linear-gradient(135deg, rgba(100,0,0,0.25) 0%, rgba(0,0,0,0.6) 100%)' }}>
                  <div className="p-8 text-center" style={{ borderBottom: '1px dashed rgba(255,200,0,0.2)' }}>
                    <div className="text-yellow-400/60 font-body text-xs uppercase tracking-widest mb-2">General Admission</div>
                    <div className="font-display text-7xl text-yellow-400" style={{ filter: 'drop-shadow(0 0 20px rgba(255,165,0,0.5))' }}>
                      $50
                    </div>
                    <div className="text-white/50 font-body text-sm mt-1">per ticket</div>
                  </div>
                  <div className="p-6 space-y-3">
                    {[
                      { l: 'Date',  v: 'Saturday, April 11, 2026' },
                      { l: 'Show',  v: '8:00 – 9:30 PM' },
                      { l: 'Doors', v: '7:30 PM' },
                      { l: 'Age',   v: '19+ Only', danger: true },
                    ].map((r) => (
                      <div key={r.l} className="flex justify-between text-sm font-body">
                        <span className="text-white/50">{r.l}</span>
                        <span className={`font-semibold ${r.danger ? 'text-danger-orange' : 'text-white'}`}>{r.v}</span>
                      </div>
                    ))}
                    <a
                      href={TICKET_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full block text-center py-4 rounded-xl font-bold font-body text-base
                                 transition-all duration-200 hover:scale-105 cursor-pointer"
                      style={{ background: 'linear-gradient(135deg, #FFE566, #FF8C00)', color: '#1A0505', boxShadow: '0 4px 24px rgba(255,165,0,0.3)' }}
                    >
                      🎟️ Buy Tickets Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMEDIANS ─────────────────────────────────────────────── */}
        <section className="py-24 relative" style={{
          background: 'linear-gradient(180deg, #010D1B 0%, #1A0505 50%, #010D1B 100%)',
        }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-yellow-500" />
                <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-yellow-500">
                  Performing Live
                </span>
                <div className="w-8 h-px bg-yellow-500" />
              </div>
              <h2 className="font-display text-white" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
                MEET THE{' '}
                <span style={{ WebkitTextStroke: '2px #FFD700', color: 'transparent' }}>COMEDIANS</span>
              </h2>
              <p className="text-ocean-foam/60 font-body text-base mt-4 max-w-xl mx-auto">
                Hand-picked from Yuk Yuk's roster — Canada's home of professional stand-up comedy since 1976.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {COMEDIANS.map((c, i) => (
                <div key={i} className="group text-center">
                  {/* Portrait card — shows full face/upper body */}
                  <div
                    className="relative mx-auto mb-5 overflow-hidden rounded-2xl transition-all duration-300
                               group-hover:scale-[1.02]"
                    style={{
                      width: '100%',
                      maxWidth: '280px',
                      aspectRatio: '3/4',
                      border: '2px solid rgba(255,200,0,0.2)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                      background: 'radial-gradient(ellipse at 50% 30%, #3D1A1A 0%, #1A0505 60%, #0D0D18 100%)',
                    }}
                  >
                    <Image
                      src={c.img}
                      alt={c.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    {/* Gold spotlight overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                         style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,200,0,0.12) 0%, transparent 60%)' }} />
                    {/* Bottom gradient for name */}
                    <div className="absolute bottom-0 left-0 right-0 h-24"
                         style={{ background: 'linear-gradient(to top, rgba(20,3,3,0.9) 0%, transparent 100%)' }} />
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <div className="font-display text-white text-xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                        {c.name}
                      </div>
                      <div className="text-yellow-400/70 font-body text-xs mt-0.5">{c.bio}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TABLE RESERVATION ─────────────────────────────────────── */}
        <section id="reserve" className="py-24 bg-ocean-deep">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              {/* Left: info */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-yellow-500" />
                  <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-yellow-500">
                    Group Bookings
                  </span>
                </div>
                <h2 className="font-display text-white mb-6" style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>
                  RESERVE A{' '}
                  <span style={{ WebkitTextStroke: '2px #FFD700', color: 'transparent' }}>TABLE OF 8</span>
                </h2>
                <p className="text-ocean-foam/70 font-body text-base leading-relaxed mb-8">
                  Bring your crew! Tables of 8 are available for group reservations — perfect for a night
                  out with friends, a work team event, or a birthday celebration.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: '🪑', title: 'Table of 8', desc: '8 × $50 = $400 total · Reserved seating together' },
                    { icon: '🍺', title: 'Cash Bar',   desc: 'Full bar available throughout the evening' },
                    { icon: '🎰', title: '50/50 Draw', desc: 'Buy tickets at the door — half the pot is yours' },
                    { icon: '💙', title: 'Great Cause', desc: 'Every dollar supports Great Lakes beach safety' },
                  ].map((f) => (
                    <div key={f.title} className="glass-card p-4 flex gap-4 items-start" style={{ borderColor: 'rgba(255,200,0,0.1)' }}>
                      <span className="text-2xl flex-shrink-0">{f.icon}</span>
                      <div>
                        <div className="font-body font-semibold text-white text-sm">{f.title}</div>
                        <div className="font-body text-ocean-foam/55 text-xs mt-0.5">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: reservation form (client component) */}
              <ComedyReserveForm ticketUrl={TICKET_URL} />
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────── */}
        <section className="py-20 relative overflow-hidden" style={{
          background: 'linear-gradient(135deg, #3D0A0A 0%, #1A0505 50%, #010810 100%)',
        }}>
          <ComedySpotlights />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <div className="text-5xl mb-6">🌊🎤🌊</div>
            <h2 className="font-display text-white mb-4" style={{ fontSize: 'clamp(2rem,6vw,4rem)' }}>
              LET'S PACK THE HOUSE AND MAKE SOME POSITIVE WAVES!
            </h2>
            <p className="text-yellow-200/70 font-body text-lg mb-10 max-w-2xl mx-auto">
              It's going to be a shore thing. Come out, have a laugh, and help us keep Great Lakes beaches
              safer this season.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={TICKET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold font-body text-lg
                           transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FFE566, #FF8C00)',
                  color: '#1A0505',
                  boxShadow: '0 0 50px rgba(255,165,0,0.35)',
                }}
              >
                🎟️ Buy Tickets — $50
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full border
                           text-ocean-teal font-semibold font-body text-base hover:bg-ocean-teal/10
                           transition-all duration-200 hover:scale-105"
                style={{ borderColor: 'rgba(0,180,216,0.4)' }}
              >
                ← Back to ripcurrents.org
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
