import { useState } from 'react'
import { useApp } from '../context/AppContext'

const TYPE_TAGS = { 'tpl-weekend': ['Weekend', 'City'], 'tpl-beach': ['Beach', 'Summer'], 'tpl-business': ['Business', 'Work'], 'tpl-international': ['International', 'Long-haul'], 'tpl-ski': ['Ski', 'Winter'], 'tpl-camping': ['Camping', 'Outdoor'] }

export default function PackingTemplates({ onSelect, onClose }) {
  const { templates } = useApp()
  const [search, setSearch] = useState('')

  const filtered = templates.filter(t => t.name.toLowerCase().includes(search.toLowerCase()))

  const totalItems = (t) => t.categories.reduce((s, c) => s + c.items.length, 0)

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(6,13,24,0.85)', backdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '680px', maxHeight: '85vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0e1f3e', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 32px 64px rgba(0,0,0,0.6)' }}>
        {/* Header */}
        <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.75rem', fontWeight: 300, color: '#f8f4ec', margin: '0 0 0.25rem' }}>Packing Templates</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#9e8f78', margin: 0 }}>Choose a starting point for your list</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9e8f78', fontSize: '1.2rem', padding: '0.25rem' }}>✕</button>
        </div>

        {/* Search */}
        <div style={{ padding: '0.875rem 1.5rem', borderBottom: '1px solid rgba(212,175,55,0.08)', flexShrink: 0 }}>
          <input
            type="text" placeholder="Search templates…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#f8f4ec', backgroundColor: 'rgba(6,13,24,0.6)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '3px', padding: '0.6rem 0.875rem', outline: 'none', boxSizing: 'border-box', colorScheme: 'dark' }}
          />
        </div>

        {/* Template list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(t => {
            const count = totalItems(t)
            const tags = TYPE_TAGS[t.id] || []
            return (
              <button
                key={t.id}
                onClick={() => onSelect(t)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1rem 1.25rem', backgroundColor: 'rgba(23,43,82,0.5)', border: '1px solid rgba(212,175,55,0.12)', borderRadius: '4px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; e.currentTarget.style.backgroundColor = 'rgba(30,56,104,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.12)'; e.currentTarget.style.backgroundColor = 'rgba(23,43,82,0.5)' }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontWeight: 500, color: '#f8f4ec', margin: 0 }}>{t.name}</h3>
                    {t.isSystem && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9e8f78', border: '1px solid rgba(158,143,120,0.3)', padding: '0.1rem 0.4rem', borderRadius: '2px' }}>System</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {tags.map(tag => (
                      <span key={tag} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.08em', color: '#d4af37', backgroundColor: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', padding: '0.1rem 0.45rem', borderRadius: '2px' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 300, color: '#d4af37', margin: 0, lineHeight: 1 }}>{count}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', color: '#9e8f78', margin: 0 }}>items</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
