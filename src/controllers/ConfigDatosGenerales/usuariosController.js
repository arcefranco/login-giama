import { QueryTypes } from "sequelize";
import { createPass } from "../../helpers/passwords/createPass";
import randomPass from "../../helpers/passwords/randomPass";
import { sendPass } from "../../helpers/email/sendEmail";


export const getUsuarioById = async (req, res) => {
    const dbGiama = req.db
   const {id} = req.body 
   const {user} = req.usuario

   try {
    const usuarioPrev = await dbGiama.query("SELECT usuarios.`inUpdate`, usuarios.`ID`, usuarios.`emailtest` AS 'email', usuarios.`login` AS 'Usuario', usuarios.`Nombre`, vendedores.`Codigo` AS 'Vendedor', teamleader.`Codigo` AS 'TeamLeader',sucursales.`Codigo` AS 'Supervisor', gerentes.`Codigo` AS 'Gerente', usuarios.`UsuarioAnura`, usuarios.`VerSoloScoringAsignado`, usuarios.`us_bloqueado`, usuarios.`us_activo` FROM usuarios LEFT JOIN gerentes ON usuarios.`CodigoGerente` = gerentes.`Codigo` LEFT JOIN teamleader ON usuarios.`CodigoTeamLeader` = teamleader.`Codigo` LEFT JOIN vendedores ON usuarios.`CodigoVendedor` = vendedores.`Codigo` LEFT JOIN sucursales ON usuarios.`CodigoSucursal` = sucursales.`Codigo` WHERE ID = ?", 
     {
         replacements: [id],
         type: QueryTypes.SELECT
     })
     if(usuarioPrev[0].inUpdate  && usuarioPrev[0].inUpdate !== user) {
        return res.send({status: false, message: `El registro esta siendo editado por ${usuarioPrev[0].inUpdate} `})
     }

  
try {
    await dbGiama.query("UPDATE usuarios SET inUpdate = ? WHERE ID = ?",  {
        replacements: [user, id],
        type: QueryTypes.UPDATE
        })

        return res.send(usuarioPrev)
} catch (error) {
  console.log('error:', error)
    return res.send(error)
        }
    
   }catch (error) {
    console.log('2nd error', error)
} 

}

export const getAllUsuarios = async (req, res) => {
    const dbGiama = req.db
    
  const usuarios = await 
  dbGiama
  .query
  ("SELECT usuarios.`ID`, usuarios.`login` AS 'Usuario', usuarios.`Nombre`, usuarios.`emailtest` AS 'email', vendedores.`Codigo` AS 'Vendedor', teamleader.`Codigo` AS 'teamLeader',sucursales.`Codigo` AS 'Supervisor', gerentes.`Codigo` AS 'Gerente', usuarios.`UsuarioAnura`, usuarios.`VerSoloScoringAsignado`, usuarios.`us_bloqueado`, usuarios.`us_activo` FROM usuarios LEFT JOIN gerentes ON usuarios.`CodigoGerente` = gerentes.`Codigo` LEFT JOIN teamleader ON usuarios.`CodigoTeamLeader` = teamleader.`Codigo` LEFT JOIN vendedores ON usuarios.`CodigoVendedor` = vendedores.`Codigo` LEFT JOIN sucursales ON usuarios.`CodigoSucursal` = sucursales.`Codigo`");
 return res.send(usuarios[0])
 }

export const createUsuario = async (req, res) => {
    let {Nombre, Usuario, Vendedor, Supervisor, 
        TeamLeader, Gerente, UsuarioAnura, us_activo, us_bloqueado, scoringAsignado, email } = req.body
     const {user} = req.usuario
     const dbGiama = req.db
        try {
            const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
                replacements: [user],
                type: QueryTypes.SELECT

            })
            const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.16.3.1')
            if(!finded){
                return res.status(500).send({status: false, message: 'No tiene permitido realizar esta acción'})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({status: false, message: error})
        } 
        

        if(!Nombre || !Usuario) {
            return res.status(400).send({status: false, message: 'Faltan campos'})
        }

        const password = randomPass()

        const passAndSalt = createPass(password)
        const {passHashed, newSalt} = passAndSalt
        console.log('passHashed: ',passHashed, 'newSalt: ',newSalt)
         
        UsuarioAnura && typeof(UsuarioAnura) === 'string' ? UsuarioAnura = parseInt(UsuarioAnura) : UsuarioAnura = UsuarioAnura
        TeamLeader && typeof(TeamLeader) === 'string'  ? TeamLeader = parseInt(TeamLeader.split(' ')[0]) : TeamLeader = TeamLeader
        Gerente  && typeof(Gerente) === 'string' ? Gerente = parseInt(Gerente.split(' ')[0]) : Gerente = Gerente
        Supervisor && typeof(Supervisor) === 'string' ? Supervisor = parseInt(Supervisor.split(' ')[0]) : Supervisor = Supervisor
        Vendedor && typeof(Vendedor) === 'string' ? Vendedor = parseInt(Vendedor.split(' ')[0]) : Vendedor = Vendedor

    try {
        
        await dbGiama.query("INSERT INTO usuarios (login, salt, password_hash, Nombre, CodigoVendedor, CodigoSucursal, CodigoTeamLeader, CodigoGerente, UsuarioAnura, us_activo, us_bloqueado, VerSoloScoringAsignado, emailtest, newuserBoolean) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", {
            replacements: [Usuario, newSalt, passHashed, Nombre, Vendedor? Vendedor: null, Supervisor? Supervisor: null, TeamLeader? TeamLeader :null, Gerente? Gerente: null, UsuarioAnura? UsuarioAnura: null, us_activo? us_activo : 1, us_bloqueado? us_bloqueado :0, scoringAsignado? scoringAsignado: null, email? email: null, 1],
            type: QueryTypes.INSERT
          }
         );
          sendPass(email, password)
         
           return res.send({status: true, message: 'Usuario creado con exito!'}) 
        
    } catch (error) {
        console.log('error en la DB: ', error)
        return res.status(400).send({status: false, message: `error al insertar en base de datos: ${error}`})
    }
}

export const updateUsuario = async (req, res) => {
    let {ID, Nombre, Usuario, Vendedor, Supervisor, 
        TeamLeader, Gerente, UsuarioAnura, us_activo, us_bloqueado, scoringAsignado, newUserBoolean, email } = req.body
        
        const {user} = req.usuario
        const dbGiama = req.db
        try {
            const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
                replacements: [user],
                type: QueryTypes.SELECT

            })
            const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.16.3.2')
            if(!finded){
                return res.status(500).send({status: false, message: 'No tiene permitido realizar esta acción'})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({status: false, message: error})
        } 
        if(!ID) {
            return res.status(400).send({status: false, message: 'sin provisto de ID'})
        }

        if(!Nombre || !Usuario) {
            return res.status(400).send({status: false, message: 'Faltan campos'})
        }
        ID = parseInt(ID)
        UsuarioAnura?.length && typeof(UsuarioAnura) === 'string' ? UsuarioAnura = parseInt(UsuarioAnura) : UsuarioAnura = UsuarioAnura
        TeamLeader && typeof(TeamLeader) === 'string'  ? TeamLeader = parseInt(TeamLeader.split(' ')[0]) : TeamLeader = TeamLeader
        Gerente  && typeof(Gerente) === 'string' ? Gerente = parseInt(Gerente.split(' ')[0]) : Gerente = Gerente
        Supervisor && typeof(Supervisor) === 'string' ? Supervisor = parseInt(Supervisor.split(' ')[0]) : Supervisor = Supervisor
        Vendedor && typeof(Vendedor) === 'string' ? Vendedor = parseInt(Vendedor.split(' ')[0]) : Vendedor = Vendedor
        try {

         
            await dbGiama.query(`UPDATE usuarios SET inUpdate = NULL, login = ?, Nombre = ?, CodigoVendedor = ?,  CodigoSucursal = ?, CodigoTeamLeader = ?, CodigoGerente = ?, UsuarioAnura = ?, us_activo = ?, us_bloqueado = ?, VerSoloScoringAsignado = ?, emailtest = ?  WHERE ID = ?`, {
                replacements: [Usuario, Nombre, Vendedor? Vendedor: null, Supervisor? Supervisor: null, TeamLeader? TeamLeader :null, Gerente? Gerente: null, UsuarioAnura? UsuarioAnura: null, us_activo? us_activo : 1, us_bloqueado? us_bloqueado :0, scoringAsignado? scoringAsignado: null, email? email: null, ID],
                type: QueryTypes.UPDATE
            })
            
            

              
                return res.send({status: true, message: 'Usuario actualizado correctamente!'}) 
             
         } catch (error) {
             console.log('error en la DB: ', error)
             return res.status(400).send({status: false, message: 'error en la DB, probablemente el nombre de usuario esté en uso'})
         }
}

export const deleteUsuario = async(req, res) => {

    const {id} = req.body.Codigo 
    const dbGiama = req.db
    if(!id){
       return res.status(400).send({status: false, message: 'Ningun id provisto'})
    }
    const {user} = req.usuario
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.16.3')
        if(!finded){
            return res.status(500).send({status: false, message: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, message: error})
    } 

    try {
        await dbGiama.query("DELETE FROM usuarios WHERE ID = ?", {
            replacements: [id],
            type: QueryTypes.DELETE
             
        })
       return res.send({status: true, message: 'Usuario eliminado correctamente'})
    } catch (error) {
       return res.status(400).send({status: false, message: `error al eliminar en base de datos: ${error}` })
    } 
}

export const beginUpdate = async (req, res) => {
    const {Codigo} = req.body
    const dbGiama = req.db
    const {user} = req.usuario
    
    if(typeof Codigo !== 'number')  return res.send({status: false, message: 'Codigo no valido'})
    try {
        const actualUsuario = await dbGiama.query("SELECT inUpdate FROM usuarios WHERE ID = ?", 
        {
            replacements: [Codigo],
            type: QueryTypes.SELECT
        })
        if(actualUsuario[0].inUpdate === null  || actualUsuario[0].inUpdate === user){
            await dbGiama.query("UPDATE usuarios SET inUpdate = ? WHERE ID = ?", {
                replacements: [user, Codigo],
                type: QueryTypes.UPDATE
            })
            return res.send({codigo: Codigo})
        }else{
            return res.send({status: false, message: `El registro está siendo editado por ${actualUsuario[0].inUpdate}`})
        }
    } catch (error) {
        return res.send({status: false, message: 'Error al comenzar modificaciones'})
    }
}


export const endUpdate = async (req, res) => {
    const {Codigo} = req.body
    const dbGiama = req.db
    const {user} = req.usuario
    try {
        const actualUsuario = await dbGiama.query("SELECT inUpdate FROM usuarios WHERE ID = ?", 
        {
            replacements: [Codigo],
            type: QueryTypes.SELECT
        })
        if(actualUsuario[0].inUpdate === user){
            await dbGiama.query("UPDATE usuarios SET inUpdate = NULL WHERE ID = ?", {
                replacements: [Codigo],
                type: QueryTypes.UPDATE
            })
            return res.send('{status: true}')
        }else{
            return
        }
    } catch (error) {
        return res.send(error)
    }
}

export const getAllVendedores = async (req, res) => {
    const dbGiama = req.db
const result = await dbGiama.query("SELECT Codigo, Nombre from vendedores")
    return res.send(result[0])
}
export const getAllGerentes = async (req, res) => {
    const dbGiama = req.db
    const result = await dbGiama.query("SELECT Codigo, Nombre from gerentes")
    return res.send(result[0])
}
export const getAllSupervisores = async (req, res) => {
    const dbGiama = req.db
    const result = await dbGiama.query("SELECT Codigo, Nombre from sucursales")
    return res.send(result[0])
}
export const getAllTeamLeaders = async (req, res) => {
    const dbGiama = req.db
    const result = await dbGiama.query("SELECT Codigo, Nombre from teamleader")
    return res.send(result[0])
}