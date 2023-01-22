import { Viaje } from '../models/Viajes.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio =  async(req, res) => { // Req: Es lo que enviamos y Res:  es lo que express no da a mostra

    // Hacer que carguen al mismo tiempo
    const promiseDB = [];
    promiseDB.push( Viaje.findAll({ limit: 3}) );
    promiseDB.push( Testimonial.findAll({ limit: 3 }) );

    // Consultar 3 viajes del modelo Viaje.js
    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (err) {
        console.log(err);
    }
};

const paginaNosotros =  (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros' // PASAR VARIABLES AL PUG
    });
}

const paginaViajes = async (req, res) => {

    // Consultar base de datos
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes,
    });
}

const paginaTestimoniales =  async(req, res) => {
    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (err) {
        console.log(err);
    }
}

//Muestra pagina de Viajes por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug: slug } });
        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        });
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}