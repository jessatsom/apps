const ACT = {
  // Paris
  PAR_EIFFEL: {
    id: 'par-eiffel', name: 'Eiffel Tower', category: 'Culture & History',
    description: 'Begin your Parisian adventure at the iconic iron lattice tower. Ascend to the summit for sweeping panoramas of Haussmann boulevards and the Seine winding through the city.',
    photo: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=480&q=80&fit=crop',
    duration: '2–3 hrs', address: 'Champ de Mars, 75007 Paris', priceRange: '€€',
  },
  PAR_CAFE: {
    id: 'par-cafe', name: 'Café de Flore', category: 'Food & Drink',
    description: 'A pillar of Saint-Germain literary life since 1887. Order a grand crème and a croissant amid the red banquettes and Art Deco mirrors frequented by Sartre and de Beauvoir.',
    photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=480&q=80&fit=crop',
    duration: '1 hr', address: '172 Bd Saint-Germain, 75006 Paris', priceRange: '€€',
  },
  PAR_LOUVRE: {
    id: 'par-louvre', name: 'Louvre Museum', category: 'Culture & History',
    description: 'The world\'s largest art museum houses 35,000 works across 60,600 m² of gallery space. Navigate from the Venus de Milo to the Winged Victory before standing before the Mona Lisa.',
    photo: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=480&q=80&fit=crop',
    duration: '4–5 hrs', address: 'Rue de Rivoli, 75001 Paris', priceRange: '€€',
  },
  PAR_ORSAY: {
    id: 'par-orsay', name: 'Musée d\'Orsay', category: 'Culture & History',
    description: 'Housed in a converted Beaux-Arts railway station, the Orsay holds the world\'s finest Impressionist collection — Monet\'s water lilies, Renoir\'s golden light, Van Gogh\'s tortured stars.',
    photo: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=480&q=80&fit=crop',
    duration: '3 hrs', address: '1 Rue de la Légion d\'Honneur, 75007 Paris', priceRange: '€€',
  },
  PAR_SEINE: {
    id: 'par-seine', name: 'Seine River Cruise', category: 'Outdoors',
    description: 'Glide beneath 37 stone bridges as Paris\'s greatest monuments drift past at water level. The evening light on Notre-Dame and the Conciergerie is genuinely unmissable.',
    photo: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=480&q=80&fit=crop',
    duration: '1.5 hrs', address: 'Port de la Bourdonnais, 75007 Paris', priceRange: '€€',
  },
  PAR_MONTMARTRE: {
    id: 'par-montmartre', name: 'Sacré-Cœur & Montmartre', category: 'Culture & History',
    description: 'Climb the winding streets of Paris\'s artistic hilltop village to the gleaming white basilica. The view across the rooftops at dusk is worth every step.',
    photo: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=480&q=80&fit=crop',
    duration: '3 hrs', address: '35 Rue du Chevalier de la Barre, 75018 Paris', priceRange: 'Free',
  },
  PAR_VERSAILLES: {
    id: 'par-versailles', name: 'Palace of Versailles', category: 'Culture & History',
    description: 'Louis XIV\'s monument to absolute power stretches over 2,000 acres of formal gardens, fountains, and gilded state rooms. The Hall of Mirrors alone justifies the day trip.',
    photo: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=480&q=80&fit=crop',
    duration: 'Full day', address: 'Place d\'Armes, 78000 Versailles', priceRange: '€€€',
  },
  PAR_MARAIS: {
    id: 'par-marais', name: 'Le Marais & Place des Vosges', category: 'Shopping',
    description: 'Paris\'s most characterful quartier blends medieval timber houses with concept boutiques, gallery spaces, and the oldest royal square in France. The falafel on Rue des Rosiers is mandatory.',
    photo: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=480&q=80&fit=crop',
    duration: '3 hrs', address: 'Place des Vosges, 75003 Paris', priceRange: '€',
  },
  PAR_MOULIN: {
    id: 'par-moulin', name: 'Moulin Rouge Show', category: 'Nightlife',
    description: 'The world\'s most famous cabaret has been dazzling audiences since 1889. The Féerie revue pairs rhinestone costumes, French cancan, and 60 international artists into an unforgettable spectacle.',
    photo: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=480&q=80&fit=crop',
    duration: '2.5 hrs', address: '82 Bd de Clichy, 75018 Paris', priceRange: '€€€€',
  },
  PAR_HAMMAM: {
    id: 'par-hammam', name: 'Hammam de la Mosquée de Paris', category: 'Wellness & Spa',
    description: 'Beneath the minarets of the 1926 Great Mosque, a Moorish-tiled hammam offers steam rooms, cold plunge pools, and kessa exfoliation treatments unchanged for a century.',
    photo: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=480&q=80&fit=crop',
    duration: '2–3 hrs', address: '39 Rue Geoffroy Saint-Hilaire, 75005 Paris', priceRange: '€€',
  },
  PAR_LUXEMBOURG: {
    id: 'par-luxembourg', name: 'Jardin du Luxembourg', category: 'Outdoors',
    description: 'The Senate\'s 23-hectare garden is the green soul of the Left Bank. Rent a model sailboat, read in a wrought-iron chair, or simply watch Parisians play pétanque in the long afternoon light.',
    photo: 'https://images.unsplash.com/photo-1465189684280-6a8fa9b19a7a?w=480&q=80&fit=crop',
    duration: '2 hrs', address: 'Rue de Médicis, 75006 Paris', priceRange: 'Free',
  },
  PAR_POMPIDOU: {
    id: 'par-pompidou', name: 'Centre Pompidou', category: 'Culture & History',
    description: 'Europe\'s largest museum of modern art wears its organs on the outside — technicolor pipes and escalators wrapped in glass tubes — and fills its inside with Picasso, Matisse, and Warhol.',
    photo: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=480&q=80&fit=crop',
    duration: '2–3 hrs', address: 'Place Georges-Pompidou, 75004 Paris', priceRange: '€€',
  },
  PAR_DINNER: {
    id: 'par-dinner', name: 'Farewell Dinner at Le Grand Véfour', category: 'Food & Drink',
    description: 'Napoleon and Josephine\'s old favourite restaurant occupies the most beautiful dining room in Paris — 18th-century painted glass panels under the arcades of the Palais-Royal.',
    photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=480&q=80&fit=crop',
    duration: '2.5 hrs', address: '17 Rue de Beaujolais, 75001 Paris', priceRange: '€€€€',
  },

  // Santorini
  SAN_CALDERA: {
    id: 'san-caldera', name: 'Oia Caldera Sunset', category: 'Outdoors',
    description: 'The most painted sunset in the Mediterranean. Claim a clifftop perch in the whitewashed village of Oia and watch the sun sink into the ancient volcanic crater.',
    photo: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=480&q=80&fit=crop',
    duration: '2 hrs', address: 'Oia, Santorini 847 02', priceRange: 'Free',
  },
  SAN_BOAT: {
    id: 'san-boat', name: 'Private Catamaran Cruise', category: 'Adventure',
    description: 'Sail around the caldera rim, snorkel in volcanic hot springs, and anchor in the turquoise bay of Thirassia for a freshly grilled seafood lunch aboard.',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=480&q=80&fit=crop',
    duration: '5 hrs', address: 'Ammoudi Bay, Oia', priceRange: '€€€€',
  },
  SAN_WINE: {
    id: 'san-wine', name: 'Santo Wines Winery', category: 'Food & Drink',
    description: 'Santorini\'s volcanic soil produces a unique Assyrtiko white wine. Taste the mineral-driven, high-acidity varieties at the cliff-edge winery while watching ferries move far below.',
    photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=480&q=80&fit=crop',
    duration: '2 hrs', address: 'Pyrgos, Thira 847 00', priceRange: '€€',
  },
  SAN_AKROTIRI: {
    id: 'san-akrotiri', name: 'Akrotiri Archaeological Site', category: 'Culture & History',
    description: 'The Minoan Bronze Age city preserved by the same eruption that may have inspired the Atlantis myth. Whole streets, frescoes, and three-story buildings survive in astonishing condition.',
    photo: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=480&q=80&fit=crop',
    duration: '2 hrs', address: 'Akrotiri, Thira', priceRange: '€€',
  },
  SAN_BEACH: {
    id: 'san-beach', name: 'Red Beach', category: 'Beach',
    description: 'Towering cliffs of ancient red lava create one of the Mediterranean\'s most dramatic beaches. The water turns extraordinary shades of teal against the burnt ochre volcanic rock.',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=480&q=80&fit=crop',
    duration: '3 hrs', address: 'Red Beach, Akrotiri', priceRange: 'Free',
  },
  SAN_SPA: {
    id: 'san-spa', name: 'Hammam & Spa at Canaves Oia', category: 'Wellness & Spa',
    description: 'Float in an infinity pool that merges visually with the caldera, then retreat to a cave-cut treatment room for a volcanic stone massage using Santorini sea salt scrubs.',
    photo: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=480&q=80&fit=crop',
    duration: '3 hrs', address: 'Canaves Oia, Santorini', priceRange: '€€€€',
  },

  // Kyoto
  KYO_FUSHIMI: {
    id: 'kyo-fushimi', name: 'Fushimi Inari Shrine', category: 'Culture & History',
    description: 'Ten thousand vermillion torii gates wind up Mount Inari in an unbroken tunnel of wood and lacquer. Arrive at dawn to walk the full path to the summit in solitude.',
    photo: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=480&q=80&fit=crop',
    duration: '3–4 hrs', address: '68 Fukakusa Yabunouchicho, Fushimi Ward', priceRange: 'Free',
  },
  KYO_ARASHIYAMA: {
    id: 'kyo-arashiyama', name: 'Arashiyama Bamboo Grove', category: 'Outdoors',
    description: 'The hollow percussion of wind through towering bamboo stalks is a sound you will not find anywhere else on earth. The grove surrounds the Tenryū-ji Zen garden.',
    photo: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=480&q=80&fit=crop',
    duration: '2–3 hrs', address: 'Sagaogurayama Tabuchiyamacho, Ukyo Ward', priceRange: 'Free',
  },
  KYO_RAMEN: {
    id: 'kyo-ramen', name: 'Nishiki Market & Tofu Kaiseki', category: 'Food & Drink',
    description: 'Navigate Kyoto\'s "Kitchen" — a covered alley of 100 vendors selling pickled plum, fresh yuba, and grilled skewers — then end with an evening kaiseki course centred on artisanal tofu.',
    photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=480&q=80&fit=crop',
    duration: '3 hrs', address: 'Nishiki Market, Nakagyo Ward', priceRange: '€€€',
  },
  KYO_GION: {
    id: 'kyo-gion', name: 'Gion Evening Walk', category: 'Culture & History',
    description: 'Kyoto\'s geisha district glows with paper lanterns at dusk. Walk Hanamikoji Street and watch for the glimpse of a maiko\'s lacquered hair pin disappearing around a corner.',
    photo: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=480&q=80&fit=crop',
    duration: '2 hrs', address: 'Gion, Higashiyama Ward', priceRange: 'Free',
  },
  KYO_ONSEN: {
    id: 'kyo-onsen', name: 'Kurama Onsen', category: 'Wellness & Spa',
    description: 'Soak in outdoor sulphur pools on a forested mountainside 45 minutes north of Kyoto. The rotenburo open-air bath under ancient cryptomeria trees is transcendent in autumn.',
    photo: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=480&q=80&fit=crop',
    duration: '3 hrs', address: '520 Kurama Honmachi, Sakyo Ward', priceRange: '€€',
  },
  KYO_KINKAKUJI: {
    id: 'kyo-kinkakuji', name: 'Kinkaku-ji Golden Pavilion', category: 'Culture & History',
    description: 'The three-tiered Zen temple sheathed entirely in gold leaf reflects in its mirror pond with almost theatrical perfection. Even in the crowds it stops your breath.',
    photo: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=480&q=80&fit=crop',
    duration: '1.5 hrs', address: '1 Kinkakujicho, Kita Ward', priceRange: '€',
  },

  // Bali
  BAL_UBUD: {
    id: 'bal-ubud', name: 'Ubud Monkey Forest & Rice Terraces', category: 'Outdoors',
    description: 'Wander among 700 long-tailed macaques in a sacred forest, then cycle downhill through the emerald geometry of the Tegallalang rice terraces as dawn mist burns away.',
    photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=480&q=80&fit=crop',
    duration: '4 hrs', address: 'Jl. Monkey Forest, Ubud', priceRange: '€',
  },
  BAL_TEMPLE: {
    id: 'bal-temple', name: 'Tanah Lot Temple at Sunset', category: 'Culture & History',
    description: 'The sea temple perched on a coastal rock formation transforms at low tide when devotees wade across to worship. The silhouette against a fire-orange sky is quintessential Bali.',
    photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=480&q=80&fit=crop',
    duration: '2.5 hrs', address: 'Beraban, Kediri, Tabanan', priceRange: '€',
  },
  BAL_SURF: {
    id: 'bal-surf', name: 'Surf Lesson at Kuta Beach', category: 'Adventure',
    description: 'Bali\'s warm, consistent waves break over a sandy bottom, making Kuta one of the world\'s best beginner surf spots. Most students are standing by their second lesson.',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=480&q=80&fit=crop',
    duration: '3 hrs', address: 'Kuta Beach, Badung', priceRange: '€€',
  },
  BAL_SPA: {
    id: 'bal-spa', name: 'Traditional Balinese Massage', category: 'Wellness & Spa',
    description: 'A full-body massage combining acupressure, reflexology, and stretching with warm coconut oil in an open-air pavilion overlooking a lotus pond. Possibly the best value in wellness on earth.',
    photo: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=480&q=80&fit=crop',
    duration: '2 hrs', address: 'Seminyak, Bali', priceRange: '€',
  },

  // Generic fallback activities
  GEN_MARKET: {
    id: 'gen-market', name: 'Central Market Tour', category: 'Food & Drink',
    description: 'The city\'s historic market brings together producers, spice merchants, and street food vendors under one vast roof. The best introduction to local flavours and rhythms.',
    photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=480&q=80&fit=crop',
    duration: '2 hrs', address: 'City Centre', priceRange: '€',
  },
  GEN_MUSEUM: {
    id: 'gen-museum', name: 'National History Museum', category: 'Culture & History',
    description: 'The finest collection of the nation\'s art, artefacts, and cultural heritage gathered under one roof. Allow yourself to get gloriously lost.',
    photo: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=480&q=80&fit=crop',
    duration: '3 hrs', address: 'Museum District', priceRange: '€€',
  },
  GEN_HIKE: {
    id: 'gen-hike', name: 'Scenic Hiking Trail', category: 'Outdoors',
    description: 'A half-day trail through the region\'s most dramatic landscape rewards with panoramas that have inspired painters and poets for centuries.',
    photo: 'https://images.unsplash.com/photo-1465189684280-6a8fa9b19a7a?w=480&q=80&fit=crop',
    duration: '4–5 hrs', address: 'National Park Trailhead', priceRange: '€',
  },
  GEN_DINING: {
    id: 'gen-dining', name: 'Fine Dining Tasting Menu', category: 'Food & Drink',
    description: 'The city\'s most celebrated restaurant reimagines local ingredients through a ten-course tasting menu. Reservations essential; request the sommelier\'s wine pairing.',
    photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=480&q=80&fit=crop',
    duration: '3 hrs', address: 'Old Town', priceRange: '€€€€',
  },
  GEN_BEACH: {
    id: 'gen-beach', name: 'Private Beach Day', category: 'Beach',
    description: 'A stretch of coast far from the crowds, accessible by water taxi, with crystalline shallows and a beach bar serving local rum cocktails.',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=480&q=80&fit=crop',
    duration: 'Full day', address: 'Coastline', priceRange: '€€',
  },
  GEN_SPA: {
    id: 'gen-spa', name: 'Luxury Spa Retreat', category: 'Wellness & Spa',
    description: 'A full day of hot stone massage, hydrotherapy pools, and a private hammam session. The thermal suite alone is worth the journey.',
    photo: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=480&q=80&fit=crop',
    duration: '4 hrs', address: 'Hotel Spa Quarter', priceRange: '€€€',
  },
  GEN_NIGHTLIFE: {
    id: 'gen-nightlife', name: 'Rooftop Bar & Live Music', category: 'Nightlife',
    description: 'The city\'s best rooftop bar pours local craft cocktails to a backdrop of the illuminated skyline while a live jazz trio plays on the terrace.',
    photo: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=480&q=80&fit=crop',
    duration: '3 hrs', address: 'City Centre, Top Floor', priceRange: '€€€',
  },
}

const DESTINATION_POOL = {
  Paris: [ACT.PAR_EIFFEL, ACT.PAR_CAFE, ACT.PAR_LOUVRE, ACT.PAR_ORSAY, ACT.PAR_SEINE, ACT.PAR_MONTMARTRE, ACT.PAR_VERSAILLES, ACT.PAR_MARAIS, ACT.PAR_MOULIN, ACT.PAR_HAMMAM, ACT.PAR_LUXEMBOURG, ACT.PAR_POMPIDOU, ACT.PAR_DINNER],
  Santorini: [ACT.SAN_CALDERA, ACT.SAN_BOAT, ACT.SAN_WINE, ACT.SAN_AKROTIRI, ACT.SAN_BEACH, ACT.SAN_SPA],
  Kyoto: [ACT.KYO_FUSHIMI, ACT.KYO_ARASHIYAMA, ACT.KYO_RAMEN, ACT.KYO_GION, ACT.KYO_ONSEN, ACT.KYO_KINKAKUJI],
  Bali: [ACT.BAL_UBUD, ACT.BAL_TEMPLE, ACT.BAL_SURF, ACT.BAL_SPA, ACT.GEN_MARKET, ACT.GEN_DINING],
}

const GENERIC_POOL = [ACT.GEN_MARKET, ACT.GEN_MUSEUM, ACT.GEN_HIKE, ACT.GEN_DINING, ACT.GEN_BEACH, ACT.GEN_SPA, ACT.GEN_NIGHTLIFE]

const VIBE_CATEGORY_MAP = {
  'Food & Drink': 'Food & Drink',
  Beach: 'Beach',
  'Culture & History': 'Culture & History',
  Outdoors: 'Outdoors',
  Shopping: 'Shopping',
  Nightlife: 'Nightlife',
  'Wellness & Spa': 'Wellness & Spa',
  Adventure: 'Adventure',
}

export function generateMockItinerary(destination, days, vibes = []) {
  const pool = DESTINATION_POOL[destination] || GENERIC_POOL

  let sorted = pool
  if (vibes.length > 0) {
    const prioritized = pool.filter(a => vibes.some(v => v === a.category || VIBE_CATEGORY_MAP[v] === a.category))
    const rest = pool.filter(a => !prioritized.includes(a))
    sorted = [...prioritized, ...rest]
  }

  const perDay = 2
  const total = Math.min(days * perDay, sorted.length + Math.floor(sorted.length * 0.5))
  const base = sorted.slice(0, total)

  return base.map((act, i) => ({
    ...act,
    id: `${act.id}-${Date.now()}-${i}`,
    day: Math.floor(i / perDay) + 1,
    timeOfDay: i % perDay === 0 ? 'Morning' : 'Afternoon',
    favorited: false,
    booked: false,
    booking: null,
  }))
}
