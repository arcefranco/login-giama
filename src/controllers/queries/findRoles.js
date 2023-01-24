import { QueryTypes } from "sequelize"
import { returnErrorMessage } from "../../helpers/errors/returnErrorMessage"


export const findRolOrMaster = async (db, user, rol) => {
    try {
        const roles = await db.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        const finded = roles.find(e =>   e.rl_codigo === '1' ||  e.rl_codigo === rol)
        if(!finded){
            throw ({status: false, message: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
     
        throw({status: false, message: returnErrorMessage(error)})
    }
}