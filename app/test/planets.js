const server = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const Planet = require('../models/Planet');

chai.use(chaiHttp);

describe('Planets TEST', () => {

    before(done => {
        Planet.remove({}, err => done());
    });

    after(done => {
        server.close();
        done();
    });

    it('Should return an empty array of planets', done => {
        chai.request(server)
        .get('/planets')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
        });
    });

    it('Should not add a planet with an invalid name', done => {
        let planet = {
            name: 'anyname',
            climate: 'temperate',
            terrain: 'jungle'
        };

        chai.request(server)
        .post('/planets')
        .send(planet)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.a.property('message').eql('Invalid planet');
            done();
        });
    });

    it('Should add a planet with success', done => {
        let planet = {
            name: 'Alderaan',
            climate: 'temperate',
            terrain: 'jungle'
        }

        chai.request(server)
        .post('/planets')
        .send(planet)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Planet created');
            res.body.should.have.property('planet');
            done();
        });
    });

    it('Should return a single planet found by name', done => {
        chai.request(server)
        .get('/planets/name/Alderaan')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('climate');
            res.body.should.have.property('terrain');
            res.body.should.have.property('moviesNumber');
            done();
        });
    });

    it('Should return an array with a single planet', done => {
        chai.request(server)
        .get('/planets')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
        });
    });

    it('Should not return an inexistent planet', done => {
        chai.request(server)
        .get('/planets/name/dasdsa')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('message').eql('Planet not found');
            done();
        });
    });

    it('Should not add a planet that already exists', done => {
        let planet = {
            name: 'Alderaan',
            climate: 'warm',
            terrain: 'desert'
        };

        chai.request(server)
        .post('/planets')
        .send(planet)
        .end((err, res) => {
            res.should.have.status(226);
            res.body.should.have.property('message').eql('Planet name already in use');
            done();
        });
    });

});