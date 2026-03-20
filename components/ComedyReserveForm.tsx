'use client'

import { useState } from 'react'

interface Props {
  ticketUrl: string
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ComedyReserveForm({ ticketUrl }: Props) {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name:    formData.get('name') as string,
      email:   formData.get('email') as string,
      phone:   formData.get('phone') as string,
      tables:  formData.get('tables') as string,
      message: formData.get('message') as string,
    }

    // POST to Formspree — set NEXT_PUBLIC_FORMSPREE_ID in .env.local
    // Get your free form ID at https://formspree.io/forms/new
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? 'xpwdgklp'

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Table Reservation – RiP Roaring Comedy Night (${data.tables} table${data.tables === '1' ? '' : 's'})`,
          Name: data.name,
          Email: data.email,
          Phone: data.phone,
          Tables: `${data.tables} table${data.tables === '1' ? '' : 's'} (${parseInt(data.tables) * 8} tickets — $${parseInt(data.tables) * 400})`,
          Message: data.message || 'No additional notes',
        }),
      })

      if (res.ok) {
        setState('success')
      } else {
        const json = await res.json().catch(() => ({}))
        setErrorMsg((json as { error?: string }).error ?? 'Submission failed. Please email us directly.')
        setState('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again or email us directly.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div
        className="rounded-3xl p-10 text-center"
        style={{ background: 'linear-gradient(135deg, rgba(0,60,20,0.4) 0%, rgba(0,20,10,0.6) 100%)', border: '1px solid rgba(100,255,120,0.25)' }}
      >
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="font-display text-white text-2xl mb-3">Reservation Received!</h3>
        <p className="text-ocean-foam/70 font-body text-sm leading-relaxed mb-6">
          We'll be in touch shortly to confirm your table. Don't forget to grab your tickets through Zeffy to
          lock in your seats.
        </p>
        <a
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold font-body text-sm
                     transition-all duration-200 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #FFE566, #FF8C00)', color: '#1A0505' }}
        >
          🎟️ Buy Tickets Now
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl p-8 space-y-5"
      style={{ background: 'linear-gradient(135deg, rgba(60,10,10,0.4) 0%, rgba(0,0,0,0.5) 100%)', border: '1px solid rgba(255,200,0,0.15)' }}
    >
      <h3 className="font-display text-white text-2xl mb-1">Reserve Your Table</h3>
      <p className="text-ocean-foam/55 font-body text-xs mb-4">
        Tables of 8 · $400 total · Reserved group seating
      </p>

      {/* Name */}
      <div>
        <label className="block text-xs font-body font-semibold text-yellow-400/80 uppercase tracking-wider mb-1.5">
          Full Name *
        </label>
        <input
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/30
                     focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,200,0,0.2)' }}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-body font-semibold text-yellow-400/80 uppercase tracking-wider mb-1.5">
          Email Address *
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/30
                     focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,200,0,0.2)' }}
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-body font-semibold text-yellow-400/80 uppercase tracking-wider mb-1.5">
          Phone Number
        </label>
        <input
          name="phone"
          type="tel"
          placeholder="(519) 555-0100"
          className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/30
                     focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,200,0,0.2)' }}
        />
      </div>

      {/* Number of tables */}
      <div>
        <label className="block text-xs font-body font-semibold text-yellow-400/80 uppercase tracking-wider mb-1.5">
          Number of Tables *
        </label>
        <select
          name="tables"
          required
          defaultValue=""
          className="w-full rounded-xl px-4 py-3 font-body text-sm text-white
                     focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all cursor-pointer"
          style={{ background: 'rgba(20,5,5,0.9)', border: '1px solid rgba(255,200,0,0.2)' }}
        >
          <option value="" disabled>Select number of tables</option>
          <option value="1">1 table — 8 seats ($400)</option>
          <option value="2">2 tables — 16 seats ($800)</option>
          <option value="3">3 tables — 24 seats ($1,200)</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-body font-semibold text-yellow-400/80 uppercase tracking-wider mb-1.5">
          Additional Notes
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="Any special requests or questions?"
          className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/30
                     focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all resize-none"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,200,0,0.2)' }}
        />
      </div>

      {/* Error */}
      {state === 'error' && (
        <p className="text-danger-orange text-xs font-body bg-danger-orange/10 rounded-xl px-4 py-3">
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="w-full py-4 rounded-xl font-bold font-body text-base transition-all duration-200
                   hover:scale-[1.02] active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg, #FFE566, #FF8C00)', color: '#1A0505', boxShadow: '0 4px 24px rgba(255,165,0,0.25)' }}
      >
        {state === 'submitting' ? 'Sending…' : '🪑 Request Table Reservation'}
      </button>

      <p className="text-ocean-foam/35 font-body text-xs text-center leading-relaxed">
        A confirmation email will be sent once your reservation is approved.
        Tickets must be purchased separately via Zeffy.
      </p>
    </form>
  )
}
