import {  QueryTypes } from "sequelize";
import { selectQuery } from "../queries/selectQuery";
import {beginUpdateQuery} from "../queries/beginUpdateQuery"
import {findRolOrMaster} from '../queries/findRoles'
import { returnErrorMessage } from "../../helpers/errors/returnErrorMessage";
import { endUpdateQuery } from "../queries/endUpdateQuery";
import { insertQuery } from "../queries/insertQuery";
import { updateQuery } from "../queries/updateQuery";
import {deleteQuery} from "../queries/deleteQuery"
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
     if(!Nombre) {
        return res.send({status: false, message: 'Faltan campos'})
    }
     try {
        await findRolOrMaster(req.db, user, '1.7.18.1')
        const result = await insertQuery(req.db, "INSERT INTO gerentes (Nombre, Activo, UsuarioAltaRegistro) VALUES (?,?,?)", 
        [Nombre, Activo? Activo : 0, user], "Gerente")

        return res.send(result)
     } catch (error) {
         return res.send(error)
     }

}
 
    
 
 export const updateGerentes = async (req, res) => {
    const {Nombre, Activo, Codigo} = req.body;
    const dbGiama = req.db
    const {user} = req.usuario
    try {
        await findRolOrMaster(req.db, user, '1.7.18.2')
        const result = await updateQuery(req.db, 'UPDATE gerentes SET Nombre = ?, Activo = ? WHERE Codigo = ?',
        [Nombre, Activo, Codigo], "Gerente")
        return res.send(result)
     } catch (error) {
         return res.send(error)
     }
}
 

 export const deleteGerentes = async (req, res) => {
    const {Codigo} = req.body;
    try{
        const result = await deleteQuery(req.db, "DELETE FROM gerentes WHERE Codigo = ?", [Codigo], "Gerente")
        return res.send(result)

        }catch(error){
            return res.send(error)
        }
} 