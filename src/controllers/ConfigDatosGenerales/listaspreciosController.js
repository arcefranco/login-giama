import {  QueryTypes } from "sequelize";
require('dotenv').config()
const moment = require('moment')
import { queryModelosOnLista } from "../../queries";
import { selectQuery } from "../queries/selectQuery";
import { updateQuery } from "../queries/updateQuery"
import { returnErrorMessage } from "../../helpers/errors/returnErrorMessage";



export const getListas = async (req, res) => {
    try {
        const result = await selectQuery(req.db, 'SELECT listasprecios.Codigo, listasprecios.Descripcion, DATE_FORMAT(listasprecios.VigenciaDesde, "%d-%m-%Y") AS `VigenciaDesde`, DATE_FORMAT(listasprecios.VigenciaHasta, "%d-%m-%Y") AS `VigenciaHasta` FROM listasprecios ORDER BY listasprecios.VigenciaDesde DESC')
         return res.send(result)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

export const getModelos = async (req, res) => {
    try {
        const result = await selectQuery(req.db, 'SELECT * FROM modelos WHERE Activo = 1')
        return res.send(result)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

export const modelosOnLista = async (req, res) => {
    const {lista, marca} = req.body
    console.log(lista, marca)
    try {
    const dbGiama = req.db
    const modelos = await dbGiama.query(queryModelosOnLista, {
        replacements: [lista, marca],
        type: QueryTypes.SELECT
    })
    if(Array.isArray(modelos)){
 
        return res.send(modelos)
    }else{
        throw modelos
    }

    } catch (error) {
        return res.send({status: false, message: returnErrorMessage(error)})
    }
}

export const updatePrecioModelo = async (req, res) => {
    const {precio, lista, codigoModelo} = req.body
    const dbGiama = req.db
    try {
        await dbGiama.query('UPDATE precios SET Precio = ? WHERE Codigo = ? AND CodigoModelo = ?', {
            replacements: [precio, lista, codigoModelo],
            type: QueryTypes.UPDATE
        })
        return res.send({status: true, message: 'Precio actualizado!', codigo: codigoModelo})
    } catch (error) {
         console.log(error)
         return res.send({status: false, message: returnErrorMessage(error) , codigo: codigoModelo})   
    }
}

export const insertModeloLista = async (req, res) => {
    const {Precio, Lista, Modelo, Marca} = req.body
    const dbGiama = req.db
    if(!Precio || !Lista || !Modelo || !Marca) return res.send({status: false, message: 'Faltan campos'})  
    try {
        await dbGiama.query('INSERT INTO precios (Marca, Codigo, CodigoModelo, Precio) VALUES (?,?,?,?)', {
            replacements: [Marca, Lista, Modelo, Precio],
            type: QueryTypes.INSERT
        })
        return res.send({status: true, message: 'Modelo insertado en lista', lista: Lista, codigo: Modelo})
    } catch (error) {
         console.log(error)
         return res.send({status: false, message: returnErrorMessage(error) , lista: Lista, codigo: Modelo})   
    }
}

export const deleteModeloFromLista = async (req, res) => {
    const {lista, codigoModelo} = req.body
    const dbGiama = req.db
    try {
        await dbGiama.query('DELETE FROM precios WHERE Codigo = ? AND CodigoModelo = ?', {
            replacements: [lista, codigoModelo],
            type: QueryTypes.UPDATE
        })
        return res.send({status: true, message: 'Eliminado correctamente', codigo: codigoModelo, lista: lista})
    } catch (error) {
         console.log(error)
         return res.send({status: false, message: returnErrorMessage(error) , codigo: codigoModelo, lista: lista})   
    }

}


export const createLista = async (req, res) => {
    const {Marca, Nombre, VigenciaDesde, VigenciaHasta} = req.body
    const dbGiama = req.db
    const {user} = req.usuario 
    const t = await dbGiama.transaction()
    if(!Marca|| !Nombre || !VigenciaDesde) return res.send({status: false, message: 'Faltan campos'})
    try {
        const result = await selectQuery(req.db, 'SELECT VigenciaHasta FROM listasprecios ORDER BY listasprecios.VigenciaDesde DESC LIMIT 1')
        if (result.VigenciaHasta === null) return res.send({status: false, message: 'No se pudo crear la lista porque ya hay otra lista vigente'})   
    } catch (error) {
        return res.send(error)
    }
    try {
       const newList = await dbGiama.query('INSERT INTO listasprecios (Marca, Descripcion, VigenciaDesde, VigenciaHasta, UsuarioAltaRegistro) VALUES (?,?,?,?,?)', {
            replacements: [Marca, Nombre, VigenciaDesde, VigenciaHasta ? VigenciaHasta : null, user],
            type: QueryTypes.INSERT,
            transaction: t
        })
       
        /* "newList" DEVUELVE EL CODIGO DE LA LISTA RECIEN CREADA */

        await dbGiama.query(`INSERT INTO precios(Marca, Codigo, CodigoModelo, Precio, UsuarioAltaRegistro)
        SELECT precios.Marca, ?, precios.CodigoModelo, precios.Precio, ?
        FROM precios
        WHERE precios.Codigo = (SELECT Codigo FROM listasprecios WHERE Codigo <> ? ORDER BY listasprecios.VigenciaDesde DESC LIMIT 1)`, {
            replacements: [newList[0], user, newList[0]],
            type: QueryTypes.INSERT,
            transaction: t
        })
        t.commit() 
        return res.send({status: true, message: 'Lista creada!'})
    } catch (error) {
         console.log(error)
         t.rollback()
         return res.send({status: false, message: returnErrorMessage(error) })   
    }

}

export const deleteLista = async (req, res) => {
    const {Codigo} = req.body
    const dbGiama = req.db
    const t = await dbGiama.transaction()
    try {
        await dbGiama.query('DELETE FROM precios WHERE Codigo = ?', {
            replacements: [Codigo], 
            type: QueryTypes.DELETE,
            transaction: t
        })

        await dbGiama.query('DELETE FROM listasprecios WHERE Codigo = ?', {
            replacements: [Codigo],
            type: QueryTypes.DELETE,
            transaction: t
        })
        t.commit()
        return res.send({status: true, message: 'Eliminado correctamente'})
    } catch (error) {
        t.rollback()
        console.log(error)
        return res.send({status: false, message: returnErrorMessage(error)})
    }

}

export const updateLista = async (req, res) => {
    const {Codigo, Descripcion, VigenciaDesde, VigenciaHasta} = req.body
    let VigenciaDParse = Date.parse(VigenciaDesde?.split('-').reverse().join('-'))
    let realVigenciaD = new Date(VigenciaDParse).toISOString().slice(0, 19).replace('T', ' ');
    let VigenciaHParse = VigenciaHasta && VigenciaHasta !== '00-00-0000' ? Date.parse(VigenciaHasta.split('-').reverse().join('-')) : null
    let realVigenciaH = VigenciaHasta && VigenciaHasta !== '00-00-0000'  ? new Date(VigenciaHParse).toISOString().slice(0, 19).replace('T', ' ') : null;

    try {
        const result = await updateQuery(req.db, 'UPDATE listasprecios SET Descripcion = ?, VigenciaDesde = ?, VigenciaHasta = ? WHERE Codigo = ?',
        [Descripcion, realVigenciaD, realVigenciaH, Codigo], "Lista de precios")
        return res.send(result)
    } catch (error) {
        console.log(error)
        return res.send({status: false, message: returnErrorMessage(error)})
    }

}