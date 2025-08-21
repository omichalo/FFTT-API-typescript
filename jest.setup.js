// Configuration globale pour Jest
jest.setTimeout(10000);

// Mock des variables d'environnement pour les tests
process.env.ID_SECRET = "test_id";
process.env.PASSWORD_SECRET = "test_password";

// Mock global d'axios pour éviter les appels réseau
jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

// Suppression des logs en mode test
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Note: crypto mocks sont définis dans les fichiers de test individuels
