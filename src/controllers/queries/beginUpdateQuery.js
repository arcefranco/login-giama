import { QueryTypes } from "sequelize"
import { returnErrorMessage } from "../../helpers/errors/returnErrorMessage"

export const beginUpdateQuery = async (db, usuario, codigo, table) => {

    const dbGiama = db
    const user = usuario
    if(!codigo){
        throw {status: false, message: `ID required`}
        }
    try {
        const actualUsuario = await dbGiama.query(`SELECT inUpdate FROM ${table} WHERE Codigo = ?`, 
        {
            replacements: [codigo],
            type: QueryTypes.SELECT
        })
        if(actualUsuario[0].inUpdate === null  || actualUsuario[0].inUpdate === user){
            await dbGiama.query(`UPDATE ${table} SET inUpdate = ? WHERE Codigo = ?`, {
                replacements: [user, codigo],
                type: QueryTypes.UPDATE
            })
            return {codigo: codigo}
        }else{
            throw {status: false, message: `El registro está siendo editado por ${actualUsuario[0].inUpdate}`}
        }
    } catch (error) {
        throw {status: false, message: returnErrorMessage(error)}
    }
}