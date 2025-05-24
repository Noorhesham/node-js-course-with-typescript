import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  
  // Brand
  brandTitle: 'Webstacks UI',
  brandUrl: 'https://webstacks.com',
  brandImage: '/webstacks-logo-dark.svg',
  brandImageStyle: { width: 160 },
  brandTarget: '_blank',

  // Colors
  colorPrimary: '#0A49EB', // blue-700
  colorSecondary: '#1663FF', // blue-600

  // UI
  appBg: '#F7F9FB', // activeGray
  appContentBg: '#FFFFFF', // white
  appBorderColor: '#E6E6E6', // gray-200
  appBorderRadius: 8,

  // Text colors
  textColor: '#151515', // dark-650
  textInverseColor: '#FFFFFF', // white

  // Toolbar default and active colors
  barTextColor: '#595959', // gray-900
  barSelectedColor: '#0A49EB', // blue-700
  barBg: '#FFFFFF', // white

  // Form colors
  inputBg: '#FFFFFF', // white
  inputBorder: '#E6E6E6', // gray-200
  inputTextColor: '#151515', // dark-650
  inputBorderRadius: 4,
});
