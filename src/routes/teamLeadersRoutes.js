import { Router } from "express";
import {  getTeamLeaders, getTeamLeadersById, postTeamLeaders, updateTeamLeaders,deleteTeamLeaders, getAllZonas, endCommit } from "../controllers/teamLeadersController";
import {  getGerentes} from "../controllers/gerentesController";
import { errorHandling } from "../middlewares/errorHandling";


const TeamLeadersRouter = Router()

TeamLeadersRouter.use(errorHandling)

TeamLeadersRouter.route('/').get(getTeamLeaders);
TeamLeadersRouter.route('/id').post(getTeamLeadersById);
TeamLeadersRouter.route('/').post(postTeamLeaders);
TeamLeadersRouter.route('/').put(updateTeamLeaders);
TeamLeadersRouter.route('/').delete(deleteTeamLeaders);
TeamLeadersRouter.get('/endCommit', endCommit);
TeamLeadersRouter.route('/gerentes').get(getGerentes);

export default TeamLeadersRouter