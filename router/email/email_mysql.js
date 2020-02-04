var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')


// MySQL 연결
var mysql = require('mysql')

var connection = mysql.createConnection({
    host:'localhost',
    port:3308,
    user:'root',
    password:'qwer1234',
    database:'nodejs'
})
connection.connect()


// 화면에서, <제출> 버튼을 누르는 경우
router.post('/form', function(request, response){
    // 작성자가 입력한 Email 주소
    //console.log(request.body.email)

    // 서버에서 클라이언트에게 반응
    //response.send("<h1> Welcome " + request.body.email + "</h1>")

    // View Engine 사용 
    response.render('email.ejs', {'email' : request.body.email})
    
    // 단순확인
    //response.send("post resonse")

})


// 화면에서, <AjaxSend> 버튼을 누르는 경우
router.post('/ajax', function(request, response){
    //console.log(request.body.email)
    
    // var responseData = {'result' : 'OK', 'email' : request.body.email}
    // response.json(responseData)

    // MySQL
    var email = request.body.email;
    var responseData = {};

    var query = connection.query('select NAME from user where email="' + email + '"', function(error, rows){
        //console.log(rows)
        if(error) throw error;
        if(rows[0]){
            //console.log(rows[0].name)
            responseData.result = "OK"
            responseData.name = rows[0].NAME
        } else {
            //console.log('NONE : ' + rows[0])
            responseData.result = "NONE"
            responseData.name = ""
        }
        response.json(responseData)
    })
})

module.exports = router;