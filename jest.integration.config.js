// Configuration Jest pour les tests d'intégration FFTT
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.integration.real.spec.ts"],
  setupFilesAfterEnv: ["<rootDir>/source/Tests/setup.integration.ts"],
  testTimeout: 60000, // 60 secondes pour les tests d'intégration
  verbose: true,
  collectCoverage: false, // Pas de couverture pour les tests d'intégration
  maxWorkers: 1, // Un seul worker pour éviter la surcharge de l'API
  bail: false, // Continuer même en cas d'échec
};
