const express = require('express')
const cors = require("cors");
const {PORT, DIR_STORAGE}=require('./config');
const {test}= require('./config/dbc')



class Servidor{
    constructor(){
        this.app = express()
        this.port = PORT

        test()

        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(cors())
        //this.app.use(expres)
    }

    routes(){
        this.app.use('/public',express.static(`${__dirname}/storage/img`))
        this.app.use('/api/v1/user', require('./routes/usuario.routes'))
        this.app.use('/api/v1/ordenador', require('./routes/ordenador.routes'))
        this.app.use('/api/v1/componente', require('./routes/componente.routes'))
        this.app.use('/api/v1/ficha', require('./routes/ficha.routes'))

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servicio funcionando correctamente en http://localhost:${this.port}`)
        })
    }
}

module.exports = Servidor;