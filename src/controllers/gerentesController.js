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
     const user = req.body.HechoPor;
     try {
         const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
             replacements: [user],
             type: QueryTypes.SELECT
 
         })
         console.log('roles: ', roles)
         const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.18.1')
         if(!finded){
             return res.status(500).send({status: false, data: 'No tiene permitido realizar esta acción'})
         }
     } catch (error) {
         console.log(error)
         return res.status(400).send({status: false, data: error})
     }
     if(!Nombre ) {
        return res.status(400).send({status: false, data: 'Faltan campos'})
    }
     
try{    await dbGiama.query("INSERT INTO gerentes (Nombre, Activo) VALUES (?,?)",{
        replacements: [Nombre, Activo? Activo : 0],
        type: QueryTypes.INSERT,    
    });
    return res.send({status: true, data: 'Gerente creado!'})
    }catch(err){
        console.log(err)
    } }

    
 
export const updateGerentes = async (req, res) => {
    const gerentes = req.body;
    console.log(gerentes)
    const dbGiama = app.get('db')
    const user = req.body.HechoPor;
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        console.log('roles: ', roles)
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.18.2')
        if(!finded){
            return res.status(500).send({status: false, data: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, data: error})
    }
    const Gerente = app.get('db').models.gerentes;
    try{ await Gerente?.update(
    {
        Nombre: gerentes.Nombre,
        Activo: gerentes.Activo
    }
    ,{
        where: {Codigo: gerentes.Codigo}
    });
    return res.send({status: true, data: 'Gerente actualizado correctamente!'})
        
    }
    catch(err) {
        console.log(err)
    }
}
export const deleteGerentes = async (req, res, error) => {
    const {Codigo} = req.body;
    console.log(Codigo)
    const dbGiama = app.get('db')
    const user = req.body.HechoPor;
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        console.log('roles: ', roles)
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.18.3')
        if(!finded){
            return res.status(500).send({status: false, data: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, data: error})
    }
    const Gerente = app.get('db').models.gerentes
    try{await Gerente?.destroy({
        where: {Codigo: Codigo} 
        });
        return res.send({status: true, data: 'Gerente Borrado!'})
        }catch(err){
            console.log(err)
        }
}



   
 
 