module.exports = {
  coverageDirectory: './coverage',
  testURL: 'http://localhost',
  collectCoverageFrom: ['**/*.js', '!**/coverage/**', '!**/node_modules/**'],
  coverageThreshold: {
    global: {
      statements: 10,
      branches: 10,
      functions: 10,
      lines: 10,
    },
  },
  projects: ['./client', './server'],
};
