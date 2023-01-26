import { insertQuery } from "../queries/insertQuery";
import { updateQuery } from "../queries/updateQuery";
import {deleteQuery} from "../queries/deleteQuery"
import { selectQuery } from "../queries/selectQuery";
import {ifNoCode} from "../../helpers/errors/ifNoCode"
import { beginUpdateQuery } from "../queries/beginUpdateQuery"
import { endUpdateQuery } from "../queries/endUpdateQuery";

require('dotenv').config()


export const getAllPuntosDeVenta = async (req, res) => {
    try {
        const result = await selectQuery(req.db, 'SELECT * FROM pre_puntosventa')
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
        const result = await beginUpdateQuery(req.db, user, Codigo, "pre_puntosventa")
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
        const result = await endUpdateQuery(req.db, user, Codigo, "pre_puntosventa")
        return res.send(result)
    } catch (error) {
        return res.send(error)
    }
}

export const deletePuntoDeVenta = async (req, res) => {
        const {Codigo} = req.body
      
        try {
            const result = await deleteQuery(req.db, 'DELETE FROM pre_puntosventa WHERE Codigo = ?',
            [Codigo], "Punto de venta")
            return res.send(result)
        } catch (error) {
            return res.send(error)
        }
}

export const createPuntoDeVenta = async (req, res) => {
    const {user} = req.usuario 
    const {Nombre} = req.body

    try {
        const result = await insertQuery(req.db, 'INSERT INTO pre_puntosventa (Nombre, UsuarioAltaRegistro) VALUES (?, ?)',
        [Nombre, user], "Punto de venta")
        return res.send(result)
    } catch (error) {
        return res.send(error)
    }
}


export const updatePuntoDeVenta = async (req, res) => {
    const {Nombre, Codigo} = req.body
    try {

        const result = await updateQuery(req.db, 'UPDATE pre_puntosventa SET Nombre = ? WHERE Codigo = ?',
        [Nombre, Codigo], "Punto de venta")
        return res.send(result)
        
    } catch (error) {
        return res.send(error)
    }
}