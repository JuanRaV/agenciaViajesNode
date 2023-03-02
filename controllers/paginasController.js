import {Viaje} from '../models/Viaje.js'
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async(req,res)=>{ //Cuando yo visite la pagina
    //req-lo que enviamos
    //res-lo que express responde

    //Consultar 3 viajes del modelo Viaje

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit:3}))//Extraer unicamente 3 viajes
    promiseDB.push(Testimonial.findAll({limit:3}))

    try {
        const resultado = await Promise.all(promiseDB) //Con este promise ambas consultas arrancan al mismo tiempo
        res.render('inicio',{
            pagina:'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });  
    } catch (error) {
        console.log(error)
    }

}

const paginaNosotros = (req,res)=>{ 
    res.render('nosotros',{
        pagina:'Nosotros'
    });
}

const paginaViajes = async(req,res)=>{
    //Consultar DB
    const viajes = await Viaje.findAll();


    res.render('viajes',{
        pagina:'Proximos Viajes', //Mandamos variable
        viajes //viajes::viajes
    });
}

const paginaTestimoniales = async (req,res)=>{ 
    try {
        //Consultamos el modelo de testimoniales
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales',{
            pagina:'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error)
    }

}

//Mustra un viaje por su sulug
const paginaDetalleViaje = async (req,res)=>{
    const {slug}= req.params;

    try {
        const viaje= await Viaje.findOne({where:{slug}})
        res.render('viaje',{
            pagina:'Informacion Viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}