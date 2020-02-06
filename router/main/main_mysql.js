var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')


// 첫 페이지를 main 으로 입력하는 사용자를 위한 페이지
router.get('/', function(request, response){
    //response.sendFile(__dirname + "/public/main.html")
    response.sendFile(path.join(__dirname, "../../public/main.html"))
    //console.log("A")
})


// Module - Exports
module.exports = router;
