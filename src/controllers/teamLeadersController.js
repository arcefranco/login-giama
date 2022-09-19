import {  QueryTypes } from "sequelize";

import Sequelize from "sequelize";
require('dotenv').config()
import awaitWithTimeout from '../helpers/transaction/awaitWithTimeout'





export const getTeamLeaders = async (req, res) => {

        const dbGiama = req.db
        // const allTeamLeaders = await dbGiama.query("SELECT teamleader.`Codigo` AS 'Codigo', teamleader.`Nombre` AS 'Nombre' ,  sucursales.`Nombre` AS 'Supervisor', NOT Inactivo AS Activo,  FROM teamleader LEFT JOIN sucursales ON teamleader.`Sucursal` = sucursales.`Codigo`   ")
        const allTeamLeaders = await dbGiama.query("SELECT teamleader. `Codigo` AS 'Codigo', teamleader.`Nombre` AS 'Nombre', sucursales.`Nombre` AS 'Supervisor', NOT CONVERT(teamleader.`Inactivo`,DECIMAL) AS 'Activo' FROM teamleader LEFT JOIN  sucursales ON teamleader.`Sucursal` = sucursales.`Codigo`  ")
        res.send(allTeamLeaders)

}
export const getTeamLeadersActivos = async (req, res) => {

    const dbGiama = req.db
    // const allTeamLeaders = await dbGiama.query("SELECT teamleader.`Codigo` AS 'Codigo', teamleader.`Nombre` AS 'Nombre' ,  sucursales.`Nombre` AS 'Supervisor', NOT Inactivo AS Activo,  FROM teamleader LEFT JOIN sucursales ON teamleader.`Sucursal` = sucursales.`Codigo`   ")
    const allTeamLeaders = await dbGiama.query("SELECT teamleader. `Codigo` AS 'Codigo', teamleader.`Nombre` AS 'Nombre', sucursales.`Nombre` AS 'Supervisor', NOT CONVERT(teamleader.`Inactivo`,DECIMAL) AS 'Activo' FROM teamleader LEFT JOIN  sucursales ON teamleader.`Sucursal` = sucursales.`Codigo` WHERE CONVERT(teamleader.`Inactivo`, DECIMAL) = 0 ")
    res.send(allTeamLeaders)

}

export const getTeamLeadersById = async (req, res) => {
    const dbGiama = req.db
    const teamLeaders = req.body
    const {user} = req.usuario
    try {
        const teamLeader = await dbGiama
        .query
        ("SELECT teamleader.`inUpdate`, teamleader.`Codigo` AS 'Codigo', teamleader.`Nombre` AS 'Nombre', sucursales.`Nombre` AS 'Supervisor', NOT CONVERT(teamleader.`Inactivo`,DECIMAL) AS 'Activo' FROM teamleader LEFT JOIN  sucursales ON teamleader.`Sucursal` = sucursales.`Codigo`   WHERE teamleader.`Codigo` = ? ",
        {
          replacements: [teamLeaders.Codigo],
          type: QueryTypes.SELECT
        }
       );
       
         if(teamLeader[0].inUpdate) {
            return res.send({status: false, message: `El registro esta siendo editado por ${teamLeader[0].inUpdate} `})
         }
    
      
        try {
        await dbGiama.query("UPDATE teamleader SET inUpdate = ? WHERE Codigo = ?",  {
            replacements: [user, teamLeaders.Codigo],
            type: QueryTypes.UPDATE
            })
    
            return res.send(teamLeader[0])
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
        const actualUsuario = await dbGiama.query("SELECT inUpdate FROM teamleader WHERE Codigo = ?", 
        {
            replacements: [Codigo],
            type: QueryTypes.SELECT
        })
        if(actualUsuario[0].inUpdate === user){
            await dbGiama.query("UPDATE teamleader SET inUpdate = NULL WHERE Codigo = ?", {
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

export const postTeamLeaders = async (req, res, error) => {
    const dbGiama = req.db
    console.log(req.body)
    console.log(req.body.HechoPor) ;
    let {Nombre, Supervisor, Activo:Inactivo, } = req.body;
    const user = req.body.HechoPor;
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        console.log('roles: ', roles)
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.2.1')
        if(!finded){
            return res.status(500).send({status: false, data: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, data: error})
    } 
     
    if(!Nombre ||  !Supervisor  ) {
        return res.status(400).send({status: false, data: 'Faltan campos'})
    }
try{  
    await dbGiama.query("INSERT INTO teamleader (Nombre,  Sucursal, Inactivo, UsuarioAltaRegistro ) VALUES (?,?,CONVERT(?,BINARY),?) ", {
        replacements: [Nombre,  Supervisor  , Inactivo? Inactivo: 1, user  ],
        type: QueryTypes.INSERT
      });
      console.log('roles')

    return res.send({status: true, data: 'Team Leader creado con exito!'})
    }catch(err){
        console.log(err)
    } }

    
 
export const updateTeamLeaders = async (req, res) => {
    const dbGiama = req.db
    console.log(req.body) 
    console.log(req.body.HechoPor) 
    let {Codigo, Nombre,  Supervisor, Activo:Inactivo, } = req.body;
    const user = req.body.HechoPor;
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        console.log('roles: ', roles)
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.2.2')
        if(!finded){
            return res.status(500).send({status: false, data: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, data: error})
    } 

    try{  
    await dbGiama.query("UPDATE teamleader SET inUpdate = NULL, Nombre = ?,  Sucursal = ?, Inactivo = NOT CONVERT(?,BINARY), UsuarioAltaRegistro = ? WHERE Codigo = ? ", {
        replacements: [Nombre,  Supervisor? Supervisor:null, Inactivo, user , Codigo ],
        type: QueryTypes.UPDATE
      });
      return res.send({status: true, data: 'Team Leader modificado con exito!'})
        
    }
    catch(err) {
        console.log(err)
    }
}


export const deleteTeamLeaders = async (req, res, error) => {
    const dbGiama = req.db
    const {Codigo} = req.body;
    
    const user = req.body.HechoPor;
    console.log(req.body)
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        console.log('roles: ', roles)
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.2.3')
        if(!finded){
            return res.status(500).send({status: false, data: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, data: error})
    } 
    const TeamLeaders = dbGiama.models.teamleader
    try{await TeamLeaders.destroy({
        where: {Codigo: Codigo} 
        });
        return res.send({status: true, data: 'Team Leader Borrado!'})
        }catch(err){
            console.log(err)
        }
}


export const getAllZonas = async (req, res) => {
    const dbGiama = req.db
    const result = await dbGiama.query("SELECT * from zonas")
    res.send(result)
}
   
 
 