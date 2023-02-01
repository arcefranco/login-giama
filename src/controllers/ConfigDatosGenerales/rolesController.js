import { QueryTypes } from "sequelize";
import { queryMora, queryOperaciones, queryReportes} from "../../queries";
import { insertQuery } from '../queries/insertQuery';
import { deleteQuery } from '../queries/deleteQuery';
import { selectQuery } from '../queries/selectQuery';


export const getRoles = async (req, res) => {
    const {rol} = req.body
    if(!rol){
        return res.send({status: false, message: 'No role provided'})
    }else if(rol === 'operaciones'){
        try {
            const roles = await selectQuery(req.db, queryOperaciones) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'scoring'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.2.6.%' AND rl_codigo NOT LIKE '1.2.6.3%'`)
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'mesa'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.3.7' OR rl_codigo LIKE '1.3.6'`)
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'mora'){
        try {
            const roles = await selectQuery(req.db, queryMora) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'call'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.5.%' 
            AND rl_codigo NOT LIKE '1.5.1%' AND rl_codigo NOT LIKE '1.5.2%'`) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }     
    }else if(rol === 'personal'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.6.%' AND rl_codigo 
            NOT LIKE '1.6.1%' AND rl_codigo NOT LIKE '1.6.2%'`) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'config'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.7.10' OR rl_codigo LIKE '1.7.12' OR rl_codigo LIKE '1.7.20' 
            OR rl_codigo LIKE '1.7.4' OR rl_codigo LIKE '1.7.5'`) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'configVendedores'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.7.1.%' AND rl_codigo NOT LIKE 
            '1.7.1.4%' AND rl_codigo NOT LIKE '1.7.1.5%';`) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'objMesaDePlanes'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE 
            '1.7.14.%' AND rl_codigo NOT LIKE '1.7.14.3%';`) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'tesoreria'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.8.1.%' 
            AND rl_codigo NOT LIKE '1.8.1.1%';`) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'ventas'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.8.2.%' AND rl_codigo NOT LIKE '1.8.2.2%' 
            AND rl_codigo NOT LIKE '1.8.2.3%';`) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'facturacion'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.8.2.3.%' AND rl_codigo NOT LIKE '1.8.2.3.10%' 
            AND rl_codigo NOT LIKE '1.8.2.3.4%' AND rl_codigo NOT LIKE '1.8.2.3.8%' AND rl_codigo NOT LIKE '1.8.2.3.9%';`)
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'facturacionElectronica'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.8.2.3.10%' 
            AND rl_codigo NOT LIKE '1.8.2.3.10.5%';`) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'consultas'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.8.4.2.%' AND rl_codigo NOT LIKE '1.8.3.2%' 
            AND rl_codigo NOT LIKE '1.8.4.2.6%' AND rl_codigo NOT LIKE '1.8.4.2.7%';`)
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'clientesFacturacion'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.8.4.7.%' AND rl_codigo NOT LIKE '1.8.4.7.1%' 
            AND rl_codigo NOT LIKE '1.8.4.7.2%' AND rl_codigo NOT LIKE '1.8.4.7.4%';`) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'proveedores'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.8.7.%' 
            AND rl_codigo NOT LIKE '1.8.7.1%';`) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'registraciones'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.8.9.8.%' AND rl_codigo NOT LIKE '1.8.9.8.3%'
            AND rl_codigo NOT LIKE '1.8.9.8.5%';`)
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'contabilidad2'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.9.%' 
            AND rl_codigo NOT LIKE '1.9.1.1%'`) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'reportes'){
        try {
            const roles = await selectQuery(req.db, queryReportes) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'reportesMora'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.10.3.%' AND rl_codigo NOT LIKE '1.10.3.4%' 
            AND rl_codigo NOT LIKE '1.10.3.5%' AND rl_codigo NOT LIKE '1.10.3.6%';`) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'planSubite'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.11.%' AND rl_codigo NOT LIKE '1.11.1%' 
            AND rl_codigo NOT LIKE '1.11.4%';`) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'compraRescindidos'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.14.%' AND rl_codigo NOT LIKE '1.14.1%' 
            AND rl_codigo NOT LIKE '1.14.4%';`) 
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }  
    }else if(rol === 'usados'){
        try {
            const roles = await selectQuery(req.db, `SELECT * FROM roles WHERE rl_codigo LIKE '1.15.%' AND rl_codigo NOT LIKE '1.15.1' AND rl_codigo NOT LIKE '1.15.1.%' 
            AND rl_codigo NOT LIKE '1.15.14%' AND rl_codigo NOT LIKE '1.15.15%'AND rl_codigo NOT LIKE '1.15.7%';`)
            return res.send(roles[0])
    
        } catch (error) {
            return res.send(error)
        }  
    }
    
    else{
        try {
            const roles = await selectQuery(req.db, 'SELECT rl_codigo, rl_descripcion FROM roles WHERE rl_codigo LIKE ?')  
            return res.send(roles)
    
        } catch (error) {
            return res.send(error)
        }
    }
}

export const getUserRoles = async (req, res) => {
    try {
        const {user} = req.body
        const dbGiama = req.db
    if(!user){
        return res.send({status: false, message: 'No user provided'})
    }else{
        
        const userRoles = await dbGiama.query('SELECT rl_codigo FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT
        })
        return res.send(userRoles)
        }  
        }
        catch (error) {
            return res.send({status: false, message: returnErrorMessage(error)})
        }
    
}

export const addRol = async (req, res) => {

    const {rol, Usuario} = req.body
     const dbGiama = req.db
    if(!rol || !Usuario){
        return res.send({status: false, message: 'Faltan datos'})
    }
    try {
        await insertQuery(req.db, 'INSERT INTO usuarios_has_roles (us_login, rl_codigo) VALUES (?, ?)', 
        [Usuario, rol])
        return res.send({status: true, message: `El rol ha sido añadido correctamente al usuario ${Usuario}`})
        } 
        
        
        catch (error) {
            return res.send(error)
        }
    }
    

export const deleteRol = async (req, res) => {
    
    const dbGiama = req.db
    const {rol, Usuario} = req.body
    if(!rol || !Usuario){
        return res.send({status: false, message: 'Faltan datos'})
    }
       try {    
            await dbGiama.query('DELETE FROM usuarios_has_roles WHERE us_login = ? AND rl_codigo = ?', {
                replacements: [Usuario, rol],
                type: QueryTypes.INSERT
            })
            return res.send({status: true, message: `El rol ha sido eliminado correctamente al usuario ${Usuario}`})
        
        }
        catch (error) {
            console.log(error)
            return res.send({status: true, message: 'Hubo un error al enviar los datos'})
        }
    
}

export const copyRoles = async (req, res) => {

     const dbGiama = req.db
    const {userFrom, userTo} = req.body 
    if(!userFrom || !userTo){
        return res.send({status: false, message: 'Faltan datos'})
    }
         try {   
            const userHasRoles = await dbGiama.query(`SELECT * FROM usuarios_has_roles WHERE us_login = ?`,{
                replacements: [userTo],
                type: QueryTypes.SELECT
            })
            if(userHasRoles.length){ //Ahi lo manda a replaceRoles, si no pasa de acá y hace copyRoles

                return res.send({message: 'Esta seguro que desea sobreescribir los roles?', status: true})
            }
            await insertQuery(req.db, `INSERT INTO usuarios_has_roles (us_login, rl_codigo, uhr_activo) SELECT 
            ?, rl_codigo, uhr_activo
            FROM usuarios_has_roles WHERE us_login = ?`, [userTo, userFrom], 'usuarios_has_roles')

            return res.send({status: true, message: `Roles de ${userFrom} copiados exitosamente a ${userTo}`})
        
        }
        catch (error) {
            return res.send(error)
        }
    
}

export const replaceRoles = async (req, res) => {
    const {userFrom, userTo} = req.body  

     const dbGiama = req.db 
    if(!userFrom || !userTo){
        return res.send({status: false, message: 'Faltan datos'})
    }
          try { 
            await deleteQuery(req.db, `DELETE FROM usuarios_has_roles WHERE us_login = ?`, [userTo], 'usuarios_has_roles') 
            await insertQuery(req.db, `INSERT INTO usuarios_has_roles (us_login, rl_codigo, uhr_activo) SELECT 
            ?, rl_codigo, uhr_activo
            FROM usuarios_has_roles WHERE us_login = ?`, [userTo, userFrom], 'usuarios_has_roles')

            return res.send({status: false, message: `Roles de ${userFrom} copiados exitosamente a ${userTo}`})
        } 
        
        catch (error) {
            return res.send(error)
        }
}

export const giveMaster = async (req, res) => {
    const {Usuario} = req.body
    if(!Usuario){
        return res.send({status: false, message: 'Faltan datos'})
    }
    try {
        const userHasRoles = await selectQuery(req.db, `SELECT * FROM usuarios_has_roles WHERE 
        us_login = ? AND rl_codigo = "1"`) 
        
    
        if(!userHasRoles.length){
            try {
                await insertQuery(req.db, 'INSERT INTO usuarios_has_roles (us_login, rl_codigo) VALUES (?, "1")', 
                [Usuario], 'usuarios_has_roles')
                return res.send({status: true, message: `Se le ha agregado el rol master correctamente a ${Usuario}`})
                
            } catch (error) {
                console.log(error)
                return res.send(error)
            }
        }else{
            return res.send({status: false, message: `El usuario ${Usuario} ya posee el rol master`})
        }
    } catch (error) {
        return res.send(error)
    }


}