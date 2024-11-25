import { categoria_extra } from '../models/categoria_extra.js';
import { cliente } from '../models/cliente.model.js';
import { proyecto } from '../models/proyecto.model.js';
import { servicio } from '../models/servicio.model.js';

const getCategoriaExtra = async(req , res) => {

    const {id} = req.params;

    try {
        const response_categoria_extra = await categoria_extra.findAll({
            where : {
                id_alianza : id,
                estado : "visible"
            }
        });
        res.json(response_categoria_extra);

    } catch (error) {
        res.json({
            "status" : false,
            "msg"    : 'Error al ejecutar la consulta',
            "error"  : error
        })
    }
   
}


const getProyectosBySlugCategoria = async(req , res) => {

    const {slug} = req.params;
    const fullUrl = `${req.protocol}://${req.get('host')}`;

    try {
        
        const response_proyectos = await categoria_extra.findAll({
            where : {
                slug : slug 
            },
            include: [
                {
                    model: proyecto,
                    include:[
                        {
                            model: cliente,
                            attributes: ["id", "nombre", "logo"]
                        },
                        {
                            model: servicio,
                            attributes: ["id", "nombre"]
                        }
                    ]
                }
            ]
        })

        const modifiedResponse = response_proyectos.map(categoria => {
            categoria.proyectos.forEach(proyecto => {
                proyecto.imagen = `${fullUrl}/uploads/${proyecto.imagen}`;
            });
            return categoria;
          });

          console.log(modifiedResponse);


        res.json(modifiedResponse[0])

    } catch (error) {
        res.json({
            "status" : false,
            "msg"    : 'Error al ejecutar la consulta',
            "error"  : error
        })
    }
}

export const methods = {
    getCategoriaExtra,
    getProyectosBySlugCategoria
}
