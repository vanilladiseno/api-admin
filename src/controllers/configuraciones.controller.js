
import { configuracion } from '../models/configuraciones.model.js';
import { seo } from '../models/seo.model.js';
import { Op } from 'sequelize';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import path from 'path';
import ejs from 'ejs';

const addConfiguracion = async(req , res) => {

    const {meta_name , meta_data} = req.body;

    try {

        const response_config = await configuracion.findAll({
            where : {
                meta_name : meta_name
            }
        })

        if(response_config.length > 0){

            configuracion.update(
                { 
                    meta_data: meta_data 
                }, 
                { 
                    where: 
                        { 
                            meta_name: meta_name 
                        } 
                }
              )
              .then((d) => {

                res.json({
                    "status" : true,
                    "response" : d
                })

              })
              .catch((error) => {

                console.log(error);

                res.json({
                    "status" : false,
                    "response" : error
                })
              });

        }else{
            const newConfiguracion = await configuracion.create({
                meta_name,
                meta_data
            });

            res.json({
                "status" : true,
                "response" : newConfiguracion
            })
        }
        
    } catch (error) {
        res.json({
                "status" : false,
                "response"  : error
            })
    }
   
}


const getConfiguracion = async(req , res) => {

    const {meta_names} = req.body;

    const response_config = await configuracion.findAll({
        where: {
          meta_name: {
            [Op.in]: meta_names
          }
        }
    });

    res.json({
        "status" : true,
        "response" : response_config
    })

}

const getRutas = async(req , res) => {

    const response_seo = await seo.findAll({
        order: [
            ['id', 'ASC']
        ]
    });

    res.json(response_seo)
}

const getRutasById = async(req , res) => {

    const {id} = req.params;

    const response_seo = await seo.findAll({
        where : {
            id : id
        }
    });

    res.json(response_seo[0])
}

const getUpdateRutaById = async(req , res) => {

    const {titulo , descripcion} = req.body;
    const {id} = req.params;

    seo.update(
        { 
            titulo: titulo,
            descripcion :descripcion 
        }, 
        { 
            where: 
                { 
                    id: id 
                } 
        }
      )
      .then((d) => {

        res.json({
            "status" : true,
            "response" : d
        })

      })
      .catch((error) => {

        console.log(error);

        res.json({
            "status" : false,
            "response" : error
        })
      });

}

const getDataSeoByUrl = async(req , res) => {

    const {url} = req.body;

    const response_seo = await seo.findAll({
        where : {
            nombre_pagina : url
        }
    });

    res.json(response_seo[0])

}

const sendMailContacto = async(req , res) => {

    const {nombre, email , consulta , informacion } = req.body;

    const response_correo = await configuracion.findAll({
        where : {
            meta_name : "correo_cotacto"
        }
    });

    const jsonResponse = response_correo.map(item => item.toJSON());

    let correosArray = jsonResponse[0].meta_data.split(',');

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const htmlPath = path.join(__dirname, 'mails' , 'contacto', 'contacto.ejs');

    ejs.renderFile(htmlPath, { nombre ,email , consulta , informacion }, (err, html) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo HTML');
        }else{
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Puedes usar otros servicios como Yahoo, Outlook, etc.
                auth: {
                    user: 'enviadorppr@gmail.com', // Tu correo electrónico
                    pass: 'safh uhda eihs slpu' // Tu contraseña
                }
            });

            const mailOptions = {
                from: 'enviadorppr@gmail.com', // Dirección del remitente
                to:  correosArray, // Dirección del destinatario
                subject: 'Consulta desde formulario', // Asunto del correo
                //text: 'Contenido del correo en texto plano', // Cuerpo del correo en texto plano
                html: html 
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Correo enviado: ' + info.response);
                res.json({
                    "status"        : true,
                    "response"      : "Correo enviado"
                 });
            });

        }
    });

}   


export const methods = {
    addConfiguracion,
    getConfiguracion,
    getRutas,
    getRutasById,
    getUpdateRutaById,
    getDataSeoByUrl,
    sendMailContacto
}
