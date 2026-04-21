import { useState } from 'react'
import { Link } from 'react-router-dom'

const STATUS_CONFIG = {
  upcoming: { label: 'Upcoming', color: 'var(--color-gold-400)', bg: 'rgba(212,175,55,0.12)' },
  current: { label: 'En Route', color: '#6ee7b7', bg: 'rgba(110,231,183,0.12)' },
  past: { label: 'Completed', color: 'var(--color-cream-500)', bg: 'rgba(158,143,120,0.12)' },
}

export default function TripCard({ trip }) {
  const [hovered, setHovered] = useState(false)
  const status = STATUS_CONFIG[trip.status] || STATUS_CONFIG.upcoming
  const nights = Math.round(
    (new Date(trip.returnDate) - new Date(trip.departDate)) / (1000 * 60 * 60 * 24)
  )

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <Link to={`/trips/${trip.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: 'var(--color-navy-800)',
          border: '1px solid rgba(201,168,64,0.12)',
          transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          borderColor: hovered ? 'rgba(201,168,64,0.35)' : 'rgba(201,168,64,0.12)',
          boxShadow: hovered ? '0 24px 48px rgba(0,0,0,0.5)' : '0 4px 16px rgba(0,0,0,0.3)',
          cursor: 'pointer',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <img
            src={trip.cardImage || trip.heroImage}
            alt={trip.destination}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s ease',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(11,22,41,0.85) 0%, rgba(11,22,41,0.1) 60%, transparent 100%)',
            }}
          />
          {/* Status badge */}
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              padding: '0.25rem 0.625rem',
              borderRadius: '2px',
              backgroundColor: status.bg,
              border: `1px solid ${status.color}`,
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-family-sans)',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: status.color,
              }}
            >
              {status.label}
            </span>
          </div>
          {/* Destination overlay */}
          <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem', right: '1.25rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-family-sans)',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-400)',
                margin: '0 0 0.25rem',
              }}
            >
              {trip.country}
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: '1.6rem',
                fontWeight: 400,
                color: 'var(--color-cream-50)',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {trip.destination}
            </h3>
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: '1.25rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: '0.95rem',
              fontStyle: 'italic',
              color: 'var(--color-cream-400)',
              margin: '0 0 1rem',
              lineHeight: 1.5,
            }}
          >
            {trip.tagline}
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderTop: '1px solid rgba(201,168,64,0.1)',
              paddingTop: '1rem',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-cream-500)',
                  margin: '0 0 0.2rem',
                }}
              >
                {formatDate(trip.departDate)}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: '0.75rem',
                  color: 'var(--color-cream-400)',
                  margin: 0,
                }}
              >
                {nights} nights
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-cream-500)',
                  margin: '0 0 0.2rem',
                }}
              >
                Bookings
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-family-display)',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: 'var(--color-gold-400)',
                  margin: 0,
                }}
              >
                {trip.bookings.length}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
