import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isTransparent = transparent && !scrolled

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        backgroundColor: isTransparent ? 'transparent' : 'rgba(11,22,41,0.92)',
        backdropFilter: isTransparent ? 'none' : 'blur(12px)',
        borderBottom: isTransparent ? '1px solid transparent' : '1px solid rgba(201,168,64,0.15)',
      }}
    >
      <nav
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: '1.75rem',
                fontWeight: 300,
                letterSpacing: '0.1em',
                color: 'var(--color-cream-100)',
                lineHeight: 1,
              }}
            >
              Bon Voyage
            </span>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-gold-400)',
                display: 'inline-block',
                marginBottom: '2px',
              }}
            />
          </div>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <NavLink to="/" active={location.pathname === '/'}>
            My Journeys
          </NavLink>
          <Link
            to="/add-booking"
            style={{
              fontFamily: 'var(--font-family-sans)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-navy-900)',
              backgroundColor: 'var(--color-gold-400)',
              padding: '0.5rem 1.25rem',
              borderRadius: '2px',
              textDecoration: 'none',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = 'var(--color-gold-300)')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--color-gold-400)')}
          >
            New Booking
          </Link>
        </div>
      </nav>
    </header>
  )
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      style={{
        fontFamily: 'var(--font-family-sans)',
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: active ? 'var(--color-gold-400)' : 'var(--color-cream-300)',
        textDecoration: 'none',
        paddingBottom: '2px',
        borderBottom: active ? '1px solid var(--color-gold-400)' : '1px solid transparent',
        transition: 'color 0.2s, border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!active) e.target.style.color = 'var(--color-cream-100)'
      }}
      onMouseLeave={(e) => {
        if (!active) e.target.style.color = 'var(--color-cream-300)'
      }}
    >
      {children}
    </Link>
  )
}
