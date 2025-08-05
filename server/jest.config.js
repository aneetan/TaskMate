module.exports = {
  testEnvironment: 'node', // or 'jsdom' for frontend tests
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest' // if using TypeScript
  }
};