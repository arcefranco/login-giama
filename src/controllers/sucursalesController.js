import {app} from '../index'
import { QueryTypes } from "sequelize";
import Sequelize from "sequelize";
require('dotenv').config()
import awaitWithTimeout from '../helpers/transaction/awaitWithTimeout'


let transaction;

export const getAllSucursales = async (req, res) => {
    const dbGiama = app.get('db')
    const allSucursales = await dbGiama.query("SELECT sucursalreal.`Codigo` AS 'Codigo', sucursalreal.`Nombre`, sucursalreal.`UsuarioAltaRegistro` FROM sucursalreal")
    res.send(allSucursales[0])
}

export const getSucursalesById = async (req, res) => {
    const dbGiama = app.get('db')
    const {id} = req.body
    transaction = await dbGiama.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        autocommit:false
      })
    const query = () => {
        return new Promise((resolve, reject) => {
            let sucursalById = dbGiama.query("SELECT sucursalreal.`Codigo` AS 'Codigo', sucursalreal.`Nombre`, sucursalreal.`UsuarioAltaRegistro` FROM sucursalreal WHERE sucursalreal.`Codigo` = ? FOR UPDATE", 
            {
                transaction: transaction,
                replacements: [id],
                type: QueryTypes.SELECT
            })

            resolve(sucursalById)
        })
    }

 
    const response = await awaitWithTimeout(4000, query()) 

    res.send(response)
}

export const deleteSucursal = async(req, res) => {

    const {id} = req.body.id
    
    const dbGiama = app.get('db')
    if(!id){
       return res.status(400).send({status: false, data: 'Ningun id provisto'})
    }
    const {user} = req.usuario
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.16.3')
        if(!finded){
            return res.status(500).send({status: false, data: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, data: error})
    } 

    try {
        await dbGiama.query("DELETE FROM sucursalreal WHERE CODIGO = ?", {
            replacements: [id],
            type: QueryTypes.DELETE
             
        })
       return res.send({status: true, data: 'Sucursal eliminada correctamente'})
    } catch (error) {
       return res.status(400).send({status: false, data: `error al eliminar en base de datos: ${error}` })
    } 
}

export const updateSucursal = async (req, res) => {
    const {Codigo, Nombre} = req.body
    
    const dbGiama = app.get('db')
    if(!Codigo){
       return res.status(400).send({status: false, data: 'Ningun id provisto'})
    }
    const {user} = req.usuario
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.16.3')
        if(!finded){
            return res.status(500).send({status: false, data: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, data: error})
    } 

    try {
        await dbGiama.query('UPDATE sucursalreal SET Nombre = ? WHERE Codigo = ?', {
            transaction: transaction,
            replacements: [Nombre, Codigo],
            type: QueryTypes.UPDATE
        }).then(() => transaction.commit()).catch((error) => {
            transaction.rollback()
            return res.send(error)
        }) 
        return res.send({status: true, data: 'Sucursal actualizada correctamente!'}) 
    }catch(error){
        console.log('error en la DB: ', error)
        return res.status(400).send({status: false, data: 'error en la DB'})
    }
}
export const endCommit = async (req, res) => {
    if(transaction.finished === 'commit'){
        res.send('Fueron guardados los cambios')
    }else{
        await transaction.rollback()
        res.send('No fueron guardados los cambios')
        
    }

}

export const createSucursal = async (req, res) => {
    const {Nombre, UsuarioAltaRegistro} = req.body
    
    const dbGiama = app.get('db')
    const {user} = req.usuario
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.16.3')
        if(!finded){
            return res.status(500).send({status: false, data: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, data: error})
    }

    try {
        await dbGiama.query('INSERT INTO sucursalreal (Nombre, UsuarioAltaRegistro) VALUES ( ? , ? )', {
            replacements: [Nombre, UsuarioAltaRegistro],
            type: QueryTypes.INSERT
        })
        return res.send({status: true, data: 'Sucursal creada!'}) 
    } catch (error) {
        console.log('error en la DB: ', error)
        return res.status(400).send({status: false, data: 'error en la DB'})
    }
} 