// Tests Services - Tous les services de l'application
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

describe("Services - Tests de tous les services", () => {
  let ffttAPI: FFTTAPI;

  beforeEach(() => {
    jest.clearAllMocks();
    ffttAPI = new FFTTAPI("test_id", "test_password");
  });

  describe("RencontreDetailsFactory.service.ts", () => {
    test("should create from array successfully", () => {
      const { RencontreDetailsFactory } = require("../../Service/RencontreDetailsFactory.service");

      const mockAPI = {
        getJoueursByClub: jest.fn().mockResolvedValue([]),
      };

      const factory = new RencontreDetailsFactory(mockAPI);

      const testData = {
        joueur: [
          {
            xja: "DUPONT Jean",
            xca: "club_a",
            xjb: "MARTIN Paul",
            xcb: "club_b",
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
      };

      const result = factory.createFromArray(testData, "club_a", "club_b");
      expect(result).toBeDefined();
      expect(typeof result).toBe("object");
    });

    test("should format player correctly", () => {
      const { RencontreDetailsFactory } = require("../../Service/RencontreDetailsFactory.service");

      const mockAPI = {
        getJoueursByClub: jest.fn().mockResolvedValue([]),
      };

      const factory = new RencontreDetailsFactory(mockAPI);

      const result = factory.formatJoueur("Jean", "DUPONT", "H 1200pts", []);
      expect(result).toBeDefined();
      expect(result.nom).toBe("DUPONT");
      expect(result.prenom).toBe("Jean");
    });

    test("should calculate expected points correctly", () => {
      const { RencontreDetailsFactory } = require("../../Service/RencontreDetailsFactory.service");
      const { PartieRencontre } = require("../../Model/Rencontre/PartieRencontre");
      const { JoueurRencontre } = require("../../Model/Rencontre/JoueurRencontre");

      const mockAPI = {
        getJoueursByClub: jest.fn(),
      };

      const factory = new RencontreDetailsFactory(mockAPI);

      const joueursA = {
        "DUPONT Jean": new JoueurRencontre("DUPONT", "Jean", "H", 1200, "club_a"),
      };
      const joueursB = {
        "MARTIN Paul": new JoueurRencontre("MARTIN", "Paul", "F", 1100, "club_b"),
      };
      const parties = [new PartieRencontre("DUPONT Jean", "MARTIN Paul", 3, 1, [])];

      const result = factory.getExpectedPoints(parties, joueursA, joueursB);
      expect(result).toBeDefined();
      expect(result.expectedA).toBeGreaterThanOrEqual(0);
      expect(result.expectedB).toBeGreaterThanOrEqual(0);
    });
  });

  describe("PointCalculator.service.ts", () => {
    test("should calculate points for victory correctly", () => {
      const { PointCalculator } = require("../../Service/PointCalculator.service");

      const result = PointCalculator.getPointVictory(1200, 1100);
      expect(result).toBeGreaterThan(0);
    });

    test("should calculate points for defeat correctly", () => {
      const { PointCalculator } = require("../../Service/PointCalculator.service");

      const result = PointCalculator.getPointDefeat(1200, 1100);
      expect(result).toBeLessThan(0);
    });

    test("should handle equal player points", () => {
      const { PointCalculator } = require("../../Service/PointCalculator.service");

      const result = PointCalculator.getPointVictory(1200, 1200);
      expect(result).toBeDefined();
    });
  });

  describe("ClubFactory.service.ts", () => {
    test("should create clubs from array correctly", () => {
      const { ClubFactory } = require("../../Service/ClubFactory.service");

      const clubsData = [
        {
          idclub: "12345",
          typeclub: "club",
          numero: "12345",
          nom: "Club Test",
          validation: "2022-09-15",
        },
      ];

      const clubs = ClubFactory.createClubFromArray(clubsData);
      expect(clubs).toBeInstanceOf(Array);
      expect(clubs).toHaveLength(1);
      expect(clubs[0]).toBeInstanceOf(require("../../Model/Club").Club);
      expect(clubs[0].idClub).toBe("12345");
      expect(clubs[0].nom).toBe("Club Test");
    });

    test("should handle validation field correctly", () => {
      const { ClubFactory } = require("../../Service/ClubFactory.service");

      const clubsData = [
        {
          idclub: "12345",
          typeclub: "club",
          numero: "12345",
          nom: "Club Test",
          validation: null,
        },
      ];

      const clubs = ClubFactory.createClubFromArray(clubsData);
      expect(clubs).toBeInstanceOf(Array);
      expect(clubs).toHaveLength(1);
      expect(clubs[0]).toBeInstanceOf(require("../../Model/Club").Club);
    });
  });

  describe("Utils.service.ts", () => {
    test("should format points correctly", () => {
      const { Utils } = require("../../Service/Utils.service");

      const result = Utils.formatPoints("1200");
      expect(result).toBe(1200);
    });

    test("should return date or null correctly", () => {
      const { Utils } = require("../../Service/Utils.service");

      const validDate = Utils.returnDateOrNull("2022-09-15");
      expect(validDate).toBeInstanceOf(Date);

      const invalidDate = Utils.returnDateOrNull("invalid_date");
      expect(invalidDate).toBeDefined();
    });

    test("should return nom and prenom correctly", () => {
      const { Utils } = require("../../Service/Utils.service");

      const [nom, prenom] = Utils.returnNomPrenom("DUPONT Jean");
      expect(nom).toBe("DUPONT");
      expect(prenom).toBe("Jean");
    });
  });
});
