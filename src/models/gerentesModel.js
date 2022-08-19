import {Sequelize, DataTypes} from 'sequelize'
const sequelize = new Sequelize('pa7', 'franco', 'password',{
    host: 'giama-db-t3.cojfgn4yxtap.us-west-2.rds.amazonaws.com',
    dialect: 'mysql'
});

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
   
   