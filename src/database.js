import {Sequelize} from "sequelize";

const sequelize = new Sequelize('pa7', 'franco', 'password',{
    host: 'giama-db-t3.cojfgn4yxtap.us-west-2.rds.amazonaws.com',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log('DB connected')
})
.catch(err => {
    console.log('DB ERROR: ', err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

export default db