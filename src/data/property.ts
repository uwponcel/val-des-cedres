/** Single source of truth for all property facts. */

export interface Agent {
  name: string;
  title: string;
  brokerage: string;
  phone: string;
}

export type RoomLevel = 'rdc' | 'jardin' | 'soussol';

export interface Room {
  name: string;
  level: RoomLevel;
  dims: string;
  floor: string;
  detail?: string;
}

export interface Proximity {
  key: string;
  label: string;
  distance?: string;
}

export interface Finances {
  evaluation: { year: number; land: number; building: number; total: number };
  taxes: { year: number; municipal: number; school: number; total: number };
  energy: { other: number; total: number };
}

export interface MortgageDefaults {
  price: number;
  downPayment: number;
  downPaymentPct: number;
  loan: number;
  ratePct: number;
  amortizationYears: number;
  frequency: 'biweekly';
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface Property {
  address: string;
  city: string;
  region: string;
  type: string;
  uls: string;
  priceCad: number;
  yearBuilt: number;
  roomsTotal: number;
  bedrooms: number;
  bathrooms: number;
  powderRooms: number;
  buildingDims: string;
  landDims: string;
  landSqFt: number;
  landSqM: number;
  brand: string;
  brokerage: string;
  coords: { lat: number; lng: number; approximate: boolean };
  agents: Agent[];
  programs: string[];
  mortgage: MortgageDefaults;
  finances: Finances;
  inclusions: string[];
  exclusions: string[];
  rooms: Room[];
  proximities: Proximity[];
  highlights: string[];
  technical: SpecItem[];
}

export const property: Property = {
  address: '9, rue du Val-des-Cèdres',
  city: 'Morin-Heights',
  region: 'Laurentides, Québec',
  type: 'Maison de plain-pied',
  uls: '21723694',
  priceCad: 1_850_000,
  yearBuilt: 2006,
  roomsTotal: 19,
  bedrooms: 3,
  bathrooms: 2,
  powderRooms: 1,
  buildingDims: `51'4" x 30'9" irr.`,
  landDims: `216'11" x 309'8"`,
  landSqFt: 48_761,
  landSqM: 4_530,
  brand: 'RE/MAX Collection',
  brokerage: 'RE/MAX du Cartier Bonjour',
  // Approximate Morin-Heights coordinates; refine to the exact parcel before launch.
  coords: { lat: 45.9018, lng: -74.2412, approximate: true },

  agents: [
    {
      name: 'Nathalie Plante',
      title: 'Courtier immobilier agréé',
      brokerage: 'RE/MAX du Cartier Bonjour',
      phone: '514 799-4149',
    },
    {
      name: 'Rémi Tremblay',
      title: 'Courtier immobilier',
      brokerage: 'RE/MAX du Cartier Bonjour',
      phone: '514 347-1666',
    },
  ],
  programs: ['Tranquilli-T', 'Affiliés RE/MAX Coproprié-T'],

  mortgage: {
    price: 1_850_000,
    downPayment: 370_000,
    downPaymentPct: 20,
    loan: 1_480_000,
    ratePct: 5.5,
    amortizationYears: 25,
    frequency: 'biweekly',
  },

  finances: {
    evaluation: { year: 2025, land: 212_300, building: 1_122_800, total: 1_335_100 },
    taxes: { year: 2025, municipal: 7_253, school: 859, total: 8_112 },
    energy: { other: 171, total: 171 },
  },

  inclusions: [
    'Cuisinière et four Wolf',
    'Hotte de cuisine Wolf',
    'Lave-vaisselle Asko',
    'Réfrigérateur Sub-Zero',
    'Tous les luminaires',
    "Système d'alarme et caméras reliés",
    'Système audio intérieur et extérieur',
    'Aspirateur central',
    "Système d'irrigation",
    '4 ouvre-portes de garage',
    'Le spa',
    'Climatiseur mural (garage détaché)',
  ],
  exclusions: [
    'Effets personnels',
    'Meubles',
    'Laveuse et sécheuse',
    'Contenu du cellier et le rack',
    'Cellier dans la salle mécanique',
    'Toiles et tableaux',
    'Micro-ondes',
    'Réfrigérateur et congélateur (garage attaché)',
    'Réfrigérateur (garage double détaché)',
  ],

  rooms: [
    { name: "Hall d'entrée / Vestibule", level: 'rdc', dims: `8'0" x 7'8"`, floor: 'Ardoise', detail: 'Passage à la cuisine' },
    { name: 'Passage à la cuisine', level: 'rdc', dims: `7'2" x 3'`, floor: 'Ardoise' },
    { name: 'Salon', level: 'rdc', dims: `20'8" x 23'7"`, floor: 'Bois', detail: 'Foyer au bois 2 faces' },
    { name: 'Salle à manger', level: 'rdc', dims: `18'2" x 10'11"`, floor: 'Bois', detail: 'Foyer au bois 2 faces' },
    { name: 'Cuisine', level: 'rdc', dims: `18'2" x 11'4"`, floor: 'Ardoise', detail: 'Îlot central' },
    { name: 'Véranda', level: 'rdc', dims: `17'11" x 11'1"`, floor: 'Fibre de verre', detail: 'Grillagée 3 saisons' },
    { name: "Salle d'eau", level: 'rdc', dims: `5'7" x 5'3"`, floor: 'Ardoise' },
    { name: "Vestibule d'entrée du garage", level: 'rdc', dims: `14'4" x 9'2"`, floor: 'Ardoise et bois' },
    { name: 'Chambre principale', level: 'rdc', dims: `14'4" x 20'3"`, floor: 'Bois' },
    { name: 'Penderie (Walk-in)', level: 'rdc', dims: `14'4" x 9'2"`, floor: 'Bois' },
    { name: 'Salle de bains', level: 'rdc', dims: `9'1" x 16'10"`, floor: 'Céramique', detail: 'Plancher chauffant électrique' },
    { name: 'Salle familiale', level: 'jardin', dims: `16'6" x 26'10"`, floor: 'Bois et céramique', detail: 'Foyer combustion au bois' },
    { name: 'Salle de sport ou chambre', level: 'jardin', dims: `18'0" x 13'2"`, floor: 'Bois et céramique', detail: 'Foyer combustion au bois' },
    { name: 'Sauna', level: 'jardin', dims: `6'6" x 8'9"`, floor: 'Cèdre' },
    { name: 'Chambre à coucher', level: 'jardin', dims: `15' x 16'9"`, floor: 'Bois', detail: 'Ou bureau' },
    { name: 'Salle de bains', level: 'jardin', dims: `10'9" x 12'5"`, floor: 'Céramique', detail: 'Plancher chauffant' },
    { name: 'Salle de lavage', level: 'soussol', dims: `11'1" x 8'9"`, floor: 'Céramique' },
    { name: 'Rangement', level: 'soussol', dims: `21'0" x 11'3"`, floor: 'Béton', detail: 'Salle mécanique' },
    { name: 'Bureau', level: 'soussol', dims: `23'1" x 12'7"`, floor: 'Bois' },
  ],

  proximities: [
    { key: 'corridor', label: 'Corridor aérobique', distance: '100 m' },
    { key: 'ski-alpin', label: 'Ski alpin Morin-Heights', distance: '500 m' },
    { key: 'st-sauveur', label: 'Saint-Sauveur', distance: '10 min' },
    { key: 'ski-fond', label: 'Ski de fond' },
    { key: 'velo', label: 'Piste cyclable' },
    { key: 'velo-montagne', label: 'Vélo de montagne' },
    { key: 'ecole-primaire', label: 'École primaire' },
    { key: 'ecole-secondaire', label: 'École secondaire' },
    { key: 'garderie', label: 'Garderie / CPE' },
    { key: 'parc', label: 'Parc' },
    { key: 'autoroute', label: 'Autoroute (route 364)' },
  ],

  highlights: [
    'En bordure de la rivière Chevreuil, en cascades avec bassin naturel',
    'Spa extérieur, sauna sec et bain vapeur',
    'Plafonds cathédrale de 12 pi au rez-de-chaussée',
    'Deux foyers au bois (salon deux faces, salle familiale manteau de cuivre)',
    'Cuisine shaker noyer, comptoir et îlot en granite brut',
    'Suite des maîtres : walk-in, baignoire à débordement, plancher chauffant',
    'Véranda grillagée 3 saisons surplombant la rivière',
    'Site très privé, cul-de-sac, aucun voisin à l’arrière',
    'Deux garages doubles (attaché + détaché chauffé)',
    'Fenêtres de marque Henderson, sécurité caméras et détecteurs',
  ],

  technical: [
    { label: 'Chauffage', value: 'Air pulsé + plinthes électriques' },
    { label: 'Énergie', value: 'Électricité' },
    { label: 'Foyers', value: 'Au bois + combustion lente' },
    { label: 'Eau', value: 'Puits artésien' },
    { label: 'Égouts', value: 'ECOFLO + fosse septique' },
    { label: 'Fenestration', value: 'Bois (manivelle), marque Henderson' },
    { label: 'Toiture', value: "Bardeaux d'asphalte" },
    { label: 'Sous-sol', value: '9 pi au rez-de-jardin, entrée extérieure, totalement aménagé' },
    { label: 'Garages', value: 'Deux doubles (attaché + détaché chauffé)' },
    { label: 'Stationnement', value: 'Allée (12) + garage (4)' },
  ],
};
