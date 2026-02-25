const Person = require('../models/person');

// 1️⃣ Créer et sauvegarder une personne
exports.createPerson = (req, res) => {

  const person = new Person({
    name: "Jean",
    age: 25,
    favoriteFoods: ["pizza", "riz"]
  });

  person.save((err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};


// 2️⃣ Créer plusieurs personnes
exports.createManyPeople = (req, res) => {

  const arrayOfPeople = [
    { name: "Marie", age: 22, favoriteFoods: ["burger"] },
    { name: "Paul", age: 30, favoriteFoods: ["burritos"] },
    { name: "Mary", age: 28, favoriteFoods: ["pizza"] }
  ];

  Person.create(arrayOfPeople, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};


// 3️⃣ Trouver toutes les personnes nommées Mary
exports.findMary = (req, res) => {

  Person.find({ name: "Mary" }, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });

};
