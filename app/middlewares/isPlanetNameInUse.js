const Planet = require('../models/Planet');

module.exports = (req, res, next) => {

    Planet.findOne({ name: req.body.name })
    .exec()
    .then(planet => {

        if(planet)
            return res.status(226).json({ message: 'Planet name already in use' });

        next();
    })
    .catch(err => res.status(500).json(err));

};