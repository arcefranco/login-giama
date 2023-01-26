import { ifNoCode } from "../../helpers/errors/ifNoCode";
import { beginUpdateQuery } from "../queries/beginUpdateQuery";
import { endUpdateQuery } from "../queries/endUpdateQuery";
import { findRolOrMaster } from "../queries/findRoles";
import { selectQuery } from "../queries/selectQuery";
import {insertQuery} from '../queries/insertQuery'
import { deleteQuery } from "../queries/deleteQuery";
import { updateQuery } from "../queries/updateQuery";
require('dotenv').config()

export const getAllSucursales = async (req, res) => {
    try {
        const result = await selectQuery(req.db, 
            "SELECT sucursalreal.`Codigo` AS 'Codigo', sucursalreal.`Nombre`, sucursalreal.`UsuarioAltaRegistro` FROM sucursalreal")
        return res.send(result)
    } catch (error) {
        return res.send(error)
    }
}


export const beginUpdate = async (req, res) => {
    const {Codigo} = req.body
    const {user} = req.usuario  
    try {
        ifNoCode(Codigo)
        const result = await beginUpdateQuery(req.db, user, Codigo, "sucursalreal")
        return res.send(result)
    } catch (error) {
        return res.send(error)
    }
}

export const endUpdate = async (req, res) => {
    const {Codigo} = req.body
    const {user} = req.usuario
    try {
        ifNoCode(Codigo)
        const result = await endUpdateQuery(req.db, user, Codigo, "sucursalreal")
        return res.send(result)
    } catch (error) {
        res.send(error)
    }
}

export const deleteSucursal = async(req, res) => {
    const {Codigo} = req.body    
    const dbGiama = req.db
    const {user} = req.usuario
    try {
        ifNoCode(Codigo)
        await findRolOrMaster(req.db, user, '1.7.16.3')
        const result =  await deleteQuery(req.db, "DELETE FROM sucursalreal WHERE CODIGO = ?", [Codigo], "Sucursal")
        return res.send(result)
    } catch (error) {
        return res.send(error)
    } 

}

export const updateSucursal = async (req, res) => {
    const {Codigo, Nombre} = req.body   
    const dbGiama = req.db
    const {user} = req.usuario
    try {
        ifNoCode(Codigo)
        await findRolOrMaster(req.db, user, '1.7.16.3')
        const result = await updateQuery(req.db, 'UPDATE sucursalreal SET Nombre = ?, inUpdate = NULL WHERE Codigo = ?', 
        [Nombre, Codigo], "Sucursal")
        return res.send(result)
    } catch (error) {
       return res.send(error)
    } 
}

export const createSucursal = async (req, res) => {
    const {Nombre} = req.body  
    const {user} = req.usuario
    try {
        await findRolOrMaster(req.db,user,'1.7.16.3')
        const result = await insertQuery(req.db, 
            'INSERT INTO sucursalreal (Nombre, UsuarioAltaRegistro) VALUES ( ? , ? )', [Nombre, user], "Sucursal")
        return res.send(result) 
    } catch (error) {
        return res.send(error)
    }
} 