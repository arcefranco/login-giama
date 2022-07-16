"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var sequelize = new _sequelize.Sequelize('pa7', 'franco', 'password', {
  host: 'giama-db-t3.cojfgn4yxtap.us-west-2.rds.amazonaws.com',
  dialect: 'mysql'
});
sequelize.authenticate().then(function () {
  console.log('DB connected');
})["catch"](function (err) {
  console.log('DB ERROR: ', err);
});
var db = {};
db.Sequelize = _sequelize.Sequelize;
db.sequelize = sequelize;
var _default = db;
exports["default"] = _default;