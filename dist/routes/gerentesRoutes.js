"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _gerentesController = require("../controllers/gerentesController");

var GerentesRouter = (0, _express.Router)();
GerentesRouter.route('/').get(_gerentesController.getGerentes);
GerentesRouter.route('/id').post(_gerentesController.getGerentesById);
GerentesRouter.route('/').post(_gerentesController.postGerentes);
GerentesRouter.route('/').put(_gerentesController.updateGerentes);
GerentesRouter.route('/')["delete"](_gerentesController.deleteGerentes);
var _default = GerentesRouter;
exports["default"] = _default;