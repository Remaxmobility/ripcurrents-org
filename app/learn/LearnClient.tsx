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

export default function LearnClient({ content: c }: Props) {
  const warningSigns = [
    { icon: '🌊', sign: c.learn_warning_1_sign || 'Discoloured water', detail: c.learn_warning_1_detail || 'A murky brown or greenish channel cutting through blue water — sediment pulled from the bottom.' },
    { icon: '🔇', sign: c.learn_warning_2_sign || 'Absence of breaking waves', detail: c.learn_warning_2_detail || 'A flat, calm-looking gap between two sections of breaking surf is the channel itself.' },
    { icon: '💨', sign: c.learn_warning_3_sign || 'Choppy, disturbed surface', detail: c.learn_warning_3_detail || 'Irregular surface chop in a narrow band where the current disrupts incoming swells.' },
    { icon: '🫧', sign: c.learn_warning_4_sign || 'Foam or debris moving seaward', detail: c.learn_warning_4_detail || 'Watch for floating foam, seaweed, or debris drifting steadily away from shore.' },
  ]

  const survivalSteps = [
    { step: '1', title: c.learn_survival_1_title || 'Stay Calm', desc: c.learn_survival_1_desc || "Panic wastes energy. A rip current won't pull you under — it will carry you away from shore." },
    { step: '2', title: c.learn_survival_2_title || "Don't Fight It", desc: c.learn_survival_2_desc || 'Swimming directly against the current exhausts even strong swimmers. Work with the water, not against it.' },
    { step: '3', title: c.learn_survival_3_title || 'Swim Parallel', desc: c.learn_survival_3_desc || 'Swim sideways — parallel to the shoreline — to escape the narrow channel. Most rip currents are less than 30 metres wide.' },
    { step: '4', title: c.learn_survival_4_title || 'Signal for Help', desc: c.learn_survival_4_desc || 'If unable to escape, float and conserve energy. Wave and shout to attract a lifeguard or bystander.' },
  ]

  const hero     = useInView(0.1)
  const what     = useInView(0.15)
  const lakes    = useInView(0.15)
  const signs    = useInView(0.15)
  const survival = useInView(0.15)
  const stats    = useInView(0.15)

  const heroSubtitle = c.learn_hero_subtitle || 'What rip currents are, how to spot them on Great Lakes beaches, and exactly what to do if you get caught in one.'

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
              <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">Education</span>
              <div className="w-8 h-px bg-ocean-teal" />
            </div>
            <h1
              className={`font-display text-6xl md:text-8xl text-white mb-6 transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '100ms' }}
            >
              RIP CURRENTS{' '}
              <span style={{ WebkitTextStroke: '2px #00B4D8', color: 'transparent' }}>101</span>
            </h1>
            <p
              className={`text-xl text-ocean-foam/70 font-body leading-relaxed max-w-2xl mx-auto transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '200ms' }}
            >
              {heroSubtitle}
            </p>
          </div>
        </section>

        {/* What Is */}
        <section className="py-24 bg-ocean-deep">
          <div ref={what.ref} className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className={`flex items-center gap-3 mb-6 transition-all duration-700 ${what.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  <div className="w-8 h-px bg-ocean-teal" />
                  <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">The Hazard</span>
                </div>
                <h2
                  className={`font-display text-5xl md:text-6xl text-white mb-8 transition-all duration-700 ${what.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: '100ms' }}
                >
                  WHAT IS A RIP CURRENT?
                </h2>
                <div
                  className={`space-y-5 transition-all duration-700 ${what.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: '200ms' }}
                >
                  <p className="text-lg text-ocean-foam/80 font-body leading-relaxed">
                    {c.learn_what_para1 || 'A rip current is a powerful, concentrated channel of water that flows rapidly away from the shoreline and out into deeper water.'}
                  </p>
                  <p className="text-base text-ocean-foam/70 font-body leading-relaxed">
                    {c.learn_what_para2 || 'They form when water pushed toward shore by waves escapes through a gap in sandbars or along a pier, rushing outward in a narrow stream. At peak speed, a rip current moves faster than any Olympic swimmer — up to 2.5 metres per second.'}
                  </p>
                  <p className="text-base text-ocean-foam/70 font-body leading-relaxed">
                    {c.learn_what_para3 || 'Critically, rip currents are not undertows. They flow along the surface, outward from shore. They will not pull you underwater — but they will exhaust you if you try to swim against them.'}
                  </p>
                </div>
              </div>

              <div
                className={`grid grid-cols-1 gap-4 transition-all duration-700 ${what.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                style={{ transitionDelay: '300ms' }}
              >
                {[
                  { icon: '⚡', stat: 'Up to 2.5 m/sec', label: 'Faster than any Olympic swimmer can sprint' },
                  { icon: '📏', stat: 'Under 30 m wide', label: 'Narrow channels — easy to escape sideways' },
                  { icon: '🌊', stat: 'Surface flow', label: 'Not an undertow — will not pull you under' },
                  { icon: '👁', stat: 'Hard to see', label: 'Must be spotted from elevated ground, not water level' },
                ].map((f) => (
                  <div key={f.stat} className="glass-card p-5 flex gap-4 items-start">
                    <span className="text-2xl flex-shrink-0">{f.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-white font-body">{f.stat}</div>
                      <div className="text-xs text-ocean-foam/60 font-body mt-0.5 leading-snug">{f.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Great Lakes Specific */}
        <section className="py-24" style={{ background: 'linear-gradient(180deg, #010D1B 0%, #0A2540 100%)' }}>
          <div ref={lakes.ref} className="max-w-7xl mx-auto px-6">
            <div className={`text-center mb-14 transition-all duration-700 ${lakes.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-ocean-teal" />
                <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">Canada-Specific</span>
                <div className="w-8 h-px bg-ocean-teal" />
              </div>
              <h2 className="font-display text-5xl md:text-6xl text-white">
                GREAT LAKES{' '}
                <span style={{ WebkitTextStroke: '2px #00B4D8', color: 'transparent' }}>RIPS</span>
              </h2>
            </div>

            <div
              className={`grid md:grid-cols-3 gap-6 transition-all duration-700 ${lakes.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '200ms' }}
            >
              {[
                {
                  title: c.learn_lakes_1_title || 'Wind-Driven Formation',
                  desc: c.learn_lakes_1_desc || 'Unlike ocean rips that form from fixed underwater geography, Great Lakes rip currents are primarily driven by rapidly shifting winds and wave patterns — making them highly unpredictable.',
                },
                {
                  title: c.learn_lakes_2_title || 'No Tidal Warning',
                  desc: c.learn_lakes_2_desc || "The Great Lakes have no tides to signal changing conditions. Rip currents can appear on seemingly calm days and shift location within minutes, with no advance warning system.",
                },
                {
                  title: c.learn_lakes_3_title || 'Coldwater Factor',
                  desc: c.learn_lakes_3_desc || "Ontario's Great Lakes remain cold even in summer. Cold water causes involuntary gasping and rapid muscle fatigue — dramatically reducing a swimmer's ability to survive a rip current encounter.",
                },
              ].map((lc) => (
                <div key={lc.title} className="glass-card p-7">
                  <h3 className="font-display text-xl text-ocean-teal mb-4">{lc.title.toUpperCase()}</h3>
                  <p className="text-ocean-foam/70 font-body leading-relaxed text-sm">{lc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Warning Signs */}
        <section className="py-24 bg-ocean-deep">
          <div ref={signs.ref} className="max-w-7xl mx-auto px-6">
            <div className={`mb-14 transition-all duration-700 ${signs.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-danger-orange" />
                <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-danger-orange">Spot It</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl text-white">WARNING SIGNS</h2>
              <p className="text-ocean-foam/60 font-body mt-4 max-w-xl">
                {c.learn_signs_note || 'Always scan from an elevated position — a dune, lifeguard tower, or raised embankment — before entering the water.'}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {warningSigns.map((w, i) => (
                <div
                  key={w.sign}
                  className={`glass-card p-6 flex gap-5 items-start transition-all duration-700 ${signs.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span className="text-3xl flex-shrink-0">{w.icon}</span>
                  <div>
                    <div className="font-semibold text-white font-body mb-1">{w.sign}</div>
                    <p className="text-sm text-ocean-foam/65 font-body leading-relaxed">{w.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Survival Guide */}
        <section className="py-24" style={{ background: 'linear-gradient(180deg, #010D1B 0%, #020F20 100%)' }}>
          <div ref={survival.ref} className="max-w-7xl mx-auto px-6">
            <div className={`mb-14 transition-all duration-700 ${survival.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-ocean-teal" />
                <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">If Caught</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl text-white">
                HOW TO{' '}
                <span style={{ WebkitTextStroke: '2px #00B4D8', color: 'transparent' }}>SURVIVE</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {survivalSteps.map((s, i) => (
                <div
                  key={s.step}
                  className={`glass-card p-6 transition-all duration-700 ${survival.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="font-display text-5xl text-ocean-teal/30 mb-3">{s.step}</div>
                  <h3 className="font-display text-xl text-white mb-3">{s.title.toUpperCase()}</h3>
                  <p className="text-sm text-ocean-foam/65 font-body leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div
              className={`mt-12 p-6 rounded-xl border border-danger-orange/30 transition-all duration-700 ${survival.visible ? 'opacity-100' : 'opacity-0'}`}
              style={{ background: 'rgba(249,115,22,0.06)', transitionDelay: '500ms' }}
            >
              <div className="flex gap-4 items-start">
                <span className="text-3xl flex-shrink-0">🚨</span>
                <div>
                  <div className="font-semibold text-danger-orange font-body mb-1">
                    {c.learn_survival_warning_title || 'NEVER swim directly toward shore against the current.'}
                  </div>
                  <p className="text-sm text-ocean-foam/70 font-body leading-relaxed">
                    {c.learn_survival_warning_body || 'Fighting the current causes rapid exhaustion and drowning. Always swim parallel to shore first to escape the channel, then angle back to the beach.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats + CTA */}
        <section className="py-24 bg-ocean-deep">
          <div ref={stats.ref} className="max-w-4xl mx-auto px-6 text-center">
            <div className={`transition-all duration-700 ${stats.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-px bg-danger-orange" />
                <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-danger-orange">The Numbers</span>
                <div className="w-8 h-px bg-danger-orange" />
              </div>
              <p className="text-xl text-ocean-foam/80 font-body leading-relaxed mb-4">
                {c.learn_stats_para1 || 'According to the Lifesaving Society, rip currents are responsible for the majority of lifeguard rescues at Great Lakes beaches — and contribute to dozens of drowning deaths across Canada each year.'}
              </p>
              <p className="text-base text-ocean-foam/60 font-body leading-relaxed mb-12">
                {c.learn_stats_para2 || 'Most victims were strong swimmers. Education is the only prevention.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/families"
                  className="px-8 py-4 rounded-full bg-teal-gradient text-white font-semibold font-body
                             hover:shadow-lg hover:shadow-teal-500/30 hover:scale-105 active:scale-100 transition-all duration-200"
                >
                  Safety Tips for Families
                </Link>
                <Link
                  href="/schools"
                  className="px-8 py-4 rounded-full border border-ocean-teal/50 text-ocean-teal font-semibold font-body
                             hover:bg-ocean-teal/10 transition-all duration-200"
                >
                  School Presentations
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
