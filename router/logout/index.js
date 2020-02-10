var express = require('express')
var app = express()
var router = express.Router()

router.get('/', function(request, response){
    //console.log("logout router")
    request.logout()
    response.redirect('/login')
})

module.exports = router