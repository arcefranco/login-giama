import { Router } from "express";
import { testConnection } from "../../../middlewares/testConnection";
import {
  getMoraXVendedor,
  getMoraXSupervisor,
  getMoraDetalle,
  getOficialAdj,
} from "../../../controllers/Reportes/Mora/MoraPorVendedorYSup";
require("dotenv").config();

const moraXVendedorYSupRouter = Router();

moraXVendedorYSupRouter.use(testConnection);

moraXVendedorYSupRouter.route("/").post(getMoraXVendedor);
moraXVendedorYSupRouter.route("/sup").post(getMoraXSupervisor);
moraXVendedorYSupRouter.route("/oficialAdj").post(getOficialAdj);
export default moraXVendedorYSupRouter;
