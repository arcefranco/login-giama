import { QueryTypes } from "sequelize";
import db from "../database";
import { createHash } from "crypto";

const dbGiama = db.sequelize

export const getUsuarioById = async (req, res) => {

   const {id} = req.body 

 const usuarios = await 
 dbGiama
 .query
 ("SELECT usuarios.`ID`, usuarios.`login` AS 'Usuario', usuarios.`Nombre`, vendedores.`Nombre` AS 'Vendedor', teamleader.`Nombre` AS 'Team Leader',sucursales.`Nombre` AS 'Supervisor', gerentes.`Nombre` AS 'Gerente', usuarios.`UsuarioAnura`, usuarios.`VerSoloScoringAsignado`, usuarios.`us_bloqueado`, usuarios.`us_activo` FROM usuarios LEFT JOIN gerentes ON usuarios.`CodigoGerente` = gerentes.`Codigo` LEFT JOIN teamleader ON usuarios.`CodigoTeamLeader` = teamleader.`Codigo` LEFT JOIN vendedores ON usuarios.`CodigoVendedor` = vendedores.`Codigo` LEFT JOIN sucursales ON usuarios.`CodigoSucursal` = sucursales.`Codigo` WHERE ID = ?",
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
    let {Nombre, login, password, confirmPassword, Vendedor, Supervisor, 
        TeamLeader, Gerente, UsuarioAnura, us_activo, us_bloqueado, scoringAsignado, newUserBoolean, email } = req.body

        if(!Nombre || !login || !password || !confirmPassword) {
            return res.status(400).send({status: false, data: 'Faltan campos'})
        }
        if(password !== confirmPassword){
            return res.status(400).send({status: false, data: 'Las contraseñas deben coincidir'})
        }
        const pwdsalt = password + 'c06zYjccmk1Tc9knYunSN5fP6ytpwwoO+SDZZBT5ZqU='

        const storedSaltBytes = new Buffer.from(pwdsalt, 'utf-8');
        var sha256 = createHash("sha256");
        sha256.update(storedSaltBytes, "utf8");
        const passwordhash = sha256.digest("base64");
        
        UsuarioAnura = parseInt(UsuarioAnura)
        TeamLeader = parseInt(TeamLeader.split(' ')[0])
        Gerente = parseInt(Gerente.split(' ')[0])
        Supervisor = parseInt(Supervisor.split(' ')[0])
        Vendedor = parseInt(Vendedor.split(' ')[0])

    try {
       const newUser = await dbGiama.query("INSERT INTO usuarios (login, salt, password_hash, Nombre, CodigoVendedor, CodigoSucursal, CodigoTeamLeader, CodigoGerente, UsuarioAnura, us_activo, us_bloqueado, VerSoloScoringAsignado, emailtest, newuserBoolean) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", {
            replacements: [login, "c06zYjccmk1Tc9knYunSN5fP6ytpwwoO+SDZZBT5ZqU=", passwordhash, Nombre, Vendedor? Vendedor: null, Supervisor? Supervisor: null, TeamLeader? TeamLeader :null, Gerente? Gerente: null, UsuarioAnura? UsuarioAnura: null, us_activo? us_activo : 1, us_bloqueado? us_bloqueado :0, scoringAsignado? scoringAsignado: null, email? email: null, newUserBoolean? newUserBoolean: 1],
            type: QueryTypes.INSERT
          }
         );
         
           return res.send({status: true, data: newUser}) 
        
    } catch (error) {
        console.log('error en la DB: ', error)
        return res.status(400).send({status: false, data: `error al insertar en base de datos: ${error}`})
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