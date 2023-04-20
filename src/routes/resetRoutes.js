import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { forgotPassword, tokenStatus, updatePass} from "../controllers/resetPassController";
import { testConnection } from "../middlewares/testConnection";

const resetRouter = Router()

/* resetRouter.route('/forgot').post(forgotPassword) */
resetRouter.post('/forgot', forgotPassword)
resetRouter.get('/tokenStatus/:id/:token', testConnection, verifyToken, tokenStatus) 
resetRouter.post('/updatePass', testConnection, updatePass)

export default resetRouter