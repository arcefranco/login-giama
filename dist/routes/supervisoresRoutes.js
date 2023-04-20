"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _supervisoresController = require("../controllers/supervisoresController");

var _gerentesController = require("../controllers/gerentesController");

var SupervisoresRouter = (0, _express.Router)();
SupervisoresRouter.route('/').get(_supervisoresController.getSupervisores);
SupervisoresRouter.route('/id').post(_supervisoresController.getSupervisoresById);
SupervisoresRouter.route('/').post(_supervisoresController.postSupervisores);
SupervisoresRouter.route('/').put(_supervisoresController.updateSupervisores);
SupervisoresRouter.route('/')["delete"](_supervisoresController.deleteSupervisores); //get gerentes, zonas

SupervisoresRouter.route('/gerentes').get(_gerentesController.getGerentes);
SupervisoresRouter.route('/zonas').get(_supervisoresController.getAllZonas);
var _default = SupervisoresRouter;
exports["default"] = _default;