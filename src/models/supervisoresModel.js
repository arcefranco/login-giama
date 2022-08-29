import {Sequelize, DataTypes} from 'sequelize'
require('dotenv').config()
const sequelize = new Sequelize(process.env.DB_NAME_CG, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
})


 const  Supervisor = sequelize.define('sucursales', {
        Codigo: {
            type:DataTypes.STRING,
        },
        Nombre: {
           type:DataTypes.STRING,
           allowNull:false
       },
       Email: {
        type:DataTypes.STRING,
        allowNull:false
        },
        Gerente: {
            type:DataTypes.STRING,
            allowNull:false
            },
        EsMiniEmprendedor: {
            type:DataTypes.BOOLEAN,
            allowNull:false
        },
        ValorPromedioMovil: {
            type:DataTypes.STRING,
            allowNull:false
            },
       Inactivo: {
           type:DataTypes.BOOLEAN,
           allowNull:false
       },
       Zona: {
        type:DataTypes.STRING,
        allowNull:false
        },

   },{
    freezeTableName:true,
    timestamps:false,
   })
   Supervisor.removeAttribute('id')

  module.exports = Supervisor
   
   