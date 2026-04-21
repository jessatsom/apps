export const cities = [
  { name: 'Paris', country: 'France', continent: 'Europe', timezone: 'Europe/Paris', photoId: '1499856871958-5b9627545d1a' },
  { name: 'London', country: 'United Kingdom', continent: 'Europe', timezone: 'Europe/London', photoId: '1513635269975-59663e0ac1ad' },
  { name: 'Rome', country: 'Italy', continent: 'Europe', timezone: 'Europe/Rome', photoId: '1552832230-c0197dd311b5' },
  { name: 'Barcelona', country: 'Spain', continent: 'Europe', timezone: 'Europe/Madrid', photoId: '1583422409516-2895a77efded' },
  { name: 'Amsterdam', country: 'Netherlands', continent: 'Europe', timezone: 'Europe/Amsterdam', photoId: '1534351590666-13e3e96b5017' },
  { name: 'Prague', country: 'Czech Republic', continent: 'Europe', timezone: 'Europe/Prague', photoId: '1541849546-216549ae216d' },
  { name: 'Vienna', country: 'Austria', continent: 'Europe', timezone: 'Europe/Vienna', photoId: '1516550893923-42d28e5677af' },
  { name: 'Lisbon', country: 'Portugal', continent: 'Europe', timezone: 'Europe/Lisbon', photoId: '1555881400-74d7acaacd8b' },
  { name: 'Copenhagen', country: 'Denmark', continent: 'Europe', timezone: 'Europe/Copenhagen', photoId: '1513622470522-26c3c8a854bc' },
  { name: 'Santorini', country: 'Greece', continent: 'Europe', timezone: 'Europe/Athens', photoId: '1570077188670-e3a8d69ac5ff' },
  { name: 'Dubrovnik', country: 'Croatia', continent: 'Europe', timezone: 'Europe/Zagreb', photoId: '1540272642775-adf4cf3c37c5' },
  { name: 'Istanbul', country: 'Turkey', continent: 'Europe', timezone: 'Europe/Istanbul', photoId: '1524231757912-21f4fe3a7200' },
  { name: 'Amalfi Coast', country: 'Italy', continent: 'Europe', timezone: 'Europe/Rome', photoId: '1612698093158-e07ac200d44e' },
  { name: 'New York City', country: 'United States', continent: 'Americas', timezone: 'America/New_York', photoId: '1490644658840-3f2e3f8c5625' },
  { name: 'Los Angeles', country: 'United States', continent: 'Americas', timezone: 'America/Los_Angeles', photoId: '1534430480872-3498386e7856' },
  { name: 'Miami', country: 'United States', continent: 'Americas', timezone: 'America/New_York', photoId: '1506966912193-f93b18cba3d4' },
  { name: 'Mexico City', country: 'Mexico', continent: 'Americas', timezone: 'America/Mexico_City', photoId: '1585464231875-d466b9896f05' },
  { name: 'Buenos Aires', country: 'Argentina', continent: 'Americas', timezone: 'America/Argentina/Buenos_Aires', photoId: '1589087657616-e18c84da41fd' },
  { name: 'Cancun', country: 'Mexico', continent: 'Americas', timezone: 'America/Cancun', photoId: '1590523741831-ab7e8b8f9c7f' },
  { name: 'Tokyo', country: 'Japan', continent: 'Asia', timezone: 'Asia/Tokyo', photoId: '1540959733332-eab4deabeeaf' },
  { name: 'Kyoto', country: 'Japan', continent: 'Asia', timezone: 'Asia/Tokyo', photoId: '1528360983277-13d401cdc186' },
  { name: 'Bali', country: 'Indonesia', continent: 'Asia', timezone: 'Asia/Makassar', photoId: '1537996194471-e657df975ab4' },
  { name: 'Bangkok', country: 'Thailand', continent: 'Asia', timezone: 'Asia/Bangkok', photoId: '1508009603885-50cf7c579365' },
  { name: 'Singapore', country: 'Singapore', continent: 'Asia', timezone: 'Asia/Singapore', photoId: '1525625293386-1f14f9e3b9e5' },
  { name: 'Phuket', country: 'Thailand', continent: 'Asia', timezone: 'Asia/Bangkok', photoId: '1537956965279-7a5c9e6c6f62' },
  { name: 'Maldives', country: 'Maldives', continent: 'Asia', timezone: 'Indian/Maldives', photoId: '1514282401047-d79a71a590e8' },
  { name: 'Dubai', country: 'UAE', continent: 'Asia', timezone: 'Asia/Dubai', photoId: '1512453979798-5ea266f8880c' },
  { name: 'Marrakech', country: 'Morocco', continent: 'Africa', timezone: 'Africa/Casablanca', photoId: '1539020140153-e479b8c22e70' },
  { name: 'Cape Town', country: 'South Africa', continent: 'Africa', timezone: 'Africa/Johannesburg', photoId: '1580060839134-75a5edca2e99' },
  { name: 'Sydney', country: 'Australia', continent: 'Oceania', timezone: 'Australia/Sydney', photoId: '1506973035872-a4ec16b8e8d9' },
  { name: 'Queenstown', country: 'New Zealand', continent: 'Oceania', timezone: 'Pacific/Auckland', photoId: '1506905925346-21bda4d32df4' },
  { name: 'Reykjavik', country: 'Iceland', continent: 'Europe', timezone: 'Atlantic/Reykjavik', photoId: '1529963183131-ea6ec08c3702' },
  { name: 'Havana', country: 'Cuba', continent: 'Americas', timezone: 'America/Havana', photoId: '1519006439837-a8c8e6d12659' },
  { name: 'Florence', country: 'Italy', continent: 'Europe', timezone: 'Europe/Rome', photoId: '1534698004450-8bf78b9c40c9' },
  { name: 'Zurich', country: 'Switzerland', continent: 'Europe', timezone: 'Europe/Zurich', photoId: '1515488764276-beab7607c1e6' },
]

export const searchCities = (query) => {
  if (!query || query.length < 2) return []
  const q = query.toLowerCase()
  return cities
    .filter(c => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q))
    .slice(0, 6)
}

export const getCityByName = (name) =>
  cities.find(c => c.name.toLowerCase() === name.toLowerCase())

export const DEFAULT_PHOTO_ID = '1499856871958-5b9627545d1a'

export const unsplashUrl = (photoId, width = 1600) =>
  `https://images.unsplash.com/photo-${photoId}?w=${width}&q=80&fit=crop`
