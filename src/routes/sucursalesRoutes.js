import { Router } from "express";
import { errorHandling } from "../middlewares/errorHandling";
import { deleteSucursal, getAllSucursales, getSucursalesById } from "../controllers/sucursalesController";
import authentication from "../middlewares/authentication";
const SucursalesRouter = Router()

SucursalesRouter.use(errorHandling)

SucursalesRouter.get('/', getAllSucursales)
SucursalesRouter.post('/id', getSucursalesById)
SucursalesRouter.delete('/', authentication, deleteSucursal)


export default SucursalesRouter