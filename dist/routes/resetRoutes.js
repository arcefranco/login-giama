"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _verifyToken = require("../middlewares/verifyToken");

var _resetPassController = require("../controllers/resetPassController");

var resetRouter = (0, _express.Router)();
resetRouter.route('/forgot').post(_resetPassController.forgotPassword);
resetRouter.get('/tokenStatus/:id/:token', _verifyToken.verifyToken, _resetPassController.tokenStatus);
resetRouter.route('/updatePass').post(_resetPassController.updatePass);
var _default = resetRouter;
exports["default"] = _default;