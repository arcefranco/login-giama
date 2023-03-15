import { Router } from "express";
import {
  getEfectividadAdj,
  getOficialAdj,
  getDetalleEfectividad,
} from "../../controllers/Operaciones/efectividadAdjController";
import { testConnection } from "../../middlewares/testConnection";
import { testConnectionAll } from "../../middlewares/testConnectionAll";

require("dotenv").config();

const efectividadAdj = Router();

efectividadAdj.use(testConnection);
efectividadAdj.post("/", testConnectionAll, getEfectividadAdj);
efectividadAdj.route("/oficiales").get(getOficialAdj);
efectividadAdj.route("/detalle").post(getDetalleEfectividad);
export default efectividadAdj;
