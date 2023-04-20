import { app } from "../index";
const jwt = require("jsonwebtoken");
import { sendEmail } from "../helpers/email/sendEmail";
import { createPass } from "../helpers/passwords/createPass";
import { QueryTypes, Sequelize } from "sequelize";
require("dotenv").config();

export const forgotPassword = async (req, res) => {
  const { username, empresa } = req.body; //Tomo el nombre de usuario y lo busco en la DB
  console.log(empresa);
  let dbGiama = {};
  if (empresa === "pa7_cg") {
    dbGiama.sequelize = new Sequelize(
      "pa7_cg",
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: "mysql",
      }
    );
  } else if (empresa === "pa7_elysees") {
    dbGiama.sequelize = new Sequelize(
      "pa7_elysees",
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: "mysql",
      }
    );
  }

  dbGiama = dbGiama.sequelize;
  const user = await dbGiama.query("SELECT * FROM usuarios WHERE login = ?", {
    replacements: [username],
    type: QueryTypes.SELECT,
  });
  if (user.length === 0) {
    return res.send({ message: "Usuario no registrado!" });
  }
  const userDb = user[0];
  const { emailtest, ID } = userDb;

  const secret = process.env.RESET_SECRET + user[0].password_hash;
  const payload = {
    email: user[0].emailtest,
    id: user[0].ID,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "3h" }); //Una vez que lo encuentro, genero el token

  sendEmail(emailtest, ID, token);

  return res.send({
    message: `Te enviamos un correo a ${emailtest} para recuperar tu contraseña!`,
    username: userDb.login,
    db: empresa,
  });
};

export const tokenStatus = async (req, res) => {
  //Para enviar el estado del token de recupero de contraseña al front

  try {
    return res.send({
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.send(error.message);
  }
};

export const updatePass = async (req, res) => {
  //Recibo su nueva contraseña y segun su id lo encuentro la DB
  const dbGiama = req.db;
  const { newPass, confirmPass, id } = req.body;
  if (newPass !== confirmPass) {
    return res.json({ message: "Las contraseñas no coinciden", status: false });
  }
  if (!id) {
    return res.json({ message: "Not user provided", status: false });
  }
  const newPassResult = createPass(newPass);
  const { passHashed, newSalt } = newPassResult;
  const user = await dbGiama.query("SELECT * FROM usuarios WHERE ID = ?", {
    replacements: [id],
    type: QueryTypes.SELECT,
  });

  if (user.length) {
    dbGiama.query("CALL pa7_update_pass (:p_LOGIN, :p_SALT, :p_PASSWORD)", {
      replacements: {
        p_LOGIN: user[0].login,
        p_SALT: newSalt,
        p_PASSWORD: passHashed,
      },
    });
    return res.send({ message: "Password updated!", status: true });
  } else {
    return res.json({ message: "User does not exist", status: false });
  }
};
