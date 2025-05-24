'use client';

import * as snippet from '@segment/snippet';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import type { Analytics } from '@segment/analytics-next';

// Add type declaration for window.analytics
declare global {
  interface Window {
    analytics: Analytics;
  }
}

const loadSegment = (callback: () => void) => {
  // Check if analytics is already loaded or being loaded
  if (window.analytics || document.querySelector('script[src*="analytics.js/v1"]')) {
    if (window.analytics) {
      callback();
    } else {
      // If script is loading but not yet initialized, wait for it
      const checkAnalytics = setInterval(() => {
        if (window.analytics) {
          clearInterval(checkAnalytics);
          callback();
        }
      }, 100);
    }
    return;
  }

  // Load analytics.js if not already present
  const script = document.createElement('script');
  script.src = `https://cdn.segment.com/analytics.js/v1/${process.env.NEXT_PUBLIC_SEGMENT_API_KEY}/analytics.min.js`;
  script.async = true;
  script.onload = callback;
  document.head.appendChild(script);
};

const isSegmentLoaded = () => !!window.analytics;

const trackPage = (referrer: string, url: string, title: string) => {
  if (isSegmentLoaded()) {
    window.analytics.page({
      referrer,
      url,
      title,
    });
  }
};

const renderSnippet = () => {
  const opts = {
    apiKey: process.env.NEXT_PUBLIC_SEGMENT_API_KEY,
    page: true,
  };

  if (process.env.NODE_ENV === 'development') {
    return snippet.max(opts);
  }

  return snippet.min(opts);
};

const SegmentScript = () => {
  const pathname = usePathname();
  const hasTrackedInitialLoad = useRef(false);
  const previousPathname = useRef<string | null>(null);
  const scriptAppended = useRef(false);

  useEffect(() => {
    const handlePageTrack = (referrer: string) => {
      const currentPageUrl = window.location.href;
      trackPage(referrer, currentPageUrl, document.title);
    };

    if (!hasTrackedInitialLoad.current) {
      loadSegment(() => {
        hasTrackedInitialLoad.current = true;
        previousPathname.current = window.location.href;
      });
    } else {
      const referrer = previousPathname.current ?? document.referrer;
      handlePageTrack(referrer);
      previousPathname.current = window.location.href;
    }
  }, [pathname]);

  useEffect(() => {
    // Only append the snippet script if it hasn't been added yet and analytics isn't already loaded
    if (!scriptAppended.current && !window.analytics && !document.querySelector('script[data-segment-snippet]')) {
      const script = document.createElement('script');
      script.innerHTML = renderSnippet();
      script.setAttribute('data-segment-snippet', 'true');
      document.body.appendChild(script);
      scriptAppended.current = true;

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
          scriptAppended.current = false;
        }
      };
    }
  }, []);

  return null;
};

export default SegmentScript;
