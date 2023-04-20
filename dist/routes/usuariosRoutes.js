"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _usuariosController = require("../controllers/usuariosController");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var usuariosRoutes = (0, _express.Router)();
usuariosRoutes.route('/id').post(_usuariosController.getUsuarioById);
usuariosRoutes.route('/todos').get(_usuariosController.getAllUsuarios);
usuariosRoutes.post('/', _authentication["default"], _usuariosController.createUsuario);
usuariosRoutes.put('/', _authentication["default"], _usuariosController.updateUsuario);
usuariosRoutes["delete"]('/', _authentication["default"], _usuariosController.deleteUsuario); //get vendedores, gerentes, teamleaders y supervisores

usuariosRoutes.route('/vendedores').get(_usuariosController.getAllVendedores);
usuariosRoutes.route('/gerentes').get(_usuariosController.getAllGerentes);
usuariosRoutes.route('/supervisores').get(_usuariosController.getAllSupervisores);
usuariosRoutes.route('/teamLeaders').get(_usuariosController.getAllTeamLeaders);
var _default = usuariosRoutes;
exports["default"] = _default;