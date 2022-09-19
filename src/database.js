import {Sequelize,  DataTypes } from "sequelize";
import {app} from "./index"
require('dotenv').config()



/* const sequelize = new Sequelize('pa7', process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
}) */



/* sequelize.authenticate().then(() => { 
    console.log(`DB pa7 connected`)
})
.catch(err => {
    console.log('DB ERROR: ', err)
}) */

/*-----------------------MODELOS SEQUELIZE----------------------------*/
//GERENTES
/* const Gerente = sequelize.define('gerentes', {
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
   },
   UsuarioAltaRegistro: {
    type:DataTypes.STRING,
       allowNull:false
   }
},{
freezeTableName:true,
timestamps:false,
}) 
Gerente.removeAttribute('id')   */

//SUPERVISOR
/* const  Supervisor = sequelize.define('sucursales', {
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
    UsuarioAltaRegistro: {
        type:DataTypes.STRING,
           allowNull:false
       }

},{
freezeTableName:true,
timestamps:false,
})
Supervisor.removeAttribute('id') */

//TEAM LEADER
/* const TeamLeader = sequelize.define('teamleader', {
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
   },
   UsuarioAltaRegistro: {
    type:DataTypes.STRING,
       allowNull:false
   }
},{
freezeTableName:true,
timestamps:false,
}) 
TeamLeader.removeAttribute('id')   */

//VENDEDORES
/* const Vendedores = sequelize.define('vendedores', {
    Codigo: {
        type:DataTypes.STRING,
    },
},{
freezeTableName:true,
timestamps:false,
}) 
Vendedores.removeAttribute('id') */

<<<<<<< HEAD
=======


>>>>>>> 8a029afd216379359bda51a72fd904038862d3e0
//MODELOS
const Modelos = sequelize.define('modelos', {
    Codigo: {
        type:DataTypes.STRING,
    },
},{
freezeTableName:true,
timestamps:false,
}) 
Modelos.removeAttribute('id')



/*const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


export default db */