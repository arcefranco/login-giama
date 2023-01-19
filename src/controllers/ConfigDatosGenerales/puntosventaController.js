import { QueryTypes } from "sequelize";
require('dotenv').config()


export const getAllPuntosDeVenta = async (req, res) => {
    const dbGiama = req.db

    try {

        const allPuntosDeVenta = await dbGiama.query('SELECT * FROM pre_puntosventa',
        {type: QueryTypes.SELECT}
        
        )
        if(Array.isArray(allPuntosDeVenta)) {
            return res.send(allPuntosDeVenta)
        }else{
            throw Error(allPuntosDeVenta)
        }
    } catch (error) {
        if(error.hasOwnProperty('name')){
            return res.send(JSON.stringify(error.name))
        }else{
            return res.send(error)
        }
    }

}

export const beginUpdate = async (req, res) => {
    const {Codigo} = req.body
    const dbGiama = req.db
    const {user} = req.usuario
    
    if(typeof Codigo !== 'number')  return res.send({status: false, message: 'Codigo no valido'})
    try {
        const actualUsuario = await dbGiama.query("SELECT inUpdate FROM pre_puntosventa WHERE Codigo = ?", 
        {
            replacements: [Codigo],
            type: QueryTypes.SELECT
        })
        if(actualUsuario[0].inUpdate === null  || actualUsuario[0].inUpdate === user){
            await dbGiama.query("UPDATE pre_puntosventa SET inUpdate = ? WHERE Codigo = ?", {
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
    if(!Codigo) return 
    try {
        const actualPunto = await dbGiama.query("SELECT inUpdate FROM pre_puntosventa WHERE Codigo = ?", 
        {
            replacements: [Codigo],
            type: QueryTypes.SELECT
        })
        if(actualPunto[0].inUpdate === user){
            await dbGiama.query("UPDATE pre_puntosventa SET inUpdate = NULL WHERE Codigo = ?", {
                replacements: [Codigo],
                type: QueryTypes.UPDATE
            })
            return res.send({codigo: Codigo})
        }else{
            return res.send({status: false})
        }
    } catch (error) {
        console.log(error)
        return res.send({status: false, message: JSON.stringify(error)})
    }
}

export const deletePuntoDeVenta = async (req, res) => {
    const dbGiama = req.db
        const {Codigo} = req.body
      
        try {
    
             await dbGiama.query('DELETE FROM pre_puntosventa WHERE Codigo = ?',
            {
                type: QueryTypes.DELETE,
                replacements: [Codigo]
            
            }
            
            )
            return res.send({status: true, message: 'Eliminado correctamente!'})
            
        } catch (error) {
            if(error.hasOwnProperty('name')){
                res.send({status: false, message: `Error al eliminar punto de venta (${error.name})`})
            }else{
                return res.send({message: JSON.stringify(error)})
            }
        }
}

export const createPuntoDeVenta = async (req, res) => {
    const dbGiama = req.db
    const {user} = req.usuario 
    const {Nombre} = req.body

    try {

         await dbGiama.query('INSERT INTO pre_puntosventa (Nombre, UsuarioAltaRegistro) VALUES (?, ?)',
        {
            type: QueryTypes.INSERT,
            replacements: [Nombre, user]
        
        }
        
        )
        return res.send({status: true, message: 'Punto de venta creado correctamente!'})
    } catch (error) {
        if(error.hasOwnProperty('name')){
            res.send({status: false, message: `Error al crear punto de venta (${error.name})`})
        }else{
            return res.send({message: JSON.stringify(error)})
        }
    }
}


export const updatePuntoDeVenta = async (req, res) => {
    const dbGiama = req.db
    const {Nombre, Codigo} = req.body
    try {

         await dbGiama.query('UPDATE pre_puntosventa SET Nombre = ? WHERE Codigo = ?',
        {
            type: QueryTypes.UPDATE,
            replacements: [Nombre, Codigo]
        
        }
        
        )
        return res.send({status: true, message: 'Actualizado correctamente!'})
        
    } catch (error) {
        if(error.hasOwnProperty('name')){
            res.send({status: false, message: `Error al actualizar punto de venta (${error.name})`})
        }else{
            return res.send({message: JSON.stringify(error)})
        }
    }
}