import { Router } from "express";
import { createUsuario, getAllTeamLeaders, getAllGerentes, getAllSupervisores, getAllUsuarios, 
    getAllVendedores, getUsuarioById, updateUsuario, deleteUsuario } from "../controllers/usuariosController";
import authentication from "../middlewares/authentication";

const usuariosRoutes = Router()

usuariosRoutes.route('/id').post(getUsuarioById)
usuariosRoutes.route('/todos').get(getAllUsuarios)
usuariosRoutes.post('/', authentication, createUsuario) 
usuariosRoutes.put('/', authentication, updateUsuario)
usuariosRoutes.delete('/', authentication, deleteUsuario)

//get vendedores, gerentes, teamleaders y supervisores

usuariosRoutes.route('/vendedores').get(getAllVendedores) 
usuariosRoutes.route('/gerentes').get(getAllGerentes) 
usuariosRoutes.route('/supervisores').get(getAllSupervisores)
usuariosRoutes.route('/teamLeaders').get(getAllTeamLeaders)
export default usuariosRoutes