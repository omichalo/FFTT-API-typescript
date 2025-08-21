# 🧪 Tests d'Intégration FFTT - Guide Complet

## 📋 Vue d'ensemble

Ce guide explique comment utiliser les tests d'intégration pour valider votre API FFTT avec la vraie API officielle FFTT Smartping 2.0.

## ⚠️ ATTENTION IMPORTANTE

**Ces tests appellent la vraie API FFTT !** Assurez-vous d'avoir :

- Des identifiants FFTT valides
- Une connexion internet stable
- L'autorisation d'utiliser l'API FFTT

## 🚀 Configuration Rapide

### 1. Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```bash
# Copiez le fichier d'exemple
cp env.example .env

# Éditez le fichier avec vos vraies valeurs
nano .env
```

Remplissez avec vos identifiants FFTT :

```env
FFTT_TEST_ID=your_real_fftt_id
FFTT_TEST_PASSWORD=your_real_fftt_password
FFTT_INTEGRATION_ENABLED=true
```

### 2. Installation des Dépendances

```bash
npm install dotenv
```

## 🧪 Lancement des Tests

### Option 1 : Script Automatique (Recommandé)

```bash
# Rendre le script exécutable
chmod +x run-integration-tests.sh

# Lancer les tests
./run-integration-tests.sh
```

### Option 2 : Commande NPM Directe

```bash
# Avec variables d'environnement
FFTT_TEST_ID=your_id FFTT_TEST_PASSWORD=your_password npm test -- --testPathPattern="FFTTAPI.integration.real.spec.ts"

# Ou avec fichier .env
npm test -- --testPathPattern="FFTTAPI.integration.real.spec.ts"
```

### Option 3 : Configuration Jest Spécialisée

```bash
# Utiliser la config d'intégration
npx jest --config jest.integration.config.js
```

## 📊 Types de Tests Inclus

### 🔐 Authentification

- Initialisation avec l'API réelle
- Gestion des erreurs d'authentification
- Validation des réponses d'initialisation

### 🏢 Clubs et Organismes

- Récupération des détails de clubs
- Informations sur les organismes
- Liste des divisions

### 👤 Joueurs

- Recherche par licence
- Recherche par nom
- Gestion des joueurs non trouvés

### 🏆 Nouveaux Endpoints

- Épreuves (`xml_epreuve`)
- Résultats individuels (`xml_result_indiv`)
- Classements critérium (`xml_res_cla`)

### 📈 Performance

- Tests de requêtes concurrentes
- Gestion des timeouts
- Validation des structures de données

## 🛠️ Configuration Avancée

### Timeouts et Retry

```env
FFTT_REQUEST_TIMEOUT=30000      # 30 secondes par requête
FFTT_RETRY_ATTEMPTS=3          # Nombre de tentatives
```

### Données de Test

```env
FFTT_KNOWN_CLUB_ID=75010001           # Club de test (Paris)
FFTT_KNOWN_PLAYER_LICENCE=1234567     # Licence de test
FFTT_KNOWN_ORGANISME_ID=75            # Organisme de test
FFTT_KNOWN_DIVISION_ID=7501           # Division de test
```

### Debug et Logs

```env
FFTT_DEBUG_MODE=true
FFTT_LOG_LEVEL=debug
```

## 🔍 Interprétation des Résultats

### ✅ Tests Réussis

- Votre API fonctionne parfaitement avec l'API officielle
- Toutes les fonctionnalités sont validées
- La conformité aux spécifications est confirmée

### ⚠️ Tests Partiellement Réussis

- Certaines fonctionnalités peuvent avoir des problèmes
- Vérifiez les logs pour identifier les points faibles
- Certains endpoints peuvent être temporairement indisponibles

### ❌ Tests Échoués

- Problèmes de configuration (identifiants invalides)
- Problèmes de réseau
- API FFTT temporairement indisponible
- Erreurs dans votre implémentation

## 🚨 Dépannage

### Erreur : "Variables manquantes"

```bash
# Vérifiez votre fichier .env
cat .env

# Ou définissez les variables directement
export FFTT_TEST_ID=your_id
export FFTT_TEST_PASSWORD=your_password
```

### Erreur : "Impossible de joindre www.fftt.com"

- Vérifiez votre connexion internet
- Vérifiez que le site FFTT est accessible
- Vérifiez vos paramètres de pare-feu

### Erreur : "Authentication failed"

- Vérifiez vos identifiants FFTT
- Assurez-vous que votre compte a accès à l'API
- Vérifiez que votre compte n'est pas suspendu

### Erreur : "Request timeout"

- Augmentez `FFTT_REQUEST_TIMEOUT`
- Vérifiez la stabilité de votre connexion
- L'API FFTT peut être lente en période de pointe

## 📈 Surveillance et Maintenance

### Tests Réguliers

- Lancez ces tests avant chaque déploiement
- Surveillez les performances de l'API
- Détectez les changements dans l'API officielle

### Mise à Jour des Données de Test

- Actualisez régulièrement les IDs de test
- Vérifiez que les données de test sont toujours valides
- Adaptez les tests aux évolutions de l'API

## 🔒 Sécurité

### Protection des Identifiants

- Ne commitez jamais votre fichier `.env`
- Utilisez des variables d'environnement en production
- Limitez l'accès aux identifiants de test

### Rate Limiting

- Les tests incluent des délais entre les requêtes
- Respectez les limites de l'API FFTT
- Évitez de surcharger l'API officielle

## 📞 Support

En cas de problème :

1. Vérifiez ce guide
2. Consultez les logs d'erreur
3. Vérifiez la documentation FFTT
4. Contactez le support FFTT si nécessaire

---

**🎯 Objectif : Valider que votre API FFTT fonctionne parfaitement avec l'API officielle !**
