import {  QueryTypes } from "sequelize";
import Sequelize from "sequelize";
require('dotenv').config()




export const getSupervisores = async (req, res) => {

    try {
        
    const dbGiama = req.db
    const allSupervisores = await dbGiama.query("SELECT sucursales.`Codigo` AS 'Codigo', sucursales.`Nombre`, sucursales.`Email`, EsMiniEmprendedor, ValorPromedioMovil, gerentes.`Codigo` AS 'Gerente', NOT Inactivo AS Activo, zonas.`codigo` AS 'Zona' FROM sucursales LEFT JOIN gerentes ON sucursales.`Gerente` = gerentes.`Codigo` LEFT JOIN zonas ON sucursales.`Zona` = zonas.`codigo`  ", {
        type: QueryTypes.SELECT
    })
    
    if(Array.isArray(allSupervisores)){
         res.send(allSupervisores) 
    }else{
        throw Error(allSupervisores)
    }

    } catch (error) {
        if(error.hasOwnProperty('name')){

            return res.send(JSON.stringify(error.name))
        }else{
            return res.send({message: JSON.stringify(error)})
        }
    }

}

export const getSupervisoresActivos = async (req, res) => {

    const dbGiama = req.db
    const allSupervisores = await dbGiama.query("SELECT sucursales.`Codigo` AS 'Codigo', sucursales.`Nombre`, sucursales.`Email`, EsMiniEmprendedor, ValorPromedioMovil, gerentes.`Nombre` AS 'Gerente', NOT Inactivo AS Activo, zonas.`Nombre` AS 'Zona' FROM sucursales LEFT JOIN gerentes ON sucursales.`Gerente` = gerentes.`Codigo` LEFT JOIN zonas ON sucursales.`Zona` = zonas.`codigo` WHERE Inactivo = 0 ", {
        type: QueryTypes.SELECT
    })
    res.send(allSupervisores)

}
export const beginUpdate = async (req, res) => {
    const {Codigo} = req.body
    const dbGiama = req.db
    const {user} = req.usuario
    
    if(typeof Codigo !== 'number')  return res.send({status: false, message: 'Codigo no valido'})
    try {
        const actualUsuario = await dbGiama.query("SELECT inUpdate FROM sucursales WHERE Codigo = ?", 
        {
            replacements: [Codigo],
            type: QueryTypes.SELECT
        })
        if(actualUsuario[0].inUpdate === null  || actualUsuario[0].inUpdate === user){
            await dbGiama.query("UPDATE sucursales SET inUpdate = ? WHERE Codigo = ?", {
                replacements: [user, Codigo],
                type: QueryTypes.UPDATE
            })
            return res.send({codigo: Codigo})
        }else{
            return res.send({status: false, message: `El registro está siendo editado por ${actualUsuario[0].inUpdate}`})
        }
    } catch (error) {
        return res.send({status: false, message: 'Error al comenzar modificaciones'})
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
            return res.send('{status: true}')
        }else{
            return
        }
    } catch (error) {
        return res.send(error)
    }
}

export const postSupervisores = async (req, res, error) => {
    const dbGiama = req.db
    let {Nombre, Email, Gerente, Activo:Inactivo, EsMiniEmprendedor, ValorPromedioMovil, Zona} = req.body;
    const {user} = req.usuario;
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        console.log('roles: ', roles)
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.2.1')
        if(!finded){
            return res.status(500).send({status: false, message: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.send({status: false, message: error.name})
    } 
     
    if(!Nombre || !Email ) {
        return res.send({status: false, message: 'Faltan campos'})
    }
try{  
    await dbGiama.query("INSERT INTO sucursales (Nombre, Email, Gerente, Inactivo, EsMiniEmprendedor, ValorPromedioMovil, Zona, UsuarioAltaRegistro ) VALUES (?,?,?,NOT ?,?,?,?,?) ", {
        replacements: [Nombre, Email, Gerente? Gerente : null  , Inactivo? Inactivo : 0, EsMiniEmprendedor? EsMiniEmprendedor :0, ValorPromedioMovil? ValorPromedioMovil: 0, Zona? Zona : null, user ],
        type: QueryTypes.INSERT
      });
      console.log('roles')

    return res.send({status: true, message: 'Supervisor creado con exito!'})
    }catch(err){
        console.log(err)
        return res.send({status: false, message: err.name})
    } }

    
 
export const updateSupervisores = async (req, res) => {
    const dbGiama = req.db
    let {Codigo, Nombre, Email, Gerente, Activo:Inactivo, EsMicro, VPM, Zona} = req.body;
    const {user} = req.usuario;
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        console.log('roles: ', roles)
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.2.2')
        if(!finded){
            return res.status(500).send({status: false, message: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.send({status: false, message: error.name})
    } 
    if(!Nombre || !Email ) {
        return res.send({status: false, message: 'Faltan campos'})
    }
    try{  
    await dbGiama.query("UPDATE sucursales SET Nombre = ?, Email = ?, Gerente = ?, Inactivo = NOT ?, EsMiniEmprendedor = ?, ValorPromedioMovil = ?, Zona = ?, inUpdate = NULL, UsuarioAltaRegistro = ? WHERE Codigo = ? ", {
        replacements: [Nombre, Email, Gerente? Gerente : null, Inactivo, EsMicro? EsMicro : null, VPM? VPM : null, Zona? Zona: null, user, Codigo ],
        type: QueryTypes.UPDATE
      });
      return res.send({status: true, message: 'Supervisor modificado con exito!'})
        
    }
    catch(err) {
        console.log(err)
        return res.send({status: false, message: err.name})
    }
}


export const deleteSupervisores = async (req, res, error) => {
    const dbGiama = req.db
    const {Codigo} = req.body;
    
    const {user} = req.usuario;
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        console.log('roles: ', roles)
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.2.3')
        if(!finded){
            return res.status(500).send({status: false, message: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, message: error.name})
    } 
    const Supervisor =  dbGiama.models.sucursales
    try{await Supervisor.destroy({
        where: {Codigo: Codigo} 
        });
        return res.send({status: true, message: 'Supervisor Borrado!'})
        }catch(err){
            console.log(err)
            return res.status(400).send({status: false, message: err.name})
        }
}


export const getAllZonas = async (req, res) => {
    const dbGiama = req.db
    try {
        const result = await dbGiama.query("SELECT * from zonas", {
            type: QueryTypes.SELECT
        })
        if(Array.isArray(result)){
    
            res.send(result)
        }else{
    
            res.send({status: false, message: 'Error al cargar las zonas'})
        }
        
    } catch (error) {
        if(error.hasOwnProperty('sqlMessage')){
            
            res.send({status: false, message: JSON.stringify(error.sqlMessage)})
        }else{
            res.send({status: false, message: JSON.stringify(error)})
        }
    
    }
}
   
 
 