import { QueryTypes } from "sequelize";
import {app} from '../index'

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
                        replacements: [Nombre, Codigo],
                        type: QueryTypes.UPDATE
                    })
                    return res.send({status: true, message: 'Actualizado correctamente!'})
                    
                } catch (error) {
                    console.log(error)
                    return res.send({status: false, message: 'Hubo un problema'})
                }   

        case 'Adjudicaciones':
                try {
                    await dbGiama.query("UPDATE oficialesadjudicacion SET Nombre = ? WHERE Codigo = ?", {
                       replacements: [Nombre, Codigo],
                       type: QueryTypes.UPDATE
                    })
                    return res.send({status: true, message: 'Actualizado correctamente!'})
                    
                } catch (error) {
                    console.log(error)
                    return res.send({status: false, message: 'Hubo un problema'})
                }
        
        case 'Canje':
            try {
                await dbGiama.query("UPDATE oficialesplancanje SET Nombre = ? WHERE Codigo = ?", {
                   replacements: [Nombre, Codigo],
                   type: QueryTypes.UPDATE
                })
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        case 'Scoring':
            try {
                await dbGiama.query("UPDATE oficialesscoring SET Nombre = ? WHERE Codigo = ?", {
                   replacements: [Nombre, Codigo],
                   type: QueryTypes.UPDATE
                })
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Mora':
            try {
                await dbGiama.query("UPDATE oficialesmora SET Nombre = ? WHERE Codigo = ?", {
                       replacements: [Nombre, Codigo],
                       type: QueryTypes.UPDATE
                    })
                    return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                
            }

        case 'Subite':
            try {
                await dbGiama.query("UPDATE subite_oficiales SET Nombre = ? WHERE Codigo = ?", {
                     replacements: [Nombre, Codigo],
                     type: QueryTypes.UPDATE
                    })
                    return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Compra':
            try {
                dbGiama.query("UPDATE comprar_oficiales SET Nombre = ? WHERE Codigo = ?", {
                   replacements: [Nombre, Codigo],
                   type: QueryTypes.UPDATE
                })
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        case 'Carga': 
            try {
                await dbGiama.query("UPDATE oficialescarga SET Nombre = ? WHERE Codigo = ?", {
                   replacements: [Nombre, Codigo],
                   type: QueryTypes.UPDATE
                })
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
            
        case 'Patentamiento':
            try {
                await dbGiama.query("UPDATE oficialespatentamiento SET Nombre = ? WHERE Codigo = ?", {
                   replacements: [Nombre, Codigo],
                   type: QueryTypes.UPDATE
                })
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Asignacion': 
            try {
                await dbGiama.query("UPDATE oficialesasignacion SET Nombre = ? WHERE Codigo = ?", {
                   replacements: [Nombre, Codigo],
                   type: QueryTypes.UPDATE
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
    console.log(req.body)

    switch (categoria) {
        case 'Licitaciones':
                try {
                    const oficial = await dbGiama.query("SELECT * FROM oficialeslicitaciones WHERE Codigo = ?", {
                        replacements: [Codigo],
                        type: QueryTypes.SELECT
                    })
                    return res.send(oficial[0])
                    
                } catch (error) {
                    console.log(error)
                    return res.send({status: false, message: 'Hubo un problema'})
                }   

        case 'Adjudicaciones':
                try {
                    const oficial = await dbGiama.query("SELECT * FROM oficialesadjudicacion WHERE Codigo = ?", {
                       replacements: [Codigo],
                       type: QueryTypes.SELECT
                    })
                    return res.send(oficial[0])
                    
                } catch (error) {
                    console.log(error)
                    return res.send({status: false, message: 'Hubo un problema'})
                }
        
        case 'Canje':
            try {
                const oficial = await dbGiama.query("SELECT * FROM oficialesplancanje WHERE Codigo = ?", {
                   replacements: [Codigo],
                   type: QueryTypes.SELECT
                })
                return res.send(oficial[0])
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        case 'Scoring':
            try {
                const oficial = await dbGiama.query("SELECT * FROM oficialesscoring WHERE Codigo = ?", {
                   replacements: [Codigo],
                   type: QueryTypes.SELECT
                })
                return res.send(oficial[0])
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Mora':
            try {
                const oficial = await dbGiama.query("SELECT * FROM oficialesmora WHERE Codigo = ?", {
                       replacements: [Codigo],
                       type: QueryTypes.SELECT
                    })
                    return res.send(oficial[0])
                
            } catch (error) {
                
            }

        case 'Subite':
            try {
                const oficial = await dbGiama.query("SELECT * FROM subite_oficiales WHERE Codigo = ?", {
                     replacements: [Codigo],
                     type: QueryTypes.SELECT
                    })
                    return res.send(oficial[0])
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Compra':
            try {
                const oficial = await dbGiama.query("SELECT * FROM comprar_oficiales WHERE Codigo = ?", {
                   replacements: [Codigo],
                   type: QueryTypes.SELECT
                })
                return res.send(oficial[0])
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        case 'Carga': 
            try {
                const oficial = await dbGiama.query("SELECT * FROM oficialescarga WHERE Codigo = ?", {
                   replacements: [Codigo],
                   type: QueryTypes.SELECT
                })
                return res.send(oficial[0])
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
            
        case 'Patentamiento':
            try {
                const oficial = await dbGiama.query("SELECT * FROM oficialespatentamiento WHERE Codigo = ?", {
                   replacements: [Codigo],
                   type: QueryTypes.SELECT
                })
                return res.send(oficial[0])
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Asignacion': 
            try {
                const oficial = await dbGiama.query("SELECT * FROM oficialesasignacion WHERE Codigo = ?", {
                   replacements: [Codigo],
                   type: QueryTypes.SELECT
                })
                return res.send(oficial[0])
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        default:
           return res.send({status: false, message: 'Error'})
    }
}