'use client';

import { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlueScreenOfDeathProps {
  isVisible: boolean;
  onComplete: () => void;
  duration?: number;
}

const BlueScreenOfDeath: FC<BlueScreenOfDeathProps> = ({
  isVisible,
  onComplete,
  duration = 3000
}) => {
  // Trigger onComplete after duration
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete, duration]);

  // Add keyboard listener for any key press to continue
  useEffect(() => {
    if (!isVisible) return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      // Flash the screen briefly
      const element = document.querySelector('.bsod-container');
      if (element) {
        element.classList.add('flash');
        setTimeout(() => {
          element.classList.remove('flash');
          // Trigger completion after flash effect
          onComplete();
        }, 150);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#0000AA] text-white font-mono overflow-hidden bsod-container flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center max-w-lg mx-auto">
            <div className="inline-block bg-[#0000AA] border border-white px-4 py-1 mb-8">
              <span className="text-white font-bold">WEBSTACKS</span>
            </div>
            
            <div className="text-left space-y-6">
              <p>An error has occurred. To continue:</p>
              
              <p>Press Enter to return to WEBSTACKS, or</p>
              
              <p>
                Press CTRL+ALT+DEL to restart your computer. If you do this,
                <br />
                you will lose any unsaved feedback in all open applications.
              </p>
              
              <p>Error: F33DB4CK : C11CK5 : 2F45T</p>
            </div>
            
            <div className="mt-16 text-right">
              <p className="animate-pulse">Press any key to continue _</p>
            </div>
            
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-white h-1"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: duration / 1000 - 0.5, ease: "linear" }}
            />
          </div>
          
          <style jsx>{`
            .flash {
              animation: flash-animation 150ms;
            }
            
            @keyframes flash-animation {
              0% { background-color: #0000AA; }
              50% { background-color: #ffffff; }
              100% { background-color: #0000AA; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlueScreenOfDeath;
