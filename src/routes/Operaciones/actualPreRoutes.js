import { Router } from 'express';
import { getDatosPreSol, getModelos, getPreOperaciones, getOficialesMora, 
    getOficialesPC, getOficialesScoring, getOrigenSuscripcion, getPuntosVenta, getParametros, getFormasPago } from '../../controllers/Operaciones/actualPreController';
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


export default actualPreRouter
