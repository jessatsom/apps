import { useState, useEffect, useRef } from 'react'
import { generateMockItinerary } from '../../data/mockItineraries'

const LOADING_LINES = [
  'Curating local experiences…',
  'Sourcing hidden gems…',
  'Weaving your itinerary…',
  'Tailoring to your vibe…',
  'Almost ready…',
]

const CATEGORY_COLORS = {
  'Food & Drink': '#f59e0b',
  Beach: '#06b6d4',
  'Culture & History': '#a78bfa',
  Outdoors: '#34d399',
  Shopping: '#f472b6',
  Nightlife: '#818cf8',
  'Wellness & Spa': '#fb7185',
  Adventure: '#fb923c',
}

export default function Step4Generate({ state, onNext }) {
  const [phase, setPhase] = useState('loading') // loading | reveal
  const [loadingLine, setLoadingLine] = useState(0)
  const [progress, setProgress] = useState(0)
  const [itinerary, setItinerary] = useState([])
  const [favorites, setFavorites] = useState(new Set())
  const done = useRef(false)

  useEffect(() => {
    const items = generateMockItinerary(state.destination?.name || 'Paris', state.duration || 7, state.vibes || [])
    setItinerary(items)

    const lineInterval = setInterval(() => setLoadingLine(l => Math.min(l + 1, LOADING_LINES.length - 1)), 420)
    const progInterval = setInterval(() => setProgress(p => Math.min(p + 8, 95)), 130)

    const revealTimer = setTimeout(() => {
      clearInterval(lineInterval)
      clearInterval(progInterval)
      setProgress(100)
      setTimeout(() => { if (!done.current) { done.current = true; setPhase('reveal') } }, 300)
    }, 2200)

    return () => { clearInterval(lineInterval); clearInterval(progInterval); clearTimeout(revealTimer) }
  }, [])

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  if (phase === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem 4rem', gap: '2rem' }}>
        {/* Spinner ring */}
        <div style={{ width: '64px', height: '64px', position: 'relative' }}>
          <svg viewBox="0 0 64 64" style={{ width: '100%', height: '100%', animation: 'spin 1.4s linear infinite' }}>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="3" />
            <circle cx="32" cy="32" r="28" fill="none" stroke="#d4af37" strokeWidth="3" strokeDasharray="44 132" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 300, color: '#f8f4ec', margin: '0 0 0.5rem' }}>
            Building your <em style={{ color: '#d4af37' }}>{state.destination?.name}</em> trip…
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#9e8f78', margin: 0, letterSpacing: '0.08em', minHeight: '1.2em', transition: 'opacity 0.3s' }}>
            {LOADING_LINES[loadingLine]}
          </p>
        </div>

        <div style={{ width: '280px', height: '2px', backgroundColor: 'rgba(212,175,55,0.15)', borderRadius: '1px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, backgroundColor: '#d4af37', borderRadius: '1px', transition: 'width 0.15s ease' }} />
        </div>
      </div>
    )
  }

  // Group itinerary by day
  const days = [...new Set(itinerary.map(i => i.day))].sort((a, b) => a - b)

  return (
    <div style={{ minHeight: '100vh', padding: '5.5rem 2rem 7rem' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        {/* Header */}
        <div className="wizard-fadein" style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontStyle: 'italic', color: '#d4af37', letterSpacing: '0.1em', margin: '0 0 0.5rem' }}>
            Step 4 of 5
          </p>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: '#fdfbf7', margin: '0 0 0.5rem', lineHeight: 1.1 }}>
            Your {state.destination?.name} Itinerary
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#9e8f78', margin: 0 }}>
            {state.duration} days · {itinerary.length} experiences · Heart the ones you love most
          </p>
        </div>

        {/* Day groups */}
        {days.map((day) => (
          <div key={day} style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 400, color: '#dcd0ba' }}>Day {day}</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(212,175,55,0.2), transparent)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {itinerary
                .filter(item => item.day === day)
                .map((item, i) => (
                  <ItineraryCard
                    key={item.id}
                    item={item}
                    index={i + (day - 1) * 2}
                    favorited={favorites.has(item.id)}
                    onFavorite={() => toggleFavorite(item.id)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky bottom bar */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(11,22,41,0.95)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(212,175,55,0.15)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', zIndex: 50 }}>
        <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontStyle: 'italic', color: favorites.size > 0 ? '#d4af37' : '#9e8f78' }}>
          {favorites.size > 0 ? `${favorites.size} experience${favorites.size > 1 ? 's' : ''} saved` : 'Heart experiences to save them'}
        </span>
        <button
          onClick={() => onNext({ itinerary: itinerary.map(item => ({ ...item, favorited: favorites.has(item.id) })) })}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0b1629', backgroundColor: '#d4af37', border: 'none', padding: '0.75rem 2rem', borderRadius: '2px', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          Finalize Journey →
        </button>
      </div>
    </div>
  )
}

function ItineraryCard({ item, index, favorited, onFavorite }) {
  const color = CATEGORY_COLORS[item.category] || '#9e8f78'
  const delayStyle = { animationDelay: `${index * 0.07}s` }

  return (
    <div
      className="card-reveal"
      style={{ ...delayStyle, display: 'flex', gap: '1rem', backgroundColor: 'rgba(14,31,62,0.6)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: '4px', overflow: 'hidden' }}
    >
      {/* Photo */}
      <div style={{ flexShrink: 0, width: '120px', position: 'relative' }}>
        <img src={item.photo} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, rgba(14,31,62,0.3))' }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '1rem 1rem 1rem 0', display: 'flex', flexDirection: 'column', gap: '0.35rem', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
          <div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color, display: 'block', marginBottom: '0.25rem' }}>
              {item.timeOfDay} · {item.category}
            </span>
            <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontWeight: 500, color: '#f8f4ec', margin: 0, lineHeight: 1.2 }}>{item.name}</h3>
          </div>
          <button
            onClick={onFavorite}
            style={{ flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', lineHeight: 1, padding: '0.2rem', transition: 'transform 0.2s', transform: favorited ? 'scale(1.2)' : 'scale(1)', color: favorited ? '#ef4444' : 'rgba(248,244,236,0.3)' }}
          >
            {favorited ? '♥' : '♡'}
          </button>
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#9e8f78', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {item.description}
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.15rem' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#9e8f78' }}>⏱ {item.duration}</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#9e8f78' }}>{item.priceRange}</span>
        </div>
      </div>
    </div>
  )
}
