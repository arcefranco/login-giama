import { QueryTypes } from "sequelize";
require('dotenv').config()



// let transaction;


export const getTipoPlan = async (req, res) => {
    const dbGiama = req.db
    const allModelos = await dbGiama.query("SELECT  * FROM tipoplan")
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
                FROM modelos 
                LEFT JOIN modelosvalorescuotas ON modelos.Marca = modelosvalorescuotas.Marca 
                AND modelos.Codigo = modelosvalorescuotas.Codigo 
                LEFT JOIN tipoplan ON modelosvalorescuotas.tipoplan = tipoplan.ID
         `)
       
    
    res.send(allModelos)    
}


export const getModelosById = async (req, res) => {
    const Modelos = req.body 
    const dbGiama = req.db
    const {user} = req.usuario 
    try {

        const tryModelo = await dbGiama.query('SELECT inUpdate from modelos WHERE Codigo = ?', {
            replacements: [Modelos.Codigo],
            type: QueryTypes.SELECT
        })
       if (tryModelo[0].inUpdate && tryModelo[0].inUpdate !== user) {
        return res.send([{status: false, message: `El registro esta siendo editado por ${tryModelo[0].inUpdate}`}])
       }

       try {
        await dbGiama.query('UPDATE modelos SET inUpdate = ? WHERE Codigo = ?', {
            replacements: [user, Modelos.Codigo],
            type: QueryTypes.UPDATE
        })
        
        const allModelosById = await dbGiama.query(
            `SELECT modelos.Marca, modelos.Codigo, modelos.Nombre, modelos.Coeficiente, 
            modelos.FechaAltaRegistro, modelos.UsuarioAltaRegistro, modelos.NacionalImportado, modelos.Activo,
            modelosvalorescuotas.tipoplan AS Codtipoplan, tipoplan.Descripcion AS Nomtipoplan, 
            modelosvalorescuotas.CuotaTerminal, modelosvalorescuotas.CuotaACobrar, modelosvalorescuotas.CuotaACobrarA, 
            modelosvalorescuotas.Cuota2, modelosvalorescuotas.Cuota1 
            FROM modelos 
            LEFT JOIN modelosvalorescuotas ON 
             modelos.Codigo = modelosvalorescuotas.Codigo 
            LEFT JOIN tipoplan ON modelosvalorescuotas.tipoplan = tipoplan.ID
            WHERE modelosvalorescuotas.Codigo = ?`,
            {
        
            replacements:[Modelos.Codigo],
            type: QueryTypes.SELECT
        })
    
        return res.send(allModelosById)
       } catch (error) {
            console.log('error in update inUpdate')
            return res.send(error)
       }    
        
    } catch (error) {
        console.log(error)
        return res.send (error)
    }  
    
}


export const postModelos = async (req, res) => {
    // const allPlanes = await dbGiama.query("SELECT  * FROM tipoplan ") 
    let {Nombre, Activo, NacionalImportado, CodigoMarca} = req.body[0];
    let arr = []
     const dbGiama = req.db
     const user = req.body[0].HechoPor;

     if(!Nombre) {
        return res.status(400).send({status: false, data: 'Faltan campos'})
    }
     
try{ 
    await dbGiama.query("INSERT INTO modelos (Marca, Nombre, Activo, NacionalImportado ,UsuarioAltaRegistro) VALUES (?,?,?,?,?)",{
        replacements: [CodigoMarca, Nombre, Activo? Activo : 0, NacionalImportado? NacionalImportado : null, user],
        type: QueryTypes.INSERT,    
    })

    for(let i = 1; i<req.body.length; i++){
        arr.push(req.body[i])
    }
    arr = arr.
    filter
    (e =>  
        e.CuotaTerminal !== '0.00' ||
      e.CuotaACobrar !== '0.00' ||  
      e.CuotaACobrarA !== '0.00' ||  
      e.Cuota1 !== '0.00'||  
      e.Cuota2 !== '0.00'
     
     ) 
      try {
        let request = await dbGiama.query("SELECT Codigo FROM modelos WHERE Nombre = ? ",{
            replacements:[Nombre],
            type:QueryTypes.SELECT
        })
        let Codigo = request[0].Codigo
        arr.forEach(async function(e){
            await dbGiama.query(`
            INSERT INTO modelosvalorescuotas
            (Marca, Codigo, TipoPlan, CuotaTerminal, CuotaACobrar, CuotaACobrarA ,Cuota1, Cuota2)
            VALUES (?,?,?,?,?,?,?,?) `,
            { replacements: [e.CodigoMarca, Codigo, parseInt(e.TipoPlan) + 1, e.CuotaTerminal, e.CuotaACobrar, e.CuotaACobrarA, e.Cuota1, e.Cuota2],
                type: QueryTypes.INSERT,    
            })
            
        })
        
      } catch (error) {
        console.log(error)
        return res.send(error)
      }    

    return res.send({status: true, data: 'Modelo creado!'})
    
}catch(err){
        console.log(err)
        return res.send({status: false, data: err.name})
    } 

}

    
 
export const updateModelos = async (req, res) => {
    let {Codigo,Nombre, Activo, NacionalImportado, CodigoMarca} = req.body[0];
    const dbGiama = req.db
    let arr = []

    try{ 
        await dbGiama.query(
        `UPDATE modelos 
        SET Nombre = ? , Activo = ?, NacionalImportado = ?, inUpdate = NULL 
        WHERE Codigo = ?`,{
        replacements: [Nombre, Activo, NacionalImportado, Codigo],
        type: QueryTypes.UPDATE
        })
        
        for(let i = 1; i<req.body.length; i++){
            arr.push(req.body[i])
        }
        arr = arr.
        filter
        (e =>  
            e.CuotaTerminal !== '0.00' ||
          e.CuotaACobrar !== '0.00' ||  
          e.CuotaACobrarA !== '0.00' ||  
          e.Cuota1 !== '0.00'||  
          e.Cuota2 !== '0.00'
         
         ) 
        try {
            await dbGiama.query('DELETE FROM modelosvalorescuotas WHERE Marca = ? AND Codigo = ?', {
                replacements: [CodigoMarca, Codigo],
                type: QueryTypes.DELETE
            })
        } catch (error) {
            return res.send(error)
        }

        try {
            arr.forEach(async function(e){
                await dbGiama.query(`
                INSERT INTO modelosvalorescuotas
                (Marca, Codigo, TipoPlan, CuotaTerminal, CuotaACobrar, CuotaACobrarA ,Cuota1, Cuota2)
                VALUES (?,?,?,?,?,?,?,?) `,
                { replacements: [e.CodigoMarca, Codigo, parseInt(e.TipoPlan) + 1, e.CuotaTerminal, e.CuotaACobrar, e.CuotaACobrarA, e.Cuota1, e.Cuota2],
                    type: QueryTypes.INSERT,    
                })
                
            })
            return res.send({status: true, data: 'Modelo actualizado correctamente!'})

           
        } catch (error) {
            console.log(error)
            return res.send('Error')
        }
    }
    catch(err) {
        console.log(err)
        return res.send({status: false, data: 'Hubo un error'})
    }
}
export const endUpdate = async (req, res) => {
    const {Codigo} = req.body
    const dbGiama = req.db
    const {user} = req.usuario
    if(!Codigo) {
        return res.status(404).send('ID required')}
    try {
        const actualUsuario = await dbGiama.query("SELECT inUpdate FROM modelos WHERE Codigo = ?", 
        {
            replacements: [Codigo],
            type: QueryTypes.SELECT
        })
        if(actualUsuario[0].inUpdate === user){
            await dbGiama.query("UPDATE modelos SET inUpdate = NULL WHERE Codigo = ?", {
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
    console.log(req.body)
    const dbGiama = req.db
    const user = req.body.HechoPor;
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.18.3')
        if(!finded){
            return res.status(500).send({status: false, data: 'No tiene permitido realizar esta acción'})
        } 
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, data: error})
    }
    
    try{
        await dbGiama.query(`DELETE FROM modelosvalorescuotas WHERE Codigo = ?`,{
            replacements: [Codigo],
            type:QueryTypes.DELETE 
            });
        await dbGiama.query(`DELETE FROM modelos WHERE Codigo = ?`,{
        replacements: [Codigo],
        type:QueryTypes.DELETE 
        });
        
        return res.send({status: true, data: 'Modelo Borrado!'})
        }catch(err){
            console.log(err)
        }
}



   
 
 