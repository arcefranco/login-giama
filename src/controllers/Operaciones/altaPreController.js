import { QueryTypes } from "sequelize";
import {queryGetTarjetasAltaPre} from '../../queries'
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
        
        return res.send({status: true, data: allModelos})
        
    } catch (error) {
        console.log(error)
        return res.send({status: false, data: error})
    }
    
}

export const getSucursales = async (req, res) => {
    const dbGiama = req.db
    try {
        const allSucursales = await dbGiama.query(`SELECT * FROM sucursalreal`, {
            type: QueryTypes.SELECT
        }
        )
        
        return res.send({status: true, data: allSucursales})
        
    } catch (error) {
        console.log(error)
        return res.send({status: false, data: error})
    }
    
}

export const getFromasPago = async (req, res) => {
    const dbGiama = req.db
    try {
        const allFormasPago = await dbGiama.query(`SELECT * FROM pre_formaspago`, {
            type: QueryTypes.SELECT
        }
        )
        
        return res.send({status: true, data: allFormasPago})
        
    } catch (error) {
        console.log(error)
        return res.send({status: false, data: error})
    }
    
}

export const getVendedores = async (req, res) => {
    const dbGiama = req.db
    try {
        const allVendedores = await dbGiama.query(`SELECT * FROM vendedores`, {
            type: QueryTypes.SELECT
        }
        )
        
        return res.send({status: true, data: allVendedores})
        
    } catch (error) {
        console.log(error)
        return res.send({status: false, data: error})
    }
    
}

export const getPuntosVenta = async (req, res) => {
    const dbGiama = req.db
    try {
        const allPuntosVenta = await dbGiama.query(`SELECT * FROM pre_puntosventa`, {
            type: QueryTypes.SELECT
        }
        )
        
        return res.send({status: true, data: allPuntosVenta})
        
    } catch (error) {
        console.log(error)
        return res.send({status: false, data: error})
    }
    
}

export const getOficialCanje = async (req, res) => {
    const dbGiama = req.db
    try {
        const allOficialCanje = await dbGiama.query(`SELECT * FROM oficialesplancanje`, {
            type: QueryTypes.SELECT
        }
        )
        
        return res.send({status: true, data: allOficialCanje})
        
    } catch (error) {
        console.log(error)
        return res.send({status: false, data: error})
    }
    
}

export const getTeamLeaders = async (req, res) => {
    const dbGiama = req.db
    try {
        const allTeamLeaders = await dbGiama.query(`SELECT * FROM teamleader`, {
            type: QueryTypes.SELECT
        }
        )
        
        return res.send({status: true, data: allTeamLeaders})
        
    } catch (error) {
        console.log(error)
        return res.send({status: false, data: error})
    }
    
}

export const getSupervisores = async (req, res) => {
    const dbGiama = req.db
    try {
        const allSupervisores = await dbGiama.query(`SELECT * FROM sucursales`, {
            type: QueryTypes.SELECT
        }
        )
        
        return res.send({status: true, data: allSupervisores})
        
    } catch (error) {
        console.log(error)
        return res.send({status: false, data: error})
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
        
        return res.send({status: true, data: intereses})
        
    } catch (error) {
        console.log(error)
        return res.send({status: false, data: error})
    }
    
}

export const getTarjetas = async (req, res) => {
    const dbGiama = req.db
    try {
        const tarjetas = await dbGiama.query(queryGetTarjetasAltaPre, {
            type: QueryTypes.SELECT
        })
        
        return res.send({status: true, data: tarjetas})
        
    } catch (error) {
        console.log(error)
        return res.send({status: false, data: error})
    }
    
}

export const getOrigenSuscripcion = async (req, res) => {
    const dbGiama = req.db
    try {
        const origen = await dbGiama.query(`SELECT * FROM origensuscripcion`, {
            type: QueryTypes.SELECT
        }
        )
        
        return res.send({status: true, data: origen})
        
    } catch (error) {
        console.log(error)
        return res.send({status: false, data: error})
    }
    
}

export const verifySolicitud = async (req, res) => {
    const dbGiama = req.db
    const {solicitud} = req.body


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
    const {solicitud, codMarca} = req.body

    try {

        const solicitudStatus = await dbGiama.query('CALL net_getsolicitudes(?, ?, ?, ?, ?, ?)', {
            replacements: [solicitud, solicitud, null, null, codMarca, null],
        })

        if(Object.keys(solicitudStatus[0]).length) return res.send(solicitudStatus[0][0])
        else return res.send(solicitudStatus[0])

        

    } catch (error) {
        
        console.log(error)
        return res.send(error)
    }
}

export const getModeloValorCuota = async (req, res) => {
    const dbGiama = req.db
    const {codMarca, modelo, tipoPlan} = req.body

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
    const {codMarca, modelo, tipoPlan} = req.body

    try {
        const precioA = await dbGiama.query('CALL net_getcuotaacobrar("A", ?, ?, ?)',{
          replacements: [codMarca, modelo, tipoPlan],
        })
        const precioB = await dbGiama.query('CALL net_getcuotaacobrar("B", ?, ?, ?)',{
            replacements: [codMarca, modelo, tipoPlan],
        })

        return res.send({PrecioA: precioA[0], PrecioB: precioB[0]})

    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

export const verifyDoc = async (req, res) => {
    const dbGiama = req.db
    const {documento, documentoNro} = req.body

    try {
        const documentoStatus = await dbGiama.query('CALL net_verificadniempresas2(?, ?)', {
          replacements: [documento, documentoNro],
        })
        const suscriptorData = await dbGiama.query('CALL net_getDtoSuscriptor(?, ?)', {
            replacements: [documento, documentoNro],
          })

        return res.send({docStatus: documentoStatus, suscriptor: suscriptorData})

    } catch (error) {
        console.log(error)
        return res.send(error) 
    }
}

export const altaPre = async (req, res) => {
    const dbGiama = req.db
    const {user} = req.usuario
    const hoy = new Date().toISOString().slice(0, 10).replace('T', ' ').split('-').reverse().join('/')
    const {
        codigoMarca,
        codEmpresa,
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
    let importeDecimal;
    const a = 0
    const t = await dbGiama.transaction()

    try {//PRIMERO OBTENGO LA CUENTA SECUNDARIA DE LA FORMA DE PAGO(USANDO EL CODIGO CUENTA CONTABLE)
        if(cuentaContable){
            await dbGiama.query('SELECT * FROM c_plancuentas WHERE Codigo = ?', {
                replacements: [cuentaContable]
            }).then((data) => {
                cuentaSecundaria = data[0][0].CuentaSecundaria
            })

        }

    } catch (error) {
        console.log(error)
    }

   
    try {//DESPUES EL CODIGO DE CUENTA SEÑA
        if(cuentaContable){
            await dbGiama.query(`SELECT * FROM c_plancuentas WHERE codigoespecial IN('SEÑA','EFVO')`, {
                type: QueryTypes.SELECT
            }).then((data) => {
                codigoCuentaEfvo = data[0].Codigo
                codigoCuentaSeña = data[1].Codigo
                codigoCuentaSecundariaSeña = data[1].CuentaSecundaria
            })

        }
        
    } catch (error) {
        console.log(error)
    }

    try {
        
        dbGiama.query(`SET @a = 0; CALL net_getproxinumeropresol(@a); SELECT @a;`, {
            multipleStatements: true,
            type: QueryTypes.SELECT
        }).then( async (data) =>{ 
            const numeroPreSol = data[2][0]["@a"]

            try {
                
                dbGiama.query(`CALL net_abmpresol(
                :p_Accion,
                :p_Marca,
                :p_Numero,
                :p_Fecha,
                :p_Solicitud,
                :p_Apellido,
                :p_Nombres,
                :p_Domicilio,
                :p_Localidad,
                :p_Telefonos,
                :p_Vendedor,
                :p_PuntoVenta,
                :p_Modelo,
                :p_ValorCuotaTerminal,
                :p_ImpoCuota,
                :p_FechaEstimCancel,
                :p_DNI, 
                :p_Servicio,
                :p_Anexos,
                :p_Suc,
                :p_Oficial, 
                :p_Origen,
                :p_DebitoAutomatico,
                :p_TipoDoc,
                :p_NroDoc,
                :p_tipoPrecio,
                :p_tipoplan,
                :p_Telefonos2,
                :p_Telefonos3,
                :p_PromoEspecial,
                :p_SucReal,
                :p_AnuladaCliente, 
                :p_FechaPrescoring, 
                :p_FechaIngresoExtraNet,  
                :p_EstadoPrescoring, 
                :p_Estadoscoring, 
                :p_NroReciboX,
                :p_ImporteReciboX, 
                :p_DebitoAutomaticoscoring, 
                :p_Empresa,
                :p_NumeroCalle,
                :p_Piso,
                :p_Dto,
                :p_CodPostal,
                :p_Provincia,
                :p_Telefonos4,
                :p_EmailParticular,
                :p_EmailLaboral,
                :p_FechaNac,
                :p_Ocupacion,
                :p_DomicilioOcupacion,
                :p_FechaIngresoTerminal,
                :p_CuotaACobrarOriginal,
                :p_Oficialscoring,
                :p_OficialMora,
                :p_PlanSubite,
                :p_TipoResponsable,
                :p_Bonificacion,
                :p_Rec,
                :p_Crucescoring,
                :p_FechaCrucescoring,
                :p_teamleader,
                :p_UsuarioPrescoring,
                :p_USUARIO, 
                :p_LLXLL,
                :p_LLXLLMODIF,
                :p_NROCUIL)
                `, {
                    replacements: 
                    {
                p_Accion: 'A',
                p_Marca: codigoMarca,
                p_Numero: numeroPreSol,
                p_Fecha: FechaAlta,
                p_Solicitud: Solicitud,
                p_Apellido: Apellido,
                p_Nombres: Nombre,
                p_Domicilio: Calle,
                p_Localidad: Localidad,
                p_Telefonos: TelefParticular ? TelefParticular : null,
                p_Vendedor: Vendedor,
                p_PuntoVenta: puntoVenta,
                p_Modelo: Modelo,
                p_ValorCuotaTerminal: ValorCuotaTerm,
                p_ImpoCuota: TotalCuota,
                p_FechaEstimCancel: FechaCancelacionSaldo,
                p_DNI: DNI,
                p_Servicio: Mail,
                p_Anexos: Anexos,
                p_Suc: Supervisor,
                p_Oficial: OficialCanje ? OficialCanje : null,
                p_Origen: origenSuscripcion,
                p_DebitoAutomatico: debAutom,
                p_TipoDoc: Documento, 
                p_NroDoc: DocumentoNro,
                p_tipoPrecio: Precio,
                p_tipoplan: TipoPlan,
                p_Telefonos2: TelefCelular ? TelefCelular : null,
                p_Telefonos3: TelefLaboral ? TelefLaboral : null,
                p_PromoEspecial: promoEspecial,
                p_SucReal: Sucursal,
                p_AnuladaCliente: null, 
                p_FechaPrescoring:null, 
                p_FechaIngresoExtraNet:null, 
                p_EstadoPrescoring:null, 
                p_Estadoscoring:null, 
                p_NroReciboX: nroRecibo + nroRecibo2,
                p_ImporteReciboX:null,  
                p_DebitoAutomaticoscoring:null, 
                p_Empresa: 1,
                p_NumeroCalle: Numero,
                p_Piso: Piso ? Piso : null,
                p_Dto: Dto ? Dto : null,
                p_CodPostal: CodPostal,
                p_Provincia: Provincia,
                p_Telefonos4: TelefFamiliar ? TelefFamiliar : null,
                p_EmailParticular: EmailParticular ? EmailParticular : null,
                p_EmailLaboral: EmailLaboral ? EmailLaboral : null,
                p_FechaNac: Nacimiento,
                p_Ocupacion: Ocupacion,
                p_DomicilioOcupacion:null,
                p_FechaIngresoTerminal:null,
                p_CuotaACobrarOriginal: TotalCuota,
                p_Oficialscoring:null,
                p_OficialMora:null,
                p_PlanSubite:null,
                p_TipoResponsable: CondIva,
                p_Bonificacion:null, 
                p_Rec:null,
                p_Crucescoring:null, 
                p_FechaCrucescoring:null,
                p_teamleader: TeamLeader,
                p_UsuarioPrescoring:null,
                p_USUARIO: user,
                p_LLXLL:null,
                p_LLXLLMODIF:null,
                p_NROCUIL: CUIL ? CUIL : null

                    },
                transaction: t
                }).then(async () => {
                    if(
                        (codEmpresa === 1 && codigoMarca === 2 && cuentaContable !== null ) || 
                        (codEmpresa === 14 && codigoMarca === 10 && cuentaContable !== null) ||  
                        (codEmpresa === 15 && codigoMarca === 12 && cuentaContable !== null )){ //SI CONTABILIZA
                            try {
                                await dbGiama.query(`SET @b = 0; CALL net_getnumeroasiento(@b); SELECT @b;`, {
                                    multipleStatements: true,
                                    type: QueryTypes.SELECT,
                                    transaction: t
                                }).then(async (data) =>{ 
                                    const numeroAsiento = data[2][0]["@b"]
                                    try {
                                        await dbGiama.query(`SET @c = 0; CALL net_getnumeroasientosecundario(@c); SELECT @c;`, {
                                            multipleStatements: true,
                                            type: QueryTypes.SELECT,
                                            transaction: t
                                        }).then(async (data) => { 
                                            const numeroAsientoSecundario = data[2][0]["@c"]

                                            try {
                                            await dbGiama.query(`SET @result1 = 0; CALL net_abm_movimientocontable(
                                            :p_ACCION,
                                            :p_ID,
                                            :p_FECHA,
                                            :p_NROASIENTO,
                                            :p_CUENTA,
                                            :p_DH,
                                            :p_IMPORTE,
                                            :p_CONCEPTO,
                                            :p_MARCA,
                                            :p_OPERACION,
                                            :p_OPPRESOL,
                                            :p_TIPOCOMP,
                                            :p_NROCOMP,
                                            :p_ASIENTOSEC,
                                            :p_IDOPERACIONMP,
                                            :p_USUARIO,
                                            @result1); SELECT @result1;`, {
                                                multipleStatements: true,
                                                type: QueryTypes.SELECT,
                                                transaction: t,
                                                replacements: 
                                                {
                                                    p_ACCION: 'A',
                                                    p_ID: null,
                                                    p_FECHA: FechaAlta.split('-').join(''),
                                                    p_NROASIENTO: numeroAsiento,
                                                    p_CUENTA:cuentaContable,
                                                    p_DH: 'D',
                                                    p_IMPORTE: importeAbonado,
                                                    p_CONCEPTO:`Alta Pre Solicitud ${Solicitud} - PreOperacion ${numeroPreSol}`,
                                                    p_MARCA: codigoMarca,
                                                    p_OPERACION: null,
                                                    p_OPPRESOL: numeroPreSol,
                                                    p_TIPOCOMP: 'RCP',
                                                    p_NROCOMP: nroRecibo + nroRecibo2,
                                                    p_ASIENTOSEC: numeroAsientoSecundario,
                                                    p_IDOPERACIONMP: null,
                                                    p_USUARIO: user,
                                                    p_RET: null        
                                                }
                                            }).then(async (data) => { 
                                                if(data[2][0]['@result1'] === 0){
                                                
                                                     t.rollback()
                                                }else{
                                                try {
                                                await dbGiama.query(`SET @result2 = 0; CALL net_abm_movimientocontable(
                                                    :p_ACCION,
                                                    :p_ID,
                                                    :p_FECHA,
                                                    :p_NROASIENTO,
                                                    :p_CUENTA,
                                                    :p_DH,
                                                    :p_IMPORTE,
                                                    :p_CONCEPTO,
                                                    :p_MARCA,
                                                    :p_OPERACION,
                                                    :p_OPPRESOL,
                                                    :p_TIPOCOMP,
                                                    :p_NROCOMP,
                                                    :p_ASIENTOSEC,
                                                    :p_IDOPERACIONMP,
                                                    :p_USUARIO,
                                                    @result2); SELECT @result2;`, {
                                                        multipleStatements: true,
                                                        type: QueryTypes.SELECT,
                                                        transaction: t,
                                                        replacements: 
                                                        {
                                                            p_ACCION: 'A',
                                                            p_ID: null,
                                                            p_FECHA: FechaAlta.split('-').join(''),
                                                            p_NROASIENTO: numeroAsiento,
                                                            p_CUENTA: codigoCuentaSeña,
                                                            p_DH: 'H',
                                                            p_IMPORTE: importeAbonado,
                                                            p_CONCEPTO:`Alta Pre Solicitud ${Solicitud} - PreOperacion ${numeroPreSol}`,
                                                            p_MARCA: codigoMarca,
                                                            p_OPERACION: null,
                                                            p_OPPRESOL: numeroPreSol,
                                                            p_TIPOCOMP: 'RCP',
                                                            p_NROCOMP: nroRecibo + nroRecibo2,
                                                            p_ASIENTOSEC: numeroAsientoSecundario,
                                                            p_IDOPERACIONMP: null,
                                                            p_USUARIO: user,
                                                            p_RET: null        
                                                        }
                                                    }).then(async (data) => {
                                                        if(data[2][0]['@result2'] === 0){
                                                            t.rollback()
                                                        }else{
                                                            try {
                                                            await dbGiama.query(`SET @result3 = 0; CALL net_abm_movimientocontable2(
                                                            :p_ACCION,
                                                            :p_ID,
                                                            :p_FECHA,
                                                            :p_NROASIENTO,
                                                            :p_CUENTA,
                                                            :p_DH,
                                                            :p_IMPORTE,
                                                            :p_CONCEPTO,
                                                            :p_MARCA,
                                                            :p_OPERACION,
                                                            :p_OPPRESOL,
                                                            :p_TIPOCOMP,
                                                            :p_NROCOMP,
                                                            :p_NROASIENTORENUM,
                                                            :p_IDOPERACIONMP,
                                                            :p_USUARIO,
                                                            @result3
                                                            ); SELECT @result3;`,{
                                                            multipleStatements: true,
                                                            type: QueryTypes.SELECT,
                                                            transaction: t,
                                                            replacements:{
                                                            p_ACCION: 'A',
                                                            p_ID: null,
                                                            p_FECHA: FechaAlta.split('-').join(''),
                                                            p_NROASIENTO: numeroAsientoSecundario,
                                                            p_CUENTA: cuentaSecundaria,
                                                            p_DH: 'D',
                                                            p_IMPORTE: cuentaContable === codigoCuentaEfvo ? ValorCuotaTerm : importeAbonado,
                                                            p_CONCEPTO: `Alta Pre Solicitud ${Solicitud} - PreOperacion ${numeroPreSol}`,
                                                            p_MARCA: codigoMarca,
                                                            p_OPERACION: null,
                                                            p_OPPRESOL: numeroPreSol,
                                                            p_TIPOCOMP: 'RCP',
                                                            p_NROCOMP: nroRecibo + nroRecibo2,
                                                            p_NROASIENTORENUM: numeroAsientoSecundario,
                                                            p_IDOPERACIONMP: null,
                                                            p_USUARIO: user,
                                                            p_RET: null 
                                                            }
                                                            }).then(async (data) => {
                                                               if(data[2][0]['@result3'] === 0){
                                                                   t.rollback()   
                                                               }else{
                                                                try {
                                                            await dbGiama.query(`SET @result4 = 0; CALL net_abm_movimientocontable2(
                                                            :p_ACCION,
                                                            :p_ID,
                                                            :p_FECHA,
                                                            :p_NROASIENTO,
                                                            :p_CUENTA,
                                                            :p_DH,
                                                            :p_IMPORTE,
                                                            :p_CONCEPTO,
                                                            :p_MARCA,
                                                            :p_OPERACION,
                                                            :p_OPPRESOL,
                                                            :p_TIPOCOMP,
                                                            :p_NROCOMP,
                                                            :p_NROASIENTORENUM,
                                                            :p_IDOPERACIONMP,
                                                            :p_USUARIO,
                                                            @result4
                                                            ); SELECT @result4;`,{
                                                            multipleStatements: true,
                                                            type: QueryTypes.SELECT,
                                                            transaction: t,
                                                            replacements:{
                                                            p_ACCION: 'A',
                                                            p_ID: null,
                                                            p_FECHA: FechaAlta.split('-').join(''),
                                                            p_NROASIENTO: numeroAsientoSecundario,
                                                            p_CUENTA: codigoCuentaSecundariaSeña,
                                                            p_DH: 'H',
                                                            p_IMPORTE: cuentaContable === codigoCuentaEfvo ? ValorCuotaTerm : importeAbonado,
                                                            p_CONCEPTO: `Alta Pre Solicitud ${Solicitud} - PreOperacion ${numeroPreSol}`,
                                                            p_MARCA: codigoMarca,
                                                            p_OPERACION: null,
                                                            p_OPPRESOL: numeroPreSol,
                                                            p_TIPOCOMP: 'RCP',
                                                            p_NROCOMP: nroRecibo + nroRecibo2,
                                                            p_NROASIENTORENUM: numeroAsientoSecundario,
                                                            p_IDOPERACIONMP: null,
                                                            p_USUARIO: user,
                                                            p_RET: null 
                                                            }
                                                            }).then(async (data) => {
                                                                if(data[2][0]['@result4'] === 0){
                                                                    t.rollback()
                                                                }else{
                                                                    try {
                                                                        await dbGiama.query(`
                                                                        SET @result5 = 0;
                                                                        CALL net_abmsenias(
                                                                        :p_ACCION,
                                                                        :p_MARCA,
                                                                        :p_NUMERO,
                                                                        :p_IMPORTE,
                                                                        :p_FECHA,
                                                                        :p_FORMA,
                                                                        :p_FECHACH,
                                                                        :p_NRORECIBO,
                                                                        :p_CODTARJETA,
                                                                        :p_FECHACUPON,
                                                                        :p_NROTARJETA,
                                                                        :p_NROCUPON,
                                                                        :p_LOTE,
                                                                        :p_ID,
                                                                        :p_CANTpagos,
                                                                        :p_INTERES,
                                                                        :p_NROASIENTO,
                                                                        @result5);
                                                                        SELECT @result5;
                                                                        `,{
                                                                        multipleStatements: true,
                                                                        type: QueryTypes.SELECT,
                                                                        transaction: t,
                                                                        replacements:{
                                                                            p_ACCION: 'A',
                                                                            p_MARCA: codigoMarca,
                                                                            p_NUMERO: numeroPreSol,
                                                                            p_IMPORTE: importeAbonado,
                                                                            p_FECHA: FechaAlta,
                                                                            p_FORMA: FormaDePago,
                                                                            p_FECHACH: FechaCheque ? FechaCheque : null,
                                                                            p_NRORECIBO: nroRecibo + nroRecibo2,
                                                                            p_CODTARJETA: Tarjeta ? Tarjeta : null,
                                                                            p_FECHACUPON: fechaCupon ? fechaCupon : null,
                                                                            p_NROTARJETA: nroTarjeta ? nroTarjeta.slice(nroTarjeta.length - 4) : null,
                                                                            p_NROCUPON: nroCupon ? nroCupon : null,
                                                                            p_LOTE: lote ? lote : null,
                                                                            p_ID: null,
                                                                            p_CANTpagos: CantPagos ? CantPagos : null,
                                                                            p_INTERES: Interes ? Interes : null,
                                                                            p_NROASIENTO: numeroAsiento,
                                                                            p_RET: null 
                                                                            
                                                                            }
                                                                        }).then(async (data) => {
                                                                            if(data[2][0]['@result5'] === 0){
                                                                                console.log(data)
                                                                                t.rollback()
                                                                            }else{
                                                                                try {
                                                                                   await dbGiama.query(`
                                                                                    SET @result6 = 0;
                                                                                    CALL pa5_addrecordobservacionespresol(
                                                                                    :p_varCODIGOMARCA,
                                                                                    :p_varOPERACION,
                                                                                    :p_varFECHA,
                                                                                    :p_varOBS,
                                                                                    :p_USUARIO,
                                                                                    @result6
                                                                                    );
                                                                                    SELECT @result6;`,{
                                                                                    multipleStatements: true,
                                                                                    type: QueryTypes.SELECT,
                                                                                    transaction: t,
                                                                                    replacements:{    
                                                                                    p_varCODIGOMARCA: codigoMarca,
                                                                                    p_varOPERACION: numeroPreSol,
                                                                                    p_varFECHA: hoy,
                                                                                    p_varOBS: "Pre-Solicitud dada de alta el día " + hoy + ".",
                                                                                    p_USUARIO: user,
                                                                                    p_RET: null   
                                                                                    }
                                                                                    }).then((data) => {
                                                                                        console.log('DATA OBS: ', data)
                                                                                        t.rollback()
                                                                                    })
                                                                                } catch (error) {
                                                                                    t.rollback()
                                                                                    console.log(error)
                                                                                }

                                                                            }
                                                                                
                                                                            
                                                                        })
                                                                        
                                                                    } catch (error) {
                                                                        console.log(error)
                                                                        t.rollback()
                                                                    }
                                                                }
                                                            })
                                                                } catch (error) {
                                                                    console.log(error)
                                                                    t.rollback()
                                                                }
                                                               }
                                                            })
                                                            } catch (error) {
                                                                t.rollback()
                                                                console.log(error)
                                                            }
                                                        }
                                                    })
                                                        
                                                    } catch (error) {
                                                        t.rollback()
                                                        console.log(error)
                                                    }
                                                }

                                            })
                                            } catch (error) {
                                                console.log(error)
                                                t.rollback()
                                            }
                                        
                                         })
                                    } catch (error) {
                                        console.log(error)
                                        t.rollback()
                                    }
                                    })
                            } catch (error) {
                                console.log(error)
                                t.rollback()
                                return res.send({status: false, message: 'Ha habido un error'})
                            }
                            
                        }else{ //SI NO CONTABILIZA
                            try {
                                await dbGiama.query(`
                                SET @result5 = 0;
                                CALL net_abmsenias(
                                :p_ACCION,
                                :p_MARCA,
                                :p_NUMERO,
                                :p_IMPORTE,
                                :p_FECHA,
                                :p_FORMA,
                                :p_FECHACH,
                                :p_NRORECIBO,
                                :p_CODTARJETA,
                                :p_FECHACUPON,
                                :p_NROTARJETA,
                                :p_NROCUPON,
                                :p_LOTE,
                                :p_ID,
                                :p_CANTpagos,
                                :p_INTERES,
                                :p_NROASIENTO,
                                @result5);
                                SELECT @result5;
                                `,{
                                multipleStatements: true,
                                type: QueryTypes.SELECT,
                                transaction: t,
                                replacements:{
                                    p_ACCION: 'A',
                                    p_MARCA: codigoMarca,
                                    p_NUMERO: numeroPreSol,
                                    p_IMPORTE: importeAbonado,
                                    p_FECHA: FechaAlta,
                                    p_FORMA: FormaDePago,
                                    p_FECHACH: FechaCheque ? FechaCheque : null,
                                    p_NRORECIBO: nroRecibo + nroRecibo2,
                                    p_CODTARJETA: Tarjeta ? Tarjeta : null,
                                    p_FECHACUPON: fechaCupon ? fechaCupon : null,
                                    p_NROTARJETA: nroTarjeta ? nroTarjeta.slice(nroTarjeta.length - 4) : null,
                                    p_NROCUPON: nroCupon ? nroCupon : null,
                                    p_LOTE: lote ? lote : null,
                                    p_ID: null,
                                    p_CANTpagos: CantPagos ? CantPagos : null,
                                    p_INTERES: Interes ? Interes : null,
                                    p_NROASIENTO: null,
                                    p_RET: null 
                                    
                                    }
                                }).then(async (data) => {
                                    if(data[2][0]['@result5'] === 0){
                                                                                
                                       try {
                                        
                                       } catch (error) {
                                        
                                       }
                                    }else{
                                        t.rollback()
                                    }
                                })
                                
                            } catch (error) {
                                t.rollback()
                            }
                        }
                })
                
                return res.send({status: true, message: 'Pre-Solicitud añadida correctamente!'})

            } catch (error) {
                console.log(error)
                t.rollback()
                return res.send({status: false, message: 'Ha habido un error'})
            }
        })
            
       

    } catch (error) {
        console.log(error)
        return res.send({status: false, messsage: 'Ha habido un error'})
    }

}


