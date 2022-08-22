import { Router } from "express";
import { createUsuario, getAllTeamLeaders, getAllGerentes, getAllSupervisores, getAllUsuarios, 
    getAllVendedores, getUsuarioById, updateUsuario, deleteUsuario } from "../controllers/usuariosController";

const usuariosRoutes = Router()

usuariosRoutes.route('/id').post(getUsuarioById)
usuariosRoutes.route('/todos').get(getAllUsuarios)
usuariosRoutes.route('/').post(createUsuario)
usuariosRoutes.route('/').put(updateUsuario)
usuariosRoutes.route('/').delete(deleteUsuario)

//get vendedores, gerentes, teamleaders y supervisores

usuariosRoutes.route('/vendedores').get(getAllVendedores) 
usuariosRoutes.route('/gerentes').get(getAllGerentes)
usuariosRoutes.route('/supervisores').get(getAllSupervisores)
usuariosRoutes.route('/teamLeaders').get(getAllTeamLeaders)
export default usuariosRoutes