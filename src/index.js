import express from "express";
import cors from 'cors'
import morgan from "morgan";
import connection from "./database";
import UserRouter from "./routes/userRoutes";
import GerentesRouter from './routes/gerentesRoutes'
import resetRouter from "./routes/resetRoutes";
import usuariosRoutes from "./routes/usuariosRoutes";

require('dotenv').config()

import RolesRouter from "./routes/rolesRoutes";
import supervisoresRoutes from "./routes/supervisoresRoutes";
import TeamLeadersRouter from "./routes/teamLeadersRoutes";
import VendedoresRouter from "./routes/vendedoresRoutes";

const passport = require('passport')
export const app = express();




app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers-Origin, Origin, x-access-token, X-Requested-With, Content-Type, Accept, X-Auth-Token, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
app.use(passport.initialize());

app.use('/login', UserRouter)
app.use('/gerentes', GerentesRouter)
app.use('/reset', resetRouter)
app.use('/usuarios', usuariosRoutes)
app.use('/teamleaders', TeamLeadersRouter)
app.use('/roles', RolesRouter)
app.use('/vendedores', VendedoresRouter)
app.use('/supervisores', supervisoresRoutes)

app.listen(process.env.PORT, () => {

    console.log(`App is running on port`, process.env.PORT);
});


