import bcryptjs from 'bcryptjs';

import { user } from '../models/user.model.js';

import Ope from 'sequelize';
const {Op} = Ope;

const registerUser = async(req , res) => {

    const {
        nombre, 
        username, 
        email, 
        fecha_nacimiento,
        telefono,
        pais,
        password,
        estado
    } = req.body;

    if(
        typeof nombre !== 'undefined' && nombre !== null && nombre !== ""
     && typeof username !== 'undefined' && username !== null && username !== ""
     && typeof email !== 'undefined' && email !== null && email !== ""
     && typeof password !== 'undefined' && password !== null && password !== ""){

        try {

            const response_user = await user.findAll({
                where: {
                    email: {
                        [Op.iLike]: email
                    }
                }
            });

            if(response_user.length > 0){

                res.json({
                    "status" : false,
                    "msg"    : 'El usuario ya existe'
                });

            }else{

                /** encriptamos el password */
                const salt = bcryptjs.genSaltSync();
                const password_encrypt = bcryptjs.hashSync(password, salt);

                console.log(password_encrypt);


                const newUser = await user.create({
                    nombre, 
                    username, 
                    email,
                    fecha_nacimiento, 
                    pais,
                    telefono, 
                    password : password_encrypt, 
                    estado
                });

                res.json(
                    {
                        'status' : true,
                        'data' : newUser
                    }
                );

            }


        } catch (error) {
            res.json({
                "status" : false,
                "msg"    : 'Error al insertar nuevo usuario',
                "error"  : error
            })
        }

     }else{

        res.json({
            "status" : false,
            "msg"    : 'Falta un dato'
        })

     }

}

export const methods = {
    registerUser
}

