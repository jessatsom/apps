import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import TripDetail from './pages/TripDetail'
import AddBooking from './pages/AddBooking'
import WizardShell from './pages/wizard/WizardShell'

export default function App() {
  return (
    <AppProvider>
      <Routes>
        {/* Wizard — full-screen, no shared layout */}
        <Route path="/plan" element={<WizardShell />} />

        {/* Main app shell */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trips/:id" element={<TripDetail />} />
          <Route path="/trips/:id/add-booking" element={<AddBooking />} />
          <Route path="/add-booking" element={<AddBooking />} />
        </Route>
      </Routes>
    </AppProvider>
  )
}
