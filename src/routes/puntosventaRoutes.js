import { Router } from "express";
import { testConnection } from "../middlewares/testConnection";
import authentication from "../middlewares/authentication";
import { createPuntoDeVenta, deletePuntoDeVenta, endUpdate, getAllPuntosDeVenta, beginUpdate, updatePuntoDeVenta } from "../controllers/puntosventaController";
const puntosVentaRouter = Router()

puntosVentaRouter.use(testConnection)

puntosVentaRouter.get('/', getAllPuntosDeVenta)
puntosVentaRouter.put('/', updatePuntoDeVenta)
puntosVentaRouter.post('/', authentication, createPuntoDeVenta)
puntosVentaRouter.post('/endUpdate', authentication, endUpdate)
puntosVentaRouter.post('/beginUpdate', authentication, beginUpdate)
puntosVentaRouter.delete('/', authentication, deletePuntoDeVenta)
export default puntosVentaRouter