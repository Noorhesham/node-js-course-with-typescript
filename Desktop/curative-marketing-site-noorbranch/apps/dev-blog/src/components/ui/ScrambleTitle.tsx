'use client';

import React, { useContext, useEffect, useState, useRef } from 'react';
import { HoverContext } from './ArticleWithScramble';

interface ScrambleTitleProps {
  title: string;
  href?: string; // Optional now since we don't use it
  className?: string;
}

const ScrambleTitle: React.FC<ScrambleTitleProps> = ({ 
  title, 
  className = '' 
}) => {
  // Get the hover state from the parent ArticleWithScramble component
  const isHovering = useContext(HoverContext);
  const [displayText, setDisplayText] = useState(title);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Character set for scrambling
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  // Handle scrambling effect
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (isHovering) {
      let iteration = 0;
      const maxIterations = 6; // Faster animation
      
      // Start the scrambling effect
      intervalRef.current = setInterval(() => {
        setDisplayText(prevText => {
          return title
            .split('')
            .map((char, index) => {
              // If iteration is greater than index, show the original character
              if (index < iteration) {
                return title[index];
              }
              
              // Otherwise show a random character
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        });
        
        // Stop the interval after reaching max iterations
        if (iteration >= maxIterations) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setDisplayText(title);
        }
        
        iteration += 1 / 2;
      }, 30); // Faster interval
    } else {
      // Reset to original text when not hovering
      setDisplayText(title);
    }
    
    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovering, title]);
  
  return (
    <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white font-shareTechMono mb-3">
      <div className="flex items-center">
        <span className="text-green-600 dark:text-green-400 mr-1">&gt;</span>
        <span className={`text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors ${className}`}>
          {displayText}
        </span>
        <span className="w-2 h-4 bg-blue-600 dark:bg-blue-400 ml-1 animate-pulse"></span>
      </div>
    </h2>
  );
};

export default ScrambleTitle;
