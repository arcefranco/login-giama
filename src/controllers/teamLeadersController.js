import {  QueryTypes } from "sequelize";
import {app} from '../index'
// import Supervisor from '../models/supervisoresModel'






export const getTeamLeaders = async (req, res) => {

        const dbGiama = app.get('db')
        // const allTeamLeaders = await dbGiama.query("SELECT teamleader.`Codigo` AS 'Codigo', teamleader.`Nombre` AS 'Nombre' ,  sucursales.`Nombre` AS 'Supervisor', NOT Inactivo AS Activo,  FROM teamleader LEFT JOIN sucursales ON teamleader.`Sucursal` = sucursales.`Codigo`   ")
        const allTeamLeaders = await dbGiama.query("SELECT teamleader. `Codigo` AS 'Codigo', teamleader.`Nombre` AS 'Nombre', sucursales.`Nombre` AS 'Supervisor', NOT CONVERT(teamleader.`Inactivo`,DECIMAL) AS 'Activo' FROM teamleader LEFT JOIN  sucursales ON teamleader.`Sucursal` = sucursales.`Codigo`  ")
        res.send(allTeamLeaders)

}
export const getTeamLeadersById = async (req, res) => {
    const dbGiama = app.get('db')
    const teamLeaders = req.body
    console.log(teamLeaders)
    const allTeamLeadersById = await  dbGiama
    .query
    ("SELECT teamleader.`Codigo` AS 'Codigo', teamleader.`Nombre` AS 'Nombre', sucursales.`Nombre` AS 'Supervisor', NOT CONVERT(teamleader.`Inactivo`,DECIMAL) AS 'Activo' FROM teamleader LEFT JOIN  sucursales ON teamleader.`Sucursal` = sucursales.`Codigo`   WHERE teamleader.`Codigo` = ? ",
    {
      replacements: [teamLeaders.Codigo],
      type: QueryTypes.SELECT
    }
   );
    res.send(allTeamLeadersById)
}

export const postTeamLeaders = async (req, res, error) => {
    const dbGiama = app.get('db')
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
    const dbGiama = app.get('db')
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
    await dbGiama.query("UPDATE teamleader SET Nombre = ?,  Sucursal = ?, Inactivo = NOT CONVERT(?,BINARY), UsuarioAltaRegistro = ? WHERE Codigo = ? ", {
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
    const dbGiama = app.get('db')
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
    const TeamLeaders = app.get('db').models.teamleader
    try{await TeamLeaders.destroy({
        where: {Codigo: Codigo} 
        });
        return res.send({status: true, data: 'Team Leader Borrado!'})
        }catch(err){
            console.log(err)
        }
}


export const getAllZonas = async (req, res) => {
    const dbGiama = app.get('db')
    const result = await dbGiama.query("SELECT * from zonas")
    res.send(result)
}
   
 
 