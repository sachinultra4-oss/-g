export type MenuCategory = 'Starters' | 'Mains' | 'Desserts' | 'Drinks';

export interface DishItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  dietary?: 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Chef Special';
}

export interface ChefSpecial {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  pairing: string;
  price: number;
}

export const diningHours = [
  { service: 'Morning Terrace Breakfast', hours: '07:00 – 10:30', note: 'A la carte & bakery table' },
  { service: 'Midday Veranda Lunch', hours: '12:30 – 15:00', note: 'Seasonal garden plates' },
  { service: 'Afternoon Tea in the Library', hours: '16:00 – 18:00', note: 'Single-estate teas & pastries' },
  { service: 'Candlelit Dinner Service', hours: '19:00 – 22:30', note: 'Reservations recommended' },
];

export const chefSpecials: ChefSpecial[] = [
  {
    id: 'sp-1',
    title: 'Pan-Seared Malabar Sea Bass',
    subtitle: 'Saffron fennel emulsion, charred baby leek, pickled sea buckthorn',
    description:
      'Line-caught coast fish crisped over cast iron and finished in a light Kashmiri saffron reduction with garden herbs.',
    pairing: 'Paired with Veranda Elderflower Coupe',
    price: 1850,
  },
  {
    id: 'sp-2',
    title: 'Slow-Braised Lamb Shank',
    subtitle: 'Cardamom jus, smoked heirloom carrot puree, crisp shallots',
    description:
      'Braised for six hours in black cardamom, bay leaf, and bone broth until tender, served with stone-milled millet flatbread.',
    pairing: 'Paired with Barrel-Aged Negroni',
    price: 2100,
  },
  {
    id: 'sp-3',
    title: 'Heirloom Burrata & Roasted Fig',
    subtitle: 'Wildflower honey, toasted pistachio dukkah, wood-fired sourdough',
    description:
      'Local artisan burrata dressed with cold-pressed olive oil, warm orchard figs, and crisp rosemary sea-salt crisps.',
    pairing: 'Paired with Chilled Jasmine White Tea Spritz',
    price: 1150,
  },
];

export const menuItems: DishItem[] = [
  // Starters
  {
    id: 'st-1',
    name: 'Charred Heirloom Cauliflower Soup',
    description: 'Brown butter, toasted hazelnut, chive oil, sourdough crouton',
    price: 680,
    category: 'Starters',
    dietary: 'Vegetarian',
  },
  {
    id: 'st-2',
    name: 'Heirloom Burrata & Roasted Fig',
    description: 'Pistachio dukkah, wildflower honey, stone-baked flatbread',
    price: 1150,
    category: 'Starters',
    dietary: 'Chef Special',
  },
  {
    id: 'st-3',
    name: 'Crisp Lotus Stem & Tamarind Glaze',
    description: 'Toasted sesame, micro coriander, green chilli emulsion',
    price: 720,
    category: 'Starters',
    dietary: 'Vegan',
  },
  {
    id: 'st-4',
    name: 'Smoked Duck & Mandarin Salad',
    description: 'Bitter garden leaves, pickled ginger, toasted walnut dressing',
    price: 980,
    category: 'Starters',
    dietary: 'Gluten-Free',
  },

  // Mains
  {
    id: 'mn-1',
    name: 'Pan-Seared Malabar Sea Bass',
    description: 'Saffron fennel emulsion, charred leek, garden herbs',
    price: 1850,
    category: 'Mains',
    dietary: 'Chef Special',
  },
  {
    id: 'mn-2',
    name: 'Slow-Braised Lamb Shank',
    description: 'Black cardamom jus, smoked carrot puree, millet flatbread',
    price: 2100,
    category: 'Mains',
    dietary: 'Chef Special',
  },
  {
    id: 'mn-3',
    name: 'Wild Mushroom & Saffron Risotto',
    description: 'Aged Parmigiano, thyme oil, crisp sage leaves',
    price: 1380,
    category: 'Mains',
    dietary: 'Vegetarian',
  },
  {
    id: 'mn-4',
    name: 'Charcoal-Grilled Spiced Baby Chicken',
    description: 'Preserved lemon, roasted baby potatoes, garlic herb butter',
    price: 1520,
    category: 'Mains',
    dietary: 'Gluten-Free',
  },
  {
    id: 'mn-5',
    name: 'Clay-Pot Vegetable & Coconut Curry',
    description: 'Heirloom pumpkin, curry leaf oil, steamed red matta rice',
    price: 1240,
    category: 'Mains',
    dietary: 'Vegan',
  },

  // Desserts
  {
    id: 'ds-1',
    name: 'Warm Dark Chocolate & Sea Salt Tart',
    description: 'Single-origin 70% ganache, toasted almond cream',
    price: 690,
    category: 'Desserts',
    dietary: 'Vegetarian',
  },
  {
    id: 'ds-2',
    name: 'Cardamom & Saffron Poached Pear',
    description: 'Vanilla bean mascarpone, crisp pistachio tuile',
    price: 640,
    category: 'Desserts',
    dietary: 'Gluten-Free',
  },
  {
    id: 'ds-3',
    name: 'Baked Custard with Rosewater Honey',
    description: 'Caramelized fig, shortbread crumble',
    price: 620,
    category: 'Desserts',
    dietary: 'Vegetarian',
  },

  // Drinks
  {
    id: 'dr-1',
    name: 'Veranda Elderflower Coupe',
    description: 'Small-batch gin, elderflower cordial, fresh mint, lemon peel',
    price: 890,
    category: 'Drinks',
  },
  {
    id: 'dr-2',
    name: 'Spiced Darjeeling Old Fashioned',
    description: 'Single-malt whisky infused with first-flush tea, orange bitters',
    price: 960,
    category: 'Drinks',
  },
  {
    id: 'dr-3',
    name: 'Chilled Jasmine & Ginger Spritz (Zero-Proof)',
    description: 'Cold-brewed jasmine silver needle, fresh pressed ginger, tonic',
    price: 460,
    category: 'Drinks',
    dietary: 'Vegan',
  },
  {
    id: 'dr-4',
    name: 'Single-Estate Pour-Over or Silver Pot Tea',
    description: 'Chikmagalur arabica or Darjeeling organic muscatel',
    price: 380,
    category: 'Drinks',
    dietary: 'Vegan',
  },
];
