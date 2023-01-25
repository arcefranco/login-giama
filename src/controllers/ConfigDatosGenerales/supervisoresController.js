import {  QueryTypes } from "sequelize";
import Sequelize from "sequelize";
import { selectQuery } from "../queries/selectQuery";
import { ifNoCode } from "../../helpers/errors/ifNoCode";
import { beginUpdateQuery } from "../queries/beginUpdateQuery";
import { endUpdateQuery } from "../queries/endUpdateQuery";
import { findRolOrMaster } from "../queries/findRoles";
import { insertQuery } from "../queries/insertQuery";
import { returnErrorMessage } from "../../helpers/errors/returnErrorMessage";
require('dotenv').config()

export const getSupervisores = async (req, res) => {
    try {  
        const result = await selectQuery(req.db, 
        "SELECT sucursales.`Codigo` AS 'Codigo', sucursales.`Nombre`, sucursales.`Email`, EsMiniEmprendedor, ValorPromedioMovil, gerentes.`Codigo` AS 'Gerente', NOT Inactivo AS Activo, zonas.`codigo` AS 'Zona' FROM sucursales LEFT JOIN gerentes ON sucursales.`Gerente` = gerentes.`Codigo` LEFT JOIN zonas ON sucursales.`Zona` = zonas.`codigo`")
        
        return res.send(result)

    } catch (error) {
        return res.send(error)
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
    const {user} = req.usuario
    try {

        ifNoCode(Codigo)
        const result = await beginUpdateQuery(req.db, user, Codigo, "sucursales")
        return res.send(result)

    } catch (error) {
        return res.send(error)
    }
}

export const endUpdate = async (req, res) => {
    const {Codigo} = req.body
    const {user} = req.usuario

    try {
        ifNoCode(Codigo)
        const result = await endUpdateQuery(req.db, user, Codigo, "sucursales")
        return res.send(result)
    } catch (error) {
        return res.send(error)
    }
}

export const postSupervisores = async (req, res) => {
    let {Nombre, Email, Gerente, Activo:Inactivo, EsMiniEmprendedor, ValorPromedioMovil, Zona} = req.body;
    const {user} = req.usuario;
    try {
        await findRolOrMaster(req.db, user, '1.7.2.1')
    } catch (error) {
        return res.send(error)
    } 
     
    if(!Nombre || !Email ) {
        return res.send({status: false, message: 'Faltan campos'})
    }
try{  
    const result = await insertQuery(req.db, "INSERT INTO sucursales (Nombre, Email, Gerente, Inactivo, EsMiniEmprendedor, ValorPromedioMovil, Zona, UsuarioAltaRegistro ) VALUES (?,?,?,NOT ?,?,?,?,?) ",
    [Nombre, Email, Gerente? Gerente : null  , Inactivo? Inactivo : 0, EsMiniEmprendedor? EsMiniEmprendedor :0, ValorPromedioMovil? ValorPromedioMovil: 0, Zona? Zona : null, user ], "Supervisor")

    return res.send(result)

    }catch(error){
        return res.send(error)
    } }

    
 
export const updateSupervisores = async (req, res) => {
    const dbGiama = req.db
    let {Codigo, Nombre, Email, Gerente, Activo:Inactivo, EsMicro, VPM, Zona} = req.body;
    const {user} = req.usuario;
    try {
        await findRolOrMaster(req.db, user, '1.7.2.2')
    } catch (error) {
        return res.send(error)
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
    catch(error) {
        return res.send({status: false, message: returnErrorMessage(error)})
    }
}


export const deleteSupervisores = async (req, res) => {
    const dbGiama = req.db
    const {Codigo} = req.body;
    
    const {user} = req.usuario;
    try {
        await findRolOrMaster(req.db, user, '1.7.2.3')
    } catch (error) {
        return res.send(error)
    } 
    const Supervisor =  dbGiama.models.sucursales
    try{
        await Supervisor.destroy({
        where: {Codigo: Codigo} 
        });
        return res.send({status: true, message: 'Supervisor Borrado!'})
        }catch(error){
            return res.status(400).send({status: false, message: returnErrorMessage(error)})
        }
}


export const getAllZonas = async (req, res) => {
    const dbGiama = req.db
    try {

        const result = await selectQuery(req.db, "SELECT * from zonas")
        return res.send(result)
        
    } catch (error) {

        return res.send(error)
    
    }
}