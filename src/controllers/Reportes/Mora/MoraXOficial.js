import { QueryTypes } from "sequelize";
import { returnErrorMessage } from "../../../helpers/errors/returnErrorMessage";
require("dotenv").config();

export const getMoraXOficial = async (req, res) => {
  const { mes, anio, restaCuotas, oficial, SC } = req.body;
  let array = [];
  let cantidadOficiales;
  let resultDetalle;
  const dbGiama = req.db;
  if (!mes || !anio) {
    return res.send({ status: false, message: "Faltan datos" });
  }

  try {
    const result = await dbGiama.query("CALL net_getmoraxoficial(?,?,?,?)", {
      replacements: [
        mes,
        anio,
        restaCuotas ? restaCuotas : 0,
        oficial ? oficial : null,
      ],
    });
    cantidadOficiales = result.filter(
      (tag, index, array) =>
        array.findIndex((t) => t.Oficial == tag.Oficial) == index
    );
    for (let i = 0; i < cantidadOficiales.length; i++) {
      array.push({
        Oficial: cantidadOficiales[i].Oficial,
        Mes: mes,
        Anio: anio,
        V2: 0,
        M2: 0,
        PER2: "0%",
        V3: 0,
        M3: 0,
        PER3: "0%",
        V4: 0,
        M4: 0,
        PER4: "0%",
        V5: 0,
        M5: 0,
        PER5: "0%",
        V6: 0,
        M6: 0,
        PER6: "0%",
        V7: 0,
        M7: 0,
        PER7: "0%",
        V8: 0,
        M8: 0,
        PER8: "0%",
        V9: 0,
        M9: 0,
        PER9: "0%",
        V10: 0,
        M10: 0,
        PER10: "0%",
        V11: 0,
        M11: 0,
        PER11: "0%",
        V12: 0,
        M12: 0,
        PER12: "0%",
      });
    }

    let capaV;
    let capaM;
    let capaPER;
    for (let j = 0; j < result.length; j++) {
      for (let x = 0; x < array.length; x++) {
        if (result[j].Oficial === array[x].Oficial) {
          capaV = `V${result[j].Capa}`;
          capaM = `M${result[j].Capa}`;
          capaPER = `PER${result[j].Capa}`;
          array[x][capaV] = result[j].V;
          array[x][capaM] = result[j].M;
          array[x][capaPER] =
            Math.round((result[j].M / result[j].V) * 100).toString() + "%";
        }
      }
    }

    resultDetalle = await dbGiama.query(
      "CALL net_getmoraxoficial_detalle(?,?,?,?)",
      {
        replacements: [
          mes,
          anio,
          restaCuotas ? restaCuotas : 0,
          oficial ? oficial : null,
        ],
      }
    );

    return res.send({ resumen: array, detalle: resultDetalle });
  } catch {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};
