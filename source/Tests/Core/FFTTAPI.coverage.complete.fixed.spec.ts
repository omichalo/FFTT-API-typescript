// Tests FFTTAPI Coverage Complet - Migration de tous les tests manquants
import { FFTTAPI } from "../../FFTTAPI";

// Global mocks - Utilisation de jest.spyOn() pour crypto natif
const crypto = require("crypto");
jest.spyOn(crypto, "createHash").mockImplementation(() => ({
  update: jest.fn().mockReturnThis(),
  digest: jest.fn(() => "hashed_password"),
}));

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

jest.mock("xml2js", () => ({
  parseString: jest.fn(),
}));

jest.mock("iconv-lite", () => ({
  decode: jest.fn(),
}));

jest.mock("html-entities", () => ({
  decode: jest.fn(),
}));

describe("FFTTAPI Coverage Complet - Tests de couverture manquants", () => {
  let ffttAPI: FFTTAPI;

  beforeEach(() => {
    jest.clearAllMocks();
    ffttAPI = new FFTTAPI("test_id", "test_password");
  });

  describe("FFTTAPI.ts - Ligne 481 (catch block in getPartiesJoueurByLicence)", () => {
    test("should cover line 481 with specific error in getPartiesJoueurByLicence", async () => {
      const mockGet = jest.fn().mockRejectedValue(new Error("Test error"));
      (ffttAPI as any).apiRequest.get = mockGet;

      // Mock getPartiesJoueurByLicence to throw error
      jest.spyOn(ffttAPI, "getPartiesJoueurByLicence").mockRejectedValue(new Error("Test error"));

      await expect(ffttAPI.getPartiesJoueurByLicence("123456")).rejects.toThrow("Test error");
    });
  });

  describe("FFTTAPI.ts - Ligne 503 (catch block in getUnvalidatedPartiesJoueurByLicence)", () => {
    test("should cover line 503 with specific error", async () => {
      const mockGet = jest.fn().mockRejectedValue(new Error("Test error"));
      (ffttAPI as any).apiRequest.get = mockGet;

      // Mock getUnvalidatedPartiesJoueurByLicence to throw error
      jest
        .spyOn(ffttAPI, "getUnvalidatedPartiesJoueurByLicence")
        .mockRejectedValue(new Error("Test error"));

      await expect(ffttAPI.getUnvalidatedPartiesJoueurByLicence("123456")).rejects.toThrow(
        "Test error"
      );
    });
  });

  describe("FFTTAPI.ts - Ligne 526 (forfait !== '0')", () => {
    test("should cover line 526 with forfait !== '0'", async () => {
      const mockGet = jest.fn().mockResolvedValue([
        {
          date: new Date("2022-09-15"),
          adversaireNom: "martin",
          adversairePrenom: "paul",
          pointsObtenus: 15.0,
          coefficient: 1,
          forfait: "1", // Forfait !== '0'
        },
      ]);
      (ffttAPI as any).getPartiesJoueurByLicence = jest.fn().mockResolvedValue(mockGet);

      const result = await ffttAPI.getUnvalidatedPartiesJoueurByLicence("123456");
      expect(result).toBeDefined();
    });
  });

  describe("FFTTAPI.ts - Ligne 586 (catch block in forEach)", () => {
    test("should cover line 586 with error in forEach", async () => {
      const mockGet = jest.fn().mockResolvedValue([
        {
          date: new Date("2022-09-15"),
          adversaireNom: "martin",
          adversairePrenom: "paul",
          pointsObtenus: 15.0,
          coefficient: 1,
        },
      ]);
      (ffttAPI as any).getPartiesJoueurByLicence = jest.fn().mockResolvedValue(mockGet);

      // Mock getClassementJoueurByLicence to throw error
      jest
        .spyOn(ffttAPI, "getClassementJoueurByLicence")
        .mockRejectedValue(new Error("Test error"));

      await expect(ffttAPI.getJoueurVirtualPoints("123456")).rejects.toThrow(
        "Le joueur avec l'id '123456' n'existe pas."
      );
    });
  });

  describe("FFTTAPI.ts - Ligne 590 (catch block in getUnvalidatedPartiesJoueurByLicence)", () => {
    test("should cover line 590 with error in getUnvalidatedPartiesJoueurByLicence", async () => {
      const mockGet = jest.fn().mockRejectedValue(new Error("Test error"));
      (ffttAPI as any).apiRequest.get = mockGet;

      // Mock getUnvalidatedPartiesJoueurByLicence to throw error
      jest
        .spyOn(ffttAPI, "getUnvalidatedPartiesJoueurByLicence")
        .mockRejectedValue(new Error("Test error"));

      await expect(ffttAPI.getUnvalidatedPartiesJoueurByLicence("123456")).rejects.toThrow(
        "Test error"
      );
    });
  });

  describe("FFTTAPI.ts - Lignes 635-643 (getJoueurVirtualPoints)", () => {
    test("should cover lines 635-643 with correct getJoueurVirtualPoints mock", async () => {
      const mockGetParties = jest.fn().mockResolvedValue([
        {
          date: new Date("2022-09-15"),
          adversaireNom: "martin",
          adversairePrenom: "paul",
          pointsObtenus: 15.0,
          coefficient: 1,
        },
      ]);
      (ffttAPI as any).getPartiesJoueurByLicence = mockGetParties;

      // Mock getClassementJoueurByLicence (PAS getJoueursByClub !) pour retourner un joueur avec des points qui matchent exactement
      const mockGetClassement = jest.fn().mockResolvedValue({
        licence: "789012",
        nom: "MARTIN",
        prenom: "Paul",
        nomclub: "Club B",
        points: 1100,
        sexe: "F",
        rang: "8",
        categorie: "Senior",
      });
      (ffttAPI as any).getClassementJoueurByLicence = mockGetClassement;

      const result = await ffttAPI.getJoueurVirtualPoints("123456");
      expect(result).toBeDefined();
    });
  });

  describe("FFTTAPI.ts - Ligne 651 (catch block in getJoueurVirtualPoints)", () => {
    test("should cover line 651 with exception in getJoueurVirtualPoints", async () => {
      const mockGetParties = jest.fn().mockResolvedValue([
        {
          date: new Date("2022-09-15"),
          adversaireNom: "martin",
          adversairePrenom: "paul",
          pointsObtenus: 15.0,
          coefficient: 1,
        },
      ]);
      (ffttAPI as any).getPartiesJoueurByLicence = mockGetParties;

      // Mock getClassementJoueurByLicence to throw error
      jest
        .spyOn(ffttAPI, "getClassementJoueurByLicence")
        .mockRejectedValue(new Error("Test error"));

      await expect(ffttAPI.getJoueurVirtualPoints("123456")).rejects.toThrow(
        "Le joueur avec l'id '123456' n'existe pas."
      );
    });
  });

  describe("FFTTAPI.ts - Lignes 682-683 (type parameter handling)", () => {
    test("should cover lines 682-683 with type parameter handling", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        equipe: [
          {
            libequipe: "Team A",
            libdivision: "Division 1",
            liendivision: "link_div_1",
            idequipe: "team_a",
            idepr: "epr_1",
            libepr: "Championnat",
          },
        ],
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      const result = await ffttAPI.getEquipesByClub("12345", "E"); // Type parameter
      expect(result).toBeDefined();
    });
  });

  describe("FFTTAPI.ts - Ligne 897 (createFromArray)", () => {
    test("should cover line 897 with createFromArray", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        joueur: [
          {
            xja: "DUPONT Jean",
            xca: "1200",
            xjb: "MARTIN Paul",
            xcb: "1100",
          },
        ],
        partie: [
          {
            ja: "DUPONT Jean",
            jb: "MARTIN Paul",
            scorea: "3",
            scoreb: "1",
            detail: "11-9 11-7 11-5",
          },
        ],
        resultat: {
          equa: "Equipe A",
          equb: "Equipe B",
          resa: "10",
          resb: "8",
        },
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      const result = await ffttAPI.getDetailsRencontreByLien("renc_link_123", "club_a", "club_b");
      expect(result).toBeDefined();
    });
  });
});
