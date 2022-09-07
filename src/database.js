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
   }
},{
freezeTableName:true,
timestamps:false,
}) 
Gerente.removeAttribute('id')  

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
 
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

req.db = db.sequelize
app.set('db', db.sequelize)
next();
}

export default connection