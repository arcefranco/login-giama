import {  QueryTypes } from "sequelize";
import { queryGetFormasPagoAltaPre } from '../../queries'
import { abmPreSol, abmMovimientoContable, abmMovimientoContable2, abmSenia, addRecordObservacionPreSol, setObsPreSolByEmpresa, grabarObsByEmpresa, getObsTelefonos } from '../../utils/Operaciones/solicitudesUtils'
require('dotenv').config()


export const getModelos = async (req, res) => {
    const dbGiama = req.db
    try {
        const allModelos = await dbGiama.query(`SELECT modelos.Codigo, modelos.Activo, modelos.Nombre, modelos.Marca, modelosvalorescuotas.TipoPlan, tipoplan.Descripcion, modelosvalorescuotas.CuotaTerminal 
        FROM modelos LEFT JOIN modelosvalorescuotas ON modelosvalorescuotas.Codigo = modelos.Codigo
        LEFT JOIN tipoplan ON tipoplan.ID = modelosvalorescuotas.TipoPlan`, {
            type: QueryTypes.SELECT
        }
        )

        return res.send({ status: true, data: allModelos })

    } catch (error) {
        console.log(error)
        return res.send({ status: false, data: error })
    }

}

export const getSucursales = async (req, res) => {
    const dbGiama = req.db
    try {
        const allSucursales = await dbGiama.query(`SELECT * FROM sucursalreal`, {
            type: QueryTypes.SELECT
        }
        )

        return res.send({ status: true, data: allSucursales })

    } catch (error) {
        console.log(error)
        return res.send({ status: false, data: error })
    }

}

export const getTarjetas = async (req, res) => {
    const dbGiama = req.db
    try {
        const tarjetas = await dbGiama.query(`SELECT * FROM tarjetas`, {
            type: QueryTypes.SELECT
        }
        )

        return res.send({ status: true, data: tarjetas })

    } catch (error) {
        console.log(error)
        return res.send({ status: false, data: error })
    }

}

export const getVendedores = async (req, res) => {
    const dbGiama = req.db
    try {
        const allVendedores = await dbGiama.query(`SELECT * FROM vendedores`, {
            type: QueryTypes.SELECT
        }
        )

        return res.send({ status: true, data: allVendedores })

    } catch (error) {
        console.log(error)
        return res.send({ status: false, data: error })
    }

}

export const getPuntosVenta = async (req, res) => {
    const dbGiama = req.db
    try {
        const allPuntosVenta = await dbGiama.query(`SELECT * FROM pre_puntosventa`, {
            type: QueryTypes.SELECT
        }
        )

        return res.send({ status: true, data: allPuntosVenta })

    } catch (error) {
        console.log(error)
        return res.send({ status: false, data: error })
    }

}

export const getOficialCanje = async (req, res) => {
    const dbGiama = req.db
    try {
        const allOficialCanje = await dbGiama.query(`SELECT * FROM oficialesplancanje`, {
            type: QueryTypes.SELECT
        }
        )

        return res.send({ status: true, data: allOficialCanje })

    } catch (error) {
        console.log(error)
        return res.send({ status: false, data: error })
    }

}

export const getTeamLeaders = async (req, res) => {
    const dbGiama = req.db
    try {
        const allTeamLeaders = await dbGiama.query(`SELECT * FROM teamleader`, {
            type: QueryTypes.SELECT
        }
        )

        return res.send({ status: true, data: allTeamLeaders })

    } catch (error) {
        console.log(error)
        return res.send({ status: false, data: error })
    }

}

export const getSupervisores = async (req, res) => {
    const dbGiama = req.db
    try {
        const allSupervisores = await dbGiama.query(`SELECT * FROM sucursales`, {
            type: QueryTypes.SELECT
        }
        )

        return res.send({ status: true, data: allSupervisores })

    } catch (error) {
        console.log(error)
        return res.send({ status: false, data: error })
    }

}

export const getIntereses = async (req, res) => {
    const dbGiama = req.db
    try {
        const intereses = await dbGiama.query(`SELECT * ,cob.Nombre, cob.CuentaContable, cob.CtaSecundaria
        FROM intereses LEFT JOIN
            net_view_getmediosdecobro AS cob ON intereses.MedioCobro = cob.Codigo
         AND intereses.Activo = 1
        ORDER BY intereses.Cantidad`, {
            type: QueryTypes.SELECT
        }
        )

        return res.send({ status: true, data: intereses })

    } catch (error) {
        console.log(error)
        return res.send({ status: false, data: error })
    }

}

export const getFormasPago = async (req, res) => {
    const dbGiama = req.db
    try {
        const formasPago = await dbGiama.query(queryGetFormasPagoAltaPre, {
            type: QueryTypes.SELECT
        })

        return res.send({ status: true, data: formasPago })

    } catch (error) {
        console.log(error)
        return res.send({ status: false, data: error })
    }

}

export const getOrigenSuscripcion = async (req, res) => {
    const dbGiama = req.db
    try {
        const origen = await dbGiama.query(`SELECT * FROM origensuscripcion`, {
            type: QueryTypes.SELECT
        }
        )

        return res.send({ status: true, data: origen })

    } catch (error) {
        console.log(error)
        return res.send({ status: false, data: error })
    }

}

export const verifySolicitud = async (req, res) => {
    const dbGiama = req.db
    const { solicitud } = req.body


    try {
        const preSol = await dbGiama.query('SELECT * FROM pre_solicitudes WHERE Solicitud = ?',
            {
                replacements: [solicitud],
                type: QueryTypes.SELECT
            })
        const operacion = await dbGiama.query('SELECT * FROM operaciones WHERE Solicitud = ?',
            {
                replacements: [solicitud],
                type: QueryTypes.SELECT
            })
        return res.send([...preSol, ...operacion])

    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

export const verifySolicitudStatus = async (req, res) => {
    const dbGiama = req.db
    const { solicitud, codMarca } = req.body

    try {

        const solicitudStatus = await dbGiama.query('CALL net_getsolicitudes(?, ?, ?, ?, ?, ?)', {
            replacements: [solicitud, solicitud, null, null, codMarca, null],
        })

        if (solicitudStatus && Object.keys(solicitudStatus[0]).length) return res.send(solicitudStatus[0][0])
        else return res.send(solicitudStatus[0])



    } catch (error) {

        console.log(error)
        return res.send(error)
    }
}

export const getModeloValorCuota = async (req, res) => {
    const dbGiama = req.db
    const { codMarca, modelo, tipoPlan } = req.body

    try {

        const valorCuota = await dbGiama.query('CALL net_getvalorcuota (?, ?, ?)', {
            replacements: [codMarca, modelo, tipoPlan],
        })

        return res.send(valorCuota[0])
        
    } catch (error) {

        console.log(error)
        return res.send(error)
    }
}

export const getModeloPrecio = async (req, res) => {
    const dbGiama = req.db
    const { codMarca, modelo, tipoPlan } = req.body

    try {
        const precioA = await dbGiama.query('CALL net_getcuotaacobrar("A", ?, ?, ?)', {
            replacements: [codMarca, modelo, tipoPlan],
        })
        const precioB = await dbGiama.query('CALL net_getcuotaacobrar("B", ?, ?, ?)', {
            replacements: [codMarca, modelo, tipoPlan],
        })

        return res.send({ PrecioA: precioA[0], PrecioB: precioB[0] })

    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

export const getFechaMinimaCont = async (req, res) => {
    const dbGiama = req.db
    const {marca} = req.body

    try {
        const fecha = await dbGiama.query(`SELECT ValorSTR FROM parametros WHERE Codigo = 'FMC1' AND Marca = ?`,{
            replacements: [marca],
            type: QueryTypes.SELECT
        })

        return res.send(fecha[0])

    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

export const verifyDoc = async (req, res) => {
    const dbGiama = req.db
    const { documento, documentoNro } = req.body

    try {
        const documentoStatus = await dbGiama.query('CALL net_verificadniempresas2(?, ?)', {
            replacements: [documento, documentoNro],
        })
        const suscriptorData = await dbGiama.query('CALL net_getDtoSuscriptor(?, ?)', {
            replacements: [documento, documentoNro],
        })

        return res.send({ docStatus: documentoStatus, suscriptor: suscriptorData })

    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

export const altaPre = async (req, res) => {
    const dbGiama = req.db
    const { user } = req.usuario
    const hoy = new Date().toISOString().slice(0, 10).replace('T', ' ').split('-').reverse().join('/')
    const {
        codigoMarca,
        codEmpresa,
        empresaNombre,
        Solicitud,
        FechaAlta,
        TipoPlan,
        Modelo,
        ValorCuotaTerm,
        Documento,
        DocumentoNro,
        CUIL,
        Nacimiento,
        tieneEmail,
        Apellido,
        Nombre,
        EmailParticular,
        EmailLaboral,
        Calle,
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
        CondIva,
        ContactoAD,
        Precio,
        TotalCuota,
        nroRecibo,
        nroRecibo2,
        Sucursal,
        FormaDePago,
        cuentaContable,
        CantPagos,
        Vendedor,
        FechaCheque,
        FechaCancelacionSaldo,
        TeamLeader,
        Supervisor,
        Importe,
        puntoVenta,
        importeAbonado,
        Interes,
        OficialCanje,
        Tarjeta,
        nroTarjeta,
        origenSuscripcion,
        fechaCupon,
        nroCupon,
        debAutom,
        DNI,
        Mail,
        Anexos,
        promoEspecial,
        planSubite,
        lote,
        observaciones
    } = req.body
    let cuentaSecundaria;
    let codigoCuentaSeña;
    let codigoCuentaSecundariaSeña
    let codigoCuentaEfvo;
    let solicitudesDoc;
    let dtoSuscriptor;
    let numeroPreSol;
    let arrayTelefonos = [];
    let resultVerifyTelef;
    const a = 0
    const t = await dbGiama.transaction() 
    if(TelefParticular) arrayTelefonos.push(TelefParticular)
    if(TelefCelular) arrayTelefonos.push(TelefCelular)
    if(TelefFamiliar) arrayTelefonos.push(TelefFamiliar)
    if(TelefLaboral) arrayTelefonos.push(TelefLaboral)

                                                //VERIFICACIONES//

try {
const documentoStatus = await dbGiama.query('CALL net_verificadniempresas2(?, ?)', { //BUSCO DENUEVO EL DNI PARA LAS OBSERVACIONES
replacements: [Documento, DocumentoNro],
    })
solicitudesDoc = documentoStatus
} catch (error) {
console.log('verificaDNI', error) //A CORREGIR POR EMPRESAS
    }

try {
const suscriptorData = await dbGiama.query('CALL net_getDtoSuscriptor(?, ?)', { //BUSCO DENUEVO EL DNI PARA LAS OBSERVACIONES
replacements: [Documento, DocumentoNro],
    })
dtoSuscriptor = suscriptorData[0]
} catch (error) {
console.log('getDtoSuscriptor', error)
    }

try {//OBTENGO LA CUENTA SECUNDARIA DE LA FORMA DE PAGO(USANDO EL CODIGO CUENTA CONTABLE)
if (cuentaContable) {
    await dbGiama.query('SELECT * FROM c_plancuentas WHERE Codigo = ?', {
        replacements: [cuentaContable]
}).then((data) => {
    cuentaSecundaria = data[0][0].CuentaSecundaria
})  //A CORREGIR POR EMPRESAS
}
} catch (error) {
console.log('cPlanCuentas', error)
    }   


try {//DESPUES EL CODIGO DE CUENTA SEÑA
if (cuentaContable) {
await dbGiama.query(`SELECT * FROM c_plancuentas WHERE codigoespecial IN('SEÑA','EFVO')`, {
type: QueryTypes.SELECT
}).then((data) => {
    codigoCuentaEfvo = data[0].Codigo
    codigoCuentaSeña = data[1].Codigo
    codigoCuentaSecundariaSeña = data[1].CuentaSecundaria
})

}

} catch (error) {
console.log('cPlanCuentas seña', error)
}

try {
   const result = await getObsTelefonos({dbGiama: dbGiama, arrayTelefonos: arrayTelefonos})
   resultVerifyTelef = result
} catch (error) {
    console.log('error con verificacion telefonos: ', error)
}

try {

await dbGiama.query(`SET @a = 0; CALL net_getproxinumeropresol(@a); SELECT @a;`, { //OBTENGO NUMERO DE PRESOLICITUD
multipleStatements: true,
type: QueryTypes.SELECT
}).then(async (data) => {
numeroPreSol = data[2][0]["@a"]
})
} catch (error) {
    console.log('proxiNumeroPreSol', error)
return res.send({ status: false, messsage: 'Ha habido un error' })
}

try {

await abmPreSol({
    dbGiama: dbGiama, t: t, accion: 'A', codigoMarca: codigoMarca, numeroPreSol: numeroPreSol, FechaAlta: FechaAlta,
    Solicitud: Solicitud, Apellido: Apellido, Nombre: Nombre, Calle: Calle, Localidad: Localidad, TelefParticular: TelefParticular,
    Vendedor: Vendedor, puntoVenta: puntoVenta, Modelo: Modelo, ValorCuotaTerm: ValorCuotaTerm, TotalCuota: TotalCuota,
    FechaCancelacionSaldo: FechaCancelacionSaldo, DNI: DNI, Mail: Mail, Anexos: Anexos, Supervisor: Supervisor,
    OficialCanje: OficialCanje, origenSuscripcion: origenSuscripcion, debAutom: debAutom, Documento: Documento, DocumentoNro: DocumentoNro,
    Precio: Precio, TipoPlan: TipoPlan, TelefCelular: TelefCelular, TelefLaboral: TelefLaboral, promoEspecial: promoEspecial,
    Sucursal: Sucursal, nroRecibo: nroRecibo, nroRecibo2: nroRecibo2, Numero: Numero, Piso: Piso, Dto: Dto, CodPostal: CodPostal,
    Provincia: Provincia, TelefFamiliar: TelefFamiliar, EmailParticular: EmailParticular, EmailLaboral: EmailLaboral,
    Nacimiento: Nacimiento, Ocupacion: Ocupacion, CondIva: CondIva, TeamLeader: TeamLeader, user: user, CUIL: CUIL
})
} catch (error) {
    console.log('abmPreSol', error)
t.rollback()
return res.send({ status: false, message: 'Ha habido un error' })
}

if(
(codEmpresa === 1 && codigoMarca === 2 && cuentaContable.length) ||
(codEmpresa === 14 && codigoMarca === 10 && cuentaContable.length) ||
(codEmpresa === 15 && codigoMarca === 12 && cuentaContable.length)) { //SI CONTABILIZA
console.log('SI CONTABILIZA')


await dbGiama.query(`SET @b = 0; CALL net_getnumeroasiento(@b); SELECT @b;`, {
    multipleStatements: true,
    type: QueryTypes.SELECT,
    transaction: t
}).then(async (data) => {

const numeroAsiento = data[2][0]["@b"]


await dbGiama.query(`SET @c = 0; CALL net_getnumeroasientosecundario(@c); SELECT @c;`, {
multipleStatements: true,
type: QueryTypes.SELECT,
transaction: t
}).then(async (data) => {
const numeroAsientoSecundario = data[2][0]["@c"]


await abmMovimientoContable({
    dbGiama: dbGiama, Accion: 'A', ID: null, FechaAlta: FechaAlta, numeroAsiento: numeroAsiento,
    cuenta: cuentaContable, DH: 'D', importeAbonado: importeAbonado, Solicitud: Solicitud, numeroPreSol: numeroPreSol,
    codigoMarca: codigoMarca, tipoComp: 'RCP', nroRecibo: nroRecibo, nroRecibo2: nroRecibo2,
    numeroAsientoSecundario: numeroAsientoSecundario, user: user, IDOPERACIONMP: null, t: t
})
.then(async (data) => {
if (data[2][0]['@result1'] === 0) {

t.rollback()
} else {

await abmMovimientoContable({
    dbGiama: dbGiama, Accion: 'A', ID: null, FechaAlta: FechaAlta, numeroAsiento: numeroAsiento,
    cuenta: codigoCuentaSeña, DH: 'H', importeAbonado: importeAbonado, Solicitud: Solicitud, numeroPreSol: numeroPreSol,
    codigoMarca: codigoMarca, tipoComp: 'RCP', nroRecibo: nroRecibo, nroRecibo2: nroRecibo2,
    numeroAsientoSecundario: numeroAsientoSecundario, user: user, IDOPERACIONMP: null, t: t
})
.then(async (data) => {
if (data[2][0]['@result2'] === 0) {
t.rollback()
} else {

await abmMovimientoContable2({
    dbGiama: dbGiama, t: t, Accion: 'A', ID: null, FechaAlta: FechaAlta,
    numeroAsiento: numeroAsientoSecundario, cuenta: cuentaSecundaria, DH: 'D', cuentaContable: cuentaContable,
    codigoCuentaEfvo: codigoCuentaEfvo, ValorCuotaTerm: ValorCuotaTerm, importeAbonado: importeAbonado,
    Solicitud: Solicitud, numeroPreSol: numeroPreSol, codigoMarca: codigoMarca, Operacion: null,
    OPPRESOL: numeroPreSol, tipoComp: 'RCP', nroRecibo: nroRecibo, nroRecibo2: nroRecibo2, IDOPERACIONMP: null,
    user: user
})

.then(async (data) => {
if (data[2][0]['@result3'] === 0) {
t.rollback()
} else {

await abmMovimientoContable2({
    dbGiama: dbGiama, t: t, Accion: 'A', ID: null, FechaAlta: FechaAlta,
    numeroAsiento: numeroAsientoSecundario, cuenta: codigoCuentaSecundariaSeña, DH: 'H', cuentaContable: cuentaContable,
    codigoCuentaEfvo: codigoCuentaEfvo, ValorCuotaTerm: ValorCuotaTerm, importeAbonado: importeAbonado,
    Solicitud: Solicitud, numeroPreSol: numeroPreSol, codigoMarca: codigoMarca, Operacion: null,
    OPPRESOL: numeroPreSol, tipoComp: 'RCP', nroRecibo: nroRecibo, nroRecibo2: nroRecibo2, IDOPERACIONMP: null,
    user: user
})

.then(async (data) => {
if (data[2][0]['@result4'] === 0) {
t.rollback()
} else {


await abmSenia({
    dbGiama: dbGiama, t: t, Accion: 'A', codigoMarca: codigoMarca, numero: numeroPreSol,
    importe: importeAbonado, fecha: FechaAlta, forma: FormaDePago, codTarjeta: Tarjeta ? Tarjeta : null,
    FechaCheque: FechaCheque ? FechaCheque : null, nroRecibo: nroRecibo + nroRecibo2,
    nroTarjeta: nroTarjeta ? nroTarjeta : null, nroCupon: nroCupon ? nroCupon : null,
    fechaCupon: fechaCupon ? fechaCupon : null,
    lote: lote, ID: null, cantPagos: CantPagos ? CantPagos : null, interes: Interes ? Interes : null,
    nroAsiento: numeroAsiento,
})
.then(async (data) => {
if (data[2][0]['@result5'] === 0) {
console.log(data)
t.rollback()
} else {  //OBSERVACIONES 


await addRecordObservacionPreSol({
    dbGiama: dbGiama, t: t, codigoMarca: codigoMarca,
    operacion: numeroPreSol, fecha: hoy, obs: "Pre-Solicitud dada de alta el día " + hoy + ".",
    user: user
})
.then(async (data) => {
if (data[2][0]['@result6'] === 0) {
t.rollback()
} else {

if (solicitudesDoc.length) {
    console.log('encontro solicitudes')

await addRecordObservacionPreSol({
    dbGiama: dbGiama, t: t, codigoMarca: codigoMarca,
    operacion: numeroPreSol, fecha: hoy, obs: `El cliente posee la(s) siguiente(s) Operaciones(es): 
    ${solicitudesDoc.map(e => ` Solicitud: ${e.Solicitud} Empresa: ${e.Empresa}`)}`,
    user: user})
.then(async (data) => {
if (data[2][0]['@result6'] === 0) {

t.rollback()
} else {
 
if (dtoSuscriptor.PresoSN === 1) {
    console.log('SOLICITUDES ENCONTRADAS ', solicitudesDoc)
await setObsPreSolByEmpresa({
    dbGiama: dbGiama, t: t, codigoMarca: dtoSuscriptor.Marca,
    operacion: dtoSuscriptor.Codigo, fecha: hoy,
    obs: `El cliente ingreso una nueva solicitud en fecha:   ${hoy}   Nro. Solicitud:   ${Solicitud}   Empresa:   ${empresaNombre}`,
    user: user, empresa: dtoSuscriptor.Empresa})
.then((data) => {
console.log(data)

})
} else {
await grabarObsByEmpresa({
    dbGiama: dbGiama, t: t, codigoMarca: dtoSuscriptor.Marca,
    operacion: dtoSuscriptor.Codigo, fecha: hoy,
    obs: "El cliente ingreso una nueva solicitud en fecha: " + hoy + " Nro. Solicitud: " + Solicitud + " Empresa: " + empresaNombre,
    user: user, fechaLlamado: null, resaltado: null, automatica: 1, empresa: dtoSuscriptor.Empresa})
.then((data) => {
console.log(data)
 
})
}
}

})


}

if(resultVerifyTelef){ 

await addRecordObservacionPreSol({
    dbGiama: dbGiama, t: t, codigoMarca: codigoMarca,
    operacion: numeroPreSol, fecha: hoy, obs: `${resultVerifyTelef.Codigo}/${resultVerifyTelef.Empresa}/
    ${resultVerifyTelef.Solicitud}/${resultVerifyTelef.Marca}`,
    user: user})

    
}

}
})

}
})

}
})

}
})

}
})


}

})


})

})


} else { //SI NO CONTABILIZA
    console.log('NO CONTABILIZA')

await abmSenia({
    dbGiama: dbGiama, t: t, Accion: 'A', codigoMarca: codigoMarca, numero: numeroPreSol,
    importe: importeAbonado, fecha: FechaAlta, forma: FormaDePago, codTarjeta: Tarjeta ? Tarjeta : null,
    FechaCheque: FechaCheque ? FechaCheque : null, nroRecibo: nroRecibo + nroRecibo2,
    nroTarjeta: nroTarjeta ? nroTarjeta : null, nroCupon: nroCupon ? nroCupon : null,
    fechaCupon: fechaCupon ? fechaCupon : null,
    lote: lote, ID: null, cantPagos: CantPagos ? CantPagos : null, interes: Interes ? Interes : null,
    nroAsiento: null,
})
.then(async (data) => {
if (data[2][0]['@result5'] === 0) {
t.rollback()

} else {

await addRecordObservacionPreSol({
    dbGiama: dbGiama, t: t, codigoMarca: codigoMarca,
    operacion: numeroPreSol, fecha: hoy, obs: "Pre-Solicitud dada de alta el día " + hoy + ".",
    user: user
})
.then(async (data) => {
if (data[2][0]['@result6'] === 0) {
t.rollback()
} else {
if (solicitudesDoc.length) {
try {
await addRecordObservacionPreSol({
    dbGiama: dbGiama, t: t, codigoMarca: codigoMarca,
    operacion: numeroPreSol, fecha: hoy, obs: `El cliente posee la(s) siguiente(s) Operaciones(es): 
    ${solicitudesDoc.map(e => ` Solicitud: ${e.Solicitud} Empresa: ${e.Empresa}`)}`,
    user: user
})
.then(async (data) => {
if (data[2][0]['@result6'] === 0) {

t.rollback()
} else {

if (dtoSuscriptor.PresoSN === 1) {
await setObsPreSolByEmpresa({
    dbGiama: dbGiama, t: t, codigoMarca: dtoSuscriptor.Marca,
    operacion: dtoSuscriptor.Codigo, fecha: hoy,
    obs: `El cliente ingreso una nueva solicitud en fecha: "  ${hoy}  " Nro. Solicitud: "  ${dtoSuscriptor.Solicitud}  " Empresa: "  ${solicitudesDoc.find(e => e.Solicitud === dtoSuscriptor.Solicitud).Empresa}`,
    user: user, empresa: dtoSuscriptor.Empresa
}).then((data) => {
console.log(data)

})
} else {
await grabarObsByEmpresa({
    dbGiama: dbGiama, t: t, codigoMarca: dtoSuscriptor.Marca,
    operacion: dtoSuscriptor.Codigo, fecha: hoy,
    obs: "El cliente ingreso una nueva solicitud en fecha: " + hoy + " Nro. Solicitud: " + dtoSuscriptor.Solicitud + " Empresa: " + solicitudesDoc.find(e => e.Solicitud === dtoSuscriptor.Solicitud).Empresa,
    user: user, fechaLlamado: null, resaltado: null, automatica: 1, empresa: dtoSuscriptor.Empresa
})
.then((data) => {
console.log(data)

})
}
}
})

} catch (error) {
console.log('observacion2', error)
t.rollback()
return res.send({ status: false, message: 'Ha habido un error' })
}
}
if(resultVerifyTelef){ //Comiteamos en la última observacion

    await addRecordObservacionPreSol({
        dbGiama: dbGiama, t: t, codigoMarca: codigoMarca,
        operacion: numeroPreSol, fecha: hoy, obs: `${resultVerifyTelef.Codigo}/${resultVerifyTelef.Empresa}/
        ${resultVerifyTelef.Solicitud}/${resultVerifyTelef.Marca}`,
        user: user})

       
}
}
})


}
})


}



t.commit()
return res.send({ status: true, message: 'Pre-Solicitud añadida correctamente!' })
}


