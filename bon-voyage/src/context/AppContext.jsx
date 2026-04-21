import { createContext, useContext, useState, useCallback } from 'react'
import { trips as seedTrips } from '../data/trips'
import { defaultTemplates } from '../data/packingTemplates'

const AppContext = createContext(null)

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export function AppProvider({ children }) {
  const [trips, setTrips] = useState(() => load('bv-trips', seedTrips))
  const [packingLists, setPackingLists] = useState(() => load('bv-packing', {}))
  const [templates, setTemplates] = useState(() => load('bv-templates', defaultTemplates))

  const addTrip = useCallback((trip) => {
    setTrips(prev => { const next = [...prev, trip]; save('bv-trips', next); return next })
    return trip
  }, [])

  const updateTrip = useCallback((id, updates) => {
    setTrips(prev => {
      const next = prev.map(t => t.id === id ? { ...t, ...updates } : t)
      save('bv-trips', next)
      return next
    })
  }, [])

  const getTrip = useCallback((id) => trips.find(t => t.id === id), [trips])

  const setPackingList = useCallback((tripId, list) => {
    setPackingLists(prev => {
      const next = { ...prev, [tripId]: list }
      save('bv-packing', next)
      return next
    })
  }, [])

  const getPackingList = useCallback((tripId) => packingLists[tripId] || null, [packingLists])

  const addTemplate = useCallback((template) => {
    const t = { ...template, id: `tpl-${Date.now()}`, isSystem: false, createdAt: new Date().toISOString(), lastUsed: null }
    setTemplates(prev => { const next = [...prev, t]; save('bv-templates', next); return next })
    return t
  }, [])

  const markTemplateUsed = useCallback((id) => {
    setTemplates(prev => {
      const next = prev.map(t => t.id === id ? { ...t, lastUsed: new Date().toISOString() } : t)
      save('bv-templates', next)
      return next
    })
  }, [])

  return (
    <AppContext.Provider value={{ trips, addTrip, updateTrip, getTrip, packingLists, setPackingList, getPackingList, templates, addTemplate, markTemplateUsed }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}
