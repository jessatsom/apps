import { useState, useRef } from 'react'

export default function PackingItem({ item, editMode, onToggle, onEdit, onDelete }) {
  const [bouncing, setBouncing] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ name: item.name, quantity: item.quantity, note: item.note || '', essential: item.essential })
  const inputRef = useRef(null)

  const handleCheck = () => {
    setBouncing(true)
    setTimeout(() => setBouncing(false), 400)
    onToggle()
  }

  const commitEdit = () => {
    setEditing(false)
    onEdit(draft)
  }

  if (editing) {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.6rem 0.75rem', backgroundColor: 'rgba(30,56,104,0.5)', borderRadius: '3px', border: '1px solid rgba(212,175,55,0.25)' }}>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem' }}>
          <input
            ref={inputRef}
            autoFocus
            value={draft.name}
            onChange={e => setDraft(p => ({ ...p, name: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && commitEdit()}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#f8f4ec', backgroundColor: 'rgba(6,13,24,0.8)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '3px', padding: '0.35rem 0.6rem', outline: 'none', colorScheme: 'dark' }}
          />
          <input
            type="number" min="1" value={draft.quantity}
            onChange={e => setDraft(p => ({ ...p, quantity: parseInt(e.target.value) || 1 }))}
            style={{ width: '56px', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#f8f4ec', backgroundColor: 'rgba(6,13,24,0.8)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '3px', padding: '0.35rem 0.5rem', outline: 'none', colorScheme: 'dark', textAlign: 'center' }}
          />
          <input
            value={draft.note}
            onChange={e => setDraft(p => ({ ...p, note: e.target.value }))}
            placeholder="Note…"
            style={{ gridColumn: '1/-1', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#9e8f78', backgroundColor: 'rgba(6,13,24,0.8)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '3px', padding: '0.3rem 0.6rem', outline: 'none', colorScheme: 'dark' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'center' }}>
          <button onClick={commitEdit} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0b1629', backgroundColor: '#d4af37', border: 'none', padding: '0.35rem 0.6rem', borderRadius: '2px', cursor: 'pointer' }}>✓</button>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={draft.essential} onChange={e => setDraft(p => ({ ...p, essential: e.target.checked }))} style={{ accentColor: '#d4af37' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: '#9e8f78' }}>essential</span>
          </label>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem',
        borderRadius: '3px',
        backgroundColor: item.packed ? 'rgba(6,13,24,0.3)' : 'transparent',
        transition: 'background-color 0.2s',
      }}
    >
      {/* Custom checkbox */}
      <button
        onClick={handleCheck}
        className={bouncing ? 'check-bounce' : ''}
        style={{
          flexShrink: 0, width: '20px', height: '20px', borderRadius: '50%',
          border: `2px solid ${item.packed ? '#d4af37' : 'rgba(212,175,55,0.35)'}`,
          backgroundColor: item.packed ? '#d4af37' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', background: 'none',
          transition: 'border-color 0.2s, background-color 0.2s',
          padding: 0,
        }}
      >
        {item.packed && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 3.5l3 3L9 1" stroke="#0b1629" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span
          style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
            color: item.packed ? '#9e8f78' : '#f8f4ec',
            textDecoration: item.packed ? 'line-through' : 'none',
            textDecorationColor: 'rgba(158,143,120,0.6)',
            transition: 'color 0.2s, text-decoration 0.2s',
          }}
        >
          {item.name}
        </span>
        {item.quantity > 1 && (
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 600, color: '#9e8f78', backgroundColor: 'rgba(30,56,104,0.8)', padding: '0.1rem 0.4rem', borderRadius: '2px' }}>×{item.quantity}</span>
        )}
        {item.essential && (
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d4af37', border: '1px solid rgba(212,175,55,0.4)', padding: '0.1rem 0.4rem', borderRadius: '2px' }}>
            Essential
          </span>
        )}
        {item.note && (
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontStyle: 'italic', color: '#9e8f78', width: '100%' }}>
            {item.note}
          </span>
        )}
      </div>

      {/* Edit mode actions */}
      {editMode && (
        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
          <button onClick={() => setEditing(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9e8f78', fontSize: '0.8rem', padding: '0.2rem', transition: 'color 0.15s' }}>✎</button>
          <button onClick={onDelete} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(248,113,113,0.6)', fontSize: '0.85rem', padding: '0.2rem', transition: 'color 0.15s' }}>×</button>
        </div>
      )}
    </div>
  )
}
