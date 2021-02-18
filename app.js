require('dotenv').config();

const Server = require('./server/models/server');



const servidor = new Server();


servidor.escucha();