import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import TripDetail from './pages/TripDetail'
import AddBooking from './pages/AddBooking'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trips/:id" element={<TripDetail />} />
        <Route path="/add-booking" element={<AddBooking />} />
        <Route path="/trips/:id/add-booking" element={<AddBooking />} />
      </Route>
    </Routes>
  )
}
