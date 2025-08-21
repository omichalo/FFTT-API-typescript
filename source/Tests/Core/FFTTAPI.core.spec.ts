// Tests Core - Fonctionnalités principales de FFTTAPI
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

describe("FFTTAPI Core - Fonctionnalités principales", () => {
  let ffttAPI: FFTTAPI;

  beforeEach(() => {
    jest.clearAllMocks();
    ffttAPI = new FFTTAPI("test_id", "test_password");
  });

  describe("Initialisation", () => {
    test("should initialize successfully", async () => {
      const mockSend = jest.fn().mockResolvedValue({
        statut: "ok",
        message: "Initialisation réussie",
      });
      (ffttAPI as any).apiRequest.send = mockSend;

      const result = await ffttAPI.initialize();
      expect(result).toBeDefined();
      expect(mockSend).toHaveBeenCalledWith(expect.stringContaining("xml_initialisation.php"));
    });

    test("should handle 401 error during initialization", async () => {
      const mockSend = jest.fn().mockRejectedValue({
        response: { status: 401 },
      });
      (ffttAPI as any).apiRequest.send = mockSend;

      await expect(ffttAPI.initialize()).rejects.toThrow();
    });
  });

  describe("Gestion des clubs", () => {
    test("should get club details successfully", async () => {
      const mockSend = jest.fn().mockResolvedValue({
        club: {
          idclub: "12345",
          nom: "Club Test",
          numero: "12345",
          nomSalle: "Gymnase Test",
          adresseSalle: "123 Rue Test",
          codePostal: "75000",
          villeSalle: "Paris",
          web: "http://test.com",
          latitude: 48.8566,
          longitude: 2.3522,
          telephone: "0123456789",
          email: "test@club.com",
        },
      });
      (ffttAPI as any).apiRequest.send = mockSend;

      const club = await ffttAPI.getClubDetails("12345");
      expect(club).toBeInstanceOf(require("../../Model/ClubDetails").ClubDetails);
      expect(club.idClub).toBe(12345);
    });

    test("should get organism details successfully", async () => {
      const mockSend = jest.fn().mockResolvedValue({
        organisme: [
          {
            libelle: "Organisme Test",
            id: "123",
            code: "ORG",
            idPere: "0",
          },
        ],
      });
      (ffttAPI as any).apiRequest.send = mockSend;

      const organismes = await ffttAPI.getOrganismes("L");
      expect(organismes).toBeInstanceOf(Array);
      expect(organismes).toHaveLength(1);
      expect(organismes[0].libelle).toBe("Organisme Test");
      expect(organismes[0].id).toBe(123);
    });
  });

  describe("Gestion des joueurs", () => {
    test("should get player details by licence", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        licence: "123456",
        nom: "DUPONT",
        prenom: "Jean",
        nomclub: "Club Test",
        points: "1200",
        pointsLicence: 1200,
        sexe: "H",
        echelon: "N",
        place: "5",
        pointsMensuels: 15.0,
        pointsGagnes: 15.0,
        pointsPerdus: 0.0,
        pointsConsecutifs: 15.0,
        pointsChampionnat: 15.0,
        ancienClassement: "1185",
        anciennePlace: "8",
        mutation: "0",
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      const joueur = await ffttAPI.getJoueurDetailsByLicence("123456");
      expect(joueur).toBeInstanceOf(
        require("../../Model/JoueurClassementDetails").JoueurClassementDetails
      );
      expect(joueur.licence).toBe("123456");
    });

    test("should get players by name", async () => {
      const mockSend = jest.fn().mockResolvedValue({
        joueur: [
          {
            licence: "123456",
            nom: "DUPONT",
            prenom: "Jean",
            nomclub: "Club Test",
            points: "1200",
            sexe: "H",
          },
        ],
      });
      (ffttAPI as any).apiRequest.send = mockSend;

      const joueurs = await ffttAPI.getJoueursByNom("DUPONT", "Jean");
      expect(joueurs).toHaveLength(1);
      expect(joueurs[0].nom).toBe("DUPONT");
    });
  });

  describe("Gestion des rencontres", () => {
    test("should get encounter details by link", async () => {
      const mockGet = jest.fn().mockResolvedValue({
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
      });
      (ffttAPI as any).apiRequest.get = mockGet;

      // Mock pour getJoueursByClub
      const mockGetJoueursByClub = jest.fn().mockResolvedValue([]);
      (ffttAPI as any).getJoueursByClub = mockGetJoueursByClub;

      const rencontre = await ffttAPI.getDetailsRencontreByLien(
        "renc_link_valid",
        "club_a",
        "club_b"
      );
      expect(rencontre).toBeInstanceOf(
        require("../../Model/Rencontre/RencontreDetails").RencontreDetails
      );
      expect(rencontre.nomEquipeA).toBe("Equipe A");
    });
  });
});
