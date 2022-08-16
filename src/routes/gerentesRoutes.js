import { Router } from "express";
import {  getGerentes, postGerentes } from "../controllers/gerentesController";

const GerentesRouter = Router()

GerentesRouter.route('/').get(getGerentes);

GerentesRouter.route('/').post(postGerentes);

export default GerentesRouter