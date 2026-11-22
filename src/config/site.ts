export const siteConfig = {
  name: 'Grand Palace Hotel',
  shortName: 'Grand Palace',
  tagline: 'A quiet limestone residence around shaded gardens.',
  description:
    'A boutique heritage hotel with 28 sunlit rooms, courtyard pool, stone spa sanctuary, and seasonal dining at The Veranda.',
  foundedYear: 1934,
  restoredYear: 2019,
  phone: '+91 141 284 0920',
  phoneHref: 'tel:+911412840920',
  email: 'reservations@grandpalacehotel.example',
  diningEmail: 'dining@grandpalacehotel.example',
  whatsappNumber: '911412840920',
  address: {
    street: '14 Sawai Man Singh Marg',
    district: 'Civil Lines',
    city: 'Jaipur',
    region: 'Rajasthan',
    postalCode: '302006',
    country: 'India',
    shortLine: '14 Sawai Man Singh Marg, Civil Lines',
    districtOnly: 'Sawai Man Singh Marg, Civil Lines District',
  },
  hours: {
    checkIn: '14:00',
    checkOut: '11:00',
    reception: '24 hours daily',
    breakfast: '07:00 – 10:30',
    lunch: '12:30 – 15:00',
    dinner: '19:00 – 22:30',
    spa: '09:00 – 20:00',
  },
  social: {
    instagramHandle: '@grandpalace.civil',
    instagramUrl: 'https://instagram.com/grandpalace.civil',
    facebookUrl: 'https://facebook.com/grandpalace.civil',
    pinterestUrl: 'https://pinterest.com/grandpalacecivil',
  },
  taxRate: 0.12,
  currency: 'INR',
  imageCredits: 'Architectural & culinary photography prepared for Grand Palace Hotel.',
} as const;

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
