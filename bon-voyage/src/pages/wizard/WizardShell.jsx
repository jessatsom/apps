import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Step1Destination from './Step1Destination'
import Step2Duration from './Step2Duration'
import Step3Vibe from './Step3Vibe'
import Step4Generate from './Step4Generate'
import Step5Itinerary from './Step5Itinerary'

const STEPS = [Step1Destination, Step2Duration, Step3Vibe, Step4Generate, Step5Itinerary]
const STEP_LABELS = ['Destination', 'Duration', 'Vibe', 'Discover', 'Finalize']

const INITIAL = { destination: null, duration: 7, startDate: '', endDate: '', vibes: [], itinerary: [] }

export default function WizardShell() {
  const [step, setStep] = useState(1)
  const [state, setState] = useState(INITIAL)
  const navigate = useNavigate()
  const { addTrip } = useApp()

  const update = (updates) => setState(prev => ({ ...prev, ...updates }))

  const next = (updates = {}) => {
    update(updates)
    setStep(s => Math.min(s + 1, 5))
  }
  const back = () => setStep(s => Math.max(s - 1, 1))

  const save = (itinerary) => {
    const merged = { ...state, ...(itinerary ? { itinerary } : {}) }
    const id = `trip-${Date.now()}`
    const startDate = merged.startDate || (() => {
      const d = new Date(); d.setDate(d.getDate() + 30); return d.toISOString().split('T')[0]
    })()
    const endDate = merged.endDate || (() => {
      const d = new Date(startDate); d.setDate(d.getDate() + (merged.duration || 7)); return d.toISOString().split('T')[0]
    })()
    const dest = merged.destination
    addTrip({
      id,
      title: `${dest.name} Journey`,
      destination: dest.name,
      country: dest.country,
      departDate: startDate,
      returnDate: endDate,
      status: 'upcoming',
      heroImage: `https://images.unsplash.com/photo-${dest.photoId}?w=1600&q=80&fit=crop`,
      cardImage: `https://images.unsplash.com/photo-${dest.photoId}?w=800&q=80&fit=crop`,
      tagline: `${merged.vibes.slice(0, 2).join(' & ')} in ${dest.name}`,
      vibes: merged.vibes,
      itinerary: merged.itinerary,
      bookings: [],
    })
    navigate(`/trips/${id}`)
  }

  const StepComponent = STEPS[step - 1]
  const pct = ((step - 1) / (STEPS.length - 1)) * 100

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'auto', backgroundColor: '#0b1629', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', backgroundColor: 'rgba(212,175,55,0.2)', zIndex: 200 }}>
        <div style={{ height: '100%', width: `${pct}%`, backgroundColor: '#d4af37', transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)', boxShadow: '0 0 8px rgba(212,175,55,0.6)' }} />
      </div>

      {/* Top chrome */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {step > 1 ? (
          <button onClick={back} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#dcd0ba', padding: 0 }}>
            <span style={{ fontSize: '1rem' }}>←</span> Back
          </button>
        ) : (
          <Link to="/" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 300, letterSpacing: '0.08em', color: '#f8f4ec', textDecoration: 'none' }}>Bon Voyage</Link>
        )}

        {/* Step dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ width: i + 1 === step ? '20px' : '6px', height: '6px', borderRadius: '3px', backgroundColor: i + 1 < step ? '#d4af37' : i + 1 === step ? '#d4af37' : 'rgba(212,175,55,0.25)', transition: 'all 0.3s ease', opacity: i + 1 === step ? 1 : 0.7 }} />
          ))}
        </div>

        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9e8f78' }}>
          {step} <span style={{ color: 'rgba(158,143,120,0.5)' }}>/ {STEPS.length}</span>
        </span>
      </div>

      {/* Step content */}
      <StepComponent state={state} onUpdate={update} onNext={next} onBack={back} onSave={save} />
    </div>
  )
}
