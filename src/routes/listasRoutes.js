import { Router } from "express";
import { createLista, deleteLista, deleteModeloFromLista, getListas, getModelos, insertModeloLista, modelosOnLista, updateLista, updatePrecioModelo } from "../controllers/listaspreciosController";
import { testConnection } from "../middlewares/testConnection";
import authentication from "../middlewares/authentication";
const ListasRouter = Router()

ListasRouter.use(testConnection)

ListasRouter.get('/', getListas)
ListasRouter.post('/', modelosOnLista)
ListasRouter.post('/nuevaLista', authentication, createLista)
ListasRouter.delete('/nuevaLista', deleteLista)
ListasRouter.put('/nuevaLista', updateLista)
ListasRouter.get('/modelo', getModelos)
ListasRouter.post('/modelo', insertModeloLista)
ListasRouter.put('/modelo', updatePrecioModelo)
ListasRouter.delete('/modelo', deleteModeloFromLista)


export default ListasRouter