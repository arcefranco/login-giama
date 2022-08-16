import { QueryTypes } from "sequelize";
import db from "../database";

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