/** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts', '!src/shared/openapi/**'],
  coverageDirectory: 'coverage',
}

module.exports = config
