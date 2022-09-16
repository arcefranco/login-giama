import {  QueryTypes, DataTypes } from "sequelize";
import {app} from '../index'
import Sequelize from "sequelize";
require('dotenv').config()
import awaitWithTimeout from '../helpers/transaction/awaitWithTimeout'

let transaction;

// export const getModelos = async (req, res) => {
//     const dbGiama = app.get('db')
    
//     const allModelos = await dbGiama.query("SELECT Codigo, Nombre, Activo, NacionalImportado  FROM modelos  " )
//     res.send(allModelos)
// }

export const getTipoPlan = async (req, res) => {
    const dbGiama = app.get('db')
    
    const allModelos = await dbGiama.query("SELECT  * FROM tipoplan ")
    res.send(allModelos)
}

export const getModelos = async (req, res) => {
    const dbGiama = app.get('db')
    let i = 1;
    let object;
    let modelos = '';
    const allModels = await dbGiama.query(`SELECT * FROM modelosvalorescuotas`);
    // console.log(allModels[0].length)
    // while( i< 10 ){
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
       
    // res.send(allModelos)
    // const allModelosPlan1 = await dbGiama.query(`
    // SELECT modelosvalorescuotas.Codigo AS Codigo,
    // tipoplan.Descripcion AS 'tipoPlan',
    // modelosvalorescuotas.CuotaTerminal,
    //  modelosvalorescuotas.CuotaACobrar,
    //  modelosvalorescuotas.CuotaACobrarA,
    //  modelosvalorescuotas.Cuota1,
    //   modelosvalorescuotas.Cuota2 
    //   FROM modelosvalorescuotas
    //   LEFT JOIN tipoplan 
    //   ON modelosvalorescuotas.TipoPlan = tipoplan.ID
    //   WHERE Codigo = ? AND tipoPlan = 1`,
    //   {
    //       replacements:[10],
    //       type:QueryTypes.SELECT,

    //   })
    // // res.send(allModelosPlan1)
    // const allModelosPlan2 = await dbGiama.query(`SELECT 
    // modelosvalorescuotas.Codigo AS Codigo,
    // modelosvalorescuotas.CuotaTerminal,
    // modelosvalorescuotas.CuotaACobrar,
    // modelosvalorescuotas.CuotaACobrarA,
    // modelosvalorescuotas.Cuota1,
    // modelosvalorescuotas.Cuota2
    // FROM modelosvalorescuotas
    // WHERE Codigo = ? AND tipoPlan = 2`
    // ,
    //     {
    //         replacements:[10],
    //         type:QueryTypes.SELECT,

    //     })
    
    // // res.send(allModelosPlan2)
    // const modelo = allModelos[0]
    // const plan1 = allModelosPlan1[0]
    // const plan2 = allModelosPlan2[0]
//         if(!allModelosPlan1[0] || !allModelosPlan2[0] ){
//     object = {
//         CuotaTerminalP1:'',
//         CuotaACobrarP1: '',
//         CuotaACobrarAP1:'',
//         Cuota1P1:'',
//         Cuota2P1:'',
//         CuotaTerminalP2:'',
//         CuotaACobrarP2:'',
//         CuotaACobrarAP2:'',
//         Cuota1P2:'',
//         Cuota2P2:'',
// }} 
    // object = {Codigo:modelo.Codigo,
    //         Activo:modelo.Activo,
    //         Nombre:modelo.Nombre,
    //         NacionalImportado:modelo.NacionalImportado,
    //         CuotaTerminalP1:plan1.CuotaTerminal,
    //         CuotaACobrarP1:plan1.CuotaACobrar,
    //         CuotaACobrarAP1:plan1.CuotaACobrarA,
    //         Cuota1P1:plan1.Cuota1,
    //         Cuota2P1:plan1.Cuota2,
    //         CuotaTerminalP2:plan2.CuotaTerminal,
    //         CuotaACobrarP2:plan2.CuotaACobrar,
    //         CuotaACobrarAP2:plan2.CuotaACobrarA,
    //         Cuota1P2:plan2.Cuota1,
    //         Cuota2P2:plan2.Cuota2,
    // }
// }
// modelos = modelos + JSON.stringify(object);
    // i++
    //  }    
    
    
    res.send(allModelos)    
    // const modelosCuotas = await dbGiama.query("SELECT modelosvalorescuotas.`CuotaTerminal`, modelosvalorescuotas.`CuotaACobrar`, modelosvalorescuotas.`CuotaACobrarA`, modelosvalorescuotas.`Cuota1`, modelosvalorescuotas.`Cuota2`FROM modelosvalorescuotas WHERE Codigo = ? ",{
    //     replacements:[allModelos],
    //     type:QueryTypes.SELECT
    // })
    // res.send({
    //     Codigo:allModelos.Codigo,
    //     Nombre:allModelos.Nombre,
    //     Cuotas: modelosCuotas,
    // })
}

// export const getModelosActivos = async (req, res) => {
//     const dbGiama = app.get('db')
    
//     const allModelos = await dbGiama.query("SELECT Codigo, Nombre, Activo FROM modelos WHERE Activo = 1")
//     res.send(allModelos)

// }

export const getModelosById = async (req, res) => {
    const Modelos = req.body
    const dbGiama = app.get('db')
    const ModelosModel = app.get('db').models.modelos
    console.log(Modelos)
    transaction = await dbGiama.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        autocommit:false
      })
      const query = () => {
        return new Promise((resolve, reject) => {
    const allModelosById =  ModelosModel.findAll(
        {
        transaction: transaction,
        where:{Codigo:Modelos.Codigo}
    })
    console.log(allModelosById)
    resolve(allModelosById)

    
})
}
const response = await awaitWithTimeout(4000, query()) 

res.send(response)
}


export const postModelos = async (req, res, error) => {
     let {Nombre, Activo} = req.body;
     console.log(req.body) 
     const dbGiama = app.get('db');
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
     
try{    await dbGiama.query("INSERT INTO modelos (Nombre, Activo, UsuarioAltaRegistro) VALUES (?,?,?)",{
        replacements: [Nombre, Activo? Activo : 0, user],
        type: QueryTypes.INSERT,    
    });
    return res.send({status: true, data: 'Modelo creado!'})
    }catch(err){
        console.log(err)
    } }

    
 
export const updateModelos = async (req, res) => {
    const Modelos = req.body;
    console.log(Modelos)
    const dbGiama = app.get('db')
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
    const Modelo = app.get('db').models.modelos;
    try{ await Modelo?.update(
    {
        Nombre: Modelos.Nombre,
        Activo: Modelos.Activo,
        UsuarioAltaRegistro: user,
    }
    ,{
        where: {Codigo: Modelos.Codigo}
    });
    return res.send({status: true, data: 'Modelo actualizado correctamente!'})
        
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

export const deleteModelos = async (req, res, error) => {
    const {Codigo} = req.body;
    console.log(Codigo)
    const dbGiama = app.get('db')
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



   
 
 