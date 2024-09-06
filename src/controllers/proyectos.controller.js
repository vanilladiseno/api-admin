import { proyecto } from '../models/proyecto.model.js';
import { galeria } from '../models/galeria.model.js';


const addProyecto = async(req , res) => {

    const 
    {
        nombre, 
        descripcion, 
        id_cliente, 
        id_servicio, 
        id_alianza,
        id_categoria_extra,
        anio, 
        ubicacion, 
        destacado
    } = req.body;

    try {
        const newProyecto = await proyecto.create({
            nombre,
            descripcion,
            id_cliente,
            id_servicio,
            id_alianza,
            id_categoria_extra,
            anio,
            ubicacion,
            destacado
        });
    
        res.json({
            "status" : true,
            "response" : newProyecto
        })

    } catch (error) {
        res.json({
                "status" : false,
                "msg"    : 'Error al insertar nuevo proyecto',
                "error"  : error
            })
    }
   
}

const getProyectos = async(req , res) => {
    
    try {

        const proyectos = await proyecto.findAll();

        res.json(proyectos);

    } catch (error) {
        res.json({
            "status" : false,
            "msg"    : 'Error al ejecutar la consulta',
            "error"  : error
        })
    }

}

const insertImageMain = async(req , res) => {

    const {imagen , id} = req.body;

    try {
    
          proyecto.update( 
            {
              imagen : imagen,
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


const insertImageMultiple = async(req , res) => {

    const {imagenes , id} = req.body;
    let insertada;
    let response = [];
    await Promise.all(
        imagenes.map(async (img) => {
            insertada = await galeria.create({
                imagen: img,
                id_proyecto: id
            });
            response.push(insertada);
        })
    )

    res.json({
        "status" : true,
        "response" : insertada
    })

}


export const methods = {
    addProyecto,
    getProyectos,
    insertImageMain,
    insertImageMultiple
}
