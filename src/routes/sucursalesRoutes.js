import { Router } from "express";
import { errorHandling } from "../middlewares/errorHandling";
import { createSucursal, deleteSucursal, getAllSucursales, getSucursalesById, updateSucursal } from "../controllers/sucursalesController";
import authentication from "../middlewares/authentication";
const SucursalesRouter = Router()

SucursalesRouter.use(errorHandling)

SucursalesRouter.get('/', getAllSucursales)
SucursalesRouter.post('/id', getSucursalesById)
SucursalesRouter.delete('/', authentication, deleteSucursal)
SucursalesRouter.put('/', authentication, updateSucursal)
SucursalesRouter.post('/', authentication, createSucursal)

export default SucursalesRouter