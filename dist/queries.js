"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryReportes = exports.queryOperaciones = exports.queryMora = void 0;
var queryOperaciones = "SELECT * FROM roles WHERE rl_codigo LIKE '1.2.%' AND rl_codigo NOT LIKE '1.2.6%' \nAND rl_codigo NOT LIKE '1.2.17%'\nAND rl_codigo NOT LIKE '1.2.11%' AND rl_codigo NOT LIKE '1.2.12%' AND rl_codigo NOT LIKE '1.2.13%' AND \nrl_codigo NOT LIKE '1.2.14%' AND rl_codigo NOT LIKE '1.2.15%' AND rl_codigo NOT LIKE '1.2.19%' \nAND rl_codigo NOT LIKE '1.2.2.%' AND rl_codigo NOT LIKE '1.2.1.%' AND rl_codigo NOT LIKE '1.2.1' \nAND rl_codigo NOT LIKE '1.2.2' AND rl_codigo NOT LIKE '1.2.20%' AND rl_codigo NOT LIKE '1.2.22%' \nAND rl_codigo NOT LIKE '1.2.3%' AND rl_codigo NOT LIKE '1.2.4%' AND rl_codigo NOT LIKE '1.2.5%' \nAND rl_codigo NOT LIKE '1.2.7%'";
exports.queryOperaciones = queryOperaciones;
var queryMora = "SELECT * FROM roles WHERE rl_codigo LIKE '1.4.%' AND rl_codigo NOT LIKE '1.4.1.%' \nAND rl_codigo NOT LIKE '1.4.13%' AND rl_codigo NOT LIKE '1.4.9%' AND rl_codigo NOT LIKE '1.4.1'  \nAND rl_codigo NOT LIKE '1.4.10' AND rl_codigo NOT LIKE '1.4.10.%'";
exports.queryMora = queryMora;
var queryReportes = "SELECT * FROM roles WHERE rl_codigo LIKE '1.10.%' AND rl_codigo NOT LIKE '1.10.1%'\nAND rl_codigo NOT LIKE '1.10.2%' AND rl_codigo NOT LIKE '1.10.3%' AND rl_codigo NOT LIKE '1.10.4%'\nAND rl_codigo NOT LIKE '1.10.5%' AND rl_codigo NOT LIKE '1.10.6%' AND rl_codigo NOT LIKE '1.10.7%'\nAND rl_codigo NOT LIKE '1.10.8%';";
exports.queryReportes = queryReportes;