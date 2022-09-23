import { Router } from "express";
import { testConnection } from "../middlewares/testConnection";
import authentication from "../middlewares/authentication";
import { createPuntoDeVenta, deletePuntoDeVenta, endUpdate, getAllPuntosDeVenta, getPuntoById, updatePuntoDeVenta } from "../controllers/puntosventaController";
const puntosVentaRouter = Router()

puntosVentaRouter.use(testConnection)

puntosVentaRouter.get('/', getAllPuntosDeVenta)
puntosVentaRouter.post('/id', authentication, getPuntoById)
puntosVentaRouter.put('/', updatePuntoDeVenta)
puntosVentaRouter.post('/', authentication, createPuntoDeVenta)
puntosVentaRouter.post('/endUpdate', authentication, endUpdate)
puntosVentaRouter.delete('/', deletePuntoDeVenta)
export default puntosVentaRouter