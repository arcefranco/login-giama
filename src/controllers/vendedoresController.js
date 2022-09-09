import {  QueryTypes } from "sequelize";
import {app} from '../index'
require('dotenv').config()
import Sequelize from "sequelize";
import awaitWithTimeout from '../helpers/transaction/awaitWithTimeout'

let transaction;

export const getVendedores = async (req, res) => {

        const dbGiama = app.get('db')
        const allVendedores = await dbGiama.query("SELECT vendedores.`Codigo`, sucursales.`Nombre` AS 'Sucursal' , vendedores.`Nombre`,  NOT vendedores.`Inactivo` AS Activo, teamleader.`Nombre` AS 'TeamLeader', Categoria, oficialesscoring.`Nombre` AS OficialScoring, oficialesmora.`Nombre` AS 'OficialMora', DATE_FORMAT(vendedores.`FechaBaja`, '%d/%m/%Y') AS 'FechaBaja', escalascomisionesvendedores.`Nombre` AS 'Escala' FROM vendedores LEFT JOIN sucursales ON vendedores.`Sucursal` = sucursales.`Codigo` LEFT JOIN teamleader ON vendedores.`TeamLeader` = teamleader.`Codigo` LEFT JOIN oficialesscoring ON vendedores.`OficialScoring` = oficialesscoring.`Codigo` LEFT JOIN oficialesmora ON vendedores.`OficialMora` = oficialesmora.`Codigo` LEFT JOIN escalascomisionesvendedores ON vendedores.`Escala` = escalascomisionesvendedores.`Codigo` ")
        res.send(allVendedores)

}
export const getVendedoresById = async (req, res) => {
    const dbGiama = app.get('db')
    const vendedores = req.body
    console.log(vendedores)
    transaction = await dbGiama.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        autocommit:false
      })
      const query = () => {
        return new Promise((resolve, reject) => {
    const allVendedoresById =   dbGiama
    .query
    ("SELECT vendedores.`Codigo`, vendedores.`Nombre`,  NOT vendedores.`Inactivo` AS Activo, teamleader.`Nombre` AS 'TeamLeader', Categoria, oficialesscoring.`Nombre` AS OficialScoring, oficialesmora.`Nombre` AS 'OficialMora', DATE_FORMAT(vendedores.`FechaBaja`, '%Y-%m-%d') AS 'FechaBaja', escalascomisionesvendedores.`Nombre` AS 'Escala' FROM vendedores LEFT JOIN teamleader ON vendedores.`TeamLeader` = teamleader.`Codigo` LEFT JOIN oficialesscoring ON vendedores.`OficialScoring` = oficialesscoring.`Codigo` LEFT JOIN oficialesmora ON vendedores.`OficialMora` = oficialesmora.`Codigo` LEFT JOIN escalascomisionesvendedores ON vendedores.`Escala` = escalascomisionesvendedores.`Codigo` WHERE vendedores.`Codigo` = ? ",
    {
        transaction: transaction,
      replacements: [vendedores.Codigo],
      type: QueryTypes.SELECT
    }
   );
    resolve(allVendedoresById)
    })

    }
    const response = await awaitWithTimeout(4000, query()) 

    res.send(response)
}

export const postVendedores = async (req, res, error) => {
    const dbGiama = app.get('db')
    console.log(req.body)
    let {Nombre,   Activo:Inactivo, TeamLeader, Categoria, OficialScoring, OficialMora, FechaBaja, Escala} = req.body;
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
     
    if(!Nombre ) {
        return res.status(400).send({status: false, data: 'Faltan campos'})
    }
try{  
    await dbGiama.query("INSERT INTO vendedores (Nombre,  Inactivo, TeamLeader, Categoria, OficialScoring, OficialMora, FechaBaja, Escala, UsuarioAltaRegistro ) VALUES (?,NOT ?,?,?,?,?,?,?,?) ", {
        replacements: [Nombre,  Inactivo? Inactivo : 0, TeamLeader? TeamLeader : null, Categoria? Categoria : null, OficialScoring? OficialScoring : null, OficialMora? OficialMora : null, FechaBaja? FechaBaja : null, Escala? Escala:null, user ],
        type: QueryTypes.INSERT
      });
      console.log('roles')

    return res.send({status: true, data: 'Vendedor creado con exito!'})
    }catch(err){
        console.log(err)
    } }

    
 
export const updateVendedores = async (req, res) => {
    const dbGiama = app.get('db')
    console.log(req.body) 
    console.log(req.body.HechoPor) 
    let {Codigo, Nombre,  Sucursal, Activo:Inactivo, TeamLeader, Categoria, OficialScoring, OficialMora, FechaBaja, Escala} = req.body;
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
    if(!Nombre ) {
        return res.status(400).send({status: false, data: 'Faltan campos'})
    }
    try{  
    await dbGiama.query("UPDATE vendedores SET Nombre = ?,  Inactivo = NOT ?, TeamLeader = ?, Categoria = ?, OficialScoring = ?, OficialMora = ?, FechaBaja = ?, Escala = ?, UsuarioAltaRegistro = ? WHERE Codigo = ? ", {
        replacements: [Nombre,  Inactivo, TeamLeader, Categoria, OficialScoring, OficialMora, FechaBaja, Escala, user, Codigo ],
        type: QueryTypes.UPDATE
      });
      return res.send({status: true, data: 'Vendedor modificado con exito!'})
        
    }
    catch(err) {
        console.log(err)
    }
}

export const endCommit = async (req, res) => {
    if(transaction.finished === 'commit'){
        res.send('Fueron guardados los cambios')
    }else{
        await transaction.rollback()
        res.send('No fueron guardados los cambios')
        
    }

}

export const deleteVendedores = async (req, res, error) => {
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
    const Vendedor = app.get('db').models.vendedores
    try{await Vendedor.destroy({
        where: {Codigo: Codigo} 
        });
        return res.send({status: true, data: 'Vendedor Borrado!'})
        }catch(err){
            console.log(err)
        }
}


export const getAllEscalas = async (req, res) => {
    const dbGiama = app.get('db')
    const result = await dbGiama.query("SELECT * from escalascomisionesvendedores")
    res.send(result)
}
export const getAllOficialesScoring = async (req, res) => {
    const dbGiama = app.get('db')
    const result = await dbGiama.query("SELECT * from oficialesscoring")
    res.send(result)
}   
export const getAllOficialesMora = async (req, res) => {
    const dbGiama = app.get('db')
    const result = await dbGiama.query("SELECT * from oficialesmora")
    res.send(result)
} 
 