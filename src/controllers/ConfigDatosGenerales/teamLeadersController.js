import {  QueryTypes } from "sequelize";
import { selectQuery } from "../queries/selectQuery";
import { ifNoCode } from "../../helpers/errors/ifNoCode";
import { beginUpdateQuery } from "../queries/beginUpdateQuery";
import { endUpdateQuery } from "../queries/endUpdateQuery";
import { findRolOrMaster } from "../queries/findRoles";
import {returnErrorMessage} from '../../helpers/errors/returnErrorMessage'
import { insertQuery } from "../queries/insertQuery";
import { updateQuery } from "../queries/updateQuery";
require('dotenv').config()

export const getTeamLeaders = async (req, res) => {
    try {               
        const result = await selectQuery(req.db, "SELECT teamleader. `Codigo` AS 'Codigo', teamleader.`Nombre` AS 'Nombre', sucursales.`Codigo` AS 'Supervisor', NOT CONVERT(teamleader.`Inactivo`,DECIMAL) AS 'Activo' FROM teamleader LEFT JOIN  sucursales ON teamleader.`Sucursal` = sucursales.`Codigo`  ") 
            return res.send(result)
        
        } catch (error) {
            return res.send(error)
        }
}
export const getTeamLeadersActivos = async (req, res) => {

    const dbGiama = req.db
    const allTeamLeaders = await dbGiama.query("SELECT teamleader. `Codigo` AS 'Codigo', teamleader.`Nombre` AS 'Nombre', sucursales.`Nombre` AS 'Supervisor', NOT CONVERT(teamleader.`Inactivo`,DECIMAL) AS 'Activo' FROM teamleader LEFT JOIN  sucursales ON teamleader.`Sucursal` = sucursales.`Codigo` WHERE CONVERT(teamleader.`Inactivo`, DECIMAL) = 0 ", {
        type: QueryTypes.SELECT
    })
    res.send(allTeamLeaders)

}

export const beginUpdate = async (req, res) => {
    const {Codigo} = req.body
    const {user} = req.usuario

    try {
        ifNoCode(Codigo)
        const result = await beginUpdateQuery(req.db, user, Codigo, "teamleader")
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
        const result = await endUpdateQuery(req.db, user, Codigo, "teamleader")
        return res.send(result)
    } catch (error) {
        return res.send(error)
    }
}

export const postTeamLeaders = async (req, res) => {
    let {Nombre, Supervisor, Activo:Inactivo, } = req.body;
    const {user} = req.usuario;
    try {
        await findRolOrMaster(req.db, user, '1.7.2.1')
    } catch (error) {
        return res.send(error)
    } 
     
    if(!Nombre ||  !Supervisor) {
        return res.send({status: false, message: 'Faltan campos'})
    }
try{  
    const result = await insertQuery(req.db, "INSERT INTO teamleader (Nombre,  Sucursal, Inactivo, UsuarioAltaRegistro ) VALUES (?,?,CONVERT(?,BINARY),?) ", 
    [Nombre,  Supervisor  , Inactivo? Inactivo: 1, user ], "Team Leader")
    
    return res.send(result)

    }catch(error){
        return res.send(error)
    } 
}

    
 
export const updateTeamLeaders = async (req, res) => {
    const dbGiama = req.db
    let {Codigo, Nombre,  Supervisor, Activo:Inactivo, } = req.body;
    const {user} = req.usuario;
    try {
    await findRolOrMaster(req.db, user, '1.7.2.2')
    
    const result = await updateQuery(req.db, "UPDATE teamleader SET inUpdate = NULL, Nombre = ?,  Sucursal = ?, Inactivo = NOT CONVERT(?,BINARY), UsuarioAltaRegistro = ? WHERE Codigo = ? ",
    [Nombre,  Supervisor? Supervisor:null, Inactivo, user , Codigo ], "Team Leader")
    
    return res.send(result)
    } catch (error) {
        return res.send(error)
    } 

}


export const deleteTeamLeaders = async (req, res, error) => {
    const dbGiama = req.db
    const {Codigo} = req.body;
    
    const {user} = req.usuario;
    console.log(req.body)
    try {
        await findRolOrMaster(req.db, user, '1.7.2.3')
    } catch (error) {
        
        return res.send(error)
    } 
    const TeamLeaders = dbGiama.models.teamleader
    try{await TeamLeaders.destroy({
        where: {Codigo: Codigo} 
        });
        return res.send({status: true, message: 'Team Leader Borrado!'})
        }catch(error){
            return res.send({status: false, message: returnErrorMessage(error)})
        }
}