import { QueryTypes } from "sequelize";
import awaitWithTimeout from "../helpers/transaction/awaitWithTimeout";
import Sequelize from "sequelize";
import {app} from '../index'


 
 

export const getOficialesByName = async (req, res) => {

    const {oficialName} = req.body
    const dbGiama = req.db


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
    const dbGiama = req.db
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

    const {categoria, Codigo, Nombre, Usuario, Activo, Objetivo, TipoOficialMora, HN, Supervisor} = req.body
    const dbGiama = req.db
    console.log(req.body)

    switch (categoria) {
        case 'Licitaciones':
            try {

            
                 await dbGiama.query("UPDATE oficialeslicitaciones SET Nombre = ?, IdUsuarioLogin = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?", {
                        
                        replacements: [Nombre, Usuario, Activo, Codigo],
                        type: QueryTypes.UPDATE
                    })

                    return res.send({status: true, message: 'Actualizado correctamente!'})
                    
                } catch (error) {
                    console.log(error)
                    return res.send({status: false, message: 'Hubo un problema'})
                }   

        case 'Adjudicacion':
                try {
                    const Inactivo = Activo === 1 ? 0 : 1
                    await dbGiama.query("UPDATE oficialesadjudicacion SET Nombre = ?, Inactivo = ?, inUpdate = NULL WHERE Codigo = ?", {
                    
                       replacements: [Nombre, Inactivo, Codigo],
                       type: QueryTypes.UPDATE
                    }).catch((error) => {
                        
                         console.log(error)
                    })
                    return res.send({status: true, message: 'Actualizado correctamente!'})
                    
                } catch (error) {
                    console.log(error)
                    return res.send({status: false, message: 'Hubo un problema'})
                }
        
        case 'Canje':
            try {
                
                await dbGiama.query("UPDATE oficialesplancanje SET Nombre = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?", {
              
                   replacements: [Nombre, Activo, Codigo],
                   type: QueryTypes.UPDATE
                }).catch((error) => {
                    
                    console.log(error)
                })
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        case 'Scoring':
            try {
                const Inactivo = Activo === 1 ? 0 : 1
                const ObjetivotoNum = Objetivo && parseInt(Objetivo)
                console.log('inactivo: ', Inactivo)
                await dbGiama.query("UPDATE oficialesscoring SET Nombre = ?, IdUsuarioLogin = ?, Inactivo = ?, Objetivo = ?, inUpdate = NULL WHERE Codigo = ?", {

                   replacements: [Nombre, Usuario, Inactivo, Objetivo? ObjetivotoNum : 0, Codigo],
                   type: QueryTypes.UPDATE
                }).catch((error) => {
                    console.log(error)
                    
                    
                })
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Mora':
            const toNumber = parseInt(TipoOficialMora)
            try {
                await dbGiama.query("UPDATE oficialesmora SET Nombre = ?, IdUsuarioLogin = ?, TipoOficialMora = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?", {
                       replacements: [Nombre, Usuario, toNumber, Activo, Codigo],
                       type: QueryTypes.UPDATE
                    }).catch((error) => {
                        
                        console.log(error)
                        
                    })
                    return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        case 'Subite':
            try {
                const HNtoNumber = parseInt(HN)
                const SupervisorToNumber = parseInt(Supervisor)
                await dbGiama.query("UPDATE subite_oficiales SET Nombre = ?, login = ?, HNMayor40 = ?, Supervisor = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?", {
                     replacements: [Nombre, Usuario, HNtoNumber, SupervisorToNumber, Activo, Codigo],
                     type: QueryTypes.UPDATE
                    }).catch((error) => {
                        
                        console.log(error)
                    })
                    return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Compra':
             const HNtoNumber = parseInt(HN) 
            try {
                dbGiama.query("UPDATE comprar_oficiales SET Nombre = ?, login = ?, HNMayor40 = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?", {
                   replacements: [Nombre, Usuario, HN, Activo, Codigo],
                   type: QueryTypes.UPDATE
                }).catch((error) => {
                    
                    console.log(error)
                })
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        case 'Carga': 
            try {
                await dbGiama.query("UPDATE oficialescarga SET Nombre = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?", {
                   replacements: [Nombre, Activo, Codigo],
                   type: QueryTypes.UPDATE
                })
                
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
            
        case 'Patentamiento':
            try {
                await dbGiama.query("UPDATE oficialespatentamiento SET Nombre = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?", {
                   replacements: [Nombre, Activo, Codigo],
                   type: QueryTypes.UPDATE
                }).catch((error) => {
                    
                    console.log(error)
                })
                return res.send({status: true, message: 'Actualizado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Asignacion': 
            try {
                await dbGiama.query("UPDATE oficialesasignacion SET Nombre = ?, Activo = ?, inUpdate = NULL WHERE Codigo = ?", {

                   replacements: [Nombre, Activo, Codigo],
                   type: QueryTypes.UPDATE
                }).catch((error) => {
                    
                    console.log(error)
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

    const {categoria, Nombre, Usuario, Activo, Objetivo, TipoOficialMora, HN, Supervisor}  = req.body
    const dbGiama = req.db
   
    console.log(req.body)

    switch (categoria) {
        case 'Licitaciones':
                try {
                    await dbGiama.query("INSERT INTO oficialeslicitaciones (Nombre, IdUsuarioLogin, Activo) VALUES (?,?,?)", {
                        replacements: [Nombre, Usuario, Activo],
                        type: QueryTypes.INSERT
                    })
                    return res.send({status: true, message: 'Creado correctamente!'})
                    
                } catch (error) {
                    console.log(error)
                    return res.send({status: false, message: 'Hubo un problema'})
                }   

        case 'Adjudicaciones':
                try {
                    const Inactivo = Activo === 1 ? 0 : 1
                    await dbGiama.query("INSERT INTO oficialesadjudicacion (Nombre, Inactivo) VALUES (?,?)", {
                       replacements: [Nombre, Inactivo],
                       type: QueryTypes.INSERT
                    })
                    return res.send({status: true, message: 'Creado correctamente!'})
                    
                } catch (error) {
                    console.log(error)
                    return res.send({status: false, message: 'Hubo un problema'})
                }
        
        case 'Plan Canje':
            try {
                await dbGiama.query("INSERT INTO oficialesplancanje (Nombre, Activo) VALUES (?,?)", {
                   replacements: [Nombre, Activo],
                   type: QueryTypes.INSERT
                })
                return res.send({status: true, message: 'Creado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        case 'Scoring':
            const Inactivo = Activo === 1 ? 0 : 1
            const ObjetivotoNum = Objetivo && parseInt(Objetivo)
            try {
                await dbGiama.query("INSERT INTO oficialesscoring (Nombre, IdUsuarioLogin, Inactivo, Objetivo) VALUES (?,?,?,?)", {
                   replacements: [Nombre, Usuario, Inactivo, Objetivo? ObjetivotoNum : 0],
                   type: QueryTypes.INSERT
                })
                return res.send({status: true, message: 'Creado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Mora':
            const toNumber = parseInt(TipoOficialMora)
            try {
                await dbGiama.query("INSERT INTO oficialesmora (Nombre, IdUsuarioLogin, TipoOficialMora, Activo) VALUES (?,?,?,?)", {
                       replacements: [Nombre, Usuario, toNumber, Activo],
                       type: QueryTypes.INSERT
                    })
                    return res.send({status: true, message: 'Creado correctamente!'})
                
            } catch (error) {
                
            }

        case 'Subite':
                const HNtoNumber = parseInt(HN)
                const SupervisorToNumber = parseInt(Supervisor)
            try {
                await dbGiama.query("INSERT INTO subite_oficiales (Nombre, login, HNMayor40, Supervisor, Activo) VALUES (?,?,?,?,?)", {
                     replacements: [Nombre, Usuario, HNtoNumber, SupervisorToNumber, Activo],
                     type: QueryTypes.INSERT
                    })
                    return res.send({status: true, message: 'Creado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Compra':
            const HNCompratoNumber = parseInt(HN)
            try {
                dbGiama.query("INSERT INTO comprar_oficiales (Nombre, login, HNMayor40, Activo) VALUES (?,?,?,?)", {
                   replacements: [Nombre, Usuario, HNCompratoNumber, Activo],
                   type: QueryTypes.INSERT
                })
                return res.send({status: true, message: 'Creado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }

        case 'Carga': 
            try {
                await dbGiama.query("INSERT INTO oficialescarga (Nombre, Activo) VALUES (?,?)", {
                   replacements: [Nombre, Activo],
                   type: QueryTypes.INSERT
                })
                return res.send({status: true, message: 'Creado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
            
        case 'Patentamiento':
            try {
                await dbGiama.query("INSERT INTO oficialespatentamiento (Nombre, Activo) VALUES (?,?)", {
                   replacements: [Nombre, Activo],
                   type: QueryTypes.INSERT
                })
                return res.send({status: true, message: 'Creado correctamente!'})
                
            } catch (error) {
                console.log(error)
                return res.send({status: false, message: 'Hubo un problema'})
            }
        
        case 'Asignacion': 
            try {
                await dbGiama.query("INSERT INTO oficialesasignacion (Nombre, Activo) VALUES (?,?)", {
                   replacements: [Nombre, Activo],
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
    const dbGiama = req.db
    const {user} = req.usuario
    console.log('USER', user)
      
      
      switch (categoria) {
          case 'Licitaciones':
            try {
                const oficialPrev = await dbGiama.query("SELECT * FROM oficialeslicitaciones WHERE Codigo = ?", 
                 {
                     replacements: [Codigo],
                     type: QueryTypes.SELECT
                 })
                 if(oficialPrev[0].inUpdate) {
                    return res.send({status: false, message: `Campo ocupado por ${oficialPrev[0].inUpdate} `})
                 }
            
              
           try {
                await dbGiama.query("UPDATE oficialeslicitaciones SET inUpdate = ? WHERE Codigo = ?",  {
                    replacements: [user, Codigo],
                    type: QueryTypes.UPDATE
                    })

                    return res.send(oficialPrev)
            } catch (error) {
              console.log('error:', error)
                return res.send(error)
                    }
                
               }catch (error) {
                console.log('2nd error', error)
            } 

        case 'Adjudicaciones':
            try {
                const oficialPrev = await dbGiama.query("SELECT * FROM oficialesadjudicacion WHERE Codigo = ?", 
                 {
                     replacements: [Codigo],
                     type: QueryTypes.SELECT
                 })
                 if(oficialPrev[0].inUpdate) {
                    return res.send({status: false, message: `Campo ocupado por ${oficialPrev[0].inUpdate} `})
                 }
            
              
           try {
                await dbGiama.query("UPDATE oficialesadjudicacion SET inUpdate = ? WHERE Codigo = ?",  {
                    replacements: [user, Codigo],
                    type: QueryTypes.UPDATE
                    })

                    return res.send(oficialPrev)
            } catch (error) {
              console.log('error:', error)
                return res.send(error)
                    }
                
               }catch (error) {
                console.log('2nd error', error)
            } 
        case 'Plan Canje':
            try {
                const oficialPrev = await dbGiama.query("SELECT * FROM oficialesplancanje WHERE Codigo = ?", 
                 {
                     replacements: [Codigo],
                     type: QueryTypes.SELECT
                 })
                 if(oficialPrev[0].inUpdate) {
                    return res.send({status: false, message: `Campo ocupado por ${oficialPrev[0].inUpdate} `})
                 }
            
              
           try {
                await dbGiama.query("UPDATE oficialesplancanje SET inUpdate = ? WHERE Codigo = ?",  {
                    replacements: [user, Codigo],
                    type: QueryTypes.UPDATE
                    })

                    return res.send(oficialPrev)
            } catch (error) {
              console.log('error:', error)
                return res.send(error)
                    }
                
               }catch (error) {
                console.log('2nd error', error)
            } 
            
            

        case 'Scoring':
            try {
                const oficialPrev = await dbGiama.query("SELECT * FROM oficialesscoring WHERE Codigo = ?", 
                 {
                     replacements: [Codigo],
                     type: QueryTypes.SELECT
                 })
                 if(oficialPrev[0].inUpdate) {
                    return res.send({status: false, message: `Campo ocupado por ${oficialPrev[0].inUpdate} `})
                 }
            
              
           try {
                await dbGiama.query("UPDATE oficialesscoring SET inUpdate = ? WHERE Codigo = ?",  {
                    replacements: [user, Codigo],
                    type: QueryTypes.UPDATE
                    })

                    return res.send(oficialPrev)
            } catch (error) {
              console.log('error:', error)
                return res.send(error)
                    }
                
               }catch (error) {
                console.log('2nd error', error)
            } 
            
        case 'Mora':
            try {
                const oficialPrev = await dbGiama.query("SELECT * FROM oficialesmora WHERE Codigo = ?", 
                 {
                     replacements: [Codigo],
                     type: QueryTypes.SELECT
                 })
                 if(oficialPrev[0].inUpdate) {
                    return res.send({status: false, message: `Campo ocupado por ${oficialPrev[0].inUpdate} `})
                 }
            
              
           try {
                await dbGiama.query("UPDATE oficialesmora SET inUpdate = ? WHERE Codigo = ?",  {
                    replacements: [user, Codigo],
                    type: QueryTypes.UPDATE
                    })

                    return res.send(oficialPrev)
            } catch (error) {
              console.log('error:', error)
                return res.send(error)
                    }
                
               }catch (error) {
                console.log('2nd error', error)
            } 
        case 'Subite':
            try {
                const oficialPrev = await dbGiama.query("SELECT * FROM subite_oficiales WHERE Codigo = ?", 
                 {
                     replacements: [Codigo],
                     type: QueryTypes.SELECT
                 })
                 if(oficialPrev[0].inUpdate) {
                    return res.send({status: false, message: `Campo ocupado por ${oficialPrev[0].inUpdate} `})
                 }
            
              
           try {
                await dbGiama.query("UPDATE subite_oficiales SET inUpdate = ? WHERE Codigo = ?",  {
                    replacements: [user, Codigo],
                    type: QueryTypes.UPDATE
                    })

                    return res.send(oficialPrev)
            } catch (error) {
              console.log('error:', error)
                return res.send(error)
                    }
                
               }catch (error) {
                console.log('2nd error', error)
            } 
           
            
        case 'Compra':      
            try {
                const oficialPrev = await dbGiama.query("SELECT * FROM comprar_oficiales WHERE Codigo = ?", 
                 {
                     replacements: [Codigo],
                     type: QueryTypes.SELECT
                 })
                 if(oficialPrev[0].inUpdate) {
                    return res.send({status: false, message: `Campo ocupado por ${oficialPrev[0].inUpdate} `})
                 }
            
              
           try {
                await dbGiama.query("UPDATE comprar_oficiales SET inUpdate = ? WHERE Codigo = ?",  {
                    replacements: [user, Codigo],
                    type: QueryTypes.UPDATE
                    })

                    return res.send(oficialPrev)
            } catch (error) {
              console.log('error:', error)
                return res.send(error)
                    }
                
               }catch (error) {
                console.log('2nd error', error)
            } 
            
        case 'Carga': 
                try {
                    const oficialPrev = await dbGiama.query("SELECT * FROM oficialescarga WHERE Codigo = ?", 
                     {
                         replacements: [Codigo],
                         type: QueryTypes.SELECT
                     })
                     if(oficialPrev[0].inUpdate) {
                        return res.send({status: false, message: `Campo ocupado por ${oficialPrev[0].inUpdate} `})
                     }
                
                  
               try {
               await dbGiama.query("UPDATE oficialescarga SET inUpdate = ? WHERE Codigo = ?",  {
              replacements: [user, Codigo],
               type: QueryTypes.UPDATE
                  })

                return res.send(oficialPrev)
               } catch (error) {
                  console.log('error:', error)
               return res.send(error)
                        }
                    
                   }catch (error) {
                    console.log('2nd error', error)
                } 
                       
        case 'Patentamiento':
            try {
                const oficialPrev = await dbGiama.query("SELECT * FROM oficialespatentamiento WHERE Codigo = ?", 
                 {
                     replacements: [Codigo],
                     type: QueryTypes.SELECT
                 })
                 if(oficialPrev[0].inUpdate) {
                    return res.send({status: false, message: `Campo ocupado por ${oficialPrev[0].inUpdate} `})
                 }
            
              
           try {
           await dbGiama.query("UPDATE oficialespatentamiento SET inUpdate = ? WHERE Codigo = ?",  {
          replacements: [user, Codigo],
           type: QueryTypes.UPDATE
              })

            return res.send(oficialPrev)
           } catch (error) {
              console.log('error:', error)
           return res.send(error)
                    }
                
               }catch (error) {
                console.log('2nd error', error)
            } 
            
        case 'Asignacion': 
        try {
            const oficialPrev = await dbGiama.query("SELECT * FROM oficialesasignacion WHERE Codigo = ? ", 
             {
                 replacements: [Codigo],
                 type: QueryTypes.SELECT
             })
             if(oficialPrev[0].inUpdate) {
                return res.send({status: false, message: `Campo ocupado por ${oficialPrev[0].inUpdate} `})
             }
        
          
       try {
       await dbGiama.query("UPDATE oficialesasignacion SET inUpdate = ? WHERE Codigo = ?",  {
      replacements: [user, Codigo],
       type: QueryTypes.UPDATE
          })

        return res.send(oficialPrev)
       } catch (error) {
          console.log('error:', error)
       return res.send(error)
                }
            
           }catch (error) {
            console.log('2nd error', error)
        } 
        
            
        default:
           return res.send({status: false, message: 'Error'})
    }
}

export const endUpdate = async (req, res) => {
    const {categoria, Codigo} = req.body
    const dbGiama = req.db
    const {user} = req.usuario

    switch (categoria) {
        case 'Licitaciones':
            try {
                const actualOficial = await dbGiama.query("SELECT * FROM oficialeslicitaciones WHERE Codigo = ?", 
                {
                    replacements: [Codigo],
                    type: QueryTypes.SELECT
                })
                if(actualOficial[0].inUpdate === user){
                    await dbGiama.query("UPDATE oficialeslicitaciones SET inUpdate = NULL WHERE Codigo = ?", {
                        replacements: [Codigo],
                        type: QueryTypes.UPDATE
                    })
                    return res.send('endUpdate OK!')
                }else{
                    return
                }
            } catch (error) {
                return res.send(error)
            }
            case 'Adjudicaciones':
                try {
                    const actualOficial = await dbGiama.query("SELECT * FROM oficialesadjudicacion WHERE Codigo = ?", 
                    {
                        replacements: [Codigo],
                        type: QueryTypes.SELECT
                    })
                    if(actualOficial[0].inUpdate === user){
                        await dbGiama.query("UPDATE oficialesadjudicacion SET inUpdate = NULL WHERE Codigo = ?", {
                            replacements: [Codigo],
                            type: QueryTypes.UPDATE
                        })
                        return res.send('endUpdate OK!')
                    }else{
                        return
                    }
                } catch (error) {
                    return res.send(error)
                }
                case 'Plan Canje':
                    try {
                        const actualOficial = await dbGiama.query("SELECT * FROM oficialesplancanje WHERE Codigo = ?", 
                        {
                            replacements: [Codigo],
                            type: QueryTypes.SELECT
                        })
                        if(actualOficial[0].inUpdate === user){
                            await dbGiama.query("UPDATE oficialesplancanje SET inUpdate = NULL WHERE Codigo = ?", {
                                replacements: [Codigo],
                                type: QueryTypes.UPDATE
                            })
                            return res.send('endUpdate OK!')
                        }else{
                            return
                        }
                    } catch (error) {
                        return res.send(error)
                    }
                    case 'Scoring':
                        try {
                            const actualOficial = await dbGiama.query("SELECT * FROM oficialesscoring WHERE Codigo = ?", 
                            {
                                replacements: [Codigo],
                                type: QueryTypes.SELECT
                            })
                            if(actualOficial[0].inUpdate === user){
                                await dbGiama.query("UPDATE oficialesscoring SET inUpdate = NULL WHERE Codigo = ?", {
                                    replacements: [Codigo],
                                    type: QueryTypes.UPDATE
                                })
                                return res.send('endUpdate OK!')
                            }else{
                                return
                            }
                        } catch (error) {
                           return res.send(error)
                        }
                        case 'Mora':
                            try {
                                const actualOficial = await dbGiama.query("SELECT * FROM oficialesmora WHERE Codigo = ?", 
                                {
                                    replacements: [Codigo],
                                    type: QueryTypes.SELECT
                                })
                                if(actualOficial[0].inUpdate === user){
                                    await dbGiama.query("UPDATE oficialesmora SET inUpdate = NULL WHERE Codigo = ?", {
                                        replacements: [Codigo],
                                        type: QueryTypes.UPDATE
                                    })
                                    return res.send('endUpdate OK!')
                                }else{
                                    return
                                }
                            } catch (error) {
                                return res.send(error)
                            }
        case 'Subite':
            try {
                const actualOficial = await dbGiama.query("SELECT * FROM subite_oficiales WHERE Codigo = ?", 
                {
                    replacements: [Codigo],
                    type: QueryTypes.SELECT
                })
                if(actualOficial[0].inUpdate === user){
                    await dbGiama.query("UPDATE subite_oficiales SET inUpdate = NULL WHERE Codigo = ?", {
                        replacements: [Codigo],
                        type: QueryTypes.UPDATE
                    })
                    return res.send('endUpdate OK!')
                }else{
                    return
                }
            } catch (error) {
                return res.send(error)
            }
            case 'Compra':
                try {
                    const actualOficial = await dbGiama.query("SELECT * FROM comprar_oficiales WHERE Codigo = ?", 
                    {
                        replacements: [Codigo],
                        type: QueryTypes.SELECT
                    })
                    if(actualOficial[0].inUpdate === user){
                        await dbGiama.query("UPDATE comprar_oficiales SET inUpdate = NULL WHERE Codigo = ?", {
                            replacements: [Codigo],
                            type: QueryTypes.UPDATE
                        })
                        return res.send('endUpdate OK!')
                    }else{
                        return
                    }
                } catch (error) {
                    return res.send(error)
                }
        case 'Compra':
            try {
                const actualOficial = await dbGiama.query("SELECT * FROM comprar_oficiales WHERE Codigo = ?", 
                {
                replacements: [Codigo],
                type: QueryTypes.SELECT
                })
                if(actualOficial[0].inUpdate === user){
                    await dbGiama.query("UPDATE comprar_oficiales SET inUpdate = NULL WHERE Codigo = ?", {
                        replacements: [Codigo],
                        type: QueryTypes.UPDATE
                    })
                    return res.send('endUpdate OK!')
            }else{
                    return
                }
            } catch (error) {
                    return res.send(error)
            }
        case 'Compra':
            try {
                const actualOficial = await dbGiama.query("SELECT * FROM comprar_oficiales WHERE Codigo = ?", 
                {
                replacements: [Codigo],
                type: QueryTypes.SELECT
                })
                if(actualOficial[0].inUpdate === user){
                    await dbGiama.query("UPDATE comprar_oficiales SET inUpdate = NULL WHERE Codigo = ?", {
                        replacements: [Codigo],
                        type: QueryTypes.UPDATE
                    })
                    return res.send('endUpdate OK!')
            }else{
                    return
                }
            } catch (error) {
                    return res.send(error)
            }    
        case 'Carga':
            try {
                const actualOficial = await dbGiama.query("SELECT * FROM oficialescarga WHERE Codigo = ?", 
                {
                replacements: [Codigo],
                type: QueryTypes.SELECT
                })
                if(actualOficial[0].inUpdate === user){
                    await dbGiama.query("UPDATE oficialescarga SET inUpdate = NULL WHERE Codigo = ?", {
                        replacements: [Codigo],
                        type: QueryTypes.UPDATE
                    })
                    return res.send('endUpdate OK!')
            }else{
                    return
                }
            } catch (error) {
                    return res.send(error)
            }
        case 'Patentamiento':
                try {
                    const actualOficial = await dbGiama.query("SELECT * FROM oficialespatentamiento WHERE Codigo = ?", 
                    {
                    replacements: [Codigo],
                    type: QueryTypes.SELECT
                    })
                    if(actualOficial[0].inUpdate === user){
                        await dbGiama.query("UPDATE oficialespatentamiento SET inUpdate = NULL WHERE Codigo = ?", {
                            replacements: [Codigo],
                            type: QueryTypes.UPDATE
                        })
                        return res.send('endUpdate OK!')
                }else{
                        return
                    }
                } catch (error) {
                        return res.send(error)
                }
        case 'Asignacion':
                try {
                const actualOficial = await dbGiama.query("SELECT * FROM oficialesasignacion WHERE Codigo = ?", 
                        {
                        replacements: [Codigo],
                        type: QueryTypes.SELECT
                        })
                        if(actualOficial[0].inUpdate === user){
                            await dbGiama.query("UPDATE oficialesasignacion SET inUpdate = NULL WHERE Codigo = ?", {
                                replacements: [Codigo],
                                type: QueryTypes.UPDATE
                            })
                            return res.send('endUpdate OK!')
                    }else{
                            return res.send('error DB')
                        }
                    } catch (error) {
                            return res.send(error)
                    }
    
        default:
           res.send('Some error endUpdate')
    }
}