//configuramos cosas de forma global

//===========================
//   Puerto
//===========================


process.env.PORT = process.env.PORT || 8080;


//============================
//    Environtment//entorno (los que creamos en el postman por ej, desarrollo y diseño)
//============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==============
// Bases de Datos
//==============

let urlDB;

/*if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://Mike:ZXzmzJGW0uxTNynR@cluster0.nwwgs.mongodb.net/test';
}*/

urlDB = 'mongodb+srv://Mike:ZXzmzJGW0uxTNynR@cluster0.nwwgs.mongodb.net/test';

process.env.URLDB = urlDB;