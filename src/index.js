import express from "express";
import cors from "cors";
import morgan from "morgan";
import UserRouter from "./routes/userRoutes";
import GerentesRouter from "./routes/ConfigDatosGenerales/gerentesRoutes";
import resetRouter from "./routes/resetRoutes";
import usuariosRoutes from "./routes/ConfigDatosGenerales/usuariosRoutes";
import RolesRouter from "./routes/ConfigDatosGenerales/rolesRoutes";
import supervisoresRoutes from "./routes/ConfigDatosGenerales/supervisoresRoutes";
import SucursalesRouter from "./routes/ConfigDatosGenerales/sucursalesRoutes";
import TeamLeadersRouter from "./routes/ConfigDatosGenerales/teamLeadersRoutes";
import OficialesRouter from "./routes/ConfigDatosGenerales/oficialesRoutes";
import VendedoresRouter from "./routes/ConfigDatosGenerales/vendedoresRoutes";
import ModelosRouter from "./routes/ConfigDatosGenerales/modelosRoutes";
import puntosVentaRouter from "./routes/ConfigDatosGenerales/puntosventaRoutes";
import estructuraRouter from "./routes/ConfigDatosGenerales/estructuraRoutes";
import ventasPreSol from "./routes/Reportes/Ventas/preSolRoutes";
import ListasRouter from "./routes/ConfigDatosGenerales/listasRoutes";
import reporteZonalRouter from "./routes/Reportes/Micro/reporteZonalRoutes";
import altaPreRouter from "./routes/Operaciones/altaPreRoutes";
import actualPreRouter from "./routes/Operaciones/actualPreRoutes";
import efectividadAdjRouter from "./routes/Operaciones/efectividadAdjRoutes";
require("dotenv").config();

const passport = require("passport");
export const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//prueba

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers-Origin, Origin, x-access-token, X-Requested-With, Content-Type, Accept, X-Auth-Token, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(passport.initialize());

app.use("/login", UserRouter);
app.use("/gerentes", GerentesRouter);
app.use("/reset", resetRouter);
app.use("/usuarios", usuariosRoutes);

app.use("/sucursales", SucursalesRouter);

app.use("/listas", ListasRouter);
app.use("/teamleaders", TeamLeadersRouter);
app.use("/estructura", estructuraRouter);
app.use("/roles", RolesRouter);
app.use("/vendedores", VendedoresRouter);
app.use("/supervisores", supervisoresRoutes);
app.use("/modelos", ModelosRouter);
app.use("/oficiales", OficialesRouter);
app.use("/puntosDeVenta", puntosVentaRouter);
app.use("/Reportes/Ventas/PreSol", ventasPreSol);
app.use("/Reportes/Micro/Zonal", reporteZonalRouter);
app.use("/Operaciones/AltaPre", altaPreRouter);
app.use("/Operaciones/ActualPre", actualPreRouter);
app.use("/Reportes/efectividadAdj", efectividadAdjRouter);
app.listen(process.env.PORT, () => {
  console.log(`App is running on port`, process.env.PORT);
});
