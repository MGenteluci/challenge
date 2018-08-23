const axios = require('axios');

module.exports = (req, res, next) => {

    axios.get('https://swapi.co/api/planets/')
    .then(response => {
        let planets = response.data.results;
        
        planets.forEach(planet => {
            console.log(planet.name);

        });
              
        return res.status(400).json({ message: 'Invalid planet name' });
    })
    .catch(err => console.log(err));

};