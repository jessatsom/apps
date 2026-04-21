import { useState, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import PackingItem from '../components/PackingItem'
import PackingTemplates from './PackingTemplates'

const CATEGORY_ORDER = ['Clothing', 'Toiletries', 'Documents', 'Tech', 'Gear', 'Misc']

const MOCK_DIFF = (dest, vibes = []) => {
  const adds = []
  const removes = []
  if (vibes.includes('Beach')) {
    adds.push({ name: 'Reef-safe sunscreen', essential: true, note: 'Required in some marine parks' })
    adds.push({ name: 'Waterproof tote bag', essential: false })
    removes.push('Heavy coat')
  }
  if (vibes.includes('Adventure')) {
    adds.push({ name: 'Blister plasters', essential: true })
    adds.push({ name: 'Energy bars', essential: false, note: 'For day trips' })
  }
  if (vibes.includes('Wellness & Spa')) adds.push({ name: 'Flip flops / sliders', essential: true, note: 'For spa & pool areas' })
  if (dest?.country === 'Japan') {
    adds.push({ name: 'Small towel for onsen', essential: true })
    removes.push('Casual shorts')
  }
  return { adds, removes }
}

function genId() { return Math.random().toString(36).slice(2, 10) }

function addIds(categories) {
  return categories.map(cat => ({ ...cat, id: cat.id || genId(), items: cat.items.map(item => ({ ...item, id: item.id || genId(), packed: false })) }))
}

export default function PackingList({ trip }) {
  const { getPackingList, setPackingList, addTemplate } = useApp()
  const existing = getPackingList(trip.id)
  const [list, setList] = useState(existing || null)
  const [mode, setMode] = useState('check') // check | edit
  const [generating, setGenerating] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [diffPanel, setDiffPanel] = useState(null)
  const [saveDialog, setSaveDialog] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const [animatingCategories, setAnimatingCategories] = useState(new Set())

  const persist = useCallback((updated) => { setList(updated); setPackingList(trip.id, updated) }, [trip.id, setPackingList])

  // Counts
  const allItems = list?.categories.flatMap(c => c.items) || []
  const totalCount = allItems.length
  const packedCount = allItems.filter(i => i.packed).length
  const pct = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0

  // Toggle packed
  const toggleItem = (catId, itemId) => {
    persist({
      ...list,
      categories: list.categories.map(cat =>
        cat.id === catId ? { ...cat, items: cat.items.map(item => item.id === itemId ? { ...item, packed: !item.packed } : item) } : cat
      ),
    })
  }

  const editItem = (catId, itemId, draft) => {
    persist({
      ...list,
      categories: list.categories.map(cat =>
        cat.id === catId ? { ...cat, items: cat.items.map(item => item.id === itemId ? { ...item, ...draft } : item) } : cat
      ),
    })
  }

  const deleteItem = (catId, itemId) => {
    persist({
      ...list,
      categories: list.categories.map(cat =>
        cat.id === catId ? { ...cat, items: cat.items.filter(item => item.id !== itemId) } : cat
      ).filter(cat => cat.items.length > 0),
    })
  }

  const addItem = (catId) => {
    const newItem = { id: genId(), name: 'New item', quantity: 1, essential: false, note: '', packed: false }
    persist({
      ...list,
      categories: list.categories.map(cat => cat.id === catId ? { ...cat, items: [...cat.items, newItem] } : cat),
    })
  }

  // Generate AI list
  const generateAI = async () => {
    setGenerating(true)
    try {
      const month = new Date(trip.departDate).toLocaleString('en-US', { month: 'long' })
      const res = await fetch('/api/packing-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination: trip.destination, country: trip.country, duration: Math.round((new Date(trip.returnDate) - new Date(trip.departDate)) / 86400000), vibes: trip.vibes || [], month }),
      })
      const data = await res.json()
      const withIds = addIds(data.categories || [])
      const sorted = CATEGORY_ORDER
        .map(name => withIds.find(c => c.name === name))
        .filter(Boolean)
        .concat(withIds.filter(c => !CATEGORY_ORDER.includes(c.name)))
      // Stagger animation
      sorted.forEach((cat, i) => {
        setTimeout(() => setAnimatingCategories(prev => new Set([...prev, cat.id])), i * 200)
      })
      const newList = { source: 'ai', tripId: trip.id, categories: sorted }
      persist(newList)
    } catch {
      // Fallback mock
      generateMock()
    } finally {
      setGenerating(false)
    }
  }

  const generateMock = () => {
    const mock = { source: 'ai', tripId: trip.id, categories: addIds(getMockCategories(trip)) }
    persist(mock)
  }

  // Load template
  const loadTemplate = (template) => {
    const withIds = addIds(template.categories.map(c => ({ ...c })))
    const diff = MOCK_DIFF(trip, trip.vibes || [])
    if (diff.adds.length > 0 || diff.removes.length > 0) {
      setDiffPanel({ template, withIds, diff })
    } else {
      applyTemplate(withIds)
    }
    setShowTemplates(false)
  }

  const applyTemplate = (categories) => {
    const sorted = CATEGORY_ORDER
      .map(name => categories.find(c => c.name === name))
      .filter(Boolean)
      .concat(categories.filter(c => !CATEGORY_ORDER.includes(c.name)))
    persist({ source: 'template', tripId: trip.id, categories: sorted })
    setDiffPanel(null)
  }

  const applyDiff = (adds, removes) => {
    if (!diffPanel) return
    let cats = [...diffPanel.withIds]
    // Apply adds to Misc
    if (adds.length > 0) {
      const misc = cats.find(c => c.name === 'Misc')
      const newItems = adds.map(a => ({ ...a, id: genId(), packed: false, quantity: 1, essential: a.essential || false }))
      if (misc) { cats = cats.map(c => c.name === 'Misc' ? { ...c, items: [...c.items, ...newItems] } : c) }
      else { cats = [...cats, { id: genId(), name: 'Misc', items: newItems }] }
    }
    // Apply removes
    cats = cats.map(c => ({ ...c, items: c.items.filter(i => !removes.includes(i.name)) })).filter(c => c.items.length > 0)
    applyTemplate(cats)
  }

  // Save as template
  const saveTemplate = () => {
    if (!templateName.trim() || !list) return
    addTemplate({ name: templateName.trim(), tripType: trip.vibes || [], categories: list.categories.map(c => ({ ...c, items: c.items.map(({ packed, ...rest }) => rest) })) })
    setSaveDialog(false)
    setTemplateName('')
  }

  if (!list) {
    return (
      <EmptyState
        trip={trip}
        generating={generating}
        onAI={generateAI}
        onTemplate={() => setShowTemplates(true)}
        onFresh={() => persist({ source: 'custom', tripId: trip.id, categories: addIds([{ name: 'Clothing', items: [] }, { name: 'Documents', items: [] }, { name: 'Misc', items: [] }]) })}
      />
    )
  }

  return (
    <div>
      {/* Progress bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontWeight: 400, color: '#f8f4ec' }}>
            {packedCount} of {totalCount} items packed
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', color: pct === 100 ? '#34d399' : '#d4af37' }}>{pct}%</span>
        </div>
        <div style={{ height: '4px', backgroundColor: 'rgba(212,175,55,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, backgroundColor: pct === 100 ? '#34d399' : '#d4af37', transition: 'width 0.4s ease, background-color 0.4s ease', borderRadius: '2px' }} />
        </div>
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        {/* Mode toggle */}
        <div style={{ display: 'flex', backgroundColor: 'rgba(14,31,62,0.8)', borderRadius: '3px', border: '1px solid rgba(212,175,55,0.15)', overflow: 'hidden' }}>
          {['check', 'edit'].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: mode === m ? '#0b1629' : '#9e8f78', backgroundColor: mode === m ? '#d4af37' : 'transparent', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              {m === 'check' ? '✓ Check' : '✎ Edit'}
            </button>
          ))}
        </div>

        {mode === 'edit' && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <ActionBtn onClick={generateAI} loading={generating} color="#d4af37" label="✨ AI Generate" />
            <ActionBtn onClick={() => setShowTemplates(true)} label="📋 Use Template" />
            <ActionBtn onClick={() => setSaveDialog(true)} label="Save Template" subtle />
          </div>
        )}
      </div>

      {/* AI diff panel */}
      {diffPanel && <DiffPanel diff={diffPanel.diff} onApply={applyDiff} onSkip={() => applyTemplate(diffPanel.withIds)} trip={trip} />}

      {/* Category sections */}
      {list.categories.map(cat => {
        const catPacked = cat.items.filter(i => i.packed).length
        return (
          <div key={cat.id} className={animatingCategories.has(cat.id) ? 'card-reveal' : ''} style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9e8f78' }}>
                {cat.name}
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: 'rgba(158,143,120,0.6)' }}>
                {catPacked}/{cat.items.length}
              </span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(212,175,55,0.15), transparent)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {cat.items.map((item, idx) => (
                <div key={item.id} className="pack-item-in" style={{ animationDelay: `${idx * 0.04}s` }}>
                  <PackingItem
                    item={item}
                    editMode={mode === 'edit'}
                    onToggle={() => toggleItem(cat.id, item.id)}
                    onEdit={(draft) => editItem(cat.id, item.id, draft)}
                    onDelete={() => deleteItem(cat.id, item.id)}
                  />
                </div>
              ))}
            </div>

            {mode === 'edit' && (
              <button
                onClick={() => addItem(cat.id)}
                style={{ marginTop: '0.4rem', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: 'rgba(212,175,55,0.6)', background: 'none', border: '1px dashed rgba(212,175,55,0.2)', borderRadius: '3px', padding: '0.4rem 0.75rem', cursor: 'pointer', width: '100%', transition: 'all 0.2s' }}
              >
                + Add item
              </button>
            )}
          </div>
        )
      })}

      {/* Save template dialog */}
      {saveDialog && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(6,13,24,0.8)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#0e1f3e', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '6px', padding: '1.75rem', boxShadow: '0 32px 64px rgba(0,0,0,0.6)' }}>
            <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 300, color: '#f8f4ec', margin: '0 0 0.5rem' }}>Save as Template</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#9e8f78', margin: '0 0 1.25rem' }}>This template will be available for future trips.</p>
            <input
              autoFocus type="text" placeholder="e.g. My Beach Essentials" value={templateName} onChange={e => setTemplateName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && saveTemplate()}
              style={{ width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#f8f4ec', backgroundColor: 'rgba(6,13,24,0.8)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '3px', padding: '0.7rem 0.875rem', outline: 'none', marginBottom: '1rem', boxSizing: 'border-box', colorScheme: 'dark' }}
            />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={saveTemplate} style={{ flex: 1, fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0b1629', backgroundColor: '#d4af37', border: 'none', padding: '0.7rem', borderRadius: '2px', cursor: 'pointer' }}>Save Template</button>
              <button onClick={() => setSaveDialog(false)} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9e8f78', backgroundColor: 'transparent', border: '1px solid rgba(212,175,55,0.2)', padding: '0.7rem 1rem', borderRadius: '2px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showTemplates && <PackingTemplates onSelect={loadTemplate} onClose={() => setShowTemplates(false)} />}
    </div>
  )
}

function ActionBtn({ onClick, loading, label, color, subtle }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: subtle ? '#9e8f78' : (color || '#d4af37'), backgroundColor: 'transparent', border: `1px solid ${subtle ? 'rgba(158,143,120,0.3)' : color ? 'rgba(212,175,55,0.35)' : 'rgba(212,175,55,0.35)'}`, padding: '0.5rem 0.875rem', borderRadius: '2px', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1 }}
    >
      {loading ? '…' : label}
    </button>
  )
}

function EmptyState({ trip, generating, onAI, onTemplate, onFresh }) {
  return (
    <div style={{ padding: '3rem 0', textAlign: 'center' }}>
      <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', fontWeight: 300, color: '#dcd0ba', marginBottom: '0.5rem' }}>
        No packing list yet for {trip.destination}
      </p>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#9e8f78', marginBottom: '2.5rem' }}>
        Generate one with AI, start from a template, or build from scratch.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', maxWidth: '360px', margin: '0 auto' }}>
        <button
          onClick={onAI}
          disabled={generating}
          style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '1.1rem 1.5rem', backgroundColor: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.35)', borderRadius: '4px', cursor: generating ? 'wait' : 'pointer', transition: 'all 0.2s' }}
        >
          <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>✨</span>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#d4af37', margin: '0 0 0.2rem', letterSpacing: '0.05em' }}>{generating ? 'Generating…' : 'AI Generate'}</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#9e8f78', margin: 0 }}>Tailored to {trip.destination}, your vibes & travel month</p>
          </div>
        </button>
        <button
          onClick={onTemplate}
          style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '1.1rem 1.5rem', backgroundColor: 'rgba(14,31,62,0.5)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>📋</span>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#f8f4ec', margin: '0 0 0.2rem' }}>Use a Saved Template</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#9e8f78', margin: 0 }}>Weekend getaway, beach trip, ski &amp; more</p>
          </div>
        </button>
        <button
          onClick={onFresh}
          style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '1.1rem 1.5rem', backgroundColor: 'rgba(14,31,62,0.5)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>📝</span>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#f8f4ec', margin: '0 0 0.2rem' }}>Start Fresh</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#9e8f78', margin: 0 }}>Build your list from scratch</p>
          </div>
        </button>
      </div>
    </div>
  )
}

function DiffPanel({ diff, onApply, onSkip, trip }) {
  const [addState, setAddState] = useState(() => diff.adds.map((_, i) => ({ i, accepted: true })))
  const [removeState, setRemoveState] = useState(() => diff.removes.map((_, i) => ({ i, accepted: true })))

  const handleApply = () => {
    const acceptedAdds = diff.adds.filter((_, i) => addState.find(s => s.i === i)?.accepted)
    const acceptedRemoves = diff.removes.filter((_, i) => removeState.find(s => s.i === i)?.accepted)
    onApply(acceptedAdds, acceptedRemoves)
  }

  return (
    <div style={{ marginBottom: '2rem', padding: '1.25rem', backgroundColor: 'rgba(23,43,82,0.5)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '4px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1.1rem' }}>🤖</span>
        <div>
          <h4 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontWeight: 500, color: '#f8f4ec', margin: '0 0 0.1rem' }}>Smart Suggestions</h4>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#9e8f78', margin: 0 }}>
            Based on your {trip.destination} trip{trip.vibes?.length > 0 ? ` with ${trip.vibes.slice(0, 2).join(' & ')} vibes` : ''}
          </p>
        </div>
      </div>

      {diff.adds.length > 0 && (
        <div style={{ marginBottom: '0.875rem' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#34d399', margin: '0 0 0.5rem' }}>We suggest adding</p>
          {diff.adds.map((item, i) => {
            const s = addState.find(s => s.i === i)
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(212,175,55,0.06)' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: s?.accepted ? '#f8f4ec' : '#9e8f78', textDecoration: s?.accepted ? 'none' : 'line-through' }}>+ {item.name}</span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <SuggestBtn active={s?.accepted} label="Accept" color="#34d399" onClick={() => setAddState(p => p.map(x => x.i === i ? { ...x, accepted: true } : x))} />
                  <SuggestBtn active={!s?.accepted} label="Dismiss" onClick={() => setAddState(p => p.map(x => x.i === i ? { ...x, accepted: false } : x))} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {diff.removes.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fb7185', margin: '0 0 0.5rem' }}>You may not need</p>
          {diff.removes.map((name, i) => {
            const s = removeState.find(s => s.i === i)
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(212,175,55,0.06)' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: s?.accepted ? '#fb7185' : '#9e8f78', textDecoration: s?.accepted ? 'line-through' : 'none' }}>− {name}</span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <SuggestBtn active={s?.accepted} label="Remove" color="#fb7185" onClick={() => setRemoveState(p => p.map(x => x.i === i ? { ...x, accepted: true } : x))} />
                  <SuggestBtn active={!s?.accepted} label="Keep" onClick={() => setRemoveState(p => p.map(x => x.i === i ? { ...x, accepted: false } : x))} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleApply} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0b1629', backgroundColor: '#d4af37', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '2px', cursor: 'pointer' }}>Apply Changes</button>
        <button onClick={onSkip} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9e8f78', backgroundColor: 'transparent', border: '1px solid rgba(212,175,55,0.15)', padding: '0.6rem 1rem', borderRadius: '2px', cursor: 'pointer' }}>Skip</button>
      </div>
    </div>
  )
}

function SuggestBtn({ active, label, color, onClick }) {
  return (
    <button onClick={onClick} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: active ? (color || '#d4af37') : '#9e8f78', backgroundColor: active ? `${color || '#d4af37'}15` : 'transparent', border: `1px solid ${active ? color || 'rgba(212,175,55,0.5)' : 'rgba(158,143,120,0.3)'}`, padding: '0.2rem 0.5rem', borderRadius: '2px', cursor: 'pointer' }}>
      {label}
    </button>
  )
}

// Fallback mock for when server is unavailable
function getMockCategories(trip) {
  const vibes = trip.vibes || []
  const hasBeach = vibes.includes('Beach')
  const hasAdventure = vibes.includes('Adventure')
  return [
    { name: 'Clothing', items: [{ name: 'T-shirts', quantity: 5, essential: true, note: 'Quick-dry recommended' }, { name: 'Lightweight trousers', quantity: 2, essential: true, note: '' }, { name: 'Smart casual shirt', quantity: 2, essential: false, note: 'For dinners' }, ...(hasBeach ? [{ name: 'Swimwear', quantity: 2, essential: true, note: '' }] : []), { name: 'Underwear', quantity: 7, essential: true, note: '' }, { name: 'Socks', quantity: 7, essential: true, note: '' }, { name: 'Comfortable walking shoes', quantity: 1, essential: true, note: '' }, { name: 'Light jacket', quantity: 1, essential: false, note: 'For cool evenings' }] },
    { name: 'Toiletries', items: [{ name: 'Toothbrush & toothpaste', quantity: 1, essential: true, note: '' }, { name: 'Shampoo & conditioner', quantity: 1, essential: true, note: 'Travel size' }, { name: 'Deodorant', quantity: 1, essential: true, note: '' }, { name: 'Sunscreen SPF 50', quantity: 1, essential: true, note: '' }] },
    { name: 'Documents', items: [{ name: 'Passport', quantity: 1, essential: true, note: 'Check expiry date' }, { name: 'Travel insurance', quantity: 1, essential: true, note: '' }, { name: 'Booking confirmations', quantity: 1, essential: true, note: '' }, { name: 'Payment cards', quantity: 2, essential: true, note: '' }] },
    { name: 'Tech', items: [{ name: 'Phone charger', quantity: 1, essential: true, note: '' }, { name: 'Universal power adapter', quantity: 1, essential: true, note: '' }, { name: 'Portable battery', quantity: 1, essential: false, note: '' }] },
    { name: 'Gear', items: [{ name: 'Day backpack', quantity: 1, essential: true, note: '20–25L' }, { name: 'Reusable water bottle', quantity: 1, essential: true, note: '' }, ...(hasAdventure ? [{ name: 'Hiking boots', quantity: 1, essential: true, note: '' }] : [])] },
    { name: 'Misc', items: [{ name: 'Pain reliever', quantity: 1, essential: true, note: '' }, { name: 'Hand sanitizer', quantity: 1, essential: true, note: '' }, { name: 'Sleep mask & earplugs', quantity: 1, essential: false, note: 'For flights' }] },
  ]
}
