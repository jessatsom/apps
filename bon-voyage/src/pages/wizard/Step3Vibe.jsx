import { useState } from 'react'

const VIBES = [
  { id: 'Food & Drink', emoji: '🍽', label: 'Food & Drink', desc: 'Markets, restaurants, wine' },
  { id: 'Beach', emoji: '🏖', label: 'Beach', desc: 'Sun, sand, sea' },
  { id: 'Culture & History', emoji: '🏛', label: 'Culture & History', desc: 'Museums, temples, art' },
  { id: 'Outdoors', emoji: '🌲', label: 'Outdoors', desc: 'Hiking, nature, parks' },
  { id: 'Shopping', emoji: '🛍', label: 'Shopping', desc: 'Markets, boutiques, souvenirs' },
  { id: 'Nightlife', emoji: '🌙', label: 'Nightlife', desc: 'Bars, clubs, shows' },
  { id: 'Wellness & Spa', emoji: '💆', label: 'Wellness & Spa', desc: 'Massage, hot springs, yoga' },
  { id: 'Adventure', emoji: '🧗', label: 'Adventure', desc: 'Surfing, climbing, thrills' },
]

export default function Step3Vibe({ state, onNext }) {
  const [selected, setSelected] = useState(new Set(state.vibes || []))

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleNext = () => {
    if (selected.size === 0) return
    onNext({ vibes: [...selected] })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '5.5rem 2rem 4rem' }}>
      <div className="wizard-fadein" style={{ width: '100%', maxWidth: '760px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontStyle: 'italic', color: '#d4af37', letterSpacing: '0.1em', margin: '0 0 1rem' }}>
            Step 3 of 5
          </p>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 300, color: '#fdfbf7', margin: '0 0 0.5rem', lineHeight: 1.1 }}>
            What's your vibe?
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#9e8f78', margin: 0 }}>
            Select everything that calls to you — the more you pick, the more tailored your itinerary.
          </p>
        </div>

        {/* Vibe grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {VIBES.map(v => {
            const on = selected.has(v.id)
            return (
              <button
                key={v.id}
                onClick={() => toggle(v.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem',
                  padding: '1.25rem', textAlign: 'left',
                  backgroundColor: on ? 'rgba(212,175,55,0.1)' : 'rgba(14,31,62,0.5)',
                  border: `1px solid ${on ? 'rgba(212,175,55,0.65)' : 'rgba(212,175,55,0.12)'}`,
                  borderRadius: '4px', cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: on ? '0 0 24px rgba(212,175,55,0.08), inset 0 0 0 1px rgba(212,175,55,0.1)' : 'none',
                  transform: on ? 'translateY(-2px)' : 'translateY(0)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {on && <div style={{ position: 'absolute', top: '0.5rem', right: '0.6rem', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d4af37' }} />}
                <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{v.emoji}</span>
                <div>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontWeight: 500, color: on ? '#e8c97a' : '#f8f4ec', margin: '0 0 0.2rem', lineHeight: 1.2 }}>{v.label}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#9e8f78', margin: 0, letterSpacing: '0.03em' }}>{v.desc}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Summary + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleNext}
            disabled={selected.size === 0}
            style={{
              flex: 1, fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: selected.size > 0 ? '#0b1629' : '#9e8f78',
              backgroundColor: selected.size > 0 ? '#d4af37' : 'rgba(212,175,55,0.15)',
              border: 'none', padding: '0.875rem 2rem', borderRadius: '2px',
              cursor: selected.size > 0 ? 'pointer' : 'not-allowed', transition: 'all 0.25s',
            }}
          >
            Generate My Itinerary →
          </button>
          {selected.size > 0 && (
            <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.95rem', fontStyle: 'italic', color: '#9e8f78', whiteSpace: 'nowrap' }}>
              {selected.size} vibe{selected.size > 1 ? 's' : ''} selected
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
