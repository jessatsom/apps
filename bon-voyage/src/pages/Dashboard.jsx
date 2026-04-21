import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import TripCard from '../components/TripCard'

export default function Dashboard() {
  const { trips } = useApp()
  const upcoming = trips.filter(t => t.status === 'upcoming')
  const past = trips.filter(t => t.status === 'past')
  const featured = upcoming[0] || trips[0]

  if (!featured) return <EmptyDashboard />

  return (
    <div style={{ backgroundColor: 'var(--color-navy-900)' }}>
      {/* ─── Featured Hero ─── */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <img
          src={featured.heroImage}
          alt={featured.destination}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(11,22,41,0.3) 0%, rgba(11,22,41,0.1) 30%, rgba(11,22,41,0.7) 70%, rgba(11,22,41,0.97) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,22,41,0.4) 0%, transparent 60%)' }} />

        <div style={{ position: 'absolute', bottom: '10vh', left: 0, right: 0, maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ height: '1px', width: '40px', backgroundColor: 'var(--color-gold-400)' }} />
              <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold-400)' }}>
                Featured Journey · {featured.country}
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-family-display)', fontSize: 'clamp(3.5rem, 7vw, 7rem)', fontWeight: 300, color: 'var(--color-cream-50)', margin: '0 0 0.5rem', lineHeight: 1, letterSpacing: '-0.01em' }}>
              {featured.destination}
            </h1>
            <p style={{ fontFamily: 'var(--font-family-display)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontStyle: 'italic', fontWeight: 300, color: 'var(--color-cream-300)', margin: '0 0 2rem', lineHeight: 1.4 }}>
              {featured.tagline}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link to={`/trips/${featured.id}`} style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-navy-900)', backgroundColor: 'var(--color-gold-400)', padding: '0.875rem 2.25rem', borderRadius: '2px', textDecoration: 'none', display: 'inline-block' }}>
                View Journey
              </Link>
              <div>
                <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-cream-500)', display: 'block', marginBottom: '0.2rem' }}>Departing</span>
                <span style={{ fontFamily: 'var(--font-family-display)', fontSize: '1rem', color: 'var(--color-cream-200)' }}>
                  {new Date(featured.departDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.5 }}>
          <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-cream-300)', writingMode: 'vertical-rl' }}>Scroll</span>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, var(--color-gold-400), transparent)' }} />
        </div>
      </section>

      {/* ─── Upcoming ─── */}
      {upcoming.length > 0 && (
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 2rem 4rem' }}>
          <SectionHeader eyebrow="Your Itineraries" title="Upcoming Journeys" count={upcoming.length} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {upcoming.map(trip => <TripCard key={trip.id} trip={trip} />)}
            <PlanNewCard />
          </div>
        </section>
      )}

      {/* Divider */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(201,168,64,0.15)' }} />
          <span style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--color-gold-600)' }}>✦</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(201,168,64,0.15)' }} />
        </div>
      </div>

      {/* ─── Past ─── */}
      {past.length > 0 && (
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>
          <SectionHeader eyebrow="Memories" title="Past Journeys" count={past.length} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {past.map(trip => <TripCard key={trip.id} trip={trip} />)}
          </div>
        </section>
      )}
    </div>
  )
}

function SectionHeader({ eyebrow, title, count }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold-400)', margin: '0 0 0.5rem' }}>{eyebrow}</p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--color-cream-100)', margin: 0, lineHeight: 1 }}>{title}</h2>
        <span style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--color-cream-500)' }}>({count})</span>
      </div>
      <div style={{ marginTop: '1rem', height: '1px', background: 'linear-gradient(to right, var(--color-gold-500), rgba(201,168,64,0.1), transparent)', width: '300px' }} />
    </div>
  )
}

function PlanNewCard() {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/plan')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ height: '100%', minHeight: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', border: `1px dashed ${hovered ? 'rgba(201,168,64,0.5)' : 'rgba(201,168,64,0.2)'}`, borderRadius: '4px', backgroundColor: hovered ? 'rgba(201,168,64,0.04)' : 'transparent', cursor: 'pointer', transition: 'all 0.25s ease', background: 'none', width: '100%' }}
    >
      <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: `1px solid ${hovered ? 'var(--color-gold-400)' : 'rgba(201,168,64,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: hovered ? 'var(--color-gold-400)' : 'rgba(201,168,64,0.4)', fontSize: '1.5rem', transition: 'all 0.25s ease' }}>
        +
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.2rem', fontStyle: 'italic', color: hovered ? 'var(--color-cream-200)' : 'var(--color-cream-400)', margin: '0 0 0.3rem', transition: 'color 0.25s ease' }}>Plan a new journey</p>
        <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: hovered ? 'var(--color-gold-400)' : 'rgba(212,175,55,0.4)', margin: 0, transition: 'color 0.25s ease' }}>Start the wizard →</p>
      </div>
    </button>
  )
}

function EmptyDashboard() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-family-display)', fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 300, color: 'var(--color-cream-100)', margin: 0, lineHeight: 1 }}>Bon Voyage</h1>
      <p style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--color-cream-400)', margin: 0 }}>Your next great journey begins here.</p>
      <button onClick={() => navigate('/plan')} style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-navy-900)', backgroundColor: 'var(--color-gold-400)', border: 'none', padding: '1rem 3rem', borderRadius: '2px', cursor: 'pointer' }}>
        Plan Your First Journey
      </button>
    </div>
  )
}
