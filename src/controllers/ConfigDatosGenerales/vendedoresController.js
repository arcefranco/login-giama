import { QueryTypes } from "sequelize";
import { ifNoCode } from "../../helpers/errors/ifNoCode";
import { beginUpdateQuery } from "../queries/beginUpdateQuery";
import { deleteQuery } from "../queries/deleteQuery";
import { endUpdateQuery } from "../queries/endUpdateQuery";
import { findRolOrMaster } from "../queries/findRoles";
import { insertQuery } from "../queries/insertQuery";
import { selectQuery } from "../queries/selectQuery";
import { updateQuery } from "../queries/updateQuery";
require("dotenv").config();

export const getVendedores = async (req, res) => {
  try {
    const result = await selectQuery(
      req.db,
      "SELECT vendedores.`Codigo`, vendedores.`Nombre`,  NOT vendedores.`Inactivo` AS Activo, teamleader.`Codigo` AS 'TeamLeader', Categoria, oficialesscoring.`Codigo` AS OficialScoring, oficialesmora.`Codigo` AS 'OficialMora', DATE_FORMAT(vendedores.`FechaBaja`, '%d/%m/%Y') AS 'FechaBaja', escalascomisionesvendedores.`Codigo` AS 'Escala' FROM vendedores LEFT JOIN teamleader ON vendedores.`TeamLeader` = teamleader.`Codigo` LEFT JOIN oficialesscoring ON vendedores.`OficialScoring` = oficialesscoring.`Codigo` LEFT JOIN oficialesmora ON vendedores.`OficialMora` = oficialesmora.`Codigo` LEFT JOIN escalascomisionesvendedores ON vendedores.`Escala` = escalascomisionesvendedores.`Codigo` "
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

export const beginUpdate = async (req, res) => {
  const { Codigo } = req.body;
  const { user } = req.usuario;
  try {
    ifNoCode(Codigo);
    const result = await beginUpdateQuery(req.db, user, Codigo, "vendedores");
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};
export const endUpdate = async (req, res) => {
  const { Codigo } = req.body;
  const { user } = req.usuario;
  try {
    ifNoCode(Codigo);
    const result = await endUpdateQuery(req.db, user, Codigo, "vendedores");
    return res.send(result);
  } catch (error) {
    res.send(error);
  }
};

export const postVendedores = async (req, res) => {
  let {
    Nombre,
    Activo: Inactivo,
    TeamLeader,
    Categoria,
    OficialS,
    OficialM,
    FechaBaja,
    Escala,
  } = req.body;
  const { user } = req.usuario;
  if (!Nombre) {
    return res.send({ status: false, message: "Faltan campos" });
  }
  try {
    await findRolOrMaster(req.db, user, "1.7.2.1");
    const result = await insertQuery(
      req.db,
      "INSERT INTO vendedores (Nombre,  Inactivo, TeamLeader, Categoria, OficialScoring, OficialMora, FechaBaja, Escala, UsuarioAltaRegistro ) VALUES (?,NOT ?,?,?,?,?,?,?,?) ",
      [
        Nombre,
        Inactivo ? Inactivo : 0,
        TeamLeader ? TeamLeader : null,
        Categoria ? Categoria : null,
        OficialS ? OficialS : null,
        OficialM ? OficialM : null,
        FechaBaja ? FechaBaja : null,
        Escala ? Escala : null,
        user,
      ],
      "Vendedor"
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

export const updateVendedores = async (req, res) => {
  const dbGiama = req.db;
  let {
    Codigo,
    Nombre,
    Activo: Inactivo,
    TeamLeader,
    Categoria,
    OficialS,
    OficialM,
    Escala,
    FechaBaja,
  } = req.body;
  const { user } = req.usuario;
  if (!Nombre) {
    return res.send({ status: false, message: "Faltan campos" });
  }
  try {
    await findRolOrMaster(req.db, "1.7.2.2");
    const result = await updateQuery(
      req.db,
      "UPDATE vendedores SET Nombre = ?,  Inactivo = NOT ?, TeamLeader = ?, Categoria = ?, OficialScoring = ?, OficialMora = ?, Escala = ?, FechaBaja = ?, inUpdate = NULL WHERE Codigo = ? ",
      [
        Nombre,
        Inactivo,
        TeamLeader ? TeamLeader : null,
        Categoria ? Categoria : null,
        OficialS ? OficialS : null,
        OficialM ? OficialM : null,
        Escala ? Escala : null,
        FechaBaja ? FechaBaja : null,
        Codigo,
      ],
      "Vendedor"
    );

    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

export const deleteVendedores = async (req, res) => {
  const dbGiama = req.db;
  const { Codigo } = req.body;
  const { user } = req.usuario;
  try {
    await findRolOrMaster(req.db, user, "1.7.2.3");
  } catch (error) {
    return res.send(error);
  }
  const Vendedor = dbGiama.models.vendedores;
  try {
    await Vendedor.destroy({
      where: { Codigo: Codigo },
    });
    return res.send({ status: true, message: "Vendedor Borrado!" });
  } catch (error) {
    res.send({
      status: false,
      message: error.hasOwnProperty("name")
        ? error.name
        : JSON.stringify(error),
    });
  }
};

export const getAllEscalas = async (req, res) => {
  try {
    const result = await selectQuery(
      req.db,
      "SELECT * from scalascomisionesvendedores"
    );

    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};
export const getAllOficialesScoring = async (req, res) => {
  try {
    const result = await selectQuery(req.db, "SELECT * from oficialesscoring");

    return res.send(result);
  } catch (error) {
    res.send(error);
  }
};
export const getAllOficialesScoringActivos = async (req, res) => {
  try {
    const result = await selectQuery(
      req.db,
      "SELECT * from oficialesscoring WHERE Inactivo = 0"
    );
    return res.send(result);
  } catch (error) {
    return res.sed(error);
  }
};
export const getAllOficialesMora = async (req, res) => {
  try {
    const result = await selectQuery(req.db, "SELECT * from oficialesmora");
    return res.send(result);
  } catch (error) {
    res.send(error);
  }
};
export const getAllOficialesMoraActivos = async (req, res) => {
  const dbGiama = req.db;
  const result = await dbGiama.query(
    "SELECT * from oficialesmora WHERE Activo = 1",
    {
      type: QueryTypes.SELECT,
    }
  );
  res.send(result);
};
