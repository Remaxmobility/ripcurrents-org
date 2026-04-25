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

export default function FamiliesClient({ content: c }: Props) {
  const checklist = [
    c.families_checklist_1 || 'Check beach conditions and posted warning flags before you go.',
    c.families_checklist_2 || 'Choose beaches with lifeguards on duty whenever possible.',
    c.families_checklist_3 || 'Scan the water from an elevated position before anyone enters.',
    c.families_checklist_4 || 'Identify a rip current — a discoloured channel with no breaking waves.',
    c.families_checklist_5 || 'Stay within designated swimming areas and between the flags.',
    c.families_checklist_6 || "Supervise children closely; stay within arm's reach of young swimmers.",
    c.families_checklist_7 || 'Know the survival rule: swim parallel to shore, not against the current.',
    c.families_checklist_8 || 'Agree on a meeting point if family members get separated.',
  ]

  const talkingPoints = [
    {
      age:     c.families_talk_1_age     || 'Ages 5–8',
      message: c.families_talk_1_message || "\"If the water ever pulls you away from shore, don't panic. Float on your back and call for help. Never try to swim back — swim sideways first.\"",
    },
    {
      age:     c.families_talk_2_age     || 'Ages 9–13',
      message: c.families_talk_2_message || "\"A rip current is a river in the lake. It goes outward fast. The way out is sideways — swim parallel until you feel the pull stop, then angle back to shore.\"",
    },
    {
      age:     c.families_talk_3_age     || 'Teens',
      message: c.families_talk_3_message || "\"Rip currents cause more Great Lakes drownings than any other hazard. Strong swimmers die in them because they fight back and exhaust themselves. The smart move is always sideways.\"",
    },
  ]

  const hero      = useInView(0.1)
  const why       = useInView(0.15)
  const checkRef  = useInView(0.15)
  const talk      = useInView(0.15)
  const cta       = useInView(0.15)

  const heroSubtitle = c.families_hero_subtitle || 'Practical guidance for parents and caregivers visiting Great Lakes beaches in Ontario.'

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
              <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">For Families</span>
              <div className="w-8 h-px bg-ocean-teal" />
            </div>
            <h1
              className={`font-display text-6xl md:text-8xl text-white mb-6 transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '100ms' }}
            >
              BEACH SAFE.{' '}
              <span style={{ WebkitTextStroke: '2px #00B4D8', color: 'transparent' }}>TOGETHER.</span>
            </h1>
            <p
              className={`text-xl text-ocean-foam/70 font-body leading-relaxed max-w-2xl mx-auto transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '200ms' }}
            >
              {heroSubtitle}
            </p>
          </div>
        </section>

        {/* Why Families Need to Know */}
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
                  RIPS DON&apos;T WARN YOU
                </h2>
                <div
                  className={`space-y-5 transition-all duration-700 ${why.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: '200ms' }}
                >
                  <p className="text-lg text-ocean-foam/80 font-body leading-relaxed">
                    {c.families_why_para1 || 'Rip currents are the leading cause of drowning deaths at Great Lakes beaches — and they strike without warning. Most victims were good swimmers enjoying a normal day.'}
                  </p>
                  <p className="text-base text-ocean-foam/70 font-body leading-relaxed">
                    {c.families_why_para2 || "Young children and teenagers are especially vulnerable. Kids don't have the strength or experience to recognise the warning signs or respond correctly — and in cold Great Lakes water, the margin for error is slim."}
                  </p>
                  <p className="text-base text-ocean-foam/70 font-body leading-relaxed">
                    {c.families_why_para3 || 'The good news: a few minutes of preparation before every beach trip dramatically reduces the risk. Knowledge is the only prevention that works.'}
                  </p>
                </div>
              </div>

              <div
                className={`transition-all duration-700 ${why.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="glass-card p-8 border border-danger-orange/20">
                  <div className="font-display text-2xl text-danger-orange mb-6">CRITICAL RULE</div>
                  <div className="space-y-4">
                    {[
                      { icon: '✅', text: 'Float and stay calm if caught.' },
                      { icon: '✅', text: 'Swim parallel to shore to escape the channel.' },
                      { icon: '✅', text: 'Wave and call for help if unable to escape.' },
                      { icon: '❌', text: 'Never swim directly back toward shore against the current.' },
                    ].map((r) => (
                      <div key={r.text} className="flex gap-3 items-start">
                        <span className="text-xl flex-shrink-0">{r.icon}</span>
                        <span className="text-ocean-foam/80 font-body">{r.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Beach Day Checklist */}
        <section className="py-24" style={{ background: 'linear-gradient(180deg, #010D1B 0%, #0A2540 100%)' }}>
          <div ref={checkRef.ref} className="max-w-7xl mx-auto px-6">
            <div className={`mb-14 transition-all duration-700 ${checkRef.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-ocean-teal" />
                <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">Preparation</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl text-white">BEACH DAY CHECKLIST</h2>
              <p className="text-ocean-foam/60 font-body mt-4 max-w-xl">
                {c.families_checklist_note || 'Print this out, save it to your phone, or just read it before every Great Lakes beach trip.'}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {checklist.map((item, i) => (
                <div
                  key={i}
                  className={`glass-card p-5 flex gap-4 items-start transition-all duration-700 ${checkRef.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-teal-gradient flex-shrink-0 flex items-center justify-center text-xs font-bold text-white">
                    {i + 1}
                  </div>
                  <p className="text-sm text-ocean-foam/80 font-body leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Talking to Kids */}
        <section className="py-24 bg-ocean-deep">
          <div ref={talk.ref} className="max-w-7xl mx-auto px-6">
            <div className={`mb-14 transition-all duration-700 ${talk.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-ocean-teal" />
                <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">Have the Conversation</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl text-white">TALKING TO YOUR KIDS</h2>
              <p className="text-ocean-foam/60 font-body mt-4 max-w-xl">
                {c.families_talk_note || 'Age-appropriate language to explain rip current danger before you reach the beach.'}
              </p>
            </div>

            <div className="space-y-5">
              {talkingPoints.map((t, i) => (
                <div
                  key={t.age}
                  className={`glass-card p-7 transition-all duration-700 ${talk.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="text-xs font-semibold tracking-[0.15em] uppercase text-ocean-teal font-body mb-3">{t.age}</div>
                  <p className="text-ocean-foam/80 font-body leading-relaxed italic">{t.message}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24" style={{ background: 'linear-gradient(180deg, #010D1B 0%, #020F20 100%)' }}>
          <div ref={cta.ref} className="max-w-4xl mx-auto px-6 text-center">
            <div className={`transition-all duration-700 ${cta.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="font-display text-5xl text-white mb-6">WANT MORE RESOURCES?</h2>
              <p className="text-ocean-foam/70 font-body mb-10 max-w-xl mx-auto">
                {c.families_cta_body || "Download our free beach safety materials, or bring a free rip current education presentation to your child's school this season."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/resources"
                  className="px-8 py-4 rounded-full bg-teal-gradient text-white font-semibold font-body
                             hover:shadow-lg hover:shadow-teal-500/30 hover:scale-105 active:scale-100 transition-all duration-200"
                >
                  Download Resources
                </Link>
                <Link
                  href="/schools"
                  className="px-8 py-4 rounded-full border border-ocean-teal/50 text-ocean-teal font-semibold font-body
                             hover:bg-ocean-teal/10 transition-all duration-200"
                >
                  Book a School Presentation
                </Link>
              </div>
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
