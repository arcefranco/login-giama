import { Router } from "express";
import { endCommit } from "../controllers/vendedoresController";
import {  getVendedores, getVendedoresById, postVendedores, updateVendedores,deleteVendedores,  getAllEscalas, getAllOficialesScoring, getAllOficialesMora } from "../controllers/vendedoresController";
import { errorHandling } from "../middlewares/errorHandling";


const VendedoresRouter = Router()

VendedoresRouter.use(errorHandling)


VendedoresRouter.route('/').get(getVendedores);
VendedoresRouter.route('/id').post(getVendedoresById);
VendedoresRouter.route('/').post(postVendedores);
VendedoresRouter.route('/').put(updateVendedores);
VendedoresRouter.route('/').delete(deleteVendedores);
VendedoresRouter.get('/endCommit', endCommit);

//get escalas, oficiales scoring y mora
VendedoresRouter.route('/escalas').get(getAllEscalas)
VendedoresRouter.route('/oficialesScoring').get(getAllOficialesScoring)
VendedoresRouter.route('/oficialesMora').get(getAllOficialesMora)

export default VendedoresRouter