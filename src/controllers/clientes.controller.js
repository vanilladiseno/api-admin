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
        const clientes = await cliente.findAll();
        res.json(clientes);

    } catch (error) {
        res.json({
            "status" : false,
            "msg"    : 'Error al ejecutar la consulta',
            "error"  : error
        })
    }
}

const getClienteById = async(req , res) => {
    
    const {id} = req.params;

    try {
        const res_cliente = await cliente.findAll({
            where : {
                id : id
            }
        });
        res.json(res_cliente[0]);

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


const updateClienteById = async(req , res) => {

    const {id} = req.params;
    const {nombre} = req.body;

    cliente.update( 
        {
          nombre : nombre,
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

}

export const methods = {
    addCliente,
    getClientes,
    addLogoCliente,
    getClienteById,
    updateClienteById
}
