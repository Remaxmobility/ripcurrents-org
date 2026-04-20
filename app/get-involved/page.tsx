'use client'

import { useRef, useEffect, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
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

const ways = [
  {
    icon: '🙋',
    title: 'Volunteer',
    desc: 'Join our team of safety ambassadors at Great Lakes beaches this summer. We provide training on rip current identification and how to assist beachgoers.',
    cta: 'Apply to Volunteer',
    href: '#contact-form',
  },
  {
    icon: '📱',
    title: 'Spread the Word',
    desc: 'Share our posts, use #RipCurrentSafety, and tag friends planning a Great Lakes trip. Every share reaches someone who might not know the danger.',
    cta: 'Follow Us',
    href: 'https://www.facebook.com/ripcurrentinfo.org',
  },
  {
    icon: '🎓',
    title: 'Book a Presentation',
    desc: 'Request a free rip current safety presentation for your school, community centre, municipality, or sports club.',
    cta: 'Request a Presentation',
    href: '/schools',
  },
  {
    icon: '🤝',
    title: 'Partner With Us',
    desc: 'Municipalities, beach operators, school boards, and safety organisations — partner with us to extend Great Lakes safety education across Ontario.',
    cta: 'Explore Partnership',
    href: '#contact-form',
  },
  {
    icon: '💛',
    title: 'Donate',
    desc: 'Your donation funds educational materials, volunteer training, school programs, and outreach campaigns that save lives.',
    cta: 'Support the Mission',
    href: '#contact-form',
  },
]

export default function GetInvolvedPage() {
  const hero = useInView(0.1)
  const why = useInView(0.15)
  const ways_ = useInView(0.15)
  const form = useInView(0.15)

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative pt-40 pb-24 bg-ocean-deep overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(249,115,22,0.08) 0%, transparent 70%)' }}
          />
          <div ref={hero.ref} className="max-w-4xl mx-auto px-6 text-center">
            <div className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="w-8 h-px bg-danger-orange" />
              <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-danger-orange">Take Action</span>
              <div className="w-8 h-px bg-danger-orange" />
            </div>
            <h1
              className={`font-display text-6xl md:text-8xl text-white mb-6 transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '100ms' }}
            >
              GET{' '}
              <span style={{ WebkitTextStroke: '2px #F97316', color: 'transparent' }}>INVOLVED</span>
            </h1>
            <p
              className={`text-xl text-ocean-foam/70 font-body leading-relaxed max-w-2xl mx-auto transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '200ms' }}
            >
              Rip currents kill people who didn&apos;t know what they were. Help us change that.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-20 bg-ocean-deep">
          <div ref={why.ref} className="max-w-4xl mx-auto px-6 text-center">
            <div
              className={`transition-all duration-700 ${why.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <p className="text-xl text-ocean-foam/80 font-body leading-relaxed mb-6">
                The Rip Current Information Project is a community-powered organisation. Every volunteer hour, every social share, every school booking, and every donation directly supports our ability to reach more Canadians before they reach the water.
              </p>
              <p className="text-base text-ocean-foam/60 font-body leading-relaxed">
                Most rip current drownings are preventable. We need your help to make prevention the norm at every Great Lakes beach in Ontario.
              </p>
            </div>
          </div>
        </section>

        {/* Ways to Help */}
        <section className="py-24" style={{ background: 'linear-gradient(180deg, #010D1B 0%, #0A2540 100%)' }}>
          <div ref={ways_.ref} className="max-w-7xl mx-auto px-6">
            <div className={`mb-14 transition-all duration-700 ${ways_.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-danger-orange" />
                <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-danger-orange">Ways to Help</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl text-white">HOW YOU CAN HELP</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ways.map((w, i) => (
                <div
                  key={w.title}
                  className={`glass-card p-7 flex flex-col transition-all duration-700 ${ways_.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{w.icon}</div>
                  <h3 className="font-display text-xl text-white mb-3">{w.title.toUpperCase()}</h3>
                  <p className="text-sm text-ocean-foam/65 font-body leading-relaxed flex-1 mb-6">{w.desc}</p>
                  <a
                    href={w.href}
                    className="inline-block text-center px-5 py-2.5 rounded-full border border-ocean-teal/40 text-ocean-teal text-sm font-semibold font-body
                               hover:bg-ocean-teal/10 transition-all duration-200"
                  >
                    {w.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-form" className="py-24 bg-ocean-deep">
          <div ref={form.ref} className="max-w-3xl mx-auto px-6">
            <div
              className={`text-center mb-10 transition-all duration-700 ${form.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-ocean-teal" />
                <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">Contact Us</span>
                <div className="w-8 h-px bg-ocean-teal" />
              </div>
              <h2 className="font-display text-5xl text-white mb-4">REACH OUT</h2>
              <p className="text-ocean-foam/70 font-body">
                Tell us how you&apos;d like to help — volunteering, partnerships, donations, or bookings. We&apos;ll get back to you promptly.
              </p>
            </div>

            <div
              className={`glass-card p-8 transition-all duration-700 ${form.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-ocean-foam/60 font-body mb-2 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      className="w-full bg-ocean-mid/40 border border-ocean-blue/30 rounded-lg px-4 py-3 text-white font-body text-sm
                                 focus:outline-none focus:border-ocean-teal/60 transition-colors placeholder:text-ocean-foam/30"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ocean-foam/60 font-body mb-2 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      className="w-full bg-ocean-mid/40 border border-ocean-blue/30 rounded-lg px-4 py-3 text-white font-body text-sm
                                 focus:outline-none focus:border-ocean-teal/60 transition-colors placeholder:text-ocean-foam/30"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ocean-foam/60 font-body mb-2 uppercase tracking-wider">How Would You Like to Help?</label>
                  <select
                    className="w-full bg-ocean-mid/40 border border-ocean-blue/30 rounded-lg px-4 py-3 text-white font-body text-sm
                               focus:outline-none focus:border-ocean-teal/60 transition-colors"
                  >
                    <option value="" className="bg-ocean-deep">Select an option</option>
                    <option value="volunteer" className="bg-ocean-deep">Volunteer at a beach</option>
                    <option value="presentation" className="bg-ocean-deep">Book a presentation</option>
                    <option value="partner" className="bg-ocean-deep">Explore a partnership</option>
                    <option value="donate" className="bg-ocean-deep">Make a donation</option>
                    <option value="other" className="bg-ocean-deep">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ocean-foam/60 font-body mb-2 uppercase tracking-wider">Message</label>
                  <textarea
                    rows={4}
                    className="w-full bg-ocean-mid/40 border border-ocean-blue/30 rounded-lg px-4 py-3 text-white font-body text-sm
                               focus:outline-none focus:border-ocean-teal/60 transition-colors resize-none placeholder:text-ocean-foam/30"
                    placeholder="Tell us more about how you'd like to get involved..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-danger-gradient text-white font-semibold font-body
                             hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-100 transition-all duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
