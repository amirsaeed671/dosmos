const path = require('path');

module.exports = {
    ...require('./jest-common'),
    rootDir: path.join(__dirname, '..'),
    displayName: 'lint',
    runner: 'jest-runner-eslint',
    testMatch: ['<rootDir>/**/*.js'],
}