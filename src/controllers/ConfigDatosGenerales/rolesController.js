
import {app} from '../../index'
import { QueryTypes } from "sequelize";
import { queryMora, queryOperaciones, queryReportes} from "../../queries";
import { logout } from '../userController';





export const getRoles = async (req, res) => {
     const dbGiama = req.db
    console.log('el body', req.body)
    const {rol} = req.body
    if(!rol){
        return res.send('No role provided')
    }else if(rol === 'operaciones'){
        try {
            const roles = await dbGiama.query(queryOperaciones)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'scoring'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.2.6.%' AND rl_codigo NOT LIKE '1.2.6.3%'`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'mesa'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.3.7' OR rl_codigo LIKE '1.3.6'`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'mora'){
        try {
            const roles = await dbGiama.query(queryMora)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'call'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.5.%' 
            AND rl_codigo NOT LIKE '1.5.1%' AND rl_codigo NOT LIKE '1.5.2%'`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }     
    }else if(rol === 'personal'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.6.%' AND rl_codigo 
            NOT LIKE '1.6.1%' AND rl_codigo NOT LIKE '1.6.2%'`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'config'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.7.10' OR rl_codigo LIKE '1.7.12' OR rl_codigo LIKE '1.7.20' 
            OR rl_codigo LIKE '1.7.4' OR rl_codigo LIKE '1.7.5'`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'configVendedores'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.7.1.%' AND rl_codigo NOT LIKE 
            '1.7.1.4%' AND rl_codigo NOT LIKE '1.7.1.5%';`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'objMesaDePlanes'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE 
            '1.7.14.%' AND rl_codigo NOT LIKE '1.7.14.3%';`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'tesoreria'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.8.1.%' 
            AND rl_codigo NOT LIKE '1.8.1.1%';`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'ventas'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.8.2.%' AND rl_codigo NOT LIKE '1.8.2.2%' 
            AND rl_codigo NOT LIKE '1.8.2.3%';`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'facturacion'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.8.2.3.%' AND rl_codigo NOT LIKE '1.8.2.3.10%' 
            AND rl_codigo NOT LIKE '1.8.2.3.4%' AND rl_codigo NOT LIKE '1.8.2.3.8%' AND rl_codigo NOT LIKE '1.8.2.3.9%';`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'facturacionElectronica'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.8.2.3.10%' 
            AND rl_codigo NOT LIKE '1.8.2.3.10.5%';`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'consultas'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.8.4.2.%' AND rl_codigo NOT LIKE '1.8.3.2%' 
            AND rl_codigo NOT LIKE '1.8.4.2.6%' AND rl_codigo NOT LIKE '1.8.4.2.7%';`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'clientesFacturacion'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.8.4.7.%' AND rl_codigo NOT LIKE '1.8.4.7.1%' 
            AND rl_codigo NOT LIKE '1.8.4.7.2%' AND rl_codigo NOT LIKE '1.8.4.7.4%';`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'proveedores'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.8.7.%' 
            AND rl_codigo NOT LIKE '1.8.7.1%';`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'registraciones'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.8.9.8.%' AND rl_codigo NOT LIKE '1.8.9.8.3%'
            AND rl_codigo NOT LIKE '1.8.9.8.5%';`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'contabilidad2'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.9.%' 
            AND rl_codigo NOT LIKE '1.9.1.1%'`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'reportes'){
        try {
            const roles = await dbGiama.query(queryReportes)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'reportesMora'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.10.3.%' AND rl_codigo NOT LIKE '1.10.3.4%' 
            AND rl_codigo NOT LIKE '1.10.3.5%' AND rl_codigo NOT LIKE '1.10.3.6%';`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'planSubite'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.11.%' AND rl_codigo NOT LIKE '1.11.1%' 
            AND rl_codigo NOT LIKE '1.11.4%';`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'compraRescindidos'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.14.%' AND rl_codigo NOT LIKE '1.14.1%' 
            AND rl_codigo NOT LIKE '1.14.4%';`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }else if(rol === 'usados'){
        try {
            const roles = await dbGiama.query(`SELECT * FROM roles WHERE rl_codigo LIKE '1.15.%' AND rl_codigo NOT LIKE '1.15.1' AND rl_codigo NOT LIKE '1.15.1.%' 
            AND rl_codigo NOT LIKE '1.15.14%' AND rl_codigo NOT LIKE '1.15.15%'AND rl_codigo NOT LIKE '1.15.7%';`)
            return res.send(roles[0])
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }  
    }
    
    else{
        try {
            const roles = await dbGiama.query('SELECT rl_codigo, rl_descripcion FROM roles WHERE rl_codigo LIKE ?',{
                replacements: [rol],
                type: QueryTypes.SELECT
            })
    
            return res.send(roles)
    
        } catch (error) {
            console.log(error)
            return res.send(error)
        }
    }
}

export const getUserRoles = async (req, res) => {
    try {
        const {user} = req.body
     const dbGiama = req.db
    if(!user){
        return res.send('No user provided')
    }else{
        
            const userRoles = await dbGiama.query('SELECT rl_codigo FROM usuarios_has_roles WHERE us_login = ?', {
                replacements: [user],
                type: QueryTypes.SELECT
            })
            return res.send(userRoles)
        } 
        }
        catch (error) {
            console.log(error)
            return res.send(error)
        }
    
}

export const addRol = async (req, res) => {
    try {
    const {rol, Usuario} = req.body
     const dbGiama = req.db
    if(!rol || !Usuario){
        return res.send('Faltan datos')
    }else{
        
                 await dbGiama.query('INSERT INTO usuarios_has_roles (us_login, rl_codigo) VALUES (?, ?)', {
                    replacements: [Usuario, rol],
                    type: QueryTypes.INSERT
                })
                return res.send(`El rol ha sido añadido correctamente al usuario ${Usuario}`)
            
        } 
        }
        
        catch (error) {
            console.log(error)
            return res.send('Hubo un error al enviar los datos')
        }
    
}
export const deleteRol = async (req, res) => {
    try {
         const dbGiama = req.db
    
    const {rol, Usuario} = req.body
    if(!rol || !Usuario){
        return res.send('Faltan datos')
    }else{
        
            await dbGiama.query('DELETE FROM usuarios_has_roles WHERE us_login = ? AND rl_codigo = ?', {
                replacements: [Usuario, rol],
                type: QueryTypes.INSERT
            })
            return res.send(`El rol ha sido eliminado correctamente al usuario ${Usuario}`)
        } 
        }
        catch (error) {
            console.log(error)
            return res.send('Hubo un error al enviar los datos')
        }
    
}

export const copyRoles = async (req, res) => {
    try {
     const dbGiama = req.db
    const {userFrom, userTo} = req.body 
    if(!userFrom || !userTo){
        return res.send('Faltan datos')
    }else{
        
            const userHasRoles = await dbGiama.query(`SELECT * FROM usuarios_has_roles WHERE us_login = ?`,{
                replacements: [userTo],
                type: QueryTypes.SELECT
            })
            if(userHasRoles.length){

                return res.send({message: 'Esta seguro que desea sobreescribir los roles?', status: true})
            }
            await dbGiama.query(`INSERT INTO usuarios_has_roles (us_login, rl_codigo, uhr_activo) SELECT 
            ?, rl_codigo, uhr_activo
            FROM usuarios_has_roles WHERE us_login = ?`,{
                replacements: [userTo, userFrom],
                type: QueryTypes.INSERT
                
            })
            return res.send(`Roles de ${userFrom} copiados exitosamente a ${userTo}`)
        } 
        }
        catch (error) {
            console.log(error)
            return res.send('Hubo un error: ', error)
        }
    
}

export const replaceRoles = async (req, res) => {
    const {userFrom, userTo} = req.body  
    try {
     const dbGiama = req.db 
    if(!userFrom || !userTo){
        return res.send('Faltan datos')
    }else{
       
            await dbGiama.query(`DELETE FROM usuarios_has_roles WHERE us_login = ?`,{
                replacements: [userTo],
                type: QueryTypes.DELETE
            })
            await dbGiama.query(`INSERT INTO usuarios_has_roles (us_login, rl_codigo, uhr_activo) SELECT 
            ?, rl_codigo, uhr_activo
            FROM usuarios_has_roles WHERE us_login = ?`,{
                replacements: [userTo, userFrom],
                type: QueryTypes.INSERT
                
            })
            return res.send(`Roles de ${userFrom} copiados exitosamente a ${userTo}`)
        } 
        }
        catch (error) {
            console.log(error)
            return res.send('Hubo un error: ', error)
        }
    
    
}

export const giveMaster = async (req, res) => {
    const {Usuario} = req.body
    try {
        
         const dbGiama = req.db 
        const userHasRoles = await dbGiama.query(`SELECT * FROM usuarios_has_roles WHERE us_login = ? AND rl_codigo = "1"`,{
            replacements: [Usuario],
            type: QueryTypes.SELECT
        }) 
    
        if(!userHasRoles.length){
            try {
                await dbGiama.query('INSERT INTO usuarios_has_roles (us_login, rl_codigo) VALUES (?, "1")',
                {
                    replacements: [Usuario],
                    type: QueryTypes.INSERT
                })
    
                return res.send(`Se le ha agregado el rol master correctamente a ${Usuario}`)
                
            } catch (error) {
                console.log(error)
                return res.send('Hubo un error en la DB')
            }
        }else{
            return res.send(`El usuario ${Usuario} ya posee el rol master`)
        }
    } catch (error) {
        if(error.name){
            return res.send(error.name)
        }else{
            return res.send('Hubo un error', error)
        }
        
    }


}