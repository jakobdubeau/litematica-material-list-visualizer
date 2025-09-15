'use client';


// Display name mappings for common Litematica item names
const LITEMATICA_DISPLAY_NAME_MAPPINGS = {
  // Common block variations
  'Short Grass': 'short_grass',
  'Tall Grass': 'tall_grass',
  'Grass Block': 'grass_block',
  'Coarse Dirt': 'coarse_dirt',
  'Packed Mud': 'packed_mud',
  
  // Wood types - planks
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
  
  // Wood types - logs
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
  
  // Wood types - stripped logs
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
  
  // Wood types - wood (bark on all sides)
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
  
  // Wood types - stripped wood
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
  
  // Stairs
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
  
  // Slabs
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
  
  // Leaves
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
  
  // Terracotta
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
  
  // Wool
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
  
  // Stone variations
  'Stone': 'stone',
  'Cobblestone': 'cobblestone',
  'Mossy Cobblestone': 'mossy_cobblestone',
  'Stone Bricks': 'stone_bricks',
  'Mossy Stone Bricks': 'mossy_stone_bricks',
  'Cracked Stone Bricks': 'cracked_stone_bricks',
  'Chiseled Stone Bricks': 'chiseled_stone_bricks',
  'Smooth Stone': 'smooth_stone',
  
  // Other common blocks
  'Dirt': 'dirt',
  'Sand': 'sand',
  'Red Sand': 'red_sand',
  'Gravel': 'gravel',
  'Glass': 'glass',
  'Obsidian': 'obsidian',
  'Bedrock': 'bedrock',
  
  // Items and materials
  'Redstone Dust': 'redstone',
  'Redstone': 'redstone',
  
  // Block naming fixes
  'Amethyst Block': 'block_of_amethyst',
  'Bamboo Block': 'block_of_bamboo',
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
  
  // Waxed copper blocks - use non-waxed display names
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
  
  // Banner and block mappings for new textures
  'Light Gray Banner': 'light_gray_banner'
};

// Reverse mapping from minecraft name to display name
const MINECRAFT_TO_DISPLAY_NAME = {};
Object.entries(LITEMATICA_DISPLAY_NAME_MAPPINGS).forEach(([displayName, minecraftName]) => {
  MINECRAFT_TO_DISPLAY_NAME[minecraftName] = displayName;
});

/**
 * Convert Litematica display name to internal minecraft name
 * e.g. "Dark Oak Planks" → "dark_oak_planks"
 */
export function getMinecraftName(litematicaName) {
  // Check direct mapping first
  if (LITEMATICA_DISPLAY_NAME_MAPPINGS[litematicaName]) {
    return LITEMATICA_DISPLAY_NAME_MAPPINGS[litematicaName];
  }
  
  // Fallback: convert to snake_case
  return litematicaName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * Convert minecraft name to display name
 * e.g. "dark_oak_planks" → "Dark Oak Planks"
 */
export function getDisplayName(minecraftName) {
  const cleanName = minecraftName.replace('minecraft:', '').toLowerCase();
  
  // Check if we have a reverse mapping
  if (MINECRAFT_TO_DISPLAY_NAME[cleanName]) {
    return MINECRAFT_TO_DISPLAY_NAME[cleanName];
  }
  
  // Fallback: convert snake_case to Title Case
  return cleanName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

