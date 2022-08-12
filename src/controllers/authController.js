import db from "../database";
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
import { QueryTypes } from "sequelize";

const dbGiama = db.sequelize
const JWT_SECRET = 'MY_SECRET'

export const forgotPassword = async (req, res) => {
 const {email} = req.body
 const user = await dbGiama.query('SELECT * FROM usuarios WHERE emailtest = ?',
 {
   replacements: [email],
   type: QueryTypes.SELECT
 }
);
if(!user){
    res.send('User does not exist')
}

const secret = JWT_SECRET + user.password_hash
const payload = {
    email: user[0].emailtest,
    id: user[0].ID
}
const token = jwt.sign(payload, secret, {expiresIn: '15m'})

const transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'gmartinez@decreditos.com', // generated ethereal user
    pass: '4b33fb76-4036-4456-9b3b-33b726741f51', // generated ethereal password
  },
});
let info = await transporter.sendMail({
  from: 'info@giama.com.ar', // sender address
  to: user[0].emailtest, // list of receivers
  subject: "Forgot Password", // Subject line
  html: '<p>Click <a href="http://localhost:3000/reset-password/' + user[0].id + '/' + token + '">here</a> to reset your password</p>', // html body
});
res.send('Password reset link has sended')
}

export const resetPassword = async (req, res) => {
    const {id, token} = req.params
    const {password} = req.body
    if(!id) {
        res.send('Invalid ID')
    }

    const user = await dbGiama.query('SELECT * FROM usuarios WHERE ID = ?',
    {
      replacements: [id],
      type: QueryTypes.SELECT
    }
   );

   const secret = JWT_SECRET + user.password_hash

   try {

    const payload = jwt.verify(token, secret)
    //ACA hay que aplicar la logica para cambiar la contraseña al hash de siempre
    //UPDATEAR en la base de datos el nuevo hash
    //ENVIARLO como respuesta
   } catch (error) {
    console.log(error)
    res.send(error.message)
   }


}