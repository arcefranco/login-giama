import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { forgotPassword, tokenStatus, updatePass} from "../controllers/authController";

const AuthRouter = Router()

AuthRouter.route('/forgot').post(forgotPassword)
AuthRouter.get('/tokenStatus/:id/:token', verifyToken, tokenStatus) 
AuthRouter.route('/updatePass').post(updatePass)

export default AuthRouter