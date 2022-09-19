import { Router } from "express";
import {  getSupervisores, getSupervisoresById, postSupervisores, updateSupervisores,deleteSupervisores, getAllZonas, getSupervisoresActivos, endUpdate } from "../controllers/supervisoresController";
import {  getGerentes, getGerentesActivos} from "../controllers/gerentesController";
import { testConnection } from "../middlewares/testConnection";
import authentication from "../middlewares/authentication";



const SupervisoresRouter = Router()


SupervisoresRouter.use(testConnection)

SupervisoresRouter.route('/').get(getSupervisores);
SupervisoresRouter.route('/activos').get(getSupervisoresActivos);
SupervisoresRouter.post('/id', authentication, getSupervisoresById)
SupervisoresRouter.post('/endUpdate', authentication, endUpdate) 
SupervisoresRouter.route('/').post(postSupervisores);
SupervisoresRouter.route('/').put(updateSupervisores);
SupervisoresRouter.route('/').delete(deleteSupervisores);


//get gerentes, zonas
SupervisoresRouter.route('/gerentes').get(getGerentes)
/* SupervisoresRouter.route('/gerentesActivos').get(getGerentesActivos) */
SupervisoresRouter.route('/zonas').get(getAllZonas)

export default SupervisoresRouter