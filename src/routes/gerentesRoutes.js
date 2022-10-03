import { Router } from "express";
import {  getGerentes, getGerentesById, getGerentesActivos, postGerentes, updateGerentes, deleteGerentes, endUpdate} from "../controllers/gerentesController";
import { testConnection } from "../middlewares/testConnection";
import authentication from "../middlewares/authentication";
const GerentesRouter = Router()

GerentesRouter.use(testConnection)

GerentesRouter.route('/').get(getGerentes);
GerentesRouter.route('/activos').get(getGerentesActivos);
GerentesRouter.post('/id', authentication, getGerentesById) 
GerentesRouter.post('/endUpdate', authentication, endUpdate)
GerentesRouter.post('/', authentication, postGerentes);
GerentesRouter.put('/', authentication, updateGerentes);
GerentesRouter.route('/').delete(deleteGerentes);



export default GerentesRouter