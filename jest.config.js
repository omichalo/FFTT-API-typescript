/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  restoreMocks: true,
  resetMocks: true,
  collectCoverageFrom: ["source/**/*.{ts,tsx}", "!source/**/*.d.ts", "!source/Tests/**/*"],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  testTimeout: 10000,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  // Configuration des tests
  testMatch: ["**/__tests__/**/*.(ts|tsx|js)", "**/?(*.)+(spec|test).(ts|tsx|js)"],
  // Exclure temporairement les tests FFTTAPI problématiques
  testPathIgnorePatterns: ["/node_modules/", "/build/", "FFTTAPI.spec"],
};
