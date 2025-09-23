'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InventorySlot from './InventorySlot';
import MinecraftLoader from './MinecraftLoader';
import { processInventoryItems, splitIntoPages } from '../utils/minecraftAssets';

export default function MinecraftInventory({ materials, onReset }) {
  const [inventoryPages, setInventoryPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processItems = async () => {
      setIsLoading(true);
      try {
        // Process materials into inventory items
        const items = processInventoryItems(materials);
        const pages = splitIntoPages(items, 72); // 72 slots for double chest (12x6)

        setInventoryPages(pages);
        setCurrentPage(0);
      } catch (error) {
        // Error processing inventory items - fail silently for production
      } finally {
        setIsLoading(false);
      }
    };

    if (materials && materials.length > 0) {
      processItems();
    }
  }, [materials]);


  if (isLoading) {
    return <MinecraftLoader />;
  }

  const currentPageItems = inventoryPages[currentPage] || [];

  return (
    <div className="w-full"
    >
      {/* Page indicator for multi-page inventories - Centered */}
      {inventoryPages.length > 1 && (
        <motion.div
          className="flex justify-center mb-4 text-white font-minecraft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-sm text-gray-400">
            Page {currentPage + 1} of {inventoryPages.length}
          </div>
        </motion.div>
      )}

      {/* Centered Chest Container with Arrows */}
      <div className="flex items-center justify-center w-full relative">
        {/* Left Arrow - Previous Page */}
        {inventoryPages.length > 1 && (
          <motion.button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="font-minecraft text-3xl sm:text-4xl md:text-5xl text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed select-none cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
            style={{ left: 'calc(50% - min(27rem, 45.5vw))' }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            &#60;
          </motion.button>
        )}

        <div className="relative w-full max-w-[780px] aspect-[780/492]">
          {/* Chest Background Image for this page - scaled to fit */}
          <div
            className="absolute inset-0 bg-no-repeat bg-center"
            style={{
              backgroundImage: "url('/images/chest_gui.png')",
              backgroundSize: '100% 100%',
            }}
          />

          {/* Inventory Grid for this page - properly aligned with chest GUI */}
          <motion.div
            key={currentPage}
            className="absolute grid grid-cols-12 grid-rows-6 gap-3"
            style={{
              top: '11%',
              left: '2.4%',
              width: '95%',
              height: '79.5%',
              padding: '1.3%',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {currentPageItems.map((item, itemIndex) => (
              <InventorySlot key={`${currentPage}-${itemIndex}`} item={item} slotIndex={itemIndex} />
            ))}
          </motion.div>

          {/* Subtle glow effect for active chest */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-lg"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 60%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Right Arrow - Next Page */}
        {inventoryPages.length > 1 && (
          <motion.button
            onClick={() => setCurrentPage(Math.min(inventoryPages.length - 1, currentPage + 1))}
            disabled={currentPage === inventoryPages.length - 1}
            className="font-minecraft text-3xl sm:text-4xl md:text-5xl text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed select-none cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
            style={{ right: 'calc(50% - min(27rem, 45.5vw))' }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            &#62;
          </motion.button>
        )}
      </div>

      {/* Back to Upload Button */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={onReset}
          className="bg-black text-gray-300 hover:text-white font-minecraft px-7 py-3 text-lg rounded-full transition-all duration-300 cursor-pointer hover:[text-shadow:0_0_0.625rem_rgba(255,255,255,0.8),0_0_1.25rem_rgba(255,255,255,0.4)] focus:outline-none"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Upload Another File
        </motion.button>
      </motion.div>
    </div>
  );
}