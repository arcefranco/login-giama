import {Sequelize,  DataTypes } from "sequelize";
import {app} from "./index"
require('dotenv').config()


function connection (req, res, next){
const {empresa} = req.body
const emp = empresa;
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
 
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

req.db = db.sequelize
app.set('db', db.sequelize)
console.log('DB: ', app.get('db').models.gerentes)
next();
}

export default connection