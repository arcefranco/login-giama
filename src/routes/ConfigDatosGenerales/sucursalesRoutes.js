import { Router } from "express";

import { createSucursal, deleteSucursal, getAllSucursales, 
 updateSucursal, endUpdate, beginUpdate } from "../../controllers/ConfigDatosGenerales/sucursalesController";
import authentication from "../../middlewares/authentication";
import { testConnection } from "../../middlewares/testConnection";
const SucursalesRouter = Router()


SucursalesRouter.use(testConnection)

SucursalesRouter.get('/', getAllSucursales)
SucursalesRouter.post('/endUpdate', authentication, endUpdate)
SucursalesRouter.post('/beginUpdate', authentication, beginUpdate)
SucursalesRouter.delete('/', authentication, deleteSucursal)
SucursalesRouter.put('/', authentication, updateSucursal)
SucursalesRouter.post('/', authentication, createSucursal)


export default SucursalesRouter