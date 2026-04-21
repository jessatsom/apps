import { useState } from 'react'

const PRESETS = [
  { days: 3, label: '3', sub: 'Long weekend' },
  { days: 5, label: '5', sub: 'Short break' },
  { days: 7, label: '7', sub: 'One week' },
  { days: 10, label: '10', sub: 'Extended' },
  { days: 14, label: '14', sub: 'Two weeks' },
  { days: 0, label: '✦', sub: 'Custom dates' },
]

export default function Step2Duration({ state, onNext }) {
  const [selectedDays, setSelectedDays] = useState(state.duration || 7)
  const [customMode, setCustomMode] = useState(false)
  const [startDate, setStartDate] = useState(state.startDate || '')
  const [endDate, setEndDate] = useState(state.endDate || '')

  const calcDays = () => {
    if (!startDate || !endDate) return 0
    return Math.max(1, Math.round((new Date(endDate) - new Date(startDate)) / 86400000))
  }

  const handlePreset = (p) => {
    if (p.days === 0) { setCustomMode(true); return }
    setSelectedDays(p.days)
    setCustomMode(false)
  }

  const canContinue = customMode ? (startDate && endDate && calcDays() > 0) : selectedDays > 0

  const handleNext = () => {
    if (!canContinue) return
    if (customMode) {
      onNext({ duration: calcDays(), startDate, endDate })
    } else {
      onNext({ duration: selectedDays, startDate: '', endDate: '' })
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem 4rem' }}>
      <div className="wizard-fadein" style={{ width: '100%', maxWidth: '640px', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontStyle: 'italic', color: '#d4af37', letterSpacing: '0.1em', margin: '0 0 1rem' }}>
          Step 2 of 5
        </p>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 300, color: '#fdfbf7', margin: '0 0 0.5rem', lineHeight: 1.1 }}>
          How many days?
        </h1>
        {state.destination && (
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontStyle: 'italic', color: '#c4b49a', margin: '0 0 2.5rem' }}>
            Planning your time in {state.destination.name}.
          </p>
        )}

        {/* Preset grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {PRESETS.map((p) => {
            const isSelected = p.days === 0 ? customMode : (!customMode && selectedDays === p.days)
            return (
              <button
                key={p.days}
                onClick={() => handlePreset(p)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '0.35rem', padding: '1.5rem 1rem',
                  backgroundColor: isSelected ? 'rgba(212,175,55,0.12)' : 'rgba(14,31,62,0.6)',
                  border: `1px solid ${isSelected ? 'rgba(212,175,55,0.7)' : 'rgba(212,175,55,0.15)'}`,
                  borderRadius: '4px', cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: isSelected ? '0 0 20px rgba(212,175,55,0.1)' : 'none',
                }}
              >
                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.5rem', fontWeight: 300, lineHeight: 1, color: isSelected ? '#d4af37' : '#f8f4ec' }}>{p.label}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: isSelected ? '#d4af37' : '#9e8f78' }}>{p.sub}</span>
              </button>
            )
          })}
        </div>

        {/* Custom date picker */}
        {customMode && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9e8f78', marginBottom: '0.5rem' }}>
                Depart *
              </label>
              <input type="date" min={today} value={startDate} onChange={e => setStartDate(e.target.value)}
                style={{ width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#f8f4ec', backgroundColor: 'rgba(14,31,62,0.8)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: '3px', padding: '0.75rem 0.9rem', outline: 'none', colorScheme: 'dark', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9e8f78', marginBottom: '0.5rem' }}>
                Return *
              </label>
              <input type="date" min={startDate || today} value={endDate} onChange={e => setEndDate(e.target.value)}
                style={{ width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#f8f4ec', backgroundColor: 'rgba(14,31,62,0.8)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: '3px', padding: '0.75rem 0.9rem', outline: 'none', colorScheme: 'dark', boxSizing: 'border-box' }} />
            </div>
            {calcDays() > 0 && (
              <p style={{ gridColumn: '1/-1', fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontStyle: 'italic', color: '#d4af37', margin: 0, textAlign: 'center' }}>
                {calcDays()} nights
              </p>
            )}
          </div>
        )}

        {!customMode && selectedDays > 0 && (
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontStyle: 'italic', color: '#9e8f78', margin: '0 0 1.5rem' }}>
            {selectedDays} nights in {state.destination?.name || 'your destination'}
          </p>
        )}

        <button
          onClick={handleNext}
          disabled={!canContinue}
          style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: canContinue ? '#0b1629' : '#9e8f78',
            backgroundColor: canContinue ? '#d4af37' : 'rgba(212,175,55,0.15)',
            border: 'none', padding: '0.875rem 3rem', borderRadius: '2px',
            cursor: canContinue ? 'pointer' : 'not-allowed', transition: 'all 0.25s', width: '100%',
          }}
        >
          Continue to Vibe →
        </button>
      </div>
    </div>
  )
}
