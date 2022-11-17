import { QueryTypes } from "sequelize";
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
        const tarjetas = await dbGiama.query(`CALL pa_get_medios_cobro_todas_las_empresas`, {
            type: QueryTypes.SELECT
        }
        )
        
        return res.send({status: true, data: Object.values(tarjetas[0])})
        
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


