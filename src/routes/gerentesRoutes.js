import { Router } from "express";
<<<<<<< HEAD
import {  getGerentes, getGerentesById, postGerentes, updateGerentes,deleteGerentes } from "../controllers/gerentesController";
=======
import {  getGerentes, postGerentes , updateGerentes, deleteGerentes} from "../controllers/gerentesController";
>>>>>>> 34f216f31a06654ae63beea65309cb56a56ab077

const GerentesRouter = Router()

GerentesRouter.route('/').get(getGerentes);

GerentesRouter.route('/id').post(getGerentesById);

GerentesRouter.route('/').post(postGerentes);

GerentesRouter.route('/').put(updateGerentes);

GerentesRouter.route('/').delete(deleteGerentes);

<<<<<<< HEAD

=======
>>>>>>> 34f216f31a06654ae63beea65309cb56a56ab077
export default GerentesRouter