'use client';

import { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Windows98ErrorProps {
  isVisible: boolean;
  onClose: () => void;
  onOkClick?: () => void; // Separate callback for OK button
  message: string;
  title?: string;
}

const Windows98Error: FC<Windows98ErrorProps> = ({
  isVisible,
  onClose,
  onOkClick,
  message,
  title = 'Error'
}) => {
  // Allow dragging the error window
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Play error sound when the component appears
  useEffect(() => {
    if (isVisible) {
      const audio = new Audio('/sounds/windows-error.mp3');
      audio.volume = 0.5;
      audio.play().catch(err => console.error('Error playing sound:', err));
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Removed onClick handler to prevent closing when clicking outside
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            drag
            dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            style={{ x: position.x, y: position.y }}
            onDrag={(e, info) => {
              setPosition({
                x: position.x + info.delta.x,
                y: position.y + info.delta.y
              });
            }}
          >
            {/* Windows 98 style error dialog */}
            <div className="w-[400px] bg-[#c0c0c0] border-[3px] border-[#dfdfdf] border-l-[#808080] border-t-[#808080] shadow-[5px_5px_10px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center bg-[#000080] px-2 py-1 text-white font-bold">
                <div className="flex-1">{title}</div>
                <button 
                  className="w-[16px] h-[14px] flex items-center justify-center bg-[#c0c0c0] border border-[#808080] border-r-[#ffffff] border-b-[#ffffff] text-black font-bold leading-none"
                  onClick={() => {
                    onClose();
                    // If onOkClick is provided, call it (X button acts like OK)
                    if (onOkClick) onOkClick();
                  }}
                >
                  <span className="relative -top-0.5">×</span>
                </button>
              </div>
              
              {/* Content */}
              <div className="p-4 flex items-start gap-3">
                <div className="shrink-0">
                  <div className="w-10 h-10 bg-[#c0c0c0] border border-[#808080] border-r-[#ffffff] border-b-[#ffffff] flex items-center justify-center">
                    <div className="text-2xl font-bold text-red-600">!</div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-sans text-sm mb-4">{message}</p>
                  <p className="font-sans text-xs text-red-600 mb-6">Warning: Clicking OK will trigger a Blue Screen of Death!</p>
                  <div className="flex justify-center">
                    <button 
                      className="min-w-[80px] px-4 py-1 bg-[#c0c0c0] border-2 border-[#ffffff] border-r-[#808080] border-b-[#808080] active:border-[#808080] active:border-r-[#ffffff] active:border-b-[#ffffff] font-sans text-sm"
                      onClick={() => {
                        // Close the dialog
                        onClose();
                        // If onOkClick is provided, call it
                        if (onOkClick) onOkClick();
                      }}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Windows98Error;
