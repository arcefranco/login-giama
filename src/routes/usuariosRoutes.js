import { Router } from "express";
import { createUsuario, getAllTeamLeaders, getAllGerentes, getAllSupervisores, getAllUsuarios, getAllVendedores, getUsuarioById } from "../controllers/usuariosController";

const usuariosRoutes = Router()

usuariosRoutes.route('/').get(getUsuarioById)
usuariosRoutes.route('/todos').get(getAllUsuarios)
usuariosRoutes.route('/').post(createUsuario)

//get vendedores, gerentes, teamleaders y supervisores

usuariosRoutes.route('/vendedores').get(getAllVendedores)
usuariosRoutes.route('/gerentes').get(getAllGerentes)
usuariosRoutes.route('/supervisores').get(getAllSupervisores)
usuariosRoutes.route('/teamLeaders').get(getAllTeamLeaders)
export default usuariosRoutes