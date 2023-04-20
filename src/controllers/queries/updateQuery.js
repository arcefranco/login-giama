import { QueryTypes } from "sequelize"
import { returnErrorMessage } from "../../helpers/errors/returnErrorMessage"

export const updateQuery = async (db, query, replacements, table) => {
try {
        await db.query(query, {
        replacements: replacements,
        type: QueryTypes.UPDATE
    })
    return {status: true, message: `${table} actualizado con exito!`}

} catch (error) {
    throw {status: false, message: returnErrorMessage(error)}
}
}