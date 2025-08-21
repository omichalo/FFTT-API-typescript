// Tests Models - Tous les modèles de l'application
describe("Models - Tests de tous les modèles", () => {
  describe("Joueur", () => {
    test("should create Joueur correctly", () => {
      const { Joueur } = require("../../Model/Joueur");

      const joueur = new Joueur(
        "123456",
        "club_123",
        "Club Test",
        "DUPONT",
        "Jean",
        1200,
        true,
        "1200",
        5,
        "N"
      );
      expect(joueur.licence).toBe("123456");
      expect(joueur.nom).toBe("DUPONT");
      expect(joueur.prenom).toBe("Jean");
      expect(joueur.club).toBe("Club Test");
      expect(joueur.points).toBe(1200);
      expect(joueur.isHomme).toBe(true);
    });
  });

  describe("Club", () => {
    test("should create Club correctly", () => {
      const { Club } = require("../../Model/Club");

      const club = new Club("12345", "club", "12345", "Club Test", null);
      expect(club.idClub).toBe("12345");
      expect(club.nom).toBe("Club Test");
      expect(club.numero).toBe("12345");
    });
  });

  describe("ClubDetails", () => {
    test("should create ClubDetails correctly", () => {
      const { ClubDetails } = require("../../Model/ClubDetails");

      const club = new ClubDetails(
        12345,
        "12345",
        "Club Test",
        "Gymnase Test",
        "123 Rue Test",
        null,
        null,
        "75000",
        "Paris",
        "http://test.com",
        "Jean",
        "DUPONT",
        "test@club.com",
        "0123456789",
        48.8566,
        2.3522
      );
      expect(club.idClub).toBe(12345);
      expect(club.nom).toBe("Club Test");
      expect(club.nomSalle).toBe("Gymnase Test");
      expect(club.siteWeb).toBe("http://test.com");
    });
  });

  describe("Rencontre", () => {
    test("should create Rencontre correctly", () => {
      const { Rencontre } = require("../../Model/Rencontre/Rencontre");

      const rencontre = new Rencontre(
        "Rencontre Test",
        "Equipe A",
        "Equipe B",
        10,
        8,
        "link_123",
        new Date("2022-09-15"),
        new Date("2022-09-15")
      );
      expect(rencontre.libelle).toBe("Rencontre Test");
      expect(rencontre.nomEquipeA).toBe("Equipe A");
      expect(rencontre.nomEquipeB).toBe("Equipe B");
      expect(rencontre.scoreEquipeA).toBe(10);
      expect(rencontre.scoreEquipeB).toBe(8);
    });
  });

  describe("JoueurRencontre", () => {
    test("should create JoueurRencontre correctly", () => {
      const { JoueurRencontre } = require("../../Model/Rencontre/JoueurRencontre");

      const joueur = new JoueurRencontre("DUPONT", "Jean", "123456", 1200, "H");
      expect(joueur.nom).toBe("DUPONT");
      expect(joueur.prenom).toBe("Jean");
      expect(joueur.sexe).toBe("H");
      expect(joueur.points).toBe(1200);
      expect(joueur.licence).toBe("123456");
    });
  });

  describe("PartieRencontre", () => {
    test("should create PartieRencontre correctly", () => {
      const { PartieRencontre } = require("../../Model/Rencontre/PartieRencontre");

      const partie = new PartieRencontre("DUPONT Jean", "MARTIN Paul", 3, 1, []);
      expect(partie.adversaireA).toBe("DUPONT Jean");
      expect(partie.adversaireB).toBe("MARTIN Paul");
      expect(partie.scoreA).toBe(3);
      expect(partie.scoreB).toBe(1);
      expect(partie.setDetails).toEqual([]);
    });
  });

  describe("RencontreDetails", () => {
    test("should create RencontreDetails correctly", () => {
      const { RencontreDetails } = require("../../Model/Rencontre/RencontreDetails");

      const rencontre = new RencontreDetails("Equipe A", "Equipe B", 10, 8, {}, {}, []);
      expect(rencontre.nomEquipeA).toBe("Equipe A");
      expect(rencontre.nomEquipeB).toBe("Equipe B");
      expect(rencontre.scoreEquipeA).toBe(10);
      expect(rencontre.scoreEquipeB).toBe(8);
    });
  });

  describe("Partie", () => {
    test("should create Partie correctly", () => {
      const { Partie } = require("../../Model/Partie");

      const partie = new Partie(
        true,
        1,
        new Date("2022-09-15"),
        15.0,
        1,
        "789012",
        true,
        "martin",
        "paul",
        1100,
        "123456",
        12345,
        "CFN"
      );
      expect(partie.date).toEqual(new Date("2022-09-15"));
      expect(partie.adversaireNom).toBe("martin");
      expect(partie.adversairePrenom).toBe("paul");
      expect(partie.pointsObtenus).toBe(15.0);
      expect(partie.coefficient).toBe(1);
    });
  });

  describe("UnvalidatedPartie", () => {
    test("should create UnvalidatedPartie correctly", () => {
      const { UnvalidatedPartie } = require("../../Model/UnvalidatedPartie");

      const partie = new UnvalidatedPartie(
        "CFN",
        "12345",
        1,
        true,
        false,
        new Date("2022-09-15"),
        "DUPONT",
        "Jean",
        1200
      );
      expect(partie.epreuve).toBe("CFN");
      expect(partie.idPartie).toBe("12345");
      expect(partie.coefficientChampionnat).toBe(1);
      expect(partie.isVictoire).toBe(true);
      expect(partie.adversaireNom).toBe("DUPONT");
      expect(partie.adversairePrenom).toBe("Jean");
      expect(partie.adversaireClassement).toBe(1200);
    });
  });

  describe("VirtualPoints", () => {
    test("should create VirtualPoints correctly", () => {
      const { VirtualPoints } = require("../../Model/VirtualPoints");

      const points = new VirtualPoints(15.0, 1200, 25.0);
      expect(points.monthlyPointsWon).toBe(15.0);
      expect(points.virtualPoints).toBe(1200);
      expect(points.seasonlyPointsWon).toBe(25.0);
    });
  });

  describe("Classement", () => {
    test("should create Classement correctly", () => {
      const { Classement } = require("../../Model/Classement");

      const classement = new Classement(
        1200,
        1185,
        "1200",
        5,
        3,
        2,
        1200,
        1185,
        "123456",
        "DUPONT",
        "Jean",
        "Club Test",
        "12345",
        "F",
        5,
        8,
        "Senior",
        "1200"
      );
      expect(classement.licence).toBe("123456");
      expect(classement.nom).toBe("DUPONT");
      expect(classement.prenom).toBe("Jean");
      expect(classement.nomClub).toBe("Club Test");
      expect(classement.points).toBe(1200);
      expect(classement.categorie).toBe("Senior");
      expect(classement.rangNational).toBe(5);
    });
  });

  describe("Equipe", () => {
    test("should create Equipe correctly", () => {
      const { Equipe } = require("../../Model/Equipe");

      const equipe = new Equipe(
        "Team A",
        "Division 1",
        "link_div_1",
        "team_a",
        "epr_1",
        "Championnat"
      );
      expect(equipe.libelle).toBe("Team A");
      expect(equipe.division).toBe("Division 1");
      expect(equipe.lienDivision).toBe("link_div_1");
      expect(equipe.idEquipe).toBe("team_a");
      expect(equipe.idEpreuve).toBe("epr_1");
      expect(equipe.libelleEpreuve).toBe("Championnat");
    });
  });

  describe("Organisme", () => {
    test("should create Organisme correctly", () => {
      const { Organisme } = require("../../Model/Organisme");

      const organisme = new Organisme("Organisme Test", "123", "ORG", "0");
      expect(organisme.libelle).toBe("Organisme Test");
      expect(organisme.id).toBe(123);
      expect(organisme.code).toBe("ORG");
    });
  });

  describe("Actualite", () => {
    test("should create Actualite correctly", () => {
      const { Actualite } = require("../../Model/Actualite");

      const actualite = new Actualite(
        "2022-09-15",
        "Titre de l'actualité",
        "Contenu de l'actualité",
        "http://test.com",
        "photo.jpg",
        "Sport"
      );
      expect(actualite.titre).toBe("Titre de l'actualité");
      expect(actualite.description).toBe("Contenu de l'actualité");
      expect(actualite.date).toEqual(new Date("2022-09-15"));
      expect(actualite.categorie).toBe("Sport");
    });
  });

  describe("Historique", () => {
    test("should create Historique correctly", () => {
      const { Historique } = require("../../Model/Historique");

      const historique = new Historique(2022, 2023, 1, 1200, "N", 5);
      expect(historique.anneeDebut).toBe(2022);
      expect(historique.anneeFin).toBe(2023);
      expect(historique.points).toBe(1200);
      expect(historique.echelon).toBe("N");
      expect(historique.place).toBe(5);
    });
  });
});
