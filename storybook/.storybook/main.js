module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-web',
  ],
  core: {
    // use webpack 4 is safer.
    // webpack 5 caused unreasonable `left.isCompileTimeValue is not a function` error,
    // and it is still an open issue. https://github.com/storybookjs/storybook/issues/19005
    // storybook will not fix this problem. it suggests upgrading to storybook 7.x.
    // but react-native version of storybook is still at 6.x
    builder: 'webpack4',
  },
  framework: '@storybook/react',
};
