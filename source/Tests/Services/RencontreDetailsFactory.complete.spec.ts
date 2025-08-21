// Tests RencontreDetailsFactory Complet - Migration de tous les tests manquants
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

describe("RencontreDetailsFactory Complet - Tests détaillés manquants", () => {
  let ffttAPI: FFTTAPI;
  let factory: any;

  beforeEach(() => {
    jest.clearAllMocks();
    ffttAPI = new FFTTAPI("test_id", "test_password");
    const { RencontreDetailsFactory } = require("../../Service/RencontreDetailsFactory.service");
    factory = new RencontreDetailsFactory(ffttAPI);
  });

  describe("getParties - Tests détaillés", () => {
    test("getParties should return empty parties", () => {
      const result = factory.getParties([]);
      expect(result).toEqual([]);
    });

    test("getParties should return formatted parties", () => {
      const partiesData = [
        {
          ja: "DUPONT Jean",
          jb: "MARTIN Paul",
          scorea: "3",
          scoreb: "1",
          detail: "11-9 11-7 11-5",
        },
      ];
      const result = factory.getParties(partiesData);
      expect(result).toHaveLength(1);
      expect(result[0].adversaireA).toBe("DUPONT Jean");
      expect(result[0].adversaireB).toBe("MARTIN Paul");
      expect(result[0].scoreA).toBe(3);
      expect(result[0].scoreB).toBe(1);
      expect(result[0].setDetails).toEqual(["11-9", "11-7", "11-5"]);
    });

    test("getParties should return formatted parties without names and scores", () => {
      const partiesData = [
        {
          ja: "Absent",
          jb: "Absent",
          scorea: "",
          scoreb: "",
          detail: "11-9 11-7 11-5",
        },
      ];
      const result = factory.getParties(partiesData);
      expect(result).toHaveLength(1);
      expect(result[0].adversaireA).toBe("Absent");
      expect(result[0].adversaireB).toBe("Absent");
      expect(result[0].scoreA).toBe(0);
      expect(result[0].scoreB).toBe(0);
      expect(result[0].setDetails).toEqual(["11-9", "11-7", "11-5"]);
    });
  });

  describe("formatJoueur - Tests détaillés", () => {
    test("formatJoueur should return formatted pJoueurRencontre", async () => {
      const mockGetJoueursByClub = jest.fn().mockResolvedValue([
        {
          licence: "123456",
          nom: "DUPONT",
          prenom: "Jean",
          club: "Club A",
          points: 1200,
          isHomme: true,
        },
      ]);
      (ffttAPI as any).getJoueursByClub = mockGetJoueursByClub;

      const result = factory.formatJoueur("Jean", "DUPONT", "H 1200pts", [
        {
          licence: "123456",
          nom: "DUPONT",
          prenom: "Jean",
          club: "Club A",
          points: 1200,
          isHomme: true,
        },
      ]);
      expect(result).toBeDefined();
      expect(result.nom).toBe("DUPONT");
      expect(result.prenom).toBe("Jean");
      expect(result.sexe).toBe("H");
      expect(result.points).toBe(1200);
    });

    test("formatJoueur should return formatted JoueurRencontre (joueur numéroté)", async () => {
      const mockGetJoueursByClub = jest.fn().mockResolvedValue([
        {
          licence: "123456",
          nom: "DUPONT",
          prenom: "Jean",
          club: "Club A",
          points: 1200,
          isHomme: true,
        },
      ]);
      (ffttAPI as any).getJoueursByClub = mockGetJoueursByClub;

      const result = factory.formatJoueur("Jean", "DUPONT", "H 1200pts", [
        {
          licence: "123456",
          nom: "DUPONT",
          prenom: "Jean",
          club: "Club A",
          points: 1200,
          isHomme: true,
        },
      ]);
      expect(result).toBeDefined();
      expect(result.nom).toBe("DUPONT");
      expect(result.prenom).toBe("Jean");
      expect(result.sexe).toBe("H");
      expect(result.points).toBe(1200);
    });

    test("formatJoueur should throw PointsEtSexeIntrouvableException (sexeEtPoints mal formatté)", async () => {
      expect(() => {
        factory.formatJoueur("Jean", "DUPONT", "invalid_format", [
          {
            licence: "123456",
            nom: "DUPONT",
            prenom: "Jean",
            club: "Club A",
            points: 1200,
            isHomme: true,
          },
        ]);
      }).toThrow("Impossible d'extraire le sexe et les points dans 'invalid_format'");
    });

    test("formatJoueur should return empty JoueurRencontre (joueur non trouvé dans la liste)", async () => {
      const mockGetJoueursByClub = jest.fn().mockResolvedValue([]);
      (ffttAPI as any).getJoueursByClub = mockGetJoueursByClub;

      const result = factory.formatJoueur("Jean", "DUPONT", "H 1200pts", []);
      expect(result).toBeDefined();
      expect(result.nom).toBe("DUPONT");
      expect(result.prenom).toBe("Jean");
      expect(result.sexe).toBe(null);
      expect(result.points).toBe(null);
    });

    test("formatJoueur should return empty JoueurRencontre (joueur Absent)", async () => {
      const mockGetJoueursByClub = jest.fn().mockResolvedValue([]);
      (ffttAPI as any).getJoueursByClub = mockGetJoueursByClub;

      const result = factory.formatJoueur("Absent", "DUPONT", "H 1200pts", []);
      expect(result).toBeDefined();
      expect(result.nom).toBe("DUPONT");
      expect(result.prenom).toBe("Absent");
      expect(result.sexe).toBe(null);
      expect(result.points).toBe(null);
    });
  });

  describe("formatJoueurs - Tests détaillés", () => {
    test("formatJoueurs should return formatted joueurs", async () => {
      const mockGetJoueursByClub = jest.fn().mockResolvedValue([
        {
          licence: "123456",
          nom: "DUPONT",
          prenom: "Jean",
          club: "Club A",
          points: 1200,
          isHomme: true,
        },
      ]);
      (ffttAPI as any).getJoueursByClub = mockGetJoueursByClub;

      const joueursData = [["Jean DUPONT", "H 1200pts"]];
      const result = await factory.formatJoueurs(joueursData, "club_a");
      expect(result).toBeDefined();
      expect(result["Jean DUPONT"]).toBeDefined();
    });
  });

  describe("getScores - Tests détaillés", () => {
    test("getScores should return scores of all parties", () => {
      const parties = [
        {
          adversaireA: "DUPONT Jean",
          adversaireB: "MARTIN Paul",
          scoreA: 3,
          scoreB: 1,
          setDetails: ["11-9", "11-7", "11-5"],
        },
        {
          adversaireA: "DUPONT Jean",
          adversaireB: "MARTIN Paul",
          scoreA: 3,
          scoreB: 2,
          setDetails: ["11-9", "11-7", "9-11", "11-8", "11-6"],
        },
      ];
      const result = factory.getScores(parties);
      expect(result.scoreA).toBe(6);
      expect(result.scoreB).toBe(3);
    });
  });

  describe("getExpectedPoints - Tests détaillés", () => {
    test("getExpectedPoints should return expected points", () => {
      const parties = [
        {
          adversaireA: "DUPONT Jean",
          adversaireB: "MARTIN Paul",
          scoreA: 3,
          scoreB: 1,
          setDetails: ["11-9", "11-7", "11-5"],
        },
      ];
      const joueursA = {
        "DUPONT Jean": {
          nom: "DUPONT",
          prenom: "Jean",
          licence: "123456",
          points: 1200,
          sexe: "H",
        },
      };
      const joueursB = {
        "MARTIN Paul": {
          nom: "MARTIN",
          prenom: "Paul",
          licence: "789012",
          points: 1100,
          sexe: "F",
        },
      };

      const result = factory.getExpectedPoints(parties, joueursA, joueursB);
      expect(result.expectedA).toBeGreaterThanOrEqual(0);
      expect(result.expectedB).toBeGreaterThanOrEqual(0);
    });

    test("getExpectedPoints should return expected points (empty data)", async () => {
      const parties: any[] = [];
      const joueursA: any = {};
      const joueursB: any = {};

      const result = factory.getExpectedPoints(parties, joueursA, joueursB);
      expect(result.expectedA).toBe(0);
      expect(result.expectedB).toBe(0);
    });
  });
});
