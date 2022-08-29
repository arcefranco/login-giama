import sequelize from "sequelize";
import { Sequelize, QueryTypes, DataTypes } from "sequelize";
import {app} from '../index'
import db from "../database";
import Gerente from '../models/gerentesModel'




export const getGerentes = async (req, res) => {
    const dbGiama = app.get('db')
    const allGerentes = await dbGiama.query("SELECT Codigo, Nombre, Activo FROM gerentes")
    res.send(allGerentes)
}
export const getGerentesById = async (req, res) => {
    const gerentes = req.body
    console.log(gerentes)
    const allGerentesById = await Gerente.findAll(
        {
        where:{Codigo:gerentes.Codigo}
    }) 
    res.send(allGerentesById)
}

export const postGerentes = async (req, res, error) => {
     const {gerentes} = req.body;
     console.log(req.body)
    // const Nombre  = req.body.Nombre;
    // const Activo = req.body.Activo;
    // const {}
try{    await Gerente.create({
        Nombre: req.body.Nombre, 
        Activo: req.body.Activo, 
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
    try{ await Gerente.update(
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
    try{await Gerente.destroy({
        where: {Codigo: gerentes.id.Codigo} 
        }),
        res.json({
            "message":"Gerente borrado"
        });
        }catch(err){
            console.log(err)
        }
}



   
 
 