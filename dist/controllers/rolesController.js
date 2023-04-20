"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceRoles = exports.getUserRoles = exports.getRoles = exports.deleteRol = exports.copyRoles = exports.addRol = void 0;

var _index = require("../index");

var _sequelize = require("sequelize");

var _queries = require("../queries");

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getRoles = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var dbGiama, rol, roles, _roles, _roles2, _roles3, _roles4, _roles5, _roles6, _roles7, _roles8, _roles9, _roles10, _roles11, _roles12, _roles13, _roles14, _roles15, _roles16, _roles17, _roles18, _roles19, _roles20, _roles21, _roles22, _roles23;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dbGiama = _index.app.get('db');
            console.log('el body', req.body);
            rol = req.body.rol;

            if (rol) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.send('No role provided'));

          case 7:
            if (!(rol === 'operaciones')) {
              _context.next = 21;
              break;
            }

            _context.prev = 8;
            _context.next = 11;
            return dbGiama.query(_queries.queryOperaciones);

          case 11:
            roles = _context.sent;
            return _context.abrupt("return", res.send(roles[0]));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](8);
            console.log(_context.t0);
            return _context.abrupt("return", res.send(_context.t0));

          case 19:
            _context.next = 340;
            break;

          case 21:
            if (!(rol === 'scoring')) {
              _context.next = 35;
              break;
            }

            _context.prev = 22;
            _context.next = 25;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.2.6.%' AND rl_codigo NOT LIKE '1.2.6.3%'");

          case 25:
            _roles = _context.sent;
            return _context.abrupt("return", res.send(_roles[0]));

          case 29:
            _context.prev = 29;
            _context.t1 = _context["catch"](22);
            console.log(_context.t1);
            return _context.abrupt("return", res.send(_context.t1));

          case 33:
            _context.next = 340;
            break;

          case 35:
            if (!(rol === 'mesa')) {
              _context.next = 49;
              break;
            }

            _context.prev = 36;
            _context.next = 39;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.3.7' OR rl_codigo LIKE '1.3.6'");

          case 39:
            _roles2 = _context.sent;
            return _context.abrupt("return", res.send(_roles2[0]));

          case 43:
            _context.prev = 43;
            _context.t2 = _context["catch"](36);
            console.log(_context.t2);
            return _context.abrupt("return", res.send(_context.t2));

          case 47:
            _context.next = 340;
            break;

          case 49:
            if (!(rol === 'mora')) {
              _context.next = 63;
              break;
            }

            _context.prev = 50;
            _context.next = 53;
            return dbGiama.query(_queries.queryMora);

          case 53:
            _roles3 = _context.sent;
            return _context.abrupt("return", res.send(_roles3[0]));

          case 57:
            _context.prev = 57;
            _context.t3 = _context["catch"](50);
            console.log(_context.t3);
            return _context.abrupt("return", res.send(_context.t3));

          case 61:
            _context.next = 340;
            break;

          case 63:
            if (!(rol === 'call')) {
              _context.next = 77;
              break;
            }

            _context.prev = 64;
            _context.next = 67;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.5.%' \n            AND rl_codigo NOT LIKE '1.5.1%' AND rl_codigo NOT LIKE '1.5.2%'");

          case 67:
            _roles4 = _context.sent;
            return _context.abrupt("return", res.send(_roles4[0]));

          case 71:
            _context.prev = 71;
            _context.t4 = _context["catch"](64);
            console.log(_context.t4);
            return _context.abrupt("return", res.send(_context.t4));

          case 75:
            _context.next = 340;
            break;

          case 77:
            if (!(rol === 'personal')) {
              _context.next = 91;
              break;
            }

            _context.prev = 78;
            _context.next = 81;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.6.%' AND rl_codigo \n            NOT LIKE '1.6.1%' AND rl_codigo NOT LIKE '1.6.2%'");

          case 81:
            _roles5 = _context.sent;
            return _context.abrupt("return", res.send(_roles5[0]));

          case 85:
            _context.prev = 85;
            _context.t5 = _context["catch"](78);
            console.log(_context.t5);
            return _context.abrupt("return", res.send(_context.t5));

          case 89:
            _context.next = 340;
            break;

          case 91:
            if (!(rol === 'config')) {
              _context.next = 105;
              break;
            }

            _context.prev = 92;
            _context.next = 95;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.7.10' OR rl_codigo LIKE '1.7.12' OR rl_codigo LIKE '1.7.20' \n            OR rl_codigo LIKE '1.7.4' OR rl_codigo LIKE '1.7.5'");

          case 95:
            _roles6 = _context.sent;
            return _context.abrupt("return", res.send(_roles6[0]));

          case 99:
            _context.prev = 99;
            _context.t6 = _context["catch"](92);
            console.log(_context.t6);
            return _context.abrupt("return", res.send(_context.t6));

          case 103:
            _context.next = 340;
            break;

          case 105:
            if (!(rol === 'configVendedores')) {
              _context.next = 119;
              break;
            }

            _context.prev = 106;
            _context.next = 109;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.7.1.%' AND rl_codigo NOT LIKE \n            '1.7.1.4%' AND rl_codigo NOT LIKE '1.7.1.5%';");

          case 109:
            _roles7 = _context.sent;
            return _context.abrupt("return", res.send(_roles7[0]));

          case 113:
            _context.prev = 113;
            _context.t7 = _context["catch"](106);
            console.log(_context.t7);
            return _context.abrupt("return", res.send(_context.t7));

          case 117:
            _context.next = 340;
            break;

          case 119:
            if (!(rol === 'objMesaDePlanes')) {
              _context.next = 133;
              break;
            }

            _context.prev = 120;
            _context.next = 123;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE \n            '1.7.14.%' AND rl_codigo NOT LIKE '1.7.14.3%';");

          case 123:
            _roles8 = _context.sent;
            return _context.abrupt("return", res.send(_roles8[0]));

          case 127:
            _context.prev = 127;
            _context.t8 = _context["catch"](120);
            console.log(_context.t8);
            return _context.abrupt("return", res.send(_context.t8));

          case 131:
            _context.next = 340;
            break;

          case 133:
            if (!(rol === 'tesoreria')) {
              _context.next = 147;
              break;
            }

            _context.prev = 134;
            _context.next = 137;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.8.1.%' \n            AND rl_codigo NOT LIKE '1.8.1.1%';");

          case 137:
            _roles9 = _context.sent;
            return _context.abrupt("return", res.send(_roles9[0]));

          case 141:
            _context.prev = 141;
            _context.t9 = _context["catch"](134);
            console.log(_context.t9);
            return _context.abrupt("return", res.send(_context.t9));

          case 145:
            _context.next = 340;
            break;

          case 147:
            if (!(rol === 'ventas')) {
              _context.next = 161;
              break;
            }

            _context.prev = 148;
            _context.next = 151;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.8.2.%' AND rl_codigo NOT LIKE '1.8.2.2%' \n            AND rl_codigo NOT LIKE '1.8.2.3%';");

          case 151:
            _roles10 = _context.sent;
            return _context.abrupt("return", res.send(_roles10[0]));

          case 155:
            _context.prev = 155;
            _context.t10 = _context["catch"](148);
            console.log(_context.t10);
            return _context.abrupt("return", res.send(_context.t10));

          case 159:
            _context.next = 340;
            break;

          case 161:
            if (!(rol === 'facturacion')) {
              _context.next = 175;
              break;
            }

            _context.prev = 162;
            _context.next = 165;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.8.2.3.%' AND rl_codigo NOT LIKE '1.8.2.3.10%' \n            AND rl_codigo NOT LIKE '1.8.2.3.4%' AND rl_codigo NOT LIKE '1.8.2.3.8%' AND rl_codigo NOT LIKE '1.8.2.3.9%';");

          case 165:
            _roles11 = _context.sent;
            return _context.abrupt("return", res.send(_roles11[0]));

          case 169:
            _context.prev = 169;
            _context.t11 = _context["catch"](162);
            console.log(_context.t11);
            return _context.abrupt("return", res.send(_context.t11));

          case 173:
            _context.next = 340;
            break;

          case 175:
            if (!(rol === 'facturacionElectronica')) {
              _context.next = 189;
              break;
            }

            _context.prev = 176;
            _context.next = 179;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.8.2.3.10%' \n            AND rl_codigo NOT LIKE '1.8.2.3.10.5%';");

          case 179:
            _roles12 = _context.sent;
            return _context.abrupt("return", res.send(_roles12[0]));

          case 183:
            _context.prev = 183;
            _context.t12 = _context["catch"](176);
            console.log(_context.t12);
            return _context.abrupt("return", res.send(_context.t12));

          case 187:
            _context.next = 340;
            break;

          case 189:
            if (!(rol === 'consultas')) {
              _context.next = 203;
              break;
            }

            _context.prev = 190;
            _context.next = 193;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.8.4.2.%' AND rl_codigo NOT LIKE '1.8.3.2%' \n            AND rl_codigo NOT LIKE '1.8.4.2.6%' AND rl_codigo NOT LIKE '1.8.4.2.7%';");

          case 193:
            _roles13 = _context.sent;
            return _context.abrupt("return", res.send(_roles13[0]));

          case 197:
            _context.prev = 197;
            _context.t13 = _context["catch"](190);
            console.log(_context.t13);
            return _context.abrupt("return", res.send(_context.t13));

          case 201:
            _context.next = 340;
            break;

          case 203:
            if (!(rol === 'clientesFacturacion')) {
              _context.next = 217;
              break;
            }

            _context.prev = 204;
            _context.next = 207;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.8.4.7.%' AND rl_codigo NOT LIKE '1.8.4.7.1%' \n            AND rl_codigo NOT LIKE '1.8.4.7.2%' AND rl_codigo NOT LIKE '1.8.4.7.4%';");

          case 207:
            _roles14 = _context.sent;
            return _context.abrupt("return", res.send(_roles14[0]));

          case 211:
            _context.prev = 211;
            _context.t14 = _context["catch"](204);
            console.log(_context.t14);
            return _context.abrupt("return", res.send(_context.t14));

          case 215:
            _context.next = 340;
            break;

          case 217:
            if (!(rol === 'proveedores')) {
              _context.next = 231;
              break;
            }

            _context.prev = 218;
            _context.next = 221;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.8.7.%' \n            AND rl_codigo NOT LIKE '1.8.7.1%';");

          case 221:
            _roles15 = _context.sent;
            return _context.abrupt("return", res.send(_roles15[0]));

          case 225:
            _context.prev = 225;
            _context.t15 = _context["catch"](218);
            console.log(_context.t15);
            return _context.abrupt("return", res.send(_context.t15));

          case 229:
            _context.next = 340;
            break;

          case 231:
            if (!(rol === 'registraciones')) {
              _context.next = 245;
              break;
            }

            _context.prev = 232;
            _context.next = 235;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.8.9.8.%' AND rl_codigo NOT LIKE '1.8.9.8.3%'\n            AND rl_codigo NOT LIKE '1.8.9.8.5%';");

          case 235:
            _roles16 = _context.sent;
            return _context.abrupt("return", res.send(_roles16[0]));

          case 239:
            _context.prev = 239;
            _context.t16 = _context["catch"](232);
            console.log(_context.t16);
            return _context.abrupt("return", res.send(_context.t16));

          case 243:
            _context.next = 340;
            break;

          case 245:
            if (!(rol === 'contabilidad2')) {
              _context.next = 259;
              break;
            }

            _context.prev = 246;
            _context.next = 249;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.9.%' \n            AND rl_codigo NOT LIKE '1.9.1.1%'");

          case 249:
            _roles17 = _context.sent;
            return _context.abrupt("return", res.send(_roles17[0]));

          case 253:
            _context.prev = 253;
            _context.t17 = _context["catch"](246);
            console.log(_context.t17);
            return _context.abrupt("return", res.send(_context.t17));

          case 257:
            _context.next = 340;
            break;

          case 259:
            if (!(rol === 'reportes')) {
              _context.next = 273;
              break;
            }

            _context.prev = 260;
            _context.next = 263;
            return dbGiama.query(_queries.queryReportes);

          case 263:
            _roles18 = _context.sent;
            return _context.abrupt("return", res.send(_roles18[0]));

          case 267:
            _context.prev = 267;
            _context.t18 = _context["catch"](260);
            console.log(_context.t18);
            return _context.abrupt("return", res.send(_context.t18));

          case 271:
            _context.next = 340;
            break;

          case 273:
            if (!(rol === 'reportesMora')) {
              _context.next = 287;
              break;
            }

            _context.prev = 274;
            _context.next = 277;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.10.3.%' AND rl_codigo NOT LIKE '1.10.3.4%' \n            AND rl_codigo NOT LIKE '1.10.3.5%' AND rl_codigo NOT LIKE '1.10.3.6%';");

          case 277:
            _roles19 = _context.sent;
            return _context.abrupt("return", res.send(_roles19[0]));

          case 281:
            _context.prev = 281;
            _context.t19 = _context["catch"](274);
            console.log(_context.t19);
            return _context.abrupt("return", res.send(_context.t19));

          case 285:
            _context.next = 340;
            break;

          case 287:
            if (!(rol === 'planSubite')) {
              _context.next = 301;
              break;
            }

            _context.prev = 288;
            _context.next = 291;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.11.%' AND rl_codigo NOT LIKE '1.11.1%' \n            AND rl_codigo NOT LIKE '1.11.4%';");

          case 291:
            _roles20 = _context.sent;
            return _context.abrupt("return", res.send(_roles20[0]));

          case 295:
            _context.prev = 295;
            _context.t20 = _context["catch"](288);
            console.log(_context.t20);
            return _context.abrupt("return", res.send(_context.t20));

          case 299:
            _context.next = 340;
            break;

          case 301:
            if (!(rol === 'compraRescindidos')) {
              _context.next = 315;
              break;
            }

            _context.prev = 302;
            _context.next = 305;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.14.%' AND rl_codigo NOT LIKE '1.14.1%' \n            AND rl_codigo NOT LIKE '1.14.4%';");

          case 305:
            _roles21 = _context.sent;
            return _context.abrupt("return", res.send(_roles21[0]));

          case 309:
            _context.prev = 309;
            _context.t21 = _context["catch"](302);
            console.log(_context.t21);
            return _context.abrupt("return", res.send(_context.t21));

          case 313:
            _context.next = 340;
            break;

          case 315:
            if (!(rol === 'usados')) {
              _context.next = 329;
              break;
            }

            _context.prev = 316;
            _context.next = 319;
            return dbGiama.query("SELECT * FROM roles WHERE rl_codigo LIKE '1.15.%' AND rl_codigo NOT LIKE '1.15.1' AND rl_codigo NOT LIKE '1.15.1.%' \n            AND rl_codigo NOT LIKE '1.15.14%' AND rl_codigo NOT LIKE '1.15.15%'AND rl_codigo NOT LIKE '1.15.7%';");

          case 319:
            _roles22 = _context.sent;
            return _context.abrupt("return", res.send(_roles22[0]));

          case 323:
            _context.prev = 323;
            _context.t22 = _context["catch"](316);
            console.log(_context.t22);
            return _context.abrupt("return", res.send(_context.t22));

          case 327:
            _context.next = 340;
            break;

          case 329:
            _context.prev = 329;
            _context.next = 332;
            return dbGiama.query('SELECT rl_codigo, rl_descripcion FROM roles WHERE rl_codigo LIKE ?', {
              replacements: [rol],
              type: _sequelize.QueryTypes.SELECT
            });

          case 332:
            _roles23 = _context.sent;
            return _context.abrupt("return", res.send(_roles23));

          case 336:
            _context.prev = 336;
            _context.t23 = _context["catch"](329);
            console.log(_context.t23);
            return _context.abrupt("return", res.send(_context.t23));

          case 340:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 15], [22, 29], [36, 43], [50, 57], [64, 71], [78, 85], [92, 99], [106, 113], [120, 127], [134, 141], [148, 155], [162, 169], [176, 183], [190, 197], [204, 211], [218, 225], [232, 239], [246, 253], [260, 267], [274, 281], [288, 295], [302, 309], [316, 323], [329, 336]]);
  }));

  return function getRoles(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getRoles = getRoles;

var getUserRoles = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var user, dbGiama, userRoles;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = req.body.user;
            dbGiama = _index.app.get('db');

            if (user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.send('No user provided'));

          case 6:
            _context2.prev = 6;
            _context2.next = 9;
            return dbGiama.query('SELECT rl_codigo FROM usuarios_has_roles WHERE us_login = ?', {
              replacements: [user],
              type: _sequelize.QueryTypes.SELECT
            });

          case 9:
            userRoles = _context2.sent;
            return _context2.abrupt("return", res.send(userRoles));

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](6);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.send(_context2.t0));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[6, 13]]);
  }));

  return function getUserRoles(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUserRoles = getUserRoles;

var addRol = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body, rol, Usuario, dbGiama;

    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, rol = _req$body.rol, Usuario = _req$body.Usuario;
            dbGiama = _index.app.get('db');

            if (!(!rol || !Usuario)) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.send('Faltan datos'));

          case 6:
            _context3.prev = 6;
            _context3.next = 9;
            return dbGiama.query('INSERT INTO usuarios_has_roles (us_login, rl_codigo) VALUES (?, ?)', {
              replacements: [Usuario, rol],
              type: _sequelize.QueryTypes.INSERT
            });

          case 9:
            return _context3.abrupt("return", res.send("El rol ha sido a\xF1adido correctamente al usuario ".concat(Usuario)));

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](6);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.send('Hubo un error al enviar los datos'));

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[6, 12]]);
  }));

  return function addRol(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.addRol = addRol;

var deleteRol = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var dbGiama, _req$body2, rol, Usuario;

    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            dbGiama = _index.app.get('db');
            _req$body2 = req.body, rol = _req$body2.rol, Usuario = _req$body2.Usuario;

            if (!(!rol || !Usuario)) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.send('Faltan datos'));

          case 6:
            _context4.prev = 6;
            _context4.next = 9;
            return dbGiama.query('DELETE FROM usuarios_has_roles WHERE us_login = ? AND rl_codigo = ?', {
              replacements: [Usuario, rol],
              type: _sequelize.QueryTypes.INSERT
            });

          case 9:
            return _context4.abrupt("return", res.send("El rol ha sido eliminado correctamente al usuario ".concat(Usuario)));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](6);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.send('Hubo un error al enviar los datos'));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 12]]);
  }));

  return function deleteRol(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteRol = deleteRol;

var copyRoles = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var dbGiama, _req$body3, userFrom, userTo, userHasRoles;

    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            dbGiama = _index.app.get('db');
            _req$body3 = req.body, userFrom = _req$body3.userFrom, userTo = _req$body3.userTo;

            if (!(!userFrom || !userTo)) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.send('Faltan datos'));

          case 6:
            _context5.prev = 6;
            _context5.next = 9;
            return dbGiama.query("SELECT * FROM usuarios_has_roles WHERE us_login = ?", {
              replacements: [userTo],
              type: _sequelize.QueryTypes.SELECT
            });

          case 9:
            userHasRoles = _context5.sent;

            if (!userHasRoles.length) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return", res.send({
              message: 'Esta seguro que desea sobreescribir los roles?',
              status: true
            }));

          case 12:
            _context5.next = 14;
            return dbGiama.query("INSERT INTO usuarios_has_roles (us_login, rl_codigo, uhr_activo) SELECT \n            ?, rl_codigo, uhr_activo\n            FROM usuarios_has_roles WHERE us_login = ?", {
              replacements: [userTo, userFrom],
              type: _sequelize.QueryTypes.INSERT
            });

          case 14:
            return _context5.abrupt("return", res.send("Roles de ".concat(userFrom, " copiados exitosamente a ").concat(userTo)));

          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5["catch"](6);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.send('Hubo un error: ', _context5.t0));

          case 21:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[6, 17]]);
  }));

  return function copyRoles(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.copyRoles = copyRoles;

var replaceRoles = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body4, userFrom, userTo, dbGiama;

    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body4 = req.body, userFrom = _req$body4.userFrom, userTo = _req$body4.userTo;
            dbGiama = _index.app.get('db');

            if (!(!userFrom || !userTo)) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", res.send('Faltan datos'));

          case 6:
            _context6.prev = 6;
            _context6.next = 9;
            return dbGiama.query("DELETE FROM usuarios_has_roles WHERE us_login = ?", {
              replacements: [userTo],
              type: _sequelize.QueryTypes.DELETE
            });

          case 9:
            _context6.next = 11;
            return dbGiama.query("INSERT INTO usuarios_has_roles (us_login, rl_codigo, uhr_activo) SELECT \n            ?, rl_codigo, uhr_activo\n            FROM usuarios_has_roles WHERE us_login = ?", {
              replacements: [userTo, userFrom],
              type: _sequelize.QueryTypes.INSERT
            });

          case 11:
            return _context6.abrupt("return", res.send("Roles de ".concat(userFrom, " copiados exitosamente a ").concat(userTo)));

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](6);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.send('Hubo un error: ', _context6.t0));

          case 18:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[6, 14]]);
  }));

  return function replaceRoles(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.replaceRoles = replaceRoles;