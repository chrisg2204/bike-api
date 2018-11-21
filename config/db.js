'use strict';

let mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://chrisg2204:casa1234@ds037977.mlab.com:37977/bikes-ws', {
    useNewUrlParser: true
});

let connectToMongo = mongoose.connection;
connectToMongo.on('error', console.error.bind(console, 'Error de conexion'));

let db = {};

db.mongoose = mongoose;
db.schema = mongoose.Schema;

module.exports = db;