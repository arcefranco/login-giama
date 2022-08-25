import sequelize from "sequelize";
import { Sequelize, QueryTypes, DataTypes } from "sequelize";
import db from "../database";
import Supervisor from '../models/supervisoresModel'

const dbGiama = db.sequelize


export const getSupervisores = async (req, res) => {
    const allSupervisores = await dbGiama.query("SELECT sucursales.`Codigo` AS 'Codigo', sucursales.`Nombre`, sucursales.`Email`, EsMiniEmprendedor, ValorPromedioMovil, gerentes.`Nombre` AS 'Gerente', NOT Inactivo AS Activo, zonas.`Nombre` AS 'Zona' FROM sucursales LEFT JOIN gerentes ON sucursales.`Gerente` = gerentes.`Codigo` LEFT JOIN zonas ON sucursales.`Zona` = zonas.`codigo`  ")
    res.send(allSupervisores)
}
export const getSupervisoresById = async (req, res) => {
    const supervisores = req.body
    console.log(supervisores)
    const allSupervisoresById = await  dbGiama
    .query
    ("SELECT sucursales.`Codigo` AS 'Codigo', sucursales.`Nombre`, sucursales.`Email`, EsMiniEmprendedor, ValorPromedioMovil, gerentes.`Nombre` AS 'Gerente', NOT Inactivo AS Activo, zonas.`Nombre` AS 'Zona' FROM sucursales LEFT JOIN gerentes ON sucursales.`Gerente` = gerentes.`Codigo` LEFT JOIN zonas ON sucursales.`Zona` = zonas.`codigo` WHERE sucursales.`Codigo` = ? ",
    {
      replacements: [supervisores.Codigo],
      type: QueryTypes.SELECT
    }
   );
    res.send(allSupervisoresById)
}

export const postSupervisores = async (req, res, error) => {
    console.log(req.body) 
    let {Nombre, Email, Gerente, Inactivo:Activo, EsMiniEmprendedor, ValorPromedioMovil, Zona} = req.body;
    
     
    // const Nombre  = req.body.Nombre;
    // const Activo = req.body.Activo;
    // const {}
try{  
    await dbGiama.query("INSERT INTO sucursales (Nombre, Email, Gerente, Inactivo, EsMiniEmprendedor, ValorPromedioMovil, Zona) VALUES (?,?,?,?,?,?,?) ", {
        replacements: [Nombre, Email, Gerente? Gerente: null, Activo? 1: 0, EsMiniEmprendedor, ValorPromedioMovil, Zona ],
        type: QueryTypes.INSERT
      }),
    
    res.json({
        "message":"Supervisor creado"
    });
    }catch(err){
        console.log(err)
    } }

    
 
export const updateSupervisores = async (req, res) => {
    console.log(req.body) 
    let {Codigo, Nombre, Email, Gerente, Inactivo:Activo, EsMiniEmprendedor, ValorPromedioMovil, Zona} = req.body;
try{  
    await dbGiama.query("UPDATE sucursales SET Nombre = ?, Email = ?, Gerente = ?, Inactivo = ?, EsMiniEmprendedor = ?, ValorPromedioMovil = ?, Zona = ? WHERE Codigo = ? ", {
        replacements: [Nombre, Email, Gerente? Gerente: null, Activo? 1: 0, EsMiniEmprendedor, ValorPromedioMovil, Zona, Codigo ],
        type: QueryTypes.UPDATE
      }),
    res.json({
        "message":"Supervisor Modificado",
        Nombre: supervisor.Nombre,
        Activo: supervisor.Activo
            })
        
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


export const getAllZonas = async (req, res) => {
    const result = await dbGiama.query("SELECT * from zonas")
    res.send(result)
}
   
 
 