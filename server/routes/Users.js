const usersRoute = require('express').Router()
const usersController = require('../controllers/UsersController')
usersRoute.get('/', usersController.getUsers)
usersRoute.post('/register', usersController.registerUsers)
usersRoute.post('/login', usersController.loginUsers)
usersRoute.put('/update/:id', usersController.updateUsers)
usersRoute.delete('/delete/:id', usersController.deleteUsers)
usersRoute.get('/details/:id', usersController.getDetailsUser)
module.exports = usersRoute