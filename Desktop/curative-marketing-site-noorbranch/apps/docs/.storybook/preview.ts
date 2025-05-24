import type { Preview } from '@storybook/react';
import '../src/app/globals.css';
import webstacksTheme from './webstacks-theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: webstacksTheme,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#F7F9FB',
        },
        {
          name: 'dark',
          value: '#151515',
        },
      ],
    },
  },
};

export default preview;
