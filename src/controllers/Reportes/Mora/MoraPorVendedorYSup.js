import { QueryTypes } from "sequelize";
import { returnErrorMessage } from "../../../helpers/errors/returnErrorMessage";
require("dotenv").config();

export const getOficialAdj = async (req, res) => {
  try {
    const oficialAdjudicaciones = await selectQuery(
      req.db,
      "SELECT * FROM oficialesadjudicacion"
    );
    return res.send(oficialAdjudicaciones);
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const getMoraXVendedor = async (req, res) => {
  const { mes, anio, restaCuotas, oficial, SC } = req.body;
  let array = [];
  let cantidadVendedores;
  let resultDetalle;
  const dbGiama = req.db;
  if (!mes || !anio) {
    return res.send({ status: false, message: "Faltan datos" });
  }

  try {
    const result = await dbGiama.query("CALL net_getmoraxvendedor(?,?,?,?)", {
      replacements: [
        mes,
        anio,
        restaCuotas ? restaCuotas : 0,
        oficial ? oficial : null,
      ],
    });
    /* cuento la cantidad de vendedores */

    cantidadVendedores = result.filter(
      (tag, index, array) =>
        array.findIndex(
          (t) => t.Oficial == tag.Oficial && t.SucCodigo == tag.SucCodigo
        ) == index
    );

    /* por cada vendedor pusheo un objeto de la tabla al array final */
    for (let i = 0; i < cantidadVendedores.length; i++) {
      array.push({
        Vendedor: cantidadVendedores[i].Oficial,
        FechaBaja: cantidadVendedores[i].FechaBaja,
        Supervisor: cantidadVendedores[i].SucNombre,
        SucCodigo: cantidadVendedores[i].SucCodigo,
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
    /*recorremos el resultado de la llamada y vamos llenando los campos del array que creamos */
    let capaV;
    let capaM;
    let capaPER;
    for (let j = 0; j < result.length; j++) {
      for (let x = 0; x < array.length; x++) {
        if (
          result[j].Oficial === array[x].Vendedor &&
          result[j].SucCodigo === array[x].SucCodigo
        ) {
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

    if (SC === 1) {
      resultDetalle = await dbGiama.query(
        "CALL net_getmoraxoficial_detalle_SinCruce(?,?,?,?)",
        {
          replacements: [
            mes,
            anio,
            restaCuotas ? restaCuotas : 0,
            oficial ? oficial : null,
          ],
        }
      );
    } else {
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
    }
    return res.send({ resumen: array, detalle: resultDetalle });
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const getMoraXSupervisor = async (req, res) => {
  const { mes, anio, restaCuotas, oficial, SC } = req.body;
  let array = [];
  let cantidadSupervisores;
  let resultDetalle;
  let result;
  const dbGiama = req.db;

  if (!mes || !anio) {
    return res.send({ status: false, message: "Faltan datos" });
  }

  try {
    if (SC === 1) {
      result = await dbGiama.query(
        "CALL net_getmoraxvendedor_SinCruce(?,?,?,?)",
        {
          replacements: [
            mes,
            anio,
            restaCuotas ? restaCuotas : 0,
            oficial ? oficial : null,
          ],
        }
      );
    } else {
      result = await dbGiama.query("CALL net_getmoraxvendedor(?,?,?,?)", {
        replacements: [
          mes,
          anio,
          restaCuotas ? restaCuotas : 0,
          oficial ? oficial : null,
        ],
      });
    }
    /* cuento la cantidad de vendedores */

    cantidadSupervisores = result.filter(
      (tag, index, array) =>
        array.findIndex((t) => t.SucCodigo == tag.SucCodigo) == index
    );

    /* por cada vendedor pusheo un objeto de la tabla al array final */
    for (let i = 0; i < cantidadSupervisores.length; i++) {
      array.push({
        Supervisor: cantidadSupervisores[i].SucNombre,
        SucCodigo: cantidadSupervisores[i].SucCodigo,
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
    /*recorremos el resultado de la llamada y vamos llenando los campos del array que creamos */
    let capaV;
    let capaM;
    let capaPER;
    let resultV;
    let resultM;
    for (let x = 0; x < array.length; x++) {
      for (let i = 2; i <= 12; i++) {
        capaV = `V${i}`;
        capaM = `M${i}`;
        capaPER = `PER${i}`;
        resultV = result
          .filter((e) => e.SucCodigo === array[x].SucCodigo && e.Capa === i)
          .reduce((acc, value) => {
            return acc + (value.V ? value.V : 0);
          }, 0);
        resultM = result
          .filter((e) => e.SucCodigo === array[x].SucCodigo && e.Capa === i)
          .reduce((acc, value) => {
            return acc + (value.M ? parseInt(value.M) : 0);
          }, 0);

        array[x][capaV] = resultV;
        array[x][capaM] = resultM;
        array[x][capaPER] =
          Math.round(
            (resultM / (resultV === 0 ? 1 : resultV)) * 100
          ).toString() + "%";
      }
    }

    if (SC === 1) {
      resultDetalle = await dbGiama.query(
        "CALL net_getmoraxoficial_detalle_SinCruce(?,?,?,?)",
        {
          replacements: [
            mes,
            anio,
            restaCuotas ? restaCuotas : 0,
            oficial ? oficial : null,
          ],
        }
      );
    } else {
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
    }

    return res.send({ resumen: array, detalle: resultDetalle });
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};
