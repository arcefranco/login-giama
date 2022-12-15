import { Router } from 'express';
import authentication from '../../middlewares/authentication';
import { getDatosPreSol, getModelos, getPreOperaciones, getOficialesMora, 
    getOficialesPC, getOficialesScoring, getOrigenSuscripcion, getPuntosVenta, getParametros, getFormasPago, 
    getIntereses, getTarjetas, pagoSenia, deletePago, updatePago } from '../../controllers/Operaciones/actualPreController';

import { testConnection } from '../../middlewares/testConnection';

require('dotenv').config()

const actualPreRouter = Router()

actualPreRouter.use(testConnection)

actualPreRouter.route('/solicitudes').post(getPreOperaciones)
actualPreRouter.route('/datosOp').post(getDatosPreSol)
actualPreRouter.route('/modelos').get(getModelos)
actualPreRouter.route('/oficialesmora').get(getOficialesMora)
actualPreRouter.route('/oficialespc').get(getOficialesPC)
actualPreRouter.route('/oficialesScoring').get(getOficialesScoring)
actualPreRouter.route('/origen').get(getOrigenSuscripcion)
actualPreRouter.route('/puntosventa').get(getPuntosVenta)
actualPreRouter.route('/parametros').get(getParametros)
actualPreRouter.route('/formasPago').get(getFormasPago)
actualPreRouter.route('/tarjetas').get(getTarjetas)
actualPreRouter.route('/intereses').get(getIntereses)
actualPreRouter.post('/pagoSenia', authentication, pagoSenia)
actualPreRouter.post('/deletePago', authentication, deletePago)
actualPreRouter.post('/updatePago', authentication, updatePago)


export default actualPreRouter
