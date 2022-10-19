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