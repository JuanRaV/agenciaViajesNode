import express from 'express';
import router from './routes/index.js';
import db from './config/db.js'


const app = express();

//Conectar la base de datos
db.authenticate()
    .then(()=>console.log('Base de datos conectada'))
    .catch(error=>console.log(error));

//Definir puerto
const port = process.env.PORT || 4000;

//Midlewares
//Habilitar pug
app.set('view engine','pug');

//Obtener el anio actual
app.use((req,res,next)=>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    next();
})
//Agregar body parse para leer los datos dedl formulario
app.use(express.urlencoded({extended:true}));


//Definir la carpeta publica(de estilos)
app.use(express.static('public'));

//Agregar router
app.use('/',router); //Use: Soporta get,post,put,pathc y delete

app.listen(port,()=>{ //Arranca el servidor
    console.log(`El servidor esta corriendo en el puerto ${port}`)
})
