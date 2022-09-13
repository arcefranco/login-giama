import { Router } from "express";
import { createOficiales, deleteOficiales, getOficialesById, getOficialesByName, updateOficiales } from "../controllers/oficialesController";
import { errorHandling } from "../middlewares/errorHandling";


const OficialesRouter = Router()
OficialesRouter.use(errorHandling)

OficialesRouter.post('/', getOficialesByName)
OficialesRouter.delete('/', deleteOficiales)
OficialesRouter.post('/id', getOficialesById)
OficialesRouter.post('/create', createOficiales)
OficialesRouter.put('/id', updateOficiales)

export default OficialesRouter