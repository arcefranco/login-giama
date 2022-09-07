import {  QueryTypes } from "sequelize";
import {app} from '../index'
// import Supervisor from '../models/supervisoresModel'






export const getTeamLeaders = async (req, res) => {

        const dbGiama = app.get('db')
        const allTeamLeaders = await dbGiama.query("SELECT teamleader.`Codigo` AS 'Codigo', teamleader.`Nombre` AS 'Nombre' ,  sucursales.`Nombre` AS 'Supervisor', NOT Inactivo AS Activo, zonas.`Nombre` AS 'Zona' FROM teamleader LEFT JOIN sucursales ON teamleader.`Supervisor` = sucursales.`Codigo` LEFT JOIN zonas ON teamleader.`Zona` = zonas.`codigo`  ")
        res.send(allTeamLeaders)

}
export const getTeamLeadersById = async (req, res) => {
    const dbGiama = app.get('db')
    const teamLeaders = req.body
    console.log(teamLeaders)
    const allTeamLeadersById = await  dbGiama
    .query
    ("SELECT sucursales.`Codigo` AS 'Codigo', sucursales.`Nombre`, sucursales.`Email`, EsMiniEmprendedor, ValorPromedioMovil, gerentes.`Nombre` AS 'Gerente', NOT Inactivo AS Activo, zonas.`Nombre` AS 'Zona' FROM sucursales LEFT JOIN gerentes ON sucursales.`Gerente` = gerentes.`Codigo` LEFT JOIN zonas ON sucursales.`Zona` = zonas.`codigo` WHERE sucursales.`Codigo` = ? ",
    {
      replacements: [supervisores.Codigo],
      type: QueryTypes.SELECT
    }
   );
    res.send(allTeamLeadersById)
}

export const postTeamLeaders = async (req, res, error) => {
    const dbGiama = app.get('db')
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
     
    if(!Nombre || !Email || !Gerente  || !Zona) {
        return res.status(400).send({status: false, data: 'Faltan campos'})
    }
try{  
    await dbGiama.query("INSERT INTO sucursales (Nombre, Email, Gerente, Inactivo, EsMiniEmprendedor, ValorPromedioMovil, Zona) VALUES (?,?,?,?,?,?,?) ", {
        replacements: [Nombre, Email, Gerente  , Inactivo? 0: 1, EsMiniEmprendedor? 1 :0, ValorPromedioMovil? ValorPromedioMovil: null, Zona ],
        type: QueryTypes.INSERT
      });
      console.log('roles')

    return res.send({status: true, data: 'Supervisor creado con exito!'})
    }catch(err){
        console.log(err)
    } }

    
 
export const updateTeamLeaders = async (req, res) => {
    const dbGiama = app.get('db')
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

    try{  
    await dbGiama.query("UPDATE sucursales SET Nombre = ?, Email = ?, Gerente = ?, Inactivo = ?, EsMiniEmprendedor = ?, ValorPromedioMovil = ?, Zona = ? WHERE Codigo = ? ", {
        replacements: [Nombre, Email, Gerente? Gerente: null, Inactivo? 0: 1, EsMiniEmprendedor? 1:0, ValorPromedioMovil, Zona, Codigo ],
        type: QueryTypes.UPDATE
      });
      return res.send({status: true, data: 'Supervisor modificado con exito!'})
        
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
    const TeamLeaders = app.get('db').models.teamLeaders
    try{await TeamLeaders.destroy({
        where: {Codigo: Codigo} 
        });
        return res.send({status: true, data: 'Supervisor Borrado!'})
        }catch(err){
            console.log(err)
        }
}


export const getAllZonas = async (req, res) => {
    const dbGiama = app.get('db')
    const result = await dbGiama.query("SELECT * from zonas")
    res.send(result)
}
   
 
 