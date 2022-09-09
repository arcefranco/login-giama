import { Router } from "express";
import { errorHandling } from "../middlewares/errorHandling";
import { createSucursal, deleteSucursal, getAllSucursales, getSucursalesById, updateSucursal, endCommit } from "../controllers/sucursalesController";
import authentication from "../middlewares/authentication";
const SucursalesRouter = Router()

SucursalesRouter.use(errorHandling)

SucursalesRouter.get('/', getAllSucursales)
SucursalesRouter.post('/id', getSucursalesById)
SucursalesRouter.delete('/', authentication, deleteSucursal)
SucursalesRouter.put('/', authentication, updateSucursal)
SucursalesRouter.post('/', authentication, createSucursal)
SucursalesRouter.get('/endCommit', endCommit)

export default SucursalesRouter