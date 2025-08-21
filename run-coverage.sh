#!/bin/bash

echo "🚀 Exécution de tous les tests FFTTAPI avec couverture..."

echo ""
echo "📊 Exécution de tous les groupes de tests..."
npx jest source/Tests/FFTTAPI.part*.spec.ts source/Tests/FFTTAPI.simple.spec.ts source/Tests/FFTTAPI.debug.spec.ts source/Tests/FFTTAPI.coverage.spec.ts source/Tests/FFTTAPI.missing.spec.ts source/Tests/FFTTAPI.final100.spec.ts source/Tests/FFTTAPI.ultimate100.spec.ts source/Tests/FFTTAPI.final100ultimate.spec.ts source/Tests/FFTTAPI.final100ultimate2.spec.ts source/Tests/FFTTAPI.final100ultimate3.spec.ts source/Tests/FFTTAPI.final100ultimate4.spec.ts source/Tests/FFTTAPI.final100ultimate5.spec.ts source/Tests/FFTTAPI.final100ultimate6.spec.ts source/Tests/FFTTAPI.final100ultimate7.spec.ts source/Tests/FFTTAPI.final100ultimate8.spec.ts source/Tests/FFTTAPI.final100ultimate9.spec.ts source/Tests/FFTTAPI.final100ultimate10.spec.ts source/Tests/FFTTAPI.final100ultimate14.spec.ts source/Tests/FFTTAPI.final100ultimate15.spec.ts source/Tests/FFTTAPI.final100ultimate16.spec.ts source/Tests/FFTTAPI.final100ultimate17.spec.ts source/Tests/FFTTAPI.final100ultimate18.spec.ts source/Tests/FFTTAPI.final100ultimate19.spec.ts source/Tests/FFTTAPI.final100ultimate20.spec.ts --coverage --testTimeout=10000

echo ""
echo "✅ Tous les tests ont été exécutés avec couverture !"
