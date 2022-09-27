import {  QueryTypes } from 'sequelize';
import { Router } from 'express';
import { testConnection } from '../middlewares/testConnection';
import {queryEstructura} from '../queries'
require('dotenv').config()

const estructuraRouter = Router()

estructuraRouter.use(testConnection)

estructuraRouter.get('/', async (req, res) => {
    const dbGiama = req.db
    try {
        const allEstructura = await dbGiama.query(queryEstructura, {
            type: QueryTypes.SELECT
        })

        return res.send(allEstructura)
        
    } catch (error) {
        return res.send(error)
    }

})


export default estructuraRouter