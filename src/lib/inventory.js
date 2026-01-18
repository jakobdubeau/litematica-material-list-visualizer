'use client';

import { UNIVERSAL_ASSET_MAPPING } from './universalAssetMapping';

const DISPLAY_NAME_MAPPINGS = {
  'Short Grass': 'short_grass',
  'Tall Grass': 'tall_grass',
  'Grass Block': 'grass_block',
  'Coarse Dirt': 'coarse_dirt',
  'Packed Mud': 'packed_mud',
  'Oak Planks': 'oak_planks',
  'Spruce Planks': 'spruce_planks',
  'Birch Planks': 'birch_planks',
  'Jungle Planks': 'jungle_planks',
  'Acacia Planks': 'acacia_planks',
  'Dark Oak Planks': 'dark_oak_planks',
  'Mangrove Planks': 'mangrove_planks',
  'Cherry Planks': 'cherry_planks',
  'Bamboo Planks': 'bamboo_planks',
  'Crimson Planks': 'crimson_planks',
  'Warped Planks': 'warped_planks',
  'Oak Log': 'oak_log',
  'Spruce Log': 'spruce_log',
  'Birch Log': 'birch_log',
  'Jungle Log': 'jungle_log',
  'Acacia Log': 'acacia_log',
  'Dark Oak Log': 'dark_oak_log',
  'Mangrove Log': 'mangrove_log',
  'Cherry Log': 'cherry_log',
  'Bamboo Block': 'bamboo_block',
  'Crimson Stem': 'crimson_stem',
  'Warped Stem': 'warped_stem',
  'Stripped Oak Log': 'stripped_oak_log',
  'Stripped Spruce Log': 'stripped_spruce_log',
  'Stripped Birch Log': 'stripped_birch_log',
  'Stripped Jungle Log': 'stripped_jungle_log',
  'Stripped Acacia Log': 'stripped_acacia_log',
  'Stripped Dark Oak Log': 'stripped_dark_oak_log',
  'Stripped Mangrove Log': 'stripped_mangrove_log',
  'Stripped Cherry Log': 'stripped_cherry_log',
  'Stripped Bamboo Block': 'stripped_bamboo_block',
  'Stripped Crimson Stem': 'stripped_crimson_stem',
  'Stripped Warped Stem': 'stripped_warped_stem',
  'Oak Wood': 'oak_wood',
  'Spruce Wood': 'spruce_wood',
  'Birch Wood': 'birch_wood',
  'Jungle Wood': 'jungle_wood',
  'Acacia Wood': 'acacia_wood',
  'Dark Oak Wood': 'dark_oak_wood',
  'Mangrove Wood': 'mangrove_wood',
  'Cherry Wood': 'cherry_wood',
  'Crimson Hyphae': 'crimson_hyphae',
  'Warped Hyphae': 'warped_hyphae',
  'Stripped Oak Wood': 'stripped_oak_wood',
  'Stripped Spruce Wood': 'stripped_spruce_wood',
  'Stripped Birch Wood': 'stripped_birch_wood',
  'Stripped Jungle Wood': 'stripped_jungle_wood',
  'Stripped Acacia Wood': 'stripped_acacia_wood',
  'Stripped Dark Oak Wood': 'stripped_dark_oak_wood',
  'Stripped Mangrove Wood': 'stripped_mangrove_wood',
  'Stripped Cherry Wood': 'stripped_cherry_wood',
  'Stripped Crimson Hyphae': 'stripped_crimson_hyphae',
  'Stripped Warped Hyphae': 'stripped_warped_hyphae',
  'Oak Stairs': 'oak_stairs',
  'Spruce Stairs': 'spruce_stairs',
  'Birch Stairs': 'birch_stairs',
  'Jungle Stairs': 'jungle_stairs',
  'Acacia Stairs': 'acacia_stairs',
  'Dark Oak Stairs': 'dark_oak_stairs',
  'Mangrove Stairs': 'mangrove_stairs',
  'Cherry Stairs': 'cherry_stairs',
  'Bamboo Stairs': 'bamboo_stairs',
  'Crimson Stairs': 'crimson_stairs',
  'Warped Stairs': 'warped_stairs',
  'Stone Stairs': 'stone_stairs',
  'Cobblestone Stairs': 'cobblestone_stairs',
  'Mossy Cobblestone Stairs': 'mossy_cobblestone_stairs',
  'Stone Brick Stairs': 'stone_brick_stairs',
  'Mossy Stone Brick Stairs': 'mossy_stone_brick_stairs',
  'Granite Stairs': 'granite_stairs',
  'Polished Granite Stairs': 'polished_granite_stairs',
  'Diorite Stairs': 'diorite_stairs',
  'Polished Diorite Stairs': 'polished_diorite_stairs',
  'Andesite Stairs': 'andesite_stairs',
  'Polished Andesite Stairs': 'polished_andesite_stairs',
  'Oak Slab': 'oak_slab',
  'Spruce Slab': 'spruce_slab',
  'Birch Slab': 'birch_slab',
  'Jungle Slab': 'jungle_slab',
  'Acacia Slab': 'acacia_slab',
  'Dark Oak Slab': 'dark_oak_slab',
  'Mangrove Slab': 'mangrove_slab',
  'Cherry Slab': 'cherry_slab',
  'Bamboo Slab': 'bamboo_slab',
  'Crimson Slab': 'crimson_slab',
  'Warped Slab': 'warped_slab',
  'Stone Slab': 'stone_slab',
  'Smooth Stone Slab': 'smooth_stone_slab',
  'Cobblestone Slab': 'cobblestone_slab',
  'Mossy Cobblestone Slab': 'mossy_cobblestone_slab',
  'Stone Brick Slab': 'stone_brick_slab',
  'Mossy Stone Brick Slab': 'mossy_stone_brick_slab',
  'Oak Leaves': 'oak_leaves',
  'Spruce Leaves': 'spruce_leaves',
  'Birch Leaves': 'birch_leaves',
  'Jungle Leaves': 'jungle_leaves',
  'Acacia Leaves': 'acacia_leaves',
  'Dark Oak Leaves': 'dark_oak_leaves',
  'Mangrove Leaves': 'mangrove_leaves',
  'Cherry Leaves': 'cherry_leaves',
  'Azalea Leaves': 'azalea_leaves',
  'Flowering Azalea Leaves': 'flowering_azalea_leaves',
  'Terracotta': 'terracotta',
  'White Terracotta': 'white_terracotta',
  'Orange Terracotta': 'orange_terracotta',
  'Magenta Terracotta': 'magenta_terracotta',
  'Light Blue Terracotta': 'light_blue_terracotta',
  'Yellow Terracotta': 'yellow_terracotta',
  'Lime Terracotta': 'lime_terracotta',
  'Pink Terracotta': 'pink_terracotta',
  'Gray Terracotta': 'gray_terracotta',
  'Light Gray Terracotta': 'light_gray_terracotta',
  'Cyan Terracotta': 'cyan_terracotta',
  'Purple Terracotta': 'purple_terracotta',
  'Blue Terracotta': 'blue_terracotta',
  'Brown Terracotta': 'brown_terracotta',
  'Green Terracotta': 'green_terracotta',
  'Red Terracotta': 'red_terracotta',
  'Black Terracotta': 'black_terracotta',
  'White Wool': 'white_wool',
  'Orange Wool': 'orange_wool',
  'Magenta Wool': 'magenta_wool',
  'Light Blue Wool': 'light_blue_wool',
  'Yellow Wool': 'yellow_wool',
  'Lime Wool': 'lime_wool',
  'Pink Wool': 'pink_wool',
  'Gray Wool': 'gray_wool',
  'Light Gray Wool': 'light_gray_wool',
  'Cyan Wool': 'cyan_wool',
  'Purple Wool': 'purple_wool',
  'Blue Wool': 'blue_wool',
  'Brown Wool': 'brown_wool',
  'Green Wool': 'green_wool',
  'Red Wool': 'red_wool',
  'Black Wool': 'black_wool',
  'Stone': 'stone',
  'Cobblestone': 'cobblestone',
  'Mossy Cobblestone': 'mossy_cobblestone',
  'Stone Bricks': 'stone_bricks',
  'Mossy Stone Bricks': 'mossy_stone_bricks',
  'Cracked Stone Bricks': 'cracked_stone_bricks',
  'Chiseled Stone Bricks': 'chiseled_stone_bricks',
  'Smooth Stone': 'smooth_stone',
  'Dirt': 'dirt',
  'Sand': 'sand',
  'Red Sand': 'red_sand',
  'Gravel': 'gravel',
  'Glass': 'glass',
  'Obsidian': 'obsidian',
  'Bedrock': 'bedrock',
  'Redstone Dust': 'redstone',
  'Redstone': 'redstone',
  'Amethyst Block': 'block_of_amethyst',
  'Coal Block': 'block_of_coal',
  'Iron Block': 'block_of_iron',
  'Gold Block': 'block_of_gold',
  'Diamond Block': 'block_of_diamond',
  'Emerald Block': 'block_of_emerald',
  'Lapis Lazuli Block': 'block_of_lapis_lazuli',
  'Redstone Block': 'block_of_redstone',
  'Netherite Block': 'block_of_netherite',
  'Copper Block': 'copper_block',
  'Exposed Copper': 'exposed_copper_block',
  'Weathered Copper': 'weathered_copper_block',
  'Oxidized Copper': 'oxidized_copper_block',
  'Waxed Copper Block': 'copper_block',
  'Waxed Exposed Copper': 'exposed_copper_block',
  'Waxed Weathered Copper': 'weathered_copper_block',
  'Waxed Oxidized Copper': 'oxidized_copper_block',
  'Waxed Chiseled Copper': 'chiseled_copper',
  'Waxed Exposed Chiseled Copper': 'exposed_chiseled_copper',
  'Waxed Weathered Chiseled Copper': 'weathered_chiseled_copper',
  'Waxed Oxidized Chiseled Copper': 'oxidized_chiseled_copper',
  'Waxed Cut Copper': 'cut_copper',
  'Waxed Exposed Cut Copper': 'exposed_cut_copper',
  'Waxed Weathered Cut Copper': 'weathered_cut_copper',
  'Waxed Oxidized Cut Copper': 'oxidized_cut_copper',
  'Waxed Cut Copper Stairs': 'cut_copper_stairs',
  'Waxed Exposed Cut Copper Stairs': 'exposed_cut_copper_stairs',
  'Waxed Weathered Cut Copper Stairs': 'weathered_cut_copper_stairs',
  'Waxed Oxidized Cut Copper Stairs': 'oxidized_cut_copper_stairs',
  'Waxed Cut Copper Slab': 'cut_copper_slab',
  'Waxed Exposed Cut Copper Slab': 'exposed_cut_copper_slab',
  'Waxed Weathered Cut Copper Slab': 'weathered_cut_copper_slab',
  'Waxed Oxidized Cut Copper Slab': 'oxidized_cut_copper_slab',
  'Waxed Copper Door': 'copper_door',
  'Waxed Exposed Copper Door': 'exposed_copper_door',
  'Waxed Weathered Copper Door': 'weathered_copper_door',
  'Waxed Oxidized Copper Door': 'oxidized_copper_door',
  'Waxed Copper Trapdoor': 'copper_trapdoor',
  'Waxed Exposed Copper Trapdoor': 'exposed_copper_trapdoor',
  'Waxed Weathered Copper Trapdoor': 'weathered_copper_trapdoor',
  'Waxed Oxidized Copper Trapdoor': 'oxidized_copper_trapdoor',
  'Waxed Copper Grate': 'copper_grate',
  'Waxed Exposed Copper Grate': 'exposed_copper_grate',
  'Waxed Weathered Copper Grate': 'weathered_copper_grate',
  'Waxed Oxidized Copper Grate': 'oxidized_copper_grate',
  'Waxed Copper Bulb': 'copper_bulb',
  'Waxed Exposed Copper Bulb': 'exposed_copper_bulb',
  'Waxed Weathered Copper Bulb': 'weathered_copper_bulb',
  'Waxed Oxidized Copper Bulb': 'oxidized_copper_bulb',
  'Raw Iron Block': 'block_of_raw_iron',
  'Raw Copper Block': 'block_of_raw_copper',
  'Raw Gold Block': 'block_of_raw_gold',
  'Quartz Block': 'block_of_quartz',
  'Stripped Bamboo Block': 'block_of_stripped_bamboo',
  'Path': 'dirt_path',
  "Jack o'Lantern": 'jack_o_lantern',
  'Jack o Lantern': 'jack_o_lantern',
  'Jack-o-Lantern': 'jack_o_lantern',
  'Jack O Lantern': 'jack_o_lantern',
  'Light Gray Banner': 'light_gray_banner'
};

const REVERSE_DISPLAY_NAMES = {};
Object.entries(DISPLAY_NAME_MAPPINGS).forEach(([displayName, mcName]) => {
  REVERSE_DISPLAY_NAMES[mcName] = displayName;
});

const STACK_16 = [
  'snowball', 'egg', 'ender_pearl', 'honey_bottle', 'sign', 'bucket', 'water_bucket',
  'lava_bucket', 'milk_bucket', 'powder_snow_bucket', 'bucket_of_cod', 'bucket_of_salmon',
  'bucket_of_tropical_fish', 'bucket_of_pufferfish', 'bucket_of_axolotl', 'bucket_of_tadpole',
  'oak_sign', 'spruce_sign', 'birch_sign', 'jungle_sign', 'acacia_sign', 'dark_oak_sign',
  'mangrove_sign', 'cherry_sign', 'bamboo_sign', 'crimson_sign', 'warped_sign',
  'minecart', 'chest_minecart', 'furnace_minecart', 'tnt_minecart', 'hopper_minecart',
  'command_block_minecart', 'boat', 'oak_boat', 'spruce_boat', 'birch_boat', 'jungle_boat',
  'acacia_boat', 'dark_oak_boat', 'mangrove_boat', 'cherry_boat', 'bamboo_raft'
];

const STACK_1 = [
  'wooden_pickaxe', 'stone_pickaxe', 'iron_pickaxe', 'golden_pickaxe', 'diamond_pickaxe', 'netherite_pickaxe',
  'wooden_axe', 'stone_axe', 'iron_axe', 'golden_axe', 'diamond_axe', 'netherite_axe',
  'wooden_shovel', 'stone_shovel', 'iron_shovel', 'golden_shovel', 'diamond_shovel', 'netherite_shovel',
  'wooden_hoe', 'stone_hoe', 'iron_hoe', 'golden_hoe', 'diamond_hoe', 'netherite_hoe',
  'bow', 'crossbow', 'trident', 'fishing_rod', 'carrot_on_a_stick', 'warped_fungus_on_a_stick',
  'flint_and_steel', 'shears', 'brush', 'spyglass',
  'wooden_sword', 'stone_sword', 'iron_sword', 'golden_sword', 'diamond_sword', 'netherite_sword', 'mace',
  'leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots',
  'chainmail_helmet', 'chainmail_chestplate', 'chainmail_leggings', 'chainmail_boots',
  'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots',
  'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots',
  'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots',
  'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots',
  'turtle_helmet', 'wolf_armor',
  'leather_horse_armor', 'iron_horse_armor', 'golden_horse_armor', 'diamond_horse_armor',
  'shield', 'totem_of_undying', 'elytra', 'saddle',
  'music_disc_13', 'music_disc_cat', 'music_disc_blocks', 'music_disc_chirp', 'music_disc_far',
  'music_disc_mall', 'music_disc_mellohi', 'music_disc_stal', 'music_disc_strad', 'music_disc_ward',
  'music_disc_11', 'music_disc_wait', 'music_disc_otherside', 'music_disc_5', 'music_disc_pigstep',
  'music_disc_relic', 'music_disc_creator', 'music_disc_creator_music_box', 'music_disc_precipice'
];

const CATEGORY_ORDER = { wood: 1, stone: 2, decoration: 3, functional: 4, ores_metals: 5, redstone: 6, nature: 7, nether: 8, tools_weapons: 9, other: 10 };

export function getMinecraftName(displayName) {
  if (DISPLAY_NAME_MAPPINGS[displayName]) return DISPLAY_NAME_MAPPINGS[displayName];
  return displayName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

export function getDisplayName(mcName) {
  const clean = mcName.replace('minecraft:', '').toLowerCase();
  if (REVERSE_DISPLAY_NAMES[clean]) return REVERSE_DISPLAY_NAMES[clean];
  return clean.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function getTexture(itemName) {
  const clean = itemName.replace('minecraft:', '').toLowerCase();
  const paths = UNIVERSAL_ASSET_MAPPING[clean];
  return paths?.[0] || null;
}

function getStackSize(name) {
  const clean = name.replace('minecraft:', '').toLowerCase();
  if (STACK_16.includes(clean)) return 16;
  if (STACK_1.includes(clean)) return 1;
  return 64;
}

function getCategory(name) {
  const n = name.replace('minecraft:', '').toLowerCase();

  if (n.includes('wood') || n.includes('planks') || n.includes('log') || n.includes('stem') ||
      ['oak', 'spruce', 'birch', 'jungle', 'acacia', 'dark_oak', 'mangrove', 'cherry', 'bamboo', 'crimson', 'warped'].some(w => n.includes(w)) ||
      n.includes('fence') || n.includes('gate') || (n.includes('door') && !n.includes('iron') && !n.includes('copper')) ||
      (n.includes('trapdoor') && !n.includes('iron') && !n.includes('copper')) ||
      n.includes('stick') || n.includes('boat') || n.includes('chest') || n.includes('barrel') ||
      n.includes('lectern') || n.includes('bookshelf') || n.includes('crafting_table')) return 'wood';

  if (n.includes('stone') || n.includes('cobblestone') || n.includes('granite') || n.includes('diorite') ||
      n.includes('andesite') || n.includes('deepslate') || n.includes('blackstone') || n.includes('sandstone') ||
      n.includes('sand') || n.includes('gravel') || n.includes('flint') || (n.includes('brick') && !n.includes('nether')) ||
      n.includes('cobbled') || n.includes('smooth') || n.includes('chiseled') || n.includes('polished')) return 'stone';

  if (['iron', 'gold', 'diamond', 'emerald', 'copper', 'netherite', 'coal', 'lapis', 'redstone_ore'].some(o => n.includes(o)) ||
      n.includes('raw_') || n.includes('_ore') || n.includes('block_of_')) return 'ores_metals';

  if (n.includes('redstone') || n.includes('repeater') || n.includes('comparator') || n.includes('piston') ||
      n.includes('observer') || n.includes('hopper') || n.includes('dropper') || n.includes('dispenser') ||
      n.includes('rail') || n.includes('lever') || n.includes('button') || n.includes('pressure_plate')) return 'redstone';

  if (n.includes('wool') || n.includes('carpet') || n.includes('concrete') || n.includes('terracotta') ||
      n.includes('glass') || n.includes('stained') || n.includes('banner') || n.includes('painting') ||
      n.includes('candle') || n.includes('lantern') || n.includes('torch') || n.includes('glowstone') ||
      n.includes('prismarine') || n.includes('quartz') || n.includes('purpur') || n.includes('shulker')) return 'decoration';

  if (n.includes('furnace') || n.includes('anvil') || n.includes('enchanting') || n.includes('brewing') ||
      n.includes('cauldron') || n.includes('beacon') || n.includes('bed') || n.includes('bell') ||
      n.includes('composter') || n.includes('grindstone') || n.includes('loom') || n.includes('smithing') ||
      n.includes('stonecutter') || n.includes('ladder') || n.includes('scaffolding') ||
      (n.includes('door') && (n.includes('iron') || n.includes('copper')))) return 'functional';

  if (n.includes('dirt') || n.includes('grass') || n.includes('leaves') || n.includes('sapling') ||
      n.includes('flower') || n.includes('mushroom') || n.includes('vine') || n.includes('lily') ||
      n.includes('cactus') || n.includes('kelp') || n.includes('coral') || n.includes('ice') ||
      n.includes('snow') || n.includes('pumpkin') || n.includes('melon') || n.includes('seeds') ||
      n.includes('water') || n.includes('lava') || n.includes('obsidian') || n.includes('clay') ||
      n.includes('moss') || n.includes('azalea')) return 'nature';

  if (n.includes('nether') || n.includes('soul') || n.includes('magma') || n.includes('blaze') ||
      n.includes('basalt') || n.includes('crying_obsidian') || n.includes('ancient_debris') ||
      n.includes('netherrack') || n.includes('shroomlight') || n.includes('nylium')) return 'nether';

  if (STACK_1.includes(n) || n.includes('sword') || n.includes('pickaxe') || n.includes('axe') ||
      n.includes('shovel') || n.includes('hoe') || n.includes('bow') || n.includes('helmet') ||
      n.includes('chestplate') || n.includes('leggings') || n.includes('boots') || n.includes('shield') ||
      n.includes('arrow') || n.includes('potion') || n.includes('enchanted_book')) return 'tools_weapons';

  return 'other';
}

export function processInventoryItems(materials) {
  const processed = [];

  materials.forEach(mat => {
    const stackSize = getStackSize(mat.name);
    const total = mat.total || mat.missing || 0;
    if (total <= 0) return;

    const displayName = mat.displayName || getDisplayName(mat.name);
    const texture = getTexture(mat.name);
    const fullStacks = Math.floor(total / stackSize);
    const remainder = total % stackSize;

    for (let i = 0; i < fullStacks; i++) {
      processed.push({ name: mat.name, displayName, texture, count: stackSize, stackSize, type: mat.type || 'item' });
    }
    if (remainder > 0) {
      processed.push({ name: mat.name, displayName, texture, count: remainder, stackSize, type: mat.type || 'item' });
    }
  });

  const groups = {};
  processed.forEach(item => {
    if (!groups[item.name]) {
      groups[item.name] = { items: [], category: getCategory(item.name), totalQty: 0, displayName: item.displayName };
    }
    groups[item.name].items.push(item);
    groups[item.name].totalQty += item.count;
  });

  const result = [];
  Object.keys(groups)
    .sort((a, b) => {
      const ga = groups[a], gb = groups[b];
      const catDiff = CATEGORY_ORDER[ga.category] - CATEGORY_ORDER[gb.category];
      if (catDiff !== 0) return catDiff;
      const qtyDiff = gb.totalQty - ga.totalQty;
      if (qtyDiff !== 0) return qtyDiff;
      return ga.displayName.localeCompare(gb.displayName);
    })
    .forEach(name => result.push(...groups[name].items));

  return result;
}

export function splitIntoPages(items, slotsPerPage = 54) {
  const pages = [];
  for (let i = 0; i < items.length; i += slotsPerPage) {
    const page = items.slice(i, i + slotsPerPage);
    while (page.length < slotsPerPage) page.push(null);
    pages.push(page);
  }
  return pages.length > 0 ? pages : [[...Array(slotsPerPage).fill(null)]];
}
