import {  QueryTypes } from "sequelize";
import Sequelize from "sequelize";
require('dotenv').config()
import awaitWithTimeout from '../helpers/transaction/awaitWithTimeout'



export const getSupervisores = async (req, res) => {

        const dbGiama = req.db
        const allSupervisores = await dbGiama.query("SELECT sucursales.`Codigo` AS 'Codigo', sucursales.`Nombre`, sucursales.`Email`, EsMiniEmprendedor, ValorPromedioMovil, gerentes.`Nombre` AS 'Gerente', NOT Inactivo AS Activo, zonas.`Nombre` AS 'Zona' FROM sucursales LEFT JOIN gerentes ON sucursales.`Gerente` = gerentes.`Codigo` LEFT JOIN zonas ON sucursales.`Zona` = zonas.`codigo`  ")
        res.send(allSupervisores)

}

export const getSupervisoresActivos = async (req, res) => {

    const dbGiama = req.db
    const allSupervisores = await dbGiama.query("SELECT sucursales.`Codigo` AS 'Codigo', sucursales.`Nombre`, sucursales.`Email`, EsMiniEmprendedor, ValorPromedioMovil, gerentes.`Nombre` AS 'Gerente', NOT Inactivo AS Activo, zonas.`Nombre` AS 'Zona' FROM sucursales LEFT JOIN gerentes ON sucursales.`Gerente` = gerentes.`Codigo` LEFT JOIN zonas ON sucursales.`Zona` = zonas.`codigo` WHERE Inactivo = 0 ")
    res.send(allSupervisores)

}
export const getSupervisoresById = async (req, res) => {
    const dbGiama = req.db
    const supervisores = req.body
    const {user} = req.usuario
try {
    const allSupervisoresById = await dbGiama
    .query
    ("SELECT sucursales.`inUpdate`, sucursales.`Codigo` AS 'Codigo', sucursales.`Nombre`, sucursales.`Email`, EsMiniEmprendedor, ValorPromedioMovil, gerentes.`Nombre` AS 'Gerente', NOT Inactivo AS Activo, zonas.`Nombre` AS 'Zona' FROM sucursales LEFT JOIN gerentes ON sucursales.`Gerente` = gerentes.`Codigo` LEFT JOIN zonas ON sucursales.`Zona` = zonas.`codigo` WHERE sucursales.`Codigo` = ? ",
    {
      replacements: [supervisores.Codigo],
      type: QueryTypes.SELECT
    }
   );
   
     if(allSupervisoresById[0].inUpdate) {
        return res.send({status: false, message: `El registro esta siendo editado por ${allSupervisoresById[0].inUpdate} `})
     }

  
    try {
    await dbGiama.query("UPDATE sucursales SET inUpdate = ? WHERE Codigo = ?",  {
        replacements: [user, supervisores.Codigo],
        type: QueryTypes.UPDATE
        })

        return res.send(allSupervisoresById[0])
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
        const actualUsuario = await dbGiama.query("SELECT inUpdate FROM sucursales WHERE Codigo = ?", 
        {
            replacements: [Codigo],
            type: QueryTypes.SELECT
        })
        if(actualUsuario[0].inUpdate === user){
            await dbGiama.query("UPDATE sucursales SET inUpdate = NULL WHERE Codigo = ?", {
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

export const postSupervisores = async (req, res, error) => {
    const dbGiama = req.db
    console.log(req.body)
    console.log(req.body.HechoPor) ;
    let {Nombre, Email, Gerente, Activo:Inactivo, EsMiniEmprendedor, ValorPromedioMovil, Zona} = req.body;
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
     
    if(!Nombre || !Email ) {
        return res.status(400).send({status: false, data: 'Faltan campos'})
    }
try{  
    await dbGiama.query("INSERT INTO sucursales (Nombre, Email, Gerente, Inactivo, EsMiniEmprendedor, ValorPromedioMovil, Zona, UsuarioAltaRegistro ) VALUES (?,?,?,NOT ?,?,?,?,?) ", {
        replacements: [Nombre, Email, Gerente? Gerente : null  , Inactivo? Inactivo : 0, EsMiniEmprendedor? EsMiniEmprendedor :0, ValorPromedioMovil? ValorPromedioMovil: 0, Zona? Zona : null, user ],
        type: QueryTypes.INSERT
      });
      console.log('roles')

    return res.send({status: true, data: 'Supervisor creado con exito!'})
    }catch(err){
        console.log(err)
    } }

    
 
export const updateSupervisores = async (req, res) => {
    const dbGiama = req.db
    console.log(req.body) 
    console.log(req.body.HechoPor) 
    let {Codigo, Nombre, Email, Gerente, Activo:Inactivo, EsMiniEmprendedor, ValorPromedioMovil, Zona} = req.body;
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
    if(!Nombre || !Email ) {
        return res.status(400).send({status: false, data: 'Faltan campos'})
    }
    try{  
    await dbGiama.query("UPDATE sucursales SET Nombre = ?, Email = ?, Gerente = ?, Inactivo = NOT ?, EsMiniEmprendedor = ?, ValorPromedioMovil = ?, Zona = ?, inUpdate = NULL, UsuarioAltaRegistro = ? WHERE Codigo = ? ", {
        replacements: [Nombre, Email, Gerente? Gerente : null, Inactivo, EsMiniEmprendedor, ValorPromedioMovil, Zona? Zona: null, user, Codigo ],
        type: QueryTypes.UPDATE
      });
      return res.send({status: true, data: 'Supervisor modificado con exito!'})
        
    }
    catch(err) {
        console.log(err)
    }
}


export const deleteSupervisores = async (req, res, error) => {
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
    const Supervisor =  dbGiama.models.sucursales
    try{await Supervisor.destroy({
        where: {Codigo: Codigo} 
        });
        return res.send({status: true, data: 'Supervisor Borrado!'})
        }catch(err){
            console.log(err)
        }
}


export const getAllZonas = async (req, res) => {
    const dbGiama = req.db
    const result = await dbGiama.query("SELECT * from zonas")
    res.send(result)
}
   
 
 