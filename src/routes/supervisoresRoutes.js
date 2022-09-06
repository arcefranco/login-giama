import { Router } from "express";
import {  getSupervisores, getSupervisoresById, postSupervisores, updateSupervisores,deleteSupervisores, getAllZonas } from "../controllers/supervisoresController";
import {  getGerentes} from "../controllers/gerentesController";
import { errorHandling } from "../middlewares/errorHandling";


const SupervisoresRouter = Router()

SupervisoresRouter.use(errorHandling)


SupervisoresRouter.route('/').get(getSupervisores);
SupervisoresRouter.route('/id').post(getSupervisoresById);
SupervisoresRouter.route('/').post(postSupervisores);
SupervisoresRouter.route('/').put(updateSupervisores);
SupervisoresRouter.route('/').delete(deleteSupervisores);

//get gerentes, zonas
SupervisoresRouter.route('/gerentes').get(getGerentes)
SupervisoresRouter.route('/zonas').get(getAllZonas)

export default SupervisoresRouter