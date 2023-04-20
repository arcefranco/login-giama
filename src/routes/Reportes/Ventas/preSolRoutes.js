import {  QueryTypes } from 'sequelize';
import { Router } from 'express';
import { getPreSol, getDetalleIngresadas, getDetalleMP, getDetalleAnulRechazadas, 
    getDetalleCruceScoring, getDetalleProduccion, getDetallePendientes, getDetalleTresYSiete, getDetalleProdYCS } 
    from '../../../controllers/Reportes/Ventas/preSolController';
import { testConnection } from '../../../middlewares/testConnection';
require('dotenv').config()

const ventasPreSol = Router()

ventasPreSol.use(testConnection)

ventasPreSol.post('/', getPreSol)
ventasPreSol.post('/ingresadas', getDetalleIngresadas)
ventasPreSol.post('/mp', getDetalleMP)
ventasPreSol.post('/anulRechaz', getDetalleAnulRechazadas)
ventasPreSol.post('/cruceScoring', getDetalleCruceScoring)
ventasPreSol.post('/produccion', getDetalleProduccion)
ventasPreSol.post('/pendientes', getDetallePendientes)
ventasPreSol.post('/tresysiete', getDetalleTresYSiete)
ventasPreSol.post('/prodYCS', getDetalleProdYCS)

export default ventasPreSol