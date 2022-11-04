import {  QueryTypes } from 'sequelize';
import { Router } from 'express';
import {testConnection} from '../../../middlewares/testConnection'
require('dotenv').config()

const reporteZonalRouter = Router()

reporteZonalRouter.use(testConnection)

reporteZonalRouter.post('/', async (req, res) => {
    const dbGiama = req.db
    console.log(req.body)
    const {fechaD, fechaH, pMes, pAnio} = req.body
    let fechaDConverted = fechaD.split("-").join("")
    let fechaHConverted = fechaH.split("-").join("") 
    try {
        dbGiama
        .query('CALL net_estadisticopresol_empresa (:p_FECHAD, :p_FECHAH, :p_PERIODO_OBJ_MES, :p_PERIODO_OBJ_ANIO)', 
              {replacements: { p_FECHAD: fechaDConverted, p_FECHAH: fechaHConverted, p_PERIODO_OBJ_MES: pMes, p_PERIODO_OBJ_ANIO: pAnio},
                type: QueryTypes.SELECT})
              .then(data=> { 
                return res.send({status: true, data: data}) 
            
            }); 
         
       
        
    } catch (error) {
        console.log(error)
        return res.send({status: false, data: 'Error al buscar los datos'})
    }
}


)



export default reporteZonalRouter