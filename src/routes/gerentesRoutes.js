import { Router } from "express";
import {  getGerentes, getGerentesById, postGerentes, updateGerentes,deleteGerentes } from "../controllers/gerentesController";
import { errorHandling } from "../middlewares/errorHandling";
const GerentesRouter = Router()

GerentesRouter.use(errorHandling)

GerentesRouter.route('/').get(getGerentes);

GerentesRouter.route('/id').post(getGerentesById);

GerentesRouter.route('/').post(postGerentes);
 
GerentesRouter.route('/').put(updateGerentes);

GerentesRouter.route('/').delete(deleteGerentes);


export default GerentesRouter