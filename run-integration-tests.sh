#!/bin/bash

# Script de lancement des tests d'intégration FFTT
# ⚠️ ATTENTION : Ces tests appellent la vraie API FFTT

echo "🚀 Tests d'Intégration FFTT - API Réelle"
echo "=========================================="

# Chargement automatique du fichier .env
if [ -f ".env" ]; then
    echo "📁 Chargement du fichier .env..."
    export $(cat .env | grep -v '^#' | xargs)
    echo "✅ Fichier .env chargé"
else
    echo "❌ Fichier .env non trouvé"
    exit 1
fi

# Vérification des variables d'environnement
if [ -z "$FFTT_TEST_ID" ] || [ "$FFTT_TEST_ID" = "your_real_fftt_id" ]; then
    echo "❌ ERREUR : Variable FFTT_TEST_ID non définie ou invalide"
    echo "   Définissez FFTT_TEST_ID dans votre fichier .env"
    echo "   Exemple : FFTT_TEST_ID=12345678"
    exit 1
fi

if [ -z "$FFTT_TEST_PASSWORD" ] || [ "$FFTT_TEST_PASSWORD" = "your_real_fftt_password" ]; then
    echo "❌ ERREUR : Variable FFTT_TEST_PASSWORD non définie ou invalide"
    echo "   Définissez FFTT_TEST_PASSWORD dans votre fichier .env"
    echo "   Exemple : FFTT_TEST_PASSWORD=votre_vrai_password"
    exit 1
fi

echo "✅ Configuration validée :"
echo "   - ID: $FFTT_TEST_ID"
echo "   - Password: ${FFTT_TEST_PASSWORD:0:3}***"
echo ""

# Vérification de la connexion internet
echo "🌐 Vérification de la connexion internet..."
if ! ping -c 1 www.fftt.com > /dev/null 2>&1; then
    echo "❌ ERREUR : Impossible de joindre www.fftt.com"
    echo "   Vérifiez votre connexion internet"
    exit 1
fi
echo "✅ Connexion internet OK"
echo ""

# Lancement des tests d'intégration
echo "🧪 Lancement des tests d'intégration..."
echo ""

# Lancement des tests d'intégration
npm test -- --testPathPattern="FFTTAPI.integration.real.spec.ts" --verbose --no-coverage

# Vérification du code de sortie
if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Tests d'intégration terminés avec succès !"
    echo "✅ Votre API FFTT fonctionne parfaitement avec l'API officielle"
else
    echo ""
    echo "⚠️  Tests d'intégration terminés avec des erreurs"
    echo "   Vérifiez les logs ci-dessus pour plus de détails"
    echo "   Cela peut être dû à :"
    echo "   - Problèmes de réseau"
    echo "   - Identifiants invalides"
    echo "   - API FFTT temporairement indisponible"
fi

echo ""
echo "📊 Résumé des tests d'intégration terminé"
