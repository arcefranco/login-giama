import { Router } from 'express';
import { getDatosPreSol, getModelos, getPreOperaciones, getOficialesMora, 
    getOficialesPC, getOficialesScoring, getOrigenSuscripcion, getPuntosVenta } from '../../controllers/Operaciones/actualPreController';
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


export default actualPreRouter
