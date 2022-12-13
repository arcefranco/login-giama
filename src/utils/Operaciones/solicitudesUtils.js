import { QueryTypes } from "sequelize";
import {queryGetFormasPagoAltaPre} from '../../queries'
require('dotenv').config()

export const abmPreSol = async (body) => {

const {dbGiama, t, accion, codigoMarca, numeroPreSol, FechaAlta, 
    Solicitud, Apellido, Nombre, Calle, Localidad, TelefParticular, Vendedor, puntoVenta, 
    Modelo, ValorCuotaTerm, TotalCuota, FechaCancelacionSaldo,
    DNI, Mail, Anexos, Supervisor, OficialCanje, origenSuscripcion, debAutom,
    Documento, DocumentoNro, Precio, TipoPlan, TelefCelular, TelefLaboral, promoEspecial,
    Sucursal, nroRecibo, nroRecibo2, Numero, Piso, Dto, CodPostal, Provincia,
    TelefFamiliar, EmailParticular, EmailLaboral, Nacimiento, Ocupacion,
    CondIva, TeamLeader, user, CUIL} = body 
  const alta = await dbGiama.query(`CALL net_abmpresol(
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
        p_Accion: accion,
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
        p_Ocupacion: Ocupacion ? Ocupacion : null,
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
        })

        return alta
}


export const abmMovimientoContable = async (body) => {
    const {dbGiama, Accion, ID, FechaAlta, numeroAsiento, cuenta, DH, importeAbonado, Solicitud, numeroPreSol, 
    codigoMarca, tipoComp, nroRecibo, nroRecibo2, numeroAsientoSecundario, user, IDOPERACIONMP, t, concepto} = body

    const movimientoResult = await dbGiama.query(`SET @result1 = 0; CALL net_abm_movimientocontable(
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
                p_ACCION: Accion,
                p_ID: ID,
                p_FECHA: FechaAlta.split('-').join(''),
                p_NROASIENTO: numeroAsiento,
                p_CUENTA: cuenta,
                p_DH: DH,
                p_IMPORTE: importeAbonado,
                p_CONCEPTO: concepto, //`Alta Pre Solicitud ${Solicitud} - PreOperacion ${numeroPreSol}`,
                p_MARCA: codigoMarca,
                p_OPERACION: null,
                p_OPPRESOL: numeroPreSol,
                p_TIPOCOMP: tipoComp,
                p_NROCOMP: nroRecibo + nroRecibo2,
                p_ASIENTOSEC: numeroAsientoSecundario,
                p_IDOPERACIONMP: IDOPERACIONMP,
                p_USUARIO: user,
                p_RET: null        
            }
        }
    )

    return movimientoResult

}

export const abmMovimientoContable2 = async (body) => {
    const {dbGiama, t, Accion, ID, FechaAlta, numeroAsiento, cuenta, DH,
    cuentaContable, codigoCuentaEfvo, ValorCuotaTerm, importeAbonado, 
    Solicitud, numeroPreSol, codigoMarca, Operacion, OPPRESOL, tipoComp,
    nroRecibo, nroRecibo2, IDOPERACIONMP, user, concepto} = body
    
    const movimientoResult = await dbGiama.query(`SET @result3 = 0; CALL net_abm_movimientocontable2(
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
        p_ACCION: Accion,
        p_ID: ID,
        p_FECHA: FechaAlta.split('-').join(''),
        p_NROASIENTO: numeroAsiento,
        p_CUENTA: cuenta,
        p_DH: DH,
        p_IMPORTE: cuentaContable === codigoCuentaEfvo ? ValorCuotaTerm : importeAbonado,
        p_CONCEPTO: concepto,//`Alta Pre Solicitud ${Solicitud} - PreOperacion ${numeroPreSol}`,
        p_MARCA: codigoMarca,
        p_OPERACION: Operacion,
        p_OPPRESOL: OPPRESOL,
        p_TIPOCOMP: tipoComp,
        p_NROCOMP: nroRecibo + nroRecibo2,
        p_NROASIENTORENUM: numeroAsiento,
        p_IDOPERACIONMP: IDOPERACIONMP,
        p_USUARIO: user,
        p_RET: null 
        }
        })

        return movimientoResult
}

export const abmSenia = async (body) => {
    const {dbGiama, t, Accion, codigoMarca, numero, 
    importe, fecha, forma, FechaCheque, nroRecibo,
    codTarjeta, fechaCupon, nroTarjeta, nroCupon,
    lote, ID, cantPagos, interes, nroAsiento} = body

    const seniaResult = await dbGiama.query(`
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
        p_ACCION: Accion,
        p_MARCA: codigoMarca,
        p_NUMERO: numero,
        p_IMPORTE: importe,
        p_FECHA: fecha,
        p_FORMA: forma,
        p_FECHACH: FechaCheque,
        p_NRORECIBO: nroRecibo,
        p_CODTARJETA: codTarjeta,
        p_FECHACUPON: fechaCupon,
        p_NROTARJETA: nroTarjeta ? nroTarjeta.slice(nroTarjeta.length - 4) : null,
        p_NROCUPON: nroCupon,
        p_LOTE: lote,
        p_ID: ID,
        p_CANTpagos: cantPagos,
        p_INTERES: interes,
        p_NROASIENTO: nroAsiento,
        p_RET: null 
        
        }
    })

    return seniaResult
}

export const addRecordObservacionPreSol = async (body) => {
    const {dbGiama, t, codigoMarca, operacion, fecha, obs, user} = body
    
   const obsResult =  await dbGiama.query(`
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
    p_varOPERACION: operacion,
    p_varFECHA: fecha,
    p_varOBS: obs,
    p_USUARIO: user,
    p_RET: null   
    }
    })

    return obsResult  
}

export const setObsPreSolByEmpresa = async (body) => {
    const {dbGiama, t, codigoMarca, operacion, fecha, obs, user, empresa} = body
    const obsResult = await dbGiama.query(`
    SET @result8 = 0;
    CALL net_setObservPresolbyEmpresa(	    
        :p_varCODIGOMARCA,
        :p_varOPERACION,
        :p_varFECHA,
        :p_varOBS,
        :p_USUARIO,
        :p_varEMPRESA,
        @result8
        );
        SELECT @result8;`, {
            multipleStatements: true,
            type: QueryTypes.SELECT,
            transaction: t,
            replacements:{  	    
                p_varCODIGOMARCA: codigoMarca,
                p_varOPERACION: operacion,
                p_varFECHA: fecha,
                p_varOBS: obs,
                p_USUARIO: user,
                p_varEMPRESA: empresa,
                p_RET: null
            }
        })

        return obsResult
}

export const grabarObsByEmpresa = async (body) => {
    const {dbGiama, t, codigoMarca, operacion, fecha, obs, user, fechaLlamado, resaltado, automatica, empresa} = body
    const obsResult = await dbGiama.query(`
    SET @result8 = 0;
    CALL net_grabarobservacionesbyEmpresa(	    
        :p_MARCA,
        :p_OPERACION,
        :p_FECHA,
        :p_OBS,
        :p_USUARIO,
        :p_FECHALLAMADO,
        :p_RESALTADO,
        :p_AUTOMATICA,
        :p_EMPRESA, 
        @result8     
        );
        SELECT @result8;`, {
            multipleStatements: true,
            type: QueryTypes.SELECT,
            transaction: t,
            replacements:{     
                p_MARCA: codigoMarca,
                p_OPERACION: operacion,
                p_FECHA: fecha,
                p_OBS: obs,
                p_USUARIO: user,
                p_FECHALLAMADO: fechaLlamado,
                p_RESALTADO: resaltado,
                p_AUTOMATICA: automatica,
                p_EMPRESA: empresa, 
                p_RET: null    	    

            }
        })

        return obsResult

}

export const getObsTelefonos = async (body) => {//A CORREGIR POR EMPRESAS
    const {dbGiama, arrayTelefonos} = body
    let result;
    for(let i = 0; i<arrayTelefonos.length; i++){
        
      await dbGiama.query('CALL net_getObservacion_telefonos(:p_TELEFONO)', {
            replacements:{
                p_TELEFONO: arrayTelefonos[i]
            }
        }).then((data) => {
            if(data[0] && Object.keys(data[0]) && !result){ //solo pisa result la primera vez que encuentra algo
                console.log(data[0])
                
                result = data[0]
            }
        })
        
        
    }

    return result
 
}