import { QueryTypes } from "sequelize";
import { createPass } from "../../helpers/passwords/createPass";
import randomPass from "../../helpers/passwords/randomPass";
import { sendPass } from "../../helpers/email/sendEmail";
import { selectQuery } from "../queries/selectQuery";
import {  beginUpdateQueryID } from "../queries/beginUpdateQuery";
import { ifNoCode } from "../../helpers/errors/ifNoCode";
import { endUpdateQueryID } from "../queries/endUpdateQuery";
import { findRolOrMaster } from "../queries/findRoles";


export const getAllUsuarios = async (req, res) => {
    try {
        const result = await selectQuery(req.db, "SELECT usuarios.`ID`, usuarios.`login` AS 'Usuario', usuarios.`Nombre`, usuarios.`emailtest` AS 'email', vendedores.`Codigo` AS 'Vendedor', teamleader.`Codigo` AS 'teamLeader',sucursales.`Codigo` AS 'Supervisor', gerentes.`Codigo` AS 'Gerente', usuarios.`UsuarioAnura`, usuarios.`VerSoloScoringAsignado`, usuarios.`us_bloqueado`, usuarios.`us_activo` FROM usuarios LEFT JOIN gerentes ON usuarios.`CodigoGerente` = gerentes.`Codigo` LEFT JOIN teamleader ON usuarios.`CodigoTeamLeader` = teamleader.`Codigo` LEFT JOIN vendedores ON usuarios.`CodigoVendedor` = vendedores.`Codigo` LEFT JOIN sucursales ON usuarios.`CodigoSucursal` = sucursales.`Codigo`")
        return res.send(result)
    } catch (error) {
        return res.send(error)
    }
 }

export const createUsuario = async (req, res) => {
    let {Nombre, Usuario, Vendedor, Supervisor, 
        teamLeader, Gerente, UsuarioAnura, us_activo, us_bloqueado, scoringAsignado, email } = req.body
     const {user} = req.usuario
     const dbGiama = req.db
        try {
            await findRolOrMaster(req.db, user, '1.7.16.3.1')
        } catch (error) {
            return res.send(error)
        }
    
        if(!Nombre || !Usuario) {
            return res.send({status: false, message: 'Faltan campos'})
        }

    try {
        const password = randomPass()

        const passAndSalt = createPass(password)
        const {passHashed, newSalt} = passAndSalt
        console.log('passHashed: ',passHashed, 'newSalt: ',newSalt)
         
        UsuarioAnura && typeof(UsuarioAnura) === 'string' ? UsuarioAnura = parseInt(UsuarioAnura) : UsuarioAnura = UsuarioAnura
        teamLeader && typeof(teamLeader) === 'string'  ? teamLeader = parseInt(teamLeader.split(' ')[0]) : teamLeader = teamLeader
        Gerente  && typeof(Gerente) === 'string' ? Gerente = parseInt(Gerente.split(' ')[0]) : Gerente = Gerente
        Supervisor && typeof(Supervisor) === 'string' ? Supervisor = parseInt(Supervisor.split(' ')[0]) : Supervisor = Supervisor
        Vendedor && typeof(Vendedor) === 'string' ? Vendedor = parseInt(Vendedor.split(' ')[0]) : Vendedor = Vendedor

        await dbGiama.query(`INSERT INTO usuarios (login, salt, password_hash, Nombre, CodigoVendedor, 
            CodigoSucursal, CodigoTeamLeader, CodigoGerente, UsuarioAnura, us_activo, us_bloqueado, 
            VerSoloScoringAsignado, emailtest, newuserBoolean) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, {
            replacements: [Usuario, newSalt, passHashed, Nombre, Vendedor? Vendedor: null, 
                Supervisor? Supervisor: null, teamLeader? teamLeader :null, Gerente? Gerente: null, 
                UsuarioAnura? UsuarioAnura: null, us_activo? us_activo : 1, us_bloqueado? us_bloqueado :0, 
                scoringAsignado? scoringAsignado: null, email? email: null, 1],
            type: QueryTypes.INSERT
          }
         );
          sendPass(email, password)
         
           return res.send({status: true, message: 'Usuario creado con exito!'}) 
        
    } catch (error) {

        return res.send({status: false, message: `error al insertar en base de datos: ${error}`})
    }
}

export const updateUsuario = async (req, res) => {
    let {ID, Nombre, Usuario, Vendedor, Supervisor, 
        TeamLeader, Gerente, UsuarioAnura, us_activo, us_bloqueado, scoringAsignado, newUserBoolean, email } = req.body
        
        const {user} = req.usuario
        const dbGiama = req.db
        try {
            await findRolOrMaster(req.db, user, '1.7.16.3.2')
        } catch (error) {
            return res.send(error)
        }

        if(!ID) {
            return res.send({status: false, message: 'ID required'})
        }

        if(!Nombre || !Usuario) {
            return res.send({status: false, message: 'Faltan campos'})
        } 
        try {
        ID = parseInt(ID)
        UsuarioAnura?.length && typeof(UsuarioAnura) === 'string' ? UsuarioAnura = parseInt(UsuarioAnura) : UsuarioAnura = UsuarioAnura
        TeamLeader && typeof(TeamLeader) === 'string'  ? TeamLeader = parseInt(TeamLeader.split(' ')[0]) : TeamLeader = TeamLeader
        Gerente  && typeof(Gerente) === 'string' ? Gerente = parseInt(Gerente.split(' ')[0]) : Gerente = Gerente
        Supervisor && typeof(Supervisor) === 'string' ? Supervisor = parseInt(Supervisor.split(' ')[0]) : Supervisor = Supervisor
        Vendedor && typeof(Vendedor) === 'string' ? Vendedor = parseInt(Vendedor.split(' ')[0]) : Vendedor = Vendedor
       

         
            await dbGiama.query(`UPDATE usuarios SET inUpdate = NULL, login = ?, Nombre = ?, CodigoVendedor = ?,  
            CodigoSucursal = ?, CodigoTeamLeader = ?, CodigoGerente = ?, UsuarioAnura = ?, us_activo = ?, us_bloqueado = ?,
             VerSoloScoringAsignado = ?, emailtest = ?  WHERE ID = ?`, {
                replacements: [Usuario, Nombre, Vendedor? Vendedor: null, Supervisor? Supervisor: null, TeamLeader? 
                    TeamLeader :null, Gerente? Gerente: null, UsuarioAnura? UsuarioAnura: null, us_activo? us_activo : 1, 
                    us_bloqueado? us_bloqueado :0, scoringAsignado? scoringAsignado: null, email? email: null, ID],
                type: QueryTypes.UPDATE
            })
            
            

              
                return res.send({status: true, message: 'Usuario actualizado correctamente!'}) 
             
         } catch (error) {
             console.log('error en la DB: ', error)
             return res.send({status: false, message: 'error en la DB, probablemente el nombre de usuario esté en uso'})
         }
}

export const deleteUsuario = async(req, res) => {
    const {id} = req.body
    const dbGiama = req.db
    const {user} = req.usuario
    if(!id){
       return res.send({status: false, message: 'Ningun id provisto'})
    }

    try {
        await findRolOrMaster(req.db, user, '1.7.16.3')
    } catch (error) {
        return res.send(error)
    }

    try {
        await dbGiama.query("DELETE FROM usuarios WHERE ID = ?", {
            replacements: [id],
            type: QueryTypes.DELETE
             
        })
       return res.send({status: true, message: 'Usuario eliminado correctamente'})
    } catch (error) {
       return res.send({status: false, message: `error al eliminar en base de datos: ${error}` })
    } 
}

export const beginUpdate = async (req, res) => {
    const {Codigo} = req.body
    const {user} = req.usuario
    try {
        ifNoCode(Codigo)
        const result = await beginUpdateQueryID(req.db, user, Codigo, "usuarios")
        return res.send(result)
    } catch (error) {
        return res.send(error)
    }
}

export const endUpdate = async (req, res) => {
    const {Codigo} = req.body
    const {user} = req.usuario

    try {
        ifNoCode(Codigo)
        const result = await endUpdateQueryID(req.db, user, Codigo, "usuarios")
        return res.send(result)
    } catch (error) {
        return res.send(error)
    }
}


export const getAllVendedores = async (req, res) => {
    try {
        const result = await selectQuery(req.db, "SELECT Codigo, Nombre from vendedores")
        return res.send(result)
    } catch (error) {
        return res.send(error)
    }
}
export const getAllGerentes = async (req, res) => {
    try {
        const result = await selectQuery(req.db, "SELECT Codigo, Nombre from gerentes")
        return res.send(result)      
    } catch (error) {
        return res.send(error)
    }
}
export const getAllSupervisores = async (req, res) => {
    try {
        const result = await selectQuery(req.db, "SELECT Codigo, Nombre from sucursales")
        return res.send(result)      
    } catch (error) {
        return res.send(error)
    }

}
export const getAllTeamLeaders = async (req, res) => {
    try {
        const result = await selectQuery(req.db, "SELECT Codigo, Nombre from teamleader")
        return res.send(result)
        
    } catch (error) {
        return res.send(error)
    }

}