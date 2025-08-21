// Tests Exceptions - Toutes les exceptions de l'application
describe("Exceptions - Tests de toutes les exceptions", () => {
  describe("NoFFTTResponseException", () => {
    test("should create exception with correct message", () => {
      const { NoFFTTResponseException } = require("../../Exception/NoFFTTResponseException");

      const exception = new NoFFTTResponseException("test_request");
      expect(exception.message).toContain(
        "L'appel à l'adresse 'test_request' n'a retourné aucune réponse"
      );
      expect(exception).toBeInstanceOf(NoFFTTResponseException);
    });
  });

  describe("InvalidURIParametersException", () => {
    test("should create exception with correct message", () => {
      const {
        InvalidURIParametersException,
      } = require("../../Exception/InvalidURIParametersException");

      const exception = new InvalidURIParametersException("test_request", { param: "value" });
      expect(exception.message).toContain(
        "L'appel à l'adresse 'test_request' n'a pas eu tous les arguments nécessaires"
      );
      expect(exception).toBeInstanceOf(InvalidURIParametersException);
    });
  });

  describe("JoueurNotFound", () => {
    test("should create exception with correct message", () => {
      const { JoueurNotFound } = require("../../Exception/JoueurNotFound");

      const exception = new JoueurNotFound("123456");
      expect(exception.message).toContain("Le joueur avec l'id '123456' n'existe pas");
      expect(exception).toBeInstanceOf(JoueurNotFound);
    });
  });

  describe("PointsEtSexeIntrouvableException", () => {
    test("should create exception with correct message", () => {
      const {
        PointsEtSexeIntrouvableException,
      } = require("../../Exception/PointsEtSexeIntrouvableException");

      const exception = new PointsEtSexeIntrouvableException("H 1200");
      expect(exception.message).toContain(
        "Impossible d'extraire le sexe et les points dans 'H 1200'"
      );
      expect(exception).toBeInstanceOf(PointsEtSexeIntrouvableException);
    });
  });

  describe("UnauthorizedCredentials", () => {
    test("should create exception with correct message", () => {
      const { UnauthorizedCredentials } = require("../../Exception/UnauthorizedCredentials");

      const exception = new UnauthorizedCredentials();
      expect(exception.message).toContain("Non autorisé pour l'URL");
      expect(exception).toBeInstanceOf(UnauthorizedCredentials);
    });
  });

  describe("URIPartNotValidException", () => {
    test("should create exception with correct message", () => {
      const { URIPartNotValidException } = require("../../Exception/URIPartNotValidException");

      const exception = new URIPartNotValidException("test_request");
      expect(exception.message).toContain(
        "La FFTT ne donne pas d'informations pour l'argument 'test_request'"
      );
      expect(exception).toBeInstanceOf(URIPartNotValidException);
    });
  });

  describe("InvalidLienRencontre", () => {
    test("should create exception with correct message", () => {
      const { InvalidLienRencontre } = require("../../Exception/InvalidLienRencontre");

      const exception = new InvalidLienRencontre("invalid_link");
      expect(exception.message).toContain(
        "Le lien 'invalid_link' pour les details de la rencontre n'est pas correct"
      );
      expect(exception).toBeInstanceOf(InvalidLienRencontre);
    });
  });

  describe("ClubNotFoundException", () => {
    test("should create exception with correct message", () => {
      const { ClubNotFoundException } = require("../../Exception/ClubNotFoundException");

      const exception = new ClubNotFoundException("12345");
      expect(exception.message).toContain("Le club '12345' n'existe pas");
      expect(exception).toBeInstanceOf(ClubNotFoundException);
    });
  });

  describe("InvalidCredidentials", () => {
    test("should create exception with correct message", () => {
      const { InvalidCredidentials } = require("../../Exception/InvalidCredidentials");

      const exception = new InvalidCredidentials();
      expect(exception.message).toContain("Identifiant ou mot de passe incorrect");
      expect(exception).toBeInstanceOf(InvalidCredidentials);
    });
  });
});
