// Tests d'intégration - Tests de bout en bout
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

describe("Integration - Tests de bout en bout", () => {
  let ffttAPI: FFTTAPI;

  beforeEach(() => {
    jest.clearAllMocks();
    ffttAPI = new FFTTAPI("test_id", "test_password");
  });

  describe("Scénario complet de gestion d'une rencontre", () => {
    test("should handle complete encounter workflow", async () => {
      // 1. Initialisation
      const mockSend = jest.fn().mockResolvedValue({
        statut: "ok",
        message: "Initialisation réussie",
      });
      (ffttAPI as any).apiRequest.send = mockSend;

      const initResult = await ffttAPI.initialize();
      expect(initResult).toBeDefined();

      // 2. Récupération des détails de la rencontre
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

      const rencontre = await ffttAPI.getDetailsRencontreByLien(
        "renc_link_123",
        "club_a",
        "club_b"
      );
      expect(rencontre).toBeInstanceOf(
        require("../../Model/Rencontre/RencontreDetails").RencontreDetails
      );

      // 3. Récupération des joueurs
      const mockGetJoueurs = jest.fn().mockResolvedValue({
        joueur: [
          {
            licence: "123456",
            nom: "DUPONT",
            prenom: "Jean",
            club: "Club A",
            nclub: "12345",
            sexe: "M",
            echelon: "N",
            points: "1200",
            clast: "1200",
            place: "5",
          },
          {
            licence: "789012",
            nom: "MARTIN",
            prenom: "Paul",
            club: "Club B",
            nclub: "67890",
            sexe: "F",
            echelon: "N",
            points: "1100",
            clast: "1100",
            place: "8",
          },
        ],
      });
      (ffttAPI as any).apiRequest.get = mockGetJoueurs;

      const joueurs = await ffttAPI.getJoueursByNom("DUPONT", "Jean");
      expect(joueurs).toHaveLength(2);
      expect(joueurs[0].nom).toBe("DUPONT");
      expect(joueurs[1].nom).toBe("MARTIN");
    });
  });

  describe("Scénario complet de gestion d'un club", () => {
    test("should handle complete club workflow", async () => {
      // 1. Récupération des détails du club
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

      // 2. Récupération des équipes du club
      const mockGetEquipes = jest.fn().mockResolvedValue({
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
      (ffttAPI as any).apiRequest.get = mockGetEquipes;

      const equipes = await ffttAPI.getEquipesByClub("12345");
      expect(equipes).toHaveLength(1);
      expect(equipes[0].libelle).toBe("Team A");
    });
  });

  describe("Scénario complet de gestion des classements", () => {
    test("should handle complete ranking workflow", async () => {
      // 1. Récupération du classement d'un joueur
      const mockSend = jest.fn().mockResolvedValue({
        joueur: {
          licence: "123456",
          nom: "DUPONT",
          prenom: "Jean",
          club: "Club A",
          point: "1200",
          apoint: "1185",
          clast: "1200",
          clnat: "5",
          rangreg: "3",
          rangdep: "2",
          valcla: "1200",
          valinit: "1185",
          nclub: "12345",
          natio: "F",
          clglob: "5",
          aclglob: "8",
          categ: "Senior",
          clpro: "1200",
        },
      });
      (ffttAPI as any).apiRequest.send = mockSend;

      const classement = await ffttAPI.getClassementJoueurByLicence("123456");
      expect(classement).toBeInstanceOf(require("../../Model/Classement").Classement);

      // 2. Récupération des points virtuels
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

      const virtualPoints = await ffttAPI.getJoueurVirtualPoints("123456");
      expect(virtualPoints).toBeInstanceOf(require("../../Model/VirtualPoints").VirtualPoints);
    });
  });

  describe("Gestion des erreurs en intégration", () => {
    test("should handle API errors gracefully", async () => {
      // Mock d'une erreur API
      const mockSend = jest.fn().mockRejectedValue({
        response: { status: 500, data: "Erreur serveur" },
      });
      (ffttAPI as any).apiRequest.send = mockSend;

      await expect(ffttAPI.getClubDetails("invalid_id")).rejects.toThrow();
    });

    test("should handle network errors gracefully", async () => {
      // Mock d'une erreur réseau
      const mockSend = jest.fn().mockRejectedValue({
        code: "NETWORK_ERROR",
        message: "Erreur de connexion",
      });
      (ffttAPI as any).apiRequest.send = mockSend;

      await expect(ffttAPI.getClubDetails("invalid_id")).rejects.toThrow();
    });
  });
});
