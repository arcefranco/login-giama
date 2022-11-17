import { Sequelize } from "sequelize";
import { pa7Connection } from "../helpers/connections";
import { pa7gfConnection } from "../helpers/connections";


export const testConnection = (req, res, next) => {
    const db = req.header('db-connection');

    if (!db) {
        return next({ status: 552, message: "db not found" });
     } 
     else {
        if(db === 'pa7'){
            req.db = pa7Connection


          }
         
         next(); 

     }
}