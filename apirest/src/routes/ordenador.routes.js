const routerUser = require('express').Router()
const { controllers } = require('../controllers')
//const{verifyToken}=require("../middlewares/verifyToken")
const upload= require('../middlewares/uploadimg')


routerUser.get('/pruebaimg',upload.single('imagen'), controllers.ApiOrdenadorController.getMarca)
routerUser.get('/listar', controllers.ApiOrdenadorController.getOrdenadores)
routerUser.get('/listarSoftware', controllers.ApiOrdenadorController.getSoftware)
routerUser.get('/listarDepartamento', controllers.ApiOrdenadorController.getDepartamento)
routerUser.get('/listarTipoOrdenador', controllers.ApiOrdenadorController.getTipoOrdenador)
routerUser.post('/insertOrdenador',upload.single('imagen'), controllers.ApiOrdenadorController.insertOrdenador)
routerUser.delete('/deleteOrdenador/:id', controllers.ApiOrdenadorController.borrarOrdenador)
routerUser.get('/busquedaserial/:serial', controllers.ApiOrdenadorController.busquedaSerial)
routerUser.get('/busquedaId/:id', controllers.ApiOrdenadorController.ordenadorPorId)
routerUser.put('/modificarordenador/:id', controllers.ApiOrdenadorController.actualizarOrdenador)

module.exports =  routerUser