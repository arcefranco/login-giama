import { Router } from "express";
import { testConnection } from "../../../middlewares/testConnection";
import { getOperacionesXFecha } from "../../../controllers/Reportes/AdmPlanes/operacionesPorFecha";

require("dotenv").config();

const operacionesPorFecha = Router();

operacionesPorFecha.use(testConnection);

operacionesPorFecha.post("/", getOperacionesXFecha);

export default operacionesPorFecha;
