import { Router } from "express";
import {  getGerentes } from "../controllers/userController";

const GerentesRouter = Router()

GerentesRouter.route('/').get(getGerentes)


export default GerentesRouter