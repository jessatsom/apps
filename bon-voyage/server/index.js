import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173'] }))

const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null

app.post('/api/packing-list', async (req, res) => {
  const { destination, country, duration, vibes = [], month } = req.body

  if (!anthropic) {
    console.log('[packing] No API key — returning mock')
    return res.json(mockList(destination, vibes))
  }

  try {
    const msg = await anthropic.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 2048,
      system: 'You are a travel packing assistant. Return ONLY valid JSON with no other text or markdown.',
      messages: [{
        role: 'user',
        content: `Generate a packing list for a ${duration}-night trip to ${destination}, ${country} in ${month}.
Activities: ${vibes.join(', ') || 'general sightseeing'}.

Return this exact JSON structure:
{
  "categories": [
    {
      "name": "Clothing",
      "items": [
        { "name": "T-shirts", "quantity": 5, "essential": true, "note": "Quick-dry fabric" }
      ]
    }
  ]
}

Use exactly these category names: Clothing, Toiletries, Documents, Tech, Gear, Misc.
Include 35–50 items total. Tailor specifically to destination climate, culture, and selected activities.`,
      }],
    })

    const text = msg.content[0].text
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')
    return res.json(JSON.parse(match[0]))
  } catch (err) {
    console.error('[packing] Anthropic error:', err.message)
    return res.json(mockList(destination, vibes))
  }
})

app.get('/api/health', (_, res) => res.json({ ok: true, hasKey: !!anthropic }))

app.listen(3001, () => {
  console.log(`\n✈  Bon Voyage API → http://localhost:3001`)
  console.log(`   Anthropic key: ${anthropic ? '✓ configured' : '✗ missing (mock mode)'}`)
})

function mockList(destination, vibes = []) {
  const hasBeach = vibes.includes('Beach')
  const hasAdventure = vibes.includes('Adventure')
  const hasWellness = vibes.includes('Wellness & Spa')
  const hasBusiness = vibes.includes('Business')

  return {
    categories: [
      {
        name: 'Clothing',
        items: [
          { name: 'T-shirts', quantity: 5, essential: true, note: 'Quick-dry fabric recommended' },
          { name: 'Lightweight trousers', quantity: 2, essential: true, note: '' },
          { name: 'Smart casual shirt', quantity: 2, essential: false, note: 'For restaurants and evenings' },
          ...(hasBeach ? [{ name: 'Swimwear', quantity: 3, essential: true, note: '' }, { name: 'Cover-up / sarong', quantity: 1, essential: true, note: '' }] : []),
          ...(hasAdventure ? [{ name: 'Convertible hiking trousers', quantity: 1, essential: true, note: '' }] : []),
          ...(hasBusiness ? [{ name: 'Business attire', quantity: 2, essential: true, note: '' }] : []),
          { name: 'Underwear', quantity: 7, essential: true, note: '' },
          { name: 'Socks', quantity: 7, essential: true, note: '' },
          { name: 'Comfortable walking shoes', quantity: 1, essential: true, note: '' },
          { name: 'Light jacket or blazer', quantity: 1, essential: false, note: 'Evenings can be cool' },
          { name: 'Sunglasses', quantity: 1, essential: true, note: '' },
        ],
      },
      {
        name: 'Toiletries',
        items: [
          { name: 'Toothbrush & toothpaste', quantity: 1, essential: true, note: '' },
          { name: 'Shampoo & conditioner', quantity: 1, essential: true, note: 'Travel size' },
          { name: 'Deodorant', quantity: 1, essential: true, note: '' },
          { name: `Sunscreen SPF 50`, quantity: 1, essential: true, note: `Critical for ${destination}` },
          ...(hasBeach ? [{ name: 'After-sun lotion', quantity: 1, essential: false, note: '' }] : []),
          ...(hasWellness ? [{ name: 'Face mask & serums', quantity: 1, essential: false, note: '' }] : []),
          { name: 'Moisturiser', quantity: 1, essential: false, note: '' },
          { name: 'Lip balm with SPF', quantity: 1, essential: false, note: '' },
        ],
      },
      {
        name: 'Documents',
        items: [
          { name: 'Passport', quantity: 1, essential: true, note: 'Verify 6-month validity' },
          { name: 'Travel insurance documents', quantity: 1, essential: true, note: '' },
          { name: 'Flight confirmations (printed)', quantity: 1, essential: true, note: '' },
          { name: 'Hotel confirmations (printed)', quantity: 1, essential: true, note: '' },
          { name: 'Credit & debit cards', quantity: 2, essential: true, note: 'Notify bank before travel' },
          { name: 'Emergency contacts', quantity: 1, essential: true, note: 'Laminated copy' },
        ],
      },
      {
        name: 'Tech',
        items: [
          { name: 'Phone & charger', quantity: 1, essential: true, note: '' },
          { name: 'Universal power adapter', quantity: 1, essential: true, note: `For ${destination}` },
          { name: 'Portable battery (20,000 mAh)', quantity: 1, essential: false, note: '' },
          { name: 'Noise-cancelling headphones', quantity: 1, essential: false, note: 'For long flights' },
          ...(hasAdventure ? [{ name: 'Action camera', quantity: 1, essential: false, note: '' }] : []),
          { name: 'E-reader', quantity: 1, essential: false, note: '' },
        ],
      },
      {
        name: 'Gear',
        items: [
          { name: 'Day backpack (25L)', quantity: 1, essential: true, note: '' },
          { name: 'Reusable water bottle', quantity: 1, essential: true, note: '' },
          ...(hasBeach ? [{ name: 'Waterproof dry bag', quantity: 1, essential: true, note: '' }, { name: 'Snorkel set', quantity: 1, essential: false, note: 'Or rent locally' }] : []),
          ...(hasAdventure ? [{ name: 'Hiking boots', quantity: 1, essential: true, note: 'Break in before travel' }, { name: 'Trekking poles', quantity: 2, essential: false, note: '' }] : []),
          { name: 'Travel umbrella', quantity: 1, essential: false, note: '' },
          { name: 'Packing cubes (set of 3)', quantity: 1, essential: false, note: '' },
        ],
      },
      {
        name: 'Misc',
        items: [
          { name: 'Pain reliever (ibuprofen)', quantity: 1, essential: true, note: '' },
          { name: 'Hand sanitizer', quantity: 2, essential: true, note: '' },
          { name: 'Stomach remedies', quantity: 1, essential: true, note: '' },
          { name: 'Sleep mask & earplugs', quantity: 1, essential: false, note: 'For flights' },
          { name: 'Snacks for travel', quantity: 3, essential: false, note: 'Nuts, protein bars' },
        ],
      },
    ],
  }
}
