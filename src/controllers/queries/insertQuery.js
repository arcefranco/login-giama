import { returnErrorMessage } from "../../helpers/errors/returnErrorMessage";
import { QueryTypes } from "sequelize";

export const insertQuery = async(db, query, replacements, table) => {
    try{
    await db.query(query, {
        replacements: replacements,
        type: QueryTypes.INSERT
      });

    return {status: true, message: `${table} creado con exito!`}
    
    }catch(error){

        throw {status: false, message: returnErrorMessage(error)}
    }
}