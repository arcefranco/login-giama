import { returnErrorMessage } from "../../helpers/errors/returnErrorMessage";
import { selectQuery } from "../queries/selectQuery";
export const getEfectividadAdj = async (req, res) => {
  const { codigoMarca, mes, anio, oficial } = req.body;
  const dbGiama = req.db;
  let cantidadOficiales = [];
  let array = [];
  let result;
  let resultadoFinal =
    []; /* aca se tiene que alojar el array COMPLETO al final con todas las DBS seleccionadas */
  if (!codigoMarca || !mes || !anio)
    return res.send({ status: false, message: "Faltan campos" });

  try {
    for (let x = 0; x <= req.db.length - 1; x++) {
      result = [];
      array = [];
      result = await req.db[x].db.query(
        "CALL net_getadjudicaciones_2(?, ?, ?, ?)",
        {
          replacements: [
            req.db[x].codigoMarca,
            mes,
            anio,
            oficial ? oficial : 0,
          ],
        }
      );
      if (oficial) {
        result = result.filter((e) => {
          return e.CodOficial === oficial;
        });
      }
      /** cuento la cantidad de oficiales */
      cantidadOficiales = result.filter(
        (tag, index, array) =>
          array.findIndex((t) => t.NomOficial == tag.NomOficial) == index
      );
      if (!oficial) {
        cantidadOficiales.push({
          Marca: cantidadOficiales[0].Marca,
          NomOficial: ".TODOS LOS OFICIALES",
          Empresa: req.db[x].name,
          CodOficial: 999999,
          Cantidad: 0,
          Pedidos: 0,
          PedidosDelMes: 0,
        });
      }

      for (let i = 0; i < cantidadOficiales.length; i++) {
        /* lleno el array con las categorias * la cantidad de oficiales */
        array.push({
          Categoria: "GS",
          Tipo: "G",
          NombreCategoria: "Ganadas por Sorteo del Acto",
          CodOficial: cantidadOficiales[i].CodOficial,
          NomOficial: cantidadOficiales[i].NomOficial,
          Empresa: req.db[x].name,
        });
        array.push({
          Categoria: "GL",
          Tipo: "G",
          NombreCategoria: "Ganadas por Licitación del Acto",
          CodOficial: cantidadOficiales[i].CodOficial,
          NomOficial: cantidadOficiales[i].NomOficial,
          Empresa: req.db[x].name,
        });
        array.push({
          Categoria: "GE",
          Tipo: "G",
          NombreCategoria: "Ganadas por Entrega del Acto",
          CodOficial: cantidadOficiales[i].CodOficial,
          NomOficial: cantidadOficiales[i].NomOficial,
          Empresa: req.db[x].name,
        });
        array.push({
          Categoria: "GT",
          Tipo: "G",
          NombreCategoria: "TOTALES",
          CodOficial: cantidadOficiales[i].CodOficial,
          NomOficial: cantidadOficiales[i].NomOficial,
          Empresa: req.db[x].name,
        });
        array.push({
          Categoria: "PS",
          Tipo: "P",
          NombreCategoria: "Pedidos Aceptados por Sorteo de Acto",
          CodOficial: cantidadOficiales[i].CodOficial,
          NomOficial: cantidadOficiales[i].NomOficial,
          Empresa: req.db[x].name,
        });
        array.push({
          Categoria: "PL",
          Tipo: "P",
          NombreCategoria: "Pedidos Aceptados por Licitación del Acto",
          CodOficial: cantidadOficiales[i].CodOficial,
          NomOficial: cantidadOficiales[i].NomOficial,
          Empresa: req.db[x].name,
        });
        array.push({
          Categoria: "PE",
          Tipo: "P",
          NombreCategoria: "Pedidos Aceptados por Entrega Programada",
          CodOficial: cantidadOficiales[i].CodOficial,
          NomOficial: cantidadOficiales[i].NomOficial,
          Empresa: req.db[x].name,
        });
        array.push({
          Categoria: "PT",
          Tipo: "P",
          NombreCategoria: "TOTALES",
          CodOficial: cantidadOficiales[i].CodOficial,
          NomOficial: cantidadOficiales[i].NomOficial,
          Empresa: req.db[x].name,
        });
        array.push({
          Categoria: "PORS",
          Tipo: "POR",
          NombreCategoria: "Porcentaje Ganadas por Sorteo del Acto",
          CodOficial: cantidadOficiales[i].CodOficial,
          NomOficial: cantidadOficiales[i].NomOficial,
          Empresa: req.db[x].name,
        });
        array.push({
          Categoria: "PORL",
          Tipo: "POR",
          NombreCategoria: "Porcentaje Ganadas por Licitacion del Acto",
          CodOficial: cantidadOficiales[i].CodOficial,
          NomOficial: cantidadOficiales[i].NomOficial,
          Empresa: req.db[x].name,
        });
        array.push({
          Categoria: "PORE",
          Tipo: "POR",
          NombreCategoria: "Porcentaje Ganadas por Entrega Progamada",
          CodOficial: cantidadOficiales[i].CodOficial,
          NomOficial: cantidadOficiales[i].NomOficial,
          Empresa: req.db[x].name,
        });
        array.push({
          Categoria: "PORT",
          Tipo: "POR",
          NombreCategoria: "TOTALES",
          CodOficial: cantidadOficiales[i].CodOficial,
          NomOficial: cantidadOficiales[i].NomOficial,
          Empresa: req.db[x].name,
        });
        array.push({
          Categoria: "PEAC",
          Tipo: "Z",
          NombreCategoria: "Pedidos Aceptados del Mes",
          CodOficial: cantidadOficiales[i].CodOficial,
          NomOficial: cantidadOficiales[i].NomOficial,
          Empresa: req.db[x].name,
        });
      }

      for (let i = 0; i < result.length; i++) {
        /** a cada categoria le agrego los meses correspondientes */
        for (let j = 0; j < array.length; j++) {
          if (
            result[i].Tipo === "S" &&
            result[i].NomOficial === array[j].NomOficial &&
            req.db[x].name === array[j].Empresa &&
            array[j].Categoria === "GS"
          ) {
            array[j][result[i].Mes + "_" + result[i].Anio] =
              result[i].Cantidad && !isNaN(result[i].Cantidad)
                ? result[i].Cantidad
                : 0;
          }
          if (
            result[i].Tipo === "L" &&
            result[i].NomOficial === array[j].NomOficial &&
            req.db[x].name === array[j].Empresa &&
            array[j].Categoria === "GL"
          ) {
            array[j][result[i].Mes + "_" + result[i].Anio] =
              result[i].Cantidad && !isNaN(result[i].Cantidad)
                ? result[i].Cantidad
                : 0;
          }
          if (
            result[i].Tipo === "E" &&
            result[i].NomOficial === array[j].NomOficial &&
            req.db[x].name === array[j].Empresa &&
            array[j].Categoria === "GE"
          ) {
            array[j][result[i].Mes + "_" + result[i].Anio] =
              result[i].Cantidad && !isNaN(result[i].Cantidad)
                ? result[i].Cantidad
                : 0;
          }
          if (
            result[i].NomOficial === array[j].NomOficial &&
            req.db[x].name === array[j].Empresa &&
            array[j].Categoria === "GT"
          ) {
            array[j][result[i].Mes + "_" + result[i].Anio] = result
              .filter((e) => {
                return (
                  e.Mes === result[i].Mes &&
                  e.NomOficial === result[i].NomOficial
                );
              })
              .reduce((accumulator, value) => {
                return accumulator + value.Cantidad;
              }, 0);
          }
          if (
            result[i].Tipo === "S" &&
            result[i].NomOficial === array[j].NomOficial &&
            req.db[x].name === array[j].Empresa &&
            array[j].Categoria === "PS"
          ) {
            array[j][result[i].Mes + "_" + result[i].Anio] =
              result[i].Pedidos && !isNaN(result[i].Pedidos)
                ? result[i].Pedidos
                : 0;
          }
          if (
            result[i].Tipo === "L" &&
            result[i].NomOficial === array[j].NomOficial &&
            req.db[x].name === array[j].Empresa &&
            array[j].Categoria === "PL"
          ) {
            array[j][result[i].Mes + "_" + result[i].Anio] =
              result[i].Pedidos && !isNaN(result[i].Pedidos)
                ? result[i].Pedidos
                : 0;
          }
          if (
            result[i].Tipo === "E" &&
            result[i].NomOficial === array[j].NomOficial &&
            req.db[x].name === array[j].Empresa &&
            array[j].Categoria === "PE"
          ) {
            array[j][result[i].Mes + "_" + result[i].Anio] =
              result[i].Pedidos && !isNaN(result[i].Pedidos)
                ? result[i].Pedidos
                : 0;
          }
          if (
            result[i].NomOficial === array[j].NomOficial &&
            req.db[x].name === array[j].Empresa &&
            array[j].Categoria === "PT"
          ) {
            array[j][result[i].Mes + "_" + result[i].Anio] = result
              .filter((e) => {
                return (
                  e.Mes === result[i].Mes &&
                  e.NomOficial === result[i].NomOficial
                );
              })
              .reduce((accumulator, value) => {
                return accumulator + value.Pedidos;
              }, 0);
          }
          if (
            result[i].Tipo === "S" &&
            result[i].NomOficial === array[j].NomOficial &&
            req.db[x].name === array[j].Empresa &&
            array[j].Categoria === "PORS"
          ) {
            array[j][result[i].Mes + "_" + result[i].Anio] = Math.round(
              ((result[i].Pedidos !== null ? result[i].Pedidos : 0) /
                (result[i].Cantidad !== null && result[i].Cantidad !== 0
                  ? result[i].Cantidad
                  : 1)) *
                140
            );
          }
          if (
            result[i].Tipo === "L" &&
            result[i].NomOficial === array[j].NomOficial &&
            req.db[x].name === array[j].Empresa &&
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
            result[i].NomOficial === array[j].NomOficial &&
            req.db[x].name === array[j].Empresa &&
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
            result[i].NomOficial === array[j].NomOficial &&
            req.db[x].name === array[j].Empresa &&
            array[j].Categoria === "PORT"
          ) {
            let pedidos = result
              .filter((e) => {
                return (
                  e.Mes === result[i].Mes &&
                  e.NomOficial === result[i].NomOficial
                );
              })
              .reduce((accumulator, value) => {
                return accumulator + value.Pedidos;
              }, 0);
            let cantidad = result
              .filter((e) => {
                return (
                  e.Mes === result[i].Mes &&
                  e.NomOficial === result[i].NomOficial
                );
              })
              .reduce((accumulator, value) => {
                return accumulator + value.Cantidad;
              }, 0);

            array[j][result[i].Mes + "_" + result[i].Anio] = Math.round(
              (pedidos / cantidad) * 100
            );
          }
          if (
            result[i].NomOficial === array[j].NomOficial &&
            req.db[x].name === array[j].Empresa &&
            array[j].Categoria === "PEAC"
          ) {
            array[j][result[i].Mes + "_" + result[i].Anio] = result
              .filter(
                (e) =>
                  e.NomOficial === result[i].NomOficial &&
                  e.Mes === result[i].Mes
              )
              .reduce((accumulator, value) => {
                return accumulator + value.PedidosDelMes;
              }, 0);
          }
        }
      }
      let vueltas = 1;
      let posArray = 0;
      while (vueltas <= 13) {
        let categorias = {
          1: "GS",
          2: "GL",
          3: "GE",
          4: "GT",
          5: "PS",
          6: "PL",
          7: "PE",
          8: "PT",
          9: "PORS",
          10: "PORL",
          11: "PORE",
          12: "PORT",
          13: "PEAC",
        };
        let meses = {
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
          17: 0,
        };

        if (Object.values(categorias)[posArray] === "PORS") {
          for (let i = 6; i <= 18; i++) {
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
          for (let i = 6; i <= 18; i++) {
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
        } else if (Object.values(categorias)[posArray] === "PORT") {
          for (let i = 6; i <= 18; i++) {
            meses[i] = Math.round(
              (array
                .filter((e) => e.Categoria === "PT")
                .filter((e) => {
                  return e[Object.keys(e)[i]];
                })
                .reduce((accumulator, value) => {
                  return accumulator + value[Object.keys(value)[i]];
                }, 0) /
                array
                  .filter((e) => e.Categoria === "GT")
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
          for (let i = 6; i <= 18; i++) {
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
          for (let i = 6; i <= 18; i++) {
            meses[i] = array
              .filter(
                (e) => e.Categoria === Object.values(categorias)[posArray]
              )
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
          array[array.length - (13 - posArray)][mesAnio[5 + i]] =
            meses[
              5 + i
            ]; /* la posicion es a ultima porque TODOS LOS OFICIALES se inserta al final */
        }
        vueltas++;
        posArray++;
      }
      /* FILTRO DE OFICIALES CON DATA VACÍA */
      let oficialesNombres = [
        /* TODOS LOS NOMBRES DE LOS OFICIALES EN EL ARRAY HASTA EL MOMENTO */
        ...new Set(
          array.map((e) => {
            return e.NomOficial;
          })
        ),
      ];
      for (let i = 0; i < oficialesNombres.length; i++) {
        let value;
        value = array
          .filter(
            (e) =>
              e.NomOficial === oficialesNombres[i] &&
              e.Categoria !== "PORT" &&
              e.Categoria !== "PORS" &&
              e.Categoria !== "PORE" &&
              e.Categoria !== "PORL"
          )
          .map((e) => {
            return Object.values(e).slice(6, 18);
          })
          .map((e) => {
            return e.reduce((accumulator, value) => {
              return accumulator + value;
            }, 0);
          })
          .reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);

        if (value === 0) {
          array = array.filter((e) => e.NomOficial !== oficialesNombres[i]);
        }
      }
      resultadoFinal = array.concat(resultadoFinal);
    } /* aca termina el FOR */
    return res.send(resultadoFinal);
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

export const getDetalleEfectividad = async (req, res) => {
  const { marca, tipo, mes, anio, oficial, periodoCompleto } = req.body;
  const dbGiama = req.db;
  try {
    const detallesEfectividad = await dbGiama.query(
      "CALL net_getadjudicacionesdetalle_v2(?, ?, ?, ?, ?, ?)",
      {
        replacements: [
          parseInt(marca),
          parseInt(tipo),
          parseInt(mes),
          parseInt(anio),
          parseInt(oficial),
          parseInt(periodoCompleto),
        ],
      }
    );

    return res.send(detallesEfectividad);
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};
