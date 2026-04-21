import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import BookingItem from '../components/BookingItem'
import PackingList from './PackingList'

const TABS = ['Bookings', 'Itinerary', 'Packing']

const CATEGORY_COLORS = {
  'Food & Drink': '#f59e0b', Beach: '#06b6d4', 'Culture & History': '#a78bfa',
  Outdoors: '#34d399', Shopping: '#f472b6', Nightlife: '#818cf8',
  'Wellness & Spa': '#fb7185', Adventure: '#fb923c',
}

export default function TripDetail() {
  const { id } = useParams()
  const { getTrip } = useApp()
  const trip = getTrip(id)
  const [activeTab, setActiveTab] = useState('Bookings')

  if (!trip) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--color-cream-300)' }}>Journey not found</h2>
        <Link to="/" style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold-400)', textDecoration: 'none', borderBottom: '1px solid currentColor', paddingBottom: '2px' }}>Back to journeys</Link>
      </div>
    )
  }

  const nights = Math.round((new Date(trip.returnDate) - new Date(trip.departDate)) / 86400000)
  const fmt = (d) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div style={{ backgroundColor: 'var(--color-navy-900)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '65vh', overflow: 'hidden' }}>
        <img src={trip.heroImage} alt={trip.destination} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(11,22,41,0.5) 0%, rgba(11,22,41,0.2) 40%, rgba(11,22,41,0.85) 85%, rgba(11,22,41,1) 100%)' }} />

        <div style={{ position: 'absolute', top: '5.5rem', left: 0, right: 0, maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-family-sans)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-cream-300)', textDecoration: 'none' }}>
            <span>←</span> All Journeys
          </Link>
        </div>

        <div style={{ position: 'absolute', bottom: '3rem', left: 0, right: 0, maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '32px', backgroundColor: 'var(--color-gold-400)' }} />
            <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold-400)' }}>
              {trip.country} · {trip.status === 'past' ? 'Completed Journey' : 'Upcoming Journey'}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-family-display)', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 300, color: 'var(--color-cream-50)', margin: '0 0 0.25rem', lineHeight: 1.05 }}>
            {trip.title}
          </h1>
          <p style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: 300, color: 'var(--color-cream-400)', margin: 0 }}>
            {trip.tagline}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem 6rem', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: '3rem', alignItems: 'start' }}>
        {/* Left: tabs */}
        <div style={{ paddingTop: '2.5rem' }}>
          {/* Tab bar */}
          <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid rgba(212,175,55,0.15)', marginBottom: '2rem' }}>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  fontFamily: 'var(--font-family-sans)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: activeTab === tab ? 'var(--color-gold-400)' : 'var(--color-cream-500)',
                  backgroundColor: 'transparent', border: 'none',
                  borderBottom: activeTab === tab ? '2px solid var(--color-gold-400)' : '2px solid transparent',
                  padding: '0.75rem 1.25rem 0.875rem',
                  cursor: 'pointer', transition: 'color 0.2s',
                  marginBottom: '-1px',
                }}
              >
                {tab}
                {tab === 'Packing' && <span style={{ marginLeft: '0.4rem', fontSize: '0.6rem', color: 'var(--color-gold-400)', opacity: 0.7 }}>✦</span>}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'Bookings' && <BookingsTab trip={trip} />}
          {activeTab === 'Itinerary' && <ItineraryTab trip={trip} />}
          {activeTab === 'Packing' && <PackingList trip={trip} />}
        </div>

        {/* Right: sidebar */}
        <aside style={{ paddingTop: '2.5rem', position: 'sticky', top: '5.5rem' }}>
          <div style={{ backgroundColor: 'var(--color-navy-800)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(212,175,55,0.1)', background: 'linear-gradient(135deg, rgba(212,175,55,0.08), transparent)' }}>
              <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold-400)', margin: '0 0 0.25rem' }}>Trip Summary</p>
              <h3 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--color-cream-100)', margin: 0 }}>{trip.destination}</h3>
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <StatRow label="Departs" value={fmt(trip.departDate)} />
              <StatRow label="Returns" value={fmt(trip.returnDate)} />
              <StatRow label="Duration" value={`${nights} nights`} />
              <StatRow label="Status" value={trip.status.charAt(0).toUpperCase() + trip.status.slice(1)} valueColor={trip.status === 'upcoming' ? 'var(--color-gold-400)' : trip.status === 'current' ? '#6ee7b7' : 'var(--color-cream-400)'} />
              <StatRow label="Bookings" value={`${trip.bookings.length} items`} />
              {trip.itinerary?.length > 0 && <StatRow label="Itinerary" value={`${trip.itinerary.length} experiences`} />}
            </div>
            <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(212,175,55,0.1)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link to={`/trips/${trip.id}/add-booking`} style={{ display: 'block', fontFamily: 'var(--font-family-sans)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-navy-900)', backgroundColor: 'var(--color-gold-400)', borderRadius: '2px', padding: '0.75rem', textDecoration: 'none', textAlign: 'center' }}>
                + Add Booking
              </Link>
              {(!trip.itinerary || trip.itinerary.length === 0) && (
                <Link to="/plan" style={{ display: 'block', fontFamily: 'var(--font-family-sans)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold-400)', border: '1px solid rgba(212,175,55,0.35)', borderRadius: '2px', padding: '0.75rem', textDecoration: 'none', textAlign: 'center' }}>
                  ✦ Plan New Journey
                </Link>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function BookingsTab({ trip }) {
  const confirmedCount = trip.bookings.filter(b => b.status === 'confirmed').length
  const pendingCount = trip.bookings.filter(b => b.status === 'pending').length
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.75rem', fontWeight: 400, color: 'var(--color-cream-100)', margin: '0 0 0.25rem' }}>Bookings</h2>
          <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.78rem', color: 'var(--color-cream-500)', margin: 0 }}>
            {confirmedCount} confirmed{pendingCount > 0 ? ` · ${pendingCount} pending` : ''}
          </p>
        </div>
        <Link to={`/trips/${trip.id}/add-booking`} style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-navy-900)', backgroundColor: 'var(--color-gold-400)', padding: '0.625rem 1.375rem', borderRadius: '2px', textDecoration: 'none' }}>
          + Add Booking
        </Link>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {trip.bookings.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', border: '1px dashed rgba(212,175,55,0.2)', borderRadius: '4px' }}>
            <p style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--color-cream-500)', margin: 0 }}>No bookings yet. Begin planning your journey.</p>
          </div>
        ) : (
          trip.bookings.map(booking => <BookingItem key={booking.id} booking={booking} />)
        )}
      </div>
    </div>
  )
}

function ItineraryTab({ trip }) {
  const itinerary = trip.itinerary || []
  const [bookingOpen, setBookingOpen] = useState({})
  const [bookings, setBookings] = useState({})

  if (itinerary.length === 0) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', border: '1px dashed rgba(212,175,55,0.2)', borderRadius: '4px' }}>
        <p style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.3rem', fontStyle: 'italic', color: 'var(--color-cream-400)', margin: '0 0 1rem' }}>No itinerary for this journey yet.</p>
        <Link to="/plan" style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold-400)', textDecoration: 'none', borderBottom: '1px solid currentColor', paddingBottom: '2px' }}>
          Plan a new journey →
        </Link>
      </div>
    )
  }

  const pinned = itinerary.filter(i => i.favorited)
  const rest = itinerary.filter(i => !i.favorited)

  const toggleBooking = (id) => setBookingOpen(p => ({ ...p, [id]: !p[id] }))
  const saveBooking = (id, data) => { setBookings(p => ({ ...p, [id]: data })); setBookingOpen(p => ({ ...p, [id]: false })) }

  const destTz = trip.destination?.timezone
  const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const hasTzWarning = destTz && localTz !== destTz

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.75rem', fontWeight: 400, color: 'var(--color-cream-100)', margin: '0 0 0.25rem' }}>Itinerary</h2>
      <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.78rem', color: 'var(--color-cream-500)', margin: '0 0 1.5rem' }}>{itinerary.length} experiences</p>

      {hasTzWarning && (
        <div style={{ display: 'flex', gap: '0.75rem', padding: '0.875rem 1rem', backgroundColor: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '4px', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>⚠</span>
          <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.75rem', color: '#fbbf24', margin: 0, lineHeight: 1.5 }}>
            {trip.destination} runs on a different time zone. Verify booking times locally.
          </p>
        </div>
      )}

      {pinned.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--color-gold-400)' }}>★ Pinned</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(212,175,55,0.25), transparent)' }} />
          </div>
          {pinned.map(item => (
            <ItineraryDetailCard
              key={item.id} item={item} destTz={destTz}
              bookingOpen={bookingOpen[item.id]}
              savedBooking={bookings[item.id]}
              onToggle={() => toggleBooking(item.id)}
              onSave={(data) => saveBooking(item.id, data)}
            />
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div>
          {pinned.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--color-cream-400)' }}>All Experiences</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(220,208,186,0.15), transparent)' }} />
            </div>
          )}
          {rest.map(item => (
            <ItineraryDetailCard
              key={item.id} item={item} destTz={destTz}
              bookingOpen={bookingOpen[item.id]}
              savedBooking={bookings[item.id]}
              onToggle={() => toggleBooking(item.id)}
              onSave={(data) => saveBooking(item.id, data)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ItineraryDetailCard({ item, destTz, bookingOpen, savedBooking, onToggle, onSave }) {
  const color = CATEGORY_COLORS[item.category] || '#9e8f78'
  const [form, setForm] = useState({ ref: '', date: '', time: '', notes: '' })
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  return (
    <div style={{ marginBottom: '0.875rem', backgroundColor: 'var(--color-navy-800)', border: `1px solid ${item.favorited ? 'rgba(212,175,55,0.2)' : 'rgba(212,175,55,0.1)'}`, borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: '0' }}>
        <div style={{ flexShrink: 0, width: '100px' }}>
          <img src={item.photo} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ flex: 1, padding: '0.875rem', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>{item.category}</span>
            {item.favorited && <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--color-gold-400)' }}>★</span>}
            {savedBooking && <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', color: '#34d399' }}>✓ Booked</span>}
          </div>
          <h4 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.1rem', fontWeight: 500, color: 'var(--color-cream-100)', margin: '0 0 0.25rem' }}>{item.name}</h4>
          <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.75rem', color: 'var(--color-cream-500)', margin: '0 0 0.5rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
          {savedBooking ? (
            <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.68rem', color: '#34d399', margin: 0 }}>Ref: {savedBooking.ref || '—'}{savedBooking.date ? ` · ${savedBooking.date}` : ''}</p>
          ) : (
            <button onClick={onToggle} style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: bookingOpen ? 'var(--color-cream-500)' : 'var(--color-gold-400)', backgroundColor: 'transparent', border: `1px solid ${bookingOpen ? 'rgba(158,143,120,0.3)' : 'rgba(212,175,55,0.35)'}`, padding: '0.3rem 0.7rem', borderRadius: '2px', cursor: 'pointer' }}>
              {bookingOpen ? 'Cancel' : 'I booked this'}
            </button>
          )}
        </div>
      </div>

      {/* Inline booking form */}
      <div style={{ maxHeight: bookingOpen ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        {bookingOpen && (
          <div style={{ padding: '1rem', backgroundColor: 'rgba(6,13,24,0.5)', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
            {destTz && Intl.DateTimeFormat().resolvedOptions().timeZone !== destTz && (
              <div style={{ padding: '0.5rem 0.75rem', backgroundColor: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '3px', marginBottom: '0.75rem' }}>
                <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.7rem', color: '#fbbf24', margin: 0 }}>
                  ⚠ Enter times in {trip?.destination || 'destination'} local time.
                </p>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-family-sans)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-cream-500)', marginBottom: '0.35rem' }}>Confirmation #</label>
                <input type="text" value={form.ref} onChange={set('ref')} style={{ width: '100%', fontFamily: 'var(--font-family-sans)', fontSize: '0.85rem', color: 'var(--color-cream-100)', backgroundColor: 'rgba(6,13,24,0.8)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '3px', padding: '0.55rem 0.7rem', outline: 'none', boxSizing: 'border-box', colorScheme: 'dark' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-family-sans)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-cream-500)', marginBottom: '0.35rem' }}>Date</label>
                <input type="date" value={form.date} onChange={set('date')} style={{ width: '100%', fontFamily: 'var(--font-family-sans)', fontSize: '0.82rem', color: 'var(--color-cream-100)', backgroundColor: 'rgba(6,13,24,0.8)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '3px', padding: '0.55rem 0.7rem', outline: 'none', boxSizing: 'border-box', colorScheme: 'dark' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-family-sans)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-cream-500)', marginBottom: '0.35rem' }}>Time</label>
                <input type="time" value={form.time} onChange={set('time')} style={{ width: '100%', fontFamily: 'var(--font-family-sans)', fontSize: '0.82rem', color: 'var(--color-cream-100)', backgroundColor: 'rgba(6,13,24,0.8)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '3px', padding: '0.55rem 0.7rem', outline: 'none', boxSizing: 'border-box', colorScheme: 'dark' }} />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-family-sans)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-cream-500)', marginBottom: '0.35rem' }}>Notes</label>
                <textarea value={form.notes} onChange={set('notes')} rows={2} style={{ width: '100%', fontFamily: 'var(--font-family-sans)', fontSize: '0.82rem', color: 'var(--color-cream-100)', backgroundColor: 'rgba(6,13,24,0.8)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '3px', padding: '0.55rem 0.7rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical', colorScheme: 'dark' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => onSave(form)} style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-navy-900)', backgroundColor: 'var(--color-gold-400)', border: 'none', padding: '0.55rem 1.1rem', borderRadius: '2px', cursor: 'pointer' }}>Save</button>
              <button onClick={onToggle} style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-cream-500)', backgroundColor: 'transparent', border: '1px solid rgba(212,175,55,0.15)', padding: '0.55rem 0.875rem', borderRadius: '2px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatRow({ label, value, valueColor }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem' }}>
      <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-cream-500)', flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.06)', margin: '0 0.5rem', alignSelf: 'center' }} />
      <span style={{ fontFamily: 'var(--font-family-display)', fontSize: '0.95rem', fontWeight: 400, color: valueColor || 'var(--color-cream-200)', textAlign: 'right' }}>{value}</span>
    </div>
  )
}
