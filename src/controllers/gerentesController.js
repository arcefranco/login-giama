import db from "../database";

const dbGiama = db.sequelize


export const getGerentes = async (req, res) => {
    const allGerentes = await dbGiama.query("SELECT * FROM gerentes")
    res.send(allGerentes)

}