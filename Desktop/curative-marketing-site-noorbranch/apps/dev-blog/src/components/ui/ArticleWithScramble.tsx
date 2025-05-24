'use client';

import React, { useState, createContext, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Create a context to share the hover state
export const HoverContext = createContext(false);

interface ArticleWithScrambleProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

const ArticleWithScramble: React.FC<ArticleWithScrambleProps> = ({ 
  children,
  className = '',
  href
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };
  
  return (
    <HoverContext.Provider value={isHovering}>
      <article 
        className={`group relative isolate ${className} cursor-pointer`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleClick}
      >
        <Link href={href} className="absolute inset-0 z-10" aria-hidden="true" />
        {children}
      </article>
    </HoverContext.Provider>
  );
};

export default ArticleWithScramble;
