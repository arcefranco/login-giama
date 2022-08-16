import { QueryTypes } from "sequelize/types";
import db from "../database";

const dbGiama = db.sequelize


export const getGerentes = async (req, res) => {
    const allGerentes = await dbGiama.query("SELECT * FROM gerentes")
    res.send(allGerentes)
}
export const postGerentes = async (req, res, error) => {
    const {gerentes} = req.body;
    // const {}
    const postGerente = await dbGiama.query("INSERT INTO gerentes (Nombre, Activo) VALUES (?)",
    {
        replacements: [gerentes],
        type:QueryTypes.INSERT,
    })
    res.send(postGerente)
}

export const updateGerentes = async (req, res) => {
    const {gerentes} = req.body;
    const updateGerentes = await dbGiama.query("UPDATE gerentes (Codigo, Nombre, Activo) VALUES ?",
    {
        replacements: [gerentes],
        type:QueryTypes.UPDATE,
    })
    res.send(updateGerentes)
}