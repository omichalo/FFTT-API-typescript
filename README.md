# 🏓 FFTT API - Node.js/TypeScript

[![npm version](https://badge.fury.io/js/@omichalo%2Fffttapi-node.svg)](https://badge.fury.io/js/@omichalo%2Fffttapi-node)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.7+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-14+-green.svg)](https://nodejs.org/)
[![Tests](https://img.shields.io/badge/Tests-100%25%20passing-brightgreen.svg)](https://github.com/omichalo/FFTT-API-typescript)

**FFTT API** permet de consommer facilement l'API officielle **Smartping 2.0** de la **Fédération Française de Tennis de Table** en utilisant Node.js et TypeScript.

## ✨ Fonctionnalités

### 🏢 **Gestion des Clubs et Organismes**
- Liste des organismes par type
- Liste des clubs par département
- Liste des clubs par nom
- Détail complet d'un club
- Divisions par épreuve

### 👤 **Gestion des Joueurs**
- Recherche de joueurs par nom/prénom
- Détail complet d'un joueur par licence
- Classement d'un joueur
- Historique des parties
- Points virtuels et classement

### 🏆 **Gestion des Compétitions**
- Liste des épreuves par organisme
- Résultats individuels par division
- Classement critérium
- Gestion des équipes et poules
- Détail des rencontres

### 🔐 **Authentification et Sécurité**
- Authentification MD5 + HMAC-SHA1
- Gestion des timestamps FFTT
- Validation des réponses API
- Gestion des erreurs robuste

## 🚀 Installation

### Avec npm

```bash
npm install @omichalo/ffttapi-node
```

### Avec yarn

```bash
yarn add @omichalo/ffttapi-node
```

## 📋 Configuration

### 1. Créez un fichier `.env` à la racine de votre projet :

```bash
cp env.example .env
```

### 2. Configurez vos identifiants FFTT :

```env
FFTT_TEST_ID=your_fftt_id_here
FFTT_TEST_PASSWORD=your_fftt_password_here
```

**⚠️ Important :** Vous devez obtenir vos identifiants auprès de la FFTT pour accéder à l'API officielle.

## 💻 Exemples d'utilisation

### 🔐 Initialisation et Authentification

```typescript
import { FFTTAPI } from "@omichalo/ffttapi-node";

// Initialisation de l'API
const api = new FFTTAPI("identifiant", "password");

// Authentification
try {
  const result = await api.initialize();
  console.log("✅ API initialisée avec succès");
} catch (error) {
  console.error("❌ Erreur d'authentification:", error);
}
```

### 🏢 Gestion des Clubs

```typescript
// Récupération des détails d'un club
const clubDetails = await api.getClubDetails("75010001");
console.log("Club:", clubDetails.nom, "à", clubDetails.ville);

// Recherche de clubs par nom
const clubs = await api.getClubsByName("TENNIS");
clubs.forEach(club => console.log(`- ${club.nom} (${club.numero})`));
```

### 👤 Gestion des Joueurs

```typescript
// Recherche de joueurs par nom
const joueurs = await api.getJoueursByNom("DUPONT");
joueurs.forEach(joueur => {
  console.log(`${joueur.nom} ${joueur.prenom} - Licence: ${joueur.licence}`);
});

// Détail d'un joueur par licence
const joueur = await api.getJoueurDetailsByLicence("1234567");
console.log("Points:", joueur.points, "Classement:", joueur.classement);
```

### 🏆 Gestion des Compétitions

```typescript
// Liste des épreuves
const epreuves = await api.getEpreuves(75, "E"); // Organisme 75, type Équipes
epreuves.forEach(epreuve => {
  console.log(`${epreuve.libelle} (ID: ${epreuve.id})`);
});

// Résultats individuels
const resultats = await api.getResultatsIndividuels(257, 7501, "poule");
console.log(`${resultats.length} résultats trouvés`);

// Classement critérium
const classements = await api.getClassementCriterium();
classements.slice(0, 5).forEach((clt, index) => {
  console.log(`${index + 1}. ${clt.nom} - ${clt.points} pts`);
});
```

## 🧪 Tests

### Tests Unitaires

```bash
# Tests avec couverture complète
npm test

# Tests en mode watch
npm run test:watch

# Tests pour CI/CD
npm run test:ci
```

### Tests d'Intégration

```bash
# Tests avec l'API FFTT réelle
npm run test:integration:real

# Tests d'intégration en mode watch
npm run test:integration:watch
```

## 📦 Scripts disponibles

- `npm run build` - Compilation TypeScript
- `npm test` - Exécution des tests avec couverture
- `npm run test:watch` - Tests en mode watch
- `npm run test:ci` - Tests pour l'intégration continue
- `npm run test:integration` - Tests d'intégration
- `npm run lint` - Vérification du code avec ESLint
- `npm run format` - Formatage du code avec Prettier

## 🏗️ Architecture

```
source/
├── Core/
│   ├── FFTTAPI.ts              # Classe principale de l'API
│   └── ApiRequest.ts           # Gestion des requêtes HTTP
├── Models/
│   ├── FFTTInterfaces.ts       # Interfaces TypeScript
│   └── ResponseData.interface.ts
├── Services/
│   ├── Utils.service.ts        # Utilitaires
│   └── RencontreDetailsFactory.service.ts
└── Tests/
    ├── Core/                   # Tests des fonctionnalités principales
    ├── Integration/            # Tests d'intégration
    ├── Models/                 # Tests des modèles
    └── Services/               # Tests des services
```

## 🔧 Configuration TypeScript

Le package inclut des définitions TypeScript complètes pour une expérience de développement optimale :

```typescript
// Types fortement typés pour toutes les réponses API
interface ClubDetails {
  idClub: string;
  nom: string;
  numero: string;
  ville: string;
  // ... autres propriétés
}

interface JoueurDetails {
  nom: string;
  prenom: string;
  licence: string;
  points: number;
  // ... autres propriétés
}
```

## 📚 Documentation

- **Tests d'intégration :** [INTEGRATION_TESTS.md](./INTEGRATION_TESTS.md)
- **Spécifications API :** [specifications-smartping-structured.md](./specifications-smartping-structured.md)
- **Exemples d'utilisation :** Voir le dossier `examples/`

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

## 🙏 Remerciements

- **FFTT** pour l'API officielle Smartping 2.0
- **StephSako** pour le projet original
- **Communauté TypeScript/Node.js** pour les outils et bibliothèques

## 📞 Support

- **Issues GitHub :** [https://github.com/omichalo/FFTT-API-typescript/issues](https://github.com/omichalo/FFTT-API-typescript/issues)
- **Documentation :** [https://github.com/omichalo/FFTT-API-typescript#readme](https://github.com/omichalo/FFTT-API-typescript#readme)

---

**🏓 Développé avec ❤️ pour la communauté du tennis de table français !**
