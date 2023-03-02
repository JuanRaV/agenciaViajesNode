import Sequelize from 'sequelize';
import dotenv from 'dotenv/config'//Importando dotenv

console.log(process.env.DB_HOST)

const db = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{ //Nombre de la base de datos, usuraio,contrasenia
    host:process.env.DB_HOST, //En local
    port:'3306', //Puerto
    dialect: 'mysql', //Lenguaje
    define:{
        timestamps:false
    },
    //Configuracion de sequelize
    pool:{
        max: 5,
        min: 0,
        acquire:30000,
        idle:10000
    },
    operatorAliases: false
})

export default db;