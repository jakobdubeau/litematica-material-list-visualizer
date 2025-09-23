'use client';

import { getMinecraftName, getDisplayName } from './itemMappingData';
import { getAssetPath } from './universalAssetMapping';

// Stack size configurations for comprehensive Minecraft item categorization

// Items that stack to 16
const STACK_SIZES_16 = [
  'snowball', 'egg', 'ender_pearl', 'honey_bottle', 'sign', 'bucket', 'water_bucket', 
  'lava_bucket', 'milk_bucket', 'powder_snow_bucket', 'bucket_of_cod', 'bucket_of_salmon',
  'bucket_of_tropical_fish', 'bucket_of_pufferfish', 'bucket_of_axolotl', 'bucket_of_tadpole',
  'oak_sign', 'spruce_sign', 'birch_sign', 'jungle_sign', 'acacia_sign', 'dark_oak_sign',
  'mangrove_sign', 'cherry_sign', 'bamboo_sign', 'crimson_sign', 'warped_sign',
  'minecart', 'chest_minecart', 'furnace_minecart', 'tnt_minecart', 'hopper_minecart',
  'command_block_minecart', 'boat', 'oak_boat', 'spruce_boat', 'birch_boat', 'jungle_boat',
  'acacia_boat', 'dark_oak_boat', 'mangrove_boat', 'cherry_boat', 'bamboo_raft'
];

// Tools, weapons, armor and other items that don't stack (stack size 1)
const TOOLS_AND_ARMOR = [
  // Tools
  'wooden_pickaxe', 'stone_pickaxe', 'iron_pickaxe', 'golden_pickaxe', 'diamond_pickaxe', 'netherite_pickaxe',
  'wooden_axe', 'stone_axe', 'iron_axe', 'golden_axe', 'diamond_axe', 'netherite_axe',
  'wooden_shovel', 'stone_shovel', 'iron_shovel', 'golden_shovel', 'diamond_shovel', 'netherite_shovel',
  'wooden_hoe', 'stone_hoe', 'iron_hoe', 'golden_hoe', 'diamond_hoe', 'netherite_hoe',
  'bow', 'crossbow', 'trident', 'fishing_rod', 'carrot_on_a_stick', 'warped_fungus_on_a_stick',
  'flint_and_steel', 'shears', 'brush', 'spyglass',
  
  // Weapons
  'wooden_sword', 'stone_sword', 'iron_sword', 'golden_sword', 'diamond_sword', 'netherite_sword',
  'mace',
  
  // Armor
  'leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots',
  'chainmail_helmet', 'chainmail_chestplate', 'chainmail_leggings', 'chainmail_boots',
  'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots',
  'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots',
  'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots',
  'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots',
  'turtle_helmet', 'wolf_armor',
  
  // Horse armor
  'leather_horse_armor', 'iron_horse_armor', 'golden_horse_armor', 'diamond_horse_armor',
  
  // Shields and totems
  'shield', 'totem_of_undying',
  
  // Elytra and saddle
  'elytra', 'saddle',
  
  // Music discs
  'music_disc_13', 'music_disc_cat', 'music_disc_blocks', 'music_disc_chirp', 'music_disc_far',
  'music_disc_mall', 'music_disc_mellohi', 'music_disc_stal', 'music_disc_strad', 'music_disc_ward',
  'music_disc_11', 'music_disc_wait', 'music_disc_otherside', 'music_disc_5', 'music_disc_pigstep',
  'music_disc_relic', 'music_disc_creator', 'music_disc_creator_music_box', 'music_disc_precipice'
];

/**
 * Get the maximum stack size for a given Minecraft item
 * @param {string} itemName - The Minecraft item name (with or without 'minecraft:' prefix)
 * @returns {number} The maximum stack size (1, 16, or 64)
 */
export function getStackSize(itemName) {
  const cleanName = itemName.replace('minecraft:', '').toLowerCase();
  
  if (STACK_SIZES_16.includes(cleanName)) {
    return 16;
  }
  
  if (TOOLS_AND_ARMOR.includes(cleanName)) {
    return 1;
  }
  
  return 64; // Default stack size for most blocks and items
}

/**
 * Get the texture path for an item using the universal asset mapping system
 * @param {string} itemName - The Minecraft item name (with or without 'minecraft:' prefix)
 * @returns {string|null} The path to the item's texture, or null if not found
 */
export function getItemTexture(itemName) {
  const cleanName = itemName.replace('minecraft:', '').toLowerCase();
  return getAssetPath(cleanName);
}


// Re-export display name functions
export { getDisplayName, getMinecraftName };

// Material categories for organizing inventory
const ITEM_CATEGORIES = {
  WOOD: 'wood',
  STONE: 'stone',
  DECORATION: 'decoration',
  FUNCTIONAL: 'functional',
  ORES_METALS: 'ores_metals',
  REDSTONE: 'redstone',
  NATURE: 'nature',
  NETHER: 'nether',
  TOOLS_WEAPONS: 'tools_weapons',
  OTHER: 'other'
};

// Category priority order (lower number = higher priority)
const CATEGORY_ORDER = {
  [ITEM_CATEGORIES.WOOD]: 1,
  [ITEM_CATEGORIES.STONE]: 2,
  [ITEM_CATEGORIES.DECORATION]: 3,
  [ITEM_CATEGORIES.FUNCTIONAL]: 4,
  [ITEM_CATEGORIES.ORES_METALS]: 5,
  [ITEM_CATEGORIES.REDSTONE]: 6,
  [ITEM_CATEGORIES.NATURE]: 7,
  [ITEM_CATEGORIES.NETHER]: 8,
  [ITEM_CATEGORIES.TOOLS_WEAPONS]: 9,
  [ITEM_CATEGORIES.OTHER]: 10
};

/**
 * Get the category for a given Minecraft item
 * @param {string} itemName - The Minecraft item name (with or without 'minecraft:' prefix)
 * @returns {string} The category name
 */
export function getItemCategory(itemName) {
  const cleanName = itemName.replace('minecraft:', '').toLowerCase();

  // Wood category
  if (cleanName.includes('wood') || cleanName.includes('planks') ||
      cleanName.includes('log') || cleanName.includes('stem') ||
      ['oak', 'spruce', 'birch', 'jungle', 'acacia', 'dark_oak', 'mangrove', 'cherry', 'bamboo', 'crimson', 'warped'].some(wood => cleanName.includes(wood)) ||
      cleanName.includes('fence') || cleanName.includes('gate') ||
      (cleanName.includes('door') && !cleanName.includes('iron') && !cleanName.includes('copper')) ||
      (cleanName.includes('trapdoor') && !cleanName.includes('iron') && !cleanName.includes('copper')) ||
      cleanName.includes('stick') || cleanName.includes('boat') || cleanName.includes('chest') ||
      cleanName.includes('barrel') || cleanName.includes('lectern') || cleanName.includes('bookshelf') ||
      cleanName.includes('crafting_table') || cleanName.includes('workbench')) {
    return ITEM_CATEGORIES.WOOD;
  }

  // Stone category
  if (cleanName.includes('stone') || cleanName.includes('cobblestone') ||
      cleanName.includes('granite') || cleanName.includes('diorite') || cleanName.includes('andesite') ||
      cleanName.includes('deepslate') || cleanName.includes('blackstone') ||
      cleanName.includes('sandstone') || cleanName.includes('sand') ||
      cleanName.includes('gravel') || cleanName.includes('flint') ||
      cleanName.includes('brick') && !cleanName.includes('nether') ||
      cleanName.includes('cobbled') || cleanName.includes('smooth') ||
      cleanName.includes('chiseled') || cleanName.includes('polished') ||
      cleanName.includes('cut') && (cleanName.includes('sandstone') || cleanName.includes('stone'))) {
    return ITEM_CATEGORIES.STONE;
  }

  // Ores & Metals category
  if (['iron', 'gold', 'diamond', 'emerald', 'copper', 'netherite', 'coal', 'lapis', 'redstone_ore'].some(ore => cleanName.includes(ore)) ||
      cleanName.includes('raw_') || cleanName.includes('_ore') ||
      cleanName.includes('block_of_') || cleanName.includes('_block') &&
      ['iron', 'gold', 'diamond', 'emerald', 'copper', 'netherite', 'coal', 'lapis', 'redstone'].some(metal => cleanName.includes(metal))) {
    return ITEM_CATEGORIES.ORES_METALS;
  }

  // Redstone category
  if (cleanName.includes('redstone') || cleanName.includes('repeater') ||
      cleanName.includes('comparator') || cleanName.includes('piston') ||
      cleanName.includes('observer') || cleanName.includes('hopper') ||
      cleanName.includes('dropper') || cleanName.includes('dispenser') ||
      cleanName.includes('rail') || cleanName.includes('lever') ||
      cleanName.includes('button') || cleanName.includes('pressure_plate') ||
      cleanName.includes('tripwire') || cleanName.includes('daylight_detector') ||
      cleanName.includes('target') || cleanName.includes('lightning_rod')) {
    return ITEM_CATEGORIES.REDSTONE;
  }

  // Decoration category
  if (cleanName.includes('wool') || cleanName.includes('carpet') ||
      cleanName.includes('concrete') || cleanName.includes('terracotta') ||
      cleanName.includes('glass') || cleanName.includes('stained') ||
      cleanName.includes('banner') || cleanName.includes('painting') ||
      cleanName.includes('item_frame') || cleanName.includes('flower_pot') ||
      cleanName.includes('candle') || cleanName.includes('lantern') ||
      cleanName.includes('torch') || cleanName.includes('sea_lantern') ||
      cleanName.includes('glowstone') || cleanName.includes('prismarine') ||
      cleanName.includes('quartz') || cleanName.includes('purpur') ||
      cleanName.includes('end_stone') || cleanName.includes('shulker')) {
    return ITEM_CATEGORIES.DECORATION;
  }

  // Functional category
  if (cleanName.includes('furnace') || cleanName.includes('anvil') ||
      cleanName.includes('enchanting_table') || cleanName.includes('brewing_stand') ||
      cleanName.includes('cauldron') || cleanName.includes('beacon') ||
      cleanName.includes('bed') || cleanName.includes('bell') ||
      cleanName.includes('composter') || cleanName.includes('grindstone') ||
      cleanName.includes('loom') || cleanName.includes('smithing_table') ||
      cleanName.includes('stonecutter') || cleanName.includes('cartography_table') ||
      cleanName.includes('fletching_table') || cleanName.includes('ladder') ||
      cleanName.includes('scaffolding') || cleanName.includes('chain') ||
      (cleanName.includes('door') && (cleanName.includes('iron') || cleanName.includes('copper'))) ||
      (cleanName.includes('trapdoor') && (cleanName.includes('iron') || cleanName.includes('copper')))) {
    return ITEM_CATEGORIES.FUNCTIONAL;
  }

  // Nature category
  if (cleanName.includes('dirt') || cleanName.includes('grass') ||
      cleanName.includes('leaves') || cleanName.includes('sapling') ||
      cleanName.includes('flower') || cleanName.includes('mushroom') ||
      cleanName.includes('vine') || cleanName.includes('lily') ||
      cleanName.includes('cactus') || cleanName.includes('sugar_cane') ||
      cleanName.includes('kelp') || cleanName.includes('seagrass') ||
      cleanName.includes('coral') || cleanName.includes('sponge') ||
      cleanName.includes('ice') || cleanName.includes('snow') ||
      cleanName.includes('pumpkin') || cleanName.includes('melon') ||
      cleanName.includes('wheat') || cleanName.includes('carrot') ||
      cleanName.includes('potato') || cleanName.includes('beetroot') ||
      cleanName.includes('seeds') || cleanName.includes('bone_meal') ||
      cleanName.includes('water') || cleanName.includes('lava') ||
      cleanName.includes('obsidian') || cleanName.includes('clay') ||
      cleanName.includes('path') || cleanName.includes('farmland') ||
      cleanName.includes('moss') || cleanName.includes('azalea') ||
      cleanName.includes('rooted_dirt') || cleanName.includes('hanging_roots')) {
    return ITEM_CATEGORIES.NATURE;
  }

  // Nether category
  if (cleanName.includes('nether') || cleanName.includes('soul') ||
      cleanName.includes('magma') || cleanName.includes('blaze') ||
      cleanName.includes('wither') || cleanName.includes('ghast') ||
      cleanName.includes('piglin') || cleanName.includes('hoglin') ||
      cleanName.includes('basalt') || cleanName.includes('crying_obsidian') ||
      cleanName.includes('respawn_anchor') || cleanName.includes('lodestone') ||
      cleanName.includes('ancient_debris') || cleanName.includes('netherrack') ||
      cleanName.includes('warped') || cleanName.includes('crimson') ||
      cleanName.includes('shroomlight') || cleanName.includes('nylium')) {
    return ITEM_CATEGORIES.NETHER;
  }

  // Tools & Weapons category
  if (TOOLS_AND_ARMOR.includes(cleanName) ||
      cleanName.includes('sword') || cleanName.includes('pickaxe') ||
      cleanName.includes('axe') || cleanName.includes('shovel') ||
      cleanName.includes('hoe') || cleanName.includes('bow') ||
      cleanName.includes('crossbow') || cleanName.includes('trident') ||
      cleanName.includes('helmet') || cleanName.includes('chestplate') ||
      cleanName.includes('leggings') || cleanName.includes('boots') ||
      cleanName.includes('shield') || cleanName.includes('elytra') ||
      cleanName.includes('totem') || cleanName.includes('arrow') ||
      cleanName.includes('potion') || cleanName.includes('enchanted_book')) {
    return ITEM_CATEGORIES.TOOLS_WEAPONS;
  }

  // Default to OTHER category
  return ITEM_CATEGORIES.OTHER;
}

/**
 * Process materials list and split items into proper stacks for inventory display
 * @param {Array} materials - Array of material objects with name, total/missing, and optional displayName
 * @returns {Array} Array of processed inventory items with proper stack splits
 */
export function processInventoryItems(materials) {
  const processedItems = [];
  
  materials.forEach(material => {
    const stackSize = getStackSize(material.name);
    const totalAmount = material.total || material.missing || 0;
    
    if (totalAmount <= 0) return;
    
    // Use provided displayName or generate from minecraft name
    const displayName = material.displayName || getDisplayName(material.name);
    const texture = getItemTexture(material.name);
    
    // Calculate how many full stacks and remainder
    const fullStacks = Math.floor(totalAmount / stackSize);
    const remainder = totalAmount % stackSize;
    
    // Add full stacks
    for (let i = 0; i < fullStacks; i++) {
      processedItems.push({
        name: material.name,
        displayName: displayName,
        texture: texture,
        count: stackSize,
        stackSize: stackSize,
        type: material.type || 'item'
      });
    }
    
    // Add remainder stack if exists
    if (remainder > 0) {
      processedItems.push({
        name: material.name,
        displayName: displayName,
        texture: texture,
        count: remainder,
        stackSize: stackSize,
        type: material.type || 'item'
      });
    }
  });
  
  // Group identical items together and sort by category, then quantity, then name
  const groupedItems = {};
  processedItems.forEach(item => {
    const key = item.name;
    if (!groupedItems[key]) {
      groupedItems[key] = {
        items: [],
        category: getItemCategory(item.name),
        totalQuantity: 0,
        displayName: item.displayName
      };
    }
    groupedItems[key].items.push(item);
    groupedItems[key].totalQuantity += item.count;
  });

  // Sort by category first, then by total quantity (descending), then by name
  const result = [];
  Object.keys(groupedItems)
    .sort((a, b) => {
      const groupA = groupedItems[a];
      const groupB = groupedItems[b];

      // First sort by category priority
      const categoryDiff = CATEGORY_ORDER[groupA.category] - CATEGORY_ORDER[groupB.category];
      if (categoryDiff !== 0) return categoryDiff;

      // Then sort by total quantity (descending)
      const quantityDiff = groupB.totalQuantity - groupA.totalQuantity;
      if (quantityDiff !== 0) return quantityDiff;

      // Finally sort by display name alphabetically
      return groupA.displayName.localeCompare(groupB.displayName);
    })
    .forEach(itemName => {
      result.push(...groupedItems[itemName].items);
    });
  
  return result;
}

/**
 * Split processed items into inventory pages (54 slots each for double chest)
 * @param {Array} items - Array of processed inventory items
 * @param {number} slotsPerPage - Number of slots per page (default: 54 for double chest)
 * @returns {Array} Array of pages, each containing an array of items/null for empty slots
 */
export function splitIntoPages(items, slotsPerPage = 54) {
  const pages = [];

  for (let i = 0; i < items.length; i += slotsPerPage) {
    const pageItems = items.slice(i, i + slotsPerPage);

    // Fill remaining slots with null for empty slots
    while (pageItems.length < slotsPerPage) {
      pageItems.push(null);
    }

    pages.push(pageItems);
  }

  return pages.length > 0 ? pages : [[...Array(slotsPerPage).fill(null)]];
}