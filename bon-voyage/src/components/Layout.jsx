import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-navy-900)' }}>
      <Navbar transparent={isHome} />
      <main>
        <Outlet />
      </main>
      <footer
        style={{
          borderTop: '1px solid rgba(201,168,64,0.12)',
          padding: '2.5rem 2rem',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: '0.9rem',
            color: 'var(--color-cream-500)',
            letterSpacing: '0.08em',
            fontStyle: 'italic',
          }}
        >
          Bon Voyage — Travel beautifully.
        </p>
      </footer>
    </div>
  )
}
