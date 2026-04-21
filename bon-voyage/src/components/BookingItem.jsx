const TYPE_CONFIG = {
  flight: {
    icon: '✈',
    label: 'Flight',
    color: 'var(--color-gold-400)',
    bg: 'rgba(212,175,55,0.08)',
  },
  hotel: {
    icon: '⌂',
    label: 'Hotel',
    color: '#93c5fd',
    bg: 'rgba(147,197,253,0.08)',
  },
  activity: {
    icon: '◈',
    label: 'Activity',
    color: '#6ee7b7',
    bg: 'rgba(110,231,183,0.08)',
  },
  car: {
    icon: '◉',
    label: 'Car',
    color: '#c4b5fd',
    bg: 'rgba(196,181,253,0.08)',
  },
  other: {
    icon: '◎',
    label: 'Other',
    color: 'var(--color-cream-400)',
    bg: 'rgba(196,176,154,0.08)',
  },
}

const STATUS_STYLES = {
  confirmed: { color: '#6ee7b7', label: 'Confirmed' },
  pending: { color: 'var(--color-gold-300)', label: 'Pending' },
  cancelled: { color: '#fca5a5', label: 'Cancelled' },
}

export default function BookingItem({ booking }) {
  const type = TYPE_CONFIG[booking.type] || TYPE_CONFIG.other
  const status = STATUS_STYLES[booking.status] || STATUS_STYLES.confirmed

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  const formatTime = (d) =>
    new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div
      style={{
        display: 'flex',
        gap: '1.25rem',
        padding: '1.25rem',
        backgroundColor: type.bg,
        border: `1px solid ${type.color}20`,
        borderLeft: `3px solid ${type.color}`,
        borderRadius: '4px',
        transition: 'background-color 0.2s',
      }}
    >
      {/* Icon */}
      <div
        style={{
          flexShrink: 0,
          width: '2.5rem',
          height: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          color: type.color,
          backgroundColor: `${type.color}15`,
          borderRadius: '50%',
        }}
      >
        {type.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-family-sans)',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: type.color,
                display: 'block',
                marginBottom: '0.25rem',
              }}
            >
              {type.label}
            </span>
            <h4
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: '1.15rem',
                fontWeight: 500,
                color: 'var(--color-cream-100)',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {booking.provider}
            </h4>
          </div>
          <div
            style={{
              padding: '0.2rem 0.6rem',
              borderRadius: '2px',
              border: `1px solid ${status.color}40`,
              backgroundColor: `${status.color}10`,
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
        </div>

        <p
          style={{
            fontFamily: 'var(--font-family-sans)',
            fontSize: '0.82rem',
            color: 'var(--color-cream-400)',
            margin: '0.4rem 0',
            lineHeight: 1.5,
          }}
        >
          {booking.details}
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-family-sans)',
              fontSize: '0.75rem',
              color: 'var(--color-cream-500)',
            }}
          >
            {formatDate(booking.datetime)} · {formatTime(booking.datetime)}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-family-sans)',
              fontSize: '0.75rem',
              color: 'var(--color-cream-500)',
              fontFamily: 'monospace',
            }}
          >
            Ref: {booking.reference}
          </span>
        </div>
      </div>
    </div>
  )
}
