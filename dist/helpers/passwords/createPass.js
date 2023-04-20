"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPass = void 0;

var _crypto = require("crypto");

var getRandomValues = require('get-random-values');

var createPass = function createPass(password) {
  var generateNewSalt = function generateNewSalt() {
    var buffer = new Buffer.alloc(31);
    buffer = getRandomValues(buffer);
    return buffer.toString('base64');
  };

  var newSalt = generateNewSalt();
  console.log(newSalt);
  var pwdsalt = password + newSalt;
  var storedSaltBytes = new Buffer.from(pwdsalt, 'utf-8');
  var sha256 = (0, _crypto.createHash)("sha256");
  sha256.update(storedSaltBytes, "utf8");
  var result = sha256.digest("base64");
  return {
    passHashed: result,
    newSalt: newSalt
  };
};

exports.createPass = createPass;