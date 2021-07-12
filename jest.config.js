module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  testMatch: ['**/tests/**/*.spec.ts'],
  reporters: ['default', 'jest-junit'],
  setupFilesAfterEnv: ['./testSetup.ts'],
};
