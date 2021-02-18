const express = require('express');

const cors = require('cors');

const app = express();




class Server {


    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        //esta sera la ruta 
        this.usuariosPath = '/api/usuarios';


        //middlewares
        this.middlewares();
        //rutas de mi aplicacion

        this.routes();
    }
    middlewares() {
        //.use es la palabra clave para usar middleware
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body (Para Postman pruebas)
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }
    escucha() {

        this.app.listen(this.port, () => {
            console.log('Puerto Ready', this.port);
        });
    }




}


module.exports = Server;