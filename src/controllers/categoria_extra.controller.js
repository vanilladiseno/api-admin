import { categoria_extra } from '../models/categoria_extra.js';

const getCategoriaExtra = async(req , res) => {

    try {
        const response_categoria_extra = await categoria_extra.findAll();
        res.json(response_categoria_extra);

    } catch (error) {
        res.json({
            "status" : false,
            "msg"    : 'Error al ejecutar la consulta',
            "error"  : error
        })
    }
   
}

export const methods = {
    getCategoriaExtra
}
