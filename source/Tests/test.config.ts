// Configuration des tests avec des données mockées
export const testConfig = {
  // Identifiants de test
  testId: "test_id",
  testPassword: "test_password",

  // Données XML mockées pour les tests
  mockXmlData: {
    listeVide: '<?xml version="1.0" encoding="ISO-8859-1"?><liste/>',

    // Données pour les actualités
    actualiteSimple: `<?xml version="1.0" encoding="ISO-8859-1"?>
      <liste>
        <news>
          <date>2022-08-25</date>
          <titre>Ping Santé-vous sport !</titre>
          <description>En partenariat avec l'opération " Sentez-vous Sport " du CNOSF, la FFTT lance son Ping Santé-vous Sport.</description>
          <url>https://www.fftt.com/site/actualites/2022-08-25/ping-sante-vous-sport</url>
          <photo>https://www.fftt.com/site/medias/news/news__20220825134426.jpg</photo>
          <categorie>Ping santé</categorie>
        </news>
      </liste>`,

    // Données pour les organismes
    organismeSimple: `<?xml version="1.0" encoding="ISO-8859-1"?>
      <liste>
        <organisme>
          <libelle>FFTT</libelle>
          <id>1</id>
          <code>FEDE</code>
          <idPere/>
        </organisme>
      </liste>`,

    // Données pour les clubs
    clubSimple: `<?xml version="1.0" encoding="ISO-8859-1"?>
      <liste>
        <club>
          <id>12345</id>
          <nom>Club de Test</nom>
          <numero>12345</numero>
          <nomSalle>Gymnase de Test</nomSalle>
          <adresseSalle>123 Rue de Test</adresseSalle>
          <codePostal>75000</codePostal>
          <villeSalle>Paris</villeSalle>
          <web>http://test.com</web>
          <latitude>48.8566</latitude>
          <longitude>2.3522</longitude>
        </club>
      </liste>`,
  },

  // Configuration des mocks
  mockResponses: {
    success: { status: 200, data: "" },
    unauthorized: { status: 401, data: "<?xml><erreur>Non autorisé</erreur>" },
    notFound: { status: 404, data: "<?xml><erreur>Non trouvé</erreur>" },
    serverError: { status: 500, data: "<?xml><erreur>Erreur serveur</erreur>" },
  },
};
