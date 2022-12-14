import { QueryTypes } from "sequelize";
import { queryGetFormasPagoAltaPre } from '../../queries'
import {abmSenia, abmMovimientoContable, abmMovimientoContable2} from '../../utils/Operaciones/solicitudesUtils'
require('dotenv').config()


export const getPreOperaciones = async (req, res) => {
    const {marca, Solicitud, Apellido, Documento} = req.body
    const dbGiama = req.db

    try {
        const solicitudes = await dbGiama.query(`CALL net_buscapreop_v2(
            :p_MARCA,
            :p_SOLICITUD,	
            :p_APELLIDO,
            :p_DNI)`, {
                replacements: {
                    p_MARCA: marca,
                    p_SOLICITUD: Solicitud ? Solicitud : null,	
                    p_APELLIDO: Apellido ? Apellido : null,
                    p_DNI: Documento ? Documento : null
                    
                }
            })

            return res.send(solicitudes)
        
    } catch (error) {
        console.log(error)
        return res.send(error)
    }

        
}

export const getDatosPreSol = async (req, res) => {
const {codigoMarca, Numero} = req.body
const dbGiama = req.db

try {
    const data = await dbGiama.query(`CALL pa5_getdatospresolporcodigo(   
        :p_CodigoMarca,
        :p_Numero)`, {
            replacements: {
                p_CodigoMarca: codigoMarca,
                p_Numero: Numero
            }
        })

        return res.send(data)
} catch (error) {
    console.log(error)
    return res.send(error)
}
}


export const getModelos = async(req, res) => {
    const dbGiama = req.db

    try {
        
        const data = await dbGiama.query('SELECT Codigo, Nombre FROM modelos')
        return res.send(data[0])

    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

export const getOficialesMora = async (req, res) => {
    const dbGiama = req.db

    try {
        
        const data = await dbGiama.query('SELECT Codigo, Nombre FROM oficialesmora')
        return res.send(data[0])

    } catch (error) {
        console.log(error)
        return res.send(error)
    }

}

export const getOficialesPC = async (req, res) => {
    const dbGiama = req.db

    try {
        
        const data = await dbGiama.query('SELECT Codigo, Nombre FROM oficialesplancanje')
        return res.send(data[0])

    } catch (error) {
        console.log(error)
        return res.send(error)
    }

}
export const getOficialesScoring = async (req, res) => {
    const dbGiama = req.db

    try {
        
        const data = await dbGiama.query('SELECT Codigo, Nombre FROM oficialesscoring')
        return res.send(data[0])

    } catch (error) {
        console.log(error)
        return res.send(error)
    }

}

export const getOrigenSuscripcion = async (req, res) => {
    const dbGiama = req.db
    try {
        const origen = await dbGiama.query(`SELECT * FROM origensuscripcion`, {
            type: QueryTypes.SELECT
        }
        ) 

        return res.send(origen)

    } catch (error) {
        console.log(error)
        return res.send({ status: false, data: error })
    }

}

export const getPuntosVenta = async (req, res) => {
    const dbGiama = req.db
    try {
        const puntos = await dbGiama.query(`SELECT Codigo, Nombre FROM pre_puntosventa`, {
            type: QueryTypes.SELECT
        }
        ) 

        return res.send(puntos)

    } catch (error) {
        console.log(error)
        return res.send({ status: false, data: error })
    }

}

export const getParametros = async (req, res) => {
    const dbGiama = req.db
    let soli;
    let sanu;

    try {
        soli = await dbGiama.query(`SELECT Valor FROM parametros WHERE Codigo = 'SOLI'`,{
            type: QueryTypes.SELECT
        })
        
    } catch (error) {

        console.log(error)
        return res.send({status: false, data: error})
        
    }

    try {
        sanu = await dbGiama.query(`SELECT Valor FROM parametros WHERE Codigo = 'SANU'`,{
            type: QueryTypes.SELECT
        })
    } catch (error) {
        console.log(error)
        return res.send({status: false, data: error})
    }

    return res.send({status: true, data: {soli: parseInt(soli[0].Valor), sanu: parseInt(sanu[0].Valor)}})
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

 export const pagoSenia = async (req, res) => { //NUEVA SEÑA
    const dbGiama = req.db
    const {user} = req.usuario
    const {
        accion,
        Numero,
        Solicitud,
        codEmpresa,
        codigoMarca,
        cuentaContable,
        impTotalAbonado,
        ValorCuota,
        Fecha,
        Importe,
        Interes,
        ImpAbonado,
        FormaDePago,
        NroRecibo,
        FechaVto,
        Tarjeta,
        NroTarjeta,
        NroCupon,
        FechaCupon,
        Lote,
        CantPagos} = req.body
        const t = await dbGiama.transaction() 
        let codigoCuentaSeña;
        let codigoCuentaSecundariaSeña;
        let codigoCuentaEfvo;
        let cuentaSecundaria;
        let numeroAsiento;
        let numeroAsientoSecundario;


        if((impTotalAbonado + parseFloat(ImpAbonado)) > ValorCuota){
            console.log(impTotalAbonado + parseFloat(ImpAbonado), ValorCuota)
            return res.send({status: false, data: 'El importe abonado no puede ser superior al importe total de la cuota'})
        }else{

        try {
                
            if(
                (codEmpresa === 1 && codigoMarca === 2 && cuentaContable.length) ||
                (codEmpresa === 13 && codigoMarca === 10 && cuentaContable.length) ||
                (codEmpresa === 15 && codigoMarca === 12 && cuentaContable.length)){ //SI CONTABILIZA

                try {
                    await dbGiama.query('SELECT * FROM c_plancuentas WHERE Codigo = ?', {
                        replacements: [cuentaContable]
                }).then((data) => {
                    cuentaSecundaria = data[0][0].CuentaSecundaria
                })  //A CORREGIR POR EMPRESAS
                    
                } catch (error) {
                    console.log(error)
                    
                }

                try {
                    await dbGiama.query(`SELECT * FROM c_plancuentas WHERE codigoespecial IN('SEÑA','EFVO')`, {
                    type: QueryTypes.SELECT
                    }).then((data) => {
                        codigoCuentaEfvo = data[0].Codigo
                        codigoCuentaSeña = data[1].Codigo
                        codigoCuentaSecundariaSeña = data[1].CuentaSecundaria
                    })
                    
                } catch (error) {
                    console.log(error)
                }

  
                    


                await dbGiama.query(`SET @b = 0; CALL net_getnumeroasiento(@b); SELECT @b;`, {
                    multipleStatements: true,
                    type: QueryTypes.SELECT,
                    transaction: t
                }).then(async (data) => {
                
                numeroAsiento = data[2][0]["@b"]
                
                
                await dbGiama.query(`SET @c = 0; CALL net_getnumeroasientosecundario(@c); SELECT @c;`, {
                multipleStatements: true,
                type: QueryTypes.SELECT,
                transaction: t
                }).then(async (data) => {
                numeroAsientoSecundario = data[2][0]["@c"]

                await abmMovimientoContable({
                    dbGiama: dbGiama, Accion: 'A', ID: null, FechaAlta: Fecha, numeroAsiento: numeroAsiento,
                    cuenta: cuentaContable, DH: 'D', importeAbonado: ImpAbonado, Solicitud: Solicitud, numeroPreSol: Numero,
                    concepto:  `Pago Pre Solicitud ${Solicitud} - PreOperacion ${Numero}`,
                    codigoMarca: codigoMarca, tipoComp: 'RCP', nroRecibo: NroRecibo.slice(0,4), nroRecibo2: NroRecibo.slice(4,12),
                    numeroAsientoSecundario: numeroAsientoSecundario, user: user, IDOPERACIONMP: null, t: t
                })
                .then(async (data) => {
                    if (data[2][0]['@result1'] === 0) {
                    t.rollback()
                    } else {
                await abmMovimientoContable({
                    dbGiama: dbGiama, Accion: 'A', ID: null, FechaAlta: Fecha, numeroAsiento: numeroAsiento,
                    cuenta: codigoCuentaSeña, DH: 'H', importeAbonado: ImpAbonado, Solicitud: Solicitud, numeroPreSol: Numero,
                    concepto: `Pago Pre Solicitud ${Solicitud}  - PreOperacion ${Numero}`,      
                    codigoMarca: codigoMarca, tipoComp: 'RCP', nroRecibo: NroRecibo.slice(0,4), nroRecibo2: NroRecibo.slice(4,12),
                    numeroAsientoSecundario: numeroAsientoSecundario, user: user, IDOPERACIONMP: null, t: t
                })
                .then(async (data) => {
                    if (data[2][0]['@result1'] === 0) {
                    t.rollback()
                    } else {
                        await abmMovimientoContable2({
                            dbGiama: dbGiama, t: t, Accion: 'A', ID: null, FechaAlta: Fecha,
                            numeroAsiento: numeroAsientoSecundario, cuenta: cuentaSecundaria, DH: 'D', cuentaContable: cuentaContable,
                            codigoCuentaEfvo: codigoCuentaEfvo, ValorCuotaTerm: ImpAbonado, importeAbonado: ImpAbonado,
                            concepto: `Pago Pre Solicitud ${Solicitud}  - PreOperacion ${Numero}`,
                            Solicitud: Solicitud, numeroPreSol: Numero, codigoMarca: codigoMarca, Operacion: null,
                            OPPRESOL: Numero, tipoComp: 'RCP', nroRecibo: NroRecibo.slice(0,4), nroRecibo2: NroRecibo.slice(4,12), 
                            IDOPERACIONMP: null,
                            user: user
                        })
                        .then(async (data) => {
                            if (data[2][0]['@result3'] === 0) {
                            t.rollback()
                            } else {
                                await abmMovimientoContable2({
                                    dbGiama: dbGiama, t: t, Accion: 'A', ID: null, FechaAlta: Fecha,
                                    numeroAsiento: numeroAsientoSecundario, cuenta: codigoCuentaSecundariaSeña, DH: 'H', cuentaContable: cuentaContable,
                                    codigoCuentaEfvo: codigoCuentaEfvo, ValorCuotaTerm: ImpAbonado, importeAbonado: ImpAbonado,
                                    concepto: `Pago Pre Solicitud ${Solicitud}  - PreOperacion ${Numero}`,
                                    Solicitud: Solicitud, numeroPreSol: Numero, codigoMarca: codigoMarca, Operacion: null,
                                    OPPRESOL: Numero, tipoComp: 'RCP', nroRecibo: NroRecibo.slice(0,4), nroRecibo2: NroRecibo.slice(4,12), 
                                    IDOPERACIONMP: null,
                                    user: user
                                })
                                .then(async (data) => {
                                    if (data[2][0]['@result3'] === 0) {
                                    t.rollback()
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
            }

            await abmSenia({dbGiama: dbGiama, t: t, Accion: accion, codigoMarca: codigoMarca, numero: Numero,
                    importe: ImpAbonado, fecha: Fecha, forma: FormaDePago, codTarjeta: Tarjeta ? Tarjeta : null,
                    FechaCheque: FechaVto ? FechaVto : null, nroRecibo: NroRecibo,
                    nroTarjeta: NroTarjeta ? NroTarjeta : null, nroCupon: NroCupon ? NroCupon : null,
                    fechaCupon: FechaCupon ? FechaCupon : null,
                    lote: Lote, ID: null, cantPagos: CantPagos ? CantPagos : null, interes: Interes ? Interes : null,
                    nroAsiento: numeroAsiento ? numeroAsiento : null})
                           .then(async (data) => {
                            if (data[2][0]['@result5'] === 0) {
                            console.log(data)
                            t.rollback()
                            } else {
                                t.commit()
                                return res.send({status: true, data: 'Seña agregada correctamente'})
                            } 
                        })

                
            } catch (error) {
                console.log(error)
                return res.send({status: false, data: 'Hubo un problema'})
            }
        }

} 