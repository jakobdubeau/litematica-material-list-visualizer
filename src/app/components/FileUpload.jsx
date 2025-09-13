'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import MinecraftLoader from './MinecraftLoader';
import { getMinecraftName } from '../utils/itemMappingData';

export default function FileUpload({ onFileProcessed }) {
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, processing, error
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError(`Please upload only .txt or .json files`);
      setUploadState('error');
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    setUploadState('uploading');
    setProgress(0);
    setError(null);

    try {
      // Simulate reading file with progress
      await simulateProgress(20, 'Reading file...');
      
      const text = await file.text();
      
      await simulateProgress(50, 'Parsing materials...');
      
      let materials = [];
      
      if (file.name.endsWith('.txt')) {
        materials = parseTxtFile(text);
      } else if (file.name.endsWith('.json')) {
        materials = parseJsonFile(text);
      }
      
      await simulateProgress(80, 'Complete!');
      
      // Extended loading to allow for smooth animation transition
      await simulateProgress(100, 'Preparing interface...');
      
      // Skip success state, go directly to processing
      onFileProcessed?.(materials, file);
      
    } catch (err) {
      setError(err.message || 'Failed to process file');
      setUploadState('error');
    }
  }, [onFileProcessed]);

  const simulateProgress = (targetProgress, message) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= targetProgress) {
            clearInterval(interval);
            setTimeout(resolve, 200);
            return targetProgress;
          }
          return prev + 2;
        });
      }, 50);
    });
  };

  const parseTxtFile = (text) => {
    const lines = text.split('\n');
    const materials = [];
    
    for (const line of lines) {
      // Skip header and separator lines
      if (line.includes('+') || line.includes('Material List') || line.includes('Item') || line.trim() === '') {
        continue;
      }
      
      // Parse table rows: | Item Name | Total | Missing | Available |
      const match = line.match(/\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|/);
      if (match) {
        const [, displayName, total, missing, available] = match;
        const cleanDisplayName = displayName.trim();
        const minecraftName = getMinecraftName(cleanDisplayName);
        
        materials.push({
          name: minecraftName, // Use minecraft internal name
          displayName: cleanDisplayName, // Keep original display name
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
  };

  const parseJsonFile = (text) => {
    try {
      const data = JSON.parse(text);
      const materials = [];
      
      for (const item of data) {
        // Add raw materials
        if (item.RawItem && item.TotalEstimate) {
          const minecraftName = item.RawItem.replace('minecraft:', '');
          materials.push({
            name: minecraftName,
            displayName: null, // Will be generated from minecraft name
            total: item.TotalEstimate,
            missing: item.TotalEstimate,
            available: 0,
            type: 'raw'
          });
        }
        
        // Add result items (crafted items)
        if (item.Results) {
          for (const result of item.Results) {
            const minecraftName = result.ResultItem.replace('minecraft:', '');
            materials.push({
              name: minecraftName,
              displayName: null, // Will be generated from minecraft name
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
    } catch (err) {
      throw new Error('Invalid JSON file format');
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/json': ['.json']
    },
    maxSize: 10 * 1024 * 1024, // 10MB limit
    multiple: false
  });


  return (
    <div className="text-center">
      <motion.h2 
        className="font-minecraft text-white text-2xl md:text-3xl mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        Upload Your Material List
      </motion.h2>

      <motion.div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-2xl p-8 cursor-pointer
          transition-colors transition-opacity transition-transform duration-300 ease-out
          ${isDragActive && !isDragReject ? 'border-blue-400 bg-blue-400/10' : ''}
          ${isDragReject ? 'border-red-400 bg-red-400/10' : ''}
          ${uploadState === 'idle' ? 'border-gray-400 hover:border-gray-300' : ''}
          ${uploadState === 'error' ? 'border-red-400' : ''}
        `}
        initial={{ opacity: 0, transform: "translateY(20px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ 
          duration: 0.6, 
          delay: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        <input {...getInputProps()} />
        
        {uploadState === 'idle' && (
          <>
            <motion.div 
              className="mb-4 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <img 
                src="/images/Enchanted_Book.gif" 
                alt="Upload file" 
                className="w-16 h-16 object-contain"
              />
            </motion.div>
            <motion.p 
              className="text-gray-300 text-lg mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              {isDragActive ? 'Drop your file here!' : 'Drag & drop your material list'}
            </motion.p>
            <motion.p 
              className="text-gray-400 text-sm mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              or click to browse
            </motion.p>
            <motion.p 
              className="text-gray-500 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.0 }}
            >
              Supports .txt and .json files from Litematica
            </motion.p>
          </>
        )}

        {(uploadState === 'uploading' || uploadState === 'processing') && (
          <MinecraftLoader />
        )}

        {uploadState === 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400"
          >
            <div className="text-4xl mb-4">❌</div>
            <p className="text-lg mb-4">{error}</p>
            <button
              onClick={() => setUploadState('idle')}
              className="bg-red-600 hover:bg-red-700 text-white font-minecraft px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

