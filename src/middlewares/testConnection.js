import { pa7_cgConnection } from "../helpers/connections";
import { pa7_elyseesConnection } from "../helpers/connections";



export const testConnection = (req, res, next) => {
    const db = req.header('db-connection');

    if (!db) {
        return next({ status: false, message: "db not found" });
     } 
     else {
        if(db === 'pa7' || db === 'pa7_cg'){
            req.db = pa7_cgConnection
          }
          if(db === 'pa7_elysees'){
            req.db = pa7_elyseesConnection
          }
         
         next(); 

     }
}