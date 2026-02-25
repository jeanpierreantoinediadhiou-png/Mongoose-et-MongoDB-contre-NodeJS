const mongoose = require('mongoose');

// Création du schéma Person
const personSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  age: Number,

  favoriteFoods: [String]

});

// Création du modèle
const Person = mongoose.model('Person', personSchema);

// Exportation
module.exports = Person;