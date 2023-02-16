import { QueryTypes } from "sequelize";
import { returnErrorMessage } from "../../helpers/errors/returnErrorMessage";
import { queryGetFormasPagoAltaPre } from "../../queries";
import {
  abmPreSol,
  abmMovimientoContable,
  abmMovimientoContable2,
  abmSenia,
  addRecordObservacionPreSol,
  setObsPreSolByEmpresa,
  grabarObsByEmpresa,
  getObsTelefonos,
} from "../../utils/Operaciones/solicitudesUtils";
require("dotenv").config();
import { selectQuery } from "../queries/selectQuery";

export const getModelos = async (req, res) => {
  const dbGiama = req.db;
  try {
    const allModelos = await dbGiama.query(
      `SELECT modelos.Codigo, modelos.Activo, modelos.Nombre, modelos.Marca, modelosvalorescuotas.TipoPlan, tipoplan.Descripcion, modelosvalorescuotas.CuotaTerminal 
        FROM modelos LEFT JOIN modelosvalorescuotas ON modelosvalorescuotas.Codigo = modelos.Codigo
        LEFT JOIN tipoplan ON tipoplan.ID = modelosvalorescuotas.TipoPlan`,
      {
        type: QueryTypes.SELECT,
      }
    );

    return res.send(allModelos);
  } catch (error) {
    console.log(error);
    return res.send({ status: false, message: error });
  }
};

export const getSucursales = async (req, res) => {
  try {
    const result = await selectQuery(req.db, `SELECT * FROM sucursalreal`);
    return res.send(result);
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const getTarjetas = async (req, res) => {
  try {
    const result = await selectQuery(req.db, `SELECT * FROM tarjetas`);
    return res.send(result);
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const getVendedores = async (req, res) => {
  try {
    const result = await selectQuery(req.db, `SELECT * FROM vendedores`);
    return res.send(result);
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const getPuntosVenta = async (req, res) => {
  try {
    const result = await selectQuery(req.db, `SELECT * FROM pre_puntosventa`);
    return res.send(result);
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const getOficialCanje = async (req, res) => {
  try {
    const result = await selectQuery(
      req.db,
      `SELECT * FROM oficialesplancanje`
    );
    return res.send(result);
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const getTeamLeaders = async (req, res) => {
  try {
    const result = await selectQuery(req.db, `SELECT * FROM teamleader`);
    return res.send(result);
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const getSupervisores = async (req, res) => {
  try {
    const result = await selectQuery(req.db, `SELECT * FROM sucursales`);
    return res.send(result);
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const getIntereses = async (req, res) => {
  try {
    const result = await selectQuery(
      req.db,
      `SELECT * ,cob.Nombre, cob.CuentaContable, cob.CtaSecundaria
        FROM intereses LEFT JOIN
            net_view_getmediosdecobro AS cob ON intereses.MedioCobro = cob.Codigo
         AND intereses.Activo = 1
        ORDER BY intereses.Cantidad`
    );
    return res.send(result);
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const getFormasPago = async (req, res) => {
  try {
    const result = await selectQuery(req.db, queryGetFormasPagoAltaPre);
    return res.send(result);
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const getOrigenSuscripcion = async (req, res) => {
  try {
    const result = await selectQuery(req.db, `SELECT * FROM origensuscripcion`);
    return res.send(result);
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const verifySolicitud = async (req, res) => {
  const dbGiama = req.db;
  const { solicitud } = req.body;

  try {
    const preSol = await dbGiama.query(
      "SELECT * FROM pre_solicitudes WHERE Solicitud = ?",
      {
        replacements: [solicitud],
        type: QueryTypes.SELECT,
      }
    );
    const operacion = await dbGiama.query(
      "SELECT * FROM operaciones WHERE Solicitud = ?",
      {
        replacements: [solicitud],
        type: QueryTypes.SELECT,
      }
    );
    return res.send([...preSol, ...operacion]);
  } catch (error) {
    console.log(error);
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const verifySolicitudStatus = async (req, res) => {
  const dbGiama = req.db;
  const { solicitud, codMarca } = req.body;

  try {
    const solicitudStatus = await dbGiama.query(
      "CALL net_getsolicitudes(?, ?, ?, ?, ?, ?)",
      {
        replacements: [solicitud, solicitud, null, null, codMarca, null],
      }
    );

    if (
      solicitudStatus.length /* && Object.keys(solicitudStatus[0]).length */
    ) {
      console.log(solicitudStatus);
      return res.send(solicitudStatus[0][0]);
    } else return;
    /*  else return res.send(solicitudStatus[0]); */
  } catch (error) {
    console.log(error);
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const getModeloValorCuota = async (req, res) => {
  const dbGiama = req.db;
  const { codMarca, modelo, tipoPlan } = req.body;

  try {
    const valorCuota = await dbGiama.query("CALL net_getvalorcuota (?, ?, ?)", {
      replacements: [codMarca, modelo, tipoPlan],
    });

    return res.send(valorCuota[0]);
  } catch (error) {
    console.log(error);
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const getModeloPrecio = async (req, res) => {
  const dbGiama = req.db;
  const { codMarca, modelo, tipoPlan } = req.body;

  try {
    const precioA = await dbGiama.query(
      'CALL net_getcuotaacobrar("A", ?, ?, ?)',
      {
        replacements: [codMarca, modelo, tipoPlan],
      }
    );
    const precioB = await dbGiama.query(
      'CALL net_getcuotaacobrar("B", ?, ?, ?)',
      {
        replacements: [codMarca, modelo, tipoPlan],
      }
    );

    return res.send({ PrecioA: precioA[0], PrecioB: precioB[0] });
  } catch (error) {
    console.log(error);
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const getFechaMinimaCont = async (req, res) => {
  const dbGiama = req.db;
  const { marca } = req.body;

  try {
    const fecha = await dbGiama.query(
      `SELECT ValorSTR FROM parametros WHERE Codigo = 'FMC1' AND Marca = ?`,
      {
        replacements: [marca],
        type: QueryTypes.SELECT,
      }
    );

    return res.send(fecha[0]);
  } catch (error) {
    console.log(error);
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const verifyDoc = async (req, res) => {
  const dbGiama = req.db;
  const { documento, documentoNro } = req.body;

  try {
    const documentoStatus = await dbGiama.query(
      "CALL net_verificadniempresas2(?, ?)",
      {
        replacements: [documento, documentoNro],
      }
    );
    const suscriptorData = await dbGiama.query(
      "CALL net_getDtoSuscriptor(?, ?)",
      {
        replacements: [documento, documentoNro],
      }
    );

    return res.send({ docStatus: documentoStatus, suscriptor: suscriptorData });
  } catch (error) {
    console.log(error);
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

export const altaPre = async (req, res) => {
  const dbGiama = req.db;
  const { user } = req.usuario;
  const hoy = new Date()
    .toISOString()
    .slice(0, 10)
    .replace("T", " ")
    .split("-")
    .reverse()
    .join("/");
  const {
    Marca,
    codEmpresa,
    empresaNombre,
    Solicitud,
    FechaAlta,
    tipoplan,
    CodModelo,
    CuotaTerminal,
    TipoDocumento,
    NroDocumento,
    CUIL,
    FechaNac,
    tieneEmail,
    Apellido,
    Nombres,
    EmailParticular,
    EmailLaboral,
    Domicilio,
    Numero,
    Piso,
    Dto,
    CodPostal,
    Localidad,
    Provincia,
    TelefParticular,
    TelefCelular,
    TelefLaboral,
    TelefFamiliar,
    Ocupacion,
    CodTipoResponsable,
    ContactoAD,
    tipoPrecio,
    ImporteTotalCuota,
    nroRecibo,
    nroRecibo2,
    CodSucReal,
    CodFormaPago,
    cuentaContable,
    Cantpagos,
    Vendedor,
    FechaCheque,
    FechaEstimCancelacion,
    CodTL,
    CodSupervisor,
    CodPuntoVenta,
    importeAbonado,
    Interes,
    OficialCanje,
    CodTarjeta,
    NroTarjeta,
    origensuscripcion,
    FechaCupon,
    NroCupon,
    DebitoAutomatico,
    TieneDNI,
    TieneServicio,
    TieneAnexos,
    PromoEspecial,
    planSubite,
    Lote,
    observaciones,
  } = req.body;
  let cuentaSecundaria;
  let codigoCuentaSeña;
  let codigoCuentaSecundariaSeña;
  let codigoCuentaEfvo;
  let solicitudesDoc;
  let dtoSuscriptor;
  let numeroPreSol;
  let arrayTelefonos = [];
  let resultVerifyTelef;
  const a = 0;
  const t = await dbGiama.transaction();
  if (TelefParticular) arrayTelefonos.push(TelefParticular);
  if (TelefCelular) arrayTelefonos.push(TelefCelular);
  if (TelefFamiliar) arrayTelefonos.push(TelefFamiliar);
  if (TelefLaboral) arrayTelefonos.push(TelefLaboral);

  //VERIFICACIONES//

  try {
    const documentoStatus = await dbGiama.query(
      "CALL net_verificadniempresas2(?, ?)",
      {
        //BUSCO DENUEVO EL DNI PARA LAS OBSERVACIONES
        replacements: [TipoDocumento, NroDocumento],
      }
    );
    solicitudesDoc = documentoStatus;
  } catch (error) {
    console.log("verificaDNI", error); //A CORREGIR POR EMPRESAS
    return res.send({ status: false, message: returnErrorMessage(error) });
  }

  try {
    const suscriptorData = await dbGiama.query(
      "CALL net_getDtoSuscriptor(?, ?)",
      {
        //BUSCO DENUEVO EL DNI PARA LAS OBSERVACIONES
        replacements: [TipoDocumento, NroDocumento],
      }
    );
    dtoSuscriptor = suscriptorData[0];
  } catch (error) {
    console.log("getDtoSuscriptor", error);
    return res.send({ status: false, message: returnErrorMessage(error) });
  }

  try {
    //OBTENGO LA CUENTA SECUNDARIA DE LA FORMA DE PAGO(USANDO EL CODIGO CUENTA CONTABLE)
    if (cuentaContable) {
      await dbGiama
        .query("SELECT * FROM c_plancuentas WHERE Codigo = ?", {
          replacements: [cuentaContable],
        })
        .then((data) => {
          cuentaSecundaria = data[0][0].CuentaSecundaria;
        }); //A CORREGIR POR EMPRESAS
    }
  } catch (error) {
    console.log("cPlanCuentas", error);
    return res.send({ status: false, message: returnErrorMessage(error) });
  }

  try {
    //DESPUES EL CODIGO DE CUENTA SEÑA
    if (cuentaContable) {
      await dbGiama
        .query(
          `SELECT * FROM c_plancuentas WHERE codigoespecial IN('SEÑA','EFVO')`,
          {
            type: QueryTypes.SELECT,
          }
        )
        .then((data) => {
          codigoCuentaEfvo = data[0].Codigo;
          codigoCuentaSeña = data[1].Codigo;
          codigoCuentaSecundariaSeña = data[1].CuentaSecundaria;
        });
    }
  } catch (error) {
    console.log("cPlanCuentas seña", error);
  }

  try {
    const result = await getObsTelefonos({
      dbGiama: dbGiama,
      arrayTelefonos: arrayTelefonos,
    });
    resultVerifyTelef = result;
  } catch (error) {
    console.log("error con verificacion telefonos: ", error);
  }

  try {
    await dbGiama
      .query(`SET @a = 0; CALL net_getproxinumeropresol(@a); SELECT @a;`, {
        //OBTENGO NUMERO DE PRESOLICITUD
        multipleStatements: true,
        type: QueryTypes.SELECT,
      })
      .then(async (data) => {
        numeroPreSol = data[2][0]["@a"];
      });
  } catch (error) {
    console.log("proxiNumeroPreSol", error);
    return res.send({ status: false, messsage: returnErrorMessage(error) });
  }

  try {
    await abmPreSol({
      dbGiama: dbGiama,
      t: t,
      accion: "A",
      codigoMarca: Marca,
      numeroPreSol: numeroPreSol,
      FechaAlta: FechaAlta,
      Solicitud: Solicitud,
      Apellido: Apellido,
      Nombre: Nombres,
      Calle: Domicilio,
      Localidad: Localidad,
      TelefParticular: TelefParticular,
      Vendedor: Vendedor,
      puntoVenta: CodPuntoVenta,
      Modelo: CodModelo,
      ValorCuotaTerm: CuotaTerminal,
      TotalCuota: ImporteTotalCuota,
      FechaCancelacionSaldo: FechaEstimCancelacion,
      DNI: TieneDNI,
      Mail: TieneServicio,
      Anexos: TieneAnexos,
      Supervisor: CodSupervisor,
      OficialCanje: OficialCanje,
      origenSuscripcion: origensuscripcion,
      debAutom: DebitoAutomatico,
      Documento: TipoDocumento,
      DocumentoNro: NroDocumento,
      Precio: tipoPrecio,
      TipoPlan: tipoplan,
      TelefCelular: TelefCelular,
      TelefLaboral: TelefLaboral,
      promoEspecial: PromoEspecial,
      Sucursal: CodSucReal,
      nroRecibo: nroRecibo,
      nroRecibo2: nroRecibo2,
      Numero: Numero,
      Piso: Piso,
      Dto: Dto,
      CodPostal: CodPostal,
      Provincia: Provincia,
      TelefFamiliar: TelefFamiliar,
      EmailParticular: EmailParticular,
      EmailLaboral: EmailLaboral,
      Nacimiento: FechaNac,
      Ocupacion: Ocupacion,
      CondIva: CodTipoResponsable,
      TeamLeader: CodTL,
      user: user,
      CUIL: CUIL,
    });
  } catch (error) {
    console.log("abmPreSol", error);
    t.rollback();
    return res.send({ status: false, message: returnErrorMessage(error) });
  }

  if (
    (codEmpresa === 1 && codigoMarca === 2 && cuentaContable.length) ||
    (codEmpresa === 13 && codigoMarca === 10 && cuentaContable.length) ||
    (codEmpresa === 15 && codigoMarca === 12 && cuentaContable.length)
  ) {
    //SI CONTABILIZA
    console.log("SI CONTABILIZA");
    try {
      await dbGiama
        .query(`SET @b = 0; CALL net_getnumeroasiento(@b); SELECT @b;`, {
          multipleStatements: true,
          type: QueryTypes.SELECT,
          transaction: t,
        })
        .then(async (data) => {
          const numeroAsiento = data[2][0]["@b"];

          await dbGiama
            .query(
              `SET @c = 0; CALL net_getnumeroasientosecundario(@c); SELECT @c;`,
              {
                multipleStatements: true,
                type: QueryTypes.SELECT,
                transaction: t,
              }
            )
            .then(async (data) => {
              const numeroAsientoSecundario = data[2][0]["@c"];

              await abmMovimientoContable({
                dbGiama: dbGiama,
                Accion: "A",
                ID: null,
                FechaAlta: FechaAlta,
                numeroAsiento: numeroAsiento,
                cuenta: cuentaContable,
                DH: "D",
                importeAbonado: importeAbonado,
                Solicitud: Solicitud,
                numeroPreSol: numeroPreSol,
                concepto: `Alta Pre Solicitud ${Solicitud} - PreOperacion ${numeroPreSol}`,
                codigoMarca: codigoMarca,
                tipoComp: "RCP",
                nroRecibo: nroRecibo,
                nroRecibo2: nroRecibo2,
                numeroAsientoSecundario: numeroAsientoSecundario,
                user: user,
                IDOPERACIONMP: null,
                t: t,
              }).then(async (data) => {
                if (data[2][0]["@result1"] === 0) {
                  t.rollback();
                } else {
                  await abmMovimientoContable({
                    dbGiama: dbGiama,
                    Accion: "A",
                    ID: null,
                    FechaAlta: FechaAlta,
                    numeroAsiento: numeroAsiento,
                    cuenta: codigoCuentaSeña,
                    DH: "H",
                    importeAbonado: importeAbonado,
                    Solicitud: Solicitud,
                    numeroPreSol: numeroPreSol,
                    concepto: `Alta Pre Solicitud ${Solicitud} - PreOperacion ${numeroPreSol}`,
                    codigoMarca: Marca,
                    tipoComp: "RCP",
                    nroRecibo: nroRecibo,
                    nroRecibo2: nroRecibo2,
                    numeroAsientoSecundario: numeroAsientoSecundario,
                    user: user,
                    IDOPERACIONMP: null,
                    t: t,
                  }).then(async (data) => {
                    if (data[2][0]["@result1"] === 0) {
                      t.rollback();
                    } else {
                      await abmMovimientoContable2({
                        dbGiama: dbGiama,
                        t: t,
                        Accion: "A",
                        ID: null,
                        FechaAlta: FechaAlta,
                        numeroAsiento: numeroAsientoSecundario,
                        cuenta: cuentaSecundaria,
                        DH: "D",
                        cuentaContable: cuentaContable,
                        concepto: `Alta Pre Solicitud ${Solicitud} - PreOperacion ${numeroPreSol}`,
                        codigoCuentaEfvo: codigoCuentaEfvo,
                        ValorCuotaTerm: ValorCuotaTerm,
                        importeAbonado: importeAbonado,
                        Solicitud: Solicitud,
                        numeroPreSol: numeroPreSol,
                        codigoMarca: Marca,
                        Operacion: null,
                        OPPRESOL: numeroPreSol,
                        tipoComp: "RCP",
                        nroRecibo: nroRecibo,
                        nroRecibo2: nroRecibo2,
                        IDOPERACIONMP: null,
                        user: user,
                      }).then(async (data) => {
                        if (data[2][0]["@result3"] === 0) {
                          t.rollback();
                        } else {
                          await abmMovimientoContable2({
                            dbGiama: dbGiama,
                            t: t,
                            Accion: "A",
                            ID: null,
                            FechaAlta: FechaAlta,
                            numeroAsiento: numeroAsientoSecundario,
                            cuenta: codigoCuentaSecundariaSeña,
                            DH: "H",
                            cuentaContable: cuentaContable,
                            concepto: `Alta Pre Solicitud ${Solicitud} - PreOperacion ${numeroPreSol}`,
                            codigoCuentaEfvo: codigoCuentaEfvo,
                            ValorCuotaTerm: ValorCuotaTerm,
                            importeAbonado: importeAbonado,
                            Solicitud: Solicitud,
                            numeroPreSol: numeroPreSol,
                            codigoMarca: Marca,
                            Operacion: null,
                            OPPRESOL: numeroPreSol,
                            tipoComp: "RCP",
                            nroRecibo: nroRecibo,
                            nroRecibo2: nroRecibo2,
                            IDOPERACIONMP: null,
                            user: user,
                          }).then(async (data) => {
                            if (data[2][0]["@result3"] === 0) {
                              t.rollback();
                            } else {
                              await abmSenia({
                                dbGiama: dbGiama,
                                t: t,
                                Accion: "A",
                                codigoMarca: Marca,
                                numero: numeroPreSol,
                                importe: importeAbonado,
                                fecha: FechaAlta,
                                forma: CodFormaPago,
                                codTarjeta: CodTarjeta ? CodTarjeta : null,
                                FechaCheque: FechaCheque ? FechaCheque : null,
                                nroRecibo: nroRecibo + nroRecibo2,
                                nroTarjeta: NroTarjeta ? NroTarjeta : null,
                                nroCupon: NroCupon ? NroCupon : null,
                                fechaCupon: FechaCupon ? FechaCupon : null,
                                lote: Lote,
                                ID: null,
                                cantPagos: Cantpagos ? Cantpagos : null,
                                interes: Interes ? Interes : null,
                                nroAsiento: null,
                              }).then(async (data) => {
                                if (data[2][0]["@result5"] === 0) {
                                  console.log(data);
                                  t.rollback();
                                } else {
                                  //OBSERVACIONES

                                  await addRecordObservacionPreSol({
                                    dbGiama: dbGiama,
                                    t: t,
                                    codigoMarca: Marca,
                                    operacion: numeroPreSol,
                                    fecha: hoy,
                                    obs:
                                      "Pre-Solicitud dada de alta el día " +
                                      hoy +
                                      ".",
                                    user: user,
                                  }).then(async (data) => {
                                    if (data[2][0]["@result6"] === 0) {
                                      t.rollback();
                                    } else {
                                      if (solicitudesDoc.length) {
                                        console.log("encontro solicitudes");

                                        await addRecordObservacionPreSol({
                                          dbGiama: dbGiama,
                                          t: t,
                                          codigoMarca: Marca,
                                          operacion: numeroPreSol,
                                          fecha: hoy,
                                          obs: `El cliente posee la(s) siguiente(s) Operaciones(es): 
                                          ${solicitudesDoc.map(
                                            (e) =>
                                              ` Solicitud: ${e.Solicitud} Empresa: ${e.Empresa}`
                                          )}`,
                                          user: user,
                                        }).then(async (data) => {
                                          if (data[2][0]["@result6"] === 0) {
                                            t.rollback();
                                          } else {
                                            if (dtoSuscriptor.PresoSN === 1) {
                                              console.log(
                                                "SOLICITUDES ENCONTRADAS ",
                                                solicitudesDoc
                                              );
                                              await setObsPreSolByEmpresa({
                                                dbGiama: dbGiama,
                                                t: t,
                                                codigoMarca:
                                                  dtoSuscriptor.Marca,
                                                operacion: dtoSuscriptor.Codigo,
                                                fecha: hoy,
                                                obs: `El cliente ingreso una nueva solicitud en fecha:   ${hoy}   
                                                Nro. Solicitud:   ${Solicitud}   Empresa:   ${empresaNombre}`,
                                                user: user,
                                                empresa: dtoSuscriptor.Empresa,
                                              }).then((data) => {
                                                console.log(data);
                                              });
                                            } else {
                                              await grabarObsByEmpresa({
                                                dbGiama: dbGiama,
                                                t: t,
                                                codigoMarca:
                                                  dtoSuscriptor.Marca,
                                                operacion: dtoSuscriptor.Codigo,
                                                fecha: hoy,
                                                obs:
                                                  "El cliente ingreso una nueva solicitud en fecha: " +
                                                  hoy +
                                                  " Nro. Solicitud: " +
                                                  Solicitud +
                                                  " Empresa: " +
                                                  empresaNombre,
                                                user: user,
                                                fechaLlamado: null,
                                                resaltado: null,
                                                automatica: 1,
                                                empresa: dtoSuscriptor.Empresa,
                                              }).then((data) => {
                                                console.log(data);
                                              });
                                            }
                                          }
                                        });
                                      }

                                      if (resultVerifyTelef) {
                                        await addRecordObservacionPreSol({
                                          dbGiama: dbGiama,
                                          t: t,
                                          codigoMarca: Marca,
                                          operacion: numeroPreSol,
                                          fecha: hoy,
                                          obs: `${resultVerifyTelef.Codigo}/${resultVerifyTelef.Empresa}/
                                                ${resultVerifyTelef.Solicitud}/${resultVerifyTelef.Marca}`,
                                          user: user,
                                        });
                                      }
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            });
        });
    } catch (error) {
      return res.send({ status: false, message: returnErrorMessage(error) });
    }
  } else {
    //SI NO CONTABILIZA
    console.log("NO CONTABILIZA");

    try {
      await abmSenia({
        dbGiama: dbGiama,
        t: t,
        Accion: "A",
        codigoMarca: Marca,
        numero: numeroPreSol,
        importe: importeAbonado,
        fecha: FechaAlta,
        forma: CodFormaPago,
        codTarjeta: CodTarjeta ? CodTarjeta : null,
        FechaCheque: FechaCheque ? FechaCheque : null,
        nroRecibo: nroRecibo + nroRecibo2,
        nroTarjeta: NroTarjeta ? NroTarjeta : null,
        nroCupon: NroCupon ? NroCupon : null,
        fechaCupon: FechaCupon ? FechaCupon : null,
        lote: Lote,
        ID: null,
        cantPagos: Cantpagos ? Cantpagos : null,
        interes: Interes ? Interes : null,
        nroAsiento: null,
      }).then(async (data) => {
        if (data[2][0]["@result5"] === 0) {
          t.rollback();
        } else {
          await addRecordObservacionPreSol({
            dbGiama: dbGiama,
            t: t,
            codigoMarca: Marca,
            operacion: numeroPreSol,
            fecha: hoy,
            obs: "Pre-Solicitud dada de alta el día " + hoy + ".",
            user: user,
          }).then(async (data) => {
            if (data[2][0]["@result6"] === 0) {
              t.rollback();
            } else {
              if (solicitudesDoc.length) {
                try {
                  await addRecordObservacionPreSol({
                    dbGiama: dbGiama,
                    t: t,
                    codigoMarca: Marca,
                    operacion: numeroPreSol,
                    fecha: hoy,
                    obs: `El cliente posee la(s) siguiente(s) Operaciones(es): 
      ${solicitudesDoc.map(
        (e) => ` Solicitud: ${e.Solicitud} Empresa: ${e.Empresa}`
      )}`,
                    user: user,
                  }).then(async (data) => {
                    if (data[2][0]["@result6"] === 0) {
                      t.rollback();
                    } else {
                      if (dtoSuscriptor.PresoSN === 1) {
                        await setObsPreSolByEmpresa({
                          dbGiama: dbGiama,
                          t: t,
                          codigoMarca: dtoSuscriptor.Marca,
                          operacion: dtoSuscriptor.Codigo,
                          fecha: hoy,
                          obs: `El cliente ingreso una nueva solicitud en fecha: "  ${hoy}  " Nro. Solicitud: "  ${
                            dtoSuscriptor.Solicitud
                          }  " Empresa: "  ${
                            solicitudesDoc.find(
                              (e) => e.Solicitud === dtoSuscriptor.Solicitud
                            ).Empresa
                          }`,
                          user: user,
                          empresa: dtoSuscriptor.Empresa,
                        }).then((data) => {
                          console.log(data);
                        });
                      } else {
                        await grabarObsByEmpresa({
                          dbGiama: dbGiama,
                          t: t,
                          codigoMarca: dtoSuscriptor.Marca,
                          operacion: dtoSuscriptor.Codigo,
                          fecha: hoy,
                          obs:
                            "El cliente ingreso una nueva solicitud en fecha: " +
                            hoy +
                            " Nro. Solicitud: " +
                            dtoSuscriptor.Solicitud +
                            " Empresa: " +
                            solicitudesDoc.find(
                              (e) => e.Solicitud === dtoSuscriptor.Solicitud
                            ).Empresa,
                          user: user,
                          fechaLlamado: null,
                          resaltado: null,
                          automatica: 1,
                          empresa: dtoSuscriptor.Empresa,
                        }).then((data) => {
                          console.log(data);
                        });
                      }
                    }
                  });
                } catch (error) {
                  console.log("observacion2", error);
                  t.rollback();
                  return res.send({
                    status: false,
                    message: returnErrorMessage(error),
                  });
                }
              }
              if (resultVerifyTelef) {
                //Comiteamos en la última observacion

                await addRecordObservacionPreSol({
                  dbGiama: dbGiama,
                  t: t,
                  codigoMarca: Marca,
                  operacion: numeroPreSol,
                  fecha: hoy,
                  obs: `${resultVerifyTelef.Codigo}/${resultVerifyTelef.Empresa}/
          ${resultVerifyTelef.Solicitud}/${resultVerifyTelef.Marca}`,
                  user: user,
                });
              }
            }
          });
        }
      });
    } catch (error) {
      return res.send({ status: false, message: returnErrorMessage(error) });
    }
  }

  t.commit();
  return res.send({
    status: true,
    message: "Pre-Solicitud añadida correctamente!",
  });
};
