import { Router } from "express";
import { getRoles, getUserRoles, addRol, deleteRol, copyRoles, replaceRoles, giveMaster } from "../controllers/rolesController";
import { errorHandling } from "../middlewares/errorHandling";

const RolesRouter = Router()
RolesRouter.use(errorHandling)
RolesRouter.route('/').post(getRoles)
RolesRouter.route('/user').post(getUserRoles)
RolesRouter.route('/rol').post(addRol)
RolesRouter.route('/').delete(deleteRol)
RolesRouter.route('/copy').post(copyRoles)
RolesRouter.route('/replace').post(replaceRoles)
RolesRouter.route('/master').post(giveMaster)
export default RolesRouter