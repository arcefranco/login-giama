import { QueryTypes } from "sequelize";
import awaitWithTimeout from "../helpers/transaction/awaitWithTimeout";
import {app} from '../index'

let transaction;


export const getOficialesByName = async (req, res) => {

    const {oficialName} = req.body
    const dbGiama = app.get('db')


    switch (oficialName) {
        case 'Licitaciones':
            const oficialLicitaciones = await dbGiama.query("SELECT * FROM oficialeslicitaciones")
            return res.send(oficialLicitaciones[0])

        case 'Adjudicaciones':
            const oficialAdjudicaciones = await dbGiama.query("SELECT * FROM oficialesadjudicacion")
            return res.send(oficialAdjudicaciones[0])
        
        case 'Plan Canje':
            const oficialCanje = await dbGiama.query("SELECT * FROM oficialesplancanje")
            return res.send(oficialCanje[0])

        case 'Scoring':
            const oficialScoring = await dbGiama.query("SELECT * FROM oficialesscoring")
            return res.send(oficialScoring[0])
        
        case 'Mora':
            const oficialMora = await dbGiama.query("SELECT * FROM oficialesmora")
            return res.send(oficialMora[0])

        case 'Subite':
            const oficialSubite = await dbGiama.query("SELECT * FROM subite_oficiales")
            return res.send(oficialSubite[0])
        
        case 'Compra':
            const oficialCompra = await dbGiama.query("SELECT * FROM comprar_oficiales")
            return res.send(oficialCompra[0])

        case 'Carga': 
            const oficialCarga = await dbGiama.query("SELECT * FROM oficialescarga")
            return res.send(oficialCarga[0])
            
        case 'Patentamiento': 
            const oficialPatentamiento = await dbGiama.query("SELECT * FROM oficialespatentamiento")
            return res.send(oficialPatentamiento[0])
        
        case 'Asignacion': 
            const oficialAsignacion = await dbGiama.query("SELECT * FROM oficialesasignacion")
            return res.send(oficialAsignacion[0])

        default:
            break;
    }
}

export const deleteOficiales = async (req, res) => {

    const {oficialName, Codigo} = req.body
    const dbGiama = app.get('db')
    console.log(req.body)

    switch (oficialName) {
        case 'Licitaciones':
                try {
                    await dbGiama.query("DELETE FROM oficialeslicitaciones WHERE Codigo = ?", {
                        replacements: [Codigo],
                        type: QueryTypes.DELETE
                    })
                    return res.send({status: true, message: 'Eliminado correctamente!'})
                    
                } catch (error) {
                    console.log(error)
                    return res.send({status: false, message: 'Hubo un problema'})
                }   

        case 'Adjudicaciones':
                try {
                    await dbGiama.query("DELETE FROM oficialesadjudicacion WHERE Codigo = ?", {
                       replacements: [Codigo],
                       type: QueryTypes.DELETE
                    })
                    return res.send({status: true, message: 'Eliminado correctamente!'})
                    
                } catch (error) {
                    console.log(error)
                    return res.send({status: false, message: 'Hubo un problema'})
                }
        
        case 'Plan Canje':
            try {
                await dbGiama.query("DELETE FROM oficialesplancanje WHERE Codigo = ?", {
                   replacements: [Codigo],
                   type: QueryTypes.DELETE
                })
                return res.send({status: true, message: 'Eliminado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        case 'Scoring':
            try {
                await dbGiama.query("DELETE FROM oficialesscoring WHERE Codigo = ?", {
                   replacements: [Codigo],
                   type: QueryTypes.DELETE
                })
                return res.send({status: true, message: 'Eliminado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Mora':
            try {
                await dbGiama.query("DELETE FROM oficialesmora WHERE Codigo = ?", {
                       replacements: [Codigo],
                       type: QueryTypes.DELETE
                    })
                    return res.send({status: true, message: 'Eliminado correctamente!'})
                
            } catch (error) {
                
            }

        case 'Subite':
            try {
                await dbGiama.query("DELETE FROM subite_oficiales WHERE Codigo = ?", {
                     replacements: [Codigo],
                     type: QueryTypes.DELETE
                    })
                    return res.send({status: true, message: 'Eliminado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Compra':
            try {
                dbGiama.query("DELETE FROM comprar_oficiales WHERE Codigo = ?", {
                   replacements: [Codigo],
                   type: QueryTypes.DELETE
                })
                return res.send({status: true, message: 'Eliminado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        case 'Carga': 
            try {
                await dbGiama.query("DELETE FROM oficialescarga WHERE Codigo = ?", {
                   replacements: [Codigo],
                   type: QueryTypes.DELETE
                })
                return res.send({status: true, message: 'Eliminado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
            
        case 'Patentamiento':
            try {
                await dbGiama.query("DELETE FROM oficialespatentamiento WHERE Codigo = ?", {
                   replacements: [Codigo],
                   type: QueryTypes.DELETE
                })
                return res.send({status: true, message: 'Eliminado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Asignacion': 
            try {
                await dbGiama.query("DELETE FROM oficialesasignacion WHERE Codigo = ?", {
                   replacements: [Codigo],
                   type: QueryTypes.DELETE
                })
                return res.send({status: true, message: 'Eliminado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        default:
           return res.send({status: false, message: 'Error'})
    }
}
export const updateOficiales = async (req, res) => {

    const {categoria, Codigo, Nombre} = req.body
    const dbGiama = app.get('db')
    console.log(req.body)

    switch (categoria) {
        case 'Licitaciones':
                try {
                    await dbGiama.query("UPDATE oficialeslicitaciones SET Nombre = ? WHERE Codigo = ?", {
                        transaction: transaction,
                        replacements: [Nombre, Codigo],
                        type: QueryTypes.UPDATE
                    }).then(() => transaction.commit()).catch((error) => {
                        transaction.rollback()
                        return res.send(error)
                    })
                    return res.send({status: true, message: 'Actualizado correctamente!'})
                    
                } catch (error) {
                    console.log(error)
                    return res.send({status: false, message: 'Hubo un problema'})
                }   

        case 'Adjudicaciones':
                try {
                    await dbGiama.query("UPDATE oficialesadjudicacion SET Nombre = ? WHERE Codigo = ?", {
                        transaction: transaction,
                       replacements: [Nombre, Codigo],
                       type: QueryTypes.UPDATE
                    }).then(() => transaction.commit()).catch((error) => {
                        transaction.rollback()
                        return res.send(error)
                    })
                    return res.send({status: true, message: 'Actualizado correctamente!'})
                    
                } catch (error) {
                    console.log(error)
                    return res.send({status: false, message: 'Hubo un problema'})
                }
        
        case 'Canje':
            try {
                await dbGiama.query("UPDATE oficialesplancanje SET Nombre = ? WHERE Codigo = ?", {
                    transaction: transaction,
                   replacements: [Nombre, Codigo],
                   type: QueryTypes.UPDATE
                }).then(() => transaction.commit()).catch((error) => {
                    transaction.rollback()
                    return res.send(error)
                })
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        case 'Scoring':
            try {
                await dbGiama.query("UPDATE oficialesscoring SET Nombre = ? WHERE Codigo = ?", {
                    transaction: transaction,
                   replacements: [Nombre, Codigo],
                   type: QueryTypes.UPDATE
                }).then(() => transaction.commit()).catch((error) => {
                    transaction.rollback()
                    return res.send(error)
                })
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Mora':
            try {
                await dbGiama.query("UPDATE oficialesmora SET Nombre = ? WHERE Codigo = ?", {
                    transaction: transaction,
                       replacements: [Nombre, Codigo],
                       type: QueryTypes.UPDATE
                    }).then(() => transaction.commit()).catch((error) => {
                        transaction.rollback()
                        return res.send(error)
                    })
                    return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                
            }

        case 'Subite':
            try {
                await dbGiama.query("UPDATE subite_oficiales SET Nombre = ? WHERE Codigo = ?", {
                    transaction: transaction,
                     replacements: [Nombre, Codigo],
                     type: QueryTypes.UPDATE
                    }).then(() => transaction.commit()).catch((error) => {
                        transaction.rollback()
                        return res.send(error)
                    })
                    return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Compra':
            try {
                dbGiama.query("UPDATE comprar_oficiales SET Nombre = ? WHERE Codigo = ?", {
                    transaction: transaction,
                   replacements: [Nombre, Codigo],
                   type: QueryTypes.UPDATE
                }).then(() => transaction.commit()).catch((error) => {
                    transaction.rollback()
                    return res.send(error)
                })
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        case 'Carga': 
            try {
                await dbGiama.query("UPDATE oficialescarga SET Nombre = ? WHERE Codigo = ?", {
                    transaction: transaction,
                   replacements: [Nombre, Codigo],
                   type: QueryTypes.UPDATE
                }).then(() => transaction.commit()).catch((error) => {
                    transaction.rollback()
                    return res.send(error)
                })
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
            
        case 'Patentamiento':
            try {
                await dbGiama.query("UPDATE oficialespatentamiento SET Nombre = ? WHERE Codigo = ?", {
                    transaction: transaction,
                   replacements: [Nombre, Codigo],
                   type: QueryTypes.UPDATE
                }).then(() => transaction.commit()).catch((error) => {
                    transaction.rollback()
                    return res.send(error)
                })
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Asignacion': 
            try {
                await dbGiama.query("UPDATE oficialesasignacion SET Nombre = ? WHERE Codigo = ?", {
                    transaction: transaction,
                   replacements: [Nombre, Codigo],
                   type: QueryTypes.UPDATE
                }).then(() => transaction.commit()).catch((error) => {
                    transaction.rollback()
                    return res.send(error)
                })
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        default:
           return res.send({status: false, message: 'Error'})
    }
}

export const endCommit = async (req, res) => {
    if(transaction.finished === 'commit'){
        res.send('Fueron guardados los cambios')
    }else{
        await transaction.rollback()
        res.send('No fueron guardados los cambios')
        
    }

}


export const createOficiales = async (req, res) => {

    const {categoria, Nombre} = req.body
    const dbGiama = app.get('db')
    console.log(req.body)

    switch (categoria) {
        case 'Licitaciones':
                try {
                    await dbGiama.query("INSERT INTO oficialeslicitaciones (Nombre) VALUES (?)", {
                        replacements: [Nombre],
                        type: QueryTypes.INSERT
                    })
                    return res.send({status: true, message: 'Creado correctamente!'})
                    
                } catch (error) {
                    console.log(error)
                    return res.send({status: false, message: 'Hubo un problema'})
                }   

        case 'Adjudicaciones':
                try {
                    await dbGiama.query("INSERT INTO oficialesadjudicacion (Nombre) VALUES (?)", {
                       replacements: [Nombre],
                       type: QueryTypes.INSERT
                    })
                    return res.send({status: true, message: 'Creado correctamente!'})
                    
                } catch (error) {
                    console.log(error)
                    return res.send({status: false, message: 'Hubo un problema'})
                }
        
        case 'Canje':
            try {
                await dbGiama.query("INSERT INTO oficialesplancanje (Nombre) VALUES (?)", {
                   replacements: [Nombre],
                   type: QueryTypes.INSERT
                })
                return res.send({status: true, message: 'Creado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        case 'Scoring':
            try {
                await dbGiama.query("INSERT INTO oficialesscoring (Nombre) VALUES (?)", {
                   replacements: [Nombre],
                   type: QueryTypes.INSERT
                })
                return res.send({status: true, message: 'Creado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Mora':
            try {
                await dbGiama.query("INSERT INTO oficialesmora (Nombre) VALUES (?)", {
                       replacements: [Nombre],
                       type: QueryTypes.INSERT
                    })
                    return res.send({status: true, message: 'Creado correctamente!'})
                
            } catch (error) {
                
            }

        case 'Subite':
            try {
                await dbGiama.query("INSERT INTO subite_oficiales (Nombre) VALUES (?)", {
                     replacements: [Nombre],
                     type: QueryTypes.INSERT
                    })
                    return res.send({status: true, message: 'Creado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Compra':
            try {
                dbGiama.query("INSERT INTO comprar_oficiales (Nombre) VALUES (?)", {
                   replacements: [Nombre],
                   type: QueryTypes.INSERT
                })
                return res.send({status: true, message: 'Creado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        case 'Carga': 
            try {
                await dbGiama.query("INSERT INTO oficialescarga (Nombre) VALUES (?)", {
                   replacements: [Nombre],
                   type: QueryTypes.INSERT
                })
                return res.send({status: true, message: 'Creado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
            
        case 'Patentamiento':
            try {
                await dbGiama.query("INSERT INTO oficialespatentamiento (Nombre) VALUES (?)", {
                   replacements: [Nombre],
                   type: QueryTypes.INSERT
                })
                return res.send({status: true, message: 'Creado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Asignacion': 
            try {
                await dbGiama.query("INSERT INTO oficialesasignacion (Nombre) VALUES (?)", {
                   replacements: [Nombre],
                   type: QueryTypes.INSERT
                })
                return res.send({status: true, message: 'Creado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        default:
           return res.send({status: false, message: 'Error'})
    }
}

export const getOficialesById = async (req, res) => {

    const {categoria, Codigo} = req.body
    const dbGiama = app.get('db')

    transaction = await dbGiama.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        autocommit:false
      })

    switch (categoria) {
        case 'Licitaciones':
            const queryLic = () => {
                return new Promise((resolve, reject) => {
                    let oficial = dbGiama.query("SELECT * FROM oficialeslicitaciones WHERE Codigo = ? FOR UPDATE", 
                    {
                        transaction: transaction,
                        replacements: [Codigo],
                        type: QueryTypes.SELECT
                    })
        
                    resolve(oficial)
                })
            }
            const responseLic = await awaitWithTimeout(4000, queryLic()) 

            res.send(responseLic) 

        case 'Adjudicaciones':
            const queryAdj = () => {
                return new Promise((resolve, reject) => {
                    let oficial = dbGiama.query("SELECT * FROM oficialesadjudicacion WHERE Codigo = ? FOR UPDATE", 
                    {
                        transaction: transaction,
                        replacements: [Codigo],
                        type: QueryTypes.SELECT
                    })
        
                    resolve(oficial)
                })
            }
            const responseAdj = await awaitWithTimeout(4000, queryAdj()) 

            res.send(responseAdj) 
                
        
        case 'Canje':
            const queryCanje = () => {
                return new Promise((resolve, reject) => {
                    let oficial = dbGiama.query("SELECT * FROM oficialesplancanje WHERE Codigo = ? FOR UPDATE", 
                    {
                        transaction: transaction,
                        replacements: [Codigo],
                        type: QueryTypes.SELECT
                    })
        
                    resolve(oficial)
                })
            }
            const responseCanje = await awaitWithTimeout(4000, queryCanje()) 

            res.send(responseCanje) 
            

        case 'Scoring':
            const queryScoring = () => {
                return new Promise((resolve, reject) => {
                    let oficial = dbGiama.query("SELECT * FROM oficialesscoring WHERE Codigo = ? FOR UPDATE", 
                    {
                        transaction: transaction,
                        replacements: [Codigo],
                        type: QueryTypes.SELECT
                    })
        
                    resolve(oficial)
                })
            }
            const responseScoring = await awaitWithTimeout(4000, queryScoring()) 

            res.send(responseScoring) 
            
        case 'Mora':
            const queryMora = () => {
                return new Promise((resolve, reject) => {
                    let oficial = dbGiama.query("SELECT * FROM oficialesmora WHERE Codigo = ? FOR UPDATE", 
                    {
                        transaction: transaction,
                        replacements: [Codigo],
                        type: QueryTypes.SELECT
                    })
        
                    resolve(oficial)
                })
            }
            const responseMora = await awaitWithTimeout(4000, queryMora()) 

            res.send(responseMora) 

        case 'Subite':
            const querySubite = () => {
                return new Promise((resolve, reject) => {
                    let oficial = dbGiama.query("SELECT * FROM subite_oficiales WHERE Codigo = ? FOR UPDATE", 
                    {
                        transaction: transaction,
                        replacements: [Codigo],
                        type: QueryTypes.SELECT
                    })
        
                    resolve(oficial)
                })
            }
            const responseSubite = await awaitWithTimeout(4000, querySubite()) 

            res.send(responseSubite) 

            
        case 'Compra':
            const queryCompra = () => {
                return new Promise((resolve, reject) => {
                    let oficial = dbGiama.query("SELECT * FROM comprar_oficiales WHERE Codigo = ? FOR UPDATE", 
                    {
                        transaction: transaction,
                        replacements: [Codigo],
                        type: QueryTypes.SELECT
                    })
        
                    resolve(oficial)
                })
            }
            const responseCompra = await awaitWithTimeout(4000, queryCompra()) 

            res.send(responseCompra) 
            

        case 'Carga': 
        const queryCarga = () => {
            return new Promise((resolve, reject) => {
                let oficial = dbGiama.query("SELECT * FROM oficialescarga WHERE Codigo = ? FOR UPDATE", 
                {
                    transaction: transaction,
                    replacements: [Codigo],
                    type: QueryTypes.SELECT
                })
    
                resolve(oficial)
            })
        }
        const responseCarga = await awaitWithTimeout(4000, queryCarga()) 

        res.send(responseCarga) 
            
        case 'Patentamiento':
            const queryPat = () => {
                return new Promise((resolve, reject) => {
                    let oficial = dbGiama.query("SELECT * FROM oficialespatentamiento WHERE Codigo = ? FOR UPDATE", 
                    {
                        transaction: transaction,
                        replacements: [Codigo],
                        type: QueryTypes.SELECT
                    })
        
                    resolve(oficial)
                })
            }
            const responsePat = await awaitWithTimeout(4000, queryPat()) 
    
            res.send(responsePat) 
            
        case 'Asignacion': 
        const queryAs = () => {
            return new Promise((resolve, reject) => {
                let oficial = dbGiama.query("SELECT * FROM oficialesasignacion WHERE Codigo = ? FOR UPDATE", 
                {
                    transaction: transaction,
                    replacements: [Codigo],
                    type: QueryTypes.SELECT
                })
    
                resolve(oficial)
            })
        }
        const responseAs = await awaitWithTimeout(4000, queryAs()) 

        res.send(responseAs) 
            
        default:
           return res.send({status: false, message: 'Error'})
    }
}