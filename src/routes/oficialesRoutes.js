import { Router } from "express";
import { createOficiales, deleteOficiales, getOficialesById, getOficialesByName, updateOficiales, endUpdate } from "../controllers/oficialesController";
import authentication from "../middlewares/authentication";
import { testConnection } from "../middlewares/testConnection";



const OficialesRouter = Router()

OficialesRouter.use(testConnection)

OficialesRouter.post('/', getOficialesByName)
OficialesRouter.delete('/', deleteOficiales)
OficialesRouter.post('/id', authentication, getOficialesById)
OficialesRouter.post('/create', createOficiales)
OficialesRouter.put('/id', updateOficiales)
OficialesRouter.post('/endUpdate', authentication, endUpdate)
export default OficialesRouter