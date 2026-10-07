export type Group = 'Accessories' | 'Layered clothing' | 'Classic clothing' | 'Face & head' | 'Body parts' | 'Animations' | 'Gear' | 'Other';

interface T { name: string; group: Group; lua?: string; layered?: string }

/** Roblox AssetType ids → how RoFit labels and groups them. */
export const ASSET_TYPES: Record<number, T> = {
  2: { name: 'T-Shirt', group: 'Classic clothing', lua: 'GraphicTShirt' },
  8: { name: 'Hat', group: 'Accessories', lua: 'HatAccessory' },
  11: { name: 'Shirt', group: 'Classic clothing', lua: 'Shirt' },
  12: { name: 'Pants', group: 'Classic clothing', lua: 'Pants' },
  17: { name: 'Head', group: 'Face & head', lua: 'Head' },
  18: { name: 'Face', group: 'Face & head', lua: 'Face' },
  19: { name: 'Gear', group: 'Gear' },
  27: { name: 'Torso', group: 'Body parts', lua: 'Torso' },
  28: { name: 'Right arm', group: 'Body parts', lua: 'RightArm' },
  29: { name: 'Left arm', group: 'Body parts', lua: 'LeftArm' },
  30: { name: 'Left leg', group: 'Body parts', lua: 'LeftLeg' },
  31: { name: 'Right leg', group: 'Body parts', lua: 'RightLeg' },
  41: { name: 'Hair', group: 'Accessories', lua: 'HairAccessory' },
  42: { name: 'Face accessory', group: 'Accessories', lua: 'FaceAccessory' },
  43: { name: 'Neck', group: 'Accessories', lua: 'NeckAccessory' },
  44: { name: 'Shoulder', group: 'Accessories', lua: 'ShoulderAccessory' },
  45: { name: 'Front', group: 'Accessories', lua: 'FrontAccessory' },
  46: { name: 'Back', group: 'Accessories', lua: 'BackAccessory' },
  47: { name: 'Waist', group: 'Accessories', lua: 'WaistAccessory' },
  48: { name: 'Climb animation', group: 'Animations', lua: 'ClimbAnimation' },
  49: { name: 'Death animation', group: 'Animations', lua: 'DeathAnimation' },
  50: { name: 'Fall animation', group: 'Animations', lua: 'FallAnimation' },
  51: { name: 'Idle animation', group: 'Animations', lua: 'IdleAnimation' },
  52: { name: 'Jump animation', group: 'Animations', lua: 'JumpAnimation' },
  53: { name: 'Run animation', group: 'Animations', lua: 'RunAnimation' },
  54: { name: 'Swim animation', group: 'Animations', lua: 'SwimAnimation' },
  55: { name: 'Walk animation', group: 'Animations', lua: 'WalkAnimation' },
  56: { name: 'Pose animation', group: 'Animations' },
  61: { name: 'Emote', group: 'Animations' },
  64: { name: 'Layered T-shirt', group: 'Layered clothing', layered: 'TShirt' },
  65: { name: 'Layered shirt', group: 'Layered clothing', layered: 'Shirt' },
  66: { name: 'Layered pants', group: 'Layered clothing', layered: 'Pants' },
  67: { name: 'Layered jacket', group: 'Layered clothing', layered: 'Jacket' },
  68: { name: 'Layered sweater', group: 'Layered clothing', layered: 'Sweater' },
  69: { name: 'Layered shorts', group: 'Layered clothing', layered: 'Shorts' },
  70: { name: 'Left shoe', group: 'Layered clothing', layered: 'LeftShoe' },
  71: { name: 'Right shoe', group: 'Layered clothing', layered: 'RightShoe' },
  72: { name: 'Dress / skirt', group: 'Layered clothing', layered: 'DressSkirt' },
  76: { name: 'Eyebrow', group: 'Face & head', layered: 'Eyebrow' },
  77: { name: 'Eyelash', group: 'Face & head', layered: 'Eyelash' },
  78: { name: 'Mood animation', group: 'Animations' },
  79: { name: 'Dynamic head', group: 'Face & head', lua: 'Head' },
};

export const GROUP_ORDER: Group[] = [
  'Accessories', 'Layered clothing', 'Classic clothing', 'Face & head', 'Body parts', 'Animations', 'Gear', 'Other',
];

export const typeName = (id: number, fallback = 'Item') => ASSET_TYPES[id]?.name ?? fallback;
export const typeGroup = (id: number): Group => ASSET_TYPES[id]?.group ?? 'Other';
