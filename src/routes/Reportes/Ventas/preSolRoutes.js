import {  QueryTypes } from 'sequelize';
import { Router } from 'express';
import { getPreSol } from '../../../controllers/Reportes/Ventas/preSolController';
import { testConnection } from '../../../middlewares/testConnection';
require('dotenv').config()

const ventasPreSol = Router()

ventasPreSol.use(testConnection)

ventasPreSol.post('/', getPreSol)

export default ventasPreSol