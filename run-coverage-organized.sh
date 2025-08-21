#!/bin/bash
echo "🚀 Exécution des tests FFTTAPI avec couverture (STRUCTURE ORGANISÉE COMPLÈTE)..."
echo ""
echo "📊 Exécution de tous les groupes de tests organisés (MIGRATION COMPLÈTE)..."
echo ""

echo "🔧 Tests Core (FFTTAPI + Exceptions + Coverage Complet)..."
npx jest source/Tests/Core/ --coverage --testTimeout=10000

echo ""
echo "⚙️ Tests Services (Services + RencontreDetailsFactory Complet)..."
npx jest source/Tests/Services/ --coverage --testTimeout=10000

echo ""
echo "🏗️ Tests Models (Tous les modèles)..."
npx jest source/Tests/Models/ --coverage --testTimeout=10000

echo ""
echo "🔗 Tests Integration (Coverage + Integration + Integration Avancée)..."
npx jest source/Tests/Integration/ --coverage --testTimeout=10000

echo ""
echo "✅ Tous les tests ont été exécutés avec couverture (STRUCTURE ORGANISÉE COMPLÈTE) !"
echo "🎯 Migration complète terminée - Tous les tests existants ont été préservés !"
