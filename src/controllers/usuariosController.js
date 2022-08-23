import { QueryTypes } from "sequelize";
import db from "../database";
import { createHash } from "crypto";
import { createPass } from "../helpers/createPass";

const dbGiama = db.sequelize

export const getUsuarioById = async (req, res) => {

   const {id} = req.body 

 const usuarios = await 
 dbGiama
 .query
 ("SELECT usuarios.`ID`, usuarios.`emailtest` AS 'email', usuarios.`login` AS 'Usuario', usuarios.`Nombre`, vendedores.`Codigo` AS 'Vendedor', teamleader.`Codigo` AS 'TeamLeader',sucursales.`Codigo` AS 'Supervisor', gerentes.`Codigo` AS 'Gerente', usuarios.`UsuarioAnura`, usuarios.`VerSoloScoringAsignado`, usuarios.`us_bloqueado`, usuarios.`us_activo` FROM usuarios LEFT JOIN gerentes ON usuarios.`CodigoGerente` = gerentes.`Codigo` LEFT JOIN teamleader ON usuarios.`CodigoTeamLeader` = teamleader.`Codigo` LEFT JOIN vendedores ON usuarios.`CodigoVendedor` = vendedores.`Codigo` LEFT JOIN sucursales ON usuarios.`CodigoSucursal` = sucursales.`Codigo` WHERE ID = ?",
 {
   replacements: [id],
   type: QueryTypes.SELECT
 }
);
res.send(usuarios) 
}

export const getAllUsuarios = async (req, res) => {
 
  const usuarios = await 
  dbGiama
  .query
  ("SELECT usuarios.`ID`, usuarios.`login` AS 'Usuario', usuarios.`Nombre`, vendedores.`Nombre` AS 'Vendedor', teamleader.`Nombre` AS 'Team Leader',sucursales.`Nombre` AS 'Supervisor', gerentes.`Nombre` AS 'Gerente', usuarios.`UsuarioAnura`, usuarios.`VerSoloScoringAsignado`, usuarios.`us_bloqueado`, usuarios.`us_activo` FROM usuarios LEFT JOIN gerentes ON usuarios.`CodigoGerente` = gerentes.`Codigo` LEFT JOIN teamleader ON usuarios.`CodigoTeamLeader` = teamleader.`Codigo` LEFT JOIN vendedores ON usuarios.`CodigoVendedor` = vendedores.`Codigo` LEFT JOIN sucursales ON usuarios.`CodigoSucursal` = sucursales.`Codigo`");
 res.send(usuarios[0])
 }

export const createUsuario = async (req, res) => {
    let {Nombre, Usuario, password, confirmPassword, Vendedor, Supervisor, 
        TeamLeader, Gerente, UsuarioAnura, us_activo, us_bloqueado, scoringAsignado, newUserBoolean, email } = req.body
     const {user} = req.usuario
        try {
            const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
                replacements: [user],
                type: QueryTypes.SELECT

            })
            console.log('roles: ', roles)
            const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.16.3.1')
            if(!finded){
                return res.status(500).send({status: false, data: 'No tiene permitido realizar esta acción'})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({status: false, data: error})
        } 
        

        if(!Nombre || !Usuario || !password || !confirmPassword) {
            return res.status(400).send({status: false, data: 'Faltan campos'})
        }
        if(password !== confirmPassword){
            return res.status(400).send({status: false, data: 'Las contraseñas deben coincidir'})
        }

        const passAndSalt = createPass(password)
        const {passHashed, newSalt} = passAndSalt
        
         
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
         
           return res.send({status: true, data: 'Usuario creado con exito!'}) 
        
    } catch (error) {
        console.log('error en la DB: ', error)
        return res.status(400).send({status: false, data: `error al insertar en base de datos: ${error}`})
    }
}

export const updateUsuario = async (req, res) => {
    let {ID, Nombre, Usuario, Vendedor, Supervisor, 
        TeamLeader, Gerente, UsuarioAnura, us_activo, us_bloqueado, scoringAsignado, newUserBoolean, email } = req.body
        
        const {user} = req.usuario
        try {
            const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
                replacements: [user],
                type: QueryTypes.SELECT

            })
            console.log('roles: ', roles)
            const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.16.3.2')
            if(!finded){
                return res.status(500).send({status: false, data: 'No tiene permitido realizar esta acción'})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({status: false, data: error})
        } 
        if(!ID) {
            return res.status(400).send({status: false, data: 'sin provisto de ID'})
        }

        if(!Nombre || !Usuario) {
            return res.status(400).send({status: false, data: 'Faltan campos'})
        }
        ID = parseInt(ID)
        UsuarioAnura && typeof(UsuarioAnura) === 'string' ? UsuarioAnura = parseInt(UsuarioAnura) : UsuarioAnura = UsuarioAnura
        TeamLeader && typeof(TeamLeader) === 'string'  ? TeamLeader = parseInt(TeamLeader.split(' ')[0]) : TeamLeader = TeamLeader
        Gerente  && typeof(Gerente) === 'string' ? Gerente = parseInt(Gerente.split(' ')[0]) : Gerente = Gerente
        Supervisor && typeof(Supervisor) === 'string' ? Supervisor = parseInt(Supervisor.split(' ')[0]) : Supervisor = Supervisor
        Vendedor && typeof(Vendedor) === 'string' ? Vendedor = parseInt(Vendedor.split(' ')[0]) : Vendedor = Vendedor
        try {
            const usuarioUpdated = await dbGiama.query("UPDATE usuarios SET login = ?, Nombre = ?, CodigoVendedor = ?,  CodigoSucursal = ?, CodigoTeamLeader = ?, CodigoGerente = ?, UsuarioAnura = ?, us_activo = ?, us_bloqueado = ?, VerSoloScoringAsignado = ?, emailtest = ?  WHERE ID = ?", {
                 replacements: [Usuario, Nombre, Vendedor? Vendedor: null, Supervisor? Supervisor: null, TeamLeader? TeamLeader :null, Gerente? Gerente: null, UsuarioAnura? UsuarioAnura: null, us_activo? us_activo : 1, us_bloqueado? us_bloqueado :0, scoringAsignado? scoringAsignado: null, email? email: null, ID],
                 type: QueryTypes.UPDATE
               }
              ); 
              
                return res.send({status: true, data: 'Usuario actualizado correctamente!'}) 
             
         } catch (error) {
             console.log('error en la DB: ', error)
             return res.status(400).send({status: false, data: 'error en la DB, probablemente el nombre de usuario esté en uso'})
         }
}

export const deleteUsuario = async(req, res) => {
    console.log('body', req.body)
    const {id} = req.body.Codigo 
    if(!id){
       return res.status(400).send({status: false, data: 'Ningun id provisto'})
    }
    const {user} = req.usuario
    try {
        const roles = await dbGiama.query('SELECT usuarios_has_roles.`rl_codigo` FROM usuarios_has_roles WHERE us_login = ?', {
            replacements: [user],
            type: QueryTypes.SELECT

        })
        console.log('roles: ', roles)
        const finded = roles.find(e => e.rl_codigo === '1' || e.rl_codigo === '1.7.16.3')
        if(!finded){
            return res.status(500).send({status: false, data: 'No tiene permitido realizar esta acción'})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: false, data: error})
    } 

    try {
        await dbGiama.query("DELETE FROM usuarios WHERE ID = ?", {
            replacements: [id],
            type: QueryTypes.DELETE
             
        })
       return res.send({status: true, data: 'Usuario eliminado correctamente'})
    } catch (error) {
       return res.status(400).send({status: false, data: `error al eliminar en base de datos: ${error}` })
    } 
}

export const getAllVendedores = async (req, res) => {
const result = await dbGiama.query("SELECT Codigo, Nombre from vendedores")
res.send(result[0])
}
export const getAllGerentes = async (req, res) => {
    const result = await dbGiama.query("SELECT Codigo, Nombre from gerentes")
    res.send(result[0])
}
export const getAllSupervisores = async (req, res) => {
    const result = await dbGiama.query("SELECT Codigo, Nombre from sucursales")
    res.send(result[0])
}
export const getAllTeamLeaders = async (req, res) => {
    const result = await dbGiama.query("SELECT Codigo, Nombre from teamleader")
    res.send(result[0])
}