import { Router } from "express";
import { deleteOficiales, getOficialesByName } from "../controllers/oficialesController";
import { errorHandling } from "../middlewares/errorHandling";


const OficialesRouter = Router()
OficialesRouter.use(errorHandling)

OficialesRouter.post('/', getOficialesByName)
OficialesRouter.delete('/', deleteOficiales)

export default OficialesRouter