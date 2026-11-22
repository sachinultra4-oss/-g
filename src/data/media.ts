export interface MediaAsset {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const media = {
  heroDusk: {
    id: 'hero-dusk',
    src: '/src/assets/images/hero_palace_dusk_1795348994601.jpg',
    alt: 'Grand Palace Hotel limestone colonnade and reflection pool lit by brass lanterns at dusk',
    width: 1600,
    height: 900,
  },
  heroLobby: {
    id: 'hero-lobby',
    src: '/src/assets/images/hero_grand_lobby_1795348993754.jpg',
    alt: 'Sunlit limestone reception hall with arched windows, teak armchairs, and travertine floors',
    width: 1600,
    height: 900,
  },
  heroPool: {
    id: 'hero-pool',
    src: '/src/assets/images/hero_courtyard_pool_1795348995585.jpg',
    alt: 'Courtyard lap pool framed by sandstone arches and linen loungers at sunset',
    width: 1600,
    height: 900,
  },
  roomDeluxe: {
    id: 'room-deluxe',
    src: '/src/assets/images/room_deluxe_courtyard_1795349093017.jpg',
    alt: 'Deluxe Courtyard Room with limewashed walls, solid teak king bed, and wooden shutters',
    width: 1200,
    height: 900,
  },
  roomHeritage: {
    id: 'room-heritage',
    src: '/src/assets/images/room_heritage_garden_1795348994499.jpg',
    alt: 'Heritage Garden Room with French doors opening onto a greenery-lined stone balcony',
    width: 1200,
    height: 900,
  },
  roomPremier: {
    id: 'room-premier',
    src: '/src/assets/images/room_premier_veranda_1795348995008.jpg',
    alt: 'Premier Veranda Room with stone arch leading to a private furnished terrace',
    width: 1200,
    height: 900,
  },
  roomJunior: {
    id: 'room-junior',
    src: '/src/assets/images/room_junior_pavilion_1795348995358.jpg',
    alt: 'Junior Pavilion Suite featuring vaulted timber ceiling and forest velvet loveseat',
    width: 1200,
    height: 900,
  },
  roomExecutive: {
    id: 'room-executive',
    src: '/src/assets/images/room_executive_palace_1795349093092.jpg',
    alt: 'Executive Palace Suite sitting salon with navy wool armchairs and arched bedroom doorway',
    width: 1200,
    height: 900,
  },
  roomRoyal: {
    id: 'room-royal',
    src: '/src/assets/images/room_royal_conservatory_1795348996401.jpg',
    alt: 'Royal Conservatory Suite bath sanctuary with freestanding brass soaking tub beside arched garden windows',
    width: 1200,
    height: 900,
  },
  roomFamily: {
    id: 'room-family',
    src: '/src/assets/images/room_family_wing_1795349093446.jpg',
    alt: 'Family Courtyard Wing with two bespoke teak queen beds and sunlit window reading alcove',
    width: 1200,
    height: 900,
  },
  roomTerrace: {
    id: 'room-terrace',
    src: '/src/assets/images/room_maharaja_penthouse_1795348994457.jpg',
    alt: 'Terrace Canopy Suite rooftop veranda with draped linen daybed overlooking palace gardens at sunset',
    width: 1200,
    height: 900,
  },
  diningHall: {
    id: 'dining-hall',
    src: '/src/assets/images/dining_veranda_hall_1795349092912.jpg',
    alt: 'The Veranda dining room with white linen tables, walnut cane chairs, and twilight garden views',
    width: 1200,
    height: 900,
  },
  diningPlate: {
    id: 'dining-plate',
    src: '/src/assets/images/dining_culinary_plate_1795348994238.jpg',
    alt: 'Seared sea bass with saffron emulsion on stoneware alongside a botanical cocktail on travertine',
    width: 1200,
    height: 900,
  },
  spaSanctuary: {
    id: 'spa-sanctuary',
    src: '/src/assets/images/spa_stone_sanctuary_1795348995186.jpg',
    alt: 'Stone spa sanctuary featuring a calm sunken plunge pool beneath a slatted timber skylight',
    width: 1200,
    height: 900,
  },
  morningBreakfast: {
    id: 'morning-breakfast',
    src: '/src/assets/images/morning_terrace_breakfast_1795348996390.jpg',
    alt: 'Al fresco breakfast spread with croissants, fresh figs, silver teapot, and pour-over coffee on a terrace table',
    width: 1200,
    height: 900,
  },
  eveningEvents: {
    id: 'evening-events',
    src: '/src/assets/images/evening_garden_events_1795348994549.jpg',
    alt: 'Candlelit celebration table set beneath a stone garden arch with amber hanging lanterns',
    width: 1200,
    height: 900,
  },
  teaLounge: {
    id: 'tea-lounge',
    src: '/src/assets/images/gallery_tea_lounge_1795348994548.jpg',
    alt: 'Quiet heritage library and tea lounge with tall wooden bookcases and porcelain tea service',
    width: 1000,
    height: 1000,
  },
  staircaseArch: {
    id: 'staircase-arch',
    src: '/src/assets/images/gallery_staircase_arch_1795349056116.jpg',
    alt: 'Curved limestone staircase and sunlit vaulted corridor inside the south wing',
    width: 1000,
    height: 1000,
  },
} as const satisfies Record<string, MediaAsset>;
