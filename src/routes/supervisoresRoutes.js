import { Router } from "express";
import {  getSupervisores, getSupervisoresById, postSupervisores, updateSupervisores,deleteSupervisores, getAllZonas, endCommit, getSupervisoresActivos } from "../controllers/supervisoresController";
import {  getGerentes, getGerentesActivos} from "../controllers/gerentesController";
import { errorHandling } from "../middlewares/errorHandling";


const SupervisoresRouter = Router()

SupervisoresRouter.use(errorHandling)


SupervisoresRouter.route('/').get(getSupervisores);
SupervisoresRouter.route('/activos').get(getSupervisoresActivos);
SupervisoresRouter.route('/id').post(getSupervisoresById);
SupervisoresRouter.route('/').post(postSupervisores);
SupervisoresRouter.route('/').put(updateSupervisores);
SupervisoresRouter.route('/').delete(deleteSupervisores);
SupervisoresRouter.get('/endCommit', endCommit)

//get gerentes, zonas
SupervisoresRouter.route('/gerentes').get(getGerentes)
SupervisoresRouter.route('/gerentesActivos').get(getGerentesActivos)
SupervisoresRouter.route('/zonas').get(getAllZonas)

export default SupervisoresRouter