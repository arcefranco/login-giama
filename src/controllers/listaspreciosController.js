import {  QueryTypes } from "sequelize";
require('dotenv').config()
const moment = require('moment')
import { queryModelosOnLista } from "../queries";


export const getListas = async (req, res) => {
    const dbGiama = req.db
    try {
       const listas =  await dbGiama.query('SELECT listasprecios.Codigo, listasprecios.Descripcion, DATE_FORMAT(listasprecios.VigenciaDesde, "%d-%m-%Y") AS `VigenciaDesde`, DATE_FORMAT(listasprecios.VigenciaHasta, "%d-%m-%Y") AS `VigenciaHasta` FROM listasprecios ORDER BY listasprecios.VigenciaDesde DESC', {
        type: QueryTypes.SELECT
       })
       return res.send(listas)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

export const getModelos = async (req, res) => {
    const dbGiama = req.db
    try {
       const modelos =  await dbGiama.query('SELECT * FROM modelos WHERE Activo = 1', {
        type: QueryTypes.SELECT
       })
       return res.send(modelos)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

export const modelosOnLista = async (req, res) => {
    const {lista, marca} = req.body

    try {
    const dbGiama = req.db
    const modelos = await dbGiama.query(queryModelosOnLista, {
        replacements: [lista, marca],
        type: QueryTypes.SELECT
    })
    return res.send(modelos)

    } catch (error) {
        console.log(error)
        return res.send(error)
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
         return res.send({status: false, message: 'Hubo un error al actualizar el precio ):', codigo: codigoModelo})   
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
         return res.send({status: false, message: 'Hubo un error al insertar el modelo ):', lista: Lista, codigo: Modelo})   
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
         return res.send({status: false, message: error , codigo: codigoModelo, lista: lista})   
    }

}


export const createLista = async (req, res) => {
    const {Marca, Nombre, VigenciaD, VigenciaH} = req.body
    const dbGiama = req.db
    const {user} = req.usuario 
    if(!Marca|| !Nombre || !VigenciaD) return res.send({status: false, message: 'Faltan campos'})
    
    try {
        const lastList = await dbGiama.query('SELECT VigenciaHasta FROM listasprecios ORDER BY listasprecios.VigenciaDesde DESC LIMIT 1', {
            type: QueryTypes.SELECT
        })
        if (lastList[0].VigenciaHasta === null) return res.send({status: false, message: 'No se pudo crear la lista porque ya hay otra lista vigente'})   
    } catch (error) {
        console.log(error)
        return res.send({status: false, message: error})
    }
    try {
       const newList = await dbGiama.query('INSERT INTO listasprecios (Marca, Descripcion, VigenciaDesde, VigenciaHasta, UsuarioAltaRegistro) VALUES (?,?,?,?,?)', {
            replacements: [Marca, Nombre, VigenciaD, VigenciaH ? VigenciaH : null, user],
            type: QueryTypes.INSERT
        })
       


        await dbGiama.query(`INSERT INTO precios(Marca, Codigo, CodigoModelo, Precio, UsuarioAltaRegistro)
        SELECT precios.Marca, ?, precios.CodigoModelo, precios.Precio, ?
        FROM precios
        WHERE precios.Codigo = (SELECT Codigo FROM listasprecios WHERE Codigo <> ? ORDER BY listasprecios.VigenciaDesde DESC LIMIT 1)`, {
            replacements: [newList[0], user, newList[0]],
            type: QueryTypes.INSERT
        }) 
        return res.send({status: true, message: 'Lista creada!'})
    } catch (error) {
         console.log(error)
         return res.send({status: false, message: error })   
    }

}

export const deleteLista = async (req, res) => {
    const {Codigo} = req.body
    const dbGiama = req.db

    try {
        await dbGiama.query('DELETE FROM precios WHERE Codigo = ?', {
            replacements: [Codigo], 
            type: QueryTypes.DELETE
        })

        await dbGiama.query('DELETE FROM listasprecios WHERE Codigo = ?', {
            replacements: [Codigo],
            type: QueryTypes.DELETE
        })
        
        return res.send({status: true, message: 'Eliminado correctamente'})
    } catch (error) {
        console.log(error)
        return res.send({status: false, message: error})
    }

}

export const updateLista = async (req, res) => {
    const {Codigo, Descripcion, VigenciaD, VigenciaH} = req.body
    console.log(req.body)
    let VigenciaDParse = Date.parse(VigenciaD.split('-').reverse().join('-'))
    let realVigenciaD = new Date(VigenciaDParse).toISOString().slice(0, 19).replace('T', ' ');
    let VigenciaHParse = VigenciaH && VigenciaH !== '00-00-0000' ? Date.parse(VigenciaH.split('-').reverse().join('-')) : null
    let realVigenciaH = VigenciaH && VigenciaH !== '00-00-0000'  ? new Date(VigenciaHParse).toISOString().slice(0, 19).replace('T', ' ') : null;
    const dbGiama = req.db 

    try {
        await dbGiama.query('UPDATE listasprecios SET Descripcion = ?, VigenciaDesde = ?, VigenciaHasta = ? WHERE Codigo = ?', {
            replacements: [Descripcion, realVigenciaD, realVigenciaH, Codigo],
            type: QueryTypes.UPDATE
        })
        return res.send({status: true, message: 'Lista actualizada correctamente!'})
    } catch (error) {
        console.log(error)
        return res.send({status: false, message: error})
    }

}