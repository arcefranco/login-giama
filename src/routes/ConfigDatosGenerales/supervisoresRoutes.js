import { Router } from "express";
import {  getSupervisores, postSupervisores, updateSupervisores,deleteSupervisores, 
    beginUpdate, getAllZonas, getSupervisoresActivos, endUpdate } from "../../controllers/ConfigDatosGenerales/supervisoresController";
import {  getGerentes, getGerentesActivos} from "../../controllers/ConfigDatosGenerales/gerentesController";
import { testConnection } from "../../middlewares/testConnection";
import authentication from "../../middlewares/authentication";



const SupervisoresRouter = Router()


SupervisoresRouter.use(testConnection)

SupervisoresRouter.route('/').get(getSupervisores);
SupervisoresRouter.route('/activos').get(getSupervisoresActivos);
SupervisoresRouter.post('/endUpdate', authentication, endUpdate) 
SupervisoresRouter.post('/beginUpdate', authentication, beginUpdate)
SupervisoresRouter.post('/', authentication, postSupervisores);
SupervisoresRouter.put('/', authentication, updateSupervisores)
SupervisoresRouter.delete('/', authentication, deleteSupervisores)


//get gerentes, zonas
SupervisoresRouter.route('/gerentes').get(getGerentes)
/* SupervisoresRouter.route('/gerentesActivos').get(getGerentesActivos) */
SupervisoresRouter.route('/zonas').get(getAllZonas)

export default SupervisoresRouter