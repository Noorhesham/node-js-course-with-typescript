'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface BlogDetailScrollerProps {
  category: string;
  slug: string;
}

const BlogDetailScroller = ({ category, slug }: BlogDetailScrollerProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the page the user has scrolled
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent * 100);
      
      // Show the scroller after scrolling down a bit
      setIsVisible(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={twMerge(
        'fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out transform bg-white border-b border-dashed border-gray-300 shadow-sm',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              href={slug || '/blog'} 
              className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors font-shareTechMono"
            >
              ← Back to {category}
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-blue-700 rounded-full"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 font-mono">{Math.round(scrollProgress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailScroller;
