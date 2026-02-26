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

    // Se connecter avec l'URI. Les options historiques `useNewUrlParser`
    // et `useUnifiedTopology` sont gérées automatiquement par les versions
    // récentes de Mongoose, les passer explicitement peut causer des erreurs.
    await mongoose.connect(uri);

    // Message affiché si la connexion réussit
    console.log('Connexion à MongoDB réussie ✅');

  } catch (error) {

    // Si une erreur se produit, l'afficher puis la repropager
    console.error('Erreur de connexion ❌', error);
    throw error; // repropager pour que l'appelant puisse gérer la rejection

  }

};

// Exportation de la fonction pour pouvoir l'utiliser dans server.js
module.exports = connectDB;