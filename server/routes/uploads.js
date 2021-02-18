const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
    let archivo;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400)
            .Json({

                ok: false,
                err: {
                    message: "error no se han subido archivos o el tamaño no es correcto"
                }


            });
    }

    // The name of the input field (i.e. "archivo") is used to retrieve the uploaded file
    archivo = req.files.archivo;

    //metemos en una variable un array del archivo y su extension

    let arrayNombre = archivo.name.split('.');
    let extensionArchivo = arrayNombre[1]; //o tambien para ir seguro arrayNombre.length -1


    //extensiones permitidas
    let extValidas = ['png', 'jpg'];

    //otra forma de filtrar:
    // if!extValidas.includes(extensionArchivo) y la respuesta json y demas mierdas
    //si las ocurrencias  de extValidas con extensionArchivo son menor que 0 (vamos que no coinciden)

    if (extValidas.indexOf(extensionArchivo) < 0) {

        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'Las extensiones validas son ' + extValidas,
                    ext: extension
                }
            });
    }

    // o tambien `uploads ${archivo.name}` <-- si es que la ruta es correcta
    uploadPath = __dirname + '../../../uploads/' + archivo.name;

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(uploadPath, (err) => {
        if (err)
            return res.status(500).json({

                ok: false,
                err


            });

        res.json('Archivo subido con Xito!!');
    });
});
module.exports = app;