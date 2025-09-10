'use client';

import { motion } from 'framer-motion';

export default function MinecraftLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      {/* Loading text */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h3
          className="text-white font-minecraft text-xl mb-2"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          Processing Materials
        </motion.h3>
        
        {/* Animated dots */}
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}