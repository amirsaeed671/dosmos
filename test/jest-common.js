const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '..'),
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, '../src'),
    'common',
    'auth',
    'main',
    path.join(__dirname),
  ],
  moduleNameMapper: {
    '\\.css$': require.resolve('./style-mock.js'),
  },
  watchPlugins: ['jest-watch-select-projects'],
}