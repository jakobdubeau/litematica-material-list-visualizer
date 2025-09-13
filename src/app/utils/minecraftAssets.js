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
  
  // Group identical items together and sort by name
  const groupedItems = {};
  processedItems.forEach(item => {
    const key = item.name;
    if (!groupedItems[key]) {
      groupedItems[key] = [];
    }
    groupedItems[key].push(item);
  });
  
  // Flatten back to array with identical items adjacent
  const result = [];
  Object.keys(groupedItems)
    .sort()
    .forEach(itemName => {
      result.push(...groupedItems[itemName]);
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