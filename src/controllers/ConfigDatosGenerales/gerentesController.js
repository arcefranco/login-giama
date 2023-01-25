import {  QueryTypes } from "sequelize";
import { selectQuery } from "../queries/selectQuery";
import {beginUpdateQuery} from "../queries/beginUpdateQuery"
import {findRolOrMaster} from '../queries/findRoles'
import { returnErrorMessage } from "../../helpers/errors/returnErrorMessage";
import { endUpdateQuery } from "../queries/endUpdateQuery";
require('dotenv').config()


export const getGerentes = async (req, res) => {
     try {
        const result = await selectQuery(req.db, "SELECT Codigo, Nombre, Activo FROM gerentes")
        return res.send(result)
    } catch (error) {
        return res.send(error)
    }
}
 export const getGerentesActivos = async (req, res) => {
    try {
        const result = await selectQuery(req.db, "SELECT Codigo, Nombre, Activo FROM gerentes WHERE Activo = 1")
        return res.send(result)
    } catch (error) {
        return res.send(error)
    }
}     


export const endUpdate = async (req, res) => {
    const {Codigo} = req.body
    const dbGiama = req.db
    const {user} = req.usuario
    if(!Codigo) return 
    try {
        const result = await endUpdateQuery(req.db, user, Codigo, "gerentes")

        return res.send(result)

    } catch (error) {
        return res.send(error)
    }
}

export const beginUpdate = async (req, res) => {
try {
    const result = await beginUpdateQuery(req.db, req.usuario.user, req.body.Codigo, "gerentes")
    return res.send(result)
} catch (error) {

   
    return res.send(error)
}
}


 export const postGerentes = async (req, res) => {
     let {Nombre, Activo} = req.body;
     const dbGiama = req.db;
     const {user} = req.usuario
     try {
        await findRolOrMaster(req.db, user, '1.7.18.1')
     } catch (error) {
         return res.send(error)
     }
     if(!Nombre) {
        return res.send({status: false, message: 'Faltan campos'})
    }
     
try{   
    await dbGiama.query("INSERT INTO gerentes (Nombre, Activo, UsuarioAltaRegistro) VALUES (?,?,?)",{
        replacements: [Nombre, Activo? Activo : 0, user],
        type: QueryTypes.INSERT,    
    });
    return res.send({status: true, message: 'Gerente creado!'})
    }catch(error){
        return res.send({status: false, message: returnErrorMessage(error)})
    } }
 
    
 
 export const updateGerentes = async (req, res) => {
    const {Nombre, Activo, Codigo} = req.body;
    const dbGiama = req.db
    const {user} = req.usuario
    try {
        await findRolOrMaster(req.db, user, '1.7.18.2')
     } catch (error) {
         return res.send(error)
     }

    try{ 
    await dbGiama.query('UPDATE gerentes SET Nombre = ?, Activo = ? WHERE Codigo = ?', {
        replacements: [Nombre, Activo, Codigo],
        type: QueryTypes.UPDATE
    })
    return res.send({status: true, message: 'Gerente actualizado correctamente!'})
        
    }
    catch(error) {
        return res.send({status: false, message: returnErrorMessage(error)})
    }
}
 

 export const deleteGerentes = async (req, res) => {
    const {Codigo} = req.body;
    const dbGiama = req.db
    try{

        await dbGiama.query("DELETE FROM gerentes WHERE Codigo = ?", {
            replacements: [Codigo],
            types: QueryTypes.DELETE
        })

        return res.send({status: true, message: 'Gerente Borrado!'})
        }catch(error){
            return res.send({status: false, message: returnErrorMessage(error)})
        }
} 