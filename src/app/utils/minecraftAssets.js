'use client';

// Browser-compatible Minecraft data
// Since minecraft-data and minecraft-assets don't work in browser, we'll use static data

// Minecraft item display names mapping
const ITEM_DISPLAY_NAMES = {
  'stone': 'Stone',
  'cobblestone': 'Cobblestone',
  'oak_log': 'Oak Log',
  'oak_planks': 'Oak Planks',
  'oak_stairs': 'Oak Stairs',
  'spruce_log': 'Spruce Log',
  'spruce_planks': 'Spruce Planks',
  'spruce_stairs': 'Spruce Stairs',
  'birch_log': 'Birch Log',
  'birch_planks': 'Birch Planks',
  'birch_stairs': 'Birch Stairs',
  'jungle_log': 'Jungle Log',
  'jungle_planks': 'Jungle Planks',
  'jungle_stairs': 'Jungle Stairs',
  'stone_bricks': 'Stone Bricks',
  'smooth_stone': 'Smooth Stone',
  'stone_brick_stairs': 'Stone Brick Stairs',
  'stone_brick_slab': 'Stone Brick Slab',
  'iron_ingot': 'Iron Ingot',
  'gold_ingot': 'Gold Ingot',
  'diamond': 'Diamond',
  'redstone': 'Redstone Dust',
  'glass': 'Glass',
  'sand': 'Sand',
  'gravel': 'Gravel',
  'dirt': 'Dirt',
  'grass_block': 'Grass Block',
  'wool': 'White Wool',
  'white_wool': 'White Wool',
  'black_wool': 'Black Wool',
  'red_wool': 'Red Wool',
  'green_wool': 'Green Wool',
  'blue_wool': 'Blue Wool',
  'yellow_wool': 'Yellow Wool',
  'orange_wool': 'Orange Wool',
  'pink_wool': 'Pink Wool',
  'purple_wool': 'Purple Wool',
  'magenta_wool': 'Magenta Wool',
  'cyan_wool': 'Cyan Wool',
  'light_blue_wool': 'Light Blue Wool',
  'lime_wool': 'Lime Wool',
  'gray_wool': 'Gray Wool',
  'light_gray_wool': 'Light Gray Wool',
  'brown_wool': 'Brown Wool'
};

// Stack size configurations based on Minecraft rules
const STACK_SIZES_16 = ['snowball', 'egg', 'ender_pearl', 'potion', 'splash_potion', 'lingering_potion', 'honey_bottle', 'bucket', 'water_bucket', 'lava_bucket', 'milk_bucket', 'cod_bucket', 'salmon_bucket', 'tropical_fish_bucket', 'pufferfish_bucket', 'axolotl_bucket', 'powder_snow_bucket', 'tadpole_bucket'];

const TOOLS_AND_ARMOR = ['wooden_sword', 'stone_sword', 'iron_sword', 'golden_sword', 'diamond_sword', 'netherite_sword', 'wooden_axe', 'stone_axe', 'iron_axe', 'golden_axe', 'diamond_axe', 'netherite_axe', 'wooden_pickaxe', 'stone_pickaxe', 'iron_pickaxe', 'golden_pickaxe', 'diamond_pickaxe', 'netherite_pickaxe', 'wooden_shovel', 'stone_shovel', 'iron_shovel', 'golden_shovel', 'diamond_shovel', 'netherite_shovel', 'wooden_hoe', 'stone_hoe', 'iron_hoe', 'golden_hoe', 'diamond_hoe', 'netherite_hoe', 'leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots', 'chainmail_helmet', 'chainmail_chestplate', 'chainmail_leggings', 'chainmail_boots', 'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots', 'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots', 'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots', 'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots', 'shield', 'bow', 'crossbow', 'fishing_rod', 'flint_and_steel', 'shears'];

/**
 * Get the maximum stack size for a given item
 */
export function getStackSize(itemName) {
  // Clean item name
  const cleanName = itemName.replace('minecraft:', '').toLowerCase();
  
  // Check if it's a special 16-stack item
  if (STACK_SIZES_16.includes(cleanName)) {
    return 16;
  }
  
  // Check if it's a tool or armor (non-stackable)
  if (TOOLS_AND_ARMOR.includes(cleanName)) {
    return 1;
  }
  
  // Default to 64
  return 64;
}

/**
 * Get the official Minecraft display name for an item
 */
export function getDisplayName(itemName) {
  const cleanName = itemName.replace('minecraft:', '').toLowerCase();
  
  // Check if we have a custom display name
  if (ITEM_DISPLAY_NAMES[cleanName]) {
    return ITEM_DISPLAY_NAMES[cleanName];
  }
  
  // Fallback: convert snake_case to Title Case
  return cleanName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get the texture URL for an item using a public Minecraft texture API
 */
export function getItemTexture(itemName) {
  const cleanName = itemName.replace('minecraft:', '').toLowerCase();
  
  // Use a public Minecraft texture API or CDN
  // This is a placeholder - you might want to use a different texture source
  return `https://minecraft-ids.grahamedgecombe.com/items/${cleanName}.png`;
}

/**
 * Basic recipe breakdown for survival mode
 * This is a simplified version - a full implementation would use minecraft-data recipes
 */
const BASIC_RECIPES = {
  'stone_bricks': { 'stone': 1 },
  'smooth_stone': { 'stone': 1 },
  'stone_brick_stairs': { 'stone': 0.75 }, // 6 stones make 8 stairs
  'stone_brick_slab': { 'stone': 0.5 }, // 3 stones make 6 slabs
  'oak_planks': { 'oak_log': 0.25 }, // 1 log makes 4 planks
  'spruce_planks': { 'spruce_log': 0.25 },
  'birch_planks': { 'birch_log': 0.25 },
  'jungle_planks': { 'jungle_log': 0.25 },
  'oak_stairs': { 'oak_log': 0.1875 }, // 6 planks make 8 stairs, 1 log makes 4 planks
  'spruce_stairs': { 'spruce_log': 0.1875 },
  'birch_stairs': { 'birch_log': 0.1875 },
  'jungle_stairs': { 'jungle_log': 0.1875 },
  // Add more recipes as needed
};

/**
 * Convert crafted items to raw materials for survival mode
 */
function convertToRawMaterials(materials) {
  const rawMaterials = {};
  
  materials.forEach(material => {
    const itemName = material.name.toLowerCase();
    const totalAmount = material.total || material.missing || 0;
    
    if (BASIC_RECIPES[itemName]) {
      // Convert crafted item to raw materials
      Object.entries(BASIC_RECIPES[itemName]).forEach(([rawItem, ratio]) => {
        const rawAmount = Math.ceil(totalAmount * ratio);
        if (!rawMaterials[rawItem]) {
          rawMaterials[rawItem] = 0;
        }
        rawMaterials[rawItem] += rawAmount;
      });
    } else {
      // Keep as raw material
      if (!rawMaterials[itemName]) {
        rawMaterials[itemName] = 0;
      }
      rawMaterials[itemName] += totalAmount;
    }
  });
  
  // Convert back to material format
  return Object.entries(rawMaterials).map(([name, total]) => ({
    name,
    total,
    missing: total,
    available: 0,
    type: 'raw'
  }));
}

/**
 * Process materials list and split items into proper stacks
 */
export function processInventoryItems(materials) {
  const processedItems = [];
  
  materials.forEach(material => {
    const stackSize = getStackSize(material.name);
    const totalAmount = material.total || material.missing || 0;
    
    if (totalAmount <= 0) return;
    
    // Calculate how many full stacks and remainder
    const fullStacks = Math.floor(totalAmount / stackSize);
    const remainder = totalAmount % stackSize;
    
    // Add full stacks
    for (let i = 0; i < fullStacks; i++) {
      processedItems.push({
        name: material.name,
        displayName: getDisplayName(material.name),
        texture: getItemTexture(material.name),
        count: stackSize,
        stackSize: stackSize,
        type: material.type || 'item'
      });
    }
    
    // Add remainder stack if exists
    if (remainder > 0) {
      processedItems.push({
        name: material.name,
        displayName: getDisplayName(material.name),
        texture: getItemTexture(material.name),
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