import { cliente } from '../models/cliente.model.js';

const addCliente = async(req , res) => {

    const {nombre} = req.body;

    try {
        const newCliente = await cliente.create({
            nombre
        });
    
        res.json({
            "status" : true,
            "response" : newCliente
        })
        
    } catch (error) {
        res.json({
                "status" : false,
                "msg"    : 'Error al insertar nuevo cliente',
                "error"  : error
            })
    }
   
}

const getClientes = async(req , res) => {
    
    try {
        const cursos = await cliente.findAll();
        res.json(cursos);

    } catch (error) {
        res.json({
            "status" : false,
            "msg"    : 'Error al ejecutar la consulta',
            "error"  : error
        })
    }
}

const addLogoCliente = async(req , res) => {

    const {imagen , id} = req.body;

    console.log(req.body);

    try {
    
          cliente.update( 
            {
              logo : imagen,
            },
            {
              where : {
                id: id
              }
            }
            ).then((result) => {
            
                res.json({
                    "status" : true,
                    "response" : result
                })

            })
            .catch((error) =>{
                
                res.json({
                    "status" : false,
                    "response" : error
                })

            });
        

    } catch (error) {
        res.json({
            "status" : false,
            "msg"    : 'Error al insertar la imagen principal',
            "error"  : error
        })
    }

}

export const methods = {
    addCliente,
    getClientes,
    addLogoCliente
}
