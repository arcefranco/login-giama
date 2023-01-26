import { QueryTypes } from "sequelize"
import { returnErrorMessage } from "../../helpers/errors/returnErrorMessage"

export const deleteQuery = async (db, query, replacements, table) => {
try {
        await db.query(query, {
        replacements: replacements,
        type: QueryTypes.DELETE
    })
    return {status: true, message: `${table} eliminado con exito!`}

} catch (error) {
    throw {status: false, message: returnErrorMessage(error)}
}
}