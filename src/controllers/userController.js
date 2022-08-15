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
    res.status(400).send({
        status: false,
        message: "Email & password are requiered"
    });
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

    const roles = await dbGiama.query('SELECT rl_codigo FROM usuarios_has_roles WHERE us_login = ?',
    {
      replacements: [login],
      type: QueryTypes.SELECT
    }
  );
  const token = jwt.sign({ id: user[0].ID}, 'JWT_SECRET', {
    expiresIn: 86400, // 24 hours
  });

     res.status(200).send({
        id: user[0].ID,
        username: user[0].login,
        roles: roles,
        token: token
      
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