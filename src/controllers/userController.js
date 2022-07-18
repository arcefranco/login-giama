import db from "../database";
import { createHash } from "crypto";
import { QueryTypes } from "sequelize";


const users = db.sequelize

export const getAllUsers = async (req, res) => {
    const allUsers = await users.query("SELECT * FROM usuarios")
    res.send(allUsers)
}

export const login = async (req, res) => {
    
    const {login} = req.body
    const {password} = req.body
    const user = await users.query('SELECT * FROM usuarios WHERE login = ?',
    {
      replacements: [login],
      type: QueryTypes.SELECT
    }
  );



if (!login || !password) {   
    res.status(400).send({
        status: false,
        message: "Email & password are requiered"
    });
}else if(!user){
    res.status(400).send('User does not exist')
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

     res.status(201).send({
        id: user[0].ID,
        username: user[0].login,
      
    })

}else{
    res.status(400).send({
        message: "Invalid credentials"
    })
}
}
