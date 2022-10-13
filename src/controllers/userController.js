import {app} from '../index'
import { verifyPass } from "../helpers/passwords/verifyPass";
const jwt = require('jsonwebtoken')
import Sequelize from 'sequelize';
import { QueryTypes } from "sequelize";





export const getAllUsers = async (req, res) => {
  
    const allUsers = await dbGiama.query("SELECT * FROM usuarios")
    return res.send(allUsers)
} 

export const login = async (req, res) => {
    
    const {login, password, empresa, empresaReal, codigoMarca, marca} = req.body

    console.log(req.body)
    let dbGiama = {};
    if(empresa === 'pa7'){
      dbGiama.sequelize = new Sequelize('pa7', process.env.DB_USERNAME, process.env.DB_PASSWORD,{
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    })
    }else if(empresa === 'pa7_gf_test_2'){
      dbGiama.sequelize = new Sequelize('pa7_gf_test_2', process.env.DB_USERNAME, process.env.DB_PASSWORD,{
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    })
      
    }


    dbGiama = dbGiama.sequelize



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

const pwdsalt = password + user[0].salt
const secret = process.env.RESET_SECRET + user[0].password_hash
const payload = {
    email: user[0].emailtest,
    id: user[0].ID
}
const sendToken = jwt.sign(payload, secret, {expiresIn: '3h'})




if(verifyPass(pwdsalt) === user[0].password_hash){

  if(user[0].newuserBoolean === 1) {
    return res.send({ 
      newUser: true,
      empresa: empresa,
      link: '/reset-password/' + user[0].ID + '/' + sendToken + '',
      message: 'Tenes que actualizar tu contraseña'
    })
  }

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
        token: token,
        db: empresa,
        empresaReal: empresaReal,
        codigoMarca: codigoMarca,
        marca: marca,
      
    })

}else{
   return res.status(400).send("Contraseña incorrecta")
}
}else {
  
   return res.status(400).send('El usuario no existe')
  
}
}

export const logout = (req, res) => {

  res.send('LOGOUT OK!')
}

