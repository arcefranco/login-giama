import { Router } from "express";
import { getRoles, getUserRoles, addRol, deleteRol, copyRoles } from "../controllers/rolesController";

const RolesRouter = Router()

RolesRouter.route('/').post(getRoles)
RolesRouter.route('/user').post(getUserRoles)
RolesRouter.route('/rol').post(addRol)
RolesRouter.route('/').delete(deleteRol)
RolesRouter.route('/copy').post(copyRoles)
export default RolesRouter