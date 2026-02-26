const express = require('express');
const router = express.Router();

const personController = require('../controllers/personController');

// Routes
// Créer une personne (envoi JSON dans le body)
router.post('/create', personController.createPerson);

// Créer plusieurs personnes (POST optionnel) ou utiliser la route pour remplir
router.post('/create-many', personController.createManyPeople);

// Récupérer toutes les personnes nommées Mary
router.get('/find-mary', personController.findMary);

// Trouver une personne qui aime un aliment donné
router.get('/find-one-food/:food', personController.findOneByFood);

// Trouver par id
router.get('/find/:id', personController.findPersonById);

// Trouver par id, ajouter 'hamburger' et sauvegarder
router.post('/find-edit-save/:id', personController.findEditThenSave);

// Trouver par nom et mettre à jour l'âge à 20
router.put('/find-and-update/:name', personController.findAndUpdate);

// Supprimer par id
router.delete('/remove/:id', personController.removeById);

// Supprimer toutes les Mary
router.delete('/remove-mary', personController.removeManyMary);

// Chaînage : burritos, tri, limite, cacher age
router.get('/burritos', personController.queryChain);

module.exports = router;