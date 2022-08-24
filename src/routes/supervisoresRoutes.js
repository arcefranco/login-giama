import { Router } from "express";
import {  getSupervisores, getSupervisoresById, postSupervisores, updateSupervisores,deleteSupervisores } from "../controllers/supervisoresController";

const SupervisoresRouter = Router()

SupervisoresRouter.route('/').get(getSupervisores);

SupervisoresRouter.route('/id').post(getSupervisoresById);

SupervisoresRouter.route('/').post(postSupervisores);

SupervisoresRouter.route('/').put(updateSupervisores);

SupervisoresRouter.route('/').delete(deleteSupervisores);


export default SupervisoresRouter