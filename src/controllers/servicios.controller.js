import { servicio } from '../models/servicio.model.js';

const addService = async(req , res) => {

    const {nombre} = req.body;

    try {
        const newService = await servicio.create({
            nombre
        });
    
        res.json({
            "status" : true,
            "response" : newService
        })
        
    } catch (error) {
        res.json({
                "status" : false,
                "msg"    : 'Error al insertar nuevo servicio',
                "error"  : error
            })
    }
   
}

const getService = async(req , res) => {
    
    try {
        const servicios = await servicio.findAll();
        res.json(servicios);

    } catch (error) {
        res.json({
            "status" : false,
            "msg"    : 'Error al ejecutar la consulta',
            "error"  : error
        })
    }

}

const getServiceById = async(req , res) => {
    try {

        const {id} = req.params;

        const res_servicio = await servicio.findAll({
            where : {
                id : id
            }
        });
        res.json(res_servicio[0]);

    } catch (error) {
        res.json({
            "status" : false,
            "msg"    : 'Error al ejecutar la consulta',
            "error"  : error
        })
    }
}

export const methods = {
    addService,
    getService,
    getServiceById
}

