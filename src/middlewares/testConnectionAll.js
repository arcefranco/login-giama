import { pa7_cgConnection } from "../helpers/connections";
import { pa7_elyseesConnection } from "../helpers/connections";
import { pa7_alizzeConnection } from "../helpers/connections";
import { pa7_autConnection } from "../helpers/connections";

export const testConnectionAll = (req, res, next) => {
  const { todasLasEmpresas } = req.body;
  const db = req.header("db-connection");
  /* lo vamos a diferenciar con un parametro, si el parametro viene en 0 mandamos como db la base de datos que esta en el header de la req
si viene en 1 mandamos todas las disponibles */
  if (!db) {
    return next({ status: false, message: "db not found" });
  } else if (todasLasEmpresas === 0) {
    if (db === "pa7" || db === "pa7_cg") {
      req.db = [{ db: pa7_cgConnection, name: "Car Group S.A." }];
      next();
    }
    if (db === "pa7_elysees") {
      req.db = [{ db: pa7_elyseesConnection, name: "Elysees S.A." }];
      next();
    }
  } else if (todasLasEmpresas === 1) {
    req.db = [
      {
        db: pa7_cgConnection,
        name: "Car Group S.A.",
        codigoMarca: 2,
      },
      {
        db: pa7_alizzeConnection,
        name: "Alizze S.A.",
        codigoMarca: 11,
      },
    ];

    next();
  }
};
