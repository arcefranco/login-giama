import { Router } from "express";
import { getAllUsers, login } from "../controllers/userController";

const UserRouter = Router()

UserRouter.route('/').get(getAllUsers)
UserRouter.route('/').post(login)


export default UserRouter