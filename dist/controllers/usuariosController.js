"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUsuario = exports.getUsuarioById = exports.getAllVendedores = exports.getAllUsuarios = exports.getAllTeamLeaders = exports.getAllSupervisores = exports.getAllGerentes = exports.deleteUsuario = exports.createUsuario = void 0;

var _sequelize = require("sequelize");

var _index = require("../index");

var _createPass = require("../helpers/passwords/createPass");

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getUsuarioById = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var dbGiama, id, usuarios;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dbGiama = _index.app.get('db');
            id = req.body.id;
            _context.next = 4;
            return dbGiama.query("SELECT usuarios.`ID`, usuarios.`emailtest` AS 'email', usuarios.`login` AS 'Usuario', usuarios.`Nombre`, vendedores.`Codigo` AS 'Vendedor', teamleader.`Codigo` AS 'TeamLeader',sucursales.`Codigo` AS 'Supervisor', gerentes.`Codigo` AS 'Gerente', usuarios.`UsuarioAnura`, usuarios.`VerSoloScoringAsignado`, usuarios.`us_bloqueado`, usuarios.`us_activo` FROM usuarios LEFT JOIN gerentes ON usuarios.`CodigoGerente` = gerentes.`Codigo` LEFT JOIN teamleader ON usuarios.`CodigoTeamLeader` = teamleader.`Codigo` LEFT JOIN vendedores ON usuarios.`CodigoVendedor` = vendedores.`Codigo` LEFT JOIN sucursales ON usuarios.`CodigoSucursal` = sucursales.`Codigo` WHERE ID = ?", {
              replacements: [id],
              type: _sequelize.QueryTypes.SELECT
            });

          case 4:
            usuarios = _context.sent;
            res.send(usuarios);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUsuarioById(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUsuarioById = getUsuarioById;

var getAllUsuarios = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var dbGiama, usuarios;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dbGiama = _index.app.get('db');
            _context2.next = 3;
            return dbGiama.query("SELECT usuarios.`ID`, usuarios.`login` AS 'Usuario', usuarios.`Nombre`, vendedores.`Nombre` AS 'Vendedor', teamleader.`Nombre` AS 'Team Leader',sucursales.`Nombre` AS 'Supervisor', gerentes.`Nombre` AS 'Gerente', usuarios.`UsuarioAnura`, usuarios.`VerSoloScoringAsignado`, usuarios.`us_bloqueado`, usuarios.`us_activo` FROM usuarios LEFT JOIN gerentes ON usuarios.`CodigoGerente` = gerentes.`Codigo` LEFT JOIN teamleader ON usuarios.`CodigoTeamLeader` = teamleader.`Codigo` LEFT JOIN vendedores ON usuarios.`CodigoVendedor` = vendedores.`Codigo` LEFT JOIN sucursales ON usuarios.`CodigoSucursal` = sucursales.`Codigo`");

          case 3:
            usuarios = _context2.sent;
            return _context2.abrupt("return", res.send(usuarios[0]));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAllUsuarios(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllUsuarios = getAllUsuarios;

var createUsuario = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body, Nombre, Usuario, password, confirmPassword, Vendedor, Supervisor, TeamLeader, Gerente, UsuarioAnura, us_activo, us_bloqueado, scoringAsignado, newUserBoolean, email, user, dbGiama, roles, finded, passAndSalt, passHashed, newSalt;

    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, Nombre = _req$body.Nombre, Usuario = _req$body.Usuario, password = _req$body.password, confirmPassword = _req$body.confirmPassword, Vendedor = _req$body.Vendedor, Supervisor = _req$body.Supervisor, TeamLeader = _req$body.TeamLeader, Gerente = _req$body.Gerente, UsuarioAnura = _req$body.UsuarioAnura, us_activo = _req$body.us_activo, us_bloqueado = _req$body.us_bloqueado, scoringAsignado = _req$body.scoringAsignado, newUserBoolean = _req$body.newUserBoolean, email = _req$body.email;
            user = req.usuario.user;
            dbGiama = _index.app.get('db');
            _context3.prev = 3;
            _context3.next = 6;
            return dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
              replacements: [user],
              type: _sequelize.QueryTypes.SELECT
            });

          case 6:
            roles = _context3.sent;
            console.log('roles: ', roles);
            finded = roles.find(function (e) {
              return e.rl_codigo === '1' || e.rl_codigo === '1.7.16.3.1';
            });

            if (finded) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", res.status(500).send({
              status: false,
              data: 'No tiene permitido realizar esta acción'
            }));

          case 11:
            _context3.next = 17;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](3);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(400).send({
              status: false,
              data: _context3.t0
            }));

          case 17:
            if (!(!Nombre || !Usuario || !password || !confirmPassword)) {
              _context3.next = 19;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              status: false,
              data: 'Faltan campos'
            }));

          case 19:
            if (!(password !== confirmPassword)) {
              _context3.next = 21;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              status: false,
              data: 'Las contraseñas deben coincidir'
            }));

          case 21:
            passAndSalt = (0, _createPass.createPass)(password);
            passHashed = passAndSalt.passHashed, newSalt = passAndSalt.newSalt;
            UsuarioAnura && typeof UsuarioAnura === 'string' ? UsuarioAnura = parseInt(UsuarioAnura) : UsuarioAnura = UsuarioAnura;
            TeamLeader && typeof TeamLeader === 'string' ? TeamLeader = parseInt(TeamLeader.split(' ')[0]) : TeamLeader = TeamLeader;
            Gerente && typeof Gerente === 'string' ? Gerente = parseInt(Gerente.split(' ')[0]) : Gerente = Gerente;
            Supervisor && typeof Supervisor === 'string' ? Supervisor = parseInt(Supervisor.split(' ')[0]) : Supervisor = Supervisor;
            Vendedor && typeof Vendedor === 'string' ? Vendedor = parseInt(Vendedor.split(' ')[0]) : Vendedor = Vendedor;
            _context3.prev = 28;
            _context3.next = 31;
            return dbGiama.query("INSERT INTO usuarios (login, salt, password_hash, Nombre, CodigoVendedor, CodigoSucursal, CodigoTeamLeader, CodigoGerente, UsuarioAnura, us_activo, us_bloqueado, VerSoloScoringAsignado, emailtest, newuserBoolean) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", {
              replacements: [Usuario, newSalt, passHashed, Nombre, Vendedor ? Vendedor : null, Supervisor ? Supervisor : null, TeamLeader ? TeamLeader : null, Gerente ? Gerente : null, UsuarioAnura ? UsuarioAnura : null, us_activo ? us_activo : 1, us_bloqueado ? us_bloqueado : 0, scoringAsignado ? scoringAsignado : null, email ? email : null, 1],
              type: _sequelize.QueryTypes.INSERT
            });

          case 31:
            return _context3.abrupt("return", res.send({
              status: true,
              data: 'Usuario creado con exito!'
            }));

          case 34:
            _context3.prev = 34;
            _context3.t1 = _context3["catch"](28);
            console.log('error en la DB: ', _context3.t1);
            return _context3.abrupt("return", res.status(400).send({
              status: false,
              data: "error al insertar en base de datos: ".concat(_context3.t1)
            }));

          case 38:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 13], [28, 34]]);
  }));

  return function createUsuario(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createUsuario = createUsuario;

var updateUsuario = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body2, ID, Nombre, Usuario, Vendedor, Supervisor, TeamLeader, Gerente, UsuarioAnura, us_activo, us_bloqueado, scoringAsignado, newUserBoolean, email, user, dbGiama, roles, finded, usuarioUpdated;

    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, ID = _req$body2.ID, Nombre = _req$body2.Nombre, Usuario = _req$body2.Usuario, Vendedor = _req$body2.Vendedor, Supervisor = _req$body2.Supervisor, TeamLeader = _req$body2.TeamLeader, Gerente = _req$body2.Gerente, UsuarioAnura = _req$body2.UsuarioAnura, us_activo = _req$body2.us_activo, us_bloqueado = _req$body2.us_bloqueado, scoringAsignado = _req$body2.scoringAsignado, newUserBoolean = _req$body2.newUserBoolean, email = _req$body2.email;
            user = req.usuario.user;
            dbGiama = _index.app.get('db');
            _context4.prev = 3;
            _context4.next = 6;
            return dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
              replacements: [user],
              type: _sequelize.QueryTypes.SELECT
            });

          case 6:
            roles = _context4.sent;
            console.log('roles: ', roles);
            finded = roles.find(function (e) {
              return e.rl_codigo === '1' || e.rl_codigo === '1.7.16.3.2';
            });

            if (finded) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(500).send({
              status: false,
              data: 'No tiene permitido realizar esta acción'
            }));

          case 11:
            _context4.next = 17;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](3);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(400).send({
              status: false,
              data: _context4.t0
            }));

          case 17:
            if (ID) {
              _context4.next = 19;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              status: false,
              data: 'sin provisto de ID'
            }));

          case 19:
            if (!(!Nombre || !Usuario)) {
              _context4.next = 21;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              status: false,
              data: 'Faltan campos'
            }));

          case 21:
            ID = parseInt(ID);
            UsuarioAnura && typeof UsuarioAnura === 'string' ? UsuarioAnura = parseInt(UsuarioAnura) : UsuarioAnura = UsuarioAnura;
            TeamLeader && typeof TeamLeader === 'string' ? TeamLeader = parseInt(TeamLeader.split(' ')[0]) : TeamLeader = TeamLeader;
            Gerente && typeof Gerente === 'string' ? Gerente = parseInt(Gerente.split(' ')[0]) : Gerente = Gerente;
            Supervisor && typeof Supervisor === 'string' ? Supervisor = parseInt(Supervisor.split(' ')[0]) : Supervisor = Supervisor;
            Vendedor && typeof Vendedor === 'string' ? Vendedor = parseInt(Vendedor.split(' ')[0]) : Vendedor = Vendedor;
            _context4.prev = 27;
            _context4.next = 30;
            return dbGiama.query("UPDATE usuarios SET login = ?, Nombre = ?, CodigoVendedor = ?,  CodigoSucursal = ?, CodigoTeamLeader = ?, CodigoGerente = ?, UsuarioAnura = ?, us_activo = ?, us_bloqueado = ?, VerSoloScoringAsignado = ?, emailtest = ?  WHERE ID = ?", {
              replacements: [Usuario, Nombre, Vendedor ? Vendedor : null, Supervisor ? Supervisor : null, TeamLeader ? TeamLeader : null, Gerente ? Gerente : null, UsuarioAnura ? UsuarioAnura : null, us_activo ? us_activo : 1, us_bloqueado ? us_bloqueado : 0, scoringAsignado ? scoringAsignado : null, email ? email : null, ID],
              type: _sequelize.QueryTypes.UPDATE
            });

          case 30:
            usuarioUpdated = _context4.sent;
            return _context4.abrupt("return", res.send({
              status: true,
              data: 'Usuario actualizado correctamente!'
            }));

          case 34:
            _context4.prev = 34;
            _context4.t1 = _context4["catch"](27);
            console.log('error en la DB: ', _context4.t1);
            return _context4.abrupt("return", res.status(400).send({
              status: false,
              data: 'error en la DB, probablemente el nombre de usuario esté en uso'
            }));

          case 38:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 13], [27, 34]]);
  }));

  return function updateUsuario(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUsuario = updateUsuario;

var deleteUsuario = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, dbGiama, user, roles, finded;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.body.Codigo.id;
            dbGiama = _index.app.get('db');

            if (id) {
              _context5.next = 4;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              status: false,
              data: 'Ningun id provisto'
            }));

          case 4:
            user = req.usuario.user;
            _context5.prev = 5;
            _context5.next = 8;
            return dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
              replacements: [user],
              type: _sequelize.QueryTypes.SELECT
            });

          case 8:
            roles = _context5.sent;
            console.log('roles: ', roles);
            finded = roles.find(function (e) {
              return e.rl_codigo === '1' || e.rl_codigo === '1.7.16.3';
            });

            if (finded) {
              _context5.next = 13;
              break;
            }

            return _context5.abrupt("return", res.status(500).send({
              status: false,
              data: 'No tiene permitido realizar esta acción'
            }));

          case 13:
            _context5.next = 19;
            break;

          case 15:
            _context5.prev = 15;
            _context5.t0 = _context5["catch"](5);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(400).send({
              status: false,
              data: _context5.t0
            }));

          case 19:
            _context5.prev = 19;
            _context5.next = 22;
            return dbGiama.query("DELETE FROM usuarios WHERE ID = ?", {
              replacements: [id],
              type: _sequelize.QueryTypes.DELETE
            });

          case 22:
            return _context5.abrupt("return", res.send({
              status: true,
              data: 'Usuario eliminado correctamente'
            }));

          case 25:
            _context5.prev = 25;
            _context5.t1 = _context5["catch"](19);
            return _context5.abrupt("return", res.status(400).send({
              status: false,
              data: "error al eliminar en base de datos: ".concat(_context5.t1)
            }));

          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[5, 15], [19, 25]]);
  }));

  return function deleteUsuario(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteUsuario = deleteUsuario;

var getAllVendedores = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var dbGiama, result;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            dbGiama = _index.app.get('db');
            _context6.next = 3;
            return dbGiama.query("SELECT Codigo, Nombre from vendedores");

          case 3:
            result = _context6.sent;
            res.send(result[0]);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getAllVendedores(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getAllVendedores = getAllVendedores;

var getAllGerentes = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var dbGiama, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            dbGiama = _index.app.get('db');
            _context7.next = 3;
            return dbGiama.query("SELECT Codigo, Nombre from gerentes");

          case 3:
            result = _context7.sent;
            res.send(result[0]);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getAllGerentes(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getAllGerentes = getAllGerentes;

var getAllSupervisores = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var dbGiama, result;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            dbGiama = _index.app.get('db');
            _context8.next = 3;
            return dbGiama.query("SELECT Codigo, Nombre from sucursales");

          case 3:
            result = _context8.sent;
            res.send(result[0]);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getAllSupervisores(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getAllSupervisores = getAllSupervisores;

var getAllTeamLeaders = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var dbGiama, result;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            dbGiama = _index.app.get('db');
            _context9.next = 3;
            return dbGiama.query("SELECT Codigo, Nombre from teamleader");

          case 3:
            result = _context9.sent;
            res.send(result[0]);

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function getAllTeamLeaders(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.getAllTeamLeaders = getAllTeamLeaders;