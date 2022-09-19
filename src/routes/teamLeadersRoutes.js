import { Router } from "express";
import {  getTeamLeaders, getTeamLeadersById, postTeamLeaders, updateTeamLeaders,deleteTeamLeaders, getTeamLeadersActivos, endUpdate } from "../controllers/teamLeadersController";
import {  getGerentes} from "../controllers/gerentesController";
import { testConnection } from "../middlewares/testConnection";
import authentication from "../middlewares/authentication";


const TeamLeadersRouter = Router()


TeamLeadersRouter.use(testConnection)

TeamLeadersRouter.route('/').get(getTeamLeaders);
TeamLeadersRouter.route('/activos').get(getTeamLeadersActivos);
TeamLeadersRouter.post('/id', authentication, getTeamLeadersById)
TeamLeadersRouter.post('/endUpdate', authentication, endUpdate)
TeamLeadersRouter.route('/').post(postTeamLeaders);
TeamLeadersRouter.route('/').put(updateTeamLeaders);
TeamLeadersRouter.route('/').delete(deleteTeamLeaders);


export default TeamLeadersRouter