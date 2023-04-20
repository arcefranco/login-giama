"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _rolesController = require("../controllers/rolesController");

var RolesRouter = (0, _express.Router)();
RolesRouter.route('/').post(_rolesController.getRoles);
RolesRouter.route('/user').post(_rolesController.getUserRoles);
RolesRouter.route('/rol').post(_rolesController.addRol);
RolesRouter.route('/')["delete"](_rolesController.deleteRol);
RolesRouter.route('/copy').post(_rolesController.copyRoles);
RolesRouter.route('/replace').post(_rolesController.replaceRoles);
var _default = RolesRouter;
exports["default"] = _default;