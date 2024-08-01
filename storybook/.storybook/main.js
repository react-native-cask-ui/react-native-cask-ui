module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  typescript: {
    // https://github.com/styleguidist/react-docgen-typescript/issues/356
    reactDocgen: 'none',
  },
};
