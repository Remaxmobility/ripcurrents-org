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

interface Props { content: Record<string, string> }

export default function SchoolsClient({ content: c }: Props) {
  const programFeatures = [
    { icon: '🆓', title: c.schools_feature_1_title || 'Free of Charge',       desc: c.schools_feature_1_desc || 'All school presentations are provided at no cost to the school or board.' },
    { icon: '🎯', title: c.schools_feature_2_title || 'Age-Appropriate',      desc: c.schools_feature_2_desc || 'Tailored content for every grade level from Kindergarten through Grade 12.' },
    { icon: '📚', title: c.schools_feature_3_title || 'Curriculum-Aligned',   desc: c.schools_feature_3_desc || 'Mapped to Ontario Health and Physical Education and Science curriculum expectations.' },
    { icon: '🎬', title: c.schools_feature_4_title || 'Multimedia Delivery',  desc: c.schools_feature_4_desc || 'Engaging visuals, real-scenario footage, and interactive activities — not just a lecture.' },
  ]

  const topics = [
    c.schools_topic_1 || 'What is a rip current and how does it form',
    c.schools_topic_2 || 'Why Great Lakes rip currents are uniquely dangerous',
    c.schools_topic_3 || 'How to recognise warning signs from shore',
    c.schools_topic_4 || 'The correct survival response: float, stay calm, swim parallel',
    c.schools_topic_5 || 'When and how to call for help',
    c.schools_topic_6 || 'Real incident case studies appropriate to grade level',
    c.schools_topic_7 || 'How to share safety knowledge with family and community',
  ]

  const hero       = useInView(0.1)
  const why        = useInView(0.15)
  const program    = useInView(0.15)
  const curriculum = useInView(0.15)
  const booking    = useInView(0.15)

  const heroSubtitle = c.schools_hero_subtitle || 'Free rip current safety presentations for Ontario schools — curriculum-aligned, engaging, and potentially life-saving.'

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative pt-40 pb-24 bg-ocean-deep overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(0,119,182,0.12) 0%, transparent 70%)' }}
          />
          <div ref={hero.ref} className="max-w-4xl mx-auto px-6 text-center">
            <div className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="w-8 h-px bg-ocean-teal" />
              <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">For Educators</span>
              <div className="w-8 h-px bg-ocean-teal" />
            </div>
            <h1
              className={`font-display text-6xl md:text-8xl text-white mb-6 transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '100ms' }}
            >
              SCHOOLS{' '}
              <span style={{ WebkitTextStroke: '2px #00B4D8', color: 'transparent' }}>PROGRAM</span>
            </h1>
            <p
              className={`text-xl text-ocean-foam/70 font-body leading-relaxed max-w-2xl mx-auto transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '200ms' }}
            >
              {heroSubtitle}
            </p>
            <div
              className={`mt-8 transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '350ms' }}
            >
              <Link
                href="#booking"
                className="inline-block px-8 py-4 rounded-full bg-danger-gradient text-white font-semibold font-body
                           hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-100 transition-all duration-200"
              >
                Book a Presentation
              </Link>
            </div>
          </div>
        </section>

        {/* Why Schools */}
        <section className="py-24 bg-ocean-deep">
          <div ref={why.ref} className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className={`flex items-center gap-3 mb-6 transition-all duration-700 ${why.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  <div className="w-8 h-px bg-danger-orange" />
                  <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-danger-orange">Why It Matters</span>
                </div>
                <h2
                  className={`font-display text-5xl md:text-6xl text-white mb-8 transition-all duration-700 ${why.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: '100ms' }}
                >
                  KNOWLEDGE SAVES LIVES
                </h2>
                <div
                  className={`space-y-5 transition-all duration-700 ${why.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: '200ms' }}
                >
                  <p className="text-lg text-ocean-foam/80 font-body leading-relaxed">
                    {c.schools_why_para1 || 'Rip currents are the leading cause of water-related fatalities at Great Lakes beaches in Ontario. Children and teenagers are among the highest-risk groups — yet rip current education is rarely part of school curriculum.'}
                  </p>
                  <p className="text-base text-ocean-foam/70 font-body leading-relaxed">
                    {c.schools_why_para2 || 'A single 45-minute presentation can permanently change how a student responds to a rip current emergency — for themselves, and for anyone around them. Students who learn this take that knowledge home to their families.'}
                  </p>
                  <p className="text-base text-ocean-foam/70 font-body leading-relaxed">
                    {c.schools_why_para3 || 'Our program is built specifically for Ontario classrooms, with age-appropriate content that connects directly to existing HPE and Science curriculum expectations.'}
                  </p>
                </div>
              </div>

              <div
                className={`transition-all duration-700 ${why.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="glass-card p-8">
                  <div className="font-display text-2xl text-ocean-teal mb-6">WHAT STUDENTS WILL LEARN</div>
                  <ul className="space-y-3">
                    {topics.map((t) => (
                      <li key={t} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-ocean-teal mt-2 flex-shrink-0" />
                        <span className="text-sm text-ocean-foam/75 font-body leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Features */}
        <section className="py-24" style={{ background: 'linear-gradient(180deg, #010D1B 0%, #0A2540 100%)' }}>
          <div ref={program.ref} className="max-w-7xl mx-auto px-6">
            <div className={`text-center mb-14 transition-all duration-700 ${program.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-ocean-teal" />
                <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">The Program</span>
                <div className="w-8 h-px bg-ocean-teal" />
              </div>
              <h2 className="font-display text-5xl md:text-6xl text-white">WHAT WE OFFER</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {programFeatures.map((f, i) => (
                <div
                  key={f.title}
                  className={`glass-card p-7 transition-all duration-700 ${program.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="font-display text-xl text-ocean-teal mb-3">{f.title.toUpperCase()}</h3>
                  <p className="text-sm text-ocean-foam/65 font-body leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-24 bg-ocean-deep">
          <div ref={curriculum.ref} className="max-w-7xl mx-auto px-6">
            <div className={`mb-14 transition-all duration-700 ${curriculum.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-ocean-teal" />
                <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">Ontario Curriculum</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl text-white">CURRICULUM CONNECTIONS</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  subject: 'Health & Physical Education',
                  grades: 'K–12',
                  connections: ['Active living and personal safety', 'Movement competence and water safety', 'Living skills: decision-making in hazardous situations'],
                },
                {
                  subject: 'Science & Technology',
                  grades: 'Grades 4–10',
                  connections: ['Earth and space science: water systems', 'Physical science: forces and motion', 'Environmental science: Great Lakes ecosystems'],
                },
                {
                  subject: 'Social Studies / Geography',
                  grades: 'Grades 4–8',
                  connections: ["Canada's natural environment and water resources", 'Communities and environmental responsibility', "Ontario's Great Lakes as a shared resource"],
                },
              ].map((cc, i) => (
                <div
                  key={cc.subject}
                  className={`glass-card p-7 transition-all duration-700 ${curriculum.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="text-xs font-semibold tracking-[0.15em] uppercase text-ocean-teal font-body mb-1">{cc.grades}</div>
                  <h3 className="font-display text-xl text-white mb-4">{cc.subject.toUpperCase()}</h3>
                  <ul className="space-y-2">
                    {cc.connections.map((conn) => (
                      <li key={conn} className="flex gap-2 items-start">
                        <div className="w-1 h-1 rounded-full bg-ocean-teal/60 mt-2 flex-shrink-0" />
                        <span className="text-xs text-ocean-foam/65 font-body leading-relaxed">{conn}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking */}
        <section id="booking" className="py-24" style={{ background: 'linear-gradient(180deg, #010D1B 0%, #020F20 100%)' }}>
          <div ref={booking.ref} className="max-w-3xl mx-auto px-6">
            <div
              className={`text-center mb-10 transition-all duration-700 ${booking.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-danger-orange" />
                <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-danger-orange">Book Now</span>
                <div className="w-8 h-px bg-danger-orange" />
              </div>
              <h2 className="font-display text-5xl md:text-6xl text-white mb-4">REQUEST A PRESENTATION</h2>
              <p className="text-ocean-foam/70 font-body">
                {c.schools_booking_note || "Fill out our contact form and we'll schedule a presentation for your school at a time that works for you."}
              </p>
            </div>

            <div
              className={`glass-card p-8 transition-all duration-700 ${booking.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-ocean-foam/60 font-body mb-2 uppercase tracking-wider">School Name</label>
                    <input
                      type="text"
                      className="w-full bg-ocean-mid/40 border border-ocean-blue/30 rounded-lg px-4 py-3 text-white font-body text-sm
                                 focus:outline-none focus:border-ocean-teal/60 transition-colors placeholder:text-ocean-foam/30"
                      placeholder="Your school name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ocean-foam/60 font-body mb-2 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      className="w-full bg-ocean-mid/40 border border-ocean-blue/30 rounded-lg px-4 py-3 text-white font-body text-sm
                                 focus:outline-none focus:border-ocean-teal/60 transition-colors placeholder:text-ocean-foam/30"
                      placeholder="Teacher or administrator"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ocean-foam/60 font-body mb-2 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    className="w-full bg-ocean-mid/40 border border-ocean-blue/30 rounded-lg px-4 py-3 text-white font-body text-sm
                               focus:outline-none focus:border-ocean-teal/60 transition-colors placeholder:text-ocean-foam/30"
                    placeholder="your@school.ca"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-ocean-foam/60 font-body mb-2 uppercase tracking-wider">Grade(s)</label>
                    <input
                      type="text"
                      className="w-full bg-ocean-mid/40 border border-ocean-blue/30 rounded-lg px-4 py-3 text-white font-body text-sm
                                 focus:outline-none focus:border-ocean-teal/60 transition-colors placeholder:text-ocean-foam/30"
                      placeholder="e.g. Grade 5 and 6"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ocean-foam/60 font-body mb-2 uppercase tracking-wider">Preferred Date</label>
                    <input
                      type="text"
                      className="w-full bg-ocean-mid/40 border border-ocean-blue/30 rounded-lg px-4 py-3 text-white font-body text-sm
                                 focus:outline-none focus:border-ocean-teal/60 transition-colors placeholder:text-ocean-foam/30"
                      placeholder="e.g. May or June 2026"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ocean-foam/60 font-body mb-2 uppercase tracking-wider">Message (Optional)</label>
                  <textarea
                    rows={3}
                    className="w-full bg-ocean-mid/40 border border-ocean-blue/30 rounded-lg px-4 py-3 text-white font-body text-sm
                               focus:outline-none focus:border-ocean-teal/60 transition-colors resize-none placeholder:text-ocean-foam/30"
                    placeholder="Any specific topics or questions for the presentation?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-danger-gradient text-white font-semibold font-body
                             hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-100 transition-all duration-200"
                >
                  Send Booking Request
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer
        tagline={c.footer_tagline}
        instagramUrl={c.contact_instagram_url}
        copyrightExtra={c.footer_copyright_extra}
      />
    </>
  )
}
