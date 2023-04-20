"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyPass = void 0;

var _crypto = require("crypto");

var verifyPass = function verifyPass(pwdsalt) {
  var storedSaltBytes = new Buffer.from(pwdsalt, 'utf-8');
  var sha256 = (0, _crypto.createHash)("sha256");
  sha256.update(storedSaltBytes, "utf8");
  var result = sha256.digest("base64");
  return result;
};

exports.verifyPass = verifyPass;