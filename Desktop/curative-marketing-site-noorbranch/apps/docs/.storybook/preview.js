/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    viewMode: 'docs',
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          ['Introduction', 'Installation', 'Design Guidelines', 'Contributing'],
          'Primitives',
          'Modules',
          'Sections',
          'Patterns',
          'Templates',
          'Web Components',
        ],
      },
    },
  },
};

export default preview;
