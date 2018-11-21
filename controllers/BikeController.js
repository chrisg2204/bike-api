'use strict'

// Config
const configApp = require('../config/app');
// Libs
const chalk = require('chalk');
const log = require('loglevel');
const mongoose = require('mongoose');
// Utils
const response = require('../utils/ResponseUtil');
const validate = require('../utils/ValidateUtil');
// Models
const models = require('../models/index');




class BikeController {

	constructor() {}

	add(req, res)  {
		let body = req.body;

		if ('nombre' in body && 'modelo' in body && 'color' in body && 'rodado' in body && 'precio' in body) {
			const Joi = require('joi');

			const schema = Joi.object().keys({
				nombre: Joi.string().regex(/^[A-Za-z ]+$/).required(),
				modelo: Joi.string().required(),
				color: Joi.string().required(),
				rodado: Joi.string().required(),
				precio: Joi.number().required().integer() 
			});

			Joi.validate(body, schema, (err, value) => {
				if (err) {

					response.sendResponse(res, 422, err.details, false);
				} else {
					let bike = new models.bike;
						bike.nombre = body.nombre;
						bike.modelo = body.modelo;
						bike.color = body.color;
						bike.rodado = body.rodado;
						bike.precio = body.precio;

						bike.save((err, bikeSaved) => {
							if (err) {
								log.error(err);
								log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/add - BikeController?add')}`);	
							} else {
								if (bikeSaved) {
									log.debug(`${chalk.bgGreen('Success')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/add - BikeController?add')}`);
									response.sendResponse(res, 200, 'Bike save successful.', false);
								}
							}
						});
					}
				});
		} else {
			log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/add - BikeController?add')}`);
			response.sendResponse(res, 404, "Faltan parametros del servicio", false);
		}
	}

	findAll(req, res) {
		let condition = {};
		let bike = models.bike;

		bike.find({}, (err, allBikes) => {
			if (err) {
				log.error(err);
				log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/all - BikeController?findAll')}`);
			} else {
				if (allBikes) {
					log.debug(`${chalk.bgGreen('Success')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/all - BikeController?findAll')}`);
					response.sendResponse(res, 200, allBikes, false);
				} else {
					response.sendResponse(res, 404, null, false);
				}
			}
		});
	}

	update(req, res) {
		let bikeId = req.params.id;
		let body = req.body;

		if ('nombre' in body && 'modelo' in body && 'color' in body && 'rodado' in body && 'precio' in body) {
			const Joi = require('joi');

			const schema = Joi.object().keys({
				nombre: Joi.string().regex(/^[A-Za-z ]+$/).required(),
				modelo: Joi.string().required(),
				color: Joi.string().required(),
				rodado: Joi.string().required(),
				precio: Joi.number().required().integer() 
			});

			Joi.validate(body, schema, (err, value) => {
				if (err) {

					response.sendResponse(res, 422, err.details, false);
				} else {
					let ObjectId = mongoose.Types.ObjectId;
					let bike = models.bike;

					bike.findById(new ObjectId(bikeId), function (err, bikeFinded) {
						if (err) {
							log.error(err);
							log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/update - BikeController?update')}`);
						} else {
							if (!bikeFinded) {
								response.sendResponse(res, 404, null, false);
							} else {
								bike.updateOne({ _id: new ObjectId(bikeId) }, { $set: { nombre: body.nombre, modelo: body.modelo, color: body.color, rodado: body.rodado, precio: body.precio }}, (err, ok) => {
									if (err) {
										log.error(err);
										log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/update - BikeController?update')}`);
									} else {
										log.debug(`${chalk.bgGreen('Success')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/update- BikeController?delete')}`);
										response.sendResponse(res, 200, 'Bike updated successful.', false);	
									}
								});
							}
						}
					});
				}
			});
		} else {
			log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/add - BikeController?add')}`);
			response.sendResponse(res, 404, "Faltan parametros del servicio", false);
		}
	}

	delete(req, res) {
		let bikeId = req.params.id;
		let ObjectId = mongoose.Types.ObjectId;
		let bike = models.bike;

		bike.findById(new ObjectId(bikeId), function (err, bikeFinded) {
			if (err) {
				log.error(err);
				log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/delete - BikeController?delete')}`);
			} else {
				if (!bikeFinded) {
					response.sendResponse(res, 404, null, false);
				} else {
					bike.find({ _id: new ObjectId(bikeId) }).remove((err, bikeDeleted) =>{
						if (err) {
							log.error(err);
							log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/delete - BikeController?delete')}`);
						} else {
							log.debug(`${chalk.bgGreen('Success')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/delete - BikeController?delete')}`);
							response.sendResponse(res, 200, 'Bike deleted successful.', false);	
						}
					});
				}
			}
		});
	}

}

module.exports = new BikeController();