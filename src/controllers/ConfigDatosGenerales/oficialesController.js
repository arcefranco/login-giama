import { QueryTypes } from "sequelize";
import { returnErrorMessage } from "../../helpers/errors/returnErrorMessage";
import { beginUpdateQuery } from "../queries/beginUpdateQuery";
import { deleteQuery } from "../queries/deleteQuery";
import { endUpdateQuery } from "../queries/endUpdateQuery";
import { insertQuery } from "../queries/insertQuery";
import { selectQuery } from "../queries/selectQuery";
import { updateQuery } from "../queries/updateQuery";
export const getOficialesByName = async (req, res) => {
  const { oficialName } = req.body;
  try {
    switch (oficialName) {
      case "Licitacion":
        const oficialLicitaciones = await selectQuery(
          req.db,
          "SELECT * FROM oficialeslicitaciones"
        );
        return res.send(oficialLicitaciones);

      case "Adjudicacion":
        const oficialAdjudicaciones = await selectQuery(
          req.db,
          "SELECT * FROM oficialesadjudicacion"
        );
        return res.send(oficialAdjudicaciones);

      case "Plan Canje":
        const oficialCanje = await selectQuery(
          req.db,
          "SELECT * FROM oficialesplancanje"
        );
        return res.send(oficialCanje);

      case "Scoring":
        const oficialScoring = await selectQuery(
          req.db,
          "SELECT * FROM oficialesscoring"
        );
        return res.send(oficialScoring);

      case "Mora":
        const oficialMora = await selectQuery(
          req.db,
          "SELECT * FROM oficialesmora"
        );
        return res.send(oficialMora);

      case "Subite":
        const oficialSubite = await selectQuery(
          req.db,
          "SELECT * FROM subite_oficiales"
        );
        return res.send(oficialSubite);

      case "Compra":
        const oficialCompra = await selectQuery(
          req.db,
          "SELECT * FROM comprar_oficiales"
        );
        return res.send(oficialCompra);

      case "Carga":
        const oficialCarga = await selectQuery(
          req.db,
          "SELECT * FROM oficialescarga"
        );
        return res.send(oficialCarga);

      case "Patentamiento":
        const oficialPatentamiento = await selectQuery(
          req.db,
          "SELECT * FROM oficialespatentamiento"
        );
        return res.send(oficialPatentamiento);

      case "Asignacion":
        const oficialAsignacion = await selectQuery(
          req.db,
          "SELECT * FROM oficialesasignacion"
        );
        return res.send(oficialAsignacion);

      default:
        break;
    }
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const deleteOficiales = async (req, res) => {
  const { oficialName, Codigo } = req.body;

  switch (oficialName) {
    case "Licitacion":
      try {
        await deleteQuery(
          req.db,
          "DELETE FROM oficialeslicitaciones WHERE Codigo = ?",
          [Codigo],
          "oficial licitacion"
        );

        return res.send({ status: true, message: "Eliminado correctamente!" });
      } catch (error) {
        return res.send(error);
      }

    case "Adjudicacion":
      try {
        await deleteQuery(
          req.db,
          "DELETE FROM oficialesadjudicacion WHERE Codigo = ?",
          [Codigo],
          "oficial adjudicacion"
        );
        return res.send({ status: true, message: "Eliminado correctamente!" });
      } catch (error) {
        return res.send(error);
      }

    case "Plan Canje":
      try {
        await deleteQuery(
          req.db,
          "DELETE FROM oficialesplancanje WHERE Codigo = ?",
          [Codigo],
          "oficial plan canje"
        );
        return res.send({ status: true, message: "Eliminado correctamente!" });
      } catch (error) {
        return res.send(error);
      }

    case "Scoring":
      try {
        await deleteQuery(
          req.db,
          "DELETE FROM oficialesscoring WHERE Codigo = ?",
          [Codigo],
          "oficial scoring"
        );
        return res.send({ status: true, message: "Eliminado correctamente!" });
      } catch (error) {
        return res.send(error);
      }

    case "Mora":
      try {
        await deleteQuery(
          req.db,
          "DELETE FROM oficialesmora WHERE Codigo = ?",
          [Codigo],
          "oficial mora"
        );
        return res.send({ status: true, message: "Eliminado correctamente!" });
      } catch (error) {
        return res.send(error);
      }

    case "Subite":
      try {
        await deleteQuery(
          req.db,
          "DELETE FROM subite_oficiales WHERE Codigo = ?",
          [Codigo],
          "oficial subite"
        );
        return res.send({ status: true, message: "Eliminado correctamente!" });
      } catch (error) {
        return res.send(error);
      }

    case "Compra":
      try {
        await deleteQuery(
          req.db,
          "DELETE FROM comprar_oficiales WHERE Codigo = ?",
          [Codigo],
          "oficial compra"
        );
        return res.send({ status: true, message: "Eliminado correctamente!" });
      } catch (error) {
        console.log(error);
        return res.send(error);
      }

    case "Carga":
      try {
        await deleteQuery(
          req.db,
          "DELETE FROM oficialescarga WHERE Codigo = ?",
          [Codigo],
          "oficial carga"
        );
        return res.send({ status: true, message: "Eliminado correctamente!" });
      } catch (error) {
        console.log(error);
        return res.send(error);
      }

    case "Patentamiento":
      try {
        await deleteQuery(
          req.db,
          "DELETE FROM oficialespatentamiento WHERE Codigo = ?",
          [Codigo],
          "oficial patentamiento"
        );
        return res.send({ status: true, message: "Eliminado correctamente!" });
      } catch (error) {
        return res.send(error);
      }

    case "Asignacion":
      try {
        await deleteQuery(
          req.db,
          "DELETE FROM oficialesasignacion WHERE Codigo = ?",
          [Codigo],
          "oficial asignacion"
        );
        return res.send({ status: true, message: "Eliminado correctamente!" });
      } catch (error) {
        return res.send(error);
      }

    default:
      return res.send({ status: false, message: "Error" });
  }
};
export const updateOficiales = async (req, res) => {
  const {
    categoria,
    Codigo,
    Nombre,
    Usuario,
    login,
    Activo,
    Inactivo,
    Objetivo,
    TipoOficialMora,
    HNMayor40,
    Supervisor,
  } = req.body;
  const dbGiama = req.db;

  try {
    switch (categoria) {
      case "Licitacion":
        try {
          await updateQuery(
            req.db,
            "UPDATE oficialeslicitaciones SET Nombre = ?, IdUsuarioLogin = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?",
            [Nombre, Usuario, Activo, Codigo],
            "oficial licitacion"
          );
          return res.send({
            status: true,
            message: "Actualizado correctamente!",
          });
        } catch (error) {
          return res.send(error);
        }

      case "Adjudicacion":
        try {
          await updateQuery(
            req.db,
            "UPDATE oficialesadjudicacion SET Nombre = ?, Inactivo = ?, inUpdate = NULL WHERE Codigo = ?",
            [Nombre, Inactivo, Codigo],
            "oficial adjudicacion"
          );
          return res.send({
            status: true,
            message: "Actualizado correctamente!",
          });
        } catch (error) {
          return res.send(error);
        }

      case "Plan Canje":
        try {
          await updateQuery(
            req.db,
            "UPDATE oficialesplancanje SET Nombre = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?",
            [Nombre, Activo, Codigo],
            "oficial plan canje"
          );
          return res.send({
            status: true,
            message: "Actualizado correctamente!",
          });
        } catch (error) {
          return res.send(error);
        }

      case "Scoring":
        try {
          const Inactivo = Activo === 1 ? 0 : 1;
          const ObjetivotoNum = Objetivo && parseInt(Objetivo);

          await updateQuery(
            req.db,
            "UPDATE oficialesscoring SET Nombre = ?, IdUsuarioLogin = ?, Inactivo = ?, Objetivo = ?, inUpdate = NULL WHERE Codigo = ?",
            [Nombre, Usuario, Inactivo, Objetivo ? ObjetivotoNum : 0, Codigo]
          );
          return res.send({
            status: true,
            message: "Actualizado correctamente!",
          });
        } catch (error) {
          return res.send(error);
        }

      case "Mora":
        const toNumber = parseInt(TipoOficialMora);
        try {
          await updateQuery(
            req.db,
            "UPDATE oficialesmora SET Nombre = ?, IdUsuarioLogin = ?, TipoOficialMora = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?",
            [Nombre, Usuario, toNumber, Activo, Codigo],
            "oficiales mora"
          );
          return res.send({
            status: true,
            message: "Actualizado correctamente!",
          });
        } catch (error) {
          return res.send(error);
        }

      case "Subite":
        try {
          if (!login)
            return res.send({ status: false, message: "Faltan campos" });
          await updateQuery(
            req.db,
            "UPDATE subite_oficiales SET Nombre = ?, login = ?, HNMayor40 = ?, Supervisor = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?",
            [
              Nombre,
              login,
              HNMayor40,
              Supervisor ? Supervisor : null,
              Activo,
              Codigo,
            ],
            "oficial subite"
          );
          return res.send({
            status: true,
            message: "Actualizado correctamente!",
          });
        } catch (error) {
          return res.send(error);
        }

      case "Compra":
        if (!login)
          return res.send({ status: false, message: "Faltan campos" });
        try {
          await updateQuery(
            req.db,
            "UPDATE comprar_oficiales SET Nombre = ?, login = ?, HNMayor40 = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?",
            [Nombre, login, HNMayor40, Activo, Codigo],
            "oficial compra"
          );
          return res.send({
            status: true,
            message: "Actualizado correctamente!",
          });
        } catch (error) {
          return res.send(error);
        }

      case "Carga":
        try {
          await updateQuery(
            req.db,
            "UPDATE oficialescarga SET Nombre = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?",
            [Nombre, Activo, Codigo],
            "oficial carga"
          );
          return res.send({
            status: true,
            message: "Actualizado correctamente!",
          });
        } catch (error) {
          return res.send(error);
        }

      case "Patentamiento":
        try {
          await updateQuery(
            req.db,
            "UPDATE oficialespatentamiento SET Nombre = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?",
            [Nombre, Activo, Codigo],
            "oficial patentamiento"
          );
          return res.send({
            status: true,
            message: "Actualizado correctamente!",
          });
        } catch (error) {
          return res.send(error);
        }

      case "Asignacion":
        try {
          await updateQuery(
            req.db,
            "UPDATE oficialesasignacion SET Nombre = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?",
            [Nombre, Activo, Codigo],
            "oficial asignacion"
          );

          return res.send({
            status: true,
            message: "Actualizado correctamente!",
          });
        } catch (error) {
          return res.send(error);
        }

      default:
        return res.send({ status: false, message: "Error" });
    }
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const createOficiales = async (req, res) => {
  const {
    categoria,
    Nombre,
    Usuario,
    Activo,
    Objetivo,
    TipoOficialMora,
    HNMayor40,
    Supervisor,
    login,
  } = req.body;
  const dbGiama = req.db;
  const { user } = req.usuario;
  if (!categoria)
    return res.send({ status: false, message: "Falta categoría" });
  try {
    switch (categoria) {
      case "Licitacion":
        try {
          await insertQuery(
            req.db,
            "INSERT INTO oficialeslicitaciones (Nombre, IdUsuarioLogin, Activo) VALUES (?,?,?)",
            [Nombre, user, Activo],
            "oficiales licitaciones"
          );

          return res.send({ status: true, message: "Creado correctamente!" });
        } catch (error) {
          return res.send(error);
        }

      case "Adjudicacion":
        try {
          const Inactivo = Activo === 1 ? 0 : 1;
          await insertQuery(
            req.db,
            "INSERT INTO oficialesadjudicacion (Nombre, Inactivo) VALUES (?,?)",
            [Nombre, Inactivo],
            "oficiales adjudicacion"
          );
          return res.send({ status: true, message: "Creado correctamente!" });
        } catch (error) {
          console.log(error);
          return res.send(error);
        }

      case "Plan Canje":
        try {
          await insertQuery(
            req.db,
            "INSERT INTO oficialesplancanje (Nombre, Activo) VALUES (?,?)",
            [Nombre, Activo],
            "oficiales plan canje"
          );
          return res.send({ status: true, message: "Creado correctamente!" });
        } catch (error) {
          console.log(error);
          return res.send(error);
        }

      case "Scoring":
        const Inactivo = Activo === 1 ? 0 : 1;
        const ObjetivotoNum = Objetivo && parseInt(Objetivo);
        if (!Usuario)
          return res.send({ status: false, message: "Faltan campos" });
        try {
          await insertQuery(
            req.db,
            "INSERT INTO oficialesscoring (Nombre, IdUsuarioLogin, Inactivo, Objetivo) VALUES (?,?,?,?)",
            [Nombre, Usuario, Inactivo, Objetivo ? ObjetivotoNum : 0],
            "oficiales scoring"
          );
          return res.send({ status: true, message: "Creado correctamente!" });
        } catch (error) {
          return res.send(error);
        }

      case "Mora":
        const toNumber = parseInt(TipoOficialMora);
        if (!Usuario)
          return res.send({ status: false, message: "Faltan campos" });
        try {
          await insertQuery(
            req.db,
            "INSERT INTO oficialesmora (Nombre, IdUsuarioLogin, TipoOficialMora, Activo) VALUES (?,?,?,?)",
            [Nombre, Usuario, toNumber, Activo],
            "oficiales mora"
          );
        } catch (error) {
          return res.send(error);
        }

      case "Subite":
        if (!Usuario)
          return res.send({ status: false, message: "Faltan campos" });
        try {
          await dbGiama.query(
            "INSERT INTO subite_oficiales (Nombre, login, HNMayor40, Supervisor, Activo) VALUES (?,?,?,?,?)",
            {
              replacements: [
                Nombre,
                Usuario,
                HNMayor40,
                Supervisor ? Supervisor : null,
                Activo,
              ],
              type: QueryTypes.INSERT,
            }
          );
          return res.send({ status: true, message: "Creado correctamente!" });
        } catch (error) {
          return res.send(error);
        }

      case "Compra":
        /*             const HNCompratoNumber = parseInt(HN) */
        if (!Usuario)
          return res.send({ status: false, message: "Faltan campos" });
        try {
          await insertQuery(
            req.db,
            "INSERT INTO comprar_oficiales (Nombre, login, HNMayor40, Activo) VALUES (?,?,?,?)",
            [Nombre, Usuario, HNMayor40, Activo],
            "oficiales compra"
          );

          return res.send({ status: true, message: "Creado correctamente!" });
        } catch (error) {
          return res.send(error);
        }

      case "Carga":
        try {
          await insertQuery(
            req.db,
            "INSERT INTO oficialescarga (Nombre, Activo) VALUES (?,?)",
            [Nombre, Activo],
            "oficiales carga"
          );
          return res.send({ status: true, message: "Creado correctamente!" });
        } catch (error) {
          return res.send(error);
        }

      case "Patentamiento":
        try {
          await insertQuery(
            req.db,
            "INSERT INTO oficialespatentamiento (Nombre, Activo) VALUES (?,?)",
            [Nombre, Activo],
            "oficiales patentamiento"
          );
          return res.send({ status: true, message: "Creado correctamente!" });
        } catch (error) {
          return res.send(error);
        }

      case "Asignacion":
        try {
          await insertQuery(
            req.db,
            "INSERT INTO oficialesasignacion (Nombre, Activo) VALUES (?,?)",
            [Nombre, Activo],
            "oficiales asignacion"
          );
          return res.send({ status: true, message: "Creado correctamente!" });
        } catch (error) {
          return res.send(error);
        }

      default:
        return res.send({
          status: false,
          message: "Categoría inexistente o no seleccionada",
        });
    }
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const endUpdate = async (req, res) => {
  const { categoria, Codigo } = req.body;
  const { user } = req.usuario;

  switch (categoria) {
    case "Licitacion":
      try {
        const actualOficial = await endUpdateQuery(
          req.db,
          user,
          Codigo,
          "oficialeslicitaciones"
        );
        return res.send(actualOficial);
      } catch (error) {
        return res.send(error);
      }
    case "Adjudicacion":
      try {
        const actualOficial = await endUpdateQuery(
          req.db,
          user,
          Codigo,
          "oficialesadjudicacion"
        );
        return res.send(actualOficial);
      } catch (error) {
        return res.send(error);
      }
    case "Plan Canje":
      try {
        const actualOficial = await endUpdateQuery(
          req.db,
          user,
          Codigo,
          "oficialesplancanje"
        );
        return res.send(actualOficial);
      } catch (error) {
        return res.send(error);
      }
    case "Scoring":
      try {
        const actualOficial = await endUpdateQuery(
          req.db,
          user,
          Codigo,
          "oficialesscoring"
        );
        return res.send(actualOficial);
      } catch (error) {
        return res.send(error);
      }
    case "Mora":
      try {
        const actualOficial = await endUpdateQuery(
          req.db,
          user,
          Codigo,
          "oficialesmora"
        );
        return res.send(actualOficial);
      } catch (error) {
        return res.send(error);
      }
    case "Subite":
      try {
        const actualOficial = await endUpdateQuery(
          req.db,
          user,
          Codigo,
          "subite_oficiales"
        );
        return res.send(actualOficial);
      } catch (error) {
        return res.send(error);
      }
    case "Compra":
      try {
        const actualOficial = await endUpdateQuery(
          req.db,
          user,
          Codigo,
          "comprar_oficiales"
        );
        return res.send(actualOficial);
      } catch (error) {
        return res.send(error);
      }
    case "Carga":
      try {
        const actualOficial = await endUpdateQuery(
          req.db,
          user,
          Codigo,
          "oficialescarga"
        );
        return res.send(actualOficial);
      } catch (error) {
        return res.send(error);
      }
    case "Patentamiento":
      try {
        const actualOficial = await endUpdateQuery(
          req.db,
          user,
          Codigo,
          "oficialespatentamiento"
        );
        return res.send(actualOficial);
      } catch (error) {
        return res.send(error);
      }
    case "Asignacion":
      try {
        const actualOficial = await endUpdateQuery(
          req.db,
          user,
          Codigo,
          "oficialesasignacion"
        );
        return res.send(actualOficial);
      } catch (error) {
        return res.send(error);
      }

    default:
      res.send({ status: false, message: "Categoria no reconocida" });
  }
};

export const beginUpdate = async (req, res) => {
  const { categoria, Codigo } = req.body;
  const dbGiama = req.db;
  const { user } = req.usuario;
  if (typeof Codigo !== "number")
    return res.send({ status: false, message: "Codigo no valido" });
  try {
    switch (categoria) {
      case "Licitacion":
        try {
          const actualUsuario = await beginUpdateQuery(
            req.db,
            user,
            Codigo,
            "oficialeslicitaciones"
          );
          return res.send(actualUsuario);
        } catch (error) {
          return res.send(error);
        }
      case "Adjudicacion":
        try {
          const actualUsuario = await beginUpdateQuery(
            req.db,
            user,
            Codigo,
            "oficialesadjudicacion"
          );
          return res.send(actualUsuario);
        } catch (error) {
          return res.send(error);
        }
      case "Plan Canje":
        try {
          const actualUsuario = await beginUpdateQuery(
            req.db,
            user,
            Codigo,
            "oficialesplancanje"
          );
          return res.send(actualUsuario);
        } catch (error) {
          return res.send(error);
        }
      case "Scoring":
        try {
          const actualUsuario = await beginUpdateQuery(
            req.db,
            user,
            Codigo,
            "oficialesscoring"
          );
          return res.send(actualUsuario);
        } catch (error) {
          return res.send(error);
        }
      case "Mora":
        try {
          const actualUsuario = await beginUpdateQuery(
            req.db,
            user,
            Codigo,
            "oficialesmora"
          );
          return res.send(actualUsuario);
        } catch (error) {
          return res.send(error);
        }
      case "Subite":
        try {
          const actualUsuario = await beginUpdateQuery(
            req.db,
            user,
            Codigo,
            "subite_oficiales"
          );
          return res.send(actualUsuario);
        } catch (error) {
          return res.send(error);
        }
      case "Compra":
        try {
          const actualUsuario = await beginUpdateQuery(
            req.db,
            user,
            Codigo,
            "comprar_oficiales"
          );
          return res.send(actualUsuario);
        } catch (error) {
          return res.send(error);
        }

      case "Carga":
        try {
          const actualUsuario = await beginUpdateQuery(
            req.db,
            user,
            Codigo,
            "oficialescarga"
          );
          return res.send(actualUsuario);
        } catch (error) {
          return res.send(error);
        }
      case "Patentamiento":
        try {
          const actualUsuario = await beginUpdateQuery(
            req.db,
            user,
            Codigo,
            "oficialespatentamiento"
          );
          return res.send(actualUsuario);
        } catch (error) {
          return res.send(error);
        }
      case "Asignacion":
        try {
          const actualUsuario = await beginUpdateQuery(
            req.db,
            user,
            Codigo,
            "oficialesasignacion"
          );
          return res.send(actualUsuario);
        } catch (error) {
          return res.send(error);
        }

      default:
        return res.send({
          status: false,
          message: "Categoria inexistente o no seleccionada",
        });
    }
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};
