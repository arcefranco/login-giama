import { Router } from "express";
import {  getTeamLeaders, beginUpdate, postTeamLeaders, updateTeamLeaders,deleteTeamLeaders, getTeamLeadersActivos, endUpdate } from "../controllers/teamLeadersController";
import {  getGerentes} from "../controllers/gerentesController";
import { testConnection } from "../middlewares/testConnection";
import authentication from "../middlewares/authentication";


const TeamLeadersRouter = Router()


TeamLeadersRouter.use(testConnection)

TeamLeadersRouter.route('/').get(getTeamLeaders);
TeamLeadersRouter.route('/activos').get(getTeamLeadersActivos);
TeamLeadersRouter.post('/beginUpdate', authentication, beginUpdate)
TeamLeadersRouter.post('/endUpdate', authentication, endUpdate)
TeamLeadersRouter.post('/', authentication, postTeamLeaders)
TeamLeadersRouter.put('/', authentication, updateTeamLeaders);
TeamLeadersRouter.delete('/', authentication, deleteTeamLeaders);


export default TeamLeadersRouter