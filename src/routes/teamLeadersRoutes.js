import { Router } from "express";
import {  getTeamLeaders, getTeamLeadersById, postTeamLeaders, updateTeamLeaders,deleteTeamLeaders, getTeamLeadersActivos } from "../controllers/teamLeadersController";
import {  getGerentes} from "../controllers/gerentesController";
import { testConnection } from "../middlewares/testConnection";


const TeamLeadersRouter = Router()


TeamLeadersRouter.use(testConnection)

TeamLeadersRouter.route('/').get(getTeamLeaders);
TeamLeadersRouter.route('/activos').get(getTeamLeadersActivos);
TeamLeadersRouter.route('/id').post(getTeamLeadersById);
TeamLeadersRouter.route('/').post(postTeamLeaders);
TeamLeadersRouter.route('/').put(updateTeamLeaders);
TeamLeadersRouter.route('/').delete(deleteTeamLeaders);


export default TeamLeadersRouter