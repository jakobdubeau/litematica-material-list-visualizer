'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Blur Effect */}
      <div 
        className="absolute inset-0 bg-minecraft-scene bg-blur"
        style={{
          backgroundImage: "url('/images/snowymc.png')",
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-fade-to-dark" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Title Section */}
        <div className="flex-none pt-12 pb-8 px-4 text-center">
          <motion.h1 
            className="font-minecraft text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.2
            }}
          >
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-50 to-gray-200"
              style={{
                textShadow: '0 0 40px rgba(255, 255, 255, 0.8), 0 0 80px rgba(255, 255, 255, 0.5), 0 6px 12px rgba(0, 0, 0, 0.9)',
                filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5))'
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Litematica
            </motion.span>
            <motion.span 
              className="block text-3xl md:text-5xl lg:text-6xl mt-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-white to-blue-100"
              style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.7), 0 0 60px rgba(219, 234, 254, 0.4), 0 4px 8px rgba(0, 0, 0, 0.8)',
                filter: 'drop-shadow(0 20px 20px rgba(0, 0, 0, 0.4))'
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Material List Visualizer
            </motion.span>
          </motion.h1>
        </div>
        
        {/* Spacer - This will push content down and fade to black */}
        <div className="flex-1" />
        
        {/* Modern Content Section */}
        <motion.div 
          className="flex-none mx-4 mb-8"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <div className="modern-card rounded-3xl p-8 md:p-12 max-w-4xl mx-auto min-h-[400px] flex flex-col justify-center">
            <div className="text-center">
              <motion.h2 
                className="font-minecraft text-white text-2xl md:text-3xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Upload Your Material List
              </motion.h2>
              <motion.p 
                className="text-gray-300 text-lg mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Upload your Litematica material list to get started
              </motion.p>
              <motion.p 
                className="text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Drag & drop interface coming soon...
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
