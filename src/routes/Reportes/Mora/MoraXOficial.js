import { Router } from "express";
import { testConnection } from "../../../middlewares/testConnection";
import { getMoraXOficial } from "../../../controllers/Reportes/Mora/MoraXOficial";
require("dotenv").config();

const moraXOficial = Router();

moraXOficial.use(testConnection);

moraXOficial.route("/").post(getMoraXOficial);

export default moraXOficial;
