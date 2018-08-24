const server = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const Planet = require('../models/Planet');

chai.use(chaiHttp);

let id;

describe('Planets TEST', () => {

    before(done => {
        Planet.remove({}, err => done());
    });

    after(done => {
        server.close();
        done();
    });

    describe('GET Requests', () => {

        it('Should return all planets', done => {
            chai.request(server)
            .get('/planets')
            .end((err, res) => {

                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });

    });

    describe('POST Requests', () => {

        it('Should not add a planet with a invalid name', done => {
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
                done();
            });
        });

    });

    describe('GET single planets Request', () => {

        it('Should return a single planet found by name', done => {
            chai.request(server)
            .get('/planets/name/Alderaan')
            .end((err, res) => {

                res.should.have.status(200);
                res.should.be.a('object');
                done();
            });
        });

    });

});