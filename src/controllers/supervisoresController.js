import { Sequelize, QueryTypes, DataTypes } from "sequelize";
import {app} from '../index'
import Supervisor from '../models/supervisoresModel'




export const getSupervisores = async (req, res) => {
    const dbGiama = app.get('db')
    const allSupervisores = await dbGiama.query("SELECT sucursales.`Codigo` AS 'Codigo', sucursales.`Nombre`, sucursales.`Email`, EsMiniEmprendedor, ValorPromedioMovil, gerentes.`Nombre` AS 'Gerente', NOT Inactivo AS Activo, zonas.`Nombre` AS 'Zona' FROM sucursales LEFT JOIN gerentes ON sucursales.`Gerente` = gerentes.`Codigo` LEFT JOIN zonas ON sucursales.`Zona` = zonas.`codigo`  ")
    res.send(allSupervisores)
}
export const getSupervisoresById = async (req, res) => {
    const dbGiama = app.get('db')
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
    const dbGiama = app.get('db')
    console.log(req.body) 
    let {Nombre, Email, Gerente, Activo:Inactivo, EsMiniEmprendedor, ValorPromedioMovil, Zona} = req.body;
    
     
    if(!Nombre || !Email || !Gerente || !ValorPromedioMovil || !Gerente) {
        return res.status(400).send({status: false, data: 'Faltan campos'})
    }
try{  
    await dbGiama.query("INSERT INTO sucursales (Nombre, Email, Gerente, Inactivo, EsMiniEmprendedor, ValorPromedioMovil, Zona) VALUES (?,?,?,?,?,?,?) ", {
        replacements: [Nombre, Email, Gerente  , Inactivo? 0: 1, EsMiniEmprendedor? 1 :0, ValorPromedioMovil? ValorPromedioMovil: null, Zona ],
        type: QueryTypes.INSERT
      }),
    
    res.json({
        "message":"Supervisor creado"
    });
    }catch(err){
        console.log(err)
    } }

    
 
export const updateSupervisores = async (req, res) => {
    const dbGiama = app.get('db')
    console.log(req.body) 
    let {Codigo, Nombre, Email, Gerente, Activo:Inactivo, EsMiniEmprendedor, ValorPromedioMovil, Zona} = req.body;
try{  
    await dbGiama.query("UPDATE sucursales SET Nombre = ?, Email = ?, Gerente = ?, Inactivo = ?, EsMiniEmprendedor = ?, ValorPromedioMovil = ?, Zona = ? WHERE Codigo = ? ", {
        replacements: [Nombre, Email, Gerente? Gerente: null, Inactivo? 0: 1, EsMiniEmprendedor? 1:0, ValorPromedioMovil, Zona, Codigo ],
        type: QueryTypes.UPDATE
      }),
    res.json({
        "message":"Supervisor Modificado",
        Nombre: Nombre,
        Activo: Activo
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
    const dbGiama = app.get('db')
    const result = await dbGiama.query("SELECT * from zonas")
    res.send(result)
}
   
 
 