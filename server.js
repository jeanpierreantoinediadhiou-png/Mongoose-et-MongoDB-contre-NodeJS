// Importation du framework Express
// Express permet de créer un serveur web facilement avec Node.js
const express = require('express');

// Importation du middleware CORS
// CORS permet d'autoriser les requêtes venant d'autres origines (frontend, Postman, etc.)
const cors = require('cors');

// Importation de la fonction de connexion à la base de données
// Cette fonction se trouve dans le dossier config/db.js
const connectDB = require('./config/db');

// Importation des routes liées aux personnes
// Les routes sont définies dans routes/personRoutes.js
const personRoutes = require('./routes/personRoutes');

// Création de l'application Express
const app = express();

// Connexion à MongoDB
// On appelle la fonction connectDB pour établir la connexion
// Appel sécurisé de la connexion DB pour éviter les rejets non gérés
connectDB().catch(err => {
  console.warn('Échec connexion DB géré:', err && err.message ? err.message : err);
});

// Gestion globale des promesses non gérées et exceptions
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

// =======================
//        MIDDLEWARE
// =======================

// Activation de CORS
// Permet au serveur d'accepter les requêtes externes
app.use(cors());

// Permet au serveur de lire les données JSON envoyées dans les requêtes
app.use(express.json());

// =======================
//        ROUTES
// =======================

// Toutes les routes commençant par /api/persons
// seront gérées par personRoutes
app.use('/api/persons', personRoutes);

// =======================
//        PORT
// =======================

// Définition du port
// On utilise le port défini dans .env ou 3000 par défaut
const PORT = process.env.PORT || 3000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT} 🚀`);
});