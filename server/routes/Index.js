const route = require('express').Router()
route.get('/', (req, res, next)=>{
    res.json({
        message: "Welcome to Homepage"
    })
})
const usersRoutes = require('./Users')
const itemsRoutes = require('./Items')
route.use('/users', usersRoutes)
route.use('/items', itemsRoutes)
module.exports = route