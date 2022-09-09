import {Sequelize,  DataTypes } from "sequelize";
import {app} from "./index"
require('dotenv').config()


function connection (req, res, next){
const {empresa} = req.body
if(app.get('db')){
    app.disable('db')
}

const sequelize = new Sequelize(empresa, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
})

sequelize.authenticate().then(() => { 
    console.log(`DB ${empresa} connected`)
})
.catch(err => {
    console.log('DB ERROR: ', err)
})

/*-----------------------MODELOS SEQUELIZE----------------------------*/
//GERENTES
const Gerente = sequelize.define('gerentes', {
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
Gerente.removeAttribute('id')  

//SUPERVISOR
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
    UsuarioAltaRegistro: {
        type:DataTypes.STRING,
           allowNull:false
       }

},{
freezeTableName:true,
timestamps:false,
})
Supervisor.removeAttribute('id')

//TEAM LEADER
const TeamLeader = sequelize.define('teamleader', {
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
TeamLeader.removeAttribute('id')  

//VENDEDORES
const Vendedores = sequelize.define('vendedores', {
    Codigo: {
        type:DataTypes.STRING,
    },
},{
freezeTableName:true,
timestamps:false,
}) 
Vendedores.removeAttribute('id')

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

req.db = db.sequelize
app.set('db', db.sequelize)
next();
}

export default connection