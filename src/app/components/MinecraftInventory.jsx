'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InventorySlot from './InventorySlot';
import MinecraftLoader from './MinecraftLoader';
import { processInventoryItems, splitIntoPages } from '../utils/minecraftAssets';

export default function MinecraftInventory({ materials, onReset }) {
  const [processedItems, setProcessedItems] = useState([]);
  const [inventoryPages, setInventoryPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processItems = async () => {
      setIsLoading(true);
      try {
        // Process materials into inventory items
        const items = processInventoryItems(materials);
        const pages = splitIntoPages(items, 54); // 54 slots for double chest
        
        setProcessedItems(items);
        setInventoryPages(pages);
        setCurrentPage(0);
      } catch (error) {
        console.error('Error processing inventory items:', error);
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
  const totalItems = processedItems.length;
  const uniqueItemTypes = new Set(processedItems.map(item => item.name)).size;

  return (
    <div
      className="w-full max-w-4xl mx-auto"
    >
      {/* Page indicator for multi-page inventories */}
      {inventoryPages.length > 1 && (
        <motion.div
          className="text-center mb-4 text-white font-minecraft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-sm text-gray-400">
            Page {currentPage + 1} of {inventoryPages.length}
          </div>
        </motion.div>
      )}

      {/* Double Chest GUI */}
      <div
        className="relative mx-auto"
        style={{ width: '739px', height: '466px' }}
      >
        {/* Chest Background Image */}
        <div
          className="absolute inset-0 bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('/images/Gui_plastic_chest.png')",
            backgroundSize: 'contain',
          }}
        />

        {/* Inventory Grid - Double Chest (6 rows x 9 columns) */}
        <div
          className="absolute grid grid-cols-9 gap-[4px] p-4"
          style={{
            top: '35px',
            left: '15px',
            width: '710px',
            height: '395px',
          }}
        >
          <AnimatePresence mode="wait">
            {currentPageItems.map((item, index) => (
              <motion.div
                key={`${currentPage}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.01 // Stagger effect
                }}
              >
                <InventorySlot item={item} slotIndex={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Page Navigation */}
      {inventoryPages.length > 1 && (
        <motion.div
          className="flex justify-center items-center mt-6 space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white font-minecraft px-4 py-2 rounded-lg transition-colors"
          >
            ← Previous
          </button>
          
          <div className="flex space-x-2">
            {inventoryPages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentPage 
                    ? 'bg-blue-500' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(inventoryPages.length - 1, currentPage + 1))}
            disabled={currentPage === inventoryPages.length - 1}
            className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white font-minecraft px-4 py-2 rounded-lg transition-colors"
          >
            Next →
          </button>
        </motion.div>
      )}

      {/* Back to Upload Button */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <motion.button
          onClick={onReset}
          className="bg-black text-gray-300 hover:text-white font-minecraft px-8 py-3 text-lg rounded-full transition-all duration-300 cursor-pointer hover:[text-shadow:0_0_10px_rgba(255,255,255,0.8),0_0_20px_rgba(255,255,255,0.4)] focus:outline-none"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Upload Another File
        </motion.button>
      </motion.div>
    </div>
  );
}