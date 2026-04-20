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

const pillars = [
  {
    icon: '🔬',
    title: 'Research-Informed',
    desc: 'We stay current with the latest science on rip current dynamics specific to the Great Lakes ecosystem.',
  },
  {
    icon: '📢',
    title: 'Public Awareness',
    desc: 'We work with media, community groups, and emergency services to make rip current knowledge accessible to all.',
  },
  {
    icon: '🎓',
    title: 'Education Programs',
    desc: 'We deliver evidence-based water safety presentations to schools, families, and community groups across Ontario.',
  },
  {
    icon: '🤝',
    title: 'Partnerships',
    desc: 'We collaborate with local authorities, municipalities, and safety organisations to build a culture of prevention.',
  },
]

export default function AboutPage() {
  const hero = useInView(0.1)
  const mission = useInView(0.15)
  const reality = useInView(0.15)
  const approach = useInView(0.15)

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
              <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">Our Story</span>
              <div className="w-8 h-px bg-ocean-teal" />
            </div>
            <h1
              className={`font-display text-6xl md:text-8xl text-white mb-6 transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '100ms' }}
            >
              ABOUT THE{' '}
              <span style={{ WebkitTextStroke: '2px #00B4D8', color: 'transparent' }}>
                PROJECT
              </span>
            </h1>
            <p
              className={`text-xl text-ocean-foam/70 font-body leading-relaxed max-w-2xl mx-auto transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '200ms' }}
            >
              Saving lives through rip current education on the Great Lakes.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 bg-ocean-deep">
          <div ref={mission.ref} className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className={`flex items-center gap-3 mb-6 transition-all duration-700 ${mission.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  <div className="w-8 h-px bg-ocean-teal" />
                  <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">Our Mission</span>
                </div>
                <h2
                  className={`font-display text-5xl md:text-6xl text-white mb-8 transition-all duration-700 ${mission.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: '100ms' }}
                >
                  WHO WE ARE
                </h2>
                <div
                  className={`space-y-5 transition-all duration-700 ${mission.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: '200ms' }}
                >
                  <p className="text-lg text-ocean-foam/80 font-body leading-relaxed">
                    The <strong className="text-white">Rip Current Information Project</strong> is a Canadian non-profit dedicated to reducing rip current-related fatalities on the Great Lakes through education and community awareness.
                  </p>
                  <p className="text-base text-ocean-foam/70 font-body leading-relaxed">
                    Our team brings together water safety experts, researchers, and community leaders who share a single purpose: making the Great Lakes a safer destination for everyone who visits Ontario&apos;s shores.
                  </p>
                  <p className="text-base text-ocean-foam/70 font-body leading-relaxed">
                    We work directly with local authorities, emergency services, schools, and community groups to provide evidence-based information and promote best practices in rip current prevention.
                  </p>
                </div>
              </div>

              <div
                className={`transition-all duration-700 ${mission.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="glass-card p-8 border border-ocean-teal/20">
                  <div className="text-ocean-teal font-display text-2xl mb-4">OUR MISSION</div>
                  <blockquote className="text-xl text-white font-body leading-relaxed italic border-l-2 border-ocean-teal pl-6">
                    &ldquo;To reduce rip current-related fatalities on the Great Lakes by ensuring every beachgoer in Ontario has the knowledge to recognise, avoid, and survive a rip current.&rdquo;
                  </blockquote>
                </div>

                <div className="mt-6 glass-card p-6 border border-danger-orange/20">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">⚠️</span>
                    <div>
                      <div className="text-sm font-semibold text-danger-orange font-body mb-1">WHY THIS MATTERS</div>
                      <p className="text-sm text-ocean-foam/70 font-body leading-relaxed">
                        Rip currents are the leading cause of drowning deaths at Great Lakes beaches. Most victims are strong swimmers who simply didn&apos;t know what they were dealing with.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Deadly Reality */}
        <section className="py-24" style={{ background: 'linear-gradient(180deg, #010D1B 0%, #0A2540 100%)' }}>
          <div ref={reality.ref} className="max-w-7xl mx-auto px-6">
            <div className={`text-center mb-14 transition-all duration-700 ${reality.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-danger-orange" />
                <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-danger-orange">The Reality</span>
                <div className="w-8 h-px bg-danger-orange" />
              </div>
              <h2 className="font-display text-5xl md:text-6xl text-white">
                THE GREAT LAKES{' '}
                <span style={{ WebkitTextStroke: '2px #F97316', color: 'transparent' }}>DIFFERENCE</span>
              </h2>
            </div>

            <div
              className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${reality.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="glass-card p-8">
                <h3 className="font-display text-2xl text-white mb-4">UNIQUE AND UNPREDICTABLE</h3>
                <p className="text-ocean-foam/70 font-body leading-relaxed mb-4">
                  Unlike ocean rip currents that form over longer distances from predictable underwater geography, <strong className="text-white">Great Lakes rip currents can form suddenly</strong> — driven by rapidly changing winds and wave patterns with little warning.
                </p>
                <p className="text-ocean-foam/70 font-body leading-relaxed">
                  These channels can appear on seemingly calm days and shift location within minutes, catching even experienced swimmers completely off guard.
                </p>
              </div>

              <div className="glass-card p-8">
                <h3 className="font-display text-2xl text-white mb-4">HIDDEN IN PLAIN SIGHT</h3>
                <p className="text-ocean-foam/70 font-body leading-relaxed mb-4">
                  Most beachgoers don&apos;t recognise a rip current until they&apos;re already in one. The discoloured, choppy water that marks a rip channel is easy to miss — especially when you&apos;re focused on having fun.
                </p>
                <p className="text-ocean-foam/70 font-body leading-relaxed">
                  Education is the most effective defence. Knowing what to look for from shore saves lives before anyone enters the water.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-24 bg-ocean-deep">
          <div ref={approach.ref} className="max-w-7xl mx-auto px-6">
            <div className={`text-center mb-14 transition-all duration-700 ${approach.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-ocean-teal" />
                <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-ocean-teal">How We Work</span>
                <div className="w-8 h-px bg-ocean-teal" />
              </div>
              <h2 className="font-display text-5xl md:text-6xl text-white">OUR APPROACH</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((p, i) => (
                <div
                  key={p.title}
                  className={`glass-card p-6 transition-all duration-700 ${approach.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <h3 className="font-display text-xl text-ocean-teal mb-3">{p.title.toUpperCase()}</h3>
                  <p className="text-sm text-ocean-foam/65 font-body leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className={`mt-16 text-center transition-all duration-700 ${approach.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '500ms' }}
            >
              <Link
                href="/get-involved"
                className="inline-block px-8 py-4 rounded-full bg-danger-gradient text-white font-semibold font-body
                           hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-100 transition-all duration-200"
              >
                Join the Mission
              </Link>
              <Link
                href="/learn"
                className="ml-4 inline-block px-8 py-4 rounded-full border border-ocean-teal/50 text-ocean-teal font-semibold font-body
                           hover:bg-ocean-teal/10 transition-all duration-200"
              >
                Learn About Rip Currents
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
