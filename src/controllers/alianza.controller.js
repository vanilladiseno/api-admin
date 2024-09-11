import { alianza } from '../models/alianza.model.js';

const getAlianzas = async(req , res) => {

    try {
        const response_alianza = await alianza.findAll({
            where : {
                estado : "visible"
            }
        });
        res.json(response_alianza);

    } catch (error) {
        res.json({
            "status" : false,
            "msg"    : 'Error al ejecutar la consulta',
            "error"  : error
        })
    }
    
}

export const methods = {
    getAlianzas
}
