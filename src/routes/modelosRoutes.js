import { Router } from "express";
import {  getModelos, getModelosById, postModelos, updateModelos,deleteModelos, endCommit, getTipoPlan, getModelosActivos, getCuotas } from "../controllers/modelosController";
import { errorHandling } from "../middlewares/errorHandling";
const ModelosRouter = Router()

ModelosRouter.use(errorHandling)
ModelosRouter.route('/').get(getModelos);
// ModelosRouter.route('/cuotas').get(getCuotas);

ModelosRouter.route('/tipoplan').get(getTipoPlan);
// ModelosRouter.route('/activos').get(getModelosActivos);
ModelosRouter.route('/id').post(getModelosById);
ModelosRouter.route('/').post(postModelos);
ModelosRouter.route('/').put(updateModelos);
ModelosRouter.route('/').delete(deleteModelos);
ModelosRouter.get('/endCommit', endCommit)


export default ModelosRouter