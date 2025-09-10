'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FileUpload from './FileUpload';
import MinecraftInventory from './MinecraftInventory';

export default function HeroSection() {
  const [materialList, setMaterialList] = useState([]);
  const [showMaterials, setShowMaterials] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [hideTitle, setHideTitle] = useState(false);
  const [removeTitle, setRemoveTitle] = useState(false);

  const handleFileProcessed = (materials, file) => {
    setMaterialList(materials);
    setHideTitle(true); // Start title slide up
    setShowMaterials(true); // Start card size animation
    console.log('Processed materials:', materials);
    console.log('File info:', file.name, file.size);
  };

  const handleReset = () => {
    // Phase 1: Fade out inventory (0.2s)
    setShowInventory(false);
    
    // Phase 2: After inventory fades, shrink card and slide title back (0.35s)
    setTimeout(() => {
      setShowMaterials(false);
      setHideTitle(false);
      setRemoveTitle(false);
      
      // Phase 3: Reset to initial state after animations complete
      setTimeout(() => {
        setMaterialList([]);
      }, 400); // Wait for card shrink animation
    }, 200); // Wait for inventory fade
  };


  return (
    <div className="h-screen relative overflow-hidden">
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
      <div className="relative z-10 h-screen flex flex-col overflow-hidden">
        {/* Title Section */}
        {!removeTitle && (
          <div className="flex-none pt-12 pb-8 px-4 text-center">
            <motion.div
              animate={{ 
                y: hideTitle ? -100 : 0, 
                opacity: hideTitle ? 0 : 1 
              }}
              transition={{ 
                duration: 0.35, 
                ease: "easeInOut" 
              }}
              onAnimationComplete={() => {
                if (hideTitle) {
                  setRemoveTitle(true);
                }
              }}
            >
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
              className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-100"
              style={{
                textShadow: '0 0 40px rgba(255, 255, 255, 0.9), 0 0 80px rgba(255, 255, 255, 0.6), 0 6px 12px rgba(0, 0, 0, 0.9)',
                filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5))'
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Litematica
            </motion.span>
            <motion.span 
              className="block text-3xl md:text-5xl lg:text-6xl mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-50"
              style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.5), 0 4px 8px rgba(0, 0, 0, 0.8)',
                filter: 'drop-shadow(0 20px 20px rgba(0, 0, 0, 0.4))'
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Material List Visualizer
            </motion.span>
            </motion.h1>
            </motion.div>
          </div>
        )}
        
        {/* Spacer */}
        <div className="flex-1" />
        
        {/* Content Card */}
        <div className="flex-none mx-4 mb-8">
          <motion.div 
            className="modern-card rounded-3xl p-8 md:p-12 max-w-4xl mx-auto flex flex-col justify-center"
            style={{ 
              position: 'relative',
              transformOrigin: 'bottom'
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              minHeight: showMaterials ? '700px' : '400px',
              marginTop: showMaterials ? '-300px' : '0px'
            }}
            transition={{ 
              opacity: { duration: 1, delay: 0.5, ease: "easeOut" },
              y: { duration: 1, delay: 0.5, ease: "easeOut" },
              minHeight: { duration: 0.35, delay: 0, ease: "easeInOut" },
              marginTop: { duration: 0.35, delay: 0, ease: "easeInOut" }
            }}
            onAnimationComplete={() => {
              if (showMaterials && !showInventory) {
                setShowInventory(true);
              }
            }}
          >
            {showMaterials && materialList.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showInventory ? 1 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {showInventory && <MinecraftInventory materials={materialList} onReset={handleReset} />}
              </motion.div>
            ) : (
              <FileUpload onFileProcessed={handleFileProcessed} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}