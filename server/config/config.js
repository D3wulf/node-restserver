//configuramos cosas de forma global

//===========================
//   Puerto
//===========================


process.env.PORT = process.env.PORT || 8080;


//============================
//    Environtment//entorno (los que creamos en el postman por ej, desarrollo y diseño)
//============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//==============
// Bases de Datos
//==============

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://Mike:ZXzmzJGW0uxTNynR@cluster0.nwwgs.mongodb.net/test';
}

//urlDB = 'mongodb+srv://Mike:ZXzmzJGW0uxTNynR@cluster0.nwwgs.mongodb.net/test';

process.env.URLDB = urlDB;