import sequelize from "sequelize";
import { Sequelize, QueryTypes, DataTypes } from "sequelize";
import {app} from '../index'
// import Gerente from '../models/gerentesModel'
import db from "../database";





export const getGerentes = async (req, res) => {
    const dbGiama = app.get('db')
    
    const allGerentes = await dbGiama.query("SELECT Codigo, Nombre, Activo FROM gerentes")
    res.send(allGerentes)
}
export const getGerentesById = async (req, res) => {
    const gerentes = req.body
    const dbGiama = app.get('db').models.gerentes
    console.log(gerentes)
    const allGerentesById = await dbGiama.findAll(
        {
        where:{Codigo:gerentes.Codigo}
    })
    console.log(allGerentesById)
    res.send(allGerentesById)
}

export const postGerentes = async (req, res, error) => {
     let {Nombre, Activo} = req.body;
     console.log(req.body) 
     const dbGiama = app.get('db');
try{    await dbGiama.query('INSERT INTO gerentes (Nombre, Activo) VALUES (?,?) ',{
        Replacements: [Nombre, Activo? 0 : 1],
        type: QueryTypes.INSERT,    
    }),
    res.json({
        "message":"Gerente creado"
    });
    }catch(err){
        console.log(err)
    } }

    
 
export const updateGerentes = async (req, res) => {
    const gerentes = req.body;
    console.log(gerentes)
    
    const Gerente = app.get('db').models.gerentes;
    try{ await Gerente?.update(
    {
        Nombre: gerentes.Nombre,
        Activo: gerentes.Activo
    }
    ,{
        where: {Codigo: gerentes.Codigo}
    },
    res.json({
        "message":"Gerente Modificado",
        Nombre: gerentes.Nombre,
        Activo: gerentes.Activo
            })
        );
    }
    catch(err) {
        console.log(err)
    }
}
export const deleteGerentes = async (req, res, error) => {
    const gerentes = req.body;
    console.log(gerentes)
    const Gerente = app.get('db').models.gerentes
    try{await Gerente?.destroy({
        where: {Codigo: gerentes.id.Codigo} 
        }),
        res.json({
            "message":"Gerente borrado"
        });
        }catch(err){
            console.log(err)
        }
}



   
 
 