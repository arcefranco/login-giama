import { QueryTypes } from "sequelize";
import { queryGetFormasPagoAltaPre } from '../../queries'
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