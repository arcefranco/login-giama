import { QueryTypes } from "sequelize"
import { returnErrorMessage } from "../../helpers/errors/returnErrorMessage"

export const selectQuery = async (db, query) => {
    try {
        const result = await db.query(query, {
            type: QueryTypes.SELECT
        })
         if(Array.isArray(result)){
 
            return result
        }else{
            throw result
        }
    
        } catch (error) {
            throw {status: false, message: returnErrorMessage(error)}
        }
}