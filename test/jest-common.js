const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '..'),
  moduleDirectories: [
    'node_modules',
    'test',
    path.join(__dirname, '../src'),
    'common',
    'auth',
    'main',
    'utils',
    'utils/endpoints',
    path.join(__dirname),
  ],
  moduleNameMapper: {
    '\\.css$': require.resolve('./style-mock.js'),
  },
  watchPlugins: ['jest-watch-select-projects'],
}