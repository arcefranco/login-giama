import { Router } from 'express';
import { getFromasPago, getIntereses, getModeloPrecio, getModelos, getModeloValorCuota, getOficialCanje, getOrigenSuscripcion, 
    getPuntosVenta, getSucursales, getSupervisores, getTarjetas, getTeamLeaders, getVendedores, verifyDoc, verifySolicitud, verifySolicitudStatus } from '../../controllers/Operaciones/altaPreController';
import { testConnection } from '../../middlewares/testConnection';

require('dotenv').config()

const altaPreRouter = Router()

altaPreRouter.use(testConnection)

altaPreRouter.route('/modelos').get(getModelos)
altaPreRouter.route('/sucursales').get(getSucursales)
altaPreRouter.route('/formaspago').get(getFromasPago)
altaPreRouter.route('/vendedores').get(getVendedores)
altaPreRouter.route('/puntosventa').get(getPuntosVenta)
altaPreRouter.route('/oficialcanje').get(getOficialCanje)
altaPreRouter.route('/teamleaders').get(getTeamLeaders)
altaPreRouter.route('/supervisores').get(getSupervisores)
altaPreRouter.route('/intereses').get(getIntereses)
altaPreRouter.route('/tarjetas').get(getTarjetas)
altaPreRouter.route('/origen').get(getOrigenSuscripcion)
altaPreRouter.route('/verify').post(verifySolicitud)
altaPreRouter.route('/solicitudStatus').post(verifySolicitudStatus)
altaPreRouter.route('/getValorCuota').post(getModeloValorCuota)
altaPreRouter.route('/getModeloPrecio').post(getModeloPrecio)
altaPreRouter.route('/verifyDoc').post(verifyDoc)

export default altaPreRouter