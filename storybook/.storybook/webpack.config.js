/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const { withUnimodules } = require('@expo/webpack-config/addons');

const common = require('../../webpack.common');

module.exports = ({ config }) => {
  const newConfig = withUnimodules(config, { projectRoot: resolve(__dirname, '../') });
  newConfig.resolve.alias['react-native-svg'] = 'react-native-svg-web';
  return common(newConfig);
};
