import { addDays, startOfToday } from 'date-fns';
import { media, type MediaAsset } from './media';

export type RoomCategory = 'Deluxe' | 'Premier' | 'Suite' | 'Family';

export interface Room {
  id: string;
  slug: string;
  name: string;
  category: RoomCategory;
  shortTagline: string;
  description: string;
  sizeSqM: number;
  bedType: string;
  maxAdults: number;
  maxChildren: number;
  maxGuests: number;
  ratePerNight: number;
  view: string;
  floor: string;
  images: MediaAsset[];
  amenities: string[];
  featured: boolean;
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    children: string;
  };
  blockedOffsets: number[];
}

export const rooms: Room[] = [
  {
    id: 'rm-01',
    slug: 'deluxe-courtyard-room',
    name: 'Deluxe Courtyard Room',
    category: 'Deluxe',
    shortTagline: 'Limewashed walls and teak shutters overlooking the inner fountain.',
    description:
      'Set along the quiet east colonnade, the Deluxe Courtyard Room pairs hand-trowelled limewash plaster with solid Burma teak furnishings and pale limestone underfoot. Morning light filters through louvered shutters onto organic cotton bedding.',
    sizeSqM: 36,
    bedType: 'King Bed',
    maxAdults: 2,
    maxChildren: 1,
    maxGuests: 2,
    ratePerNight: 12500,
    view: 'Inner Fountain Courtyard',
    floor: 'Ground & First Floor',
    images: [media.roomDeluxe, media.staircaseArch, media.teaLounge],
    amenities: [
      'Organic cotton 400-thread linen',
      'Walk-in limestone rain shower',
      'Hand-built teak writing desk',
      'Complimentary morning tea service',
      'High-speed fiber Wi-Fi',
      'Silent split climate control',
    ],
    featured: false,
    policies: {
      checkIn: '14:00 onwards',
      checkOut: 'Until 11:00',
      cancellation: 'Free modification or cancellation up to 72 hours before arrival.',
      children: 'One child under 6 stays complimentary using existing bedding.',
    },
    blockedOffsets: [3, 4, 11, 12],
  },
  {
    id: 'rm-02',
    slug: 'heritage-garden-room',
    name: 'Heritage Garden Room',
    category: 'Deluxe',
    shortTagline: 'French doors opening onto a shaded wrought-iron balcony.',
    description:
      'Positioned above the botanical orchard, the Heritage Garden Room opens through double French doors onto a private stone balcony furnished with woven cane armchairs. Inside, warm oak floorboards and brass reading lamps invite unhurried evenings.',
    sizeSqM: 42,
    bedType: 'King Bed',
    maxAdults: 2,
    maxChildren: 1,
    maxGuests: 3,
    ratePerNight: 14800,
    view: 'Botanical Citrus Garden',
    floor: 'First Floor',
    images: [media.roomHeritage, media.morningBreakfast, media.staircaseArch],
    amenities: [
      'Private wrought-iron garden balcony',
      'Walk-in limestone rain shower',
      'Single-estate pour-over coffee bar',
      'Upholstered reading chair',
      'High-speed fiber Wi-Fi',
      'In-room laptop safe',
    ],
    featured: false,
    policies: {
      checkIn: '14:00 onwards',
      checkOut: 'Until 11:00',
      cancellation: 'Free modification or cancellation up to 72 hours before arrival.',
      children: 'Extra rollaway bed available on request for children under 12.',
    },
    blockedOffsets: [5, 6, 15],
  },
  {
    id: 'rm-03',
    slug: 'premier-veranda-room',
    name: 'Premier Veranda Room',
    category: 'Premier',
    shortTagline: 'Arched stone doorway leading to a sunlit private terrace.',
    description:
      'Defined by a broad carved sandstone arch, the Premier Veranda Room flows directly onto a generous private terrace framed by bougainvillea and potted olive trees. Ideal for guests who prefer dining or reading outdoors in privacy.',
    sizeSqM: 50,
    bedType: 'King Bed',
    maxAdults: 2,
    maxChildren: 1,
    maxGuests: 3,
    ratePerNight: 18500,
    view: 'West Garden & Terrace',
    floor: 'First Floor',
    images: [media.roomPremier, media.diningPlate, media.teaLounge],
    amenities: [
      'Private furnished stone veranda',
      'Sun lounger and ceramic tea service',
      'Deep soaking tub & separate rain shower',
      'Linen drapery & acoustic glazing',
      'Complimentary airport transfer (one way)',
      'High-speed fiber Wi-Fi',
    ],
    featured: true,
    policies: {
      checkIn: '14:00 onwards',
      checkOut: 'Until 11:00',
      cancellation: 'Free modification or cancellation up to 72 hours before arrival.',
      children: 'Extra daybed available for one child up to 12 years.',
    },
    blockedOffsets: [2, 8, 9, 19],
  },
  {
    id: 'rm-04',
    slug: 'junior-pavilion-suite',
    name: 'Junior Pavilion Suite',
    category: 'Premier',
    shortTagline: 'Vaulted timber ceiling with a dedicated lounge alcove.',
    description:
      'Tucked in the quiet north garden wing beneath exposed timber rafters, the Junior Pavilion Suite separates the sleeping quarters from a sunlit sitting area anchored by a deep forest-velvet loveseat and parquet oak floors.',
    sizeSqM: 58,
    bedType: 'King Bed',
    maxAdults: 2,
    maxChildren: 2,
    maxGuests: 3,
    ratePerNight: 21500,
    view: 'North Lawn & Pine Grove',
    floor: 'Upper Pavilion',
    images: [media.roomJunior, media.spaSanctuary, media.staircaseArch],
    amenities: [
      'Separate velvet sitting salon',
      'Vaulted exposed timber ceiling',
      'Double limestone vanity & rain shower',
      'Curated room library & brass lamps',
      'Complimentary evening turndown tea',
      'High-speed fiber Wi-Fi',
    ],
    featured: false,
    policies: {
      checkIn: '14:00 onwards',
      checkOut: 'Until 11:00',
      cancellation: 'Free cancellation up to 5 days prior to arrival.',
      children: 'Families welcome; crib or child daybed provided without charge.',
    },
    blockedOffsets: [4, 5, 14, 15],
  },
  {
    id: 'rm-05',
    slug: 'executive-palace-suite',
    name: 'Executive Palace Suite',
    category: 'Suite',
    shortTagline: 'Two-room residence with four-poster canopy bed and drawing salon.',
    description:
      'An expansive corner residence uniting a tailored drawing room and a formal four-poster canopy bedroom through a plaster archway. Tall casement windows draw natural light across travertine tables, navy wool seating, and hand-framed botanical prints.',
    sizeSqM: 76,
    bedType: 'Four-Poster King Bed',
    maxAdults: 3,
    maxChildren: 1,
    maxGuests: 3,
    ratePerNight: 28000,
    view: 'Main Colonnade & Gardens',
    floor: 'First Floor Corner',
    images: [media.roomExecutive, media.diningHall, media.teaLounge],
    amenities: [
      'Dedicated drawing room & writing desk',
      'Four-poster carved teak canopy bed',
      'Private dressing room & soaking tub',
      'Complimentary breakfast at The Veranda',
      'Priority evening table reservation',
      'Two-way airport chauffeured transfer',
    ],
    featured: true,
    policies: {
      checkIn: '13:00 early check-in when available',
      checkOut: 'Until 12:00',
      cancellation: 'Free cancellation up to 5 days prior to arrival.',
      children: 'Accommodates one extra guest on a full-size salon daybed.',
    },
    blockedOffsets: [6, 7, 17, 18],
  },
  {
    id: 'rm-06',
    slug: 'royal-conservatory-suite',
    name: 'Royal Conservatory Suite',
    category: 'Suite',
    shortTagline: 'Arched glass bath sanctuary with hammered brass soaking tub.',
    description:
      'Designed around a dramatic stone-and-glass bathing conservatory overlooking the walled rose garden, the Royal Conservatory Suite blends residential calm with restorative ritual. Includes a fireplace salon, private wardrobe gallery, and terrace access.',
    sizeSqM: 94,
    bedType: 'Emperor King Bed',
    maxAdults: 3,
    maxChildren: 2,
    maxGuests: 4,
    ratePerNight: 36500,
    view: 'Private Walled Rose Garden',
    floor: 'Ground Wing',
    images: [media.roomRoyal, media.spaSanctuary, media.eveningEvents],
    amenities: [
      'Hammered brass freestanding soaking tub',
      'Private dressing gallery & fireplace lounge',
      'Direct garden terrace access',
      '60-minute stone spa treatment for two',
      'Complimentary breakfast & afternoon tea',
      'Two-way airport chauffeured transfer',
    ],
    featured: true,
    policies: {
      checkIn: '13:00 guaranteed early check-in',
      checkOut: 'Until 13:00 late check-out',
      cancellation: 'Free cancellation up to 7 days prior to arrival.',
      children: 'Complimentary rollaway bed and children’s amenities included.',
    },
    blockedOffsets: [9, 10, 21, 22],
  },
  {
    id: 'rm-07',
    slug: 'family-courtyard-wing',
    name: 'Family Courtyard Wing',
    category: 'Family',
    shortTagline: 'Two bespoke teak queen beds with a sunlit window seat alcove.',
    description:
      'Thoughtfully proportioned for families or friends travelling together, the Family Courtyard Wing features twin carved teak queen beds, a deep arched window seat cushioned in woven linen, and dual dressing alcoves with generous luggage space.',
    sizeSqM: 68,
    bedType: 'Two Queen Beds',
    maxAdults: 4,
    maxChildren: 2,
    maxGuests: 4,
    ratePerNight: 24500,
    view: 'South Courtyard Lawn',
    floor: 'First Floor',
    images: [media.roomFamily, media.morningBreakfast, media.heroPool],
    amenities: [
      'Two solid teak queen beds',
      'Sunlit arched window reading seat',
      'Dual washbasins & separate shower',
      'Board games & children’s library',
      'Complimentary breakfast for up to four',
      'High-speed fiber Wi-Fi',
    ],
    featured: false,
    policies: {
      checkIn: '14:00 onwards',
      checkOut: 'Until 11:00',
      cancellation: 'Free cancellation up to 5 days prior to arrival.',
      children: 'Designed for up to 4 guests across two queen beds.',
    },
    blockedOffsets: [1, 2, 13, 14],
  },
  {
    id: 'rm-08',
    slug: 'terrace-canopy-suite',
    name: 'Terrace Canopy Suite',
    category: 'Suite',
    shortTagline: 'Private rooftop terrace with draped daybed overlooking the gardens.',
    description:
      'Perched on the upper limestone parapet, the Terrace Canopy Suite pairs a timber-lined indoor lounge with an open-air stone terrace and draped linen daybed. Designed for slow twilight hours above the treetops.',
    sizeSqM: 88,
    bedType: 'King Bed + Rooftop Daybed',
    maxAdults: 2,
    maxChildren: 2,
    maxGuests: 4,
    ratePerNight: 33000,
    view: 'Panoramic Palace Gardens',
    floor: 'Top Floor',
    images: [media.roomTerrace, media.eveningEvents, media.diningPlate],
    amenities: [
      'Private rooftop terrace & canopy daybed',
      'Indoor timber sitting room',
      'Outdoor rain shower & indoor soaking tub',
      'Private sunset lantern dining setup option',
      'Complimentary breakfast & minibar',
      'Two-way airport chauffeured transfer',
    ],
    featured: false,
    policies: {
      checkIn: '14:00 onwards',
      checkOut: 'Until 12:00',
      cancellation: 'Free cancellation up to 7 days prior to arrival.',
      children: 'Children over 8 welcome on the rooftop wing.',
    },
    blockedOffsets: [10, 11, 24, 25],
  },
];

export function getRoomBySlug(slug: string | undefined): Room | undefined {
  return rooms.find((room) => room.slug === slug);
}

export function getBlockedDatesForRoom(room: Room): Date[] {
  const today = startOfToday();
  return room.blockedOffsets.map((offset) => addDays(today, offset));
}
