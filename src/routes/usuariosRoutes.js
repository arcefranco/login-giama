import { Router } from "express";
import { createUsuario, getAllTeamLeaders, getAllGerentes, getAllSupervisores, getAllUsuarios, 
    getAllVendedores, getUsuarioById, updateUsuario, deleteUsuario, endUpdate, beginUpdate } from "../controllers/usuariosController";
import authentication from "../middlewares/authentication";
import { testConnection } from "../middlewares/testConnection";


const usuariosRoutes = Router()

usuariosRoutes.use(testConnection)

usuariosRoutes.post('/id', authentication, getUsuarioById) 
usuariosRoutes.route('/todos').get(getAllUsuarios)
usuariosRoutes.post('/', authentication, createUsuario) 
usuariosRoutes.put('/', authentication, updateUsuario)
usuariosRoutes.delete('/', authentication, deleteUsuario)
usuariosRoutes.post('/endUpdate', authentication, endUpdate)
usuariosRoutes.post('/beginUpdate', authentication, beginUpdate)
//get vendedores, gerentes, teamleaders y supervisores

usuariosRoutes.route('/vendedores').get(getAllVendedores) 
usuariosRoutes.route('/gerentes').get(getAllGerentes) 
usuariosRoutes.route('/supervisores').get(getAllSupervisores)
usuariosRoutes.route('/teamLeaders').get(getAllTeamLeaders)
export default usuariosRoutes