const axios = require('axios');

requestToSwapi = (req, res, next, url) => {

    let found = false;

    axios.get(url)
    .then(response => {

        const planets = response.data.results;
        
        planets.forEach(planet => {

            if(planet.name === req.body.name){
                req.amount = planet.films.length;
                found = true;
                return next();
            }
                
        });

        if(!found){
            if(response.data.next != null){
                requestToSwapi(req, res, next, response.data.next);
            }

            if(response.data.next === null)
                return res.status(400).json({ message: 'Invalid planet' });
        }   

    })
    .catch(err => console.log(err));

};

module.exports = (req, res, next) => {
    requestToSwapi(req, res, next, 'https://swapi.co/api/planets');
};