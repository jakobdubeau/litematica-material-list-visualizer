'use client';

import { getMinecraftName } from './itemMappingData';

export function parseTxtFile(text) {
  const lines = text.split('\n');
  const materials = [];

  for (const line of lines) {
    if (line.includes('+') || line.includes('Material List') || line.includes('Item') || line.trim() === '') {
      continue;
    }

    const match = line.match(/\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|/);
    if (match) {
      const [, displayName, total, missing, available] = match;
      const cleanDisplayName = displayName.trim();
      const minecraftName = getMinecraftName(cleanDisplayName);

      materials.push({
        name: minecraftName,
        displayName: cleanDisplayName,
        total: parseInt(total),
        missing: parseInt(missing),
        available: parseInt(available),
        type: 'crafted'
      });
    }
  }

  if (materials.length === 0) {
    throw new Error('No valid materials found in TXT file');
  }

  return materials;
}

export function parseJsonFile(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    throw new Error('Invalid JSON syntax');
  }

  const materials = [];

  for (const item of data) {
    if (item.RawItem && item.TotalEstimate) {
      const minecraftName = item.RawItem.replace('minecraft:', '');
      materials.push({
        name: minecraftName,
        displayName: null,
        total: item.TotalEstimate,
        missing: item.TotalEstimate,
        available: 0,
        type: 'raw'
      });
    }

    if (item.Results) {
      for (const result of item.Results) {
        const minecraftName = result.ResultItem.replace('minecraft:', '');
        materials.push({
          name: minecraftName,
          displayName: null,
          total: result.ResultTotal,
          missing: result.ResultTotal,
          available: 0,
          type: 'crafted'
        });
      }
    }
  }

  if (materials.length === 0) {
    throw new Error('No valid materials found in JSON file');
  }

  return materials;
}
