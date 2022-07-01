const routerUser = require('express').Router()
const { controllers } = require('../controllers')


routerUser.get('/', controllers.ApiUserController.getMarca)


module.exports =  routerUser