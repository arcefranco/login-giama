import { Router } from "express";

import { getAllOficialesMoraActivos, getAllOficialesScoringActivos } from "../controllers/vendedoresController";
import { endUpdate, getVendedores, getVendedoresById, postVendedores, updateVendedores,deleteVendedores, beginUpdate,  getAllEscalas, getAllOficialesScoring, getAllOficialesMora } from "../controllers/vendedoresController";

import { testConnection } from "../middlewares/testConnection";
import authentication from "../middlewares/authentication";

const VendedoresRouter = Router()


VendedoresRouter.use(testConnection)

VendedoresRouter.route('/').get(getVendedores);
VendedoresRouter.post('/id', authentication, getVendedoresById)
VendedoresRouter.post('/endUpdate', authentication, endUpdate)
VendedoresRouter.post('/beginUpdate', authentication, beginUpdate)
VendedoresRouter.post('/', authentication, postVendedores);
VendedoresRouter.put('/', authentication, updateVendedores);
VendedoresRouter.delete('/', authentication, deleteVendedores);


//get escalas, oficiales scoring y mora
VendedoresRouter.route('/escalas').get(getAllEscalas)
VendedoresRouter.route('/oficialesScoring').get(getAllOficialesScoring)
VendedoresRouter.route('/oficialesMora').get(getAllOficialesMora)
VendedoresRouter.route('/oficialesScoringActivos').get(getAllOficialesScoringActivos)
VendedoresRouter.route('/oficialesMoraActivos').get(getAllOficialesMoraActivos)

export default VendedoresRouter