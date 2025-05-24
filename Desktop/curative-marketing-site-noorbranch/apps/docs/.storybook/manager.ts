import { addons } from '@storybook/manager-api';
import webstacksTheme from './webstacks-theme';

addons.setConfig({
  theme: webstacksTheme,
  sidebar: {
    showRoots: true,
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
