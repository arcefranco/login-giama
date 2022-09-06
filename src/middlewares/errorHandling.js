import {app} from '../index'

export const errorHandling = (req, res, next) => {
    const dbGiama = app.get('db')
    if(!dbGiama){ 
        return res.status(480).send('No hay base de datos seleccionada')
    }else{
        next()
    }

}