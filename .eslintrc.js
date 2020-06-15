const path = require('path');

module.exports = {
    extends: [
        'kentcdodds',
        'kentcdodds/react',
        'kentcdodds/import',
        'kentcdodds/jest',
    ],
    rules: {
        'import/named': 'off',
    },
    settings: {
        'import/resolver': 'node',
    },
    overrides: [
        {
          files: ['**/__test__/**'],
          settings: {'import/resolver': {
            jest: {
              jestConfigFile: path.join(__dirname, './jest.config')
            }
          }},
        },
        {
          files: ['**/src/**'],
          settings: {'import/resolver': 'webpack'},
        },
    ],
}