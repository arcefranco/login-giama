import {  QueryTypes } from "sequelize";
require('dotenv').config()

export const getPreSol = async (req, res) => {
    const dbGiama = req.db
    const {fechaD, fechaH, pMes, pAnio, pMarca} = req.body
    let fechaDConverted = fechaD.split("-").join("")
    let fechaHConverted = fechaH.split("-").join("")
    try {
        dbGiama
        .query('CALL net_estadisticopresol (:p_FECHAD, :p_FECHAH, :p_PERIODO_OBJ_MES, :p_PERIODO_OBJ_ANIO, :p_MARCA)', 
              {replacements: { p_FECHAD: fechaDConverted, p_FECHAH: fechaHConverted, p_PERIODO_OBJ_MES: pMes, p_PERIODO_OBJ_ANIO: pAnio, p_MARCA: pMarca }})
              .then(data=> { 
                return res.send({status: true, data: data})
            
            });
        
       
        
    } catch (error) {
        console.log(error)
        return res.send({status: false, data: 'Error al buscar los datos'})
    }
  
}

export const getDetalleIngresadas = async (req, res) => {

    const dbGiama = req.db
    const {fechaD, fechaH, pMarca, codSup} = req.body

    try {
        
        dbGiama.query('CALL net_estadisticopresoldetalleingresadas (:p_FECHAD, :p_FECHAH, :p_MARCA)', {
            replacements: {p_FECHAD: fechaD, p_FECHAH: fechaH, p_MARCA: pMarca ? pMarca : null}
        }).then(data => {
            return res.send({status: true, data: data.filter(({CodSupervisor}) => codSup.includes(CodSupervisor))})
        })
    } catch (error) {  
        console.log(error)
        return res.send({status: false, data: 'Error al buscar los datos'})
    } 

}


export const getDetalleMP = async (req, res) => {

    const dbGiama = req.db
    const {fechaD, fechaH, pMarca, codSup} = req.body
    try {
        
        dbGiama.query('CALL net_estadisticopresoldetallemp (:p_FECHAD, :p_FECHAH, :p_MARCA)', {
            replacements: {p_FECHAD: fechaD, p_FECHAH: fechaH, p_MARCA: pMarca ? pMarca : null}
        }).then(data => {
            return res.send({status: true, data: data.filter(({CodSup}) => codSup.includes(CodSup))})
        })
    } catch (error) {  
        console.log(error)
        return res.send({status: false, data: 'Error al buscar los datos'})
    }

}

export const getDetalleAnulRechazadas = async (req, res) => {

    const dbGiama = req.db
    const {fechaD, fechaH, pMarca, codSup} = req.body
    try {
        
        dbGiama.query('CALL net_estadisticopresoldetalleanuladasRechazada (:p_FECHAD, :p_FECHAH, :p_MARCA)', {
            replacements: {p_FECHAD: fechaD, p_FECHAH: fechaH, p_MARCA: pMarca ? pMarca : null}
        }).then(data => {
            return res.send({status: true, data: data.filter(({CodSupervisor}) => codSup.includes(CodSupervisor))})
        })
    } catch (error) {  
        console.log(error)
        return res.send({status: false, data: 'Error al buscar los datos'})
    }

}

export const getDetalleCruceScoring = async (req, res) => {

    const dbGiama = req.db
    const {fechaD, fechaH, pMarca, codSup} = req.body
    try {
        
        dbGiama.query('CALL net_estadisticopresoldetallecrucescoring (:p_FECHAD, :p_FECHAH, :p_MARCA)', {
            replacements: {p_FECHAD: fechaD, p_FECHAH: fechaH, p_MARCA: pMarca ? pMarca : null}
        }).then(data => {
            return res.send({status: true, data: data.filter(({CodSupervisor}) => codSup.includes(CodSupervisor))})
        })
    } catch (error) {  
        console.log(error)
        return res.send({status: false, data: 'Error al buscar los datos'})
    }

}

export const getDetalleProduccion = async (req, res) => {

    const dbGiama = req.db
    const {fechaD, fechaH, pMarca, codSup} = req.body
    try {
        
        dbGiama.query('CALL net_estadisticopresoldetalleproduccion (:p_FECHAD, :p_FECHAH, :p_MARCA)', {
            replacements: {p_FECHAD: fechaD, p_FECHAH: fechaH, p_MARCA: pMarca ? pMarca : null}
        }).then(data => {
            return res.send({status: true, data: data.filter(({CodSupervisor}) => codSup.includes(CodSupervisor))})
        })
    } catch (error) {  
        console.log(error)
        return res.send({status: false, data: 'Error al buscar los datos'})
    }

}

export const getDetallePendientes = async (req, res) => {

    const dbGiama = req.db
    const {fechaD, fechaH, pMarca, codSup} = req.body
    try {
        
        dbGiama.query('CALL net_estadisticopresoldetalle (:p_FECHAD, :p_FECHAH, :p_MARCA)', {
            replacements: {p_FECHAD: fechaD, p_FECHAH: fechaH, p_MARCA: pMarca ? pMarca : null}
        }).then(data => {
            return res.send({status: true, data: data.filter(({CodSupervisor}) => codSup.includes(CodSupervisor))})
        })
    } catch (error) {  
        console.log(error)
        return res.send({status: false, data: 'Error al buscar los datos'})
    }

}

export const getDetalleTresYSiete = async (req, res) => {

    const dbGiama = req.db
    const {fechaD, fechaH, pMarca, codSup} = req.body
    try {
        
        dbGiama.query('CALL net_estadisticopresoldetalleanuladas_c3c7 (:p_FECHAD, :p_FECHAH, :p_MARCA)', {
            replacements: {p_FECHAD: fechaD, p_FECHAH: fechaH, p_MARCA: pMarca ? pMarca : null}
        }).then(data => {
            return res.send({status: true, data: data.filter(({CodSupervisor}) => codSup.includes(CodSupervisor))})
        })
    } catch (error) {  
        console.log(error)
        return res.send({status: false, data: 'Error al buscar los datos'})
    }

}


export const getDetalleProdYCS = async (req, res) => {

    const dbGiama = req.db
    const {fechaD, fechaH, pMarca, codSup} = req.body
    try {
        
        dbGiama.query('CALL net_getproduccionyCcScoring (:p_FECHAD, :p_FECHAH, :p_MARCA)', {
            replacements: {p_FECHAD: fechaD, p_FECHAH: fechaH, p_MARCA: pMarca ? pMarca : null}
        }).then(data => {
            return res.send({status: true, data: data.filter(({CodSupervisor}) => codSup.includes(CodSupervisor))})
        })
    } catch (error) {  
        console.log(error)
        return res.send({status: false, data: 'Error al buscar los datos'})
    }

}