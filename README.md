# FFTT API - Node.js/TypeScript

[![npm version](https://badge.fury.io/js/@omichalo%2Fffttapi-node.svg)](https://badge.fury.io/js/@omichalo%2Fffttapi-node)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

FFTT API permet de consommer facilement l'API officielle de la Fédération Française de Tennis de Table en utilisant Node.js et TypeScript.

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

Créez un fichier `.env` à la racine de votre projet :

```bash
cp env.example .env
```

Puis configurez vos identifiants FFTT :

```env
ID_SECRET=your_fftt_id_here
PASSWORD_SECRET=your_fftt_password_here
```

## 💻 Exemple d'utilisation

```typescript
import { FFTTAPI } from "@omichalo/ffttapi-node";

// Initialisation de l'API
const api = new FFTTAPI("identifiant", "password");

// Récupération des joueurs par nom
const joueurs = await api.getJoueursByNom("Lamirault");
console.log(joueurs);
```

```javascript
const { FFTTAPI } = require("@omichalo/ffttapi-node");

// Initialisation de l'API
const api = new FFTTAPI("identifiant", "password");

// Récupération des joueurs par nom
api
  .getJoueursByNom("Lamirault")
  .then((joueurs) => console.log(joueurs))
  .catch((error) => console.error(error));
```

### Fonctionnalités

- Liste des organismes
- Liste des clubs par département
- Liste des clubs par nom
- Détail d'un club
- Lists des joueurs d'un club
- Liste des joueurs par nom, prénom
- Détail d'un joueur
- Classement d'un joueur
- Historique d'un joueur
- Liste des parties d'un joueur
- Liste des parties non validées d'un joueur
- Points virtuels d'un joueur
- Liste des équipes d'un club
- Classement d'une poule
- Liste des rencontres d'une poule
- Liste des prochaines rencontres d'une équipe
- Détail d'une rencontre
- Liste des actualitées

## 🧪 Tests

Vous pouvez lancer les tests unitaires avec les commandes suivantes :

```bash
# Tests avec couverture
npm test

# Tests en mode watch
npm run test:watch

# Tests pour CI/CD
npm run test:ci
```

## 📦 Scripts disponibles

- `npm run build` - Compilation TypeScript
- `npm test` - Exécution des tests avec couverture
- `npm run test:watch` - Tests en mode watch
- `npm run test:ci` - Tests pour l'intégration continue
