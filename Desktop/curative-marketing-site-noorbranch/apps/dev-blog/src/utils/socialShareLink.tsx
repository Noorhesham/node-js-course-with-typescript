'use client';
import Icon from '@primatives/Icon';

import type { FC } from 'react';

const pathName = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
const socialWindow = (url: string) => window.open(url);

const handleTwitter = () => {
  const url = `https://twitter.com/intent/tweet?url=${pathName}`;
  socialWindow(url);
};
const handleLinkedin = (title: string) => {
  const url = `https://www.linkedin.com/shareArticle?mini=true&url=${pathName}&title=${title}`;
  socialWindow(url);
};
const handleFacebook = () => {
  const url = `https://www.facebook.com/sharer.php?u=${pathName}`;
  socialWindow(url);
};

interface shareSocialLinkProps {
  type: 'twitter' | 'linkedin' | 'facebook';
  title: string;
  className?: string;
}

const SocialShareLink: FC<shareSocialLinkProps> = ({ type, title, className }) => {
  switch (type) {
    case 'twitter':
      return (
        <button
          className={className}
          onClick={() => handleTwitter()}
          onKeyDown={e => e.key === 'Enter' && handleTwitter()}
          aria-label="Share on Twitter"
        >
          <Icon icon="twitter" size={16} />
        </button>
      );
    case 'linkedin':
      return (
        <button
          className={className}
          onClick={() => handleLinkedin(title)}
          onKeyDown={e => e.key === 'Enter' && handleLinkedin(title)}
          aria-label="Share on Linkedin"
        >
          <Icon icon="linkedin" size={16} />
        </button>
      );
    case 'facebook':
      return (
        <button
          className={className}
          onClick={() => handleFacebook()}
          onKeyDown={e => e.key === 'Enter' && handleFacebook()}
          aria-label="Share on Facebook"
        >
          <Icon icon="facebook" size={16} />
        </button>
      );
  }
};

export default SocialShareLink;
