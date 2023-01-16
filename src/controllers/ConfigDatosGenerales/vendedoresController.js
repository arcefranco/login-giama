import {  QueryTypes } from "sequelize";
require('dotenv').config()


export const getVendedores = async (req, res) => {

    try {
        const dbGiama = req.db
        const allVendedores = await dbGiama.query("SELECT vendedores.`Codigo`, vendedores.`Nombre`,  NOT vendedores.`Inactivo` AS Activo, teamleader.`Codigo` AS 'TeamLeader', Categoria, oficialesscoring.`Codigo` AS OficialScoring, oficialesmora.`Codigo` AS 'OficialMora', DATE_FORMAT(vendedores.`FechaBaja`, '%d/%m/%Y') AS 'FechaBaja', escalascomisionesvendedores.`Codigo` AS 'Escala' FROM vendedores LEFT JOIN teamleader ON vendedores.`TeamLeader` = teamleader.`Codigo` LEFT JOIN oficialesscoring ON vendedores.`OficialScoring` = oficialesscoring.`Codigo` LEFT JOIN oficialesmora ON vendedores.`OficialMora` = oficialesmora.`Codigo` LEFT JOIN escalascomisionesvendedores ON vendedores.`Escala` = escalascomisionesvendedores.`Codigo` ", {
            type: QueryTypes.SELECT
        })
        if(Array.isArray(allVendedores)){
 
            return res.send(allVendedores)
        }else{
             throw Error(allVendedores)
        }
    
        } catch (error) {
            if(error.hasOwnProperty('name')){
                return res.send(JSON.stringify(error.name))
            }else{
                return res.send(error)
            }
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
        if(actualUsuario[0].inUpdate === null  || actualUsuario[0].inUpdate === user){
            await dbGiama.query("UPDATE vendedores SET inUpdate = ? WHERE Codigo = ?", {
                replacements: [user, Codigo],
                type: QueryTypes.UPDATE
            })
            return res.send({codigo: Codigo})
        }else{
            return res.send({status: false, message: `El registro está siendo editado por ${actualUsuario[0].inUpdate}`})
        }
    } catch (error) {
        return res.send(error)
    }
}
export const endUpdate = async (req, res) => {
    const {Codigo} = req.body
    const dbGiama = req.db
    const {user} = req.usuario
    if(!Codigo) return 
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

export const postVendedores = async (req, res) => {
   const dbGiama = req.db
    let {Nombre,   Activo:Inactivo, TeamLeader, Categoria, OficialS, OficialM, FechaBaja, Escala} = req.body;
    const {user} = req.usuario
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.2.1')
        if(!finded){
            return res.status(500).send({status: false, message: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, message: error})
    } 
     
    if(!Nombre ) {
        return res.status(400).send({status: false, message: 'Faltan campos'})
    }
try{  
    await dbGiama.query("INSERT INTO vendedores (Nombre,  Inactivo, TeamLeader, Categoria, OficialScoring, OficialMora, FechaBaja, Escala, UsuarioAltaRegistro ) VALUES (?,NOT ?,?,?,?,?,?,?,?) ", {
        replacements: [Nombre,  Inactivo? Inactivo : 0, TeamLeader? TeamLeader : null, Categoria? Categoria : null, OficialS? OficialS : null, OficialM? OficialM : null, FechaBaja? FechaBaja : null, Escala? Escala:null, user ],
        type: QueryTypes.INSERT
      });

    return res.send({status: true, message: 'Vendedor creado con exito!'})
    }catch(err){
        console.log(err)
        return res.send({status: false, message: err.name + " " + "Error al agregar vendedor"})
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
            return res.status(500).send({status: false, message: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, message: error})
    } 
    if(!Nombre ) {
        return res.status(400).send({status: false, message: 'Faltan campos'})
    }
    try{  
    await dbGiama.query("UPDATE vendedores SET Nombre = ?,  Inactivo = NOT ?, TeamLeader = ?, Categoria = ?, OficialScoring = ?, OficialMora = ?, Escala = ?, FechaBaja = ?, inUpdate = NULL WHERE Codigo = ? ", {
        replacements: [Nombre,  Inactivo, TeamLeader ? TeamLeader : null, Categoria ? Categoria : null, OficialS ? OficialS : null, OficialM ? OficialM : null, Escala ? Escala : null, FechaBaja ? FechaBaja : null, Codigo ],
        type: QueryTypes.UPDATE
      });
      return res.send({status: true, message: 'Vendedor modificado con exito!'})
        
    }
    catch(err) {
        if(err.hasOwnProperty("name")){

            return res.send({status: false, message: err.name + " " + "Error al actualizar vendedor"})
        }else{
             return res.send({status: false, message: "Hubo un error"})
        }
    }
}



export const deleteVendedores = async (req, res, error) => {
   const dbGiama = req.db
    const {Codigo} = req.body;
    const {user} = req.usuario
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.2.3')
        if(!finded){
            return res.status(500).send({status: false, message: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, message: error})
    } 
    const Vendedor = dbGiama.models.vendedores
    try{await Vendedor.destroy({
        where: {Codigo: Codigo} 
        });
        return res.send({status: true, message: 'Vendedor Borrado!'})
        }catch(err){
            if(err.hasOwnProperty("name")){

                return res.send({status: false, message: err.name + " " + "Error al borrar vendedor"})
            }else{
                 return res.send({status: false, message: "Hubo un error"})
            }
        }
}


export const getAllEscalas = async (req, res) => {
    try {
        
        const dbGiama = req.db
         const result = await dbGiama.query("SELECT * from scalascomisionesvendedores",{
             type: QueryTypes.SELECT
         })
         if(Array.isArray(result)){
             res.send(result)

         }else{
            throw Error(result)
         }
        
    } catch (error) {
        if(error.hasOwnProperty('name')){
            return res.send(JSON.stringify(error.name))
        }else{
            return res.send(error)
        }
        
    }
}
export const getAllOficialesScoring = async (req, res) => {
    try {
        const dbGiama = req.db
         const result = await dbGiama.query("SELECT * from oficialesscoring",{
             type: QueryTypes.SELECT
         })
         if(Array.isArray(result)){
            res.send(result)
         }else{
            throw Error(result)
         }
        
    } catch (error) {
        if(error.hasOwnProperty('name')){
            return res.send(JSON.stringify(error.name))
        }else{
            return res.send(error)
        }
    }
    
}
export const getAllOficialesScoringActivos = async (req, res) => {
   const dbGiama = req.db
    const result = await dbGiama.query("SELECT * from oficialesscoring WHERE Inactivo = 0",{
        type: QueryTypes.SELECT
    })
    res.send(result)
}   
export const getAllOficialesMora = async (req, res) => {
    try {
        const dbGiama = req.db
         const result = await dbGiama.query("SELECT * from oficialesmora",{
             type: QueryTypes.SELECT
         })

        if(Array.isArray(result)){
            res.send(result)
         }else{
            throw Error(result)
         }
        
    } catch (error) {
        if(error.hasOwnProperty('name')){
            return res.send(JSON.stringify(error.name))
        }else{
            return res.send(error)
        }
    }
} 
export const getAllOficialesMoraActivos = async (req, res) => {
   const dbGiama = req.db
    const result = await dbGiama.query("SELECT * from oficialesmora WHERE Activo = 1",{
        type: QueryTypes.SELECT
    })
    res.send(result)
}  