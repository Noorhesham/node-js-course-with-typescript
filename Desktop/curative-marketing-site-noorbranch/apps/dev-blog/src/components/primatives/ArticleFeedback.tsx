'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useToast } from './ToastManager';
import Windows98Error from './Windows98Error';
import BlueScreenOfDeath from './BlueScreenOfDeath';

interface ArticleFeedbackProps {
  articleId: string;
  articleTitle: string;
}

interface FeedbackState {
  submitted: boolean;
  wasHelpful: boolean;
  timestamp: string;
}

const FEEDBACK_STORAGE_PREFIX = 'article_feedback_';

const ArticleFeedback: React.FC<ArticleFeedbackProps> = ({ 
  articleId, 
  articleTitle 
}) => {
  const [feedbackState, setFeedbackState] = useState<FeedbackState | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { addToast } = useToast();
  
  // Easter egg state
  const [showError, setShowError] = useState(false);
  const [showBSOD, setShowBSOD] = useState(false);
  const clickTimestamps = useRef<number[]>([]);
  
  const pathname = usePathname();
  
  // Load previous feedback state on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const feedbackKey = `${FEEDBACK_STORAGE_PREFIX}${articleId}`;
      const storedFeedback = localStorage.getItem(feedbackKey);
      
      if (storedFeedback) {
        setFeedbackState(JSON.parse(storedFeedback));
      }
      
      setIsLoaded(true);
    }
  }, [articleId]);
  
  // Track rapid clicks for easter egg
  const checkForRapidClicks = (): boolean => {
    const now = Date.now();
    const CLICK_THRESHOLD = 5; // Number of clicks to trigger easter egg
    const TIME_WINDOW = 3000; // Time window in ms (3 seconds)
    
    // Add current timestamp
    clickTimestamps.current.push(now);
    
    // Only keep clicks within the time window
    clickTimestamps.current = clickTimestamps.current.filter(timestamp => 
      now - timestamp < TIME_WINDOW
    );
    
    // Check if we've hit the threshold
    return clickTimestamps.current.length >= CLICK_THRESHOLD;
  };

  const handleFeedback = (wasHelpful: boolean) => {
    // Don't process if component is still loading previous state
    if (!isLoaded) return;
    
    // Check for easter egg condition
    if (checkForRapidClicks()) {
      // Trigger easter egg
      setShowError(true);
      return;
    }
    
    const isRepeatSubmission = !!feedbackState;
    const isChangedOpinion = feedbackState && feedbackState.wasHelpful !== wasHelpful;
    
    // Track the feedback with Segment
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('Article Feedback Submitted', {
        article_id: articleId,
        article_title: articleTitle,
        article_path: pathname,
        was_helpful: wasHelpful,
        is_repeat_submission: isRepeatSubmission,
        is_changed_opinion: isChangedOpinion,
        days_since_last_feedback: isRepeatSubmission 
          ? (new Date().getTime() - new Date(feedbackState.timestamp).getTime()) / (1000 * 3600 * 24)
          : null
      });
    }
    
    // Update local storage
    const newFeedbackState: FeedbackState = {
      submitted: true,
      wasHelpful,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(`${FEEDBACK_STORAGE_PREFIX}${articleId}`, JSON.stringify(newFeedbackState));
    setFeedbackState(newFeedbackState);
    
    // Show toast notification
    const isChangingFeedback = isRepeatSubmission && isChangedOpinion;
    const message = isChangingFeedback
      ? `Your feedback has been updated to ${wasHelpful ? 'helpful' : 'not helpful'}. Thank you!`
      : `Thank you for your ${wasHelpful ? 'positive' : 'constructive'} feedback!`;
    
    addToast({
      message,
      variant: feedbackState?.wasHelpful ? 'success' : 'info',
      duration: 4000,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {feedbackState?.wasHelpful ? (
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          ) : (
            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
          )}
        </svg>
      )
    });
  };

  // Render loading state if not loaded yet
  if (!isLoaded) {
    return null;
  }
  
  return (
    <div className="mb-4 relative">
      <div className="h-[8px] w-full sticky top-0 z-10 overflow-hidden">
        <div className="relative h-full w-full bg-gray-50 dark:bg-gray-800 border-y border-dashed border-gray-300 dark:border-gray-700">
          {/* Knurling pattern */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
              backgroundSize: '4px 4px',
              backgroundPosition: '0 0',
            }}
          ></div>
        </div>
      </div>
      <div className="max-h-[calc(100vh-200px)] overflow-auto no-scrollbar border-b border-dashed border-gray-300 dark:border-gray-700">
        <div className="text-xs font-mono bg-white dark:bg-gray-900">
          <div className="group border-dashed border-gray-300 dark:border-gray-700 flex justify-start items-center min-h-11">
            <div className="m-0 p-3 block w-full">
              <>
                <p className="text-xs font-mono text-gray-900 dark:text-gray-100 font-medium mb-2">
                  Was this useful?
                  {feedbackState && (
                    <span className="text-gray-500 dark:text-gray-400 ml-1">
                      (You selected {feedbackState.wasHelpful ? 'Yes' : 'No'} - click again to change)
                    </span>
                  )}
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleFeedback(true)}
                    className={`${feedbackState?.wasHelpful ? 'bg-green-600' : 'bg-green-500'} border-[1.5px] relative top-[2px] w-auto text-gray-800 inline-block border-green-600 border-dashed text-center group flex-1`}
                    aria-pressed={feedbackState?.wasHelpful}
                  >
                    <span className={`relative text-center w-auto ${feedbackState?.wasHelpful ? 'bg-green-200 dark:bg-green-800 -translate-y-1.5' : 'bg-green-100 dark:bg-green-900 -translate-y-1'} text-green-800 dark:text-green-100 hover:text-green-900 dark:hover:text-green-50 border-green-600 border-dashed text-[12px] font-medium border-[1.5px] px-3 py-1 hover:-translate-y-1.5 active:-translate-y-0.5 mx-[-1.5px] block active:transition-all active:duration-100 select-none font-mono flex items-center justify-center gap-2`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                      </svg>
                      YES
                    </span>
                  </button>
                  <button 
                    onClick={() => handleFeedback(false)}
                    className={`${feedbackState?.wasHelpful === false ? 'bg-red-600' : 'bg-red-500'} border-[1.5px] relative top-[2px] w-auto text-gray-800 inline-block border-red-600 border-dashed text-center group flex-1`}
                    aria-pressed={feedbackState?.wasHelpful === false}
                  >
                    <span className={`relative text-center w-auto ${feedbackState?.wasHelpful === false ? 'bg-red-200 dark:bg-red-800 -translate-y-1.5' : 'bg-red-100 dark:bg-red-900 -translate-y-1'} text-red-800 dark:text-red-100 hover:text-red-900 dark:hover:text-red-50 border-red-600 border-dashed text-[12px] font-medium border-[1.5px] px-3 py-1 hover:-translate-y-1.5 active:-translate-y-0.5 mx-[-1.5px] block active:transition-all active:duration-100 select-none font-mono flex items-center justify-center gap-2`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="rotate-180"
                      >
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                      </svg>
                      NO
                    </span>
                  </button>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
      {/* Toast notifications are now handled by the ToastManager */}
      
      {/* Windows 98 Error Easter Egg */}
      <Windows98Error
        isVisible={showError}
        onClose={() => {
          setShowError(false);
          // Just close the dialog when clicking outside
        }}
        onOkClick={() => {
          // Only trigger BSOD when user clicks OK button
          setShowBSOD(true);
        }}
        message="Whoa there, cowboy! You're clicking faster than a junior dev pushing to main on a Friday."
        title="Feedback Overload"
      />
      
      {/* Blue Screen of Death Easter Egg */}
      <BlueScreenOfDeath
        isVisible={showBSOD}
        onComplete={() => {
          setShowBSOD(false);
          // Reset click timestamps
          clickTimestamps.current = [];
          // Reload the page
          window.location.reload();
        }}
        duration={5000}
      />
    </div>
  );
};

export default ArticleFeedback;
