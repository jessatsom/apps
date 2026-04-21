import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { trips } from '../data/trips'

const BOOKING_TYPES = [
  { value: 'flight', icon: '✈', label: 'Flight' },
  { value: 'hotel', icon: '⌂', label: 'Hotel' },
  { value: 'activity', icon: '◈', label: 'Activity' },
  { value: 'car', icon: '◉', label: 'Car' },
  { value: 'other', icon: '◎', label: 'Other' },
]

const INITIAL_FORM = {
  tripId: '',
  type: 'flight',
  provider: '',
  reference: '',
  datetime: '',
  details: '',
  status: 'confirmed',
  notes: '',
}

export default function AddBooking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ ...INITIAL_FORM, tripId: id || '' })
  const [submitted, setSubmitted] = useState(false)

  const trip = id ? trips.find((t) => t.id === id) : null

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      navigate(id ? `/trips/${id}` : '/')
    }, 1800)
  }

  if (submitted) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: '2rem',
          paddingTop: '6rem',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: '2px solid var(--color-gold-400)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: 'var(--color-gold-400)',
          }}
        >
          ✓
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: '2rem',
            fontWeight: 300,
            color: 'var(--color-cream-100)',
            margin: 0,
            textAlign: 'center',
          }}
        >
          Booking Recorded
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: '1rem',
            fontStyle: 'italic',
            color: 'var(--color-cream-500)',
            margin: 0,
          }}
        >
          Redirecting you back…
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-navy-900)',
        paddingTop: '72px',
      }}
    >
      {/* Page header */}
      <div
        style={{
          borderBottom: '1px solid rgba(201,168,64,0.12)',
          backgroundColor: 'var(--color-navy-950)',
        }}
      >
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '3rem 2rem 2.5rem',
          }}
        >
          <Link
            to={id ? `/trips/${id}` : '/'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-family-sans)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-cream-500)',
              textDecoration: 'none',
              marginBottom: '1.5rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--color-gold-400)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--color-cream-500)')}
          >
            <span>←</span> {id ? `Back to ${trip?.destination || 'trip'}` : 'Back to journeys'}
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
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
              {trip ? trip.destination : 'New Entry'}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              color: 'var(--color-cream-50)',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Add a Booking
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: '1rem',
              fontStyle: 'italic',
              color: 'var(--color-cream-500)',
              margin: '0.5rem 0 0',
            }}
          >
            Record your reservations, flights, and experiences.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem 5rem' }}
      >
        {/* Booking type selector */}
        <FormSection label="Booking Type" required>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {BOOKING_TYPES.map((t) => (
              <TypeButton
                key={t.value}
                type={t}
                selected={form.type === t.value}
                onClick={() => setForm((prev) => ({ ...prev, type: t.value }))}
              />
            ))}
          </div>
        </FormSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {/* Trip selector (only if no trip in URL) */}
          {!id && (
            <FormSection label="Journey" required>
              <StyledSelect
                value={form.tripId}
                onChange={set('tripId')}
                required
              >
                <option value="">Select a journey…</option>
                {trips.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} — {t.destination}
                  </option>
                ))}
              </StyledSelect>
            </FormSection>
          )}

          <FormSection label="Provider / Name" required>
            <StyledInput
              type="text"
              value={form.provider}
              onChange={set('provider')}
              placeholder="e.g. Air France, Ritz Paris…"
              required
            />
          </FormSection>

          <FormSection label="Confirmation / Reference">
            <StyledInput
              type="text"
              value={form.reference}
              onChange={set('reference')}
              placeholder="e.g. AF2834, RITZ-29841"
            />
          </FormSection>

          <FormSection label="Date & Time" required>
            <StyledInput
              type="datetime-local"
              value={form.datetime}
              onChange={set('datetime')}
              required
            />
          </FormSection>

          <FormSection label="Status">
            <StyledSelect value={form.status} onChange={set('status')}>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </StyledSelect>
          </FormSection>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <FormSection label="Details">
            <StyledInput
              type="text"
              value={form.details}
              onChange={set('details')}
              placeholder="e.g. JFK → CDG · Business Class"
            />
          </FormSection>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <FormSection label="Notes">
            <StyledTextarea
              value={form.notes}
              onChange={set('notes')}
              placeholder="Any additional notes, special requests, or reminders…"
              rows={4}
            />
          </FormSection>
        </div>

        {/* Divider */}
        <div
          style={{
            margin: '2.5rem 0',
            height: '1px',
            background: 'linear-gradient(to right, rgba(201,168,64,0.2), transparent)',
          }}
        />

        {/* Submit */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="submit"
            style={{
              fontFamily: 'var(--font-family-sans)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-navy-900)',
              backgroundColor: 'var(--color-gold-400)',
              border: 'none',
              padding: '0.875rem 2.5rem',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = 'var(--color-gold-300)')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--color-gold-400)')}
          >
            Save Booking
          </button>
          <Link
            to={id ? `/trips/${id}` : '/'}
            style={{
              fontFamily: 'var(--font-family-sans)',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-cream-500)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

function FormSection({ label, required, children }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-family-sans)',
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-cream-400)',
          marginBottom: '0.625rem',
        }}
      >
        {label}
        {required && (
          <span style={{ color: 'var(--color-gold-500)', marginLeft: '3px' }}>*</span>
        )}
      </label>
      {children}
    </div>
  )
}

function TypeButton({ type, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1.1rem',
        borderRadius: '3px',
        border: selected
          ? '1px solid var(--color-gold-400)'
          : '1px solid rgba(201,168,64,0.2)',
        backgroundColor: selected ? 'rgba(212,175,55,0.12)' : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      <span style={{ fontSize: '0.9rem', color: selected ? 'var(--color-gold-400)' : 'var(--color-cream-500)' }}>
        {type.icon}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-family-sans)',
          fontSize: '0.72rem',
          fontWeight: 500,
          letterSpacing: '0.08em',
          color: selected ? 'var(--color-gold-400)' : 'var(--color-cream-400)',
        }}
      >
        {type.label}
      </span>
    </button>
  )
}

const inputBase = {
  width: '100%',
  fontFamily: 'var(--font-family-sans)',
  fontSize: '0.9rem',
  color: 'var(--color-cream-100)',
  backgroundColor: 'var(--color-navy-800)',
  border: '1px solid rgba(201,168,64,0.2)',
  borderRadius: '3px',
  padding: '0.75rem 1rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

function StyledInput(props) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      {...props}
      style={{
        ...inputBase,
        borderColor: focused ? 'rgba(201,168,64,0.55)' : 'rgba(201,168,64,0.2)',
        boxShadow: focused ? '0 0 0 2px rgba(201,168,64,0.08)' : 'none',
        colorScheme: 'dark',
      }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
    />
  )
}

function StyledSelect(props) {
  const [focused, setFocused] = useState(false)
  return (
    <select
      {...props}
      style={{
        ...inputBase,
        borderColor: focused ? 'rgba(201,168,64,0.55)' : 'rgba(201,168,64,0.2)',
        boxShadow: focused ? '0 0 0 2px rgba(201,168,64,0.08)' : 'none',
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A840' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1rem center',
        paddingRight: '2.5rem',
        colorScheme: 'dark',
      }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
    />
  )
}

function StyledTextarea(props) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      {...props}
      style={{
        ...inputBase,
        borderColor: focused ? 'rgba(201,168,64,0.55)' : 'rgba(201,168,64,0.2)',
        boxShadow: focused ? '0 0 0 2px rgba(201,168,64,0.08)' : 'none',
        resize: 'vertical',
        minHeight: '100px',
        lineHeight: 1.6,
      }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
    />
  )
}
