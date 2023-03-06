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
    cantidadOficiales.push({
      Marca: cantidadOficiales[0].Marca,
      NomOficial: ".TODOS LOS OFICIALES",
      CodOficial: 999999,
      Cantidad: 0,
      Pedidos: 0,
      PedidosDelMes: 0,
    });

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
          result[i].CodOficial === array[j].CodOficial &&
          array[j].Categoria === "PEAC"
        ) {
          array[j][result[i].Mes + "_" + result[i].Anio] = result
            .filter(
              (e) =>
                e.CodOficial === result[i].CodOficial && e.Mes === result[i].Mes
            )
            .reduce((accumulator, value) => {
              return accumulator + value.PedidosDelMes;
            }, 0);
        }
      }
    }
    let vueltas = 1;
    let posArray = 0;
    while (vueltas <= 10) {
      let categorias = {
        1: "GS",
        2: "GL",
        3: "GE",
        4: "PS",
        5: "PL",
        6: "PE",
        7: "PORS",
        8: "PORL",
        9: "PORE",
        10: "PEAC",
      };
      let meses = {
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
      };

      if (Object.values(categorias)[posArray] === "PORS") {
        for (let i = 5; i <= 16; i++) {
          meses[i] = Math.round(
            (array
              .filter((e) => e.Categoria === "PS")
              .filter((e) => {
                return e[Object.keys(e)[i]];
              })
              .reduce((accumulator, value) => {
                return accumulator + value[Object.keys(value)[i]];
              }, 0) /
              array
                .filter((e) => e.Categoria === "GS")
                .filter((e) => {
                  return e[Object.keys(e)[i]];
                })
                .reduce((accumulator, value) => {
                  return accumulator + value[Object.keys(value)[i]];
                }, 0)) *
              100
          );
        }
      } else if (Object.values(categorias)[posArray] === "PORL") {
        for (let i = 5; i <= 16; i++) {
          meses[i] = Math.round(
            (array
              .filter((e) => e.Categoria === "PL")
              .filter((e) => {
                return e[Object.keys(e)[i]];
              })
              .reduce((accumulator, value) => {
                return accumulator + value[Object.keys(value)[i]];
              }, 0) /
              array
                .filter((e) => e.Categoria === "GL")
                .filter((e) => {
                  return e[Object.keys(e)[i]];
                })
                .reduce((accumulator, value) => {
                  return accumulator + value[Object.keys(value)[i]];
                }, 0)) *
              100
          );
        }
      } else if (Object.values(categorias)[posArray] === "PORE") {
        for (let i = 5; i <= 16; i++) {
          meses[i] = Math.round(
            (array
              .filter((e) => e.Categoria === "PE")
              .filter((e) => {
                return e[Object.keys(e)[i]];
              })
              .reduce((accumulator, value) => {
                return accumulator + value[Object.keys(value)[i]];
              }, 0) /
              array
                .filter((e) => e.Categoria === "GE")
                .filter((e) => {
                  return e[Object.keys(e)[i]];
                })
                .reduce((accumulator, value) => {
                  return accumulator + value[Object.keys(value)[i]];
                }, 0)) *
              100
          );
        }
      } else {
        for (let i = 5; i <= 16; i++) {
          meses[i] = array
            .filter((e) => e.Categoria === Object.values(categorias)[posArray])
            .filter((e) => {
              return e[Object.keys(e)[i]];
            })
            .reduce((accumulator, value) => {
              return accumulator + value[Object.keys(value)[i]];
            }, 0);
        }
      }

      let mesAnio = Object.keys(
        array[0]
      ); /* random agarro el primer registro del array solo para sacarle el key de los meses */

      for (let i = 1; i < Object.keys(meses).length + 1; i++) {
        array[array.length - (10 - posArray)][mesAnio[4 + i]] = meses[4 + i];
      }
      vueltas++;
      posArray++;
    }
    /* FILTRO DE OFICIALES CON DATA VACÍA */
    let oficialesCodigos = [
      /* TODOS LOS CODIGOS DE LOS OFICIALES EN EL ARRAY HASTA EL MOMENTO */
      ...new Set(
        array.map((e) => {
          return e.CodOficial;
        })
      ),
    ];

    for (let i = 0; i < oficialesCodigos.length; i++) {
      let value;
      value = array
        .filter((e) => e.CodOficial === oficialesCodigos[i])
        .map((e) => {
          return Object.values(e).slice(5, 16);
        })
        .map((e) =>
          e.reduce((accumulator, value) => {
            return accumulator + value;
          }, 0)
        )
        .reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
      if (value === 0) {
        console.log("pasó", value, oficialesCodigos[i]);

        array = array.filter((e) => e.CodOficial !== oficialesCodigos[i]);
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
