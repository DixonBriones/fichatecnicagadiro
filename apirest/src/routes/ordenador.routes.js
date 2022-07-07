const routerUser = require('express').Router()
const { controllers } = require('../controllers')
//const{verifyToken}=require("../middlewares/verifyToken")
const upload= require('../middlewares/uploadimg')


routerUser.get('/pruebaimg',upload.single('imagen'), controllers.ApiOrdenadorController.getMarca)
routerUser.get('/listar', controllers.ApiOrdenadorController.getOrdenadores)



module.exports =  routerUser