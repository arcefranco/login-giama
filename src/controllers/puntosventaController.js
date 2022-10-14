import { QueryTypes } from "sequelize";
require('dotenv').config()


export const getAllPuntosDeVenta = async (req, res) => {
    const dbGiama = req.db

    try {

        const allPuntosDeVenta = await dbGiama.query('SELECT * FROM pre_puntosventa',
        {type: QueryTypes.SELECT}
        
        )
        return res.send(allPuntosDeVenta)
        
    } catch (error) {
        console.log(error)
        return res.send(error)
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
    if(!Codigo) return 'ID required'
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
            return res.send('endUpdate OK!')
        }else{
            return
        }
    } catch (error) {
        return res.send(error)
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
            console.log(error)
            return res.send({status: false, message: 'Error al borrar'})
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
        return res.send({status: true, message: 'Creado correctamente!'})
        
    } catch (error) {
        console.log(error)
        return res.send({status: false, message: 'Error al crear'})
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
        console.log(error)
        return res.send({status: false, message: 'Error al actualizar'})
    }
}