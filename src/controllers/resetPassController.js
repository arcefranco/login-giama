import {app} from '../index'
const jwt = require('jsonwebtoken')
import { sendEmail } from "../helpers/email/sendEmail";
import { createPass } from "../helpers/passwords/createPass";
import { QueryTypes } from "sequelize";
require('dotenv').config()




export const forgotPassword = async (req, res) => {
  const dbGiama = app.get('db')
  console.log(dbGiama)
 const {login} = req.body //Tomo el nombre de usuario y lo busco en la DB
 const user = await dbGiama.query('SELECT * FROM usuarios WHERE login = ?',
 {
   replacements: [login],
   type: QueryTypes.SELECT
 }
); 
if(user.length === 0){
    return res.send({message: 'Usuario no registrado!'})
}
const userDb = user[0]
const {emailtest, ID} = userDb

const secret = process.env.RESET_SECRET + user[0].password_hash
const payload = {
    email: user[0].emailtest,
    id: user[0].ID
}
const token = jwt.sign(payload, secret, {expiresIn: '3h'}) //Una vez que lo encuentro, genero el token

sendEmail(emailtest, ID, token)

return res.send({message: `Te enviamos un correo a ${emailtest} para recuperar tu contraseña!`, username: userDb.login})
}




export const tokenStatus = async (req, res) => { //Para enviar el estado del token de recupero de contraseña al front

   try {
    res.send({
      status: true
    })
   } catch (error) {
    console.log(error)
    res.send(error.message)
   }


}

export const updatePass = async (req, res) => { //Recibo su nueva contraseña y segun su id lo encuentro la DB 
  const dbGiama = app.get('db')
  const {newPass, confirmPass, id} = req.body
  if(newPass !== confirmPass) {
   return res.json({message: 'Las contraseñas no coinciden', status: false})
  }
  if(!id) {
   return res.json({message: 'Not user provided', status: false})  
  }
  const newPassResult = createPass(newPass)
  const {passHashed, newSalt} = newPassResult
  const user = await dbGiama.query('SELECT * FROM usuarios WHERE ID = ?', 
{
  replacements: [id],
  type: QueryTypes.SELECT
}
);

if(user.length) {
  
 await dbGiama.query('UPDATE usuarios SET password_hash = ?, salt = ?, newuserBoolean = ? WHERE ID = ?', 
  {
    replacements: [passHashed, newSalt, 0, id],
    type: QueryTypes.UPDATE
  }
 ); 
return res.send({message: 'Password updated!', status: true})
}else{
return res.json({message: 'User does not exist', status: false})
}

}