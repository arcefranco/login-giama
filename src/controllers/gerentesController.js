import sequelize from "sequelize";
import { Sequelize, QueryTypes, DataTypes } from "sequelize";
import db from "../database";
import Gerente from '../models/gerentesModel'

const dbGiama = db.sequelize


export const getGerentes = async (req, res) => {
    const allGerentes = await dbGiama.query("SELECT * FROM gerentes")
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

    
    // res.send(postGerente, "Gerente creado en base de datos")
   

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

// export const updateGerentes = async (req, res) => {
//     const {gerentes} = req.body;
//     const updateGerentes = await dbGiama.query("UPDATE gerentes (Codigo, Nombre, Activo) SET ?",
//     {
//         replacements: [gerentes],
//         type:QueryTypes.UPDATE,
//     })
//     res.send(updateGerentes)
// }
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

<<<<<<< HEAD
=======
export const deleteGerentes = async (req, res, error) => {
    const {gerentes} = req.body;
    console.log(req.body)
   // const Nombre  = req.body.Nombre;
   // const Activo = req.body.Activo;
   // const {}
try{    await Gerente.destroy({
      where: {Codigo: req.body.Codigo,} 
        
   }),
   res.json({
       "message":"Gerente borrado"
   });
   }catch(err){
       console.log(err)
   } }

>>>>>>> 34f216f31a06654ae63beea65309cb56a56ab077
   
 
 