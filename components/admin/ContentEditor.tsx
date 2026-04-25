'use client'

import { useState } from 'react'
import { Loader2, Check } from 'lucide-react'

interface Props {
  initialContent: Record<string, string>
}

const inputClass =
  'w-full border text-white text-sm px-3 py-2.5 placeholder:text-[rgba(173,232,244,0.3)] focus:outline-none transition-colors rounded-lg font-body'
const inputStyle = { background: '#0A2540', borderColor: 'rgba(0,180,216,0.2)' }
const inputFocusStyle = { borderColor: '#00B4D8' }
const labelStyle = {
  display: 'block',
  fontSize: '9px',
  letterSpacing: '0.3em',
  textTransform: 'uppercase' as const,
  color: '#00B4D8',
  marginBottom: '6px',
}
const sectionLabelStyle = {
  fontSize: '9px',
  letterSpacing: '0.3em',
  textTransform: 'uppercase' as const,
  color: '#00B4D8',
}
const cardStyle = {
  background: 'rgba(10,37,64,0.5)',
  border: '1px solid rgba(0,180,216,0.12)',
  borderRadius: '16px',
  padding: '24px',
}
const subCardStyle = {
  background: 'rgba(0,180,216,0.04)',
  border: '1px solid rgba(0,180,216,0.1)',
  borderRadius: '12px',
  padding: '16px',
}

type Tab = 'home' | 'sections' | 'about' | 'learn' | 'schools' | 'families' | 'involved' | 'contact'

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
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder} className={inputClass + ' resize-none'} style={style} />
      </div>
    )
  }
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        placeholder={placeholder} className={inputClass} style={style} />
    </div>
  )
}

export default function ContentEditor({ initialContent }: Props) {
  const [tab, setTab] = useState<Tab>('home')
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
        let msg = `Save failed (${res.status})`
        try {
          const body = await res.json()
          if (body?.error) msg = body.error
        } catch { /* empty body */ }
        throw new Error(msg)
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
    { id: 'home',     label: 'Home'           },
    { id: 'sections', label: 'Sections'       },
    { id: 'about',    label: 'About'          },
    { id: 'learn',    label: 'Learn'          },
    { id: 'schools',  label: 'Schools'        },
    { id: 'families', label: 'Families'       },
    { id: 'involved', label: 'Get Involved'   },
    { id: 'contact',  label: 'Contact & Footer' },
  ]

  function SaveButton({ tabName, keys }: { tabName: Tab; keys: string[] }) {
    return (
      <button type="button" onClick={() => saveTab(tabName, keys)} disabled={saving === tabName}
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

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap mb-8" style={{ borderBottom: '1px solid rgba(0,180,216,0.12)' }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="px-4 py-3 text-[10px] tracking-[0.25em] uppercase transition-colors font-body"
            style={tab === t.id
              ? { color: '#00B4D8', borderBottom: '2px solid #00B4D8', marginBottom: '-1px' }
              : { color: 'rgba(173,232,244,0.4)' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && <p className="text-red-400 text-sm mb-4 font-body">{error}</p>}

      {/* ── HOME ── */}
      {tab === 'home' && (
        <div style={cardStyle} className="space-y-5">
          <h2 className="font-display text-xl text-white tracking-widest mb-6">HOMEPAGE HERO</h2>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Headline Line 1"        value={content.hero_headline_1  ?? ''} onChange={(v) => set('hero_headline_1',  v)} placeholder="KNOW THE" />
            <Field label="Headline Line 2 (outline)" value={content.hero_headline_2 ?? ''} onChange={(v) => set('hero_headline_2', v)} placeholder="CURRENT." />
            <Field label="Headline Line 3"        value={content.hero_headline_3  ?? ''} onChange={(v) => set('hero_headline_3',  v)} placeholder="SAVE YOUR LIFE." />
          </div>
          <Field label="Subtitle Paragraph" value={content.hero_subtitle ?? ''} onChange={(v) => set('hero_subtitle', v)} rows={3} placeholder="Rip current education and awareness..." />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary CTA"   value={content.hero_cta_primary   ?? ''} onChange={(v) => set('hero_cta_primary',   v)} placeholder="Learn to Survive" />
            <Field label="Secondary CTA" value={content.hero_cta_secondary ?? ''} onChange={(v) => set('hero_cta_secondary', v)} placeholder="What Is a Rip Current?" />
          </div>
          <SaveButton tabName="home" keys={['hero_headline_1','hero_headline_2','hero_headline_3','hero_subtitle','hero_cta_primary','hero_cta_secondary']} />
        </div>
      )}

      {/* ── SECTIONS (Stats + Ticker) ── */}
      {tab === 'sections' && (
        <div style={cardStyle} className="space-y-6">
          <h2 className="font-display text-xl text-white tracking-widest mb-2">STATS BAR + TICKER</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1,2,3,4].map((n) => (
              <div key={n} style={subCardStyle} className="space-y-3">
                <p style={sectionLabelStyle}>Stat {n}</p>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Value"  value={content[`stats_${n}_value`]  ?? ''} onChange={(v) => set(`stats_${n}_value`,  v)} placeholder="71" />
                  <Field label="Suffix" value={content[`stats_${n}_suffix`] ?? ''} onChange={(v) => set(`stats_${n}_suffix`, v)} placeholder="%" />
                </div>
                <Field label="Label" value={content[`stats_${n}_label`] ?? ''} onChange={(v) => set(`stats_${n}_label`, v)} placeholder="avg. deaths annually" />
              </div>
            ))}
          </div>

          <div className="pt-4 space-y-4" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={sectionLabelStyle}>Marquee Ticker</p>
            <p className="text-xs font-body" style={{ color: 'rgba(173,232,244,0.4)' }}>Separate segments with &nbsp;•&nbsp;</p>
            <Field label="Ticker Text" value={content.marquee_text ?? ''} onChange={(v) => set('marquee_text', v)} rows={3} placeholder="RIP CURRENTS ARE THE #1 BEACH HAZARD • ..." />
          </div>

          <SaveButton tabName="sections" keys={[
            'stats_1_value','stats_1_suffix','stats_1_label',
            'stats_2_value','stats_2_suffix','stats_2_label',
            'stats_3_value','stats_3_suffix','stats_3_label',
            'stats_4_value','stats_4_suffix','stats_4_label',
            'marquee_text',
          ]} />
        </div>
      )}

      {/* ── ABOUT ── */}
      {tab === 'about' && (
        <div style={cardStyle} className="space-y-5">
          <h2 className="font-display text-xl text-white tracking-widest mb-6">ABOUT PAGE</h2>
          <Field label="Mission Paragraph" value={content.about_mission_para ?? ''} onChange={(v) => set('about_mission_para', v)} rows={3} placeholder="The Rip Current Information Project is..." />
          <Field label="Mission Quote / Pull Quote" value={content.about_mission_quote ?? ''} onChange={(v) => set('about_mission_quote', v)} rows={2} placeholder="To reduce rip current-related fatalities..." />

          <div className="pt-4 space-y-4" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={sectionLabelStyle}>Our Pillars (4 Cards)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1,2,3,4].map((n) => (
                <div key={n} style={subCardStyle} className="space-y-3">
                  <p style={sectionLabelStyle}>Pillar {n}</p>
                  <Field label="Title" value={content[`about_pillar_${n}_title`] ?? ''} onChange={(v) => set(`about_pillar_${n}_title`, v)} placeholder={['Research-Informed','Public Awareness','Education Programs','Partnerships'][n-1]} />
                  <Field label="Description" value={content[`about_pillar_${n}_desc`] ?? ''} onChange={(v) => set(`about_pillar_${n}_desc`, v)} rows={2} />
                </div>
              ))}
            </div>
          </div>

          <SaveButton tabName="about" keys={[
            'about_mission_para','about_mission_quote',
            'about_pillar_1_title','about_pillar_1_desc',
            'about_pillar_2_title','about_pillar_2_desc',
            'about_pillar_3_title','about_pillar_3_desc',
            'about_pillar_4_title','about_pillar_4_desc',
          ]} />
        </div>
      )}

      {/* ── LEARN ── */}
      {tab === 'learn' && (
        <div style={cardStyle} className="space-y-5">
          <h2 className="font-display text-xl text-white tracking-widest mb-6">LEARN PAGE</h2>
          <Field label="Hero Subtitle" value={content.learn_hero_subtitle ?? ''} onChange={(v) => set('learn_hero_subtitle', v)} rows={2} placeholder="What rip currents are, how to spot them..." />

          <div className="pt-4 space-y-3" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={sectionLabelStyle}>What Is a Rip Current? (3 paragraphs)</p>
            <Field label="Paragraph 1" value={content.learn_what_para1 ?? ''} onChange={(v) => set('learn_what_para1', v)} rows={2} />
            <Field label="Paragraph 2" value={content.learn_what_para2 ?? ''} onChange={(v) => set('learn_what_para2', v)} rows={2} />
            <Field label="Paragraph 3" value={content.learn_what_para3 ?? ''} onChange={(v) => set('learn_what_para3', v)} rows={2} />
          </div>

          <div className="pt-4 space-y-3" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={sectionLabelStyle}>Warning Signs (4 cards)</p>
            <p className="text-xs font-body" style={{ color: 'rgba(173,232,244,0.4)' }}>Note shown below heading:</p>
            <Field label="Note" value={content.learn_signs_note ?? ''} onChange={(v) => set('learn_signs_note', v)} placeholder="Always scan from an elevated position..." />
            {[1,2,3,4].map((n) => (
              <div key={n} style={subCardStyle} className="grid grid-cols-2 gap-3">
                <Field label={`Sign ${n}`}   value={content[`learn_warning_${n}_sign`]   ?? ''} onChange={(v) => set(`learn_warning_${n}_sign`,   v)} />
                <Field label="Detail" value={content[`learn_warning_${n}_detail`] ?? ''} onChange={(v) => set(`learn_warning_${n}_detail`, v)} />
              </div>
            ))}
          </div>

          <div className="pt-4 space-y-3" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={sectionLabelStyle}>Survival Steps (4 cards)</p>
            {[1,2,3,4].map((n) => (
              <div key={n} style={subCardStyle} className="grid grid-cols-2 gap-3">
                <Field label={`Step ${n} Title`} value={content[`learn_survival_${n}_title`] ?? ''} onChange={(v) => set(`learn_survival_${n}_title`, v)} />
                <Field label="Description" value={content[`learn_survival_${n}_desc`] ?? ''} onChange={(v) => set(`learn_survival_${n}_desc`, v)} />
              </div>
            ))}
          </div>

          <div className="pt-4 space-y-3" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={sectionLabelStyle}>Bottom Stats</p>
            <Field label="Stats Paragraph 1" value={content.learn_stats_para1 ?? ''} onChange={(v) => set('learn_stats_para1', v)} rows={2} />
            <Field label="Stats Paragraph 2" value={content.learn_stats_para2 ?? ''} onChange={(v) => set('learn_stats_para2', v)} />
          </div>

          <SaveButton tabName="learn" keys={[
            'learn_hero_subtitle',
            'learn_what_para1','learn_what_para2','learn_what_para3',
            'learn_signs_note',
            'learn_warning_1_sign','learn_warning_1_detail',
            'learn_warning_2_sign','learn_warning_2_detail',
            'learn_warning_3_sign','learn_warning_3_detail',
            'learn_warning_4_sign','learn_warning_4_detail',
            'learn_survival_1_title','learn_survival_1_desc',
            'learn_survival_2_title','learn_survival_2_desc',
            'learn_survival_3_title','learn_survival_3_desc',
            'learn_survival_4_title','learn_survival_4_desc',
            'learn_stats_para1','learn_stats_para2',
          ]} />
        </div>
      )}

      {/* ── SCHOOLS ── */}
      {tab === 'schools' && (
        <div style={cardStyle} className="space-y-5">
          <h2 className="font-display text-xl text-white tracking-widest mb-6">SCHOOLS PAGE</h2>
          <Field label="Hero Subtitle" value={content.schools_hero_subtitle ?? ''} onChange={(v) => set('schools_hero_subtitle', v)} rows={2} placeholder="Free rip current safety presentations..." />

          <div className="pt-4 space-y-3" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={sectionLabelStyle}>Why Schools? (3 paragraphs)</p>
            <Field label="Paragraph 1" value={content.schools_why_para1 ?? ''} onChange={(v) => set('schools_why_para1', v)} rows={2} />
            <Field label="Paragraph 2" value={content.schools_why_para2 ?? ''} onChange={(v) => set('schools_why_para2', v)} rows={2} />
            <Field label="Paragraph 3" value={content.schools_why_para3 ?? ''} onChange={(v) => set('schools_why_para3', v)} rows={2} />
          </div>

          <div className="pt-4 space-y-4" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={sectionLabelStyle}>Program Features (4 cards)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1,2,3,4].map((n) => (
                <div key={n} style={subCardStyle} className="space-y-3">
                  <p style={sectionLabelStyle}>Feature {n}</p>
                  <Field label="Title" value={content[`schools_feature_${n}_title`] ?? ''} onChange={(v) => set(`schools_feature_${n}_title`, v)} />
                  <Field label="Description" value={content[`schools_feature_${n}_desc`] ?? ''} onChange={(v) => set(`schools_feature_${n}_desc`, v)} rows={2} />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 space-y-3" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={sectionLabelStyle}>What Students Will Learn (7 bullet points)</p>
            {[1,2,3,4,5,6,7].map((n) => (
              <Field key={n} label={`Topic ${n}`} value={content[`schools_topic_${n}`] ?? ''} onChange={(v) => set(`schools_topic_${n}`, v)} />
            ))}
          </div>

          <div className="pt-4" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <Field label="Booking Form Note" value={content.schools_booking_note ?? ''} onChange={(v) => set('schools_booking_note', v)} placeholder="Fill out our contact form and we'll schedule..." />
          </div>

          <SaveButton tabName="schools" keys={[
            'schools_hero_subtitle',
            'schools_why_para1','schools_why_para2','schools_why_para3',
            'schools_feature_1_title','schools_feature_1_desc',
            'schools_feature_2_title','schools_feature_2_desc',
            'schools_feature_3_title','schools_feature_3_desc',
            'schools_feature_4_title','schools_feature_4_desc',
            'schools_topic_1','schools_topic_2','schools_topic_3','schools_topic_4',
            'schools_topic_5','schools_topic_6','schools_topic_7',
            'schools_booking_note',
          ]} />
        </div>
      )}

      {/* ── FAMILIES ── */}
      {tab === 'families' && (
        <div style={cardStyle} className="space-y-5">
          <h2 className="font-display text-xl text-white tracking-widest mb-6">FAMILIES PAGE</h2>
          <Field label="Hero Subtitle" value={content.families_hero_subtitle ?? ''} onChange={(v) => set('families_hero_subtitle', v)} rows={2} placeholder="Practical guidance for parents and caregivers..." />

          <div className="pt-4 space-y-3" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={sectionLabelStyle}>Why Families Need to Know (3 paragraphs)</p>
            <Field label="Paragraph 1" value={content.families_why_para1 ?? ''} onChange={(v) => set('families_why_para1', v)} rows={2} />
            <Field label="Paragraph 2" value={content.families_why_para2 ?? ''} onChange={(v) => set('families_why_para2', v)} rows={2} />
            <Field label="Paragraph 3" value={content.families_why_para3 ?? ''} onChange={(v) => set('families_why_para3', v)} rows={2} />
          </div>

          <div className="pt-4 space-y-3" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={sectionLabelStyle}>Beach Day Checklist (8 items)</p>
            <Field label="Checklist Note" value={content.families_checklist_note ?? ''} onChange={(v) => set('families_checklist_note', v)} placeholder="Print this out, save it to your phone..." />
            {[1,2,3,4,5,6,7,8].map((n) => (
              <Field key={n} label={`Item ${n}`} value={content[`families_checklist_${n}`] ?? ''} onChange={(v) => set(`families_checklist_${n}`, v)} />
            ))}
          </div>

          <div className="pt-4 space-y-4" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={sectionLabelStyle}>Talking to Your Kids (3 age groups)</p>
            <Field label="Age group note" value={content.families_talk_note ?? ''} onChange={(v) => set('families_talk_note', v)} placeholder="Age-appropriate language to explain rip current danger..." />
            {[1,2,3].map((n) => (
              <div key={n} style={subCardStyle} className="space-y-3">
                <Field label={`Group ${n} Age`}    value={content[`families_talk_${n}_age`]     ?? ''} onChange={(v) => set(`families_talk_${n}_age`,     v)} placeholder={['Ages 5–8','Ages 9–13','Teens'][n-1]} />
                <Field label="Script / Message"     value={content[`families_talk_${n}_message`] ?? ''} onChange={(v) => set(`families_talk_${n}_message`, v)} rows={3} />
              </div>
            ))}
          </div>

          <div className="pt-4" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <Field label="Bottom CTA Body Text" value={content.families_cta_body ?? ''} onChange={(v) => set('families_cta_body', v)} rows={2} placeholder="Download our free beach safety materials..." />
          </div>

          <SaveButton tabName="families" keys={[
            'families_hero_subtitle',
            'families_why_para1','families_why_para2','families_why_para3',
            'families_checklist_note',
            'families_checklist_1','families_checklist_2','families_checklist_3','families_checklist_4',
            'families_checklist_5','families_checklist_6','families_checklist_7','families_checklist_8',
            'families_talk_note',
            'families_talk_1_age','families_talk_1_message',
            'families_talk_2_age','families_talk_2_message',
            'families_talk_3_age','families_talk_3_message',
            'families_cta_body',
          ]} />
        </div>
      )}

      {/* ── GET INVOLVED ── */}
      {tab === 'involved' && (
        <div style={cardStyle} className="space-y-5">
          <h2 className="font-display text-xl text-white tracking-widest mb-6">GET INVOLVED PAGE</h2>
          <Field label="Hero Subtitle" value={content.involved_hero_subtitle ?? ''} onChange={(v) => set('involved_hero_subtitle', v)} rows={2} placeholder="Rip currents kill people who didn't know..." />

          <div className="pt-4 space-y-3" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={sectionLabelStyle}>Why This Matters (2 paragraphs)</p>
            <Field label="Paragraph 1" value={content.involved_why_para1 ?? ''} onChange={(v) => set('involved_why_para1', v)} rows={2} />
            <Field label="Paragraph 2" value={content.involved_why_para2 ?? ''} onChange={(v) => set('involved_why_para2', v)} rows={2} />
          </div>

          <div className="pt-4 space-y-4" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={sectionLabelStyle}>Ways to Help (5 cards)</p>
            {[1,2,3,4,5].map((n) => (
              <div key={n} style={subCardStyle} className="space-y-3">
                <p style={sectionLabelStyle}>Way {n}</p>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Title"      value={content[`involved_way_${n}_title`] ?? ''} onChange={(v) => set(`involved_way_${n}_title`, v)} />
                  <Field label="CTA Button" value={content[`involved_way_${n}_cta`]   ?? ''} onChange={(v) => set(`involved_way_${n}_cta`,   v)} />
                </div>
                <Field label="Description" value={content[`involved_way_${n}_desc`] ?? ''} onChange={(v) => set(`involved_way_${n}_desc`, v)} rows={2} />
              </div>
            ))}
          </div>

          <div className="pt-4" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <Field label="Contact Form Note" value={content.involved_form_note ?? ''} onChange={(v) => set('involved_form_note', v)} placeholder="Tell us how you'd like to help..." />
          </div>

          <SaveButton tabName="involved" keys={[
            'involved_hero_subtitle',
            'involved_why_para1','involved_why_para2',
            'involved_way_1_title','involved_way_1_desc','involved_way_1_cta',
            'involved_way_2_title','involved_way_2_desc','involved_way_2_cta',
            'involved_way_3_title','involved_way_3_desc','involved_way_3_cta',
            'involved_way_4_title','involved_way_4_desc','involved_way_4_cta',
            'involved_way_5_title','involved_way_5_desc','involved_way_5_cta',
            'involved_form_note',
          ]} />
        </div>
      )}

      {/* ── CONTACT & FOOTER ── */}
      {tab === 'contact' && (
        <div style={cardStyle} className="space-y-5">
          <h2 className="font-display text-xl text-white tracking-widest mb-6">CONTACT &amp; FOOTER</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Instagram Handle"       value={content.contact_instagram_handle ?? ''} onChange={(v) => set('contact_instagram_handle', v)} placeholder="@ripcurrentinfo" />
            <Field label="Instagram URL" type="url" value={content.contact_instagram_url  ?? ''} onChange={(v) => set('contact_instagram_url',  v)} placeholder="https://instagram.com/..." />
            <Field label="Location (City, Province)" value={content.contact_location     ?? ''} onChange={(v) => set('contact_location',     v)} placeholder="Ontario, Canada" />
            <Field label="Region Description"     value={content.contact_location_sub    ?? ''} onChange={(v) => set('contact_location_sub',    v)} placeholder="Great Lakes Region" />
          </div>
          <div className="pt-4 space-y-4" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
            <p style={sectionLabelStyle}>Footer</p>
            <Field label="Footer Tagline"            value={content.footer_tagline          ?? ''} onChange={(v) => set('footer_tagline',          v)} rows={3} placeholder="Saving lives through rip current education..." />
            <Field label="Copyright Region"          value={content.footer_copyright_extra  ?? ''} onChange={(v) => set('footer_copyright_extra',  v)} placeholder="Ontario, Canada" />
          </div>
          <SaveButton tabName="contact" keys={[
            'contact_instagram_handle','contact_instagram_url',
            'contact_location','contact_location_sub',
            'footer_tagline','footer_copyright_extra',
          ]} />
        </div>
      )}
    </div>
  )
}
