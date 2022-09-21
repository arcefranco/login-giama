import {  QueryTypes, DataTypes } from "sequelize";
import {app} from '../index'
import Sequelize from "sequelize";
require('dotenv').config()
import awaitWithTimeout from '../helpers/transaction/awaitWithTimeout'

// let transaction;


export const getTipoPlan = async (req, res) => {
    const dbGiama = req.db
    const allModelos = await dbGiama.query("SELECT  * FROM tipoplan ")
    res.send(allModelos)
}

export const getModelos = async (req, res) => {
    const dbGiama = req.db
    const allModelos = await dbGiama.query(`
    SELECT modelos.Marca, modelos.Codigo, modelos.Nombre, modelos.Coeficiente, 
                modelos.FechaAltaRegistro, modelos.UsuarioAltaRegistro, modelos.NacionalImportado, modelos.Activo,
                modelosvalorescuotas.tipoplan AS Codtipoplan, tipoplan.Descripcion AS Nomtipoplan, 
                modelosvalorescuotas.CuotaTerminal, modelosvalorescuotas.CuotaACobrar, modelosvalorescuotas.CuotaACobrarA, 
                modelosvalorescuotas.Cuota2, modelosvalorescuotas.Cuota1 
                FROM pa7.modelos 
                LEFT JOIN modelosvalorescuotas ON modelos.Marca = modelosvalorescuotas.Marca 
                AND modelos.Codigo = modelosvalorescuotas.Codigo 
                LEFT JOIN tipoplan ON modelosvalorescuotas.tipoplan = tipoplan.ID
         `)
       
    
    res.send(allModelos)    
}


export const getModelosById = async (req, res) => {
    const Modelos = req.body
    const dbGiama = req.db
    // const ModelosModel = dbGiama.models.modelos
    console.log(Modelos)
    // transaction = await dbGiama.transaction({
    //     isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    //     autocommit:false
    //   })
      const query = () => {
        return new Promise((resolve, reject) => {
    const allModelosById =  dbGiama.query(
        `SELECT modelos.Marca, modelos.Codigo, modelos.Nombre, modelos.Coeficiente, 
        modelos.FechaAltaRegistro, modelos.UsuarioAltaRegistro, modelos.NacionalImportado, modelos.Activo,
        modelosvalorescuotas.tipoplan AS Codtipoplan, tipoplan.Descripcion AS Nomtipoplan, 
        modelosvalorescuotas.CuotaTerminal, modelosvalorescuotas.CuotaACobrar, modelosvalorescuotas.CuotaACobrarA, 
        modelosvalorescuotas.Cuota2, modelosvalorescuotas.Cuota1 
        FROM pa7.modelos 
        LEFT JOIN modelosvalorescuotas ON modelos.Marca = modelosvalorescuotas.Marca 
        AND modelos.Codigo = modelosvalorescuotas.Codigo 
        LEFT JOIN tipoplan ON modelosvalorescuotas.tipoplan = tipoplan.ID
        WHERE modelosvalorescuotas.Codigo = ?`,
        {
        // transaction: transaction,
        replacements:[Modelos.Codigo],
        type: QueryTypes.SELECT
    })
    console.log(allModelosById)
    resolve(allModelosById)

    
})    
}



const response = await awaitWithTimeout(4000, query()) 

res.send(response)
}


export const postModelos = async (req, res, error) => {
    // const allPlanes = await dbGiama.query("SELECT  * FROM tipoplan ") 
    console.log(req.body.length)
    console.log(req.body[1])
    let {Codigo, Nombre, Activo, NacionalImportado, TipoPlan} = req.body;
     console.log(req.body) 
     const dbGiama = req.db
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
     
try{ 
       /*await dbGiama.query("INSERT INTO modelos (Nombre, Activo, NacionalImportado ,UsuarioAltaRegistro) VALUES (?,?,?,?)",{
        replacements: [Nombre, Activo? Activo : 0, NacionalImportado? NacionalImportado : null, user],
        type: QueryTypes.INSERT,    
    })*/
    for(let i=1; i<req.body.length; i++){
    // allPlanes.map(plan=>
    let {CuotaTerminal, CuotaACobrar, CuotaACobrarA,Cuota1,Cuota2} = req.body[i];
        await dbGiama.query(`
    INSERT INTO modelosvalorescuotas
     (TipoPlan,CuotaTerminal, CuotaACobrar, CuotaACobrarA ,Cuota1, Cuota2)
      VALUES (?,?,?,?,?,?,?) WHERE Codigo = ?`,
      { replacements: [ TipoPlan , CuotaTerminal, CuotaACobrar, CuotaACobrarA, Cuota1, Cuota2,  Codigo],
        type: QueryTypes.INSERT,    
    })
    }


    // )
    
    return res.send({status: true, data: 'Modelo creado!'})
    }catch(err){
        console.log(err)
    } }

    
 
export const updateModelos = async (req, res) => {
    const {Codigo, Nombre, Activo, NacionalImportado, CuotaTerminal, CuotaACobrarA, CuotaACobrar, Cuota1, Cuota2, TipoPlan} = req.body;
    console.log(req.body.length)
    console.log(req.body)
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
    try{ 
        // await dbGiama.query(
        // `UPDATE modelos 
        // SET Nombre = ? , Activo = ?, NacionalImportado = ? 
        // WHERE Codigo = ?`,{
        // replacements: [Nombre, Activo, NacionalImportado, Codigo],
        // type: QueryTypes.UPDATE
        // } )

    // await dbGiama.query(
    //     `UPDATE modelosvalorescuotas 
    //     SET Nombre = ? , Activo = ?, NacionalImportado = ? 
    //     WHERE Codigo = ? AND TipoPlan = ?`,{
    //     replacements: [Nombre, Activo, NacionalImportado, Codigo, TipoPlan],
    //     type: QueryTypes.UPDATE
    //     }
    // )

    return res.send({status: true, data: 'Modelo actualizado correctamente!'})
        
    }
    catch(err) {
        console.log(err)
    }
}
export const endUpdate = async (req, res) => {
    const {Codigo} = req.body
    const dbGiama = req.db
    const {user} = req.usuario
    if(!Codigo) return 'ID required'
    try {
        const actualUsuario = await dbGiama.query("SELECT inUpdate FROM modelos WHERE Codigo = ?", 
        {
            replacements: [Codigo],
            type: QueryTypes.SELECT
        })
        if(actualUsuario[0].inUpdate === user){
            await dbGiama.query("UPDATE modelosvalorescuotas SET inUpdate = NULL WHERE Codigo = ?", {
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
export const deleteModelos = async (req, res, error) => {
    const {Codigo} = req.body;
    console.log(Codigo)
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
    const Modelo = app.get('db').models.modelos
    try{await Modelo?.destroy({
        where: {Codigo: Codigo} 
        });
        return res.send({status: true, data: 'Modelo Borrado!'})
        }catch(err){
            console.log(err)
        }
}



   
 
 