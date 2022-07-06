const routerUser = require('express').Router()
const { controllers } = require('../controllers')
const{verifyToken}=require("../middlewares/verifyToken")


routerUser.get('/',verifyToken, controllers.ApiUserController.getMarca)
routerUser.post('/singin', controllers.ApiUserController.singin)
routerUser.post('/singup', controllers.ApiUserController.singup)



module.exports =  routerUser