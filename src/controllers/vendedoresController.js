import {  QueryTypes } from "sequelize";
import {app} from '../index'

require('dotenv').config()
import Sequelize from "sequelize";
import awaitWithTimeout from '../helpers/transaction/awaitWithTimeout'


export const getVendedores = async (req, res) => {

        const dbGiama = req.db
        const allVendedores = await dbGiama.query("SELECT vendedores.`Codigo`, vendedores.`Nombre`,  NOT vendedores.`Inactivo` AS Activo, teamleader.`Nombre` AS 'TeamLeader', Categoria, oficialesscoring.`Codigo` AS OficialScoring, oficialesmora.`Nombre` AS 'OficialMora', DATE_FORMAT(vendedores.`FechaBaja`, '%d/%m/%Y') AS 'FechaBaja', escalascomisionesvendedores.`Nombre` AS 'Escala' FROM vendedores LEFT JOIN teamleader ON vendedores.`TeamLeader` = teamleader.`Codigo` LEFT JOIN oficialesscoring ON vendedores.`OficialScoring` = oficialesscoring.`Codigo` LEFT JOIN oficialesmora ON vendedores.`OficialMora` = oficialesmora.`Codigo` LEFT JOIN escalascomisionesvendedores ON vendedores.`Escala` = escalascomisionesvendedores.`Codigo` ")
        res.send(allVendedores)

}
export const getVendedoresById = async (req, res) => {
    const dbGiama = req.db
    const vendedores = req.body
    const {user} = req.usuario
    try {
        const vendedor = await dbGiama
        .query
        ("SELECT vendedores.`inUpdate`, vendedores.`Codigo`, vendedores.`Nombre`,  NOT vendedores.`Inactivo` AS Activo, teamleader.`Nombre` AS 'TeamLeader', Categoria, oficialesscoring.`Nombre` AS OficialScoring, oficialesmora.`Nombre` AS 'OficialMora', DATE_FORMAT(vendedores.`FechaBaja`, '%Y-%m-%d') AS 'FechaBaja', escalascomisionesvendedores.`Nombre` AS 'Escala' FROM vendedores LEFT JOIN teamleader ON vendedores.`TeamLeader` = teamleader.`Codigo` LEFT JOIN oficialesscoring ON vendedores.`OficialScoring` = oficialesscoring.`Codigo` LEFT JOIN oficialesmora ON vendedores.`OficialMora` = oficialesmora.`Codigo` LEFT JOIN escalascomisionesvendedores ON vendedores.`Escala` = escalascomisionesvendedores.`Codigo` WHERE vendedores.`Codigo` = ? ",
        {
          replacements: [vendedores.Codigo],
          type: QueryTypes.SELECT
        }
       );
       
         if(vendedor[0].inUpdate  && vendedor[0].inUpdate !== user) {
            return res.send({status: false, message: `El registro esta siendo editado por ${vendedor[0].inUpdate} `})
         }
    
      
        try {
        await dbGiama.query("UPDATE vendedores SET inUpdate = ? WHERE Codigo = ?",  {
            replacements: [user, vendedores.Codigo],
            type: QueryTypes.UPDATE
            })
    
            return res.send(vendedor[0])
    }   catch (error) {
            console.log('error:', error)
            return res.send(error)
            }
        
    }       catch (error) {
            return res.send(error)
    }

}
export const beginUpdate = async (req, res) => {
    const {Codigo} = req.body
    const dbGiama = req.db
    const {user} = req.usuario
    if(!Codigo) return 'ID required'
    try {
        const actualUsuario = await dbGiama.query("SELECT inUpdate FROM vendedores WHERE Codigo = ?", 
        {
            replacements: [Codigo],
            type: QueryTypes.SELECT
        })
        if(actualUsuario[0].inUpdate === null){
            await dbGiama.query("UPDATE vendedores SET inUpdate = ? WHERE Codigo = ?", {
                replacements: [user, Codigo],
                type: QueryTypes.UPDATE
            })
            return res.send({status: true})
        }else{
            return
        }
    } catch (error) {
        return res.send(error)
    }
}
export const endUpdate = async (req, res) => {
    const {Codigo} = req.body
    const dbGiama = req.db
    const {user} = req.usuario
    if(!Codigo) return 'ID required'
    try {
        const actualUsuario = await dbGiama.query("SELECT inUpdate FROM vendedores WHERE Codigo = ?", 
        {
            replacements: [Codigo],
            type: QueryTypes.SELECT
        })
        if(actualUsuario[0].inUpdate === user){
            await dbGiama.query("UPDATE vendedores SET inUpdate = NULL WHERE Codigo = ?", {
                replacements: [Codigo],
                type: QueryTypes.UPDATE
            })
            return res.send({status: true})
        }else{
            return res.send({status: false})
        }
    } catch (error) {
        return res.send({status: false})
    }
}

export const postVendedores = async (req, res, error) => {
   const dbGiama = req.db
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
        return res.send({status: false, data: err.name})
    } }

    
 
export const updateVendedores = async (req, res) => {
   const dbGiama = req.db
    console.log(req.body) 
    let {Codigo, Nombre,   Activo:Inactivo, TeamLeader, Categoria, OficialS, OficialM, Escala, FechaBaja} = req.body;
    const {user} = req.usuario
    console.log('Inactivo: ', Inactivo)
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
    
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
    await dbGiama.query("UPDATE vendedores SET Nombre = ?,  Inactivo = NOT ?, TeamLeader = ?, Categoria = ?, OficialScoring = ?, OficialMora = ?, FechaBaja = ?, inUpdate = NULL WHERE Codigo = ? ", {
        replacements: [Nombre,  Inactivo, TeamLeader ? TeamLeader : null, Categoria ? Categoria : null, OficialS ? OficialS : null, OficialM ? OficialM : null, Escala ? Escala : null, FechaBaja ? FechaBaja : null, Codigo ],
        type: QueryTypes.UPDATE
      });
      return res.send({status: true, data: 'Vendedor modificado con exito!'})
        
    }
    catch(err) {
        console.log(err)
        return res.send({status: false, data: 'Hubo un error'})
    }
}



export const deleteVendedores = async (req, res, error) => {
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
    const Vendedor = dbGiama.models.vendedores
    try{await Vendedor.destroy({
        where: {Codigo: Codigo} 
        });
        return res.send({status: true, data: 'Vendedor Borrado!'})
        }catch(err){
            console.log(err)
        }
}


export const getAllEscalas = async (req, res) => {
   const dbGiama = req.db
    const result = await dbGiama.query("SELECT * from escalascomisionesvendedores")
    res.send(result)
}
export const getAllOficialesScoring = async (req, res) => {
   const dbGiama = req.db
    const result = await dbGiama.query("SELECT * from oficialesscoring")
    res.send(result)
}
export const getAllOficialesScoringActivos = async (req, res) => {
   const dbGiama = req.db
    const result = await dbGiama.query("SELECT * from oficialesscoring WHERE Inactivo = 0")
    res.send(result)
}   
export const getAllOficialesMora = async (req, res) => {
   const dbGiama = req.db
    const result = await dbGiama.query("SELECT * from oficialesmora")
    res.send(result)
} 
export const getAllOficialesMoraActivos = async (req, res) => {
   const dbGiama = req.db
    const result = await dbGiama.query("SELECT * from oficialesmora WHERE Activo = 1")
    res.send(result)
}  