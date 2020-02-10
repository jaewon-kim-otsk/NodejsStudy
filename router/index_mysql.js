var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var main = require('./main/main_mysql')
var email = require('./email/email_mysql')
var join = require('./join/index_join_mysql')
var login = require('./login/index')
var logout = require('./logout/index')

// 첫 페이지
router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, "../public/main.html"))
})

// app.use('/main', main)
// app.use('/email', email)
router.use('/main', main)
router.use('/email', email)
router.use('/join', join)
router.use('/login', login)
router.use('/logout', logout)

module.exports = router;