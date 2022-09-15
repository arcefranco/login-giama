import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { forgotPassword, tokenStatus, updatePass} from "../controllers/resetPassController";


const resetRouter = Router()

/* resetRouter.route('/forgot').post(forgotPassword) */
resetRouter.post('/forgot', forgotPassword)
resetRouter.get('/tokenStatus/:id/:token', verifyToken, tokenStatus) 
resetRouter.route('/updatePass').post(updatePass)

export default resetRouter