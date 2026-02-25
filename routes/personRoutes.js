const express = require('express');
const router = express.Router();

const personController = require('../controllers/personController');

// Routes
router.get('/create', personController.createPerson);
router.get('/create-many', personController.createManyPeople);
router.get('/find-mary', personController.findMary);

module.exports = router;