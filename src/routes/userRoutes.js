import { Router } from "express";
import { getAllUsers, login, logout } from "../controllers/userController";

const passport = require('passport')
require('../config/passport')(passport)


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
UserRouter.post('/logout', logout)

export default UserRouter