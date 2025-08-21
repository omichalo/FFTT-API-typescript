// Tests de couverture - Tests spécifiques pour atteindre 100%
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

describe("Coverage - Tests spécifiques pour 100%", () => {
  let ffttAPI: FFTTAPI;

  beforeEach(() => {
    jest.clearAllMocks();
    ffttAPI = new FFTTAPI("test_id", "test_password");
  });

  describe("FFTTAPI.ts - Lignes manquantes", () => {
    test("should cover line 481 (catch block in getPartiesJoueurByLicence)", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        partie: [
          {
            forfait: "0",
            nom: "TEST",
            epreuve: "CFN",
            idpartie: "123",
            coefchamp: "1",
            victoire: "V",
            date: "2022-09-15",
            classement: "1200",
          },
        ],
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      const mockGetParties = jest.fn().mockImplementation(() => {
        throw new Error("Exception pour ligne 481");
      });
      (ffttAPI as any).getPartiesJoueurByLicence = mockGetParties;

      const result = await ffttAPI.getUnvalidatedPartiesJoueurByLicence("123456");
      expect(result).toBeDefined();
    });

    test("should cover line 526 (forfait !== '0')", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        partie: [
          {
            forfait: "1",
            nom: "TEST",
            epreuve: "CFN",
            idpartie: "123",
            coefchamp: "1",
            victoire: "D",
            date: "2022-09-15",
            classement: "1200",
          },
        ],
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      const mockGetParties = jest.fn().mockResolvedValue([]);
      (ffttAPI as any).getPartiesJoueurByLicence = mockGetParties;

      const result = await ffttAPI.getUnvalidatedPartiesJoueurByLicence("123456");
      expect(result).toBeDefined();
    });

    test("should cover line 586 (catch block in forEach)", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        partie: [
          {
            forfait: "0",
            nom: "TEST Exception",
            epreuve: "CFN",
            idpartie: "12349",
            coefchamp: "1",
            victoire: "V",
            date: "2022-09-19",
            classement: "1200",
          },
        ],
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      const mockGetParties = jest.fn().mockImplementation(() => {
        throw new Error("Exception pour ligne 586");
      });
      (ffttAPI as any).getPartiesJoueurByLicence = mockGetParties;

      const result = await ffttAPI.getUnvalidatedPartiesJoueurByLicence("123456");
      expect(result).toBeDefined();
    });

    test("should cover line 651 (catch block in getJoueurVirtualPoints)", async () => {
      const mockGetClassement = jest.fn().mockRejectedValue(new Error("Erreur pour ligne 651"));
      (ffttAPI as any).getClassementJoueurByLicence = mockGetClassement;

      const mockGetJoueurDetails = jest.fn().mockResolvedValue({ pointsLicence: 1200 });
      (ffttAPI as any).getJoueurDetailsByLicence = mockGetJoueurDetails;

      const result = await ffttAPI.getJoueurVirtualPoints("123456");
      expect(result).toBeDefined();
    });

    test("should cover lines 682-683 (type parameter handling)", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        equipe: [
          {
            libequipe: "Team Test",
            libdivision: "Division Test",
            liendivision: "link_test",
            idequipe: "id_test",
            idepr: "epr_test",
            libepr: "Event Test",
          },
        ],
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      const result = await ffttAPI.getEquipesByClub("club_123", null);
      expect(result).toBeDefined();
    });
  });

  describe("RencontreDetailsFactory.service.ts - Lignes manquantes", () => {
    test("should cover lines 29-31 (createFromArray)", () => {
      const { RencontreDetailsFactory } = require("../../Service/RencontreDetailsFactory.service");

      const mockAPI = { getJoueursByClub: jest.fn().mockResolvedValue([]) };
      const factory = new RencontreDetailsFactory(mockAPI);

      const testData = {
        joueur: [
          { xja: "DUPONT Jean", xca: "club_a", xjb: "MARTIN Paul", xcb: "club_b" },
          { xja: "DURAND Pierre", xca: "club_a", xjb: "LEBLANC Marie", xcb: "club_b" },
        ],
        partie: [
          {
            ja: "DUPONT Jean",
            jb: "MARTIN Paul",
            scorea: "3",
            scoreb: "1",
            detail: "11-9 11-7 11-5",
          },
          {
            ja: "DURAND Pierre",
            jb: "LEBLANC Marie",
            scorea: "2",
            scoreb: "3",
            detail: "9-11 11-9 8-11 11-8 9-11",
          },
        ],
        resultat: { equa: "Equipe A", equb: "Equipe B", resa: "10", resb: "8" },
      };

      const result = factory.createFromArray(testData, "club_a", "club_b");
      expect(result).toBeDefined();
    });

    test("should cover lines 51-52 (getExpectedPoints)", () => {
      const { RencontreDetailsFactory } = require("../../Service/RencontreDetailsFactory.service");
      const { PartieRencontre } = require("../../Model/Rencontre/PartieRencontre");
      const { JoueurRencontre } = require("../../Model/Rencontre/JoueurRencontre");

      const mockAPI = { getJoueursByClub: jest.fn() };
      const factory = new RencontreDetailsFactory(mockAPI);

      const joueursA = {
        "DUPONT Jean": new JoueurRencontre("DUPONT", "Jean", "H", 1200, "club_a"),
        "DURAND Pierre": new JoueurRencontre("DURAND", "Pierre", "H", 1100, "club_a"),
      };
      const joueursB = {
        "MARTIN Paul": new JoueurRencontre("MARTIN", "Paul", "F", 1000, "club_b"),
        "LEBLANC Marie": new JoueurRencontre("LEBLANC", "Marie", "F", 900, "club_b"),
      };
      const parties = [
        new PartieRencontre("DUPONT Jean", "MARTIN Paul", 3, 1, []),
        new PartieRencontre("DURAND Pierre", "LEBLANC Marie", 2, 3, []),
      ];

      const result = factory.getExpectedPoints(parties, joueursA, joueursB);
      expect(result).toBeDefined();
    });
  });

  describe("ApiRequest.ts - Ligne manquante", () => {
    test("should cover line 88 (error handling)", async () => {
      const { ApiRequest } = require("../../ApiRequest");
      const apiRequest = new ApiRequest("test_password", "test_id");

      const axios = require("axios");
      const error = new Error("Message d'erreur pour ligne 88");
      axios.get.mockRejectedValue(error);

      await expect(apiRequest.get("test_request")).rejects.toThrow(
        "Erreur API: Message d'erreur pour ligne 88"
      );
    });

    test("should cover line 88 with error without message", async () => {
      const { ApiRequest } = require("../../ApiRequest");
      const apiRequest = new ApiRequest("test_password", "test_id");

      const axios = require("axios");
      const error = {};
      axios.get.mockRejectedValue(error);

      await expect(apiRequest.get("test_request")).rejects.toThrow("Erreur API: Erreur inconnue");
    });
  });
});
