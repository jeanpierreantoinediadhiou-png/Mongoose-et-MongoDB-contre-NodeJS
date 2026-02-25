// Importation de Mongoose
// Mongoose est une bibliothèque qui permet de connecter Node.js à MongoDB
const mongoose = require('mongoose');

// Importation de dotenv
// Permet de lire les variables d'environnement du fichier .env
require('dotenv').config();

// Création d'une fonction asynchrone pour connecter la base de données
const connectDB = async () => {

  try {

    // Connexion à MongoDB en utilisant l'URI stocké dans .env
    // process.env.MONGO_URI récupère la valeur définie dans le fichier .env
    const uri = process.env.MONGO_URI;

    if (!uri) {
      console.warn("MONGO_URI non défini — connexion à MongoDB ignorée. Démarrage sans DB.");
      return;
    }

    await mongoose.connect(uri);

    // Message affiché si la connexion réussit
    console.log("Connexion à MongoDB réussie ✅");

  } catch (error) {

    // Si une erreur se produit, elle sera affichée ici
    console.error("Erreur de connexion ❌", error);

    // Ne pas arrêter le serveur automatiquement pour permettre le debug
    // Le serveur pourra fonctionner en mode dégradé (sans DB)

  }

};

// Exportation de la fonction pour pouvoir l'utiliser dans server.js
module.exports = connectDB;