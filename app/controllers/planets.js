const mongoose = require('mongoose');
const Planet = require('../models/Planet');

exports.save = (req, res, next) => {
    
    const planet = new Planet({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        climate: req.body.climate,
        terrain: req.body.terrain,
        moviesNumber: req.amount
    });

    planet.save()
    .then(planet => res.status(201).json({ message: 'Planet created', planet: planet }))
    .catch(err => res.status(500).json(err));

};

exports.findAll = (req, res, next) => {

    Planet.find()
    .exec()
    .then(planets => res.status(200).json(planets))
    .catch(err => res.status(500).json(err));

};

exports.findByName = (req, res, next) => {

    Planet.findOne({ name: req.params.name })
    .exec()
    .then(planet => {

        if(planet)
            return res.status(200).json(planet);
        
        return res.status(404).json({ message: 'Planet not found' });
    })
    .catch(err => res.status(500).json(err));

};

exports.findById = (req, res, next) => {

    Planet.findById(req.params.id)
    .exec()
    .then(planet => {

        if(planet)
            return res.status(200).json(planet);

        return res.status(404).json({ message: 'Planet not found' });
    })
    .catch(err => res.status(500).json(err));

};

exports.remove = (req, res, next) => {

    Planet.deleteOne({ _id: req.params.id })
    .exec()
    .then(result => res.status(200).json({ message: 'Planet removed' }))
    .catch(err => res.status(500).json(err));
};