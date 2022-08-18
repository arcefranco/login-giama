import { Router } from "express";
import {  getGerentes, postGerentes , updateGerentes, deleteGerentes} from "../controllers/gerentesController";

const GerentesRouter = Router()

GerentesRouter.route('/').get(getGerentes);

GerentesRouter.route('/').post(postGerentes);

GerentesRouter.route('/').put(updateGerentes);

GerentesRouter.route('/').delete(deleteGerentes);

export default GerentesRouter