'use client';

import { getMinecraftName } from './inventory';

class ParseError extends Error {
  constructor(message, { line = null, content = null } = {}) {
    super(message);
    this.name = 'ParseError';
    this.line = line;
    this.content = content;
  }
}

function isHeaderOrSeparator(line) {
  const trimmed = line.trim();
  return (
    trimmed === '' ||
    trimmed.startsWith('+') ||
    trimmed.includes('Material List') ||
    (trimmed.includes('Item') && trimmed.includes('Total'))
  );
}

export function parseTxtFile(text) {
  const lines = text.split('\n');
  const materials = [];
  let dataLineCount = 0;
  let lastDataLine = null;
  let lastDataLineNumber = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;

    if (isHeaderOrSeparator(line)) {
      continue;
    }

    if (!line.includes('|')) {
      continue;
    }

    dataLineCount++;
    lastDataLine = line;
    lastDataLineNumber = lineNumber;

    const match = line.match(/\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|/);
    if (!match) {
      const truncated = line.length > 60 ? line.slice(0, 60) + '...' : line;
      throw new ParseError(
        `Invalid format at line ${lineNumber}. Expected: | Item | Total | Missing | Available |`,
        { line: lineNumber, content: truncated }
      );
    }

    const [, displayName, total, missing, available] = match;
    const cleanDisplayName = displayName.trim();

    if (!cleanDisplayName) {
      throw new ParseError(
        `Empty item name at line ${lineNumber}`,
        { line: lineNumber, content: line.slice(0, 60) }
      );
    }

    const totalNum = parseInt(total, 10);
    const missingNum = parseInt(missing, 10);
    const availableNum = parseInt(available, 10);

    if (isNaN(totalNum) || isNaN(missingNum) || isNaN(availableNum)) {
      throw new ParseError(
        `Invalid number at line ${lineNumber}`,
        { line: lineNumber, content: line.slice(0, 60) }
      );
    }

    const minecraftName = getMinecraftName(cleanDisplayName);

    materials.push({
      name: minecraftName,
      displayName: cleanDisplayName,
      total: totalNum,
      missing: missingNum,
      available: availableNum,
      type: 'crafted'
    });
  }

  if (materials.length === 0) {
    if (dataLineCount === 0) {
      throw new ParseError(
        'No material data found. File may be empty or in wrong format.',
        { line: null, content: null }
      );
    }
    throw new ParseError(
      `Could not parse any materials. Last attempted line ${lastDataLineNumber}`,
      { line: lastDataLineNumber, content: lastDataLine?.slice(0, 60) }
    );
  }

  return materials;
}

export function parseJsonFile(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    const match = err.message.match(/position (\d+)/);
    if (match) {
      const pos = parseInt(match[1], 10);
      const lines = text.slice(0, pos).split('\n');
      const line = lines.length;
      throw new ParseError(
        `Invalid JSON syntax at line ${line}`,
        { line, content: null }
      );
    }
    throw new ParseError('Invalid JSON syntax', { line: null, content: null });
  }

  if (!Array.isArray(data)) {
    throw new ParseError(
      'Invalid JSON format: expected an array of materials',
      { line: null, content: null }
    );
  }

  const materials = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const itemIndex = i + 1;

    if (typeof item !== 'object' || item === null) {
      throw new ParseError(
        `Invalid item at index ${itemIndex}: expected an object`,
        { line: null, content: null }
      );
    }

    if (item.RawItem && item.TotalEstimate !== undefined) {
      if (typeof item.RawItem !== 'string') {
        throw new ParseError(
          `Invalid RawItem at index ${itemIndex}: expected a string`,
          { line: null, content: null }
        );
      }
      if (typeof item.TotalEstimate !== 'number' || item.TotalEstimate < 0) {
        throw new ParseError(
          `Invalid TotalEstimate at index ${itemIndex}: expected a positive number`,
          { line: null, content: null }
        );
      }

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

    if (item.Results && Array.isArray(item.Results)) {
      for (let j = 0; j < item.Results.length; j++) {
        const result = item.Results[j];
        const resultIndex = j + 1;

        if (!result.ResultItem || typeof result.ResultItem !== 'string') {
          throw new ParseError(
            `Invalid ResultItem at index ${itemIndex}, result ${resultIndex}`,
            { line: null, content: null }
          );
        }
        if (typeof result.ResultTotal !== 'number' || result.ResultTotal < 0) {
          throw new ParseError(
            `Invalid ResultTotal at index ${itemIndex}, result ${resultIndex}`,
            { line: null, content: null }
          );
        }

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
    throw new ParseError(
      'No valid materials found. JSON should contain RawItem/TotalEstimate or Results arrays.',
      { line: null, content: null }
    );
  }

  return materials;
}
