module.export = {
  clearMocks: true,
  roots: ['<rootDir>/src'],
  transform: {
    '\\.(js|jsx)?$': 'babel-jest',
  },
  coverageDirectory: "coverage",
  testMatch: ['<rootDir>/src/**/>(*.)test.{js, jsx}'], // finds test
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect', 
    '@testing-library/react/cleanup-after-each'
  ]
};

