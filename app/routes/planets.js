const express = require('express');
const router = express.Router();

const isPlanetNameInUse = require('../middlewares/isPlanetNameInUse');

const PlanetController = require('../controllers/planets');

/**
 * Endpoint to add a new planet
 * @method POST
 */
router.post('/', isPlanetNameInUse, PlanetController.save);

/**
 * Endpoint to fetch all planets
 * @method GET
 */
router.get('/', PlanetController.findAll);

/**
 * Endpoint to fetch a single planet by name
 * @method GET
 * @param name
 */
router.get('/name/:name', PlanetController.findByName);

/**
 * Endpoint to fetch a single planet by id
 * @method GET
 * @param id
 */
router.get('/:id', PlanetController.findById)

/**
 * Endpoint to remove a planet
 * @method DELETE
 * @param id
 */
router.delete('/:id', PlanetController.remove);

module.exports = router;