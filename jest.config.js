module.exports = {
  ...require('./test/jest-common'),
  collectCoverageFrom: ['**/src/**/*.js'],
  projects: [
    './test/jest.lint.js',
    './test/jest.client.js',
  ],
};

