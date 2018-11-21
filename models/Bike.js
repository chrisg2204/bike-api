'use strict';

let moment = require('moment');

module.exports = (db) => {
		let mongoose = db.mongoose,
			bikeSchema = new db.schema({
				nombre: {
					type: String,
					required: [true, 'nombre is required']
				},
				modelo: {
					type: String,
					required: [true, 'modelo is required']
				},
				color: {
					type: String,
					required: [true, 'color is required']
				},
				rodado: {
					type: Number,
					required: [true, 'rodado is required']
				},
				precio: {
					type: Number,
					required: [true, 'precio is required']
				},
				fecha: {
					type: Date,
					required: [true, 'fecha is required'],
					default: moment()
				}
			});

		return mongoose.model('bike', bikeSchema);

};