import { Router } from "express";
import { getAllUsuarios, getUsuarioById } from "../controllers/usuariosController";

const usuariosRoutes = Router()

usuariosRoutes.route('/').get(getUsuarioById)
usuariosRoutes.route('/todos').get(getAllUsuarios)

export default usuariosRoutes