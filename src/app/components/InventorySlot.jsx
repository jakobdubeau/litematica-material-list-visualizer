'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function InventorySlot({ item, slotIndex }) {
  const [isHovered, setIsHovered] = useState(false);


  return (
    <div className="relative">
      <motion.div
        className="w-full h-full relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.1 }}
      >
        {/* Slot background */}
        <div className="absolute inset-0 bg-transparent" />
        
        {item && (
          <>
            {/* Item texture */}
            {item.texture ? (
              <motion.img
                src={item.texture}
                alt={item.displayName}
                className="w-full h-full object-contain absolute inset-0 m-auto "
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            ) : (
              // Placeholder for items without textures
              <div className="w-full h-full bg-gray-600 border border-gray-500 flex items-center justify-center text-xs text-gray-300">
                {item.name.charAt(0).toUpperCase()}
              </div>
            )}
            
            {/* Stack count - only show if more than 1 */}
            {item.count > 1 && (
              <div className="absolute -bottom-1 -right-1 bg-black/80 text-white text-sm font-minecraft px-1.5 rounded min-w-5 text-center leading-tight">
                {item.count}
              </div>
            )}
          </>
        )}
      </motion.div>
      
      {/* Tooltip */}
      {item && isHovered && (
        <motion.div
          className={`absolute z-50 bg-black/95 text-white px-2 py-1 rounded-md text-base font-minecraft whitespace-nowrap pointer-events-none ${
            slotIndex % 12 > 5 ? 'right-full -mr-11.5' : 'left-full -ml-11.5'
          } ${
            slotIndex >= 60 ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
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