#!/bin/bash

echo "🚀 Exécution des tests FFTTAPI par groupes..."

echo ""
echo "📋 Groupe 1: Tests de base..."
npx jest source/Tests/FFTTAPI.part1.spec.ts --testTimeout=5000

echo ""
echo "📋 Groupe 2: Additional Coverage Tests..."
npx jest source/Tests/FFTTAPI.part2.spec.ts --testTimeout=5000

echo ""
echo "📋 Groupe 3: Tests de Joueurs..."
npx jest source/Tests/FFTTAPI.part3.spec.ts --testTimeout=5000

echo ""
echo "📋 Groupe 4: Advanced Coverage Tests..."
npx jest source/Tests/FFTTAPI.part4.spec.ts --testTimeout=5000

echo ""
echo "📋 Groupe 5: Tests d'Equipes et Rencontres..."
npx jest source/Tests/FFTTAPI.part5.spec.ts --testTimeout=5000

echo ""
echo "📋 Groupe 6: Tests d'Error Handling et Parameter Validation..."
npx jest source/Tests/FFTTAPI.part6.spec.ts --testTimeout=5000

echo ""
echo "📋 Groupe 7: Tests simples..."
npx jest source/Tests/FFTTAPI.simple.spec.ts --testTimeout=5000

echo ""
echo "📋 Groupe 8: Tests de debug..."
npx jest source/Tests/FFTTAPI.debug.spec.ts --testTimeout=5000

echo ""
echo "✅ Tous les groupes de tests ont été exécutés !"
