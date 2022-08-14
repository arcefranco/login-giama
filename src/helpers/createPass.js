import db from "../database"
import { createHash } from "crypto";
import { QueryTypes } from "sequelize";
const dbGiama = db.sequelize

export const createPass = async (id, password) => { //Esta funcion solo funciona para crear contraseña si el usuario ya tiene el salt 
  //en la DB *Cambiar a createPassWithSalt


const user = await dbGiama.query('SELECT * FROM usuarios WHERE ID = ?',
{
  replacements: [id],
  type: QueryTypes.SELECT
}
);


const pwdsalt = password + user[0].salt

const storedSaltBytes = new Buffer.from(pwdsalt, 'utf-8');
var sha256 = createHash("sha256");
sha256.update(storedSaltBytes, "utf8");
var result = sha256.digest("base64");

return result



}

