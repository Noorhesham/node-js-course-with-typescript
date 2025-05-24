'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface ScrambleTextProps {
  text: string;
  href: string;
  className?: string;
  isHovering?: boolean;
  useExternalHover?: boolean;
}

const ScrambleTextFast: React.FC<ScrambleTextProps> = ({ 
  text, 
  href, 
  className = '', 
  isHovering: externalHovering = false,
  useExternalHover = false 
}) => {
  const [internalHovering, setInternalHovering] = useState(false);
  
  // Use either external or internal hover state
  const isHovering = useExternalHover ? externalHovering : internalHovering;
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Characters to use for scrambling - more terminal-like characters
  const chars = '!<>-_\\/[]{}—=+*^?#$%&()~`|;:,.';

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(text);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    let iteration = 0;
    const maxIterations = 3; // Very fast effect

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setDisplayText(prevText => {
        return text
          .split('')
          .map((letter, index) => {
            // If we've gone through enough iterations, show the original letter
            if (index < iteration) {
              return text[index];
            }

            // Otherwise, show a random character
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
      });

      iteration += 1.5; // Very fast reveal

      if (iteration >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 8); // Very fast interval

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovering, text]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      className={`cursor-pointer ${className}`}
      onMouseEnter={() => !useExternalHover && setInternalHovering(true)}
      onMouseLeave={() => !useExternalHover && setInternalHovering(false)}
      onClick={handleClick}
    >
      {displayText}
    </a>
  );
};

export default ScrambleTextFast;
