import db from "../database";
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
import { createPass } from "../helpers/createPass";
import { QueryTypes } from "sequelize";

const dbGiama = db.sequelize
const JWT_SECRET = 'MY_SECRET'

export const forgotPassword = async (req, res) => {
 const {login} = req.body
 const user = await dbGiama.query('SELECT * FROM usuarios WHERE login = ?',
 {
   replacements: [login],
   type: QueryTypes.SELECT
 }
);
console.log(user) 
if(user.length === 0){
    res.send({message: 'Usuario no registrado!'})
}

const secret = JWT_SECRET + user[0].password_hash
const payload = {
    email: user[0].emailtest,
    id: user[0].ID
}
const token = jwt.sign(payload, secret, {expiresIn: '3h'})


const transporter = nodemailer.createTransport({
  host: "mail.giama.com.ar",
  port: 25, 
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'info@giama.com.ar',
    pass: 'Q)9~X-?(5~,o' 
  },
  tls: {
    secure: false,
    ignoreTLS: true,
    rejectUnauthorized: false 
}
});
let info = await transporter.sendMail({ 
  from: 'info@giama.com.ar', // sender address 
  to: user[0].emailtest, // list of receivers
  subject: "Forgot Password", // Subject line
  html: '<p>Click <a href="http://localhost:3000/reset-password/' + user[0].ID + '/' + token + '">here</a> to reset your password</p>', // html body
});
res.send({message: `Te enviamos un correo a ${user[0].emailtest} para recuperar tu contraseña!`, username: user[0].login})
}




export const tokenStatus = async (req, res) => {

   try {
    res.send({
      status: true
    })
   } catch (error) {
    console.log(error)
    res.send(error.message)
   }


}

export const updatePass = async (req, res) => {

  const {newPass, confirmPass, id} = req.body
  if(newPass !== confirmPass) {
    res.send({message: 'Passwords dont match', status: false})
  }
  if(!id) {
    res.send({message: 'Not user provided', status: false})  
  }
  const newPassResult = await createPass(id, newPass)

  const user = await dbGiama.query('SELECT * FROM usuarios WHERE ID = ?',
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