const routerUser = require('express').Router()
const { controllers } = require('../controllers')
//const{verifyToken}=require("../middlewares/verifyToken")
const upload= require('../middlewares/uploadimg')



routerUser.get('/listar', controllers.ApiComponenteController.getComponentes)
routerUser.get('/listarMarcas', controllers.ApiComponenteController.getMarcas)
routerUser.get('/listarTiposComponentes', controllers.ApiComponenteController.getTipoComponentes)
routerUser.post('/insertComponente',upload.single('imagen'), controllers.ApiComponenteController.insertComponente)
routerUser.put('/actualizarComponente/:id',upload.single('imagen'), controllers.ApiComponenteController.actualizarComponente)
routerUser.delete('/eliminarComponente/:id', controllers.ApiComponenteController.borrarComponente)
routerUser.get('/busquedaid/:id', controllers.ApiComponenteController.getComponenteID)


module.exports =  routerUser