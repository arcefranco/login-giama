import { returnErrorMessage } from "../../helpers/errors/returnErrorMessage";
import { selectQuery } from "../queries/selectQuery";
export const getEfectividadAdj = async (req, res) => {
  const { codigoMarca, mes, anio, oficial } = req.body;
  const dbGiama = req.db;
  let cantidadOficiales = [];
  let array = [];

  if (!codigoMarca || !mes || !anio)
    return res.send({ status: false, message: "Faltan campos" });

  try {
    const result = await dbGiama.query(
      "CALL net_getadjudicaciones_2(?, ?, ?, ?)",
      {
        replacements: [codigoMarca, mes, anio, oficial ? oficial : 0],
      }
    );
    /** cuento la cantidad de oficiales */
    cantidadOficiales = result.filter(
      (tag, index, array) =>
        array.findIndex((t) => t.CodOficial == tag.CodOficial) == index
    );

    for (let i = 0; i < cantidadOficiales.length; i++) {
      /* lleno el array con las categorias * la cantidad de oficiales */
      array.push({
        Categoria: "GS",
        Tipo: "G",
        NombreCategoria: "Ganadas por Sorteo del Acto",
        CodOficial: cantidadOficiales[i].CodOficial,
        NombreOficial: cantidadOficiales[i].NomOficial,
      });
      array.push({
        Categoria: "GL",
        Tipo: "G",
        NombreCategoria: "Ganadas por Licitación del Acto",
        CodOficial: cantidadOficiales[i].CodOficial,
        NombreOficial: cantidadOficiales[i].NomOficial,
      });
      array.push({
        Categoria: "GE",
        Tipo: "G",
        NombreCategoria: "Ganadas por Entrega del Acto",
        CodOficial: cantidadOficiales[i].CodOficial,
        NombreOficial: cantidadOficiales[i].NomOficial,
      });
      array.push({
        Categoria: "PS",
        Tipo: "P",
        NombreCategoria: "Pedidos Aceptados por Sorteo de Acto",
        CodOficial: cantidadOficiales[i].CodOficial,
        NombreOficial: cantidadOficiales[i].NomOficial,
      });
      array.push({
        Categoria: "PL",
        Tipo: "P",
        NombreCategoria: "Pedidos Aceptados por Licitación del Acto",
        CodOficial: cantidadOficiales[i].CodOficial,
        NombreOficial: cantidadOficiales[i].NomOficial,
      });
      array.push({
        Categoria: "PE",
        Tipo: "P",
        NombreCategoria: "Pedidos Aceptados por Entrega Programada",
        CodOficial: cantidadOficiales[i].CodOficial,
        NombreOficial: cantidadOficiales[i].NomOficial,
      });
      array.push({
        Categoria: "PORS",
        Tipo: "POR",
        NombreCategoria: "Porcentaje Ganadas por Sorteo del Acto",
        CodOficial: cantidadOficiales[i].CodOficial,
        NombreOficial: cantidadOficiales[i].NomOficial,
      });
      array.push({
        Categoria: "PORL",
        Tipo: "POR",
        NombreCategoria: "Porcentaje Ganadas por Licitacion del Acto",
        CodOficial: cantidadOficiales[i].CodOficial,
        NombreOficial: cantidadOficiales[i].NomOficial,
      });
      array.push({
        Categoria: "PORE",
        Tipo: "POR",
        NombreCategoria: "Porcentaje Ganadas por Entrega Progamada",
        CodOficial: cantidadOficiales[i].CodOficial,
        NombreOficial: cantidadOficiales[i].NomOficial,
      });

      array.push({
        Categoria: "PEAC",
        Tipo: "",
        NombreCategoria: "Pedidos Aceptados del Mes",
        CodOficial: cantidadOficiales[i].CodOficial,
        NombreOficial: cantidadOficiales[i].NomOficial,
      });
    }

    for (let i = 0; i < result.length; i++) {
      /** a cada categoria le agrego los meses correspondientes */
      for (let j = 0; j < array.length; j++) {
        if (
          result[i].Tipo === "S" &&
          result[i].CodOficial === array[j].CodOficial &&
          array[j].Categoria === "GS"
        ) {
          array[j][result[i].Mes + "_" + result[i].Anio] =
            result[i].Cantidad && !isNaN(result[i].Cantidad)
              ? result[i].Cantidad
              : 0;
        }
        if (
          result[i].Tipo === "L" &&
          result[i].CodOficial === array[j].CodOficial &&
          array[j].Categoria === "GL"
        ) {
          array[j][result[i].Mes + "_" + result[i].Anio] =
            result[i].Cantidad && !isNaN(result[i].Cantidad)
              ? result[i].Cantidad
              : 0;
        }
        if (
          result[i].Tipo === "E" &&
          result[i].CodOficial === array[j].CodOficial &&
          array[j].Categoria === "GE"
        ) {
          array[j][result[i].Mes + "_" + result[i].Anio] =
            result[i].Cantidad && !isNaN(result[i].Cantidad)
              ? result[i].Cantidad
              : 0;
        }
        if (
          result[i].Tipo === "S" &&
          result[i].CodOficial === array[j].CodOficial &&
          array[j].Categoria === "PS"
        ) {
          array[j][result[i].Mes + "_" + result[i].Anio] =
            result[i].Pedidos && !isNaN(result[i].Pedidos)
              ? result[i].Pedidos
              : 0;
        }
        if (
          result[i].Tipo === "L" &&
          result[i].CodOficial === array[j].CodOficial &&
          array[j].Categoria === "PL"
        ) {
          array[j][result[i].Mes + "_" + result[i].Anio] =
            result[i].Pedidos && !isNaN(result[i].Pedidos)
              ? result[i].Pedidos
              : 0;
        }
        if (
          result[i].Tipo === "E" &&
          result[i].CodOficial === array[j].CodOficial &&
          array[j].Categoria === "PE"
        ) {
          array[j][result[i].Mes + "_" + result[i].Anio] =
            result[i].Pedidos && !isNaN(result[i].Pedidos)
              ? result[i].Pedidos
              : 0;
        }
        if (
          result[i].Tipo === "S" &&
          result[i].CodOficial === array[j].CodOficial &&
          array[j].Categoria === "PORS"
        ) {
          array[j][result[i].Mes + "_" + result[i].Anio] = Math.round(
            ((result[i].Pedidos !== null ? result[i].Pedidos : 0) /
              (result[i].Cantidad !== null && result[i].Cantidad !== 0
                ? result[i].Cantidad
                : 1)) *
              100
          );
        }
        if (
          result[i].Tipo === "L" &&
          result[i].CodOficial === array[j].CodOficial &&
          array[j].Categoria === "PORL"
        ) {
          array[j][result[i].Mes + "_" + result[i].Anio] = Math.round(
            ((result[i].Pedidos !== null ? result[i].Pedidos : 0) /
              (result[i].Cantidad !== null && result[i].Cantidad !== 0
                ? result[i].Cantidad
                : 1)) *
              100
          );
        }
        if (
          result[i].Tipo === "E" &&
          result[i].CodOficial === array[j].CodOficial &&
          array[j].Categoria === "PORE"
        ) {
          array[j][result[i].Mes + "_" + result[i].Anio] = Math.round(
            ((result[i].Pedidos !== null ? result[i].Pedidos : 0) /
              (result[i].Cantidad !== null && result[i].Cantidad !== 0
                ? result[i].Cantidad
                : 1)) *
              100
          );
        }
        if (
          /*  result[i].Tipo === "E" && */
          result[i].CodOficial === array[j].CodOficial &&
          array[j].Categoria === "PEAC"
        ) {
          array[j][result[i].Mes + "_" + result[i].Anio] =
            result[i].PedidosDelMes && !isNaN(result[i].Pedidos)
              ? result[i].PedidosDelMes
              : 0;
        }
      }
    }

    return res.send(array);
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

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
