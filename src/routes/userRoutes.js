import { Router } from "express";
import { getAllUsers, login, getGerentes } from "../controllers/userController";

const UserRouter = Router()

UserRouter.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
UserRouter.route('/').get(getAllUsers)
UserRouter.route('/').post(login)
export default UserRouter