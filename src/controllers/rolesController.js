import db from "../database";
import { QueryTypes } from "sequelize";
import { queryMora, queryOperaciones } from "../queries";


const dbGiama = db.sequelize

export const getRoles = async (req, res) => {
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
    const {user} = req.body
    if(!user){
        return res.send('No user provided')
    }else{
        try {
            const userRoles = await dbGiama.query('SELECT rl_codigo FROM usuarios_has_roles WHERE us_login = ?', {
                replacements: [user],
                type: QueryTypes.SELECT
            })
            return res.send(userRoles)
        } catch (error) {
            console.log(error)
            return res.send(error)
        }
    }
}

export const addRol = async (req, res) => {
    const {rol, Usuario} = req.body
    if(!rol || !Usuario){
        return res.send('Faltan datos')
    }else{
        try {
            await dbGiama.query('INSERT INTO usuarios_has_roles (us_login, rl_codigo) VALUES (?, ?)', {
                replacements: [Usuario, rol],
                type: QueryTypes.INSERT
            })
            res.send(`El rol ha sido añadido correctamente al usuario ${Usuario}`)
        } catch (error) {
            console.log(error)
            res.send('Hubo un error al enviar los datos')
        }
    }
}
export const deleteRol = async (req, res) => {
    const {rol, Usuario} = req.body
    if(!rol || !Usuario){
        return res.send('Faltan datos')
    }else{
        try {
            await dbGiama.query('DELETE FROM usuarios_has_roles WHERE us_login = ? AND rl_codigo = ?', {
                replacements: [Usuario, rol],
                type: QueryTypes.INSERT
            })
            res.send(`El rol ha sido eliminado correctamente al usuario ${Usuario}`)
        } catch (error) {
            console.log(error)
            res.send('Hubo un error al enviar los datos')
        }
    }
}