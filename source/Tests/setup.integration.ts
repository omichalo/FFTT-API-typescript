// Setup pour les tests d'intégration FFTT
import dotenv from "dotenv";
import path from "path";

console.log("🔧 Setup d'intégration chargé");
console.log(`📁 Répertoire courant: ${process.cwd()}`);
console.log(`📄 Fichier .env recherché: ${path.resolve(process.cwd(), ".env")}`);

// Chargement des variables d'environnement depuis la racine du projet
const result = dotenv.config({ path: path.resolve(process.cwd(), ".env") });

if (result.error) {
  console.error("❌ Erreur lors du chargement du fichier .env:", result.error);
} else {
  console.log("✅ Fichier .env chargé avec succès");
  console.log(
    "📊 Variables disponibles:",
    Object.keys(process.env).filter(key => key.startsWith("FFTT_"))
  );
}

// Configuration globale pour les tests d'intégration
beforeAll(() => {
  console.log("🚀 Configuration des tests d'intégration FFTT");
  console.log("============================================");

  // Vérification des variables critiques
  const requiredVars = ["FFTT_TEST_ID", "FFTT_TEST_PASSWORD"];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.warn(`⚠️  Variables manquantes: ${missingVars.join(", ")}`);
    console.warn("   Les tests d'intégration seront ignorés");
    console.warn(`   Répertoire courant: ${process.cwd()}`);
    console.warn(`   Fichier .env recherché: ${path.resolve(process.cwd(), ".env")}`);
  } else {
    console.log("✅ Configuration validée");
    console.log(`   - ID: ${process.env.FFTT_TEST_ID}`);
    console.log(`   - Password: ${process.env.FFTT_TEST_PASSWORD?.substring(0, 3)}***`);
  }

  console.log("");
});

// Configuration des timeouts globaux
jest.setTimeout(60000); // 60 secondes par test

// Gestion des erreurs non capturées
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Promesse rejetée non gérée:", reason);
});

process.on("uncaughtException", error => {
  console.error("❌ Exception non capturée:", error);
});
