import db from "../database";
import { createHash } from "crypto";
const jwt = require('jsonwebtoken')
import { QueryTypes } from "sequelize";


const dbGiama = db.sequelize

export const getAllUsers = async (req, res) => {
    const allUsers = await dbGiama.query("SELECT * FROM usuarios")
    res.send(allUsers)
}

export const login = async (req, res) => {
    
    const {login} = req.body
    const {password} = req.body
    const user = await dbGiama.query('SELECT * FROM usuarios WHERE login = ?',
    {
      replacements: [login],
      type: QueryTypes.SELECT
    }
  );
 

if (user[0]) {
if (!login || !password) {   
    return res.status(400).send({
        status: false,
        message: "Email & password are requiered"
    });
}
if(user[0].newuserBoolean === 1) {
  return res.send({
    newUser: true,
    message: 'Tenes que actualizar tu contraseña'
  })
}
const pwdsalt = password + user[0].salt


   
const verifyPass = (pwdsalt) => {
    
    const storedSaltBytes = new Buffer.from(pwdsalt, 'utf-8');
    var sha256 = createHash("sha256");
    sha256.update(storedSaltBytes, "utf8");
    var result = sha256.digest("base64");
     
    return result

}


if(verifyPass(pwdsalt) === user[0].password_hash){
 console.log('something with roles')
    const roles = await dbGiama.query('SELECT rl_codigo FROM usuarios_has_roles WHERE us_login = ?',
    {
      replacements: [login],
      type: QueryTypes.SELECT
    }
  ); 
  const payload = {
    id: user[0].ID,
    user: user[0].login,
    iat: Date.now()
  }
  const token = jwt.sign(payload, 'JWT_SECRET', {
    expiresIn: 86400, // 24 hours
  });


     res.status(200).send({
        id: user[0].ID,
        username: user[0].login,
        newUser: user[0].newuserBoolean,
        roles: roles,
        token: token,

      
    })

}else{
    res.status(400).send({
        message: "Invalid credentials"
    })
}
}else {
  
    res.status(400).send('User does not exist')
  
}
}

export const getGerentes = async (req, res) => {
    const allGerentes = await dbGiama.query("SELECT * FROM gerentes")
    res.send(allGerentes)

}

export const postGerentes = async (req, res, error) => {
  const {gerentes} = req.body;
  // const {}
  const postGerente = await dbGiama.query("INSERT INTO gerentes (Nombre, Activo) VALUES (?)",
  {
      replacements: [gerentes],
      type:QueryTypes.INSERT,
  })
  res.send(postGerente)
}