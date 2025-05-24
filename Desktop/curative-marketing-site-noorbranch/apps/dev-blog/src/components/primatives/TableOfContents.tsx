'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface TOCItem {
  title: string;
  id: string;
  level?: number;
  hidden?: boolean;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    // Observe all section headings
    items.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <nav className="toc-nav">
      <ul className="space-y-2 text-sm">
        {items.map(item => (
          <li key={item.id} className={twMerge(item.level && item.level > 2 ? 'ml-4' : '')}>
            <Link
              href={`#${item.id}`}
              className={twMerge(
                'block py-1 text-gray-600 hover:text-blue-700 transition-colors border-l-2 border-transparent pl-2',
                activeId === item.id ? 'border-blue-700 text-blue-700 font-medium' : ''
              )}
              onClick={e => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  // Smooth scroll to the element
                  element.scrollIntoView({ behavior: 'smooth' });
                  // Update URL hash without jumping
                  window.history.pushState(null, '', `#${item.id}`);
                  setActiveId(item.id);
                }
              }}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
