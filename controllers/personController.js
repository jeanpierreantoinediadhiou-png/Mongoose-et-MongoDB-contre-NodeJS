const Person = require('../models/person');

// Créer et sauvegarder une personne
// Reçoit les champs dans req.body : { name, age, favoriteFoods }
exports.createPerson = (req, res) => {
  const { name, age, favoriteFoods } = req.body;
  const person = new Person({ name, age, favoriteFoods });

  // Sauvegarde avec callback suivant la convention Node (err, data)
  person.save((err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

// Créer plusieurs personnes avec Model.create()
// Utilise un tableau d'exemples si aucun payload fourni
exports.createManyPeople = (req, res) => {
  const arrayOfPeople = req.body && req.body.length ? req.body : [
    { name: 'Marie', age: 22, favoriteFoods: ['burger'] },
    { name: 'Paul', age: 30, favoriteFoods: ['burritos'] },
    { name: 'Mary', age: 28, favoriteFoods: ['pizza'] }
  ];

  Person.create(arrayOfPeople, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

// Trouver toutes les personnes nommées Mary
exports.findMary = (req, res) => {
  Person.find({ name: 'Mary' }, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

// Trouver une personne qui aime un aliment donné (Model.findOne)
// Paramètre : req.params.food
exports.findOneByFood = (req, res) => {
  const food = req.params.food;
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

// Trouver une personne par _id (Model.findById)
// Paramètre : req.params.id
exports.findPersonById = (req, res) => {
  const personId = req.params.id;
  Person.findById(personId, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

// Rechercher par id, modifier (ajouter 'hamburger'), puis save()
// Paramètre : req.params.id
exports.findEditThenSave = (req, res) => {
  const personId = req.params.id;
  Person.findById(personId, (err, person) => {
    if (err) return res.status(500).json(err);
    if (!person) return res.status(404).json({ message: 'Personne non trouvée' });

    // Ajouter "hamburger" aux favoriteFoods
    person.favoriteFoods.push('hamburger');

    // Sauvegarder le document modifié
    person.save((err, updated) => {
      if (err) return res.status(500).json(err);
      res.json(updated);
    });
  });
};

// Trouver une personne par nom et mettre à jour son âge à 20 (findOneAndUpdate)
// Paramètre : req.params.name
exports.findAndUpdate = (req, res) => {
  const personName = req.params.name;
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true }, // retourne le document mis à jour
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data);
    }
  );
};

// Supprimer une personne par _id (findByIdAndRemove)
// Paramètre : req.params.id
exports.removeById = (req, res) => {
  const personId = req.params.id;
  Person.findByIdAndRemove(personId, (err, removed) => {
    if (err) return res.status(500).json(err);
    res.json(removed);
  });
};

// Supprimer toutes les personnes nommées "Mary" (Model.remove)
exports.removeManyMary = (req, res) => {
  // Note: Model.remove est déprécié, mais utilisé ici pour suivre l'exercice
  Person.remove({ name: 'Mary' }, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};


exports.queryChain = (req, res) => {
  Person.find({ favoriteFoods: 'burritos' })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data);
    });
};