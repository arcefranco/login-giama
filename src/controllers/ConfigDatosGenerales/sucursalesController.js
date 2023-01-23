import { QueryTypes } from "sequelize";
require('dotenv').config()





export const getAllSucursales = async (req, res) => {
    const dbGiama = req.db
    const allSucursales = await dbGiama.query("SELECT sucursalreal.`Codigo` AS 'Codigo', sucursalreal.`Nombre`, sucursalreal.`UsuarioAltaRegistro` FROM sucursalreal")
    res.send(allSucursales[0])
}

export const getSucursalesById = async (req, res) => {
    const dbGiama = req.db
    const {id} = req.body
    const {user} = req.usuario
    try {
        const sucursal = await dbGiama
        .query
        ("SELECT sucursalreal.`Codigo` AS 'Codigo', sucursalreal.`Nombre`, sucursalreal.`UsuarioAltaRegistro`, sucursalreal.`inUpdate` FROM sucursalreal WHERE sucursalreal.`Codigo` = ?",
        {
          replacements: [id],
          type: QueryTypes.SELECT
        }
       );
       
         if(sucursal[0].inUpdate   && sucursal[0].inUpdate !== user) {
            return res.send({status: false, message: `El registro esta siendo editado por ${sucursal[0].inUpdate} `})
         }
    
      
        try {
        await dbGiama.query("UPDATE sucursalreal SET inUpdate = ? WHERE Codigo = ?",  {
            replacements: [user, id],
            type: QueryTypes.UPDATE
            })
    
            return res.send(sucursal)
    }   catch (error) {
            console.log('error:', error)
            return res.send(error)
            }
        
    }       catch (error) {
            return res.send(error)
    }
    
    
}

export const beginUpdate = async (req, res) => {
    const {Codigo} = req.body
    const dbGiama = req.db
    const {user} = req.usuario
    
    if(typeof Codigo !== 'number')  return res.send({status: false, message: 'Codigo no valido'})
    try {
        const actualUsuario = await dbGiama.query("SELECT inUpdate FROM sucursalreal WHERE Codigo = ?", 
        {
            replacements: [Codigo],
            type: QueryTypes.SELECT
        })
        if(actualUsuario[0].inUpdate === null  || actualUsuario[0].inUpdate === user){
            await dbGiama.query("UPDATE sucursalreal SET inUpdate = ? WHERE Codigo = ?", {
                replacements: [user, Codigo],
                type: QueryTypes.UPDATE
            })
            return res.send({codigo: Codigo})
        }else{
            return res.send({status: false, message: `El registro está siendo editado por ${actualUsuario[0].inUpdate}`})
        }
    } catch (error) {
        return res.send({status: false, message: 'Error al comenzar modificaciones'})
    }
}

export const endUpdate = async (req, res) => {
    const {Codigo} = req.body
    const dbGiama = req.db
    const {user} = req.usuario
    if(typeof Codigo !== 'number'){
        console.log('es esto: ', Codigo)
         return res.send({status: false, message: 'ID required'})
        }
    try {
        const actualUsuario = await dbGiama.query("SELECT inUpdate FROM sucursalreal WHERE Codigo = ?", 
        {
            replacements: [Codigo],
            type: QueryTypes.SELECT
        })
        if(actualUsuario[0].inUpdate === user){
            await dbGiama.query("UPDATE sucursalreal SET inUpdate = NULL WHERE Codigo = ?", {
                replacements: [Codigo],
                type: QueryTypes.UPDATE
            })
            return res.send({status: true})
        }else{
            return 
        }
    } catch (error) {
        if(error.hasOwnProperty("message")){

            return res.send({status: false, message: error.message})
        }else {
            return res.send({status: false, message: JSON.stringify(error)})
        }
    }
}

export const deleteSucursal = async(req, res) => {

    const {Codigo} = req.body
    
    const dbGiama = req.db
    if(typeof Codigo !== 'number'){
       return res.status(400).send({status: false, message: 'Ningun id provisto'})
    }
    const {user} = req.usuario
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.16.3')
        if(!finded){
            return res.status(500).send({status: false, message: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, message: error})
    } 

    try {
        await dbGiama.query("DELETE FROM sucursalreal WHERE CODIGO = ?", {
            replacements: [Codigo],
            type: QueryTypes.DELETE
             
        })
       return res.send({status: true, message: 'Sucursal eliminada correctamente'})
    } catch (error) {
       return res.status(400).send({status: false, message: `error al eliminar en base de datos: ${error}` })
    } 
}

export const updateSucursal = async (req, res) => {
    const {Codigo, Nombre} = req.body
    
    const dbGiama = req.db
    if(typeof Codigo !== 'number'){
       return res.status(400).send({status: false, message: 'Ningun id provisto'})
    }
    const {user} = req.usuario
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.16.3')
        if(!finded){
            return res.status(500).send({status: false, message: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, message: error})
    } 

    try {
        await dbGiama.query('UPDATE sucursalreal SET Nombre = ?, inUpdate = NULL WHERE Codigo = ?', {

            replacements: [Nombre, Codigo],
            type: QueryTypes.UPDATE
        }).catch((error) => {
          
            return res.send(error)
        }) 
        return res.send({status: true, message: 'Sucursal actualizada correctamente!'}) 
    }catch(error){
        console.log('error en la DB: ', error)
        return res.status(400).send({status: false, message: 'error en la DB'})
    }
}




export const createSucursal = async (req, res) => {
    const {Nombre} = req.body
    
    const dbGiama = req.db
    const {user} = req.usuario
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.16.3')
        if(!finded){
            return res.status(500).send({status: false, message: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, message: error})
    }

    try {
        await dbGiama.query('INSERT INTO sucursalreal (Nombre, UsuarioAltaRegistro) VALUES ( ? , ? )', {
            replacements: [Nombre, user],
            type: QueryTypes.INSERT
        })
        return res.send({status: true, message: 'Sucursal creada!'}) 
    } catch (error) {
        console.log('error en la DB: ', error)
        return res.status(400).send({status: false, message: 'error en la DB'})
    }
} 