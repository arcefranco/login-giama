import { returnErrorMessage } from "../../helpers/errors/returnErrorMessage"
import { QueryTypes } from "sequelize"

export const endUpdateQuery = async (db, usuario, codigo, table) => {
    if(!codigo){
        throw {status: false, message: `ID required`}
       }
    try {
        const actualUsuario = await db.query(`SELECT inUpdate FROM ${table} WHERE Codigo = ?`, 
        {
            replacements: [codigo],
            type: QueryTypes.SELECT
        })
        if(actualUsuario[0].inUpdate === usuario){
            await db.query(`UPDATE ${table} SET inUpdate = NULL WHERE Codigo = ?`, {
                replacements: [codigo],
                type: QueryTypes.UPDATE
            })
            return {status: true}
        }else{
            throw {status: false, message: 'No esta autorizado'}
        }
    } catch (error) {
        throw {status: false, message: returnErrorMessage(error)}
    }

}
