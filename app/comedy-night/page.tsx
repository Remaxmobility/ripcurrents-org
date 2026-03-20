import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'RiP Roaring Comedy Night – Fundraiser | RIP Currents Info',
  description:
    'Join us April 11, 2026 for a Yuk Yuk\'s comedy show fundraiser at Masonic Hall, Elgin. $50/ticket. 50/50 draw, cash bar. All proceeds support the Rip Current Information Project.',
  openGraph: {
    title: 'RiP Roaring Comedy Night – Making Waves in Elgin!',
    description: 'April 11, 2026 · Masonic Hall · Yuk Yuk\'s Comedians · $50/ticket',
    url: 'https://www.ripcurrents.org/comedy-night',
    type: 'website',
  },
}

const COMEDIANS = [
  {
    name: 'Comedian 1',
    img: '/comedy/comedian-1.jpg',
    bio: 'Yuk Yuk\'s featured comedian',
  },
  {
    name: 'Comedian 2',
    img: '/comedy/comedian-2.jpg',
    bio: 'Yuk Yuk\'s featured comedian',
  },
  {
    name: 'Comedian 3',
    img: '/comedy/comedian-3.jpg',
    bio: 'Yuk Yuk\'s featured comedian',
  },
]

const TICKET_URL = 'https://www.zeffy.com/en-CA/ticketing/rip-roaring-comedy-night'

export default function ComedyNightPage() {
  return (
    <>
      <Nav />
      <main className="bg-ocean-deep min-h-screen overflow-x-hidden">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Curtain background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 80% 70% at 50% 40%, #3D0A0A 0%, #1A0505 50%, #010810 100%)',
            }} />
            {/* Left curtain drape */}
            <div className="absolute top-0 left-0 w-1/3 h-full opacity-40" style={{
              background: 'linear-gradient(to right, #8B0000 0%, #6B0000 40%, transparent 100%)',
              clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 100%)',
            }} />
            {/* Right curtain drape */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-40" style={{
              background: 'linear-gradient(to left, #8B0000 0%, #6B0000 40%, transparent 100%)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 30% 100%)',
            }} />
            {/* Spotlight beam */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-full opacity-20" style={{
              background: 'linear-gradient(180deg, #FFF8E1 0%, rgba(255,248,225,0.3) 40%, transparent 80%)',
              clipPath: 'polygon(30% 0, 70% 0, 90% 100%, 10% 100%)',
            }} />
            {/* Stage floor glow */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(180,20,20,0.2) 0%, transparent 70%)',
            }} />
          </div>

          {/* Stars */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-yellow-300 animate-pulse-slow"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                top: Math.random() * 60 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.6 + 0.2,
                animationDelay: Math.random() * 3 + 's',
              }}
            />
          ))}

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-20">
            {/* Org badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-ocean-teal/30
                            bg-ocean-teal/10 text-ocean-teal text-xs font-semibold tracking-wider uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-ocean-teal animate-pulse-slow inline-block" />
              Rip Current Information Project · Fundraiser
            </div>

            {/* Title */}
            <h1 className="font-display leading-none mb-6">
              <span className="block text-white" style={{ fontSize: 'clamp(2rem,6vw,4rem)', letterSpacing: '0.08em' }}>
                RiP ROARING
              </span>
              <span
                className="block"
                style={{
                  fontSize: 'clamp(4rem,14vw,10rem)',
                  letterSpacing: '0.02em',
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6B35 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 0.9,
                  filter: 'drop-shadow(0 0 30px rgba(255,165,0,0.5))',
                }}
              >
                COMEDY
              </span>
              <span className="block text-white" style={{ fontSize: 'clamp(3rem,10vw,7rem)', letterSpacing: '0.04em', lineHeight: 0.95 }}>
                NIGHT
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-yellow-200/80 font-body text-lg md:text-xl italic mb-10 max-w-2xl mx-auto">
              "Making Waves in Elgin — Because the only thing that should take your breath away… is the comedy."
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <a
                href={TICKET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full text-white font-bold font-body text-lg
                           transition-all duration-200 hover:scale-105 active:scale-100 shadow-2xl cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                  color: '#1A0505',
                  boxShadow: '0 0 40px rgba(255,165,0,0.4)',
                }}
              >
                🎟️ Get Tickets — $50
              </a>
              <a
                href="#reserve"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full border-2 border-yellow-400/60
                           text-yellow-300 font-bold font-body text-lg hover:bg-yellow-400/10 hover:border-yellow-400
                           transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                🪑 Reserve a Table of 8
              </a>
            </div>

            {/* Event quick-facts */}
            <div className="inline-grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10"
                 style={{ background: 'rgba(255,255,255,0.04)' }}>
              {[
                { icon: '📅', label: 'Date', value: 'Saturday, April 11' },
                { icon: '🕗', label: 'Show', value: '8:00 – 9:30 PM' },
                { icon: '🚪', label: 'Doors', value: 'Open at 7:30 PM' },
                { icon: '📍', label: 'Venue', value: 'Masonic Hall, Elgin' },
              ].map((f) => (
                <div key={f.label} className="px-6 py-4 text-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
                  <div className="text-2xl mb-1">{f.icon}</div>
                  <div className="text-xs text-white/40 font-body uppercase tracking-wider mb-0.5">{f.label}</div>
                  <div className="text-sm font-semibold text-white font-body">{f.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
               style={{ background: 'linear-gradient(to bottom, transparent, #010D1B)' }} />
        </section>

        {/* ── YUK YUK'S + DETAILS ───────────────────────────────────── */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
               style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,0,0,0.06) 0%, transparent 70%)' }} />

          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Details */}
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
                  from Yuk Yuk's Comics, Canada's premier comedy club. Come out, have a laugh, and help us
                  keep Great Lakes beaches safer this season.
                </p>

                {/* Feature list */}
                <ul className="space-y-4 mb-10">
                  {[
                    { icon: '🎤', text: 'Live stand-up from Yuk Yuk\'s professional comedians' },
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

                {/* Venue box */}
                <div className="glass-card p-6 border-yellow-500/20">
                  <div className="text-xs font-body font-semibold text-yellow-500 uppercase tracking-widest mb-3">Venue</div>
                  <div className="text-white font-semibold font-body text-lg">Masonic Hall</div>
                  <div className="text-ocean-foam/60 font-body text-sm">42703 Fruit Ridge Line, Elgin, Ontario</div>
                  <div className="mt-4 flex gap-3">
                    <a
                      href="https://maps.google.com/?q=42703+Fruit+Ridge+Line+Elgin+Ontario"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-body font-semibold text-ocean-teal
                                 hover:text-ocean-light transition-colors"
                    >
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                        <path d="M8 1.5A4.5 4.5 0 0 0 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6A4.5 4.5 0 0 0 8 1.5z" />
                        <circle cx="8" cy="6" r="1.5" />
                      </svg>
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Yuk Yuk's logo + ticket info */}
              <div className="flex flex-col items-center gap-8">
                {/* Yuk Yuk's logo */}
                <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-yellow-500/30
                               shadow-2xl shadow-yellow-500/20">
                  <Image
                    src="/comedy/yukyuks-logo.jpg"
                    alt="Yuk Yuk's International Stand-Up Comedy"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Ticket card */}
                <div className="w-full max-w-sm rounded-3xl overflow-hidden border border-yellow-500/20"
                     style={{ background: 'linear-gradient(135deg, rgba(139,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)' }}>
                  {/* Ticket top */}
                  <div className="p-8 text-center border-b border-dashed border-yellow-500/20">
                    <div className="text-yellow-400/60 font-body text-xs uppercase tracking-widest mb-2">General Admission</div>
                    <div className="font-display text-7xl text-yellow-400" style={{ filter: 'drop-shadow(0 0 20px rgba(255,165,0,0.5))' }}>
                      $50
                    </div>
                    <div className="text-white/60 font-body text-sm mt-1">per ticket</div>
                  </div>
                  {/* Ticket bottom */}
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-white/50">Date</span>
                      <span className="text-white font-semibold">Saturday, April 11, 2026</span>
                    </div>
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-white/50">Time</span>
                      <span className="text-white font-semibold">8:00 – 9:30 PM</span>
                    </div>
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-white/50">Doors</span>
                      <span className="text-white font-semibold">7:30 PM</span>
                    </div>
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-white/50">Age</span>
                      <span className="text-danger-orange font-semibold">19+ Only</span>
                    </div>
                    <a
                      href={TICKET_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full block text-center py-4 rounded-xl font-bold font-body text-base
                                 transition-all duration-200 hover:scale-105 cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
                        color: '#1A0505',
                        boxShadow: '0 4px 24px rgba(255,165,0,0.3)',
                      }}
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
        <section className="py-24 relative"
                 style={{ background: 'linear-gradient(180deg, #010D1B 0%, #1A0505 50%, #010D1B 100%)' }}>
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
                  {/* Photo */}
                  <div className="relative w-52 h-52 mx-auto mb-6 rounded-full overflow-hidden
                                  border-4 border-yellow-500/20 group-hover:border-yellow-500/60
                                  shadow-xl shadow-black/50 transition-all duration-300
                                  group-hover:shadow-yellow-500/20 group-hover:scale-105">
                    <Image
                      src={c.img}
                      alt={c.name}
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                    {/* Spotlight overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                         style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,220,0,0.15) 0%, transparent 60%)' }} />
                  </div>
                  <h3 className="font-display text-white text-2xl mb-1">{c.name}</h3>
                  <p className="text-yellow-500/70 font-body text-sm">{c.bio}</p>
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
                  out with friends, a work team event, or a birthday celebration. Contact us directly to
                  secure your table.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '🪑', title: 'Table of 8', desc: '8 × $50 = $400 total · Reserved seating together' },
                    { icon: '🍺', title: 'Cash Bar', desc: 'Full bar available throughout the evening' },
                    { icon: '🎰', title: '50/50 Draw', desc: 'Buy tickets at the door — half the pot goes home with you' },
                    { icon: '💙', title: 'Great Cause', desc: 'Every dollar supports Great Lakes beach safety education' },
                  ].map((f) => (
                    <div key={f.title} className="glass-card p-4 flex gap-4 items-start border-yellow-500/10">
                      <span className="text-2xl flex-shrink-0">{f.icon}</span>
                      <div>
                        <div className="font-body font-semibold text-white text-sm">{f.title}</div>
                        <div className="font-body text-ocean-foam/55 text-xs mt-0.5">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: reservation form */}
              <ReserveForm ticketUrl={TICKET_URL} />
            </div>
          </div>
        </section>

        {/* ── FINAL CTA BANNER ──────────────────────────────────────── */}
        <section className="py-20 relative overflow-hidden"
                 style={{ background: 'linear-gradient(135deg, #3D0A0A 0%, #1A0505 50%, #010810 100%)' }}>
          <div className="absolute inset-0 pointer-events-none"
               style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,165,0,0.06) 0%, transparent 70%)' }} />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
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
                           transition-all duration-200 hover:scale-105 shadow-2xl cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
                  color: '#1A0505',
                  boxShadow: '0 0 50px rgba(255,165,0,0.35)',
                }}
              >
                🎟️ Buy Tickets — $50
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full border border-ocean-teal/40
                           text-ocean-teal font-semibold font-body text-base hover:bg-ocean-teal/10 transition-all duration-200 hover:scale-105"
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

// ── Reservation form (client component inline) ─────────────────────────────
function ReserveForm({ ticketUrl }: { ticketUrl: string }) {
  return (
    <div className="glass-card p-8 border-yellow-500/15">
      <div className="font-display text-yellow-400 text-2xl mb-2">RESERVE YOUR TABLE</div>
      <p className="text-ocean-foam/50 font-body text-sm mb-6">
        Fill in the form below and we'll confirm your table of 8 reservation.
      </p>

      {/* Zeffy direct link option */}
      <div className="mb-6 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-center">
        <p className="text-yellow-300/80 font-body text-sm mb-3">
          Purchase your 8 tickets directly online:
        </p>
        <a
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold font-body text-sm
                     transition-all duration-200 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)', color: '#1A0505' }}
        >
          🎟️ Buy 8 Tickets on Zeffy
        </a>
      </div>

      <div className="relative flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/30 text-xs font-body">OR</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <form
        action="mailto:info@ripcurrents.org"
        method="get"
        encType="text/plain"
        className="space-y-4"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-ocean-foam/50 font-body mb-1.5 uppercase tracking-wider">
              Your Name *
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="Jane Smith"
              className="w-full bg-ocean-mid/40 border border-ocean-blue/20 rounded-xl px-4 py-3 text-white text-sm
                         font-body placeholder:text-ocean-foam/30 focus:outline-none focus:border-yellow-500/40 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ocean-foam/50 font-body mb-1.5 uppercase tracking-wider">
              Phone / Email *
            </label>
            <input
              name="contact"
              type="text"
              required
              placeholder="your@email.com"
              className="w-full bg-ocean-mid/40 border border-ocean-blue/20 rounded-xl px-4 py-3 text-white text-sm
                         font-body placeholder:text-ocean-foam/30 focus:outline-none focus:border-yellow-500/40 transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-ocean-foam/50 font-body mb-1.5 uppercase tracking-wider">
            Number of Tables *
          </label>
          <select
            name="tables"
            className="w-full bg-ocean-mid/40 border border-ocean-blue/20 rounded-xl px-4 py-3 text-white text-sm
                       font-body focus:outline-none focus:border-yellow-500/40 transition-colors"
          >
            <option value="1">1 table (8 people)</option>
            <option value="2">2 tables (16 people)</option>
            <option value="3">3 tables (24 people)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-ocean-foam/50 font-body mb-1.5 uppercase tracking-wider">
            Notes (optional)
          </label>
          <textarea
            name="notes"
            rows={3}
            placeholder="Any special requests, accessibility needs, etc."
            className="w-full bg-ocean-mid/40 border border-ocean-blue/20 rounded-xl px-4 py-3 text-white text-sm
                       font-body placeholder:text-ocean-foam/30 focus:outline-none focus:border-yellow-500/40 transition-colors resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 rounded-xl font-bold font-body text-base transition-all duration-200 hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)', color: '#1A0505' }}
        >
          Send Reservation Request
        </button>
        <p className="text-center text-xs text-ocean-foam/30 font-body">
          We'll confirm your reservation within 24 hours.
        </p>
      </form>
    </div>
  )
}
