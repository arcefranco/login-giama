import { QueryTypes } from "sequelize"

export const selectQuery = async (db, query) => {
    try {
        const dbGiama = db
        const result = await dbGiama.query(query, {
            type: QueryTypes.SELECT
        })

         if(Array.isArray(result)){
 
            return result
        }else{
            console.log('this is result: ', result)
            throw Error(result)
        }
    
        } catch (error) {
            throw error.hasOwnProperty("name") ? error.name : JSON.stringify(error) 
        }
}