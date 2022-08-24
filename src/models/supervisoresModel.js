import {Sequelize, DataTypes} from 'sequelize'
const sequelize = new Sequelize('pa7', 'franco', 'password',{
    host: 'giama-db-t3.cojfgn4yxtap.us-west-2.rds.amazonaws.com',
    dialect: 'mysql'
});

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
   
   