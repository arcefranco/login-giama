import {Sequelize} from "sequelize";
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
 
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

req.db = db.sequelize
app.set('db', db.sequelize)
next();
}

export default connection