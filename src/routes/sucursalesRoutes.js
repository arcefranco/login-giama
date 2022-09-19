import { Router } from "express";

import { createSucursal, deleteSucursal, getAllSucursales, getSucursalesById, updateSucursal, endUpdate } from "../controllers/sucursalesController";
import authentication from "../middlewares/authentication";
import { testConnection } from "../middlewares/testConnection";
const SucursalesRouter = Router()


SucursalesRouter.use(testConnection)

SucursalesRouter.get('/', getAllSucursales)
SucursalesRouter.post('/id', authentication, getSucursalesById)
SucursalesRouter.post('/endUpdate', authentication, endUpdate)
SucursalesRouter.delete('/', authentication, deleteSucursal)
SucursalesRouter.put('/', authentication, updateSucursal)
SucursalesRouter.post('/', authentication, createSucursal)


export default SucursalesRouter