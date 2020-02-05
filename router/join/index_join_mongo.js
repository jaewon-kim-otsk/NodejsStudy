var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')


// URL 끝에, /join 이 입력되는 경우
// index_mongo.js 파일을 통해 자료를 get.
router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, '../../public/join_mongo.html'))
})

module.exports = router;