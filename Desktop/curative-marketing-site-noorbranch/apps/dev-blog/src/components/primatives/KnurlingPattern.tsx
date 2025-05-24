import React, { FC } from 'react';

interface KnurlingPatternProps {
  size?: number;
  className?: string;
  opacity?: number;
}

/**
 * A reusable knurling pattern component for decorative UI elements
 * 
 * @param size - The size of the knurling dots in pixels (default: 4)
 * @param className - Additional CSS classes
 * @param opacity - Opacity of the pattern (default: 0.1)
 */
export const KnurlingPattern: FC<KnurlingPatternProps> = ({ 
  size = 4, 
  className = '', 
  opacity = 0.1 
}) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden dark:opacity-50 ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,${opacity}) 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        backgroundPosition: '0 0',
      }}
    />
  );
};

export default KnurlingPattern;
