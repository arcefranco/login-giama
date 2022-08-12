import { Router } from "express";
import { forgotPassword, resetPassword } from "../controllers/authController";
const AuthRouter = Router()

AuthRouter.route('/forgot').post(forgotPassword)
AuthRouter.route('/reset-password/:id/:token').get(resetPassword)

export default AuthRouter