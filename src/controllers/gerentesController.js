import {  QueryTypes, DataTypes } from "sequelize";
import Sequelize from "sequelize";
require('dotenv').config()
import awaitWithTimeout from '../helpers/transaction/awaitWithTimeout'


export const getGerentes = async (req, res) => {
    const dbGiama = req.db
    
    const allGerentes = await dbGiama.query("SELECT Codigo, Nombre, Activo FROM gerentes")
    res.send(allGerentes)
}
 export const getGerentesActivos = async (req, res) => {
    const dbGiama = req.db
    
    const allGerentes = await dbGiama.query("SELECT Codigo, Nombre, Activo FROM gerentes WHERE Activo = 1")
    res.send(allGerentes)
}     
 export const getGerentesById = async (req, res) => {
    const gerentes = req.body
    const dbGiama = req.db
    const gerentesModel = dbGiama.models.gerentes
    const {user} = req.usuario

try {
    const allGerentesById =  await gerentesModel.findAll(
        {

        where:{Codigo:gerentes.Codigo}
    })
    const gerenteFinded = allGerentesById[0].dataValues
     if(gerenteFinded.inUpdate  && gerenteFinded.inUpdate !== user) {
        return res.send({status: false, message: `El registro esta siendo editado por ${gerenteFinded.inUpdate} `})
     }

  
    try {
    await dbGiama.query("UPDATE gerentes SET inUpdate = ? WHERE Codigo = ?",  {
        replacements: [user, gerentes.Codigo],
        type: QueryTypes.UPDATE
        })

        return res.send(gerenteFinded)
}   catch (error) {
        console.log('error:', error)
        return res.send(error)
        }
    
}       catch (error) {
        return res.send(error)
}
}

export const endUpdate = async (req, res) => {
    const {Codigo} = req.body
    const dbGiama = req.db
    const {user} = req.usuario
    if(!Codigo) return 'ID required'
    try {
        const actualUsuario = await dbGiama.query("SELECT inUpdate FROM gerentes WHERE Codigo = ?", 
        {
            replacements: [Codigo],
            type: QueryTypes.SELECT
        })
        if(actualUsuario[0].inUpdate === user){
            await dbGiama.query("UPDATE gerentes SET inUpdate = NULL WHERE Codigo = ?", {
                replacements: [Codigo],
                type: QueryTypes.UPDATE
            })
            return res.send('endUpdate OK!')
        }else{
            return
        }
    } catch (error) {
        return res.send(error)
    }
}


 export const postGerentes = async (req, res, error) => {
     let {Nombre, Activo} = req.body;
     const dbGiama = req.db;
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
     
try{    await dbGiama.query("INSERT INTO gerentes (Nombre, Activo, UsuarioAltaRegistro) VALUES (?,?,?)",{
        replacements: [Nombre, Activo? Activo : 0, user],
        type: QueryTypes.INSERT,    
    });
    return res.send({status: true, data: 'Gerente creado!'})
    }catch(err){
        console.log(err)
    } }
 
    
 
 export const updateGerentes = async (req, res) => {
    const gerentes = req.body;
    const dbGiama = req.db
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
    const Gerente = dbGiama.models.gerentes;
    try{ await Gerente?.update(
    {
        Nombre: gerentes.Nombre,
        Activo: gerentes.Activo,
        UsuarioAltaRegistro: user,
        inUpdate: null
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
    console.log(req.body)
    const {Codigo} = req.body;
    console.log('codigo delete gerentes: ', Codigo)
    const dbGiama = req.db
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
    const Gerente = dbGiama.models.gerentes
    try{await Gerente?.destroy({
        where: {Codigo: Codigo} 
        });
        return res.send({status: true, data: 'Gerente Borrado!'})
        }catch(err){
            console.log(err)
        }
} 



   
 
 