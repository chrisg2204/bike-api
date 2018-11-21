'use strict';

let db = require('../config/db'),
    
    bike = require('./Bike')(db),
    models = {};

models.bike = bike;

module.exports = models;