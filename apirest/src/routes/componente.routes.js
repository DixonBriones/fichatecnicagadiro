const routerUser = require('express').Router()
const { controllers } = require('../controllers')
//const{verifyToken}=require("../middlewares/verifyToken")
const upload= require('../middlewares/uploadimg')



routerUser.get('/listar', controllers.ApiComponenteController.getComponentes)
routerUser.get('/listarMarcas', controllers.ApiComponenteController.getMarcas)
routerUser.get('/listarTiposComponentes', controllers.ApiComponenteController.getTipoComponentes)
routerUser.post('/insertComponente',upload.single('imagen'), controllers.ApiComponenteController.insertComponente)



module.exports =  routerUser