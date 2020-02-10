var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')


// 첫 페이지를 main 으로 입력하는 사용자를 위한 페이지
// 또는 /join 에서 <제출> 버튼을 눌렀을 경우, 이곳으로 이동
router.get('/', function(request, response){
    //response.sendFile(__dirname + "/public/main.html")
    //response.sendFile(path.join(__dirname, "../../public/main.html"))

    var id = request.user
    if (!id) response.render('login.ejs')
    response.render('main_mysql.ejs', {'id' : id})

})


// Module - Exports
module.exports = router;
