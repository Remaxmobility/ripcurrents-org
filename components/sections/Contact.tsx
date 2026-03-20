'use client'

import { useState, useRef, useEffect } from 'react'

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

export default function Contact() {
  const { ref, visible } = useInView()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', org: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Form submission placeholder — integrate with Formspree, Resend, or similar
    setTimeout(() => setStatus('sent'), 1500)
  }

  return (
    <section id="contact" className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #010D1B 0%, #020F22 100%)' }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,119,182,0.07) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <div className={`flex items-center gap-3 mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="w-8 h-px bg-ocean-teal" />
              <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">
                Contact
              </span>
            </div>

            <h2
              className={`text-display-lg text-white mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '100ms' }}
            >
              LET&apos;S{' '}
              <span style={{ WebkitTextStroke: '2px #00B4D8', color: 'transparent' }}>
                WORK TOGETHER
              </span>
            </h2>

            <p
              className={`text-ocean-foam/70 font-body text-base leading-relaxed mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '200ms' }}
            >
              Whether you&apos;re a municipality, government body, conservation authority, or community
              organization — reach out to learn more about partnership opportunities, consulting, field
              demonstrations, and how we can work together to prevent rip current drownings.
            </p>

            {/* Contact info */}
            <div
              className={`space-y-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <a
                href="https://www.instagram.com/ripcurrent_information_project"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center flex-shrink-0
                               group-hover:border-ocean-teal/50 transition-all duration-200">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="1.5" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4.5" />
                    <circle cx="17.5" cy="6.5" r="1" fill="#00B4D8" stroke="none" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white font-body group-hover:text-ocean-teal transition-colors">
                    @ripcurrent_information_project
                  </div>
                  <div className="text-xs text-ocean-foam/50 font-body">Follow us on Instagram</div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="1.5" className="w-5 h-5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white font-body">Port Stanley, Ontario</div>
                  <div className="text-xs text-ocean-foam/50 font-body">Great Lakes Region, Canada</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {status === 'sent' ? (
              <div className="glass-card p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-ocean-teal/10 border border-ocean-teal/30 flex items-center justify-center mb-6">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="2" className="w-8 h-8">
                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="font-display text-3xl text-ocean-teal mb-3">MESSAGE SENT</div>
                <p className="text-ocean-foam/60 font-body text-sm">
                  Thank you for reaching out. We&apos;ll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-ocean-foam/60 font-body mb-2 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-ocean-mid/40 border border-ocean-blue/20 rounded-xl px-4 py-3 text-white text-sm
                                 font-body placeholder:text-ocean-foam/30 focus:outline-none focus:border-ocean-teal/50
                                 transition-colors duration-200"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="org" className="block text-xs font-semibold text-ocean-foam/60 font-body mb-2 uppercase tracking-wider">
                      Organization
                    </label>
                    <input
                      id="org"
                      type="text"
                      value={form.org}
                      onChange={(e) => setForm({ ...form, org: e.target.value })}
                      className="w-full bg-ocean-mid/40 border border-ocean-blue/20 rounded-xl px-4 py-3 text-white text-sm
                                 font-body placeholder:text-ocean-foam/30 focus:outline-none focus:border-ocean-teal/50
                                 transition-colors duration-200"
                      placeholder="City of..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-ocean-foam/60 font-body mb-2 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-ocean-mid/40 border border-ocean-blue/20 rounded-xl px-4 py-3 text-white text-sm
                               font-body placeholder:text-ocean-foam/30 focus:outline-none focus:border-ocean-teal/50
                               transition-colors duration-200"
                    placeholder="you@organization.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-ocean-foam/60 font-body mb-2 uppercase tracking-wider">
                    How Can We Help? *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-ocean-mid/40 border border-ocean-blue/20 rounded-xl px-4 py-3 text-white text-sm
                               font-body placeholder:text-ocean-foam/30 focus:outline-none focus:border-ocean-teal/50
                               transition-colors duration-200 resize-none"
                    placeholder="Tell us about your organization and how you'd like to work with us..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 rounded-xl bg-danger-gradient text-white font-semibold font-body text-base
                             shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02]
                             active:scale-100 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                             disabled:hover:scale-100"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
