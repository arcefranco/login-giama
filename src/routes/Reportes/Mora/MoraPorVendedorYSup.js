import { Router } from "express";
import { testConnection } from "../../../middlewares/testConnection";
import { getMoraXVendedor } from "../../../controllers/Reportes/Mora/MoraPorVendedorYSup";
require("dotenv").config();

const moraXVendedorYSupRouter = Router();

moraXVendedorYSupRouter.use(testConnection);

moraXVendedorYSupRouter.route("/").post(getMoraXVendedor);

export default moraXVendedorYSupRouter;
