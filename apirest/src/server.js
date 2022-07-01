const express = require('express')
const {PORT}=require('./config');
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
    }

    routes(){
        this.app.use('/api/v1/user', require('./routes/usuario.routes'))
      //  this.app.use('/api/v1/auto', require('./routes/auto.routes'))

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servicio funcionando correctamente en http://localhost:${this.port}`)
        })
    }
}

module.exports = Servidor;