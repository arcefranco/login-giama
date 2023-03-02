import { Router } from "express";
import {
  getEfectividadAdj,
  getOficialAdj,
} from "../../controllers/Operaciones/efectividadAdjController";
import { testConnection } from "../../middlewares/testConnection";

require("dotenv").config();

const efectividadAdj = Router();

efectividadAdj.use(testConnection);

efectividadAdj.route("/").post(getEfectividadAdj);
efectividadAdj.route("/oficiales").get(getOficialAdj);
export default efectividadAdj;
