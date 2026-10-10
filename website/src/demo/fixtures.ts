/**
 * The sample world behind the website demo. Everything here is invented for the demo and is shown with a
 * "Sample data" label: these are not Roblox items, prices, users or outfits. The sample server
 * (sampleServer.ts) answers RoFit's real Roblox endpoints from this data, so the extension's real adapter,
 * provenance rules and change detection run unmodified on top of it.
 *
 * Deliberately absent, because Roblox doesn't provide them either: outfit creation dates, edit history,
 * resale price history. Anything "historical" in the demo is what RoFit itself observed during this visit.
 */
import type { Art } from './art.ts';

export interface SampleItem {
  id: number;
  name: string;
  type: number; // Roblox AssetType id
  art: Art;
  creator?: string;
  price?: number | null; // Robux; null = no price
  free?: boolean;
  offsale?: boolean;
  restriction?: 'limited' | 'collectible';
  resale?: number; // lowest resale price
  /** How the sample catalog behaves for this item. 'catalog' = normal; 'economy' = catalog omits it but the economy
   *  fallback knows it (old items); 'none' = neither resolves it (RoFit can only show name + type). */
  source?: 'catalog' | 'economy' | 'none';
}

export interface SampleOutfit {
  id: number;
  name: string;
  editable: boolean; // false = a Roblox-supplied preset
  avatarType: 'R6' | 'R15';
  skin: string; // hex, no #
  scale?: Partial<{ height: number; width: number; head: number; depth: number; proportion: number; bodyType: number }>;
  items: number[];
}

export interface SampleUser {
  id: number;
  name: string;
  displayName: string;
  blurb: string;
  /** 'ok' lists outfits; 'private' answers 403 like Roblox's outfit privacy; */
  mode: 'ok' | 'private';
  outfits: SampleOutfit[];
}

const S = 'Sample Studio', A = 'Sample Atelier', W = 'Sample Workshop';

// ---- items -------------------------------------------------------------------------------------------
export const ITEMS: SampleItem[] = [
  // body & head (free, like most starter body parts)
  { id: 910000000000001, name: 'Block Torso', type: 27, art: { k: 'body' }, creator: S, price: 0, free: true },
  { id: 910000000000002, name: 'Block Left Arm', type: 29, art: { k: 'body' }, creator: S, price: 0, free: true },
  { id: 910000000000003, name: 'Block Right Arm', type: 28, art: { k: 'body' }, creator: S, price: 0, free: true },
  { id: 910000000000004, name: 'Block Left Leg', type: 30, art: { k: 'body' }, creator: S, price: 0, free: true },
  { id: 910000000000005, name: 'Block Right Leg', type: 31, art: { k: 'body' }, creator: S, price: 0, free: true },
  { id: 910000000000010, name: 'Rounded Head', type: 17, art: { k: 'head' }, creator: S, price: 0, free: true },
  // faces
  { id: 910000000000011, name: 'Calm Smile', type: 18, art: { k: 'face', v: 'calm' }, creator: S, price: 0, free: true },
  { id: 910000000000012, name: 'Wide Grin', type: 18, art: { k: 'face', v: 'grin' }, creator: A, price: 50 },
  { id: 910000000000013, name: 'Sleepy Eyes', type: 18, art: { k: 'face', v: 'sleepy' }, creator: W, price: null, offsale: true, source: 'economy' },
  // hats
  { id: 910000000000020, name: 'Yellow Rain Hat', type: 8, art: { k: 'hat', v: 'bucket', c: 'F2C230' }, creator: A, price: 80 },
  { id: 910000000000021, name: 'Corduroy Cap', type: 8, art: { k: 'hat', v: 'cap', c: '6B4430' }, creator: W, price: 65 },
  { id: 910000000000022, name: 'Knit Beanie', type: 8, art: { k: 'hat', v: 'beanie', c: 'C8423B' }, creator: A, price: 45 },
  { id: 910000000000023, name: 'Paper Crown', type: 8, art: { k: 'hat', v: 'crown', c: 'E8C55A' }, creator: S, price: null, offsale: true, restriction: 'limited', resale: 2400 },
  { id: 910000000000024, name: 'Sun Visor (2012)', type: 8, art: { k: 'hat', v: 'visor', c: '3A7BD5' }, creator: W, price: null, offsale: true, source: 'economy' },
  // hair
  { id: 910000000000030, name: 'Messy Brown Hair', type: 41, art: { k: 'hair', v: 'messy', c: '5A3B22' }, creator: A, price: 75 },
  { id: 910000000000031, name: 'Long Black Hair', type: 41, art: { k: 'hair', v: 'long', c: '22201F' }, creator: A, price: 90 },
  { id: 910000000000032, name: 'Short Silver Bob', type: 41, art: { k: 'hair', v: 'bob', c: 'C3C7CF' }, creator: W, price: 120 },
  // face accessories
  { id: 910000000000040, name: 'Round Glasses', type: 42, art: { k: 'glasses', v: 'round', c: '24252A' }, creator: W, price: 35 },
  { id: 910000000000041, name: 'Star Shades', type: 42, art: { k: 'glasses', v: 'star', c: 'E04F8B' }, creator: S, price: null, offsale: true, restriction: 'collectible', resale: 860 },
  // neck, back, shoulder, waist
  { id: 910000000000045, name: 'Striped Scarf', type: 43, art: { k: 'scarf', c: '2E6E5E', c2: 'F1E6D2' }, creator: A, price: 40 },
  { id: 910000000000050, name: 'Canvas Backpack', type: 46, art: { k: 'back', v: 'pack', c: '7A8B4A' }, creator: W, price: 70 },
  { id: 910000000000051, name: 'Paper Wings', type: 46, art: { k: 'back', v: 'wings', c: 'F3EFE6' }, creator: S, price: 250 },
  { id: 910000000000052, name: 'Night Cape', type: 46, art: { k: 'back', v: 'cape', c: '1D2340' }, creator: A, price: null, offsale: true },
  { id: 910000000000055, name: 'Shoulder Sparrow', type: 44, art: { k: 'bird', c: '8C6A4F' }, creator: S, price: 150 },
  { id: 910000000000058, name: 'Belt Bag', type: 47, art: { k: 'beltbag', c: '2A2B31' }, creator: W, price: 30 },
  // layered clothing
  { id: 910000000000060, name: 'Yellow Raincoat', type: 67, art: { k: 'jacket', c: 'F2C230', v: 'closed' }, creator: A, price: 110 },
  { id: 910000000000061, name: 'Denim Jacket', type: 67, art: { k: 'jacket', c: '4A6FA5', v: 'open' }, creator: W, price: 95 },
  { id: 910000000000062, name: 'Cream Knit Sweater', type: 68, art: { k: 'top', c: 'EFE6D2', v: 'knit' }, creator: A, price: 85 },
  { id: 910000000000063, name: 'Grey Hoodie', type: 65, art: { k: 'top', c: '8A8F98', v: 'hood' }, creator: S, price: 60 },
  { id: 910000000000064, name: 'Straight Jeans', type: 66, art: { k: 'pants', c: '3D5A80' }, creator: W, price: 55 },
  { id: 910000000000065, name: 'Cargo Pants', type: 66, art: { k: 'pants', c: '6B6B47', v: 'cargo' }, creator: W, price: 60 },
  { id: 910000000000066, name: 'Board Shorts', type: 69, art: { k: 'shorts', c: '2BA39B' }, creator: A, price: 40 },
  { id: 910000000000067, name: 'Summer Dress', type: 72, art: { k: 'dress', c: 'E9A23B' }, creator: A, price: 130 },
  { id: 910000000000070, name: 'Yellow Rain Boot (L)', type: 70, art: { k: 'shoe', v: 'boot', c: 'F2C230', side: 'L' }, creator: A, price: 35 },
  { id: 910000000000071, name: 'Yellow Rain Boot (R)', type: 71, art: { k: 'shoe', v: 'boot', c: 'F2C230', side: 'R' }, creator: A, price: 35 },
  { id: 910000000000072, name: 'White Sneaker (L)', type: 70, art: { k: 'shoe', c: 'F4F4F2', side: 'L' }, creator: W, price: 30 },
  { id: 910000000000073, name: 'White Sneaker (R)', type: 71, art: { k: 'shoe', c: 'F4F4F2', side: 'R' }, creator: W, price: 30 },
  // classic clothing
  { id: 910000000000080, name: 'Classic Striped Shirt', type: 11, art: { k: 'cshirt', c: '2B59C3', c2: 'F4F4F2', v: 'stripes' }, creator: S, price: 5 },
  { id: 910000000000081, name: 'Classic Black Pants', type: 12, art: { k: 'cpants', c: '26262B' }, creator: S, price: 5 },
  { id: 910000000000082, name: 'Logo Tee', type: 2, art: { k: 'tee', c: 'D9453B' }, creator: W, price: null, source: 'none' },
  { id: 910000000000083, name: 'Plaid Shirt', type: 11, art: { k: 'cshirt', c: 'B23A3A', c2: '2B2B2B', v: 'check' }, creator: W, price: 10 },
  { id: 910000000000084, name: 'Black Suit Jacket', type: 11, art: { k: 'cshirt', c: '1E1F24', c2: 'F4F4F2', v: 'suit' }, creator: A, price: 15 },
  { id: 910000000000085, name: 'Suit Trousers', type: 12, art: { k: 'cpants', c: '1E1F24' }, creator: A, price: 10 },
  // animations (no art on the render)
  { id: 910000000000090, name: 'Relaxed Idle', type: 51, art: { k: 'none' }, creator: S, price: 0, free: true },
  { id: 910000000000091, name: 'Bouncy Walk', type: 55, art: { k: 'none' }, creator: S, price: 80 },
  { id: 910000000000092, name: 'Stylish Run', type: 53, art: { k: 'none' }, creator: S, price: null, offsale: true },
];
export const ITEM = new Map(ITEMS.map((i) => [i.id, i]));

const BODY = [910000000000001, 910000000000002, 910000000000003, 910000000000004, 910000000000005, 910000000000010];
const RAIN = [...BODY, 910000000000011, 910000000000020, 910000000000030, 910000000000060, 910000000000064, 910000000000070, 910000000000071, 910000000000050, 910000000000090];
const SKATE = [...BODY, 910000000000012, 910000000000021, 910000000000030, 910000000000063, 910000000000065, 910000000000072, 910000000000073, 910000000000058, 910000000000091];
const GALLERY = [...BODY, 910000000000012, 910000000000032, 910000000000040, 910000000000084, 910000000000085, 910000000000072, 910000000000073];

// ---- users --------------------------------------------------------------------------------------------
export const USERS: SampleUser[] = [
  {
    id: 900000000000001, name: 'Sample Wardrobe', displayName: 'Sample Wardrobe', mode: 'ok',
    blurb: '12 saved outfits and 3 Roblox presets. Variants, reused items, a limited, old items Roblox half-remembers.',
    outfits: [
      { id: 800000000000101, name: 'Rainy day', editable: true, avatarType: 'R15', skin: 'E8B48F', items: RAIN },
      { id: 800000000000102, name: 'Rainy day, scarf', editable: true, avatarType: 'R15', skin: 'E8B48F', items: [...RAIN, 910000000000045] },
      { id: 800000000000103, name: 'Rainy day, no hat', editable: true, avatarType: 'R15', skin: 'E8B48F', items: RAIN.filter((i) => i !== 910000000000020) },
      { id: 800000000000104, name: 'Gallery opening', editable: true, avatarType: 'R15', skin: 'B97A57', scale: { height: 1.05, width: 0.95 }, items: GALLERY },
      { id: 800000000000105, name: 'Gallery, no glasses', editable: true, avatarType: 'R15', skin: 'B97A57', scale: { height: 1.05, width: 0.95 }, items: GALLERY.filter((i) => i !== 910000000000040) },
      { id: 800000000000106, name: 'Skate park', editable: true, avatarType: 'R15', skin: '8D5A3B', items: SKATE },
      { id: 800000000000107, name: 'Skate park, winter', editable: true, avatarType: 'R15', skin: '8D5A3B', items: [...SKATE.filter((i) => i !== 910000000000021), 910000000000022, 910000000000045] },
      { id: 800000000000108, name: 'Night market', editable: true, avatarType: 'R15', skin: 'F1C9A5', scale: { height: 0.95 }, items: [...BODY, 910000000000011, 910000000000031, 910000000000041, 910000000000062, 910000000000061, 910000000000064, 910000000000072, 910000000000073, 910000000000055] },
      { id: 800000000000109, name: 'Garden party', editable: true, avatarType: 'R15', skin: '6E4630', items: [...BODY, 910000000000011, 910000000000031, 910000000000023, 910000000000067, 910000000000051, 910000000000072, 910000000000073, 910000000000090] },
      { id: 800000000000110, name: 'Beach', editable: true, avatarType: 'R15', skin: 'D9A07A', items: [...BODY, 910000000000012, 910000000000030, 910000000000040, 910000000000083, 910000000000066, 910000000000072, 910000000000073] },
      { id: 800000000000111, name: 'Classic 2012', editable: true, avatarType: 'R6', skin: 'E3B98F', items: [...BODY, 910000000000013, 910000000000024, 910000000000080, 910000000000081, 910000000000082] },
      { id: 800000000000112, name: 'Untitled', editable: true, avatarType: 'R15', skin: 'C48B67', items: [...BODY, 910000000000011, 910000000000022, 910000000000061, 910000000000064, 910000000000072, 910000000000073, 910000000000052] },
      { id: 800000000000190, name: 'Starter Figure A', editable: false, avatarType: 'R15', skin: 'C9CBD1', items: [...BODY, 910000000000011] },
      { id: 800000000000191, name: 'Starter Figure B', editable: false, avatarType: 'R15', skin: 'A7ADB8', items: [...BODY, 910000000000011, 910000000000081] },
      { id: 800000000000192, name: 'Block Figure', editable: false, avatarType: 'R6', skin: 'BFC3CA', items: [...BODY] },
    ],
  },
  {
    id: 900000000000002, name: 'Hidden Closet', displayName: 'Hidden Closet', mode: 'private',
    blurb: 'Limits who can see their outfits. Roblox refuses the list; RoFit says so and stops there.',
    outfits: [],
  },
  {
    id: 900000000000003, name: 'Fresh Account', displayName: 'Fresh Account', mode: 'ok',
    blurb: 'Never saved an outfit. Roblox still lists its presets, which RoFit keeps out of the way.',
    outfits: [
      { id: 800000000000301, name: 'Starter Figure A', editable: false, avatarType: 'R15', skin: 'C9CBD1', items: [...BODY, 910000000000011] },
      { id: 800000000000302, name: 'Block Figure', editable: false, avatarType: 'R6', skin: 'BFC3CA', items: [...BODY] },
    ],
  },
];
export const USER = new Map(USERS.map((u) => [u.id, u]));

/** The pretend signed-in viewer for "What do I own?" and "Compare with what I'm wearing". Off unless the visitor turns it on. */
export const VIEWER = {
  id: 900000000000099, name: 'Sample Viewer',
  owns: new Set([...BODY, 910000000000011, 910000000000030, 910000000000064, 910000000000072, 910000000000073, 910000000000040, 910000000000090, 910000000000063]),
  avatar: { id: 0, name: 'What I’m wearing', avatarType: 'R15' as const, skin: 'D7A27F', items: [...BODY, 910000000000011, 910000000000030, 910000000000063, 910000000000064, 910000000000072, 910000000000073] },
};

/** Outfit used for the "taken apart" figure on the home page. */
export const HERO_OUTFIT = 800000000000102;