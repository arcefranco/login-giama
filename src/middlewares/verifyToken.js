const jwt = require('jsonwebtoken')
import { QueryTypes } from "sequelize";
require('dotenv').config()




export const verifyToken = async (req, res, next) => { //Este middleware verifica el estado del token enviado a la ruta
    const {id, token} = req.params
    const dbGiama = req.db
    if(!id) {
      return res.send('Invalid ID')
  } 
  try {
  const user = await dbGiama.query('SELECT * FROM usuarios WHERE ID = ?',
  {
    replacements: [id],
    type: QueryTypes.SELECT
  }
  );
  const secret = process.env.RESET_SECRET + user[0].password_hash
  
  
  
    jwt.verify(token, secret)
    next();
  
   } catch (error) {
    console.log(error)
    return res.send({status: false, error: error})
   } 
  }