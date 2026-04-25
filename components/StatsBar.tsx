'use client'

import { useEffect, useRef, useState } from 'react'

const DEFAULT_STATS = [
  { end: 71,    suffix: '',  label: 'avg. U.S. deaths annually' },
  { end: 80,    suffix: '%', label: 'of all lifeguard rescues'  },
  { end: 60000, suffix: '+', label: 'people rescued per year'   },
  { end: 100,   suffix: '%', label: 'preventable with knowledge' },
]

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref   = useRef<HTMLSpanElement>(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          const duration = 1800
          const start    = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased    = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * end))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [end])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

interface Props {
  tickerText?: string
}

export default function StatsBar({ tickerText }: Props) {
  const ticker = tickerText || 'RIP CURRENTS ARE THE #1 BEACH HAZARD • THEY CAN BE DIFFICULT TO DETECT • KNOW BEFORE YOU GO • SWIM PARALLEL. FLOAT AND SIGNAL. CALL FOR HELP.'
  const stats  = DEFAULT_STATS

  return (
    <section className="relative z-10 bg-ocean-mid/80 backdrop-blur-md border-y border-ocean-blue/20">
      {/* Danger ticker */}
      <div className="overflow-hidden bg-danger-orange/10 border-b border-danger-orange/20 py-2.5">
        <div className="marquee-track whitespace-nowrap text-sm font-body text-danger-orange/80">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="mx-8">⚠ {ticker} &nbsp;•</span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center group">
            <div className="font-display text-4xl md:text-5xl text-danger-orange danger-glow mb-2 group-hover:scale-110 transition-transform duration-300">
              <Counter end={s.end} suffix={s.suffix} />
            </div>
            <p className="text-sm font-body text-ocean-foam/60 leading-snug max-w-[160px] mx-auto">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
