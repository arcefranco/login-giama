import db from "../database";
const jwt = require('jsonwebtoken')
import { sendEmail } from "../helpers/email/sendEmail";
import { createPass } from "../helpers/createPass";
import { QueryTypes } from "sequelize";


const dbGiama = db.sequelize
const JWT_SECRET = 'MY_SECRET'

export const forgotPassword = async (req, res) => {
 const {login} = req.body //Tomo el nombre de usuario y lo busco en la DB
 const user = await dbGiama.query('SELECT * FROM usuarios WHERE login = ?',
 {
   replacements: [login],
   type: QueryTypes.SELECT
 }
); 
if(user.length === 0){
    res.send({message: 'Usuario no registrado!'})
}
const userDb = user[0]
const {emailtest, ID} = userDb

const secret = JWT_SECRET + user[0].password_hash
const payload = {
    email: user[0].emailtest,
    id: user[0].ID
}
const token = jwt.sign(payload, secret, {expiresIn: '3h'}) //Una vez que lo encuentro, genero el token

sendEmail(emailtest, ID, token)

res.send({message: `Te enviamos un correo a ${emailtest} para recuperar tu contraseña!`, username: userDb.login})
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

  const {newPass, confirmPass, id} = req.body
  if(newPass !== confirmPass) {
    res.send({message: 'Passwords dont match', status: false})
  }
  if(!id) {
    res.send({message: 'Not user provided', status: false})  
  }
  const newPassResult = await createPass(id, newPass)

  const user = await dbGiama.query('SELECT * FROM usuarios WHERE ID = ?', //Es necesario preguntar dos veces si existe el usuario?
{
  replacements: [id],
  type: QueryTypes.SELECT
}
);

if(user.length) {
  
 await dbGiama.query('UPDATE usuarios SET password_hash = ? WHERE ID = ?', 
  {
    replacements: [newPassResult, id],
    type: QueryTypes.UPDATE
  }
 ); 
 res.send({message: 'Password updated!', status: true})
}else{
  res.send({message: 'User does not exist', status: false})
}

}