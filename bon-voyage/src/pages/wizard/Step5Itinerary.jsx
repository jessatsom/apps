import { useState } from 'react'

const CATEGORY_COLORS = {
  'Food & Drink': '#f59e0b', Beach: '#06b6d4', 'Culture & History': '#a78bfa',
  Outdoors: '#34d399', Shopping: '#f472b6', Nightlife: '#818cf8',
  'Wellness & Spa': '#fb7185', Adventure: '#fb923c',
}

const TZ_LABELS = {
  'Europe/Paris': 'CET/CEST', 'Europe/London': 'GMT/BST', 'America/New_York': 'ET',
  'America/Los_Angeles': 'PT', 'Asia/Tokyo': 'JST', 'Asia/Bangkok': 'ICT',
  'Asia/Singapore': 'SGT', 'Asia/Dubai': 'GST', 'Indian/Maldives': 'MVT',
  'Africa/Johannesburg': 'SAST', 'Australia/Sydney': 'AEST', 'Pacific/Auckland': 'NZST',
  'Asia/Makassar': 'WITA', 'Europe/Rome': 'CET', 'Europe/Madrid': 'CET',
  'Europe/Athens': 'EET', 'Atlantic/Reykjavik': 'GMT', 'America/Mexico_City': 'CST',
}

function TZWarning({ destTz }) {
  const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone
  if (!destTz || localTz === destTz) return null
  const destTime = new Intl.DateTimeFormat('en-US', { timeZone: destTz, hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }).format(new Date())
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.625rem 0.75rem', backgroundColor: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '3px', marginBottom: '0.75rem' }}>
      <span style={{ fontSize: '0.8rem', flexShrink: 0, marginTop: '1px' }}>⚠</span>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#fbbf24', margin: 0, lineHeight: 1.5 }}>
        Destination time zone: <strong>{TZ_LABELS[destTz] || destTz}</strong> — currently {destTime}. Double-check your booking times.
      </p>
    </div>
  )
}

function BookingForm({ item, destTz, onSave, onCancel }) {
  const [form, setForm] = useState({ ref: '', date: '', time: '', tz: destTz || Intl.DateTimeFormat().resolvedOptions().timeZone, notes: '' })
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const inputStyle = { width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#f8f4ec', backgroundColor: 'rgba(6,13,24,0.8)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '3px', padding: '0.6rem 0.75rem', outline: 'none', colorScheme: 'dark', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9e8f78', marginBottom: '0.4rem' }

  return (
    <div style={{ padding: '1rem', backgroundColor: 'rgba(6,13,24,0.6)', borderTop: '1px solid rgba(212,175,55,0.12)' }}>
      <TZWarning destTz={destTz} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div style={{ gridColumn: '1/-1' }}>
          <label style={labelStyle}>Confirmation / Reference</label>
          <input type="text" value={form.ref} onChange={set('ref')} placeholder="e.g. BK-2026-7741" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Date</label>
          <input type="date" value={form.date} onChange={set('date')} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Time</label>
          <input type="time" value={form.time} onChange={set('time')} style={inputStyle} />
        </div>
        <div style={{ gridColumn: '1/-1' }}>
          <label style={labelStyle}>Time Zone</label>
          <input type="text" value={form.tz} onChange={set('tz')} placeholder="e.g. Europe/Paris" style={inputStyle} />
        </div>
        <div style={{ gridColumn: '1/-1' }}>
          <label style={labelStyle}>Notes</label>
          <textarea value={form.notes} onChange={set('notes')} rows={2} placeholder="Any notes or special requests…" style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button onClick={() => onSave(form)} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0b1629', backgroundColor: '#d4af37', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '2px', cursor: 'pointer' }}>
          Save Booking
        </button>
        <button onClick={onCancel} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9e8f78', backgroundColor: 'transparent', border: '1px solid rgba(212,175,55,0.2)', padding: '0.6rem 1.25rem', borderRadius: '2px', cursor: 'pointer' }}>
          Cancel
        </button>
      </div>
    </div>
  )
}

function ItineraryCard5({ item, destTz, bookingOpen, savedBooking, onToggleBooking, onSaveBooking }) {
  const color = CATEGORY_COLORS[item.category] || '#9e8f78'

  return (
    <div style={{ backgroundColor: 'rgba(14,31,62,0.7)', border: `1px solid ${item.favorited ? 'rgba(212,175,55,0.25)' : 'rgba(212,175,55,0.1)'}`, borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: '0' }}>
        {/* Photo */}
        <div style={{ flexShrink: 0, width: '110px' }}>
          <img src={item.photo} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        {/* Content */}
        <div style={{ flex: 1, padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>{item.category}</span>
                {item.favorited && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d4af37' }}>★ Pinned</span>}
                {savedBooking && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#34d399' }}>✓ Booked</span>}
              </div>
              <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontWeight: 500, color: '#f8f4ec', margin: 0, lineHeight: 1.2 }}>{item.name}</h3>
            </div>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.74rem', color: '#9e8f78', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {item.description}
          </p>
          {savedBooking ? (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#34d399', margin: 0 }}>
              Ref: {savedBooking.ref || '—'}{savedBooking.date ? ` · ${savedBooking.date}` : ''}{savedBooking.time ? ` at ${savedBooking.time}` : ''}
            </p>
          ) : (
            <button
              onClick={onToggleBooking}
              style={{ alignSelf: 'flex-start', marginTop: '0.2rem', fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: bookingOpen ? '#9e8f78' : '#d4af37', backgroundColor: 'transparent', border: `1px solid ${bookingOpen ? 'rgba(158,143,120,0.3)' : 'rgba(212,175,55,0.35)'}`, padding: '0.35rem 0.75rem', borderRadius: '2px', cursor: 'pointer' }}
            >
              {bookingOpen ? 'Cancel' : 'I booked this'}
            </button>
          )}
        </div>
      </div>

      {/* Booking form — expand on click */}
      <div style={{ maxHeight: bookingOpen ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        {bookingOpen && <BookingForm item={item} destTz={destTz} onSave={onSaveBooking} onCancel={onToggleBooking} />}
      </div>
    </div>
  )
}

export default function Step5Itinerary({ state, onSave }) {
  const [bookingOpen, setBookingOpen] = useState({})
  const [bookings, setBookings] = useState({})
  const destTz = state.destination?.timezone

  const items = state.itinerary || []
  const pinned = items.filter(i => i.favorited)
  const rest = items.filter(i => !i.favorited)

  const toggleBooking = (id) => setBookingOpen(p => ({ ...p, [id]: !p[id] }))
  const saveBooking = (id, data) => {
    setBookings(p => ({ ...p, [id]: data }))
    setBookingOpen(p => ({ ...p, [id]: false }))
  }

  const handleSave = () => {
    const withBookings = items.map(item => ({ ...item, booking: bookings[item.id] || null, booked: !!bookings[item.id] }))
    onSave(withBookings)
  }

  return (
    <div style={{ minHeight: '100vh', padding: '5.5rem 2rem 7rem' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div className="wizard-fadein" style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontStyle: 'italic', color: '#d4af37', letterSpacing: '0.1em', margin: '0 0 0.5rem' }}>
            Step 5 of 5
          </p>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: '#fdfbf7', margin: '0 0 0.25rem', lineHeight: 1.1 }}>
            Finalize Your Journey
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#9e8f78', margin: 0 }}>
            Log any bookings you've already made — we'll track them in your trip.
          </p>
        </div>

        {/* Timezone banner */}
        {destTz && Intl.DateTimeFormat().resolvedOptions().timeZone !== destTz && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.875rem 1rem', backgroundColor: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '4px', marginBottom: '2rem' }}>
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>⚠</span>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#fbbf24', margin: '0 0 0.2rem', fontWeight: 500 }}>
                Time zone heads-up
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#c4b49a', margin: 0, lineHeight: 1.5 }}>
                {state.destination?.name} runs on <strong>{TZ_LABELS[destTz] || destTz}</strong>. When entering booking times below, use the destination's local time to avoid confusion.
              </p>
            </div>
          </div>
        )}

        {/* Pinned section */}
        {pinned.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 400, color: '#d4af37' }}>★ Pinned Experiences</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(212,175,55,0.3), transparent)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {pinned.map(item => (
                <ItineraryCard5
                  key={item.id} item={item} destTz={destTz}
                  bookingOpen={bookingOpen[item.id]}
                  savedBooking={bookings[item.id]}
                  onToggleBooking={() => toggleBooking(item.id)}
                  onSaveBooking={(data) => saveBooking(item.id, data)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Rest of itinerary */}
        {rest.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 400, color: '#dcd0ba' }}>All Suggestions</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(220,208,186,0.2), transparent)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {rest.map(item => (
                <ItineraryCard5
                  key={item.id} item={item} destTz={destTz}
                  bookingOpen={bookingOpen[item.id]}
                  savedBooking={bookings[item.id]}
                  onToggleBooking={() => toggleBooking(item.id)}
                  onSaveBooking={(data) => saveBooking(item.id, data)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky save bar */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(11,22,41,0.95)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(212,175,55,0.15)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', zIndex: 50 }}>
        <div>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontStyle: 'italic', color: '#d4af37', margin: 0 }}>
            {Object.keys(bookings).length > 0 ? `${Object.keys(bookings).length} booking${Object.keys(bookings).length > 1 ? 's' : ''} logged` : 'Ready to save your journey'}
          </p>
        </div>
        <button
          onClick={handleSave}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0b1629', backgroundColor: '#d4af37', border: 'none', padding: '0.75rem 2rem', borderRadius: '2px', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          Save Journey →
        </button>
      </div>
    </div>
  )
}
