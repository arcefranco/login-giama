import { pa7_cgConnection } from "../helpers/connections";
import { pa7_elyseesConnection } from "../helpers/connections";
import { pa7_alizzeConnection } from "../helpers/connections";
import { pa7_autConnection } from "../helpers/connections";
import { pa7_detConnection } from "../helpers/connections";
import { pa7_chConnection } from "../helpers/connections";
import { pa7_gfConnection } from "../helpers/connections";
import { pa7_gfLuxcarConnection } from "../helpers/connections";

export const testConnectionAll = (req, res, next) => {
  const { todasLasEmpresas } = req.body;
  const db = req.header("db-connection");
  /* lo vamos a diferenciar con un parametro, si el parametro viene en 0 mandamos como db la base de datos que esta en el header de la req
si viene en 1 mandamos todas las disponibles */
  if (!db) {
    return next({ status: false, message: "db not found" });
  } else if (todasLasEmpresas === 0) {
    if (db === "pa7" || db === "pa7_cg") {
      req.db = [
        { db: pa7_cgConnection, name: "Car Group S.A.", codigoMarca: 2 },
      ];
      next();
    }
    if (db === "pa7_elysees") {
      req.db = [
        { db: pa7_elyseesConnection, name: "Elysees S.A.", codigoMarca: 12 },
      ];
      next();
    }

    if (db === "pa7_aut") {
      req.db = [
        { db: pa7_autConnection, name: "Autonet S.A.", codigoMarca: 2 },
      ];
      next();
    }
    if (db === "pa7_det") {
      req.db = [
        { db: pa7_detConnection, name: "Detroit S.A.", codigoMarca: 7 },
      ];
      next();
    }

    if (db === "pa7_ch") {
      req.db = [
        { db: pa7_chConnection, name: "Autos del Plata S.A.", codigoMarca: 6 },
      ];
      next();
    }
    if (db === "pa7_gfLuxcar") {
      req.db = [
        {
          db: pa7_gfLuxcarConnection,
          name: "Gestion Financiera Luxcar S.A.",
          codigoMarca: 10,
        },
      ];
      next();
    }
    if (db === "pa7_alizze") {
      req.db = [
        { db: pa7_alizzeConnection, name: "Alizze S.A.", codigoMarca: 11 },
      ];
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
        db: pa7_elyseesConnection,
        name: "Elysees S.A.",
        codigoMarca: 12,
      },
      {
        db: pa7_autConnection,
        name: "Autonet S.A.",
        codigoMarca: 2,
      },
      {
        db: pa7_detConnection,
        name: "Detroit S.A.",
        codigoMarca: 7,
      },
      {
        db: pa7_chConnection,
        name: "Autos del Plata S.A.",
        codigoMarca: 6,
      },
      {
        db: pa7_gfLuxcarConnection,
        name: "Gestion Financiera Luxcar S.A.",
        codigoMarca: 10,
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
