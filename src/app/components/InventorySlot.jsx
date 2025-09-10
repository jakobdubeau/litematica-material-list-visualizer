'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function InventorySlot({ item, slotIndex }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <motion.div
        className="w-[54px] h-[54px] relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.1 }}
      >
        {/* Slot background - will be styled to match the chest GUI */}
        <div className="absolute inset-0 bg-transparent" />
        
        {item && (
          <>
            {/* Item texture */}
            {item.texture ? (
              <motion.img
                src={item.texture}
                alt={item.displayName}
                className="w-full h-full object-contain pixelated"
                style={{ imageRendering: 'pixelated' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                onError={(e) => {
                  // Fallback to placeholder if texture fails to load
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              // Fallback placeholder for items without textures
              <div className="w-full h-full bg-gray-600 border border-gray-500 flex items-center justify-center text-xs text-gray-300">
                {item.name.charAt(0).toUpperCase()}
              </div>
            )}
            
            {/* Stack count - only show if more than 1 */}
            {item.count > 1 && (
              <div className="absolute -bottom-1 -right-1 bg-black/80 text-white text-sm font-minecraft px-1.5 rounded min-w-[20px] text-center leading-tight">
                {item.count}
              </div>
            )}
          </>
        )}
      </motion.div>
      
      {/* Tooltip */}
      {item && isHovered && (
        <motion.div
          className="absolute z-50 bg-black/95 text-white px-4 py-3 rounded-md text-base font-minecraft whitespace-nowrap pointer-events-none"
          style={{
            left: slotIndex % 9 > 4 ? 'auto' : '100%',
            right: slotIndex % 9 > 4 ? '100%' : 'auto',
            bottom: slotIndex >= 45 ? '100%' : 'auto',
            top: slotIndex >= 45 ? 'auto' : '100%',
            marginLeft: slotIndex % 9 > 4 ? '-8px' : '8px',
            marginRight: slotIndex % 9 > 4 ? '8px' : '-8px',
            marginTop: slotIndex >= 45 ? '-8px' : '8px',
            marginBottom: slotIndex >= 45 ? '8px' : '-8px',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
        >
          <div className="font-bold text-white">{item.displayName}</div>
        </motion.div>
      )}
    </div>
  );
}