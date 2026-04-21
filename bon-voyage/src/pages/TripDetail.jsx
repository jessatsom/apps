import { useParams, Link } from 'react-router-dom'
import { getTrip } from '../data/trips'
import BookingItem from '../components/BookingItem'

export default function TripDetail() {
  const { id } = useParams()
  const trip = getTrip(id)

  if (!trip) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          padding: '2rem',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: '2rem',
            fontWeight: 300,
            color: 'var(--color-cream-300)',
          }}
        >
          Journey not found
        </h2>
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-family-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-gold-400)',
            textDecoration: 'none',
            borderBottom: '1px solid currentColor',
            paddingBottom: '2px',
          }}
        >
          Back to journeys
        </Link>
      </div>
    )
  }

  const nights = Math.round(
    (new Date(trip.returnDate) - new Date(trip.departDate)) / (1000 * 60 * 60 * 24)
  )
  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

  const confirmedCount = trip.bookings.filter((b) => b.status === 'confirmed').length
  const pendingCount = trip.bookings.filter((b) => b.status === 'pending').length

  return (
    <div style={{ backgroundColor: 'var(--color-navy-900)', minHeight: '100vh' }}>
      {/* ─── Hero ─── */}
      <div style={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
        <img
          src={trip.heroImage}
          alt={trip.destination}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(11,22,41,0.5) 0%, rgba(11,22,41,0.2) 40%, rgba(11,22,41,0.85) 85%, rgba(11,22,41,1) 100%)',
          }}
        />

        {/* Back link */}
        <div
          style={{
            position: 'absolute',
            top: '5.5rem',
            left: 0,
            right: 0,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 2rem',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-family-sans)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-cream-300)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            <span style={{ fontSize: '0.85rem' }}>←</span> All Journeys
          </Link>
        </div>

        {/* Hero text */}
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: 0,
            right: 0,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '32px', backgroundColor: 'var(--color-gold-400)' }} />
            <span
              style={{
                fontFamily: 'var(--font-family-sans)',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-400)',
              }}
            >
              {trip.country} · {trip.status === 'past' ? 'Completed Journey' : 'Upcoming Journey'}
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              fontWeight: 300,
              color: 'var(--color-cream-50)',
              margin: '0 0 0.25rem',
              lineHeight: 1.05,
            }}
          >
            {trip.title}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: '1.1rem',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--color-cream-400)',
              margin: 0,
            }}
          >
            {trip.tagline}
          </p>
        </div>
      </div>

      {/* ─── Content ─── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '3rem 2rem 6rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 300px',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        {/* Main — Bookings */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-family-display)',
                  fontSize: '1.75rem',
                  fontWeight: 400,
                  color: 'var(--color-cream-100)',
                  margin: '0 0 0.25rem',
                }}
              >
                Bookings
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: '0.78rem',
                  color: 'var(--color-cream-500)',
                  margin: 0,
                }}
              >
                {confirmedCount} confirmed{pendingCount > 0 ? ` · ${pendingCount} pending` : ''}
              </p>
            </div>
            <Link
              to={`/trips/${trip.id}/add-booking`}
              style={{
                fontFamily: 'var(--font-family-sans)',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-navy-900)',
                backgroundColor: 'var(--color-gold-400)',
                padding: '0.625rem 1.375rem',
                borderRadius: '2px',
                textDecoration: 'none',
              }}
            >
              + Add Booking
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {trip.bookings.length === 0 ? (
              <div
                style={{
                  padding: '3rem',
                  textAlign: 'center',
                  border: '1px dashed rgba(201,168,64,0.2)',
                  borderRadius: '4px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-family-display)',
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    color: 'var(--color-cream-500)',
                    margin: 0,
                  }}
                >
                  No bookings yet. Begin planning your journey.
                </p>
              </div>
            ) : (
              trip.bookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: '5.5rem' }}>
          <div
            style={{
              backgroundColor: 'var(--color-navy-800)',
              border: '1px solid rgba(201,168,64,0.15)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid rgba(201,168,64,0.1)',
                background: 'linear-gradient(135deg, rgba(201,168,64,0.08), transparent)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold-400)',
                  margin: '0 0 0.25rem',
                }}
              >
                Trip Summary
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-family-display)',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: 'var(--color-cream-100)',
                  margin: 0,
                }}
              >
                {trip.destination}
              </h3>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <StatRow label="Departs" value={formatDate(trip.departDate)} />
              <StatRow label="Returns" value={formatDate(trip.returnDate)} />
              <StatRow label="Duration" value={`${nights} nights`} />
              <StatRow
                label="Status"
                value={trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                valueColor={
                  trip.status === 'upcoming'
                    ? 'var(--color-gold-400)'
                    : trip.status === 'current'
                    ? '#6ee7b7'
                    : 'var(--color-cream-400)'
                }
              />
              <StatRow label="Bookings" value={`${trip.bookings.length} items`} />
            </div>

            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderTop: '1px solid rgba(201,168,64,0.1)',
              }}
            >
              <Link
                to={`/trips/${trip.id}/add-booking`}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold-400)',
                  border: '1px solid rgba(201,168,64,0.35)',
                  borderRadius: '2px',
                  padding: '0.75rem',
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(201,168,64,0.08)'
                  e.target.style.borderColor = 'rgba(201,168,64,0.6)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.borderColor = 'rgba(201,168,64,0.35)'
                }}
              >
                + Add Booking
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function StatRow({ label, value, valueColor }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '0.5rem',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-family-sans)',
          fontSize: '0.72rem',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-cream-500)',
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.06)',
          margin: '0 0.5rem',
          alignSelf: 'center',
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-family-display)',
          fontSize: '0.95rem',
          fontWeight: 400,
          color: valueColor || 'var(--color-cream-200)',
          textAlign: 'right',
        }}
      >
        {value}
      </span>
    </div>
  )
}
