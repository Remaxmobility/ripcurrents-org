'use client'

import { useState } from 'react'
import { Loader2, Check } from 'lucide-react'

interface Props {
  initialContent: Record<string, string>
}

const inputClass =
  'w-full border text-white text-sm px-3 py-2.5 placeholder:text-[rgba(173,232,244,0.3)] focus:outline-none transition-colors rounded-lg font-body'
const inputStyle = {
  background: '#0A2540',
  borderColor: 'rgba(0,180,216,0.2)',
}
const inputFocusStyle = {
  borderColor: '#00B4D8',
}
const labelStyle = {
  display: 'block',
  fontSize: '9px',
  letterSpacing: '0.3em',
  textTransform: 'uppercase' as const,
  color: '#00B4D8',
  marginBottom: '6px',
}

type Tab = 'hero' | 'stats' | 'ticker' | 'contact'

function Field({
  label, value, onChange, rows, type = 'text', placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  type?: string
  placeholder?: string
}) {
  const [focused, setFocused] = useState(false)
  const style = { ...inputStyle, ...(focused ? inputFocusStyle : {}) }

  if (rows) {
    return (
      <div>
        <label style={labelStyle}>{label}</label>
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={inputClass + ' resize-none'}
          style={style}
        />
      </div>
    )
  }
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className={inputClass}
        style={style}
      />
    </div>
  )
}

export default function ContentEditor({ initialContent }: Props) {
  const [tab, setTab] = useState<Tab>('hero')
  const [content, setContent] = useState<Record<string, string>>(initialContent)
  const [saving, setSaving] = useState<Tab | null>(null)
  const [saved, setSaved] = useState<Tab | null>(null)
  const [error, setError] = useState('')

  function set(key: string, value: string) {
    setContent((c) => ({ ...c, [key]: value }))
  }

  async function saveTab(tabName: Tab, keys: string[]) {
    setSaving(tabName)
    setError('')
    try {
      const updates = keys.map((k) => ({ key: k, value: content[k] ?? '' }))
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      })
      if (!res.ok) {
        const { error: err } = await res.json()
        throw new Error(err)
      }
      setSaved(tabName)
      setTimeout(() => setSaved(null), 2500)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(null)
    }
  }

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: 'hero',    label: 'Hero'            },
    { id: 'stats',   label: 'Stats'           },
    { id: 'ticker',  label: 'Ticker'          },
    { id: 'contact', label: 'Contact & Footer' },
  ]

  function SaveButton({ tabName, keys }: { tabName: Tab; keys: string[] }) {
    return (
      <button
        type="button"
        onClick={() => saveTab(tabName, keys)}
        disabled={saving === tabName}
        className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase px-6 py-3 rounded-xl transition-colors disabled:opacity-50 font-body"
        style={{ background: 'linear-gradient(135deg, #0096C7 0%, #00B4D8 100%)', color: '#010810' }}
      >
        {saving === tabName ? (
          <><Loader2 size={12} className="animate-spin" /> Saving...</>
        ) : saved === tabName ? (
          <><Check size={12} /> Saved</>
        ) : (
          'Save Changes'
        )}
      </button>
    )
  }

  const cardStyle = {
    background: 'rgba(10,37,64,0.5)',
    border: '1px solid rgba(0,180,216,0.12)',
    borderRadius: '16px',
    padding: '24px',
  }

  return (
    <div>
      {/* Tab bar */}
      <div className="flex mb-8" style={{ borderBottom: '1px solid rgba(0,180,216,0.12)' }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-5 py-3 text-[10px] tracking-[0.25em] uppercase transition-colors font-body"
            style={
              tab === t.id
                ? { color: '#00B4D8', borderBottom: '2px solid #00B4D8', marginBottom: '-1px' }
                : { color: 'rgba(173,232,244,0.4)' }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && <p className="text-red-400 text-sm mb-4 font-body">{error}</p>}

      {/* Hero Tab */}
      {tab === 'hero' && (
        <div style={cardStyle} className="space-y-5">
          <h2 className="font-display text-xl text-white tracking-widest mb-6">HERO SECTION</h2>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Headline Line 1" value={content.hero_headline_1 ?? ''} onChange={(v) => set('hero_headline_1', v)} placeholder="KNOW THE" />
            <Field label="Headline Line 2 (outline)" value={content.hero_headline_2 ?? ''} onChange={(v) => set('hero_headline_2', v)} placeholder="CURRENT." />
            <Field label="Headline Line 3" value={content.hero_headline_3 ?? ''} onChange={(v) => set('hero_headline_3', v)} placeholder="SAVE YOUR LIFE." />
          </div>
          <Field label="Subtitle Paragraph" value={content.hero_subtitle ?? ''} onChange={(v) => set('hero_subtitle', v)} rows={3} placeholder="Rip current education and awareness..." />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary CTA Button" value={content.hero_cta_primary ?? ''} onChange={(v) => set('hero_cta_primary', v)} placeholder="Learn to Survive" />
            <Field label="Secondary CTA Button" value={content.hero_cta_secondary ?? ''} onChange={(v) => set('hero_cta_secondary', v)} placeholder="What Is a Rip Current?" />
          </div>
          <SaveButton tabName="hero" keys={['hero_headline_1', 'hero_headline_2', 'hero_headline_3', 'hero_subtitle', 'hero_cta_primary', 'hero_cta_secondary']} />
        </div>
      )}

      {/* Stats Tab */}
      {tab === 'stats' && (
        <div style={cardStyle} className="space-y-5">
          <h2 className="font-display text-xl text-white tracking-widest mb-6">STATS BAR</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="p-4 rounded-xl space-y-3" style={{ background: 'rgba(0,180,216,0.04)', border: '1px solid rgba(0,180,216,0.1)' }}>
                <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00B4D8' }}>Stat {n}</p>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Value" value={content[`stats_${n}_value`] ?? ''} onChange={(v) => set(`stats_${n}_value`, v)} placeholder="71" />
                  <Field label="Suffix (%, +, etc.)" value={content[`stats_${n}_suffix`] ?? ''} onChange={(v) => set(`stats_${n}_suffix`, v)} placeholder="%" />
                </div>
                <Field label="Label" value={content[`stats_${n}_label`] ?? ''} onChange={(v) => set(`stats_${n}_label`, v)} placeholder="avg. deaths annually" />
              </div>
            ))}
          </div>
          <SaveButton tabName="stats" keys={[
            'stats_1_value', 'stats_1_suffix', 'stats_1_label',
            'stats_2_value', 'stats_2_suffix', 'stats_2_label',
            'stats_3_value', 'stats_3_suffix', 'stats_3_label',
            'stats_4_value', 'stats_4_suffix', 'stats_4_label',
          ]} />
        </div>
      )}

      {/* Ticker Tab */}
      {tab === 'ticker' && (
        <div style={cardStyle} className="space-y-5">
          <h2 className="font-display text-xl text-white tracking-widest mb-2">MARQUEE TICKER</h2>
          <p className="text-xs font-body mb-6" style={{ color: 'rgba(173,232,244,0.4)' }}>
            The scrolling warning text that appears below the hero. Separate segments with &nbsp;•&nbsp;
          </p>
          <Field
            label="Ticker Text"
            value={content.marquee_text ?? ''}
            onChange={(v) => set('marquee_text', v)}
            rows={3}
            placeholder="RIP CURRENTS ARE THE #1 BEACH HAZARD • KNOW BEFORE YOU GO • ..."
          />
          <SaveButton tabName="ticker" keys={['marquee_text']} />
        </div>
      )}

      {/* Contact & Footer Tab */}
      {tab === 'contact' && (
        <div style={cardStyle} className="space-y-5">
          <h2 className="font-display text-xl text-white tracking-widest mb-6">CONTACT &amp; FOOTER</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Instagram Handle" value={content.contact_instagram_handle ?? ''} onChange={(v) => set('contact_instagram_handle', v)} placeholder="@ripcurrentinfo" />
            <Field label="Instagram URL" type="url" value={content.contact_instagram_url ?? ''} onChange={(v) => set('contact_instagram_url', v)} placeholder="https://instagram.com/..." />
            <Field label="Location (City, Province)" value={content.contact_location ?? ''} onChange={(v) => set('contact_location', v)} placeholder="Ontario, Canada" />
            <Field label="Region Description" value={content.contact_location_sub ?? ''} onChange={(v) => set('contact_location_sub', v)} placeholder="Great Lakes Region" />
          </div>
          <div className="pt-4 space-y-4" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00B4D8' }}>Footer</p>
            <Field label="Footer Tagline" value={content.footer_tagline ?? ''} onChange={(v) => set('footer_tagline', v)} rows={3} placeholder="Saving lives through rip current education..." />
            <Field label="Copyright Region (e.g. Ontario, Canada)" value={content.footer_copyright_extra ?? ''} onChange={(v) => set('footer_copyright_extra', v)} placeholder="Ontario, Canada" />
          </div>
          <SaveButton tabName="contact" keys={[
            'contact_instagram_handle', 'contact_instagram_url',
            'contact_location', 'contact_location_sub',
            'footer_tagline', 'footer_copyright_extra',
          ]} />
        </div>
      )}
    </div>
  )
}
