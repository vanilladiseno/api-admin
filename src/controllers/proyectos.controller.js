import { proyecto } from '../models/proyecto.model.js';
import { galeria } from '../models/galeria.model.js';
import { alianza } from '../models/alianza.model.js';
import { cliente } from '../models/cliente.model.js';
import { servicio } from '../models/servicio.model.js';
import { categoria_extra } from '../models/categoria_extra.js';

import slugify from 'slugify';

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

        const slug = slugify(nombre, {
            lower: true,
            strict: true,
            replacement: '-'
        });
        
        const newProyecto = await proyecto.create({
            nombre,
            descripcion,
            id_cliente,
            id_servicio,
            ...(id_alianza? { id_alianza } : { id_alianza: 1 }),
            ...(id_categoria_extra? { id_categoria_extra } : { id_categoria_extra: 6 }),
            anio,
            ubicacion,
            ...(destacado? { destacado: true } : { destacado: false }),
            slug
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

        const { 
            nombre_alianza, 
            nombre_categoria, 
            proyectos_destacados
        } = req.body;

        const response_alianza = await alianza.findAll({
            where: {
                nombre : nombre_alianza
            }
        })

        if(response_alianza.length == 1){

            const fullUrl = `${req.protocol}://${req.get('host')}`;

            const response_categoria = await categoria_extra.findAll({
                where: {
                    id_alianza: response_alianza[0].id,
                    ...(nombre_categoria ? { nombre: nombre_categoria } : {})
                },
                attributes: ["id", "nombre"],
                include: [
                    {
                        model: proyecto,
                        where: {
                            ...(proyectos_destacados ? { destacado: proyectos_destacados } : {})
                        },
                        attributes: ["id", "nombre", "descripcion", "anio", "ubicacion", "destacado", "imagen" , "slug"],
                        include: [
                            {
                                model: cliente,
                                attributes: ["id", "nombre", "logo"]
                            },
                            {
                                model: servicio,
                                attributes: ["id", "nombre"]
                            },
                            {
                                model: galeria,
                                attributes: ["id", "imagen"]
                            }
                        ]
                    }
                ],
                order: [
                    [{ model: proyecto }, 'id', 'ASC']
                ]
            });

            const modifiedResponse = response_categoria.map(categoria => {
                categoria.proyectos.forEach(proyecto => {
                    proyecto.imagen = `${fullUrl}/uploads/${proyecto.imagen}`;
                  proyecto.galeria.forEach(galeriaItem => {
                    galeriaItem.imagen = `${fullUrl}/uploads_gallery/${galeriaItem.imagen}`;
                  });
                });
                return categoria;
              });
              
              // Enviar la respuesta modificada
              res.json(modifiedResponse[0]);

        }else{
            res.json({
                "status" : false
            })
        }

       

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

    const response_galeria = await galeria.findAll({
        where : {
            id_proyecto : id
        }
    });

    if(response_galeria.length > 0){
        galeria.destroy({
            where: {
                id_proyecto: id
            }
          })
    }
    

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

const getProyectoById = async(req , res) => {

    try {

        const {id} = req.params;
        const response_proyecto = await proyecto.findAll({
            where : {
                id:id
            },
            attributes: ["id", "nombre","descripcion","anio","ubicacion","imagen","id_categoria_extra", "destacado"],
            include: [
                {
                    model: cliente,
                    attributes: ["id", "nombre", "logo"]
                },
                {
                    model: servicio,
                    attributes: ["id", "nombre"]
                },
                {
                    model: galeria,
                    attributes: ["id", "imagen"]
                }
            ]
        });

        res.json(response_proyecto[0]);

    } catch (error) {
        res.json({
            "status" : false,
            "error" : error
        })
    }

}


const getProyectoBySlug = async(req , res) => {

    try {
    
        const fullUrl = `${req.protocol}://${req.get('host')}`;

        const {slug} = req.params;

        const response_proyecto = await proyecto.findAll({
            where: {
                slug : slug
            },
            attributes: ["id", "nombre","descripcion","anio","ubicacion","imagen"],
            include: [
                {
                    model: cliente,
                    attributes: ["id", "nombre", "logo"]
                },
                {
                    model: servicio,
                    attributes: ["id", "nombre"]
                },
                {
                    model: galeria,
                    attributes: ["id", "imagen"]
                }
            ]

        })


        const modifiedResponse = response_proyecto.map(proyecto => {
            // Si 'proyecto' tiene una propiedad 'imagen', modifícalo
            if (proyecto.imagen) {
              proyecto.imagen = `${fullUrl}/uploads/${proyecto.imagen}`;
            }
          
            // Asegúrate de que la galería esté definida antes de recorrerla
            if (proyecto.galeria) {
              proyecto.galeria.forEach(galeriaItem => {
                if (galeriaItem.imagen) {
                  galeriaItem.imagen = `${fullUrl}/uploads_gallery/${galeriaItem.imagen}`;
                }
              });
            }

            if (proyecto.cliente) {
                proyecto.cliente.logo = `${fullUrl}/uploads/${proyecto.cliente.logo}`;
            }
          
            return proyecto;
          });



        res.json(modifiedResponse[0]);


    } catch (error) {
        res.json({
            "status" : false,
            "error" : error
        })
    }

}


const getProyectoView = async(req , res) => {

    const {page , pageSize} = req.body;

    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    const response_proyecto = await proyecto.findAndCountAll({
        limit: limit,
        offset: offset,
        attributes: ["id", "nombre", "descripcion", "anio", "ubicacion", "imagen", "destacado"],
        include: [
            {
                model: cliente,
                attributes: ["id", "nombre", "logo"]
            },
            {
                model: servicio,
                attributes: ["id", "nombre"]
            },
            {
                model: galeria,
                attributes: ["id", "imagen"]
            }
        ],
        order: [['id', 'ASC']],
        distinct: true
    });

    const totalPages = Math.ceil(response_proyecto.count / pageSize);

    res.json({
        data: response_proyecto.rows,
        currentPage: page,
        totalPages: totalPages,
        totalItems: response_proyecto.count
    });

}


const updateProyectoById = async (req , res) => {

    const {id} = req.params;

    const {
        nombre,
        descripcion,
        anio,
        ubicacion,
        id_cliente,
        id_servicio,
        destacado,
        id_categoria_extra
    } = req.body;

    const slug = slugify(nombre, {
        lower: true,
        strict: true,
        replacement: '-'
    });

    proyecto.update( 
        {
          nombre                : nombre,
          descripcion           : descripcion,
          anio                  : anio,
          ubicacion             : ubicacion,
          id_cliente            : id_cliente,
          id_servicio           : id_servicio,
          destacado             : destacado,
          id_categoria_extra    : id_categoria_extra,
          slug                  : slug
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

const deleteProyectoById = async (req , res) => {

    const {id} = req.params;

    try {
        const result = await proyecto.destroy({
          where: {
            id: id
          }
        });
    
        if (result) {
            res.json({
                "status" : true,
                "response" : result 
            })
        } else {
            res.json({
                "status" : false,
                "msj" : "No se encontró el proyecto" 
            })
        }
      } catch (error) {
        res.json({
            "status" : false,
            "msj" : "Error al eliminar el proyecto",
            "error" : error
        })
      }

}


export const methods = {
    addProyecto,
    getProyectos,
    insertImageMain,
    insertImageMultiple,
    getProyectoBySlug,
    getProyectoView,
    getProyectoById,
    updateProyectoById,
    deleteProyectoById
}
