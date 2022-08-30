import {app} from '../index'
import { verifyPass } from "../helpers/passwords/verifyPass";
const jwt = require('jsonwebtoken')
import { QueryTypes } from "sequelize";




export const getAllUsers = async (req, res) => {
  const dbGiama = app.get('db')
    const allUsers = await dbGiama.query("SELECT * FROM usuarios")
    return res.send(allUsers)
} 

export const login = async (req, res) => {
    const dbGiama = app.get('db')
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
  app.disable('db')   
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





if(verifyPass(pwdsalt) === user[0].password_hash){
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
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: 86400, // 24 hours
  });


     return res.status(200).send({
        id: user[0].ID,
        Nombre:user[0].Nombre,
        username: user[0].login,
        newUser: user[0].newuserBoolean,
        roles: roles,
        token: token

      
    })

}else{
   return res.status(400).send({
        message: "Invalid credentials"
    })
}
}else {
  app.disable('db')
   return res.status(400).send('User does not exist')
  
}
}

export const logout = (req, res) => {
  app.disable('db')
  console.log(app.get('db'))
  res.send('LOGOUT OK!')
}

