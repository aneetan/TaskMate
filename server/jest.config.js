module.exports = {
  testEnvironment: 'node', // Use 'jsdom' for frontend React tests
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  roots: ['<rootDir>/server'], // Point to your server directory
  // For TypeScript projects:
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};