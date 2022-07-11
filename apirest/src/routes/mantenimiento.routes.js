const routerMantenimiento = require('express').Router()
const { controllers } = require('../controllers')
//const{verifyToken}=require("../middlewares/verifyToken")

routerMantenimiento.get('/listarMantenimiento', controllers.ApiMantenimientoController.getMantenimiento)
routerMantenimiento.get('/listarTecnico', controllers.ApiMantenimientoController.getTecnico)
routerMantenimiento.get('/listarOrdenador', controllers.ApiMantenimientoController.getOrdenador)
routerMantenimiento.post('/insertMantenimiento', controllers.ApiMantenimientoController.insertMantenimiento)
routerMantenimiento.delete('/deleteMantenimiento/:id', controllers.ApiMantenimientoController.deleteMantenimiento)
routerMantenimiento.put('/actualizarMantenimiento/:id', controllers.ApiMantenimientoController.actualizarMantenimiento)
routerMantenimiento.get('/getMantenimientoid/:id', controllers.ApiMantenimientoController.getMantenimientoID)
module.exports =  routerMantenimiento