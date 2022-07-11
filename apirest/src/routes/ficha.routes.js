const routerFicha = require('express').Router()
const { controllers } = require('../controllers')
//const{verifyToken}=require("../middlewares/verifyToken")

routerFicha.get('/busquedaComponenteid/:id', controllers.ApiFichaController.getComponentesFicha)
routerFicha.get('/busquedaSoftwareid/:id', controllers.ApiFichaController.getSoftwereFicha)
routerFicha.get('/busquedaOrdenadorid/:id', controllers.ApiFichaController.getOrdenadorFicha)
routerFicha.get('/busquedaMantenimientoid/:id', controllers.ApiFichaController.getMantenimientoFicha)

module.exports =  routerFicha