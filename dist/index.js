"use strict";

var _express = _interopRequireDefault(require("express"));

var _database = _interopRequireDefault(require("./database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
_database["default"].sequelize;
app.listen(3001, function () {
  console.log("Our app is running on port 3001");
});