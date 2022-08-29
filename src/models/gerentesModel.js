import {Sequelize,DataTypes} from 'sequelize'
require('dotenv').config()
const sequelize = new Sequelize(process.env.DB_NAME_CG, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
})

 const  Gerente = sequelize.define('gerentes', {
        Codigo: {
            type:DataTypes.STRING,
        },
        Nombre: {
           type:DataTypes.STRING,
           allowNull:false
       },
       Activo: {
           type:DataTypes.BOOLEAN,
           allowNull:false
       }
   },{
    freezeTableName:true,
    timestamps:false,
   })
   Gerente.removeAttribute('id')

  module.exports = Gerente
   
   