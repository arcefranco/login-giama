import sequelize from "sequelize";
import { Sequelize, QueryTypes, DataTypes } from "sequelize";
import db from "../database";
import Gerente from '../models/gerentesModel'

const dbGiama = db.sequelize


export const getGerentes = async (req, res) => {
    const allGerentes = await dbGiama.query("SELECT * FROM gerentes")
    res.send(allGerentes)
}
export const postGerentes = async (req, res, error) => {
     const {gerentes} = req.body;
    // const {Nombre}  = req.body.Nombre;
    // const {Activo} = req.body.Nombre;
    // const {}
    const postGerente = await Gerente.create({
        Nombre: req.body.Nombre, 
        Activo: req.body.Activo, 
    })
    res.send(postGerente)
}

// export const postGerentes = async (req, res, error) => {
//     const {gerentes} = req.body;
//     const {Nombre}  = req.body.Nombre;
//     const {Activo} = req.body.Activo;
//     // const {}
//     const postGerente = await dbGiama.query("INSERT INTO gerentes (Nombre, Activo) VALUES (Nombre = ?, Activo = ?)",
//     {
//         replacements: [Nombre, Activo],
//         type:QueryTypes.INSERT,
//     })
//     res.send(postGerente)
// }

export const updateGerentes = async (req, res) => {
    const {gerentes} = req.body;
    const updateGerentes = await dbGiama.query("UPDATE gerentes (Codigo, Nombre, Activo) SET ?",
    {
        replacements: [gerentes],
        type:QueryTypes.UPDATE,
    })
    res.send(updateGerentes)
}


 