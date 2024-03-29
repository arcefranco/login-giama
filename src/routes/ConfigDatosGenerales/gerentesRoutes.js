import { Router } from "express";
import {  getGerentes, getGerentesById, getGerentesActivos, postGerentes, 
    updateGerentes, beginUpdate, deleteGerentes, endUpdate} from "../../controllers/ConfigDatosGenerales/gerentesController";

import { testConnection } from "../../middlewares/testConnection";
import authentication from "../../middlewares/authentication";
const GerentesRouter = Router()

GerentesRouter.use(testConnection)

GerentesRouter.route('/').get(getGerentes);
GerentesRouter.route('/activos').get(getGerentesActivos);
GerentesRouter.post('/endUpdate', authentication, endUpdate)
GerentesRouter.post('/beginUpdate', authentication, beginUpdate)
GerentesRouter.post('/', authentication, postGerentes);
GerentesRouter.put('/', authentication, updateGerentes);
GerentesRouter.route('/').delete(deleteGerentes);



export default GerentesRouter