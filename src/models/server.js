const express = require('express');
const morgan = require("morgan")
const cors = require('cors');
const { createServer } = require('http');

const { dbConnection } = require('../database/database.js');
//const { socketController } = require('../sockets/controller');




class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = createServer( this.app );
        this.io     = require('socket.io')(this.server)

        this.paths = {
            auth:       '/api/v1/auth',
            admin:      '/api/v1/auth',
            principal:  '/api/v1/princ'
            
        }

        


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        //this.sockets();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );
        
        //Controlador de Solicitudes
        this.app.use(morgan("dev"));

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        this.app.set('view engine', 'ejs'); // Establecer el motor de plantillas
        this.app.set('views', './src/views'); // Establecer la ruta de las vistas

        // Fileupload - Carga de archivos
        /*
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/src/',
            createParentPath: true
        }));*/
        
    }

    routes() {
        
        this.app.use( this.paths.auth, require('../routes/auth.js'));
        this.app.use(this.paths.principal, require('../routes/principal.js'));       
        //this.app.use( this.paths.usuarios, require('../routes/usuarios'));     
        
    }

    /*
    sockets() {
        this.io.on('connection', ( socket ) => socketController(socket, this.io ) )
    }
    */

    listen() {
        this.server.listen( this.port, () => {
            console.log('Server Listened on port', this.port );
        });
    }

}




module.exports = Server;