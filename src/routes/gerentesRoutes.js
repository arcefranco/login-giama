import { Router } from "express";
import {  getGerentes, getGerentesById, getGerentesActivos, postGerentes, updateGerentes, deleteGerentes} from "../controllers/gerentesController";
import { testConnection } from "../middlewares/testConnection";
const GerentesRouter = Router()

GerentesRouter.use(testConnection)

GerentesRouter.route('/').get(getGerentes);
 GerentesRouter.route('/activos').get(getGerentesActivos);
GerentesRouter.route('/id').post(getGerentesById);
GerentesRouter.route('/').post(postGerentes);
GerentesRouter.route('/').put(updateGerentes);
GerentesRouter.route('/').delete(deleteGerentes);



export default GerentesRouter