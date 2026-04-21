import { useState, useEffect, useRef } from 'react'
import { searchCities, DEFAULT_PHOTO_ID, unsplashUrl } from '../../data/cities'

function CrossfadeBackground({ photoId }) {
  const [layers, setLayers] = useState([{ id: 0, photoId: photoId || DEFAULT_PHOTO_ID }])
  const counter = useRef(1)

  useEffect(() => {
    if (!photoId) return
    const id = counter.current++
    setLayers(prev => [...prev, { id, photoId }])
    const t = setTimeout(() => setLayers(prev => prev.slice(-1)), 1400)
    return () => clearTimeout(t)
  }, [photoId])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      {layers.map((layer, i) => (
        <div
          key={layer.id}
          className={i === layers.length - 1 && layers.length > 1 ? 'bg-fadein' : ''}
          style={{ position: 'absolute', inset: 0 }}
        >
          <img
            src={unsplashUrl(layer.photoId)}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
          />
        </div>
      ))}
      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,13,24,0.55) 0%, rgba(6,13,24,0.3) 40%, rgba(6,13,24,0.85) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(6,13,24,0.5) 0%, transparent 60%)' }} />
    </div>
  )
}

export default function Step1Destination({ state, onNext }) {
  const [query, setQuery] = useState(state.destination?.name || '')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const [selected, setSelected] = useState(state.destination)
  const [bgPhoto, setBgPhoto] = useState(state.destination?.photoId || DEFAULT_PHOTO_ID)
  const debounceRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    clearTimeout(debounceRef.current)
    if (query.length < 2) { setResults([]); return }
    debounceRef.current = setTimeout(() => {
      const r = searchCities(query)
      setResults(r)
      setOpen(r.length > 0)
      setHighlighted(0)
    }, 120)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  const selectCity = (city) => {
    setSelected(city)
    setQuery(`${city.name}, ${city.country}`)
    setResults([])
    setOpen(false)
    setBgPhoto(city.photoId)
  }

  const handleKeyDown = (e) => {
    if (!open || results.length === 0) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); if (results[highlighted]) selectCity(results[highlighted]) }
    else if (e.key === 'Escape') { setOpen(false) }
  }

  const handleNext = () => {
    if (selected) onNext({ destination: selected })
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem 4rem' }}>
      <CrossfadeBackground photoId={bgPhoto} />

      <div className="wizard-fadein" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontStyle: 'italic', color: '#d4af37', letterSpacing: '0.1em', margin: '0 0 1rem' }}>
          Step 1 of 5
        </p>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, color: '#fdfbf7', margin: '0 0 0.5rem', lineHeight: 1.1 }}>
          Where are you headed?
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#c4b49a', margin: '0 0 2.5rem', letterSpacing: '0.03em' }}>
          Search any city or destination in the world.
        </p>

        {/* Search */}
        <div style={{ position: 'relative', textAlign: 'left' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: '#9e8f78', fontSize: '0.9rem', pointerEvents: 'none' }}>⌕</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setSelected(null) }}
              onKeyDown={handleKeyDown}
              onFocus={() => results.length > 0 && setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 180)}
              placeholder="Paris, Tokyo, Santorini…"
              autoFocus
              style={{
                width: '100%',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '1.35rem',
                fontWeight: 400,
                color: '#f8f4ec',
                backgroundColor: 'rgba(6,13,24,0.75)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${selected ? 'rgba(212,175,55,0.6)' : 'rgba(212,175,55,0.25)'}`,
                borderRadius: '4px',
                padding: '1rem 1rem 1rem 2.75rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.25s',
                letterSpacing: '0.03em',
              }}
            />
          </div>

          {/* Typeahead dropdown */}
          {open && results.length > 0 && (
            <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, backgroundColor: 'rgba(14,31,62,0.97)', backdropFilter: 'blur(16px)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '4px', overflow: 'hidden', zIndex: 20, boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
              {results.map((city, i) => (
                <button
                  key={city.name}
                  onMouseDown={(e) => { e.preventDefault(); selectCity(city) }}
                  onMouseEnter={() => setHighlighted(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.85rem 1.1rem',
                    background: i === highlighted ? 'rgba(212,175,55,0.1)' : 'transparent',
                    border: 'none',
                    borderBottom: i < results.length - 1 ? '1px solid rgba(212,175,55,0.08)' : 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                >
                  <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontWeight: 400, color: '#f8f4ec' }}>{city.name}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9e8f78' }}>{city.country}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected destination label */}
        {selected && (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#d4af37', margin: '1rem 0 0', opacity: 0.9 }}>
            ✓ {selected.continent} · {selected.timezone.replace('_', ' ')}
          </p>
        )}

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={!selected}
          style={{
            marginTop: '2rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: selected ? '#0b1629' : '#9e8f78',
            backgroundColor: selected ? '#d4af37' : 'rgba(212,175,55,0.15)',
            border: 'none',
            padding: '0.875rem 3rem',
            borderRadius: '2px',
            cursor: selected ? 'pointer' : 'not-allowed',
            transition: 'all 0.25s',
            width: '100%',
          }}
        >
          Continue to Duration →
        </button>
      </div>
    </div>
  )
}
