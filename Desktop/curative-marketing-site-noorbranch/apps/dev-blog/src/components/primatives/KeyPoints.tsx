import React, { FC } from 'react';
import KnurlingPattern from './KnurlingPattern';

interface KeyPoint {
  title: string;
  description?: string;
}

interface KeyPointsProps {
  points: KeyPoint[] | string[];
  title?: string;
  className?: string;
}

/**
 * A reusable component for displaying key points from an article
 * 
 * @param points - Array of key points with title and description, or array of strings
 * @param title - Section title (default: "Key Points")
 * @param className - Additional CSS classes
 */
export const KeyPoints: FC<KeyPointsProps> = ({
  points,
  title = "Key Points",
  className = '',
}) => {
  if (!points || points.length === 0) {
    return null;
  }

  return (
    <div className={`mb-4 relative lg:sticky lg:top-4 ${className}`} style={{ zIndex: 20 }}>
      <div className="knurling-size-4">
        <div className="relative z-10 border-2 border-white dark:border-gray-900">
          <div className="relative border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-gray-800 dark:text-gray-200">
            <KnurlingPattern size={4} className="opacity-5" />
            <small className="absolute -top-4 left-6 flex min-w-[126px] items-center justify-center space-x-2 bg-white dark:bg-gray-900 py-1 text-xs uppercase text-gray-800 dark:text-gray-200">
              <span className="text-blue-500">[&gt;]</span>
              <span>{title}</span>
            </small>

            {Array.isArray(points) && points.length > 0 && (
              <ul className="space-y-3 pt-4 text-sm">
                {points.map((point, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="h-5 w-5 text-wbstks-primary-100"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {typeof point === 'string' ? point : point.title}
                      {typeof point !== 'string' && point.description && (
                        <span className="text-gray-600 dark:text-gray-400"> - {point.description}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyPoints;
