const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/conf/database');

const planetRoutes = require('./app/routes/planets');

db.conn;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/planets', planetRoutes);

app.use((req, res, next) => res.status(404).json({ message: 'Not found' }));

module.exports = app;