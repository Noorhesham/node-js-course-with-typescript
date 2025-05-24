'use client';
import Icon from '@primatives/Icon';
import { useState } from 'react';

import Toast from '@primatives/Toast';
import SocialShareLink from '@utils/socialShareLink';

import type { FC } from 'react';

const BlogDetailSocialShare: FC<{ title?: string }> = ({ title }) => {
  const [showToast, setShowToast] = useState(false);

  const handleCopied = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div className="flex sm:justify-center gap-2 text-black">
      <SocialShareLink
        className="flex size-10 cursor-pointer items-center justify-center transition-colors hover:text-blue-700"
        title={title || ''}
        type="twitter"
      />
      <SocialShareLink
        className="flex size-10 cursor-pointer items-center justify-center transition-colors hover:text-blue-700"
        title={title || ''}
        type="linkedin"
      />
      <SocialShareLink
        className="flex size-10 cursor-pointer items-center justify-center transition-colors hover:text-blue-700"
        title={title || ''}
        type="facebook"
      />
      <div className="flex size-10">
        <button
          className="flex size-10 cursor-pointer items-center justify-center transition-colors hover:text-blue-700"
          onClick={() => {
            navigator.clipboard
              .writeText(window.location.href)
              .then(() => handleCopied())
              .catch(() => {});
          }}
          aria-label="Copy link to clipboard"
        >
          <Icon icon="link-01" size={16} />
        </button>
      </div>

      <Toast
        message="Link copied to clipboard!"
        isVisible={showToast}
        onClose={handleCloseToast}
        position="bottom-right"
        variant="success"
        icon={<Icon icon="check-circle" size={16} />}
        duration={3000}
      />
    </div>
  );
};

export default BlogDetailSocialShare;
