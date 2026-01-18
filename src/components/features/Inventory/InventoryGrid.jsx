'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InventorySlot from '@/components/features/Inventory/InventorySlot';
import Loader from '@/components/ui/Loader';
import { processInventoryItems, splitIntoPages } from '@/lib/inventory';

function PaginationButton({ direction, onClick, disabled }) {
  const isPrev = direction === 'prev';
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="font-minecraft text-3xl sm:text-4xl md:text-5xl text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed select-none cursor-pointer absolute top-1/2 transform -translate-y-1/2 z-10"
      style={{ [isPrev ? 'left' : 'right']: 'calc(50% - min(27rem, 45.5vw))' }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      {isPrev ? '<' : '>'}
    </motion.button>
  );
}

export default function MinecraftInventory({ materials, onReset }) {
  const [inventoryPages, setInventoryPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processItems = async () => {
      setIsLoading(true);
      try {
        const items = processInventoryItems(materials);
        const pages = splitIntoPages(items, 72);
        setInventoryPages(pages);
        setCurrentPage(0);
      } catch (error) {
        console.error('Failed to process inventory:', error);
        setInventoryPages([[...Array(72).fill(null)]]);
      } finally {
        setIsLoading(false);
      }
    };

    if (materials && materials.length > 0) {
      processItems();
    }
  }, [materials]);

  if (isLoading) {
    return <Loader />;
  }

  const currentPageItems = inventoryPages[currentPage] || [];
  const hasMultiplePages = inventoryPages.length > 1;

  return (
    <div className="w-full">
      {hasMultiplePages && (
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

      <div className="flex items-center justify-center w-full relative">
        {hasMultiplePages && (
          <PaginationButton
            direction="prev"
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          />
        )}

        <div className="relative w-full max-w-[780px] aspect-[780/492]">
          <div
            className="absolute inset-0 bg-no-repeat bg-center"
            style={{
              backgroundImage: "url('/images/chest_gui.png')",
              backgroundSize: '100% 100%',
            }}
          />

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

        {hasMultiplePages && (
          <PaginationButton
            direction="next"
            onClick={() => setCurrentPage(Math.min(inventoryPages.length - 1, currentPage + 1))}
            disabled={currentPage === inventoryPages.length - 1}
          />
        )}
      </div>

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
