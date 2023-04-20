"use strict";

var _sequelize = require("sequelize");

require('dotenv').config();

var sequelize = new _sequelize.Sequelize(process.env.DB_NAME_CG, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});
var Supervisor = sequelize.define('sucursales', {
  Codigo: {
    type: _sequelize.DataTypes.STRING
  },
  Nombre: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  Gerente: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  EsMiniEmprendedor: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false
  },
  ValorPromedioMovil: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  Inactivo: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false
  },
  Zona: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
});
Supervisor.removeAttribute('id');
module.exports = Supervisor;