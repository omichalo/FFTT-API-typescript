// Tests pour les nouveaux endpoints FFTT implémentés
import { FFTTAPI } from "../../FFTTAPI";

// Mock crypto globalement
const mockCrypto = {
  createHash: jest.fn(() => ({
    update: jest.fn(() => ({
      digest: jest.fn(() => "mocked_hash"),
    })),
  })),
  createHmac: jest.fn(() => ({
    update: jest.fn(() => ({
      digest: jest.fn(() => "mocked_hash"),
    })),
  })),
};

Object.defineProperty(global, "crypto", {
  value: mockCrypto,
  writable: true,
});

// Mock des autres dépendances
jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

jest.mock("xml2js", () => ({
  parseStringPromise: jest.fn(),
}));

jest.mock("iconv-lite", () => ({
  decode: jest.fn((buffer: Buffer) => buffer.toString()),
}));

jest.mock("html-entities", () => ({
  decode: jest.fn((str: string) => str),
}));

describe("FFTTAPI - Nouveaux Endpoints", () => {
  let ffttAPI: FFTTAPI;

  beforeEach(() => {
    jest.clearAllMocks();
    ffttAPI = new FFTTAPI("test_id", "test_password");
  });

  describe("getEpreuves - xml_epreuve.php", () => {
    test("should get epreuves successfully", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        epreuve: [
          {
            idepreuve: "123",
            idorga: "456",
            libelle: "Championnat de France",
          },
          {
            idepreuve: "789",
            idorga: "456",
            libelle: "Critérium",
          },
        ],
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      const result = await ffttAPI.getEpreuves(456, "E");

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: "123",
        organismeId: "456",
        libelle: "Championnat de France",
      });
      expect(mockGet).toHaveBeenCalledWith("xml_epreuve", {
        organisme: 456,
        type: "E",
      });
    });

    test("should handle single epreuve response", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        epreuve: {
          idepreuve: "123",
          idorga: "456",
          libelle: "Championnat de France",
        },
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      const result = await ffttAPI.getEpreuves(456, "I");

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: "123",
        organismeId: "456",
        libelle: "Championnat de France",
      });
    });
  });

  describe("getResultatsIndividuels - xml_result_indiv.php", () => {
    test("should get poules successfully", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        tour: [
          {
            libelle: "Groupe A",
            lien: "epr=123&res_division=456&cx_tableau=789",
          },
        ],
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      const result = await ffttAPI.getResultatsIndividuels(123, 456, "poule");

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        libelle: "Groupe A",
        lien: "epr=123&res_division=456&cx_tableau=789",
      });
    });

    test("should get classement successfully", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        classement: [
          {
            rang: "1",
            nom: "DUPONT Jean",
            clt: "1200",
            club: "Club Test",
            points: "15",
          },
        ],
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      const result = await ffttAPI.getResultatsIndividuels(123, 456, "classement");

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
    });

    test("should get parties successfully", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        partie: [
          {
            libelle: "Finale",
            vain: "DUPONT Jean",
            perd: "MARTIN Paul",
            forfait: "0",
          },
        ],
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      const result = await ffttAPI.getResultatsIndividuels(123, 456, "partie");

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
    });

    test("should handle groupeId parameter", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        tour: [
          {
            libelle: "Groupe B",
            lien: "epr=123&res_division=456&cx_tableau=999",
          },
        ],
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      const result = await ffttAPI.getResultatsIndividuels(123, 456, "poule", 999);

      expect(result).toBeDefined();
      expect(mockGet).toHaveBeenCalledWith("xml_result_indiv", {
        epr: 123,
        res_division: 456,
        action: "poule",
        cx_tableau: 999,
      });
    });
  });

  describe("getClassementCriterium - xml_res_cla.php", () => {
    test("should get classement critérium successfully", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        classement: [
          {
            rang: "1",
            nom: "DUPONT Jean",
            clt: "1200",
            club: "Club Test",
            points: "15",
          },
          {
            rang: "2",
            nom: "MARTIN Paul",
            clt: "1185",
            club: "Club Test 2",
            points: "12",
          },
        ],
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      const result = await ffttAPI.getClassementCriterium(456);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        rang: "1",
        nom: "DUPONT Jean",
        classement: "1200",
        club: "Club Test",
        points: "15",
      });
      expect(mockGet).toHaveBeenCalledWith("xml_res_cla", {
        res_division: 456,
      });
    });

    test("should handle single classement response", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        classement: {
          rang: "1",
          nom: "DUPONT Jean",
          clt: "1200",
          club: "Club Test",
          points: "15",
        },
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      const result = await ffttAPI.getClassementCriterium(456);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
    });
  });
});
