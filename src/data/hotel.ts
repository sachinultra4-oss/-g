import { media, type MediaAsset } from './media';

export interface AmenityItem {
  id: string;
  label: string;
  detail: string;
  iconName: 'Waves' | 'Sparkles' | 'UtensilsCrossed' | 'Wifi' | 'Car' | 'Plane' | 'Clock';
}

export interface OfferPackage {
  id: string;
  title: string;
  duration: string;
  summary: string;
  includes: string[];
  startingPrice: string;
  image: MediaAsset;
  ctaLabel: string;
  ctaTo: string;
}

export interface HotelStat {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  detail: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  origin: string;
  stayDetail: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export interface GalleryPhoto {
  id: string;
  category: 'Rooms' | 'Dining' | 'Pool & Spa' | 'Events';
  asset: MediaAsset;
  title: string;
}

export const hotelAmenities: AmenityItem[] = [
  { id: 'am-pool', label: 'Courtyard Pool', detail: '22m heated limestone lap pool', iconName: 'Waves' },
  { id: 'am-spa', label: 'Stone Spa', detail: 'Steam, plunge & botanical massage', iconName: 'Sparkles' },
  { id: 'am-dining', label: 'The Veranda', detail: 'Seasonal kitchen & bar', iconName: 'UtensilsCrossed' },
  { id: 'am-wifi', label: 'Fiber Wi-Fi', detail: 'Throughout rooms & gardens', iconName: 'Wifi' },
  { id: 'am-parking', label: 'Valet Parking', detail: 'Private shaded courtyard bay', iconName: 'Car' },
  { id: 'am-pickup', label: 'Airport Pickup', detail: 'Private sedan on request', iconName: 'Plane' },
  { id: 'am-desk', label: '24h Front Desk', detail: 'Round-the-clock concierge', iconName: 'Clock' },
];

export const offerPackages: OfferPackage[] = [
  {
    id: 'offer-retreat',
    title: 'Three-Night Stone Spa Retreat',
    duration: '3 Nights · Includes Spa & Breakfast',
    summary:
      'Stay three nights in a Premier Veranda Room or Suite with daily breakfast on the terrace and a 60-minute botanical oil treatment per guest.',
    includes: [
      'Daily terrace breakfast for two',
      'Two 60-minute treatments at the Stone Spa',
      'Late 13:00 check-out subject to availability',
    ],
    startingPrice: 'From INR 16,500 / night',
    image: media.spaSanctuary,
    ctaLabel: 'Browse eligible rooms',
    ctaTo: '/rooms?category=Suite',
  },
  {
    id: 'offer-table',
    title: 'Weekend Stay & Veranda Supper',
    duration: '2 Nights · Friday to Sunday',
    summary:
      'An unhurried weekend break pairing two nights in our courtyard rooms with a four-course seasonal dinner for two beneath the Veranda arches.',
    includes: [
      'Four-course seasonal dinner at The Veranda',
      'Morning pastry & single-estate coffee service',
      'Complimentary evening library tea',
    ],
    startingPrice: 'From INR 14,200 / night',
    image: media.morningBreakfast,
    ctaLabel: 'Check weekend dates',
    ctaTo: '/rooms',
  },
];

export const hotelStats: HotelStat[] = [
  { id: 'st-1', value: 28, label: 'Private Rooms & Suites', detail: 'Spread across three limestone wings' },
  { id: 'st-2', value: 1934, label: 'Year Built', detail: 'Restored sandstone heritage house' },
  { id: 'st-3', value: 4, suffix: ' Acres', label: 'Walled Gardens', detail: 'Citrus trees, lawns & reflection pools' },
  { id: 'st-4', value: 24, suffix: ' Hours', label: 'Quiet Desk Service', detail: 'Attentive house hosts day and night' },
];

export const testimonials: Testimonial[] = [
  {
    id: 'ts-1',
    quote:
      'We spent four mornings drinking coffee on our stone balcony watching the gardeners tend the citrus trees. Nothing felt rushed, and the silence at night is rare in the city.',
    author: 'Meera Kapoor (Sample Guest)',
    origin: 'Mumbai',
    stayDetail: 'Stayed in Premier Veranda Room',
  },
  {
    id: 'ts-2',
    quote:
      'Dinner at The Veranda was the highlight of our trip. The sea bass with saffron emulsion and the calm lighting under the arches made us stay until closing.',
    author: 'David & Claire Bennett (Sample Guest)',
    origin: 'London',
    stayDetail: 'Stayed in Executive Palace Suite',
  },
  {
    id: 'ts-3',
    quote:
      'Having the stone plunge pool to ourselves after a long drive was restorative. Every staff member knew our names by the second morning without ever hovering.',
    author: 'Arjun Deshmukh (Sample Guest)',
    origin: 'Bengaluru',
    stayDetail: 'Stayed in Royal Conservatory Suite',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Raghavendra Singh (Sample Name)',
    role: 'General Manager',
    bio: 'Leads daily operations and guest hospitality across all 28 rooms, with sixteen years in heritage restoration properties.',
  },
  {
    id: 'tm-2',
    name: 'Ananya Sen (Sample Name)',
    role: 'Executive Chef, The Veranda',
    bio: 'Designs seasonal menus anchored by regional produce, heirloom grains, and wood-fired coastal seafood.',
  },
  {
    id: 'tm-3',
    name: 'Vikramaditya Rao (Sample Name)',
    role: 'Head of Guest Concierge',
    bio: 'Coordinates private city walks, airport transfers, and family stays from the 24-hour front desk.',
  },
  {
    id: 'tm-4',
    name: 'Nandini Verma (Sample Name)',
    role: 'Spa & Gardens Director',
    bio: 'Oversees the Stone Spa botanical treatments and the four-acre walled citrus and rose gardens.',
  },
];

export const galleryPhotos: GalleryPhoto[] = [
  { id: 'gal-1', category: 'Pool & Spa', asset: media.heroDusk, title: 'Reflection Pool at Dusk' },
  { id: 'gal-2', category: 'Rooms', asset: media.roomExecutive, title: 'Executive Palace Salon' },
  { id: 'gal-3', category: 'Dining', asset: media.diningHall, title: 'The Veranda Dining Room' },
  { id: 'gal-4', category: 'Pool & Spa', asset: media.spaSanctuary, title: 'Stone Spa Plunge Pool' },
  { id: 'gal-5', category: 'Rooms', asset: media.roomRoyal, title: 'Conservatory Bath Sanctuary' },
  { id: 'gal-6', category: 'Events', asset: media.eveningEvents, title: 'Courtyard Candlelit Supper' },
  { id: 'gal-7', category: 'Dining', asset: media.morningBreakfast, title: 'Morning Terrace Spread' },
  { id: 'gal-8', category: 'Rooms', asset: media.roomPremier, title: 'Premier Veranda Archway' },
  { id: 'gal-9', category: 'Pool & Spa', asset: media.heroPool, title: 'Sunset Lap Pool' },
  { id: 'gal-10', category: 'Dining', asset: media.diningPlate, title: 'Seared Sea Bass & Cocktail' },
  { id: 'gal-11', category: 'Rooms', asset: media.roomTerrace, title: 'Rooftop Canopy Terrace' },
  { id: 'gal-12', category: 'Events', asset: media.heroLobby, title: 'Sunlit Reception Colonnade' },
  { id: 'gal-13', category: 'Rooms', asset: media.roomDeluxe, title: 'Deluxe Courtyard King' },
  { id: 'gal-14', category: 'Events', asset: media.teaLounge, title: 'Afternoon Library Tea' },
];

export const homeInstagramStrip: MediaAsset[] = [
  media.teaLounge,
  media.staircaseArch,
  media.eveningEvents,
  media.roomHeritage,
  media.roomJunior,
  media.roomTerrace,
];
