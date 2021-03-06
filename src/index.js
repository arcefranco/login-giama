import express from "express";
import  db  from "./database";
import cors from 'cors'
import morgan from "morgan";
import UserRouter from "./routes/userRoutes";
import GerentesRouter from './routes/gerentesRoutes'
const app = express();
db.sequelize; 




app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers-Origin, Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

app.use('/login', UserRouter)
app.use('/gerentes', GerentesRouter)

app.listen(3001, () => {
    console.log(`Our app is running on port 3001`);
});

