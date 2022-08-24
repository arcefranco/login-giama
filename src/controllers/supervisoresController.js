import sequelize from "sequelize";
import { Sequelize, QueryTypes, DataTypes } from "sequelize";
import db from "../database";
import Supervisor from '../models/supervisoresModel'

const dbGiama = db.sequelize


export const getSupervisores = async (req, res) => {
    const allSupervisores = await dbGiama.query("SELECT sucursales.`Codigo` AS 'Codigo', sucursales.`Nombre`, sucursales.`Email`, EsMiniEmprendedor, ValorPromedioMovil, gerentes.`Nombre` AS 'Gerente', Inactivo, zonas.`Nombre` AS 'Zona' FROM sucursales LEFT JOIN gerentes ON sucursales.`Gerente` = gerentes.`Codigo` LEFT JOIN zonas ON sucursales.`Zona` = zonas.`codigo`  ")
    res.send(allSupervisores)
}
export const getSupervisoresById = async (req, res) => {
    const supervisores = req.body
    console.log(supervisores)
    const allSupervisoresById = await  dbGiama
    .query
    ("SELECT sucursales.`Codigo` AS 'Codigo', sucursales.`Nombre`, sucursales.`Email`, EsMiniEmprendedor, ValorPromedioMovil, gerentes.`Nombre` AS 'Gerente', Inactivo, zonas.`Nombre` AS 'Zona' FROM sucursales LEFT JOIN gerentes ON sucursales.`Gerente` = gerentes.`Codigo` LEFT JOIN zonas ON sucursales.`Zona` = zonas.`codigo`  ",
    {
      replacements: [supervisores.Codigo],
      type: QueryTypes.SELECT
    }
   );
    res.send(allSupervisoresById)
}

export const postSupervisores = async (req, res, error) => {
     const {supervisor} = req.body;
     console.log(req.body)
    // const Nombre  = req.body.Nombre;
    // const Activo = req.body.Activo;
    // const {}
try{    await Supervisor.create({
        Nombre: supervisor.Nombre, 
        Email:supervisor.Email,
        Gerente:supervisor.Gerente,
        EsMiniEmprendedor:supervisor.EsMiniEmprendedor,
        Inactivo: supervisor.Inactivo,
        Zona:supervisor.Zona,
    }),
    res.json({
        "message":"Supervisor creado"
    });
    }catch(err){
        console.log(err)
    } }

    
 
export const updateSupervisores = async (req, res) => {
    const supervisor = req.body;
    console.log(supervisor)
    try{ await Supervisor.update(
    {
        Nombre: supervisor.Nombre,
        Activo: supervisor.Activo
    }
    ,{
        where: {Codigo: supervisor.Codigo}
    },
    res.json({
        "message":"Supervisor Modificado",
        Nombre: supervisor.Nombre,
        Activo: supervisor.Activo
            })
        );
    }
    catch(err) {
        console.log(err)
    }
}
export const deleteSupervisores = async (req, res, error) => {
    const supervisor = req.body;
    console.log(supervisor)
    try{await Supervisor.destroy({
        where: {Codigo: supervisor.Codigo} 
        }),
        res.json({
            "message":"Supervisor borrado"
        });
        }catch(err){
            console.log(err)
        }
}



   
 
 